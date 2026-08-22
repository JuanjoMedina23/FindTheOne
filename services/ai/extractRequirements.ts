import { AiAdapterNotConfiguredError } from "../../types/ai";
import type { ExtractRequirements } from "../../types/ai";

export const extractRequirements: ExtractRequirements = () =>
  Promise.reject(new AiAdapterNotConfiguredError("extractRequirements"));
