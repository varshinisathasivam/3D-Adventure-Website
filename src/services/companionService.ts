import { COMPANION_FALLBACK_RESPONSE, KNOWLEDGE_BASE } from '../data/knowledge/knowledgeBase';
import { CompanionTopic } from '../types';

export interface CompanionReply {
  matchedTopic: CompanionTopic | null;
  answer: string;
  actionTip?: string;
}

/**
 * Rule-based local keyword matcher against the Verdantia knowledge base.
 * Does not call any external AI API.
 */
export function queryLocalCompanion(input: string): CompanionReply {
  const normalized = input.toLowerCase().trim();
  if (!normalized) {
    return {
      matchedTopic: null,
      answer: COMPANION_FALLBACK_RESPONSE,
    };
  }

  let bestTopic: CompanionTopic | null = null;
  let bestScore = 0;

  for (const topic of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of topic.keywords) {
      if (normalized.includes(kw.toLowerCase())) {
        score += kw.includes(' ') ? 2 : 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestTopic = topic;
    }
  }

  if (!bestTopic || bestScore === 0) {
    return {
      matchedTopic: null,
      answer: COMPANION_FALLBACK_RESPONSE,
    };
  }

  return {
    matchedTopic: bestTopic,
    answer: bestTopic.response,
    actionTip: bestTopic.actionTip,
  };
}
