type Source = "camera" | "screenshot";
type UseCase = "government" | "kyc" | "social" | "print" | "general";

export function cameraVsScreenshotTool({
  source,
  useCase,
  widthPx,
  heightPx,
  compressionLevel = "medium",
  containsText
}: {
  source: Source;
  useCase: UseCase;
  widthPx?: number;
  heightPx?: number;
  compressionLevel?: "low" | "medium" | "high";
  containsText?: boolean;
}) {
  const comparison: string[] = [];
  const risks: string[] = [];
  let recommended: Source = "camera";

  // Base characteristics
  if (source === "camera") {
    comparison.push("Camera photos capture real-world detail with natural noise and depth.");
  } else {
    comparison.push("Screenshots are digitally compressed and often lack natural detail.");
    risks.push("Screenshots are commonly rejected for identity and document uploads.");
  }

  // Use case rules
  if (useCase === "government" || useCase === "kyc") {
    if (source === "screenshot") {
      risks.push("Government/KYC portals often disallow screenshots due to security policies.");
      recommended = "camera";
    }
  }

  if (useCase === "social") {
    comparison.push("Both sources are acceptable, but screenshots lose text clarity faster during platform-side compression.");
  }

  if (useCase === "print") {
    if (source === "screenshot") {
      risks.push("Screenshots print poorly due to low effective pixel density and digital artifacts.");
      recommended = "camera";
    }
  }

  // Technical hints
  if (widthPx && heightPx && (widthPx < 800 || heightPx < 800)) {
    risks.push("Low resolution increases blur risk significantly regardless of the source.");
  }

  if (compressionLevel === "high") {
    risks.push("High compression detected or assumed, which reduces overall sharpness.");
  }

  if (containsText && source === "screenshot") {
    risks.push("Text-heavy screenshots are prone to 'muddy' artifacts after social media compression.");
  }

  return {
    "Recommended Source": recommended.toUpperCase(),
    "Quality Comparison": comparison,
    "Potential Risks": risks,
    "Fix / Action Plan":
      recommended === "camera"
        ? "Use a clear camera photo with good lighting and steady focus for maximum acceptance."
        : "If you must use screenshots, export at highest resolution and avoid re-sharing via messaging apps.",
    "Professional Note":
      "For official uploads, camera photos are generally safer than screenshots as they contain original EXIF metadata."
  };
}