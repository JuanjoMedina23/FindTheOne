import candidates from "../../data/candidates.json";
import type { Candidate } from "../../types/candidate";

export function getCandidates(): Candidate[] {
  return candidates;
}
