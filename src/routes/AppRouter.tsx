import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const LandingPage = lazy(() =>
  import('../pages/Landing/LandingPage').then((m) => ({ default: m.LandingPage })),
);
const AuthPage = lazy(() =>
  import('../pages/Auth/AuthPage').then((m) => ({ default: m.AuthPage })),
);
const AvatarPage = lazy(() =>
  import('../pages/Avatar/AvatarPage').then((m) => ({ default: m.AvatarPage })),
);
const WorldExplorerPage = lazy(() =>
  import('../pages/Explorer/WorldExplorerPage').then((m) => ({ default: m.WorldExplorerPage })),
);
const WorldPlayPage = lazy(() =>
  import('../pages/Worlds/WorldPlayPage').then((m) => ({ default: m.WorldPlayPage })),
);
const MissionCenterPage = lazy(() =>
  import('../pages/MissionCenter/MissionCenterPage').then((m) => ({ default: m.MissionCenterPage })),
);
const CompanionPage = lazy(() =>
  import('../pages/Companion/CompanionPage').then((m) => ({ default: m.CompanionPage })),
);
const DashboardPage = lazy(() =>
  import('../pages/Dashboard/DashboardPage').then((m) => ({ default: m.DashboardPage })),
);
const RewardsPage = lazy(() =>
  import('../pages/Rewards/RewardsPage').then((m) => ({ default: m.RewardsPage })),
);
const LeaderboardPage = lazy(() =>
  import('../pages/Leaderboard/LeaderboardPage').then((m) => ({ default: m.LeaderboardPage })),
);
const ProfilePage = lazy(() =>
  import('../pages/Profile/ProfilePage').then((m) => ({ default: m.ProfilePage })),
);

const RouteFallback: React.FC = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#062018] text-emerald-200">
    <div className="flex flex-col items-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-400/30 border-t-emerald-400" />
      <p className="font-display text-sm font-semibold">Loading Verdantia...</p>
    </div>
  </div>
);

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/avatar" element={<AvatarPage />} />
          <Route path="/explore" element={<WorldExplorerPage />} />
          <Route path="/world/:worldId" element={<WorldPlayPage />} />
          <Route path="/missions" element={<MissionCenterPage />} />
          <Route path="/companion" element={<CompanionPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
