
import { VerificationResult } from '../../core/pipeline';

export function verify(output: any): VerificationResult {
  if (typeof output.safe !== 'boolean') return { secure: false, error: "Logic inconsistency detected." };
  return { secure: true };
}
