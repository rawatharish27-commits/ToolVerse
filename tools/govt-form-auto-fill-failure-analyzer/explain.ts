
export function explain(output: any): string {
  if (output.issues.length === 0) {
    return "Your browser should technically work. Check if 'Save and fill addresses' is enabled in your Chrome/Edge settings.";
  }
  return `Diagnosis: ${output.verdict}. ${output.issues[0]} Suggestions: ${output.suggestions.join(" ")}`;
}
