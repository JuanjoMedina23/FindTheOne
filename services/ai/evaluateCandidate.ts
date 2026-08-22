import { AiAdapterNotConfiguredError } from "../../types/ai";
import type { EvaluateCandidate } from "../../types/ai";

export const evaluateCandidate: EvaluateCandidate = () =>
  Promise.reject(new AiAdapterNotConfiguredError("evaluateCandidate"));
