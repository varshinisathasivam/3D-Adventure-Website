import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, CheckCircle2, Compass, Sparkles, TrendingUp, User } from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { getWorldRestorationPercent, useGameStore } from '../../store/useGameStore';
import { calculateLevelFromXp, BADGES_DATA } from '../../data/rewards/rewardsData';
import { WORLDS_DATA } from '../../data/worlds/worldsData';
import { MISSIONS_DATA } from '../../data/missions/missionsData';

export const DashboardPage: React.FC = () => {
  const user = useGameStore((s) => s.user);
  const avatar = useGameStore((s) => s.avatar);
  const xp = useGameStore((s) => s.xp);
  const completedMissionIds = useGameStore((s) => s.completedMissionIds);
  const unlockedBadgeIds = useGameStore((s) => s.unlockedBadgeIds);
  const activities = useGameStore((s) => s.activities);

  const levelInfo = calculateLevelFromXp(xp);

  const overallRestoration = Math.round(
    (completedMissionIds.length / MISSIONS_DATA.length) * 100,
  );

  const difficultyStats = (['Easy', 'Medium', 'Hard'] as const).map((diff) => {
    const total = MISSIONS_DATA.filter((m) => m.difficulty === diff).length;
    const done = MISSIONS_DATA.filter(
      (m) => m.difficulty === diff && completedMissionIds.includes(m.id),
    ).length;
    return { diff, done, total };
  });

  const ringCircumference = 2 * Math.PI * 34;
  const ringOffset = ringCircumference * (1 - overallRestoration / 100);

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {/* Header */}
        <div className="glass-panel flex flex-col justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-center gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-white/30 shadow-lg"
              style={{ backgroundColor: avatar.outfitColor }}
            >
              <User className="h-8 w-8 text-slate-950" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Explorer Dashboard
              </p>
              <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
                {user.username}
              </h1>
              <p className="text-xs text-emerald-100/70 capitalize">
                Class: {avatar.characterType} • Level {levelInfo.level}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/explore" className="btn-primary">
              <Compass className="h-4 w-4" />
              Continue Adventure
            </Link>
            <Link to="/missions" className="btn-secondary">
              Mission Center
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="glass-card p-5">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-200/75">
              <span>Total Experience</span>
              <Sparkles className="h-4 w-4 text-amber-300" />
            </div>
            <p className="mt-2 font-display text-3xl font-bold text-amber-300">{xp} XP</p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-black/40">
              <div
                className="h-full rounded-full bg-amber-400"
                style={{ width: `${levelInfo.progressPercent}%` }}
              />
            </div>
            <p className="mt-1.5 text-[11px] text-emerald-100/65">
              {levelInfo.currentLevelXp} / {levelInfo.nextLevelXp} XP to Level {levelInfo.level + 1}
            </p>
          </div>

          <div className="glass-card p-5">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-200/75">
              <span>Missions Completed</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="mt-2 font-display text-3xl font-bold text-emerald-300">
              {completedMissionIds.length} / {MISSIONS_DATA.length}
            </p>
            <p className="mt-2 text-xs text-emerald-100/65">
              {MISSIONS_DATA.length - completedMissionIds.length} missions remaining
            </p>
          </div>

          <div className="glass-card p-5">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-200/75">
              <span>Planet Restoration</span>
              <TrendingUp className="h-4 w-4 text-teal-300" />
            </div>
            <p className="mt-2 font-display text-3xl font-bold text-teal-300">
              {overallRestoration}%
            </p>
            <p className="mt-2 text-xs text-emerald-100/65">Combined across 4 worlds</p>
          </div>

          <div className="glass-card p-5">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-200/75">
              <span>Badges Earned</span>
              <Award className="h-4 w-4 text-violet-300" />
            </div>
            <p className="mt-2 font-display text-3xl font-bold text-violet-300">
              {unlockedBadgeIds.length} / {BADGES_DATA.length}
            </p>
            <Link to="/rewards" className="mt-2 inline-block text-xs text-violet-200 underline">
              View Rewards
            </Link>
          </div>
        </div>

        {/* World Restoration Chart & Recent Activity */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="glass-panel p-6 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-display text-lg font-bold text-white">
                World Restoration Progress
              </h2>
              <div className="flex items-center gap-3">
                <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80" aria-hidden="true">
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="7"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={ringOffset}
                  />
                </svg>
                <div className="text-xs">
                  <p className="font-display text-base font-bold text-emerald-300">
                    {overallRestoration}%
                  </p>
                  <p className="text-emerald-200/70">Global Health</p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              {WORLDS_DATA.map((w) => {
                const pct = getWorldRestorationPercent(w.id, completedMissionIds);
                return (
                  <div key={w.id}>
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-emerald-100">{w.name}</span>
                      <span style={{ color: w.accentColor }}>{pct}%</span>
                    </div>
                    <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-black/40">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: w.themeColor }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
              {difficultyStats.map(({ diff, done, total }) => (
                <div
                  key={diff}
                  className="rounded-xl border border-emerald-400/15 bg-emerald-950/60 p-3 text-center"
                >
                  <p className="text-[11px] font-semibold text-emerald-200/75">{diff}</p>
                  <p className="mt-1 font-display text-base font-bold text-white">
                    {done}/{total}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 lg:col-span-5">
            <h2 className="font-display text-lg font-bold text-white">Recent Activity</h2>
            <div className="mt-4 space-y-3">
              {activities.slice(0, 6).map((act) => (
                <div
                  key={act.id}
                  className="rounded-xl border border-emerald-400/15 bg-emerald-950/60 p-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-display text-xs font-bold text-emerald-100">{act.title}</p>
                    {act.xpEarned && (
                      <span className="text-[11px] font-bold text-amber-300">
                        +{act.xpEarned} XP
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-[11px] text-emerald-200/70">{act.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
