
import { VerificationResult } from '../../core/pipeline';

export function verify(output: any): VerificationResult {
  if (output.verdict === undefined) return { secure: false, error: "Logic fault: No verdict generated." };
  return { secure: true };
}
