import type { Candidate } from "./candidate";

export type Requirements = {
  readonly required: readonly string[];
  readonly preferred: readonly string[];
};

export type RequirementStatus = "supported" | "partial" | "not_found";

export type Confidence = "high" | "medium" | "low";

export type MatchLevel = "strong_match" | "good_match" | "partial_match" | "no_match";

export interface RequirementEvaluation {
  readonly name: string;
  readonly status: RequirementStatus;
  readonly evidence: string;
}

export interface CandidateEvaluation {
  readonly candidateId: number;
  readonly match: MatchLevel;
  readonly confidence: Confidence;
  readonly requirements: readonly RequirementEvaluation[];
  readonly summary: string;
}

export type ExtractRequirements = (query: string) => Promise<unknown>;

export type EvaluateCandidate = (
  candidate: Candidate,
  requirements: Requirements,
) => Promise<unknown>;

export class AiAdapterNotConfiguredError extends Error {
  constructor(readonly operation: "extractRequirements" | "evaluateCandidate") {
    super(`${operation} AI adapter is not configured`);
    this.name = "AiAdapterNotConfiguredError";
  }
}
