import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  ActivityLog,
  AvatarConfig,
  GameSettings,
  UserProfile,
  WorldId,
} from '../types';
import { MISSIONS_DATA } from '../data/missions/missionsData';
import { BADGES_DATA, calculateLevelFromXp } from '../data/rewards/rewardsData';
import { WORLDS_MAP } from '../data/worlds/worldsData';

export interface ToastNotification {
  id: string;
  title: string;
  description: string;
  variant: 'xp' | 'badge' | 'level' | 'info';
}

export interface GameState {
  user: UserProfile;
  avatar: AvatarConfig;
  avatarSaved: boolean;
  xp: number;
  level: number;
  completedMissionIds: string[];
  unlockedBadgeIds: string[];
  activities: ActivityLog[];
  settings: GameSettings;
  notifications: ToastNotification[];
  selectedWorld: WorldId;

  // Actions
  loginDemo: (email: string, username?: string) => void;
  registerDemo: (username: string, email: string) => void;
  logout: () => void;
  updateUsername: (username: string) => void;
  updateAvatar: (config: Partial<AvatarConfig>, markSaved?: boolean) => void;
  setSelectedWorld: (worldId: WorldId) => void;
  completeMission: (missionId: string, correctAnswers: number, totalQuestions: number) => {
    passed: boolean;
    alreadyCompleted: boolean;
    xpAwarded: number;
    newlyUnlockedBadges: string[];
    leveledUp: boolean;
  };
  updateSettings: (partial: Partial<GameSettings>) => void;
  dismissNotification: (id: string) => void;
  pushNotification: (note: Omit<ToastNotification, 'id'>) => void;
  resetProgress: () => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'local-explorer',
  username: 'Verdantia Explorer',
  email: 'explorer@verdantia.local',
  isAuthenticated: false,
  joinedAt: new Date().toISOString(),
};

const DEFAULT_AVATAR: AvatarConfig = {
  characterType: 'ranger',
  outfitColor: '#10b981',
  hairColor: '#1e293b',
  skinTone: '#f1c27d',
  hairstyle: 'short',
  accessory: 'leaf-crown',
};

const DEFAULT_SETTINGS: GameSettings = {
  soundEnabled: true,
  graphicsQuality: 'medium',
  reducedMotion: false,
};

function evaluateBadges(
  completedMissionIds: string[],
  xp: number,
  avatarSaved: boolean,
  existingBadges: string[],
): string[] {
  const next = new Set(existingBadges);

  if (completedMissionIds.length >= 1) next.add('first-step');
  if (avatarSaved) next.add('avatar-crafter');
  if (xp >= 500) next.add('xp-500');
  if (completedMissionIds.length >= MISSIONS_DATA.length) next.add('planet-restorer');

  const countForWorld = (w: WorldId) =>
    MISSIONS_DATA.filter((m) => m.worldId === w && completedMissionIds.includes(m.id)).length;

  if (countForWorld('forest') >= 5) next.add('forest-guardian');
  if (countForWorld('ocean') >= 5) next.add('ocean-protector');
  if (countForWorld('desert') >= 5) next.add('desert-weaver');
  if (countForWorld('future-city') >= 5) next.add('city-architect');

  return Array.from(next);
}

export function getWorldRestorationPercent(worldId: WorldId, completedMissionIds: string[]): number {
  const worldMissions = MISSIONS_DATA.filter((m) => m.worldId === worldId);
  if (worldMissions.length === 0) return 0;
  const done = worldMissions.filter((m) => completedMissionIds.includes(m.id)).length;
  return Math.round((done / worldMissions.length) * 100);
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      user: DEFAULT_USER,
      avatar: DEFAULT_AVATAR,
      avatarSaved: false,
      xp: 0,
      level: 1,
      completedMissionIds: [],
      unlockedBadgeIds: [],
      activities: [
        {
          id: 'init-1',
          type: 'world',
          title: 'Arrived on Verdantia',
          detail: 'Ready to explore Green Forest & Blue Ocean.',
          timestamp: new Date().toISOString(),
        },
      ],
      settings: DEFAULT_SETTINGS,
      notifications: [],
      selectedWorld: 'forest',

      loginDemo: (email, username) =>
        set((state) => ({
          user: {
            ...state.user,
            email,
            username: username?.trim() || email.split('@')[0] || 'Explorer',
            isAuthenticated: true,
          },
          activities: [
            {
              id: `act-${Date.now()}`,
              type: 'world',
              title: 'Signed in (Demo Mode)',
              detail: `Welcome back to Verdantia, ${username?.trim() || email.split('@')[0]}.`,
              timestamp: new Date().toISOString(),
            },
            ...state.activities.slice(0, 19),
          ],
        })),

      registerDemo: (username, email) =>
        set((state) => ({
          user: {
            id: `user-${Date.now()}`,
            username: username.trim(),
            email: email.trim(),
            isAuthenticated: true,
            joinedAt: new Date().toISOString(),
          },
          activities: [
            {
              id: `act-${Date.now()}`,
              type: 'world',
              title: 'Explorer Registered (Demo)',
              detail: `${username.trim()} joined the Verdantia restoration initiative.`,
              timestamp: new Date().toISOString(),
            },
            ...state.activities.slice(0, 19),
          ],
        })),

      logout: () =>
        set((state) => ({
          user: {
            ...state.user,
            isAuthenticated: false,
          },
        })),

      updateUsername: (username) =>
        set((state) => ({
          user: { ...state.user, username: username.trim() || state.user.username },
        })),

      updateAvatar: (config, markSaved = true) =>
        set((state) => {
          const nextAvatar = { ...state.avatar, ...config };
          const nextAvatarSaved = state.avatarSaved || markSaved;
          const nextBadges = evaluateBadges(
            state.completedMissionIds,
            state.xp,
            nextAvatarSaved,
            state.unlockedBadgeIds,
          );
          const newlyUnlocked = nextBadges.filter((id) => !state.unlockedBadgeIds.includes(id));

          const newNotes: ToastNotification[] = newlyUnlocked.map((bId) => {
            const badge = BADGES_DATA.find((b) => b.id === bId);
            return {
              id: `note-${bId}-${Date.now()}`,
              title: `Badge Unlocked: ${badge?.title ?? bId}`,
              description: badge?.description ?? 'Achievement earned!',
              variant: 'badge',
            };
          });

          return {
            avatar: nextAvatar,
            avatarSaved: nextAvatarSaved,
            unlockedBadgeIds: nextBadges,
            notifications: [...state.notifications, ...newNotes],
            activities: markSaved
              ? [
                  {
                    id: `act-${Date.now()}`,
                    type: 'avatar',
                    title: 'Avatar Customized',
                    detail: `Saved ${nextAvatar.characterType} explorer look.`,
                    timestamp: new Date().toISOString(),
                  },
                  ...state.activities.slice(0, 19),
                ]
              : state.activities,
          };
        }),

      setSelectedWorld: (worldId) => set({ selectedWorld: worldId }),

      completeMission: (missionId, correctAnswers, totalQuestions) => {
        const state = get();
        const mission = MISSIONS_DATA.find((m) => m.id === missionId);
        if (!mission || totalQuestions <= 0) {
          return {
            passed: false,
            alreadyCompleted: false,
            xpAwarded: 0,
            newlyUnlockedBadges: [],
            leveledUp: false,
          };
        }

        // Validation: require at least 60% correct (or all if 1 question)
        const required = Math.ceil(totalQuestions * 0.6);
        const passed = correctAnswers >= required;
        if (!passed) {
          return {
            passed: false,
            alreadyCompleted: state.completedMissionIds.includes(missionId),
            xpAwarded: 0,
            newlyUnlockedBadges: [],
            leveledUp: false,
          };
        }

        const alreadyCompleted = state.completedMissionIds.includes(missionId);
        if (alreadyCompleted) {
          return {
            passed: true,
            alreadyCompleted: true,
            xpAwarded: 0,
            newlyUnlockedBadges: [],
            leveledUp: false,
          };
        }

        const nextCompleted = [...state.completedMissionIds, missionId];
        const nextXp = state.xp + mission.xpReward;
        const prevLevel = state.level;
        const { level: nextLevel } = calculateLevelFromXp(nextXp);
        const leveledUp = nextLevel > prevLevel;

        const nextBadges = evaluateBadges(
          nextCompleted,
          nextXp,
          state.avatarSaved,
          state.unlockedBadgeIds,
        );
        const newlyUnlockedBadges = nextBadges.filter((id) => !state.unlockedBadgeIds.includes(id));

        const worldName = WORLDS_MAP[mission.worldId].name;
        const newActivities: ActivityLog[] = [
          {
            id: `act-m-${Date.now()}`,
            type: 'mission',
            title: `Completed: ${mission.title}`,
            detail: `${worldName} • +${mission.xpReward} XP`,
            xpEarned: mission.xpReward,
            timestamp: new Date().toISOString(),
          },
        ];

        const newNotes: ToastNotification[] = [
          {
            id: `note-xp-${Date.now()}`,
            title: `Mission Complete! +${mission.xpReward} XP`,
            description: `${mission.title} restored part of ${worldName}.`,
            variant: 'xp',
          },
        ];

        if (leveledUp) {
          newActivities.unshift({
            id: `act-lvl-${Date.now() + 1}`,
            type: 'level',
            title: `Reached Level ${nextLevel}!`,
            detail: 'New planetary milestones unlocked.',
            timestamp: new Date().toISOString(),
          });
          newNotes.push({
            id: `note-lvl-${Date.now() + 1}`,
            title: `Level Up! Level ${nextLevel}`,
            description: 'Check World Explorer for newly unlocked worlds!',
            variant: 'level',
          });
        }

        newlyUnlockedBadges.forEach((bId, idx) => {
          const badge = BADGES_DATA.find((b) => b.id === bId);
          newActivities.unshift({
            id: `act-b-${Date.now() + idx + 2}`,
            type: 'badge',
            title: `Unlocked: ${badge?.title ?? bId}`,
            detail: badge?.description ?? 'New badge earned!',
            timestamp: new Date().toISOString(),
          });
          newNotes.push({
            id: `note-b-${bId}-${Date.now() + idx}`,
            title: `Badge Unlocked: ${badge?.title ?? bId}`,
            description: badge?.description ?? '',
            variant: 'badge',
          });
        });

        set({
          completedMissionIds: nextCompleted,
          xp: nextXp,
          level: nextLevel,
          unlockedBadgeIds: nextBadges,
          activities: [...newActivities, ...state.activities].slice(0, 20),
          notifications: [...state.notifications, ...newNotes].slice(-5),
        });

        return {
          passed: true,
          alreadyCompleted: false,
          xpAwarded: mission.xpReward,
          newlyUnlockedBadges,
          leveledUp,
        };
      },

      updateSettings: (partial) =>
        set((state) => ({
          settings: { ...state.settings, ...partial },
        })),

      dismissNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      pushNotification: (note) =>
        set((state) => ({
          notifications: [
            ...state.notifications,
            { ...note, id: `note-${Date.now()}` },
          ].slice(-5),
        })),

      resetProgress: () =>
        set((state) => ({
          xp: 0,
          level: 1,
          completedMissionIds: [],
          unlockedBadgeIds: state.avatarSaved ? ['avatar-crafter'] : [],
          activities: [
            {
              id: `act-reset-${Date.now()}`,
              type: 'world',
              title: 'Demo Progress Reset',
              detail: 'Fresh planetary adventure started.',
              timestamp: new Date().toISOString(),
            },
          ],
          notifications: [
            {
              id: `note-reset-${Date.now()}`,
              title: 'Progress Reset',
              description: 'All missions, XP, and badges have been reset.',
              variant: 'info',
            },
          ],
        })),
    }),
    {
      name: 'verdantia-state-v1',
      partialize: (state) => ({
        user: state.user,
        avatar: state.avatar,
        avatarSaved: state.avatarSaved,
        xp: state.xp,
        level: state.level,
        completedMissionIds: state.completedMissionIds,
        unlockedBadgeIds: state.unlockedBadgeIds,
        activities: state.activities,
        settings: state.settings,
        selectedWorld: state.selectedWorld,
      }),
    },
  ),
);
