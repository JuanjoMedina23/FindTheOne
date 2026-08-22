import type {
  CandidateEvaluation,
  Confidence,
  MatchLevel,
  RequirementStatus,
} from "../types/ai";

const MATCH_SCORES: Readonly<Record<MatchLevel, number>> = {
  strong_match: 40,
  good_match: 25,
  partial_match: 10,
  no_match: 0,
};

const CONFIDENCE_SCORES: Readonly<Record<Confidence, number>> = {
  high: 3,
  medium: 2,
  low: 1,
};

const REQUIREMENT_SCORES: Readonly<Record<RequirementStatus, number>> = {
  supported: 4,
  partial: 1,
  not_found: 0,
};

function scoreEvaluation(evaluation: CandidateEvaluation): number {
  return (
    MATCH_SCORES[evaluation.match] +
    CONFIDENCE_SCORES[evaluation.confidence] +
    evaluation.requirements.reduce(
      (score, requirement) => score + REQUIREMENT_SCORES[requirement.status],
      0,
    )
  );
}

export function rankCandidateEvaluations(
  evaluations: readonly CandidateEvaluation[],
): CandidateEvaluation[] {
  return [...evaluations].sort(
    (left, right) =>
      scoreEvaluation(right) - scoreEvaluation(left) || left.candidateId - right.candidateId,
  );
}
