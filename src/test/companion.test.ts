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

    const pollinatorReply = queryLocalCompanion('Why do bees and pollinators matter?');
    expect(pollinatorReply.matchedTopic?.id).toBe('pollinators-biodiversity');

    const urbanReply = queryLocalCompanion('How do vertical gardens cool the urban heat island?');
    expect(urbanReply.matchedTopic?.id).toBe('urban-cooling');

    const blueCarbonReply = queryLocalCompanion('Where is blue carbon stored in seagrass?');
    expect(blueCarbonReply.matchedTopic?.id).toBe('blue-carbon');
  });

  it('returns an honest fallback when a topic is not covered', () => {
    const unknown = queryLocalCompanion('What is the stock price of gold?');
    expect(unknown.matchedTopic).toBeNull();
    expect(unknown.answer).toBe(COMPANION_FALLBACK_RESPONSE);
  });
});
