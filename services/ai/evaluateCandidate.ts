import { runCompletion } from "./qvac";
import { EVALUATE_CANDIDATE_SYSTEM, buildEvaluateCandidatePrompt } from "./prompts";
import { EvaluationSchema, type Evaluation, type Requirements } from "./schemas";
import type { Candidate } from "../../types/candidate";

const MAX_RETRIES = 2;

function extractJsonBlock(text: string): string {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON object found in model output");
    return match[0];
}

// Sanity check: every "supported" or "partial" requirement must point to
// evidence text that actually appears somewhere in the candidate's raw
// data. This is a cheap guardrail against hallucinated evidence — it does
// not replace the model's own honesty, but it catches obvious invention.
function evidenceLooksGrounded(evaluation: Evaluation, candidate: Candidate): boolean {
    const haystack = JSON.stringify(candidate).toLowerCase();
    return evaluation.requirements.every((req) => {
        if (req.status === "not_found") return true;
        const words = req.evidence
            .toLowerCase()
            .split(/\W+/)
            .filter((w) => w.length > 4);
        // At least some meaningful words from the evidence should exist in the
        // candidate's actual data — a loose but useful anti-hallucination check.
        return words.some((w) => haystack.includes(w));
    });
}

export async function evaluateCandidate(
    candidate: Candidate,
    requirements: Requirements
): Promise<Evaluation> {
    let lastError: unknown = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
            const { text } = await runCompletion({
                system: EVALUATE_CANDIDATE_SYSTEM,
                user: buildEvaluateCandidatePrompt(requirements, candidate),
            });

            const jsonBlock = extractJsonBlock(text);
            const parsed = JSON.parse(jsonBlock);
            const evaluation = EvaluationSchema.parse({
                ...parsed,
                candidateId: candidate.id,
            });

            if (!evidenceLooksGrounded(evaluation, candidate)) {
                throw new Error("Evidence does not appear grounded in candidate data");
            }

            return evaluation;
        } catch (err) {
            lastError = err;
            console.warn(`[evaluateCandidate] attempt ${attempt} failed:`, err);
        }
    }

    throw new Error(
        `evaluateCandidate failed after ${MAX_RETRIES + 1} attempts: ${lastError}`
    );
}