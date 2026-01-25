type Content = "text" | "form" | "chart" | "mixed";
type ColorUsage = "none" | "light" | "medium" | "heavy";

export function pdfBwPrintPreview({
  contentType,
  colorUsage,
  background = "white",
  usesHighlights,
  usesLightGrayText,
  thinLines
}: {
  contentType: Content;
  colorUsage: ColorUsage;
  background?: "white" | "light" | "dark";
  usesHighlights?: boolean;
  usesLightGrayText?: boolean;
  thinLines?: boolean;
}) {
  const risks: string[] = [];
  const fixes: string[] = [];

  let verdict: "Good" | "Risky" | "Poor" = "Good";

  if (colorUsage === "heavy") {
    verdict = "Risky";
    risks.push("Heavy color usage loses distinction in B/W print.");
    fixes.push("Convert colors to distinct grayscale shades.");
  }

  if (usesHighlights) {
    verdict = "Risky";
    risks.push("Highlights (yellow/green) may disappear or look like solid blocks in B/W print.");
    fixes.push("Replace highlights with borders, bold text, or gray shading.");
  }

  if (usesLightGrayText) {
    verdict = "Poor";
    risks.push("Light gray text becomes unreadable or invisible in physical print.");
    fixes.push("Change text color to dark gray or pure black.");
  }

  if (thinLines) {
    verdict = verdict === "Good" ? "Risky" : verdict;
    risks.push("Thin colored lines may break or vanish after halftone conversion.");
    fixes.push("Increase line thickness to at least 1pt and use solid black.");
  }

  if (contentType === "chart" && colorUsage !== "none") {
    verdict = "Poor";
    risks.push("Charts relying only on color categories will be unclear in grayscale.");
    fixes.push("Add patterns (stripes/dots), labels, or direct data values.");
  }

  if (background !== "white") {
    risks.push("Non-white background reduces overall text contrast in print.");
    fixes.push("Use a white background and remove page gradients for printing.");
  }

  if (risks.length === 0) {
    return {
      "Final Verdict": verdict.toUpperCase(),
      "Message": "Your PDF is optimized for clear black & white printing.",
      "Print Safe Preset": "Black text on white background, no highlights"
    };
  }

  return {
    "Readability Verdict": verdict.toUpperCase(),
    "At-Risk Elements": risks,
    "Corrective Actions": fixes,
    "Safe Print Preset": "Black text, strong contrast, patterned charts"
  };
}