
import { VerificationResult } from '../../core/pipeline';

export function verify(output: any): VerificationResult {
  if (typeof output.probability !== 'number') return { secure: false, error: "Invalid probability type." };
  return { secure: true };
}
