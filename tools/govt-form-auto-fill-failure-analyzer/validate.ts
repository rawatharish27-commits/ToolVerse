
import { LIMITS } from './limits';

export function validate(input: string) {
  if (!input || input.length < LIMITS.minHtmlSnippetLength) {
    return { valid: false, error: "Input too short. Please paste the HTML snippet or field name." };
  }
  if (input.length > LIMITS.maxHtmlSnippetLength) {
    return { valid: false, error: "Snippet exceeds limit. Only paste relevant <input> tags." };
  }
  return { valid: true };
}
