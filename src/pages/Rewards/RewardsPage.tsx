import React, { useState } from 'react';
import { Award, Globe, Lock, Sparkles, Sprout, Sun, Trees, UserCheck, Waves, Zap } from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import {
  BADGES_DATA,
  LEVEL_THRESHOLDS,
  calculateLevelFromXp,
  getNextUnlockMilestone,
} from '../../data/rewards/rewardsData';
import { useGameStore } from '../../store/useGameStore';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Sprout,
  UserCheck,
  Trees,
  Waves,
  Sun,
  Zap,
  Sparkles,
  Globe,
};

export const RewardsPage: React.FC = () => {
  const xp = useGameStore((s) => s.xp);
  const unlockedBadgeIds = useGameStore((s) => s.unlockedBadgeIds);
  const levelInfo = calculateLevelFromXp(xp);
  const [category, setCategory] = useState<'all' | 'world' | 'milestone' | 'mastery'>('all');

  const visibleBadges =
    category === 'all'
      ? BADGES_DATA
      : BADGES_DATA.filter((b) => b.category === category);

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
              Achievements & Progression
            </span>
            <h1 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
              Rewards & Badges
            </h1>
          </div>
          <div className="glass-card flex items-center gap-3 px-4 py-2.5 text-sm font-semibold">
            <Award className="h-5 w-5 text-amber-300" />
            <span>
              {unlockedBadgeIds.length} / {BADGES_DATA.length} Badges Unlocked
            </span>
          </div>
        </div>

        {/* Level Progression Ladder */}
        <div className="glass-panel mt-6 p-6">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <h2 className="font-display text-lg font-bold text-white">
              Level Progression (Current: Level {levelInfo.level} • {xp} XP)
            </h2>
            <span className="text-xs font-semibold text-amber-300">
              {getNextUnlockMilestone(levelInfo.level, xp)}
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {LEVEL_THRESHOLDS.map((threshold, idx) => {
              const lvl = idx + 1;
              const reached = xp >= threshold;
              return (
                <div
                  key={lvl}
                  className={`rounded-2xl border p-3 text-center ${
                    reached
                      ? 'border-emerald-400/50 bg-emerald-500/20 text-emerald-100'
                      : 'border-white/10 bg-black/25 text-slate-400'
                  }`}
                >
                  <p className="font-display text-sm font-bold">Level {lvl}</p>
                  <p className="mt-0.5 text-xs">{threshold} XP</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {(['all', 'world', 'milestone', 'mastery'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={category === cat}
              onClick={() => setCategory(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-bold capitalize transition ${
                category === cat
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'border border-emerald-400/25 bg-emerald-950/60 text-emerald-100/80 hover:border-emerald-400/50'
              }`}
            >
              {cat === 'all' ? 'All Badges' : `${cat} Badges`}
            </button>
          ))}
        </div>

        {/* Badges Grid */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleBadges.map((badge) => {
            const unlocked = unlockedBadgeIds.includes(badge.id);
            const Icon = ICON_MAP[badge.icon] ?? Award;

            return (
              <div
                key={badge.id}
                className={`glass-card flex flex-col justify-between p-5 transition duration-300 ${
                  unlocked
                    ? 'border-amber-300/45 bg-gradient-to-br from-emerald-900/60 to-amber-950/30 shadow-lg shadow-amber-500/10 hover:-translate-y-1'
                    : 'opacity-70 grayscale-[40%]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/35"
                      style={{ color: unlocked ? badge.color : '#94a3b8' }}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    {unlocked ? (
                      <span className="rounded-full bg-emerald-500/25 px-2.5 py-0.5 text-[10px] font-bold text-emerald-200">
                        UNLOCKED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold text-slate-300">
                        <Lock className="h-3 w-3" />
                        LOCKED
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-white">{badge.title}</h3>
                  <p className="mt-1 text-xs text-emerald-100/75">{badge.description}</p>
                </div>
                <p className="mt-4 border-t border-white/10 pt-3 text-[11px] font-semibold text-amber-200/90">
                  Requirement: {badge.requirementText}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};
