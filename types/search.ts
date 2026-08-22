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
