import React, { useState } from 'react';
import { CheckCircle2, Sparkles, X, XCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { Mission } from '../../types';
import { useGameStore } from '../../store/useGameStore';
import { playChime } from '../../utils/webgl';

interface MissionModalProps {
  mission: Mission | null;
  onClose: () => void;
}

/**
 * Reusable interactive mission modal used across all 4 worlds and the Mission Center.
 * Validates answers before awarding XP and prevents duplicate XP for already-completed missions.
 */
export const MissionModal: React.FC<MissionModalProps> = ({ mission, onClose }) => {
  const completedMissionIds = useGameStore((s) => s.completedMissionIds);
  const completeMission = useGameStore((s) => s.completeMission);
  const soundEnabled = useGameStore((s) => s.settings.soundEnabled);

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{
    passed: boolean;
    alreadyCompleted: boolean;
    xpAwarded: number;
    score: number;
    total: number;
  } | null>(null);

  if (!mission) return null;

  const isAlreadyDone = completedMissionIds.includes(mission.id);
  const allAnswered = mission.questions.every((q) => answers[q.id] !== undefined);

  const handleSelect = (questionId: string, optionIdx: number) => {
    if (submitted) return;
    playChime(soundEnabled, 'click');
    setAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmit = () => {
    let score = 0;
    for (const q of mission.questions) {
      if (answers[q.id] === q.correctIndex) {
        score += 1;
      }
    }
    const outcome = completeMission(mission.id, score, mission.questions.length);
    setSubmitted(true);
    setResult({
      passed: outcome.passed,
      alreadyCompleted: outcome.alreadyCompleted,
      xpAwarded: outcome.xpAwarded,
      score,
      total: mission.questions.length,
    });
    if (outcome.passed) {
      playChime(soundEnabled, outcome.newlyUnlockedBadges.length > 0 ? 'badge' : 'success');
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setResult(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mission-modal-title"
    >
      <div className="glass-panel relative max-h-[90vh] w-full max-w-2xl overflow-y-auto p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xl bg-white/5 p-2 text-emerald-200 hover:bg-white/10"
          aria-label="Close mission dialog"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-emerald-300 ring-1 ring-emerald-400/30">
            {mission.locationLabel}
          </span>
          <span className="rounded-full bg-amber-500/15 px-3 py-1 text-amber-300 ring-1 ring-amber-400/30">
            {mission.difficulty}
          </span>
          <span className="rounded-full bg-sky-500/15 px-3 py-1 text-sky-300 ring-1 ring-sky-400/30">
            +{mission.xpReward} XP
          </span>
          {isAlreadyDone && (
            <span className="inline-flex items-center gap-1 rounded-full bg-teal-500/20 px-3 py-1 text-teal-200">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Completed
            </span>
          )}
        </div>

        <h2 id="mission-modal-title" className="mt-3 font-display text-2xl font-bold text-white">
          {mission.title}
        </h2>
        <p className="mt-1.5 text-sm text-emerald-100/80">{mission.instructions}</p>

        <div className="mt-6 space-y-5">
          {mission.questions.map((q, qIdx) => {
            const selected = answers[q.id];
            return (
              <div
                key={q.id}
                className="rounded-2xl border border-emerald-400/15 bg-emerald-950/60 p-4"
              >
                <p className="font-display text-sm font-semibold text-emerald-50 sm:text-base">
                  {qIdx + 1}. {q.prompt}
                </p>
                <div className="mt-3 space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selected === optIdx;
                    const isCorrect = q.correctIndex === optIdx;
                    let optionStyle =
                      'border-emerald-400/20 bg-emerald-900/25 text-emerald-100 hover:border-emerald-400/50 hover:bg-emerald-900/45';

                    if (submitted) {
                      if (isCorrect) {
                        optionStyle =
                          'border-emerald-400 bg-emerald-500/25 text-emerald-100';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'border-rose-400 bg-rose-500/20 text-rose-100';
                      } else {
                        optionStyle = 'border-white/10 bg-black/20 text-emerald-100/50';
                      }
                    } else if (isSelected) {
                      optionStyle =
                        'border-teal-400 bg-teal-500/25 text-white ring-1 ring-teal-300/40';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={submitted}
                        onClick={() => handleSelect(q.id, optIdx)}
                        className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {submitted && isCorrect && (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
                        )}
                        {submitted && isSelected && !isCorrect && (
                          <XCircle className="h-4 w-4 shrink-0 text-rose-300" />
                        )}
                      </button>
                    );
                  })}
                </div>
                {submitted && (
                  <p className="mt-3 rounded-xl bg-black/25 px-3 py-2 text-xs text-emerald-200/85">
                    {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {result && (
          <div
            className={`mt-6 rounded-2xl border p-4 ${
              result.passed
                ? 'border-emerald-400/40 bg-emerald-500/15 text-emerald-100'
                : 'border-amber-400/40 bg-amber-500/15 text-amber-100'
            }`}
          >
            <div className="flex items-start gap-3">
              {result.passed ? (
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
              ) : (
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
              )}
              <div>
                <p className="font-display font-bold">
                  {result.passed
                    ? result.alreadyCompleted
                      ? `Mission Verified (${result.score}/${result.total}) — Replay Mode`
                      : `Mission Accomplished! +${result.xpAwarded} XP`
                    : `Needs Review (${result.score}/${result.total})`}
                </p>
                <p className="mt-1 text-xs opacity-90">
                  {result.passed
                    ? result.alreadyCompleted
                      ? 'You already earned XP for this mission. Replay anytime for practice!'
                      : 'The ecosystem has visibly responded to your restoration action!'
                    : 'Review the explanations above and retry to restore this zone.'}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          {!submitted ? (
            <>
              <button type="button" onClick={onClose} className="btn-secondary">
                Cancel
              </button>
              <button
                type="button"
                disabled={!allAnswered}
                onClick={handleSubmit}
                className="btn-primary"
              >
                Validate & Complete
                <ArrowRight className="h-4 w-4" />
              </button>
            </>
          ) : !result?.passed ? (
            <>
              <button type="button" onClick={onClose} className="btn-secondary">
                Close
              </button>
              <button type="button" onClick={handleRetry} className="btn-gold">
                Try Again
              </button>
            </>
          ) : (
            <button type="button" onClick={onClose} className="btn-primary">
              Continue Adventure
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
