
import { VerificationResult } from '../../core/pipeline';

export function verify(output: any): VerificationResult {
  if (output.estWait === undefined) return { secure: false, error: "Calculation fault." };
  return { secure: true };
}
