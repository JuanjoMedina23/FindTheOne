import type {
  CandidateEvaluation,
  EvaluateCandidate,
  ExtractRequirements,
  Requirements,
} from "../../types/ai";
import type { Candidate } from "../../types/candidate";
import type { CandidateSearchResult, SearchResponse } from "../../types/search";
import { rankCandidateEvaluations } from "../../utils/ranking";
import { isCandidateEvaluation, isRequirements } from "../../utils/validation";
import { evaluateCandidate } from "../ai/evaluateCandidate";
import { extractRequirements } from "../ai/extractRequirements";
import { searchCandidates } from "../candidates/searchCandidates";

export interface SearchDependencies {
  readonly extractRequirements: ExtractRequirements;
  readonly evaluateCandidate: EvaluateCandidate;
}

const DEFAULT_DEPENDENCIES: SearchDependencies = {
  extractRequirements,
  evaluateCandidate,
};

function invokeAiSafely(operation: () => Promise<unknown>): Promise<unknown> {
  return Promise.resolve().then(operation).catch(() => undefined);
}

async function getValidEvaluation(
  candidate: Candidate,
  requirements: Requirements,
  evaluate: EvaluateCandidate,
): Promise<CandidateEvaluation | null> {
  const output = await invokeAiSafely(() => evaluate(candidate, requirements));

  if (!isCandidateEvaluation(output) || output.candidateId !== candidate.id) {
    return null;
  }

  return output;
}

function toSearchResults(
  evaluations: readonly CandidateEvaluation[],
  candidates: readonly Candidate[],
): CandidateSearchResult[] {
  const candidatesById = new Map(candidates.map((candidate) => [candidate.id, candidate]));

  return evaluations.flatMap((evaluation) => {
    const candidate = candidatesById.get(evaluation.candidateId);

    return candidate === undefined
      ? []
      : [
          {
            candidateId: candidate.id,
            name: candidate.name,
            role: candidate.role,
            match: evaluation.match,
            confidence: evaluation.confidence,
            requirements: evaluation.requirements,
            summary: evaluation.summary,
          },
        ];
  });
}

export async function searchTalent(
  query: string,
  dependencies: SearchDependencies = DEFAULT_DEPENDENCIES,
): Promise<SearchResponse> {
  if (query.trim().length === 0) {
    return { status: "error", message: "Search query cannot be empty." };
  }

  const requirementsOutput = await invokeAiSafely(() => dependencies.extractRequirements(query));

  if (!isRequirements(requirementsOutput)) {
    return {
      status: "error",
      message: "Requirements could not be validated. Human review is required.",
    };
  }

  const candidates = searchCandidates(requirementsOutput, 5);
  const evaluationOutputs = await Promise.all(
    candidates.map((candidate) =>
      getValidEvaluation(candidate, requirementsOutput, dependencies.evaluateCandidate),
    ),
  );
  const validEvaluations = evaluationOutputs.filter(
    (evaluation): evaluation is CandidateEvaluation => evaluation !== null,
  );

  if (validEvaluations.length === 0) {
    return {
      status: "error",
      message: "Candidate evaluations could not be validated. Human review is required.",
    };
  }

  const rankedEvaluations = rankCandidateEvaluations(validEvaluations);
  const results = toSearchResults(rankedEvaluations, candidates);
  const closestEvaluation = rankedEvaluations[0];
  const closestCandidate = results[0];

  if (
    closestEvaluation === undefined ||
    closestCandidate === undefined ||
    (closestEvaluation.match !== "strong_match" && closestEvaluation.match !== "good_match")
  ) {
    const missingRequirements = Array.from(
      new Set(
        closestEvaluation?.requirements
          .filter((requirement) => requirement.status === "not_found")
          .map((requirement) => requirement.name) ?? [],
      ),
    );

    return {
      status: "no_strong_match",
      message: "No candidate has sufficient requirement support.",
      closestCandidate:
        closestCandidate === undefined
          ? null
          : {
              candidateId: closestCandidate.candidateId,
              name: closestCandidate.name,
            },
      missingRequirements,
      recommendation: "Review the closest candidate or adjust the search requirements.",
    };
  }

  return {
    status: "success",
    requirements: requirementsOutput,
    results,
  };
}
