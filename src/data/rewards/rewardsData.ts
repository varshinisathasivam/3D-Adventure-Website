import { Badge } from '../../types';

export const LEVEL_THRESHOLDS = [
  0,     // Level 1
  150,   // Level 2 (Unlocks Desert World)
  350,   // Level 3 (Unlocks Future City)
  600,   // Level 4
  900,   // Level 5
  1250,  // Level 6
  1650,  // Level 7
  2100,  // Level 8
];

export function calculateLevelFromXp(xp: number): {
  level: number;
  currentLevelXp: number;
  nextLevelXp: number;
  progressPercent: number;
} {
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
    } else {
      break;
    }
  }

  const currentFloor = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const nextCeil = LEVEL_THRESHOLDS[level] ?? currentFloor + 500;
  const span = Math.max(1, nextCeil - currentFloor);
  const progressPercent = Math.min(100, Math.round(((xp - currentFloor) / span) * 100));

  return {
    level,
    currentLevelXp: xp - currentFloor,
    nextLevelXp: nextCeil - currentFloor,
    progressPercent,
  };
}

export function getNextUnlockMilestone(level: number, xp: number): string {
  if (level < 2) {
    return `${Math.max(0, 150 - xp)} XP until Level 2 (Unlocks Desert World)`;
  }
  if (level < 3) {
    return `${Math.max(0, 350 - xp)} XP until Level 3 (Unlocks Future City)`;
  }
  const { currentLevelXp, nextLevelXp } = calculateLevelFromXp(xp);
  return `${Math.max(0, nextLevelXp - currentLevelXp)} XP until Level ${level + 1}`;
}

export const BADGES_DATA: Badge[] = [
  {
    id: 'first-step',
    title: 'First Sprout',
    description: 'Complete your very first environmental mission on Verdantia.',
    icon: 'Sprout',
    category: 'milestone',
    requirementText: 'Complete 1 mission',
    color: '#10b981',
  },
  {
    id: 'avatar-crafter',
    title: 'Identity Forged',
    description: 'Customize and save your personal Verdantia explorer avatar.',
    icon: 'UserCheck',
    category: 'milestone',
    requirementText: 'Save custom avatar',
    color: '#38bdf8',
  },
  {
    id: 'forest-guardian',
    title: 'Forest Guardian',
    description: 'Complete all 5 missions in the Green Forest world.',
    icon: 'Trees',
    category: 'world',
    requirementText: '5/5 Green Forest missions',
    color: '#22c55e',
  },
  {
    id: 'ocean-protector',
    title: 'Ocean Protector',
    description: 'Complete all 5 missions in the Blue Ocean world.',
    icon: 'Waves',
    category: 'world',
    requirementText: '5/5 Blue Ocean missions',
    color: '#14b8a6',
  },
  {
    id: 'desert-weaver',
    title: 'Oasis Weaver',
    description: 'Complete all 5 missions in the Desert World.',
    icon: 'Sun',
    category: 'world',
    requirementText: '5/5 Desert World missions',
    color: '#f59e0b',
  },
  {
    id: 'city-architect',
    title: 'Solaris Architect',
    description: 'Complete all 5 missions in the Future City world.',
    icon: 'Zap',
    category: 'world',
    requirementText: '5/5 Future City missions',
    color: '#8b5cf6',
  },
  {
    id: 'xp-500',
    title: 'Planetary Catalyst',
    description: 'Accumulate 500 or more Experience Points across Verdantia.',
    icon: 'Sparkles',
    category: 'milestone',
    requirementText: 'Reach 500 XP',
    color: '#facc15',
  },
  {
    id: 'planet-restorer',
    title: 'Living Planet Savior',
    description: 'Complete all 20 missions across all four worlds of Verdantia.',
    icon: 'Globe',
    category: 'mastery',
    requirementText: '20/20 missions completed',
    color: '#34d399',
  },
];
