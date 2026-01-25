type Portal = "government" | "job" | "bank" | "university" | "other";

type Issue = {
  reason: string;
  fix: string;
  score: number;
};

export function pdfCompatibilityLevelAnalyzer({
  portal,
  pdfVersion,
  encrypted,
  hasForms,
  hasEmbeddedFonts,
  isScanned,
  hasJavaScript
}: {
  portal: Portal;
  pdfVersion?: number;
  encrypted?: boolean;
  hasForms?: boolean;
  hasEmbeddedFonts?: boolean;
  isScanned?: boolean;
  hasJavaScript?: boolean;
}) {
  const issues: Issue[] = [];
  let baseScore = 0;

  // Version handling
  if (pdfVersion && pdfVersion > 1.6) {
    issues.push({
      reason: "Newer PDF version (1.7+) may not be supported by legacy portal engines.",
      fix: "Re-save as PDF version 1.4 or 1.5 using a 'Compatibility' export profile.",
      score: portal === "government" ? 9 : 6
    });
    baseScore += 3;
  }

  // Encryption
  if (encrypted) {
    issues.push({
      reason: "PDF is encrypted or secured with an owner/user password.",
      fix: "Remove encryption/password before uploading. Portals cannot read locked files.",
      score: 10
    });
    baseScore += 4;
  }

  // JavaScript
  if (hasJavaScript) {
    issues.push({
      reason: "PDF contains active JavaScript elements (Common in dynamic forms).",
      fix: "Remove JavaScript by printing to a static PDF.",
      score: 10
    });
    baseScore += 4;
  }

  // Forms
  if (hasForms && portal === "government") {
    issues.push({
      reason: "Interactive PDF forms are often rejected by automated validation scripts.",
      fix: "Flatten the form fields into plain text and save as a static PDF.",
      score: 8
    });
    baseScore += 3;
  }

  // Fonts
  if (hasEmbeddedFonts === false) {
    issues.push({
      reason: "Document fonts are not embedded. This can lead to gibberish text on different systems.",
      fix: "Embed fonts during export or re-save as an image-based PDF.",
      score: 7
    });
    baseScore += 2;
  }

  let status: "Compatible" | "Risky" | "Incompatible" = "Compatible";
  if (baseScore >= 8) status = "Incompatible";
  else if (baseScore >= 4) status = "Risky";

  if (issues.length === 0) {
    return {
      "Final Status": status.toUpperCase(),
      "Assessment": "Your PDF is standard and should be accepted by almost any portal.",
      "Recommended Profile": "Standard ISO 32000 (PDF 1.4/1.5)"
    };
  }

  issues.sort((a, b) => b.score - a.score);

  return {
    "Compatibility Status": status.toUpperCase(),
    "Primary Incompatibility": issues[0].reason,
    "Safest Fix": issues[0].fix,
    "Secondary Risks": issues.slice(1).map(i => i.reason),
    "Recommended Target Profile": "PDF v1.4, No Encryption, No JS, Embedded Subsets"
  };
}