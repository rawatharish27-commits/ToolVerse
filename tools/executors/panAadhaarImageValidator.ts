type IDType = "pan" | "aadhaar";
type Portal = "kyc" | "bank" | "government" | "other";

type Risk = {
  reason: string;
  fix: string;
  example: string;
  score: number;
};

export function panAadhaarImageValidator({
  idType,
  portal,
  fileSizeKB,
  widthPx,
  heightPx,
  dpi,
  format,
  colorMode,
  glareDetected,
  edgesVisible
}: {
  idType: IDType;
  portal: Portal;
  fileSizeKB?: number;
  widthPx?: number;
  heightPx?: number;
  dpi?: number;
  format?: string;
  colorMode?: "color" | "grayscale";
  glareDetected?: boolean;
  edgesVisible?: boolean;
}) {
  const risks: Risk[] = [];

  if (fileSizeKB && (fileSizeKB < 50 || fileSizeKB > 500)) {
    risks.push({
      reason: "ID image file size is outside common portal limits",
      fix: "Resize or compress to the allowed range",
      example: "100KB – 300KB",
      score: 8
    });
  }

  if (format && !["jpg", "jpeg", "png"].includes(format.toLowerCase())) {
    risks.push({
      reason: "Unsupported image format",
      fix: "Convert the image to JPG or PNG",
      example: "JPG format",
      score: 8
    });
  }

  if (dpi && dpi < 150) {
    risks.push({
      reason: "Image DPI is too low for clear ID verification",
      fix: "Re-scan or export at higher DPI",
      example: "200–300 DPI",
      score: 7
    });
  }

  if (widthPx && heightPx && (widthPx < 600 || heightPx < 400)) {
    risks.push({
      reason: "Image resolution is too low",
      fix: "Capture or scan at higher resolution",
      example: "At least 1200×800 px",
      score: 7
    });
  }

  if (portal !== "other" && colorMode === "grayscale") {
    risks.push({
      reason: "Grayscale images are often rejected for KYC verification",
      fix: "Upload a color image",
      example: "Clear color scan/photo",
      score: 6
    });
  }

  if (glareDetected) {
    risks.push({
      reason: "Glare/reflection detected on ID",
      fix: "Re-capture image under even lighting without flash",
      example: "No reflections on laminate",
      score: 9
    });
  }

  if (edgesVisible === false) {
    risks.push({
      reason: "ID edges are not fully visible",
      fix: "Capture the full ID card with all corners visible",
      example: "All four edges visible",
      score: 9
    });
  }

  if (risks.length === 0) {
    return {
      valid: true,
      message: "Image meets common PAN/Aadhaar upload rules.",
      note: "Portal-specific rules may still apply."
    };
  }

  risks.sort((a, b) => b.score - a.score);

  return {
    valid: false,
    primaryReason: {
      reason: risks[0].reason,
      fix: risks[0].fix,
      example: risks[0].example
    },
    otherRisks: risks.slice(1).map(r => ({
      reason: r.reason,
      fix: r.fix,
      example: r.example
    })),
    note: idType === "aadhaar" ? "Aadhaar uploads often require clear color images with visible edges." : "PAN uploads must be clear, readable, and properly cropped."
  };
}