
export function verify(output: any) {
  if (output.multiplier < 1) return { secure: false, error: "Mathematical inconsistency detected." };
  return { secure: true };
}
