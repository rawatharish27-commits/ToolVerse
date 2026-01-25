type PortalType = "government" | "job" | "college" | "other";
type SourceType = "scanned" | "photographed" | "digital";

type Reason = {
  reason: string;
  fix: string;
  example: string;
  score: number;
};

export function signatureUploadFixTool({
  portalType,
  source,
  errorMessage = "",
  fileSizeKB,
  widthPx,
  heightPx,
  dpi,
  format,
  inkColor,
  backgroundColor
}: {
  portalType: PortalType;
  source: SourceType;
  errorMessage?: string;
  fileSizeKB?: number;
  widthPx?: number;
  heightPx?: number;
  dpi?: number;
  format?: string;
  inkColor?: string;
  backgroundColor?: string;
}) {
  const reasons: Reason[] = [];

  // Background
  if (backgroundColor && backgroundColor.toLowerCase() !== "white") {
    reasons.push({
      reason: "Signature background is not plain white",
      fix: "Place paper on a white surface and re-scan or crop tightly",
      example: "Pure white background, no shadows",
      score: 9
    });
  }

  // Ink color
  if (inkColor && !["black", "blue"].includes(inkColor.toLowerCase())) {
    reasons.push({
      reason: "Signature ink color is not accepted",
      fix: "Use black or blue pen only",
      example: "Black ink on white paper",
      score: 8
    });
  }

  // Size
  if (fileSizeKB && (fileSizeKB < 10 || fileSizeKB > 200)) {
    reasons.push({
      reason: "Signature file size is outside allowed range",
      fix: "Resize/compress to portal limits",
      example: "10KB – 50KB (common govt range)",
      score: 8
    });
  }

  // Dimensions
  if (widthPx && heightPx && widthPx < heightPx) {
    reasons.push({
      reason: "Signature orientation is likely wrong (Portrait)",
      fix: "Crop or rotate signature to landscape orientation",
      example: "300×100 to 600×200 px",
      score: 6
    });
  }

  // DPI
  if (dpi && dpi < 100) {
    reasons.push({
      reason: "Signature DPI is too low",
      fix: "Save/export at higher DPI",
      example: "200–300 DPI",
      score: 7
    });
  }

  // Format
  if (format && !["jpg", "jpeg", "png"].includes(format.toLowerCase())) {
    reasons.push({
      reason: "Signature file format is not supported",
      fix: "Convert to JPG or PNG",
      example: "JPG/PNG only",
      score: 7
    });
  }

  // Source-specific
  if (source === "photographed") {
    reasons.push({
      reason: "Photographed signature often contains shadows/noise",
      fix: "Scan the signature or use a scanning app with crop",
      example: "Scanned signature, clean edges",
      score: 6
    });
  }

  // Error message hints
  const em = errorMessage.toLowerCase();
  if (em.includes("invalid") || em.includes("signature")) {
    reasons.push({
      reason: "Portal validation failed for signature clarity/format",
      fix: "Ensure clear strokes, correct size, white background",
      example: "Clear strokes, no blur",
      score: 9
    });
  }

  if (reasons.length === 0) {
    return {
      primaryReason: {
        reason: "Signature rejected due to common portal validation rules",
        fix: "Check background, ink color, size, DPI, and format",
        example: "Black ink, white background, correct size"
      },
      otherPossibleReasons: []
    };
  }

  reasons.sort((a, b) => b.score - a.score);

  return {
    primaryReason: {
      reason: reasons[0].reason,
      fix: reasons[0].fix,
      example: reasons[0].example
    },
    otherPossibleReasons: reasons.slice(1).map(r => ({
      reason: r.reason,
      fix: r.fix,
      example: r.example
    }))
  };
}