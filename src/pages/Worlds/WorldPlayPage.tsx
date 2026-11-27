import React, { Suspense, lazy, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Lock, Sparkles, Target } from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { SafeCanvas } from '../../components/3d/SafeCanvas';
import { MissionModal } from '../../components/missions/MissionModal';
import { WORLDS_MAP } from '../../data/worlds/worldsData';
import { getMissionsByWorld } from '../../data/missions/missionsData';
import { getWorldRestorationPercent, useGameStore } from '../../store/useGameStore';
import { Mission, WorldId } from '../../types';

// Lazy-load each world scene independently so only the active world is loaded
const ForestWorldScene = lazy(() =>
  import('../../scenes/Forest/ForestWorldScene').then((m) => ({ default: m.ForestWorldScene })),
);
const OceanWorldScene = lazy(() =>
  import('../../scenes/Ocean/OceanWorldScene').then((m) => ({ default: m.OceanWorldScene })),
);
const DesertWorldScene = lazy(() =>
  import('../../scenes/Desert/DesertWorldScene').then((m) => ({ default: m.DesertWorldScene })),
);
const FutureCityScene = lazy(() =>
  import('../../scenes/FutureCity/FutureCityScene').then((m) => ({ default: m.FutureCityScene })),
);

export const WorldPlayPage: React.FC = () => {
  const { worldId } = useParams<{ worldId: string }>();
  const validId: WorldId =
    worldId === 'forest' ||
    worldId === 'ocean' ||
    worldId === 'desert' ||
    worldId === 'future-city'
      ? worldId
      : 'forest';

  const world = WORLDS_MAP[validId];
  const missions = getMissionsByWorld(validId);
  const completedMissionIds = useGameStore((s) => s.completedMissionIds);
  const level = useGameStore((s) => s.level);

  const [activeMission, setActiveMission] = useState<Mission | null>(null);

  const isUnlocked = level >= world.unlockLevel;
  const restoration = getWorldRestorationPercent(validId, completedMissionIds);
  const stageIndex = Math.min(
    world.restorationStages.length - 1,
    Math.floor((restoration / 100) * (world.restorationStages.length - 1)),
  );

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/explore" className="btn-secondary px-3 py-2 text-xs">
              <ArrowLeft className="h-4 w-4" />
              Explorer
            </Link>
            <div>
              <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
                {world.name}
              </h1>
              <p className="text-xs text-emerald-200/80">
                Stage: {world.restorationStages[stageIndex]}
              </p>
            </div>
          </div>

          <div className="glass-card flex items-center gap-4 px-4 py-2">
            <div>
              <p className="text-[11px] text-emerald-200/70">World Restoration</p>
              <p className="font-display text-base font-bold text-emerald-300">{restoration}%</p>
            </div>
            <div className="h-2 w-32 overflow-hidden rounded-full bg-black/40">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${restoration}%`, backgroundColor: world.themeColor }}
              />
            </div>
          </div>
        </div>

        {!isUnlocked ? (
          <div className="glass-panel p-10 text-center">
            <Lock className="mx-auto h-12 w-12 text-amber-300" />
            <h2 className="mt-4 font-display text-2xl font-bold text-white">
              {world.name} Unlocks at Level {world.unlockLevel}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-emerald-100/75">
              You are currently Level {level}. Complete missions in Green Forest or Blue Ocean to
              earn XP and unlock this biome!
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link to="/world/forest" className="btn-primary">
                Play Green Forest
              </Link>
              <Link to="/missions" className="btn-secondary">
                Mission Center
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-12">
            {/* 3D World Viewport */}
            <div className="lg:col-span-8">
              <div className="glass-panel relative h-[430px] overflow-hidden sm:h-[520px]">
                <SafeCanvas
                  cameraPosition={[0, 5.5, 9.5]}
                  fov={45}
                  fallbackTitle={`${world.name} — 2D Mode`}
                  fallbackDescription="Select any mission from the right panel to complete challenges and restore this world."
                >
                  <Suspense fallback={null}>
                    {validId === 'forest' && (
                      <ForestWorldScene
                        missions={missions}
                        completedMissionIds={completedMissionIds}
                        onSelectMission={setActiveMission}
                      />
                    )}
                    {validId === 'ocean' && (
                      <OceanWorldScene
                        missions={missions}
                        completedMissionIds={completedMissionIds}
                        onSelectMission={setActiveMission}
                      />
                    )}
                    {validId === 'desert' && (
                      <DesertWorldScene
                        missions={missions}
                        completedMissionIds={completedMissionIds}
                        onSelectMission={setActiveMission}
                      />
                    )}
                    {validId === 'future-city' && (
                      <FutureCityScene
                        missions={missions}
                        completedMissionIds={completedMissionIds}
                        onSelectMission={setActiveMission}
                      />
                    )}
                  </Suspense>
                </SafeCanvas>
                <div className="pointer-events-none absolute bottom-3 left-3 rounded-xl bg-black/50 px-3 py-1.5 text-xs text-emerald-100 backdrop-blur-sm">
                  Click glowing crystals or select a mission card to begin
                </div>
              </div>
            </div>

            {/* Mission Sidebar */}
            <div className="glass-panel flex flex-col justify-between p-5 lg:col-span-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                  <Target className="h-4 w-4" />
                  <span>Biome Missions ({missions.filter((m) => completedMissionIds.includes(m.id)).length}/{missions.length})</span>
                </div>
                <div className="mt-4 space-y-3">
                  {missions.map((m) => {
                    const done = completedMissionIds.includes(m.id);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setActiveMission(m)}
                        className={`w-full rounded-2xl border p-3.5 text-left transition ${
                          done
                            ? 'border-emerald-400/40 bg-emerald-500/15 text-emerald-100'
                            : 'border-emerald-400/20 bg-emerald-950/60 text-white hover:border-amber-300/60 hover:bg-emerald-900/50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-display text-sm font-bold">{m.title}</span>
                          {done ? (
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                              <Sparkles className="h-3 w-3" />+{m.xpReward} XP
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs opacity-75">{m.shortDescription}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <Link to="/companion" className="btn-secondary mt-5 w-full text-xs">
                Ask Local Eco-Guide for Tips
              </Link>
            </div>
          </div>
        )}
      </div>

      <MissionModal mission={activeMission} onClose={() => setActiveMission(null)} />
    </AppLayout>
  );
};
