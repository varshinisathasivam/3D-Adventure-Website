import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock, Sparkles, Sun, Trees, Unlock, Waves, Zap } from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { SafeCanvas } from '../../components/3d/SafeCanvas';
import { PlanetExplorerScene } from '../../scenes/Planet/PlanetExplorerScene';
import { WORLDS_DATA, WORLDS_MAP } from '../../data/worlds/worldsData';
import { getMissionsByWorld } from '../../data/missions/missionsData';
import { getWorldRestorationPercent, useGameStore } from '../../store/useGameStore';
import { calculateLevelFromXp } from '../../data/rewards/rewardsData';

const WORLD_ICONS = {
  forest: Trees,
  ocean: Waves,
  desert: Sun,
  'future-city': Zap,
};

export const WorldExplorerPage: React.FC = () => {
  const selectedWorldId = useGameStore((s) => s.selectedWorld);
  const setSelectedWorld = useGameStore((s) => s.setSelectedWorld);
  const xp = useGameStore((s) => s.xp);
  const level = useGameStore((s) => s.level);
  const completedMissionIds = useGameStore((s) => s.completedMissionIds);

  const selectedWorld = WORLDS_MAP[selectedWorldId];
  const isUnlocked = level >= selectedWorld.unlockLevel;
  const restoration = getWorldRestorationPercent(selectedWorld.id, completedMissionIds);
  const levelStats = calculateLevelFromXp(xp);
  const SelectedIcon = WORLD_ICONS[selectedWorld.id];

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Top Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
              3D Planet Navigator
            </span>
            <h1 className="mt-1 font-display text-3xl font-bold text-white">
              Verdantia World Explorer
            </h1>
          </div>

          <div className="glass-card flex items-center gap-4 px-4 py-2.5">
            <div>
              <p className="text-[11px] font-semibold uppercase text-emerald-200/70">
                Explorer Level
              </p>
              <p className="font-display text-lg font-bold text-amber-300">
                Level {level} • {xp} XP
              </p>
            </div>
            <div className="h-8 w-px bg-emerald-400/20" />
            <div className="w-28">
              <div className="flex justify-between text-[10px] text-emerald-200/80">
                <span>Next Lv</span>
                <span>{levelStats.progressPercent}%</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-black/40">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber-300"
                  style={{ width: `${levelStats.progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* Interactive 3D Planet */}
          <div className="lg:col-span-7">
            <div className="glass-panel relative h-[430px] overflow-hidden sm:h-[500px]">
              <SafeCanvas
                cameraPosition={[0, 1.5, 5.8]}
                fov={44}
                fallbackTitle="Interactive World Selector"
                fallbackDescription="Select any world from the cards on the right to enter its missions."
              >
                <PlanetExplorerScene
                  selectedWorld={selectedWorldId}
                  onSelectWorld={setSelectedWorld}
                  playerLevel={level}
                />
              </SafeCanvas>
              <div className="pointer-events-none absolute bottom-4 left-4 rounded-xl bg-black/50 px-3 py-1.5 text-xs text-emerald-100 backdrop-blur-sm">
                Click any floating zone or drag to rotate Verdantia
              </div>
            </div>

            {/* Quick Zone Selector Bar */}
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {WORLDS_DATA.map((w) => {
                const Icon = WORLD_ICONS[w.id];
                const unlocked = level >= w.unlockLevel;
                const active = w.id === selectedWorldId;
                const worldMissions = getMissionsByWorld(w.id);
                const doneCount = worldMissions.filter((m) =>
                  completedMissionIds.includes(m.id),
                ).length;
                return (
                  <button
                    key={w.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedWorld(w.id)}
                    className={`flex items-center gap-2 rounded-2xl border p-3 text-left transition ${
                      active
                        ? 'border-amber-300/70 bg-emerald-900/70 text-white shadow-lg'
                        : 'border-emerald-400/20 bg-emerald-950/60 text-emerald-100/80 hover:border-emerald-400/40'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" style={{ color: w.accentColor }} />
                    <div className="min-w-0">
                      <p className="truncate font-display text-xs font-bold">{w.name}</p>
                      <p className="text-[10px] opacity-75">
                        {unlocked ? `${doneCount}/${worldMissions.length} done` : `Unlocks Lv.${w.unlockLevel}`}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected World Info Card */}
          <div className="lg:col-span-5">
            <div
              className={`glass-panel flex h-full flex-col justify-between bg-gradient-to-br ${selectedWorld.gradient} p-6 sm:p-8`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/35"
                    style={{ color: selectedWorld.accentColor }}
                  >
                    <SelectedIcon className="h-6 w-6" />
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                      isUnlocked
                        ? 'bg-emerald-500/25 text-emerald-200 ring-1 ring-emerald-400/40'
                        : 'bg-slate-800/80 text-slate-300 ring-1 ring-slate-500/40'
                    }`}
                  >
                    {isUnlocked ? (
                      <>
                        <Unlock className="h-3.5 w-3.5" /> Unlocked
                      </>
                    ) : (
                      <>
                        <Lock className="h-3.5 w-3.5" /> Requires Level {selectedWorld.unlockLevel}
                      </>
                    )}
                  </span>
                </div>

                <h2 className="mt-5 font-display text-3xl font-bold text-white">
                  {selectedWorld.name}
                </h2>
                <p className="text-sm font-medium text-emerald-200/85">
                  {selectedWorld.subtitle}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-emerald-50/85">
                  {selectedWorld.description}
                </p>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Environmental Focus
                  </p>
                  <p className="mt-1 text-sm text-emerald-100">
                    {selectedWorld.environmentFocus}
                  </p>
                </div>

                <div className="mt-5">
                  <div className="flex justify-between text-xs font-semibold text-emerald-100">
                    <span>World Restoration Progress</span>
                    <span>{restoration}%</span>
                  </div>
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-black/40">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${restoration}%`,
                        backgroundColor: selectedWorld.themeColor,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                {isUnlocked ? (
                  <Link to={`/world/${selectedWorld.id}`} className="btn-primary w-full text-base">
                    Enter {selectedWorld.name}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 rounded-xl border border-amber-400/30 bg-amber-500/10 p-3 text-xs text-amber-200">
                      <Sparkles className="h-4 w-4 shrink-0" />
                      <span>
                        Complete missions in Green Forest or Blue Ocean to reach Level{' '}
                        {selectedWorld.unlockLevel} and unlock {selectedWorld.name}.
                      </span>
                    </div>
                    <Link to="/missions" className="btn-secondary w-full">
                      Go to Mission Center
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
