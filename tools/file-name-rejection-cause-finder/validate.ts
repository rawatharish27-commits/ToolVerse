
import { ValidationResult } from '../../core/pipeline';

export function validate(input: string): ValidationResult {
  if (!input || input.trim().length === 0) return { valid: false, error: "Input buffer empty." };
  return { valid: true };
}
