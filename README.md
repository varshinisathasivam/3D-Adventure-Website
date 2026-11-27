# VERDANTIA — The Living Planet

**Tagline:** *Play. Explore. Protect. Transform.*

VERDANTIA is an interactive 3D environmental adventure web application built with React, TypeScript, Three.js / React Three Fiber, Tailwind CSS, GSAP, and Zustand. Players explore four stylized low-poly worlds, complete validated environmental missions, earn XP and badges, customize their 3D avatar, and watch each ecosystem visibly recover.

> **Frontend Phase Note:** This repository currently implements the complete frontend experience using local mock data, custom TypeScript logic, and `localStorage` persistence. Backend services (Java/Spring Boot/MySQL) are intentionally deferred.

## Tech Stack

- **Framework:** React 18 + TypeScript + Vite
- **3D Engine:** Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
- **Styling & Motion:** Tailwind CSS + GSAP
- **Routing & State:** React Router v6 + Zustand (with `persist` middleware)
- **Icons:** Lucide React
- **Testing:** Vitest + React Testing Library + jsdom

## Quick Start

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (typically `http://localhost:5173`).

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite development server |
| `npm run build` | Type-check (`tsc -b`) and build production bundle |
| `npm run lint` | Run ESLint across all TypeScript/TSX files |
| `npm test` | Run Vitest unit and UI test suite |
| `npm run preview` | Preview the production build locally |

## Hardware & Performance Optimization

Designed for smooth interaction on integrated graphics (tested target: Intel Core i5-8250U, 16 GB RAM, Intel UHD Graphics 620, Windows 11):
- Procedural low-poly geometries (no heavy external textures or high-poly meshes).
- Route-level and world-level lazy loading (`React.lazy` + `Suspense`) so only the active 3D world is mounted.
- Configurable **Low** and **Medium** graphics quality in Profile & Settings.
- **Reduced Motion** mode to disable floating, camera sway, and particle animations.
- Automatic **2D Graceful Fallback** when WebGL is unavailable.

## Documentation

- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
- [FRONTEND_FEATURES.md](./FRONTEND_FEATURES.md)
- [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)
- [TESTING_REPORT.md](./TESTING_REPORT.md)
- [GITHUB_WORKFLOW.md](./GITHUB_WORKFLOW.md)
