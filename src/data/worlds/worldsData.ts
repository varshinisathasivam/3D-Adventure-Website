import { WorldInfo, WorldId } from '../../types';

export const WORLDS_DATA: WorldInfo[] = [
  {
    id: 'forest',
    name: 'Green Forest',
    subtitle: 'Emerald Canopy Sanctuary',
    description:
      'A lush woodland recovering from deforestation and litter. Plant native saplings, protect endangered wildlife, and restore the ancient river valley.',
    themeColor: '#10b981',
    accentColor: '#34d399',
    gradient: 'from-emerald-500/30 via-teal-500/20 to-green-900/40',
    unlockLevel: 1,
    planetPosition: [0.85, 0.55, 1.35],
    environmentFocus: 'Reforestation, Wildlife Protection & Waste Sorting',
    restorationStages: [
      'Barren clearings and scattered litter',
      'Young saplings sprouting along the river',
      'Wildlife returning to cleaner groves',
      'Thriving emerald canopy and glowing fireflies',
    ],
  },
  {
    id: 'ocean',
    name: 'Blue Ocean',
    subtitle: 'Turquoise Coral Abyss',
    description:
      'Dive beneath crystal waves to clear drifting microplastics, revive bleached coral reefs, and safeguard gentle marine life.',
    themeColor: '#14b8a6',
    accentColor: '#38bdf8',
    gradient: 'from-teal-500/30 via-sky-500/20 to-cyan-950/40',
    unlockLevel: 1,
    planetPosition: [-1.1, 0.2, 1.2],
    environmentFocus: 'Marine Cleanup, Coral Revival & Sustainable Fishing',
    restorationStages: [
      'Cloudy waters with drifting plastic debris',
      'Cleaned currents and recovering sea grass',
      'Colorful coral polyps blooming again',
      'Vibrant reef teeming with schooling fish',
    ],
  },
  {
    id: 'desert',
    name: 'Desert World',
    subtitle: 'Sunlit Oasis Dunes',
    description:
      'Transform arid golden dunes through smart water harvesting, solar shade, and native drought-resistant flora.',
    themeColor: '#f59e0b',
    accentColor: '#facc15',
    gradient: 'from-amber-500/30 via-yellow-500/20 to-orange-950/40',
    unlockLevel: 2,
    planetPosition: [1.15, -0.45, -1.05],
    environmentFocus: 'Water Conservation, Oasis Revival & Soil Retention',
    restorationStages: [
      'Parched dunes and dry oasis basin',
      'Dew catchers and stone water channels',
      'Palm groves and desert wildflowers emerging',
      'Lush oasis sanctuary with shimmering spring',
    ],
  },
  {
    id: 'future-city',
    name: 'Future City',
    subtitle: 'Solaris Eco-Metropolis',
    description:
      'Upgrade a smog-heavy skyline into a clean, circular eco-city powered by wind, solar canopies, and vertical gardens.',
    themeColor: '#8b5cf6',
    accentColor: '#38bdf8',
    gradient: 'from-violet-500/30 via-sky-500/20 to-indigo-950/40',
    unlockLevel: 3,
    planetPosition: [-0.95, 0.75, -1.15],
    environmentFocus: 'Renewable Energy, Clean Transit & Zero-Waste Design',
    restorationStages: [
      'Hazy skyline with idle towers',
      'Solar rooftops and wind turbines spinning',
      'Vertical gardens and electric transit lanes',
      'Radiant carbon-neutral green metropolis',
    ],
  },
];

export const WORLDS_MAP: Record<WorldId, WorldInfo> = WORLDS_DATA.reduce(
  (acc, world) => {
    acc[world.id] = world;
    return acc;
  },
  {} as Record<WorldId, WorldInfo>,
);
