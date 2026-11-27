import { describe, expect, it } from 'vitest';
import { queryLocalCompanion } from '../services/companionService';
import { COMPANION_FALLBACK_RESPONSE } from '../data/knowledge/knowledgeBase';

describe('Local Eco-Guide Companion Service', () => {
  it('matches supported environmental topics by keyword', () => {
    const treeReply = queryLocalCompanion('Why should we plant native trees?');
    expect(treeReply.matchedTopic?.id).toBe('tree-planting');
    expect(treeReply.answer.toLowerCase()).toContain('native');

    const oceanReply = queryLocalCompanion('How do microplastics affect coral reefs?');
    expect(oceanReply.matchedTopic?.id).toBe('ocean-pollution');
  });

  it('returns an honest fallback when a topic is not covered', () => {
    const unknown = queryLocalCompanion('What is the stock price of gold?');
    expect(unknown.matchedTopic).toBeNull();
    expect(unknown.answer).toBe(COMPANION_FALLBACK_RESPONSE);
  });
});
