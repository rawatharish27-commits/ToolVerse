
import { VerificationResult } from '../../types';

export function verify(output: any): VerificationResult {
  if (output.issues === undefined) {
    return { secure: false, error: "Logic node failed to produce a valid issue array." };
  }
  return { secure: true };
}
