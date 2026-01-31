
export function validate(input: string) {
  if (!input || input.trim().length < 5) {
    return { valid: false, error: "Input is too short. Please paste at least one full HTML input tag." };
  }
  return { valid: true };
}
