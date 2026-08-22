import { runCompletion } from "./qvac";
import { EXTRACT_REQUIREMENTS_SYSTEM, buildExtractRequirementsPrompt } from "./prompts";
import { RequirementsSchema, type Requirements } from "./schemas";

const MAX_RETRIES = 2;

// Pulls the first {...} block out of a response, in case the model
// wraps JSON in prose or code fences despite instructions.
function extractJsonBlock(text: string): string {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON object found in model output");
    return match[0];
}

export async function extractRequirements(query: string): Promise<Requirements> {
    let lastError: unknown = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
            const { text } = await runCompletion({
                system: EXTRACT_REQUIREMENTS_SYSTEM,
                user: buildExtractRequirementsPrompt(query),
            });

            const jsonBlock = extractJsonBlock(text);
            const parsed = JSON.parse(jsonBlock);
            return RequirementsSchema.parse(parsed);
        } catch (err) {
            lastError = err;
            console.warn(`[extractRequirements] attempt ${attempt} failed:`, err);
        }
    }

    throw new Error(
        `extractRequirements failed after ${MAX_RETRIES + 1} attempts: ${lastError}`
    );
}