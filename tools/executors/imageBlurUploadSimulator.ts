type Platform = "government" | "social" | "website" | "messaging";
type Quality = "low" | "medium" | "high";

export function imageBlurUploadSimulator({
  platform,
  originalQuality = "medium",
  widthPx,
  heightPx
}: {
  platform: Platform;
  originalQuality?: Quality;
  widthPx?: number;
  heightPx?: number;
}) {
  const causes: Array<{ cause: string; impact: string; priority: number }> = [];
  const actions: string[] = [];
  const prevent: string[] = [];

  if (platform === "messaging" || platform === "social") {
    actions.push("Aggressive quantization (JPEG Quality < 50)");
    actions.push("Forced downscaling to 1080px width");
    causes.push({
      cause: "Destructive Platform Compression",
      impact: "Fine text and textures will become 'muddy' or blocky.",
      priority: 10
    });
  }

  if (platform === "government") {
    actions.push("Forced aspect-ratio stretching");
    actions.push("DPI meta-tag override");
    causes.push({
      cause: "Resizing Distortion",
      impact: "Portals often stretch photos to fit a fixed 200x230px box.",
      priority: 8
    });
  }

  if (widthPx && heightPx && (widthPx < 600 || heightPx < 600)) {
    causes.push({
      cause: "Low Source Resolution",
      impact: "Platform upscaling creates a 'soft' look even if file is large.",
      priority: 9
    });
  }

  prevent.push("Always upload at least 2000px resolution.");
  prevent.push("Use PNG for logos and text-heavy images.");
  prevent.push("Avoid sharing via standard WhatsApp (use 'Document' mode).");
  if (platform === "government") prevent.push("Use a precise 'Passport Maker' to avoid portal-side stretching.");

  return {
    primaryCause: causes.sort((a, b) => b.priority - a.priority)[0] || { cause: "Minor Optimization", impact: "No major blur expected." },
    platformActions: actions,
    prevention: prevent
  };
}