import { beforeEach, describe, expect, it } from 'vitest';
import { getWorldRestorationPercent, useGameStore } from '../store/useGameStore';

describe('Verdantia Game Store', () => {
  beforeEach(() => {
    localStorage.clear();
    useGameStore.getState().resetProgress();
    useGameStore.setState({
      avatarSaved: false,
      unlockedBadgeIds: [],
      completedMissionIds: [],
      xp: 0,
      level: 1,
    });
  });

  it('validates mission score before awarding XP', () => {
    const res = useGameStore.getState().completeMission('forest-1', 0, 2);
    expect(res.passed).toBe(false);
    expect(res.xpAwarded).toBe(0);
    expect(useGameStore.getState().xp).toBe(0);
    expect(useGameStore.getState().completedMissionIds).not.toContain('forest-1');
  });

  it('awards XP only once for the same mission', () => {
    const first = useGameStore.getState().completeMission('forest-1', 2, 2);
    expect(first.passed).toBe(true);
    expect(first.alreadyCompleted).toBe(false);
    expect(first.xpAwarded).toBe(80);
    expect(useGameStore.getState().xp).toBe(80);

    const second = useGameStore.getState().completeMission('forest-1', 2, 2);
    expect(second.passed).toBe(true);
    expect(second.alreadyCompleted).toBe(true);
    expect(second.xpAwarded).toBe(0);
    expect(useGameStore.getState().xp).toBe(80);
  });

  it('unlocks First Sprout and Forest Guardian badges and updates restoration', () => {
    useGameStore.getState().completeMission('forest-1', 2, 2);
    expect(useGameStore.getState().unlockedBadgeIds).toContain('first-step');

    ['forest-2', 'forest-3', 'forest-4', 'forest-5'].forEach((id) => {
      useGameStore.getState().completeMission(id, 2, 2);
    });

    const state = useGameStore.getState();
    expect(state.unlockedBadgeIds).toContain('forest-guardian');
    expect(getWorldRestorationPercent('forest', state.completedMissionIds)).toBe(100);
    expect(state.level).toBeGreaterThanOrEqual(3);
  });

  it('persists avatar customization and unlocks Identity Forged badge', () => {
    useGameStore.getState().updateAvatar({ outfitColor: '#8b5cf6', characterType: 'spirit' }, true);
    const state = useGameStore.getState();
    expect(state.avatar.outfitColor).toBe('#8b5cf6');
    expect(state.avatar.characterType).toBe('spirit');
    expect(state.unlockedBadgeIds).toContain('avatar-crafter');
  });

  it('handles demo login, registration, and settings updates', () => {
    useGameStore.getState().registerDemo('EcoHero', 'hero@verdantia.local');
    expect(useGameStore.getState().user.isAuthenticated).toBe(true);
    expect(useGameStore.getState().user.username).toBe('EcoHero');

    useGameStore.getState().updateSettings({ graphicsQuality: 'low', reducedMotion: true });
    expect(useGameStore.getState().settings.graphicsQuality).toBe('low');
    expect(useGameStore.getState().settings.reducedMotion).toBe(true);
  });
});
