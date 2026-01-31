
export function verify(output: any) {
  if (output.verdict === undefined) return { secure: false, error: "Logic fault: No verdict generated." };
  return { secure: true };
}
