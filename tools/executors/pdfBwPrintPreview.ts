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
    risks.push("Heavy color usage loses necessary distinction in B/W print.");
    fixes.push("Convert color layers to distinct grayscale shades (dark/light contrast).");
  }

  if (usesHighlights) {
    verdict = "Risky";
    risks.push("Yellow/Light highlights often appear as solid gray blocks or disappear in B/W print.");
    fixes.push("Replace highlights with text borders or bold font styles.");
  }

  if (usesLightGrayText) {
    verdict = "Poor";
    risks.push("Light gray text becomes unreadable or invisible after halftone conversion.");
    fixes.push("Change text color to at least 70% gray or pure black.");
  }

  if (thinLines) {
    verdict = verdict === "Good" ? "Risky" : verdict;
    risks.push("Thin colored lines may break or vanish during printing.");
    fixes.push("Increase line weight to at least 1pt and use solid black.");
  }

  if (contentType === "chart" && colorUsage !== "none") {
    verdict = "Poor";
    risks.push("Data series relying only on color will be impossible to tell apart in grayscale.");
    fixes.push("Use patterns (stripes, dots), distinct markers, or text labels on charts.");
  }

  if (background !== "white") {
    risks.push("Non-white background reduces overall contrast significantly in print.");
    fixes.push("Print on white background for maximum readability.");
  }

  if (risks.length === 0) {
    return {
      "Verdict": verdict.toUpperCase(),
      "Message": "PDF appears safe for clear black & white printing.",
      "Print Safe Preset": "Black text on white background, no highlights"
    };
  }

  return {
    "Verdict": verdict.toUpperCase(),
    "At-Risk Elements": risks,
    "Safe Fix Path": fixes,
    "Strategic Advice": "Increase contrast manually before printing to ensure all elements remain distinct in grayscale."
  };
}