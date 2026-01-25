type PortalType = "government" | "job" | "college" | "other";
type PhotoType = "passport" | "profile" | "document";

export function photoRejectionReasonFinder({
  photoType,
  portalType,
  errorMessage = "",
  fileSizeKB,
  widthPx,
  heightPx,
  dpi,
  backgroundColor,
  faceCentered
}: {
  photoType: PhotoType;
  portalType: PortalType;
  errorMessage?: string;
  fileSizeKB?: number;
  widthPx?: number;
  heightPx?: number;
  dpi?: number;
  backgroundColor?: string;
  faceCentered?: boolean;
}) {
  const reasons: any[] = [];

  // Background check
  if (backgroundColor && backgroundColor.toLowerCase() !== "white") {
    reasons.push({
      reason: "Background color is not acceptable",
      fix: "Use plain white background with no shadows",
      example: "White background, even lighting"
    });
  }

  // Size check
  if (fileSizeKB && (fileSizeKB < 20 || fileSizeKB > 200)) {
    reasons.push({
      reason: "Photo file size is outside allowed range",
      fix: "Resize photo within portal size limits",
      example: "20KB – 50KB (common govt range)"
    });
  }

  // Dimension check
  if (widthPx && heightPx && widthPx !== heightPx) {
    reasons.push({
      reason: "Photo dimensions are incorrect",
      fix: "Crop photo to square dimensions",
      example: "200 × 200 pixels"
    });
  }

  // DPI check
  if (dpi && dpi < 100) {
    reasons.push({
      reason: "Photo DPI is too low",
      fix: "Save image with minimum 200 DPI",
      example: "200–300 DPI"
    });
  }

  // Face alignment
  if (faceCentered === false) {
    reasons.push({
      reason: "Face is not properly centered",
      fix: "Crop photo so face is centered and clearly visible",
      example: "Full face visible, no tilt"
    });
  }

  // Error message mapping
  if (errorMessage.toLowerCase().includes("blur") || errorMessage.toLowerCase().includes("unclear")) {
    reasons.unshift({
      reason: "Photo is blurred or unclear",
      fix: "Use a clear photo with proper focus",
      example: "Sharp image, no motion blur"
    });
  }

  if (reasons.length === 0) {
    return {
      primaryReason: {
        reason: "Photo rejected due to common portal validation rules",
        fix: "Check background, size, clarity, and dimensions",
        example: "White background, correct size, clear face"
      },
      otherPossibleReasons: []
    };
  }

  return {
    primaryReason: reasons[0],
    otherPossibleReasons: reasons.slice(1)
  };
}