
import { ValidationResult } from '../../core/pipeline';

export function validate(input: any): ValidationResult {
  if (!input.carrier) return { valid: false, error: "Missing carrier identifier." };
  if (typeof input.signal !== 'number' || input.signal < 1 || input.signal > 5) {
    return { valid: false, error: "Signal strength must be index 1-5." };
  }
  return { valid: true };
}
