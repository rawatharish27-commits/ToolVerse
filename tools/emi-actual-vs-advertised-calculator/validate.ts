
import { LIMITS } from './limits';

export function validate(input: any) {
  if (!input.amount || input.amount <= 0) return { valid: false, error: "Enter a valid loan amount." };
  if (!input.rate || input.rate < LIMITS.minRate || input.rate > LIMITS.maxRate) return { valid: false, error: `Rate must be between ${LIMITS.minRate}% and ${LIMITS.maxRate}%.` };
  if (!input.months || input.months <= 0) return { valid: false, error: "Tenure must be at least 1 month." };
  return { valid: true };
}
