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