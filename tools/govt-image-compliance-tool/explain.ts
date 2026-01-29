
export function explain(output: any): string {
  if (output.passed) return "This file satisfies the structural and metrical requirements of major Indian recruitment portals (SSC/UPSC).";
  return `Compliance Fault: ${output.findings.join(", ")}. Resolution: Use the 'Reduce Photo KB' tool to target exactly 35KB.`;
}
