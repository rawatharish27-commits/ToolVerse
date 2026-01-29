
import { LIMITS } from './limits';

// Unified input interface for the ToolPipeline isolate
export interface ImageReducerInput {
  file: File | null;
  targetKb: number;
  targetBytes?: number;
}

/**
 * Validates the initial user input before normalization.
 */
// Fix: Use unified ImageReducerInput type for pipeline consistency
export function validate(input: ImageReducerInput) {
  if (!input.file) return { valid: false, error: "Missing source image payload." };
  if (!LIMITS.formats.includes(input.file.type)) return { valid: false, error: "Unsupported binary container." };
  if (input.file.size > LIMITS.maxInputSizeMB * 1024 * 1024) return { valid: false, error: "Payload exceeds 20MB isolation limit." };
  if (input.targetKb < LIMITS.minTargetKB) return { valid: false, error: `Minimum target is ${LIMITS.minTargetKB}KB.` };
  return { valid: true };
}
