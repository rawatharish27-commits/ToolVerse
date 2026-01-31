
import { VerificationResult } from '../../types';

export function verify(output: any): VerificationResult {
  if (output.probability === undefined) return { secure: false, error: "Logic node output corrupted." };
  return { secure: true };
}
