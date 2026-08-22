import type {
  CandidateEvaluation,
  EvaluateCandidate,
  ExtractRequirements,
  MatchLevel,
  RequirementEvaluation,
  Requirements,
} from "../types/ai";
import type { Candidate } from "../types/candidate";
import { searchTalent, type SearchDependencies } from "../services/api/search";

class HarnessAssertionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HarnessAssertionError";
  }
}

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new HarnessAssertionError(message);
  }
}

function assertEqual<T>(actual: T, expected: T, message: string): void {
  if (actual !== expected) {
    throw new HarnessAssertionError(`${message}: expected ${String(expected)}, got ${String(actual)}`);
  }
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function getEvidence(candidate: Candidate): string[] {
  return [
    candidate.role,
    ...candidate.skills,
    ...candidate.tags,
    ...candidate.experience.flatMap((experience) => [
      experience.role,
      experience.company,
      ...experience.highlights,
    ]),
    ...(candidate.projects?.flatMap((project) => [
      project.name,
      project.description,
      ...project.technologies,
    ]) ?? []),
    ...candidate.reviews,
  ];
}

function evaluateRequirement(candidate: Candidate, name: string): RequirementEvaluation {
  const normalizedName = normalize(name);

  if (normalizedName === "leadership") {
    const rating = candidate.ratings.leadership;
    return {
      name,
      status: rating >= 4.5 ? "supported" : rating >= 4 ? "partial" : "not_found",
      evidence: rating >= 4 ? `Leadership rating: ${rating}` : "",
    };
  }

  if (normalizedName === "10 years") {
    const longestExperience = candidate.experience.reduce(
      (longest, experience) => Math.max(longest, (experience.endYear ?? 2026) - experience.startYear),
      0,
    );
    return {
      name,
      status: longestExperience >= 10 ? "supported" : "not_found",
      evidence: longestExperience >= 10 ? `${longestExperience} years of experience` : "",
    };
  }

  const matchedEvidence = getEvidence(candidate).find((value) => {
    const normalizedEvidence = ` ${normalize(value)} `;
    return normalizedEvidence.includes(` ${normalizedName} `);
  });

  return {
    name,
    status: matchedEvidence === undefined ? "not_found" : "supported",
    evidence: matchedEvidence ?? "",
  };
}

function buildEvaluation(
  candidate: Candidate,
  requirements: Requirements,
): CandidateEvaluation {
  const evaluations = [...requirements.required, ...requirements.preferred].map((requirement) =>
    evaluateRequirement(candidate, requirement),
  );
  const supported = evaluations.filter((evaluation) => evaluation.status === "supported").length;
  const partial = evaluations.filter((evaluation) => evaluation.status === "partial").length;
  const total = evaluations.length;
  let match: MatchLevel = "no_match";

  if (total > 0 && supported === total) {
    match = "strong_match";
  } else if (total > 0 && supported + partial >= Math.ceil(total * 0.75)) {
    match = "good_match";
  } else if (supported + partial > 0) {
    match = "partial_match";
  }

  return {
    candidateId: candidate.id,
    match,
    confidence: match === "strong_match" ? "high" : match === "no_match" ? "low" : "medium",
    requirements: evaluations,
    summary: `${candidate.name} has ${supported} fully supported requirements.`,
  };
}

const fakeExtractRequirements: ExtractRequirements = async (query) =>
  query.toLowerCase().includes("impossible")
    ? { required: ["Rust", "Blockchain", "10 years"], preferred: [] }
    : { required: ["Python", "AI", "leadership"], preferred: [] };

const fakeEvaluateCandidate: EvaluateCandidate = async (candidate, requirements) =>
  buildEvaluation(candidate, requirements);

const FAKE_DEPENDENCIES: SearchDependencies = {
  extractRequirements: fakeExtractRequirements,
  evaluateCandidate: fakeEvaluateCandidate,
};

async function testStrongMatch(): Promise<void> {
  const response = await searchTalent("Python AI leadership", FAKE_DEPENDENCIES);

  assertEqual(response.status, "success", "strong query status");
  assert(response.status === "success", "strong query should return results");
  assert(response.results.length > 1, "strong query should return ranked candidates");
  assertEqual(response.results[0]?.candidateId, 1, "Maya Chen should rank first");
}

async function testImpossibleMatch(): Promise<void> {
  const response = await searchTalent("impossible Rust blockchain 10-years", FAKE_DEPENDENCIES);

  assertEqual(response.status, "no_strong_match", "impossible query status");
  assert(response.status === "no_strong_match", "impossible query should be insufficient");
  assert(response.missingRequirements.includes("Blockchain"), "blockchain should be missing");
  assert(response.missingRequirements.includes("10 years"), "ten years should be missing");
}

async function testEmptyQuery(): Promise<void> {
  const response = await searchTalent("   ", FAKE_DEPENDENCIES);
  assertEqual(response.status, "error", "empty query status");
}

async function testInvalidRequirements(): Promise<void> {
  const invalidExtractRequirements: ExtractRequirements = async () => ({
    required: "Python",
    preferred: [],
  });
  const response = await searchTalent("Python", {
    ...FAKE_DEPENDENCIES,
    extractRequirements: invalidExtractRequirements,
  });

  assertEqual(response.status, "error", "invalid requirements status");
}

async function testMismatchedCandidateId(): Promise<void> {
  const mismatchedEvaluation: EvaluateCandidate = async (candidate, requirements) => ({
    ...buildEvaluation(candidate, requirements),
    candidateId: candidate.id + 1000,
  });
  const response = await searchTalent("Python AI leadership", {
    ...FAKE_DEPENDENCIES,
    evaluateCandidate: mismatchedEvaluation,
  });

  assertEqual(response.status, "error", "mismatched candidate IDs should all be rejected");
}

async function testOneInvalidEvaluation(): Promise<void> {
  const oneInvalidEvaluation: EvaluateCandidate = async (candidate, requirements) =>
    candidate.id === 2 ? { candidateId: "invalid" } : buildEvaluation(candidate, requirements);
  const response = await searchTalent("Python AI leadership", {
    ...FAKE_DEPENDENCIES,
    evaluateCandidate: oneInvalidEvaluation,
  });

  assertEqual(response.status, "success", "valid evaluations should continue");
  assert(response.status === "success", "valid evaluations should produce results");
  assert(!response.results.some((result) => result.candidateId === 2), "invalid result was not skipped");
  assertEqual(response.results[0]?.candidateId, 1, "valid ranking should remain stable");
}

async function runScenario(name: string, scenario: () => Promise<void>): Promise<void> {
  await scenario();
  console.log(`PASS ${name}`);
}

async function runHarness(): Promise<void> {
  await runScenario("strong Python + AI + leadership", testStrongMatch);
  await runScenario("impossible Rust + blockchain + 10 years", testImpossibleMatch);
  await runScenario("empty query", testEmptyQuery);
  await runScenario("invalid requirements output", testInvalidRequirements);
  await runScenario("mismatched candidate identity", testMismatchedCandidateId);
  await runScenario("one invalid evaluation among valid results", testOneInvalidEvaluation);
}

runHarness().catch((error: unknown) => {
  console.error(error);
  throw error;
});
