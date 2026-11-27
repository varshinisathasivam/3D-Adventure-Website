import React, { useEffect } from 'react';
import { Award, Sparkles, TrendingUp, Info, X } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export const NotificationToasts: React.FC = () => {
  const notifications = useGameStore((s) => s.notifications);
  const dismissNotification = useGameStore((s) => s.dismissNotification);

  useEffect(() => {
    if (notifications.length === 0) return;
    const timers = notifications.map((n) =>
      setTimeout(() => dismissNotification(n.id), 5000),
    );
    return () => timers.forEach(clearTimeout);
  }, [notifications, dismissNotification]);

  if (notifications.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-5 right-5 z-50 flex max-w-sm flex-col gap-3"
      aria-live="polite"
    >
      {notifications.map((note) => {
        const Icon =
          note.variant === 'badge'
            ? Award
            : note.variant === 'level'
              ? TrendingUp
              : note.variant === 'xp'
                ? Sparkles
                : Info;

        const accent =
          note.variant === 'badge'
            ? 'border-amber-400/40 bg-amber-950/90 text-amber-100'
            : note.variant === 'level'
              ? 'border-violet-400/40 bg-violet-950/90 text-violet-100'
              : 'border-emerald-400/40 bg-emerald-950/90 text-emerald-100';

        return (
          <div
            key={note.id}
            className={`pointer-events-auto flex items-start gap-3 rounded-2xl border p-4 shadow-2xl backdrop-blur-lg ${accent}`}
          >
            <div className="mt-0.5 rounded-xl bg-white/10 p-2">
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-display text-sm font-bold">{note.title}</p>
              <p className="mt-0.5 text-xs opacity-85">{note.description}</p>
            </div>
            <button
              type="button"
              onClick={() => dismissNotification(note.id)}
              className="rounded-lg p-1 opacity-70 hover:bg-white/10 hover:opacity-100"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
