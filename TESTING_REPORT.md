# Testing Report — VERDANTIA

## Test Stack
- **Test Runner:** Vitest (`vitest run`)
- **DOM & Component Testing:** `@testing-library/react` + `@testing-library/jest-dom` + `jsdom`
- **Type Checking & Bundling:** `tsc -b && vite build`
- **Linting:** ESLint (`eslint .`)

## Covered Scenarios
1. **Store & Progression (`src/test/gameStore.test.ts`)**:
   - Rejects failing mission attempts (0 XP awarded).
   - Prevents duplicate XP when replaying an already-completed mission.
   - Unlocks *First Sprout*, *Forest Guardian*, and *Identity Forged* badges.
   - Updates world restoration percentage and levels up accurately.
   - Persists avatar customization, demo auth, and graphics/reduced-motion settings.
2. **Local Eco-Guide (`src/test/companion.test.ts`)**:
   - Matches environmental keywords to the correct local knowledge topic.
   - Returns the honest fallback response for out-of-scope queries.
3. **UI & Pages (`src/test/ui.test.tsx`)**:
   - Renders `LandingPage` with tagline and 2D WebGL fallback in jsdom.
   - Validates `AuthPage` email and password length error messages.
   - Submits questions in `CompanionPage` and renders responses.
   - Filters missions by world in `MissionCenterPage` and renders `DashboardPage`.

## Known Limitations (Frontend Phase)
- Authentication and leaderboard rankings use local demo data and `localStorage` rather than a live backend database.
- Interactive 3D WebGL rendering is verified in real browsers, while headless `jsdom` tests exercise the 2D WebGL fallback path.
