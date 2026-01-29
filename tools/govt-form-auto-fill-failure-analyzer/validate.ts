
import { ValidationResult } from '../../core/pipeline';
import { LIMITS } from './limits';

export function validate(input: string): ValidationResult {
  if (!input || input.trim().length < LIMITS.minHtmlSnippetLength) {
    return { valid: false, error: "Snippet too short. Paste at least one <input> tag or field name." };
  }
  if (input.length > LIMITS.maxHtmlSnippetLength) {
    return { valid: false, error: "Snippet too large. Focus on the problematic field only." };
  }
  return { valid: true };
}
