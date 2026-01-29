
import { ValidationResult } from '../../core/pipeline';

export function validate(file: File): ValidationResult {
  if (!file) return { valid: false, error: "No image provided for audit." };
  return { valid: true };
}
