
import { ValidationResult } from '../../core/pipeline';

export function validate(input: any): ValidationResult {
  if (!input.carrier) return { valid: false, error: "Carrier identification required." };
  return { valid: true };
}
