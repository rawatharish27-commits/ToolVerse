type PageSize = "A4" | "Letter" | "Legal" | "Custom";
type Printer = "inkjet" | "laser";
type Scaling = "actual" | "fit" | "custom";
type Orientation = "portrait" | "landscape";

const NON_PRINTABLE_MM = {
  inkjet: 5,
  laser: 4
};

// Fix: Implementation consolidated here in the lowercase filename version.
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
    risks.push("Letter size (8.5\") printed on A4 paper often cuts content at the bottom edge.");
    fixes.push("Change printer settings to 'Scale to Fit' or 'Shrink to Printable Area'.");
    edges.push("Bottom Edge");
  }

  // Scaling rules
  if (scaling === "actual") {
    risks.push("Actual Size scaling ignores printer hardware non-printable margins.");
    fixes.push("Select 'Fit to Page' in your print dialog to avoid border loss.");
    edges.push("All Borders");
  }

  // Margins check
  if (marginsMm) {
    if (
      marginsMm.top < np ||
      marginsMm.bottom < np ||
      marginsMm.left < np ||
      marginsMm.right < np
    ) {
      risks.push(`Document margins are thinner than your ${printerType} printer's safe limit (${np}mm).`);
      fixes.push(`Increase document margins to at least ${np + 2}mm.`);
      edges.push("Outer Edges");
    }
  }

  // Content near edges
  if (contentNearEdges !== "none") {
    risks.push(`Critical content (like a ${contentNearEdges}) is placed in the printer's risk zone.`);
    fixes.push("Move content further from edges or scale down the document by 5-10%.");
    edges.push(contentNearEdges === "sides" ? "Left & Right Sides" : contentNearEdges);
  }

  if (risks.length === 0) {
    return {
      "Risk Level": "LOW",
      "Analysis": "No major cut-off risks detected for these settings.",
      "Safe Preset": "A4 Paper + 'Fit to page' + Standard 10mm margins"
    };
  }

  const riskLevel = risks.length >= 3 ? "HIGH" : risks.length === 2 ? "MEDIUM" : "LOW";

  return {
    "Risk Level": riskLevel,
    "Detected Problem": risks[0],
    "At-Risk Edges": Array.from(new Set(edges)),
    "Exact Fixes": fixes,
    "Safe Printing Tip": "Always use 'Print Preview' and ensure 'Scale to Fit' is checked for cross-region page sizes."
  };
}