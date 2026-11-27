import React, { useMemo, useState } from 'react';
import { Trophy, User, Info } from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { DEMO_LEADERBOARD_USERS } from '../../data/leaderboard/leaderboardData';
import { useGameStore } from '../../store/useGameStore';
import { LeaderboardEntry } from '../../types';

export const LeaderboardPage: React.FC = () => {
  const [period, setPeriod] = useState<'weekly' | 'overall'>('overall');
  const user = useGameStore((s) => s.user);
  const avatar = useGameStore((s) => s.avatar);
  const xp = useGameStore((s) => s.xp);
  const level = useGameStore((s) => s.level);
  const completedMissionIds = useGameStore((s) => s.completedMissionIds);

  const rankedEntries = useMemo(() => {
    const currentPlayer: Omit<LeaderboardEntry, 'rank'> = {
      id: 'current-player',
      username: `${user.username} (You)`,
      avatarColor: avatar.outfitColor,
      characterType: avatar.characterType,
      level,
      weeklyXp: xp,
      overallXp: xp,
      missionsCompleted: completedMissionIds.length,
      isDemoUser: false,
    };

    const combined = [...DEMO_LEADERBOARD_USERS, currentPlayer].sort((a, b) =>
      period === 'weekly' ? b.weeklyXp - a.weeklyXp : b.overallXp - a.overallXp,
    );

    return combined.map((entry, idx) => ({
      ...entry,
      rank: idx + 1,
    }));
  }, [period, user.username, avatar, xp, level, completedMissionIds.length]);

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
              Community Rankings
            </span>
            <h1 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
              Verdantia Leaderboard
            </h1>
          </div>

          <div className="inline-flex rounded-xl border border-emerald-400/25 bg-emerald-950/70 p-1">
            <button
              type="button"
              onClick={() => setPeriod('weekly')}
              className={`rounded-lg px-4 py-1.5 text-xs font-bold transition ${
                period === 'weekly'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-emerald-100/75 hover:text-white'
              }`}
            >
              Weekly
            </button>
            <button
              type="button"
              onClick={() => setPeriod('overall')}
              className={`rounded-lg px-4 py-1.5 text-xs font-bold transition ${
                period === 'overall'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-emerald-100/75 hover:text-white'
              }`}
            >
              Overall
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-sky-400/25 bg-sky-500/10 px-4 py-2.5 text-xs text-sky-200">
          <Info className="h-4 w-4 shrink-0" />
          <span>
            Showing sample demo explorers alongside your live local progress.
          </span>
        </div>

        <div className="glass-panel mt-6 overflow-hidden">
          <div className="divide-y divide-white/10">
            {rankedEntries.map((entry) => {
              const isMe = !entry.isDemoUser;
              const score = period === 'weekly' ? entry.weeklyXp : entry.overallXp;

              return (
                <div
                  key={entry.id}
                  className={`flex items-center justify-between gap-4 px-5 py-4 ${
                    isMe ? 'bg-emerald-500/15 ring-1 ring-inset ring-emerald-400/40' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-xl font-display text-sm font-bold ${
                        entry.rank === 1
                          ? 'bg-amber-400 text-slate-950'
                          : entry.rank === 2
                            ? 'bg-slate-200 text-slate-900'
                            : entry.rank === 3
                              ? 'bg-amber-700 text-white'
                              : 'bg-white/10 text-emerald-100'
                      }`}
                    >
                      {entry.rank <= 3 ? <Trophy className="h-4 w-4" /> : entry.rank}
                    </span>

                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20"
                      style={{ backgroundColor: entry.avatarColor }}
                    >
                      <User className="h-5 w-5 text-slate-950" />
                    </span>

                    <div>
                      <p className="font-display text-sm font-bold text-white">
                        {entry.username}
                      </p>
                      <p className="text-xs text-emerald-200/70 capitalize">
                        Lv.{entry.level} • {entry.characterType} • {entry.missionsCompleted} missions
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-display text-lg font-bold text-amber-300">{score} XP</p>
                    <p className="text-[10px] uppercase tracking-wider text-emerald-200/60">
                      {period}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
