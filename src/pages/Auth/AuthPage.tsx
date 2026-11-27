import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShieldAlert, Sparkles, UserPlus, LogIn } from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { useGameStore } from '../../store/useGameStore';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const loginDemo = useGameStore((s) => s.loginDemo);
  const registerDemo = useGameStore((s) => s.registerDemo);
  const user = useGameStore((s) => s.user);
  const logout = useGameStore((s) => s.logout);

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (mode === 'register' && username.trim().length < 3) {
      setError('Explorer username must be at least 3 characters.');
      return;
    }
    if (!validateEmail(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (mode === 'register' && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (mode === 'login') {
      loginDemo(email.trim());
      setSuccessMsg('Signed in to local demo session! Redirecting to Avatar Studio...');
    } else {
      registerDemo(username.trim(), email.trim());
      setSuccessMsg('Demo account created and saved locally! Redirecting to Avatar Studio...');
    }

    setTimeout(() => navigate('/avatar'), 700);
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
        <div className="glass-panel p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
            <Sparkles className="h-4 w-4" />
            <span>VERDANTIA EXPLORER PORTAL</span>
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold text-white">
            {mode === 'login' ? 'Welcome Back, Explorer' : 'Join Verdantia'}
          </h1>
          <p className="mt-1 text-sm text-emerald-100/75">
            {mode === 'login'
              ? 'Sign in to continue your planetary restoration progress.'
              : 'Create a local demo profile to save your avatar, XP, and badges.'}
          </p>

          <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-sky-400/25 bg-sky-500/10 p-3 text-xs text-sky-200">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
            <span>
              <strong>Frontend Demo Auth:</strong> Credentials are validated locally and stored in
              your browser&apos;s <code>localStorage</code>. This is demonstration functionality
              only, not production server authentication.
            </span>
          </div>

          {user.isAuthenticated && (
            <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-400/30 bg-emerald-500/15 p-3 text-xs text-emerald-100">
              <span>
                Currently signed in as <strong>{user.username}</strong> ({user.email})
              </span>
              <button
                type="button"
                onClick={logout}
                className="font-semibold text-amber-300 underline hover:text-amber-200"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mode Tabs */}
          <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-black/30 p-1">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError(null);
              }}
              className={`flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition ${
                mode === 'login'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-emerald-100/75 hover:text-white'
              }`}
            >
              <LogIn className="h-4 w-4" />
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setError(null);
              }}
              className={`flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition ${
                mode === 'register'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-emerald-100/75 hover:text-white'
              }`}
            >
              <UserPlus className="h-4 w-4" />
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            {mode === 'register' && (
              <div>
                <label htmlFor="auth-username" className="block text-xs font-semibold text-emerald-200">
                  Explorer Username
                </label>
                <input
                  id="auth-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. CanopyRanger"
                  className="mt-1.5 w-full rounded-xl border border-emerald-400/25 bg-emerald-950/70 px-4 py-2.5 text-sm text-white placeholder-emerald-300/40 focus:border-emerald-400 focus:outline-none"
                />
              </div>
            )}

            <div>
              <label htmlFor="auth-email" className="block text-xs font-semibold text-emerald-200">
                Email Address
              </label>
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="explorer@verdantia.local"
                className="mt-1.5 w-full rounded-xl border border-emerald-400/25 bg-emerald-950/70 px-4 py-2.5 text-sm text-white placeholder-emerald-300/40 focus:border-emerald-400 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="auth-password" className="block text-xs font-semibold text-emerald-200">
                Password
              </label>
              <div className="relative mt-1.5">
                <input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full rounded-xl border border-emerald-400/25 bg-emerald-950/70 px-4 py-2.5 pr-11 text-sm text-white placeholder-emerald-300/40 focus:border-emerald-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-300/70 hover:text-emerald-200"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label htmlFor="auth-confirm" className="block text-xs font-semibold text-emerald-200">
                  Confirm Password
                </label>
                <input
                  id="auth-confirm"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="mt-1.5 w-full rounded-xl border border-emerald-400/25 bg-emerald-950/70 px-4 py-2.5 text-sm text-white placeholder-emerald-300/40 focus:border-emerald-400 focus:outline-none"
                />
              </div>
            )}

            {error && (
              <div role="alert" className="rounded-xl border border-rose-400/40 bg-rose-500/15 px-4 py-2.5 text-xs font-medium text-rose-200">
                {error}
              </div>
            )}

            {successMsg && (
              <div role="status" className="rounded-xl border border-emerald-400/40 bg-emerald-500/15 px-4 py-2.5 text-xs font-medium text-emerald-200">
                {successMsg}
              </div>
            )}

            <button type="submit" className="btn-primary w-full">
              {mode === 'login' ? 'Sign In (Demo)' : 'Create Explorer Profile'}
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};
