
type PageSize = "A4" | "Letter" | "Legal" | "Custom";
type Printer = "inkjet" | "laser";
type Scaling = "actual" | "fit" | "custom";
type Orientation = "portrait" | "landscape";

const NON_PRINTABLE_MM = {
  inkjet: 5,
  laser: 4
};

// Fix: Standardized function name to pdfPrintCutoffPredictor (lowercase 'o') and unified parameters to match callers
export function pdfPrintCutoffPredictor({
  pageSize,
  printerType,
  scaling,
  marginsMm,
  contentNearEdges = "none",
  orientation = "portrait"
}: {
  pageSize: PageSize;
  printerType: Printer;
  scaling: Scaling;
  marginsMm?: { top: number; right: number; bottom: number; left: number };
  contentNearEdges?: "none" | "header" | "footer" | "sides";
  orientation?: Orientation;
}) {
  const risks: string[] = [];
  const fixes: string[] = [];
  const edges: string[] = [];

  const np = NON_PRINTABLE_MM[printerType];

  // Page size mismatch risk
  if (pageSize === "Letter" && orientation === "portrait") {
    risks.push("Letter size (8.5\") printed on A4 paper will likely cut content at the bottom.");
    fixes.push("Change printer settings to 'Scale to Fit' or 'Shrink Oversized Pages'.");
    edges.push("Bottom Edge");
  }

  // Scaling rules
  if (scaling === "actual") {
    risks.push("Actual Size scaling ignored printer's physical non-printable margins.");
    fixes.push("Select 'Fit to Printable Area' in your print dialog.");
    edges.push("All Borders");
  }

  // Margins check
  if (marginsMm) {
    if (marginsMm.top < np || marginsMm.bottom < np || marginsMm.left < np || marginsMm.right < np) {
      risks.push(`Document margins (${Math.min(marginsMm.top, marginsMm.bottom)}mm) are thinner than your ${printerType} printer's safe limit (${np}mm).`);
      fixes.push(`Increase document margins to at least ${np + 2}mm.`);
      edges.push("Specified Thin Borders");
    }
  }

  // Content near edges
  if (contentNearEdges !== "none") {
    risks.push(`Critical content (like a ${contentNearEdges}) is placed in the printer's danger zone.`);
    fixes.push("Move headers/footers inward or scale content down by 5%.");
    edges.push(contentNearEdges === "sides" ? "Left & Right Edges" : contentNearEdges);
  }

  if (risks.length === 0) {
    return {
      "Risk Level": "LOW",
      "Analysis": "No major cut-off risks detected for these settings.",
      "Recommended Preset": "A4 Paper + 'Fit to Page' + Standard Margins"
    };
  }

  const riskLevel = risks.length >= 3 ? "HIGH" : (risks.length === 2 ? "MEDIUM" : "LOW");

  return {
    "Risk Level": riskLevel,
    "Detected Issue": risks[0],
    "At-Risk Edges": Array.from(new Set(edges)),
    "Required Fix": fixes[0],
    "Safe Printing Tip": "Always check 'Print Preview' and ensure 'Scale to Fit' is enabled for cross-region page sizes (A4 vs Letter)."
  };
}
