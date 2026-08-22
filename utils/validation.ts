import type {
  CandidateEvaluation,
  Confidence,
  MatchLevel,
  Requirements,
  RequirementStatus,
} from "../types/ai";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isRequirementStatus(value: unknown): value is RequirementStatus {
  return value === "supported" || value === "partial" || value === "not_found";
}

function isConfidence(value: unknown): value is Confidence {
  return value === "high" || value === "medium" || value === "low";
}

function isMatchLevel(value: unknown): value is MatchLevel {
  return (
    value === "strong_match" ||
    value === "good_match" ||
    value === "partial_match" ||
    value === "no_match"
  );
}

function isRequirementEvaluation(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.name === "string" &&
    isRequirementStatus(value.status) &&
    typeof value.evidence === "string"
  );
}

export function isRequirements(value: unknown): value is Requirements {
  return (
    isRecord(value) &&
    isStringArray(value.required) &&
    isStringArray(value.preferred)
  );
}

// This validates structure only; evidence grounding is an orchestration responsibility.
export function isCandidateEvaluation(value: unknown): value is CandidateEvaluation {
  return (
    isRecord(value) &&
    typeof value.candidateId === "number" &&
    Number.isInteger(value.candidateId) &&
    isMatchLevel(value.match) &&
    isConfidence(value.confidence) &&
    Array.isArray(value.requirements) &&
    value.requirements.every(isRequirementEvaluation) &&
    typeof value.summary === "string"
  );
}
