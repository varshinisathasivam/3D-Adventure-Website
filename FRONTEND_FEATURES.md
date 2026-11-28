# Frontend Features — VERDANTIA

## Implemented Pages (All 14 Logical Experiences)

1. **Landing Page (`/`)**: Full-screen 3D animated planet hero with floating islands, clouds, atmospheric ring, and orbiting eco-moon, GSAP text entrance, storytelling section with live Planetary Restoration Progress meter, 4 world preview cards, core features, and footer.
2. **Login & Register (`/auth`)**: Demo authentication with email/password validation, show/hide password toggle, confirm password check, error alerts, and `localStorage` persistence. *(Clearly labeled as frontend demo auth only.)*
3. **Avatar Creation (`/avatar`)**: Interactive 3D low-poly avatar preview with arm sway & click-to-spin interaction, "Randomize Look" button, 4 character classes, 6 outfit colors, 4 skin tones, 4 hairstyles, hair colors, and 5 accessories. Saving locally unlocks the *Identity Forged* badge.
4. **3D World Explorer (`/explore`)**: Interactive 3D planet with 4 clickable zones, smooth camera focus interpolation, hover highlights, locked/unlocked states based on Explorer Level, per-world mission counts, live XP/Level bar, and world info cards.
5. **Green Forest World (`/world/forest`)**: Stylized 3D forest with growing trees, river, boulders, mountains, disappearing litter, sprouting wildflowers, returning deer & circling birds, and 5 playable missions.
6. **Blue Ocean World (`/world/ocean`)**: Underwater 3D scene with schooling fish, coral reefs that regain color, seagrass meadows, gliding sea turtle, removable surface plastic, and 5 playable missions.
7. **Desert World (`/world/desert`)**: Low-poly dunes, expanding oasis spring with grass ring, dew collector net, agrivoltaic solar shade canopy, emerging palm trees, and 5 water/solar conservation missions (unlocks at Level 2).
8. **Future City World (`/world/future-city`)**: Stylized eco-city with solar rooftops, spinning wind turbine, animated electric tram, pocket park trees, vertical gardens, and 5 sustainability missions (unlocks at Level 3).
9. **Mission Center (`/missions`)**: Unified view of all 20 missions with keyword search, world/difficulty/status filters, empty-state filter reset, and reusable `MissionModal` (with Escape key support and state reset on mission switch).
10. **Local Eco-Guide Companion (`/companion`)**: Offline rule-based keyword chatbot covering 10 environmental topics with suggested questions, `aria-live` chat region, clear chat button, and an honest fallback message.
11. **Player Dashboard (`/dashboard`)**: Live XP, level progress bar, completed missions count, SVG radial Global Health ring, per-world progress bars, Easy/Medium/Hard difficulty breakdown, badge count, and recent activity feed.
12. **Rewards & Achievements (`/rewards`)**: 8-level progression ladder with next-unlock milestone preview, category filter tabs (`All`, `World`, `Milestone`, `Mastery`), and 8 locked/unlocked achievement badges.
13. **Leaderboard (`/leaderboard`)**: Weekly and Overall rankings comparing clearly labeled sample demo explorers with the player's live local score and XP gap to the next rank.
14. **Profile & Settings (`/profile`)**: Username editor, graphics quality (`low` / `medium`), reduced-motion switch (`frameloop="demand"` in 3D), Web Audio sound toggle, reset progress with confirmation, and logout.

## Branding & Accessibility
- **Favicon Suite:** Matching VERDANTIA `favicon.svg`, `favicon-16x16.png`, `favicon-32x32.png`, `favicon-48x48.png`, `favicon.ico`, and `apple-touch-icon.png` in `public/`.
- **Accessibility:** Skip-to-main-content link, global `:focus-visible` outlines, semantic nav landmarks, and `aria-pressed` / `aria-live` attributes.
