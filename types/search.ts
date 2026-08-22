import type {
  Confidence,
  MatchLevel,
  RequirementEvaluation,
  Requirements,
} from "./ai";

export interface CandidateSearchResult {
  readonly candidateId: number;
  readonly name: string;
  readonly role: string;
  readonly match: MatchLevel;
  readonly confidence: Confidence;
  readonly requirements: readonly RequirementEvaluation[];
  readonly summary: string;
}

export interface SearchSuccessResponse {
  readonly status: "success";
  readonly requirements: Requirements;
  readonly results: readonly CandidateSearchResult[];
}

export interface NoStrongMatchResponse {
  readonly status: "no_strong_match";
  readonly message: string;
  readonly closestCandidate: {
    readonly candidateId: number;
    readonly name: string;
  } | null;
  readonly missingRequirements: readonly string[];
  readonly recommendation: string;
}

export interface SearchErrorResponse {
  readonly status: "error";
  readonly message: string;
}

export type SearchResponse =
  | SearchSuccessResponse
  | NoStrongMatchResponse
  | SearchErrorResponse;
export type RequirementStatus = "supported" | "partial" | "not_found";
export type MatchType = "strong_match" | "good_match" | "partial_match";
export type Confidence = "high" | "medium" | "low";

export interface RequirementResult {
  name: string;
  status: RequirementStatus;
  evidence: string;
  source: string;
  rating?: number;
}

export interface CandidateResult {
  candidateId: number;
  name: string;
  role: string;
  initials: string;
  match: MatchType;
  confidence: Confidence;
  skills: string[];
  requirements: RequirementResult[];
  summary: string;
  review: string;
  experience: string;
}

export interface SearchResponse {
  requirements: {
    required: string[];
    preferred: string[];
  };
  results: CandidateResult[];
}
