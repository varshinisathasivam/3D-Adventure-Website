export type WorldId = 'forest' | 'ocean' | 'desert' | 'future-city';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type GraphicsQuality = 'low' | 'medium';

export type CharacterType = 'ranger' | 'guardian' | 'scientist' | 'spirit';

export type AccessoryType = 'none' | 'leaf-crown' | 'visor' | 'halo' | 'explorer-hat';

export type HairstyleType = 'short' | 'flowing' | 'spiky' | 'bun';

export interface AvatarConfig {
  characterType: CharacterType;
  outfitColor: string;
  hairColor: string;
  skinTone: string;
  hairstyle: HairstyleType;
  accessory: AccessoryType;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  isAuthenticated: boolean;
  joinedAt: string;
}

export interface MissionQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Mission {
  id: string;
  worldId: WorldId;
  order: number;
  title: string;
  shortDescription: string;
  instructions: string;
  difficulty: Difficulty;
  xpReward: number;
  ecoImpactPoints: number;
  locationLabel: string;
  coordinates: [number, number, number];
  questions: MissionQuestion[];
}

export interface WorldInfo {
  id: WorldId;
  name: string;
  subtitle: string;
  description: string;
  themeColor: string;
  accentColor: string;
  gradient: string;
  unlockLevel: number;
  planetPosition: [number, number, number];
  environmentFocus: string;
  restorationStages: string[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'world' | 'milestone' | 'mastery';
  requirementText: string;
  color: string;
}

export interface ActivityLog {
  id: string;
  type: 'mission' | 'badge' | 'level' | 'avatar' | 'world';
  title: string;
  detail: string;
  xpEarned?: number;
  timestamp: string;
}

export interface GameSettings {
  soundEnabled: boolean;
  graphicsQuality: GraphicsQuality;
  reducedMotion: boolean;
}

export interface CompanionTopic {
  id: string;
  title: string;
  keywords: string[];
  suggestedQuestion: string;
  response: string;
  actionTip: string;
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  username: string;
  avatarColor: string;
  characterType: CharacterType;
  level: number;
  weeklyXp: number;
  overallXp: number;
  missionsCompleted: number;
  isDemoUser: boolean;
}
