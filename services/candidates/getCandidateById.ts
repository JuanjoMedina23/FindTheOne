import type { Candidate } from "../../types/candidate";
import { getCandidates } from "./getCandidates";

export function getCandidateById(id: number): Candidate | undefined {
  return getCandidates().find((candidate) => candidate.id === id);
}
