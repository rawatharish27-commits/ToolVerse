
import { ValidationResult } from '../../types';
import { LIMITS } from './limits';

export function validate(input: string): ValidationResult {
  if (!input || input.trim().length === 0) {
    return { valid: false, error: "Input code snippet or field name cannot be empty." };
  }
  if (input.length > LIMITS.maxHtmlSnippetLength) {
    return { valid: false, error: `Snippet too long. Max ${LIMITS.maxHtmlSnippetLength} characters allowed.` };
  }
  return { valid: true };
}
