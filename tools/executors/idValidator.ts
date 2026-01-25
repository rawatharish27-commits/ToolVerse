export function idValidator({
  docType,
  fileSizeKB,
  format
}: {
  docType: "PAN" | "Aadhaar" | "VoterID";
  fileSizeKB: number;
  format: string;
}) {
  const rules = {
    PAN: { size: [10, 500], formats: ["jpg", "jpeg", "pdf"] },
    Aadhaar: { size: [10, 1000], formats: ["jpg", "pdf"] },
    VoterID: { size: [10, 500], formats: ["jpg", "jpeg"] }
  };

  const rule = rules[docType];
  const issues: string[] = [];

  if (fileSizeKB < rule.size[0] || fileSizeKB > rule.size[1]) {
    issues.push(`Size ${fileSizeKB}KB is outside ${rule.size[0]}-${rule.size[1]}KB.`);
  }

  if (!rule.formats.includes(format.toLowerCase())) {
    issues.push(`Format ${format} is not allowed. Expected: ${rule.formats.join("/")}.`);
  }

  return {
    status: issues.length === 0 ? "Compliant" : "Non-Compliant",
    findings: issues,
    recommendation: issues.length === 0 ? "Proceed to upload." : "Adjust file to match specifications."
  };
}