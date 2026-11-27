# Project Structure — VERDANTIA

```text
3D-Adventure/
├── index.html
├── package.json
├── package-lock.json
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── eslint.config.js
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── types/
    │   └── index.ts                 # Shared TypeScript interfaces
    ├── styles/
    │   └── index.css                # Tailwind layers, glass utilities, reduced-motion rules
    ├── store/
    │   └── useGameStore.ts          # Centralized Zustand store + localStorage persistence
    ├── utils/
    │   └── webgl.ts                 # WebGL capability check + Web Audio chimes
    ├── services/
    │   └── companionService.ts      # Local keyword-based Eco-Guide matcher
    ├── data/
    │   ├── worlds/worldsData.ts     # 4 biomes metadata & unlock levels
    │   ├── missions/missionsData.ts # 20 missions (5 per world) with questions & explanations
    │   ├── rewards/rewardsData.ts   # Level thresholds & 8 achievement badges
    │   ├── knowledge/knowledgeBase.ts # Offline environmental Q&A knowledge base
    │   └── leaderboard/leaderboardData.ts # Sample demo leaderboard explorers
    ├── components/
    │   ├── 3d/
    │   │   ├── SafeCanvas.tsx       # Perf-tuned R3F Canvas + 2D WebGL fallback
    │   │   └── MissionBeacon.tsx    # Interactive 3D mission crystal markers
    │   ├── avatar/
    │   │   └── Avatar3D.tsx         # Procedural low-poly customizable 3D avatar
    │   ├── common/
    │   │   └── NotificationToasts.tsx # XP, level-up, and badge toast notifications
    │   ├── layout/
    │   │   ├── AppLayout.tsx
    │   │   ├── Navbar.tsx
    │   │   └── Footer.tsx
    │   └── missions/
    │       └── MissionModal.tsx     # Reusable quiz & validation modal
    ├── scenes/
    │   ├── Planet/
    │   │   ├── PlanetHeroScene.tsx
    │   │   └── PlanetExplorerScene.tsx
    │   ├── Forest/ForestWorldScene.tsx
    │   ├── Ocean/OceanWorldScene.tsx
    │   ├── Desert/DesertWorldScene.tsx
    │   └── FutureCity/FutureCityScene.tsx
    ├── pages/
    │   ├── Landing/LandingPage.tsx
    │   ├── Auth/AuthPage.tsx
    │   ├── Avatar/AvatarPage.tsx
    │   ├── Explorer/WorldExplorerPage.tsx
    │   ├── Worlds/WorldPlayPage.tsx
    │   ├── MissionCenter/MissionCenterPage.tsx
    │   ├── Companion/CompanionPage.tsx
    │   ├── Dashboard/DashboardPage.tsx
    │   ├── Rewards/RewardsPage.tsx
    │   ├── Leaderboard/LeaderboardPage.tsx
    │   └── Profile/ProfilePage.tsx
    ├── routes/
    │   └── AppRouter.tsx            # Lazy-loaded routes
    └── test/
        ├── setup.ts
        ├── gameStore.test.ts
        ├── companion.test.ts
        └── ui.test.tsx
```
