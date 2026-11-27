import React, { useMemo, useState } from 'react';
import { CheckCircle2, Filter, Lock, Search, Sparkles, Target } from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { MissionModal } from '../../components/missions/MissionModal';
import { MISSIONS_DATA } from '../../data/missions/missionsData';
import { WORLDS_DATA, WORLDS_MAP } from '../../data/worlds/worldsData';
import { useGameStore } from '../../store/useGameStore';
import { Difficulty, Mission, WorldId } from '../../types';

export const MissionCenterPage: React.FC = () => {
  const completedMissionIds = useGameStore((s) => s.completedMissionIds);
  const level = useGameStore((s) => s.level);

  const [worldFilter, setWorldFilter] = useState<'all' | WorldId>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | Difficulty>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMission, setActiveMission] = useState<Mission | null>(null);

  const filteredMissions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return MISSIONS_DATA.filter((m) => {
      if (worldFilter !== 'all' && m.worldId !== worldFilter) return false;
      if (difficultyFilter !== 'all' && m.difficulty !== difficultyFilter) return false;
      const done = completedMissionIds.includes(m.id);
      if (statusFilter === 'completed' && !done) return false;
      if (statusFilter === 'available' && done) return false;
      if (
        q &&
        !m.title.toLowerCase().includes(q) &&
        !m.shortDescription.toLowerCase().includes(q) &&
        !m.locationLabel.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [worldFilter, difficultyFilter, statusFilter, searchQuery, completedMissionIds]);

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
              Global Command
            </span>
            <h1 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
              Mission Center
            </h1>
            <p className="mt-1 text-sm text-emerald-100/75">
              Filter and launch any environmental mission across Verdantia&apos;s four worlds.
            </p>
          </div>
          <div className="glass-card px-4 py-2.5 text-sm font-semibold text-emerald-200">
            Completed: <span className="text-amber-300">{completedMissionIds.length}</span> /{' '}
            {MISSIONS_DATA.length}
          </div>
        </div>

        {/* Filters */}
        <div className="glass-panel mt-6 flex flex-wrap items-center gap-4 p-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-300">
            <Filter className="h-4 w-4" />
            <span>Filters:</span>
          </div>

          <select
            aria-label="Filter by world"
            value={worldFilter}
            onChange={(e) => setWorldFilter(e.target.value as 'all' | WorldId)}
            className="rounded-xl border border-emerald-400/25 bg-emerald-950 px-3 py-2 text-xs font-semibold text-emerald-100 focus:outline-none"
          >
            <option value="all">All Worlds</option>
            {WORLDS_DATA.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>

          <select
            aria-label="Filter by difficulty"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as 'all' | Difficulty)}
            className="rounded-xl border border-emerald-400/25 bg-emerald-950 px-3 py-2 text-xs font-semibold text-emerald-100 focus:outline-none"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            aria-label="Filter by status"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as 'all' | 'available' | 'completed')
            }
            className="rounded-xl border border-emerald-400/25 bg-emerald-950 px-3 py-2 text-xs font-semibold text-emerald-100 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="available">Available</option>
            <option value="completed">Completed</option>
          </select>

          <div className="relative flex-1 min-w-[180px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-emerald-300/60" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search missions or locations..."
              aria-label="Search missions"
              className="w-full rounded-xl border border-emerald-400/25 bg-emerald-950 py-2 pl-9 pr-3 text-xs text-emerald-100 placeholder-emerald-300/40 focus:border-emerald-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Empty State */}
        {filteredMissions.length === 0 && (
          <div className="glass-panel mt-6 p-8 text-center">
            <p className="font-display text-lg font-bold text-white">No missions match your filters</p>
            <p className="mt-1 text-xs text-emerald-100/70">
              Try clearing your search query or resetting the world/difficulty filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setWorldFilter('all');
                setDifficultyFilter('all');
                setStatusFilter('all');
                setSearchQuery('');
              }}
              className="btn-secondary mt-4 text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Mission Grid */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMissions.map((m) => {
            const world = WORLDS_MAP[m.worldId];
            const isDone = completedMissionIds.includes(m.id);
            const isWorldLocked = level < world.unlockLevel;

            return (
              <div
                key={m.id}
                className="glass-card flex flex-col justify-between p-5 transition hover:border-emerald-300/45"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span
                      className="rounded-full px-2.5 py-0.5 font-bold"
                      style={{
                        backgroundColor: `${world.themeColor}25`,
                        color: world.accentColor,
                      }}
                    >
                      {world.name}
                    </span>
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-semibold text-emerald-100">
                      {m.difficulty}
                    </span>
                  </div>

                  <h2 className="mt-3 font-display text-lg font-bold text-white">{m.title}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-emerald-100/75">
                    {m.shortDescription}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300">
                    <Sparkles className="h-3.5 w-3.5" />+{m.xpReward} XP
                  </span>

                  {isWorldLocked ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400">
                      <Lock className="h-3.5 w-3.5" />
                      Unlocks Lv.{world.unlockLevel}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveMission(m)}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                        isDone
                          ? 'bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30'
                          : 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 hover:brightness-110'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Replay
                        </>
                      ) : (
                        <>
                          <Target className="h-3.5 w-3.5" />
                          Start Mission
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <MissionModal mission={activeMission} onClose={() => setActiveMission(null)} />
    </AppLayout>
  );
};
