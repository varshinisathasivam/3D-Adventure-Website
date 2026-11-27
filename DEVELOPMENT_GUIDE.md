# Development Guide — VERDANTIA

## Architecture & State Management

All persistent state lives in `src/store/useGameStore.ts` using Zustand with `persist` (`verdantia-state-v1` in `localStorage`).

### Key Integrity Rules
- **No Duplicate XP:** `completeMission` checks `completedMissionIds` before awarding XP. Replaying a mission works for practice without inflating XP.
- **Answer Validation:** Missions require at least 60% correct answers (`Math.ceil(totalQuestions * 0.6)`) before marking complete or awarding XP.
- **Automatic Progression:** Completing missions recalculates `level` via `calculateLevelFromXp` and evaluates all 8 badges in `evaluateBadges`.

## Adding a New Mission
1. Add the mission object to `MISSIONS_DATA` in `src/data/missions/missionsData.ts` with unique `id`, `worldId`, `coordinates`, and `questions`.
2. Both `WorldPlayPage` (3D beacons) and `MissionCenterPage` will pick it up automatically.

## Performance Guidelines (Intel UHD Graphics 620)
- Keep geometry counts low (`icosahedronGeometry` detail `<= 2`, `dodecahedronGeometry` detail `0`).
- Avoid real-time shadow maps (`shadows` disabled on `<Canvas>`).
- Cap `Sparkles` particle counts (`<= 40` on Medium, `<= 18` on Low).
- Wrap every 3D viewport in `<SafeCanvas>` so non-WebGL browsers fall back gracefully to 2D.
