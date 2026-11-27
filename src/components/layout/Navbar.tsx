import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Award,
  Bot,
  Compass,
  Globe2,
  LayoutDashboard,
  Menu,
  Settings,
  Sparkles,
  Target,
  Trophy,
  User,
  X,
} from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

const NAV_ITEMS = [
  { to: '/explore', label: 'Explorer', icon: Compass },
  { to: '/missions', label: 'Missions', icon: Target },
  { to: '/companion', label: 'Eco-Guide', icon: Bot },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/rewards', label: 'Rewards', icon: Award },
  { to: '/leaderboard', label: 'Ranks', icon: Trophy },
];

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const xp = useGameStore((s) => s.xp);
  const level = useGameStore((s) => s.level);
  const user = useGameStore((s) => s.user);
  const avatar = useGameStore((s) => s.avatar);

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-400/15 bg-[#051b14]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-wide text-emerald-50"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 via-teal-400 to-sky-400 text-slate-950 shadow-md shadow-emerald-500/30">
            <Globe2 className="h-5 w-5" />
          </span>
          <span className="bg-gradient-to-r from-emerald-200 via-teal-200 to-sky-200 bg-clip-text text-transparent">
            VERDANTIA
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/35'
                    : 'text-emerald-100/75 hover:bg-emerald-900/40 hover:text-emerald-50'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center gap-1.5 rounded-xl border border-amber-400/25 bg-amber-500/10 px-2.5 py-1.5 text-xs font-semibold text-amber-200 sm:gap-2 sm:px-3"
            title="Current Level & XP"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Lv.{level}</span>
            <span className="hidden text-amber-300/60 sm:inline">•</span>
            <span className="hidden sm:inline">{xp} XP</span>
          </div>

          <Link
            to="/avatar"
            className="hidden items-center gap-1.5 rounded-xl border border-emerald-400/25 bg-emerald-900/40 px-2.5 py-1.5 text-xs font-medium text-emerald-100 hover:bg-emerald-800/50 sm:inline-flex"
            title="Customize Avatar"
          >
            <span
              className="h-3.5 w-3.5 rounded-full ring-2 ring-white/30"
              style={{ backgroundColor: avatar.outfitColor }}
            />
            <span>Avatar</span>
          </Link>

          <Link
            to="/profile"
            className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-400/25 bg-emerald-950/60 p-2 text-emerald-100 hover:bg-emerald-900/60"
            aria-label="Profile and Settings"
            title="Profile & Settings"
          >
            <Settings className="h-4 w-4" />
          </Link>

          {!user.isAuthenticated ? (
            <Link
              to="/auth"
              className="hidden rounded-xl bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-400/40 hover:bg-emerald-500/30 sm:inline-flex"
            >
              Sign In
            </Link>
          ) : (
            <Link
              to="/dashboard"
              className="hidden items-center gap-1.5 rounded-xl bg-teal-500/15 px-3 py-1.5 text-xs font-semibold text-teal-200 ring-1 ring-teal-400/30 sm:inline-flex"
            >
              <User className="h-3.5 w-3.5" />
              <span className="max-w-[90px] truncate">{user.username}</span>
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex rounded-xl border border-emerald-400/25 p-2 text-emerald-100 lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-emerald-400/15 bg-[#062018] px-4 py-4 lg:hidden"
        >
          <div className="mb-3 flex items-center justify-between rounded-xl bg-emerald-900/30 px-3 py-2 text-xs text-emerald-200">
            <span>
              {user.username} • Lv.{level} ({xp} XP)
            </span>
            <Link
              to="/auth"
              onClick={() => setMobileOpen(false)}
              className="font-semibold text-amber-300 underline"
            >
              {user.isAuthenticated ? 'Account' : 'Sign In'}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/35'
                      : 'bg-emerald-950/50 text-emerald-100/80'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
            <Link
              to="/avatar"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 rounded-xl bg-emerald-950/50 px-3 py-2.5 text-sm font-medium text-emerald-100/80"
            >
              <User className="h-4 w-4" />
              Avatar
            </Link>
            <Link
              to="/profile"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 rounded-xl bg-emerald-950/50 px-3 py-2.5 text-sm font-medium text-emerald-100/80"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};
