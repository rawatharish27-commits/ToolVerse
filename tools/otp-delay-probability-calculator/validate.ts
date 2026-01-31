
import { ValidationResult } from '../../types';

export function validate(input: any): ValidationResult {
  if (!input.carrier) return { valid: false, error: "Please select a network operator." };
  if (input.signal < 1 || input.signal > 5) return { valid: false, error: "Invalid signal data." };
  return { valid: true };
}
