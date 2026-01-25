export function signatureFixer({
  portalType,
  source,
  errorMessage = "",
  fileSizeKB,
  inkColor,
  backgroundColor
}: {
  portalType: string;
  source: string;
  errorMessage?: string;
  fileSizeKB?: number;
  inkColor?: string;
  backgroundColor?: string;
}) {
  const findings: string[] = [];
  const fixes: string[] = [];

  if (backgroundColor && backgroundColor.toLowerCase() !== "white") {
    findings.push("Non-white background detected.");
    fixes.push("Scan on a pure white paper; ensure no shadows or beige tints.");
  }

  if (inkColor && !["black", "blue"].includes(inkColor.toLowerCase())) {
    findings.push(`Unsupported ink color: ${inkColor}.`);
    fixes.push("Use a black gel or ballpoint pen for maximum contrast.");
  }

  if (fileSizeKB && (fileSizeKB < 10 || fileSizeKB > 50)) {
    findings.push(`File size (${fileSizeKB}KB) is outside the typical 10-50KB portal range.`);
    fixes.push("Compress the image to exactly ~20KB using an image reducer.");
  }

  if (source === "photographed") {
    findings.push("Mobile-photo artifacts likely present.");
    fixes.push("Use a 'Document Scanner' app to flatten and whiten the signature area.");
  }

  if (errorMessage.toLowerCase().includes("invalid") || errorMessage.toLowerCase().includes("signature")) {
    findings.push("Generic portal rejection triggered.");
    fixes.push("Ensure dimensions are roughly 300x100px and contrast is high.");
  }

  return {
    primaryReason: findings[0] || "Clarity or resolution issue.",
    fullAudit: findings,
    actionPlan: fixes,
    standard: "Black Ink, White Paper, <50KB"
  };
}