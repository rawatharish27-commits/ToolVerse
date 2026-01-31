
export function explain(output: any): string {
  if (output.issues.length === 0) {
    return "Your code looks standard. Check if 'Save and fill addresses' is enabled in your Chrome/Edge settings.";
  }
  return `Diagnosis: ${output.verdict}. ${output.issues[0]} Recommendation: ${output.suggestions[0] || 'Try a different browser.'}`;
}
