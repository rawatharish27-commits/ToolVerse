
export function explain(output: any): string {
  if (!output.foundIssues) {
    return "The portal's code seems standard. If autofill fails, check your Chrome/Edge settings under 'Autofill and passwords' to ensure 'Save and fill addresses' is enabled.";
  }
  return `We detected ${output.issues.length} technical factors in the portal's code that prevent standard browser autofill. Most government sites do this to prevent bot submissions.`;
}
