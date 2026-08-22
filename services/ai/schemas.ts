import { z } from "zod";

export const RequirementsSchema = z.object({
    required: z.array(z.string()),
    preferred: z.array(z.string()),
});
export type Requirements = z.infer<typeof RequirementsSchema>;

export const RequirementStatusSchema = z.object({
    name: z.string(),
    status: z.enum(["supported", "partial", "not_found"]),
    evidence: z.string(),
});

export const EvaluationSchema = z.object({
    candidateId: z.number(),
    match: z.enum(["strong_match", "partial_match", "no_match"]),
    confidence: z.enum(["high", "medium", "low"]),
    requirements: z.array(RequirementStatusSchema),
    summary: z.string(),
});
export type Evaluation = z.infer<typeof EvaluationSchema>;

export const NoMatchSchema = z.object({
    match: z.literal("no_strong_match"),
    missingEvidence: z.array(z.string()),
    closestCandidateId: z.number().nullable(),
    recommendation: z.string(),
});
export type NoMatch = z.infer<typeof NoMatchSchema>;