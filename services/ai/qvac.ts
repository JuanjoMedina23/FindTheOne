import {
    loadModel,
    completion,
    unloadModel,
    LLAMA_3_2_1B_INST_Q4_0,
} from "@qvac/sdk";

// Singleton model handle so we only load once per process.
let modelId: string | null = null;
let loadingPromise: Promise<string> | null = null;

export async function initQvac(): Promise<string> {
    if (modelId) return modelId;
    if (loadingPromise) return loadingPromise;

    loadingPromise = loadModel({
        modelSrc: LLAMA_3_2_1B_INST_Q4_0,
        modelType: "llm",
        modelConfig: { ctx_size: 4096 },
        onProgress: (p) => {
            console.log(`[QVAC] loading model: ${p.percentage?.toFixed(0)}%`);
        },
    }).then((id) => {
        modelId = id;
        return id;
    });

    return loadingPromise;
}

export async function shutdownQvac(): Promise<void> {
    if (modelId) {
        await unloadModel({ modelId });
        modelId = null;
    }
}

interface RunCompletionOptions {
    system: string;
    user: string;
}

// Runs one completion turn and returns the raw text.
// Non-streaming: we need the full text before we can parse JSON.
export async function runCompletion({
    system,
    user,
}: RunCompletionOptions): Promise<{ text: string; latencyMs: number }> {
    const id = await initQvac();
    const start = Date.now();

    const run = completion({
        modelId: id,
        history: [
            { role: "system", content: system },
            { role: "user", content: user },
        ],
        stream: false,
    });

    const final = await run.final;
    const latencyMs = Date.now() - start;

    return { text: final.contentText, latencyMs };
}