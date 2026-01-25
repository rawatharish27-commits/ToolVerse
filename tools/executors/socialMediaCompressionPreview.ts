type Platform =
  | "instagram"
  | "facebook"
  | "whatsapp"
  | "twitter"
  | "linkedin";

type ImageType = "photo" | "text" | "logo";

export function socialMediaCompressionPreview({
  platform,
  imageType = "photo",
  widthPx,
  heightPx,
  fileSizeKB
}: {
  platform: Platform;
  imageType?: ImageType;
  widthPx?: number;
  heightPx?: number;
  fileSizeKB?: number;
}) {
  let compression: "Low" | "Medium" | "High" = "Medium";
  const actions: string[] = [];
  const tips: string[] = [];
  const warnings: string[] = [];

  // Platform behavior
  if (platform === "whatsapp") compression = "High";
  if (platform === "instagram") compression = "Medium";
  if (platform === "facebook") compression = "Medium";
  if (platform === "twitter") compression = "Low";
  if (platform === "linkedin") compression = "Low";

  actions.push("Resizes image to platform-specific max dimensions.");
  actions.push("Applies JPEG compression.");
  actions.push("Strips metadata.");

  // Image type sensitivity
  if (imageType === "text") {
    warnings.push("Text-heavy images are more affected by compression.");
    tips.push("Upload at higher resolution to preserve text clarity.");
  }

  if (imageType === "logo") {
    tips.push("Use PNG if platform allows; avoid transparency flattening.");
  }

  // Size-based risks
  if (widthPx && heightPx && (widthPx < 800 || heightPx < 800)) {
    warnings.push("Low resolution image may be upscaled and appear blurry.");
  }

  if (fileSizeKB && fileSizeKB > 5000) {
    warnings.push("Very large files will be aggressively downscaled.");
  }

  // Best practices
  tips.push("Export images at 80–90% quality.");
  tips.push("Avoid uploading screenshots of screenshots.");

  return {
    "Expected Compression": compression,
    "Platform Operations": actions,
    "Potential Risks": warnings,
    "Optimization Tips": tips,
    "Technical Note": "Exact compression varies by device and platform updates, but patterns remain consistent."
  };
}