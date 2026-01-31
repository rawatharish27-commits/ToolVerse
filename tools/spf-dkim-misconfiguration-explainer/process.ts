
export async function process(input: { spfRecord: string, hasDkim: boolean }) {
  const issues = [];
  if (!input.spfRecord.includes("v=spf1")) issues.push("Invalid SPF version tag.");
  if (input.spfRecord.includes("+all")) issues.push("SPF '+all' is dangerous (permits everyone).");
  if (!input.hasDkim) issues.push("Missing DKIM signature (Risk of spoofing).");

  return {
    valid: issues.length === 0,
    issues,
    remediation: "Ensure SPF ends with '~all' or '-all' and DKIM public key is in DNS."
  };
}
