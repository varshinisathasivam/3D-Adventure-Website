import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  LogOut,
  Monitor,
  RotateCcw,
  Sparkles,
  User,
  Volume2,
  VolumeX,
  AlertTriangle,
} from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { useGameStore } from '../../store/useGameStore';

export const ProfilePage: React.FC = () => {
  const user = useGameStore((s) => s.user);
  const settings = useGameStore((s) => s.settings);
  const updateUsername = useGameStore((s) => s.updateUsername);
  const updateSettings = useGameStore((s) => s.updateSettings);
  const resetProgress = useGameStore((s) => s.resetProgress);
  const logout = useGameStore((s) => s.logout);

  const [usernameInput, setUsernameInput] = useState(user.username);
  const [savedName, setSavedName] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim().length < 2) return;
    updateUsername(usernameInput);
    setSavedName(true);
    setTimeout(() => setSavedName(false), 2000);
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
          Preferences & Account
        </span>
        <h1 className="mt-1 font-display text-3xl font-bold text-white">Profile & Settings</h1>

        <div className="mt-6 space-y-6">
          {/* Username & Avatar */}
          <div className="glass-panel p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-white">
              <User className="h-5 w-5 text-emerald-400" />
              Explorer Identity
            </h2>
            <form onSubmit={handleSaveName} className="mt-4 flex flex-wrap gap-3">
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                aria-label="Explorer Username"
                className="flex-1 rounded-xl border border-emerald-400/25 bg-emerald-950/70 px-4 py-2.5 text-sm text-white focus:border-emerald-400 focus:outline-none"
              />
              <button type="submit" className="btn-primary text-sm">
                {savedName ? (
                  <>
                    <Check className="h-4 w-4" /> Saved
                  </>
                ) : (
                  'Save Username'
                )}
              </button>
              <Link to="/avatar" className="btn-secondary text-sm">
                Customize Avatar
              </Link>
            </form>
          </div>

          {/* Performance & Accessibility */}
          <div className="glass-panel space-y-5 p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-white">
              <Monitor className="h-5 w-5 text-sky-400" />
              Graphics, Audio & Accessibility
            </h2>

            {/* Graphics Quality */}
            <div className="flex flex-col justify-between gap-3 rounded-2xl border border-white/10 bg-black/25 p-4 sm:flex-row sm:items-center">
              <div>
                <p className="font-display text-sm font-bold text-white">3D Graphics Quality</p>
                <p className="text-xs text-emerald-100/70">
                  Optimized for integrated GPUs (Intel UHD 620). Choose Low for maximum battery &
                  smoothness.
                </p>
              </div>
              <div className="inline-flex shrink-0 rounded-xl bg-emerald-950 p-1">
                {(['low', 'medium'] as const).map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => updateSettings({ graphicsQuality: q })}
                    className={`rounded-lg px-4 py-1.5 text-xs font-bold capitalize transition ${
                      settings.graphicsQuality === q
                        ? 'bg-emerald-500 text-slate-950'
                        : 'text-emerald-100/75'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Reduced Motion */}
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/25 p-4">
              <div>
                <p className="font-display text-sm font-bold text-white">Reduced Motion</p>
                <p className="text-xs text-emerald-100/70">
                  Disables floating animations, camera sway, and particle motion.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.reducedMotion}
                onClick={() => updateSettings({ reducedMotion: !settings.reducedMotion })}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  settings.reducedMotion
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-white/10 text-emerald-100'
                }`}
              >
                {settings.reducedMotion ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            {/* Sound Toggle */}
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="flex items-center gap-3">
                {settings.soundEnabled ? (
                  <Volume2 className="h-5 w-5 text-emerald-300" />
                ) : (
                  <VolumeX className="h-5 w-5 text-slate-400" />
                )}
                <div>
                  <p className="font-display text-sm font-bold text-white">UI Sound Effects</p>
                  <p className="text-xs text-emerald-100/70">
                    Subtle Web Audio chimes for mission completion and badges.
                  </p>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.soundEnabled}
                onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  settings.soundEnabled
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-white/10 text-emerald-100'
                }`}
              >
                {settings.soundEnabled ? 'On' : 'Off'}
              </button>
            </div>
          </div>

          {/* Demo Data & Session */}
          <div className="glass-panel flex flex-wrap items-center justify-between gap-4 p-6">
            <div>
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-white">
                <Sparkles className="h-5 w-5 text-amber-300" />
                Demo Session & Progress
              </h2>
              <p className="mt-1 text-xs text-emerald-100/70">
                Resetting clears local XP, missions, and badges from this browser.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {!confirmReset ? (
                <button
                  type="button"
                  onClick={() => setConfirmReset(true)}
                  className="inline-flex items-center gap-2 rounded-xl border border-rose-400/40 bg-rose-500/15 px-4 py-2.5 text-xs font-bold text-rose-200 hover:bg-rose-500/25"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset Demo Progress
                </button>
              ) : (
                <div className="flex items-center gap-2 rounded-xl border border-rose-400/50 bg-rose-950/90 p-2">
                  <AlertTriangle className="h-4 w-4 text-rose-300" />
                  <span className="text-xs text-rose-100">Confirm reset?</span>
                  <button
                    type="button"
                    onClick={() => {
                      resetProgress();
                      setConfirmReset(false);
                    }}
                    className="rounded-lg bg-rose-500 px-3 py-1 text-xs font-bold text-white"
                  >
                    Yes, Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmReset(false)}
                    className="rounded-lg bg-white/10 px-3 py-1 text-xs text-white"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {user.isAuthenticated && (
                <button
                  type="button"
                  onClick={logout}
                  className="btn-secondary text-xs"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
