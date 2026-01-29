
export function verify(output: any) {
  if (!output.verdict) return { secure: false, error: "Computation incomplete." };
  return { secure: true };
}
