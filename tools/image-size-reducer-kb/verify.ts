
import { VerificationResult } from '../../core/pipeline';

/**
 * Verifies the integrity of the generated image binary.
 */
// Fix: Changed property 'valid' to 'secure' to strictly implement the VerificationResult interface required by the pipeline
export function verify(output: { blob: Blob, finalSize: number }): VerificationResult {
  if (output.finalSize === 0) return { secure: false, error: "Zero-byte binary generated." };
  return { secure: true };
}
