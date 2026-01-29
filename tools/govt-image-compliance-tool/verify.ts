
import { VerificationResult } from '../../core/pipeline';

export function verify(output: any): VerificationResult {
  if (output.metrics === undefined) return { secure: false, error: "Metrical corruption." };
  return { secure: true };
}
