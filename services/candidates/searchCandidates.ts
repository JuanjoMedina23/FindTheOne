import type { Candidate } from "../../types/candidate";
import { getCandidates } from "./getCandidates";

export type Requirements = {
  readonly required: readonly string[];
  readonly preferred: readonly string[];
};

const MAX_RESULTS = 5;

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function getEvidence(candidate: Candidate): string[] {
  return [
    candidate.role,
    ...candidate.skills,
    ...candidate.tags,
    ...candidate.experience.flatMap((experience) => [experience.role, experience.company]),
    ...(candidate.projects?.flatMap((project) => [
      project.name,
      project.description,
      ...project.technologies,
    ]) ?? []),
    ...candidate.reviews,
  ].map(normalize);
}

function scoreRequirement(requirement: string, evidence: readonly string[]): number {
  const normalizedRequirement = normalize(requirement);

  if (normalizedRequirement.length === 0) {
    return 0;
  }

  if (evidence.some((value) => value === normalizedRequirement)) {
    return 2;
  }

  const phrase = ` ${normalizedRequirement} `;
  return evidence.some((value) => ` ${value} `.includes(phrase)) ? 1 : 0;
}

export function searchCandidates(
  requirements: Requirements,
  limit = MAX_RESULTS,
): Candidate[] {
  const resultLimit = Math.min(Math.max(Math.trunc(limit), 0), MAX_RESULTS);

  return getCandidates()
    .map((candidate) => {
      const evidence = getEvidence(candidate);
      const requiredScore = requirements.required.reduce(
        (score, requirement) => score + scoreRequirement(requirement, evidence),
        0,
      );
      const preferredScore = requirements.preferred.reduce(
        (score, requirement) => score + scoreRequirement(requirement, evidence),
        0,
      );

      return { candidate, score: requiredScore * 2 + preferredScore };
    })
    .sort((left, right) => right.score - left.score || left.candidate.id - right.candidate.id)
    .slice(0, resultLimit)
    .map(({ candidate }) => candidate);
}
