type Context = "government" | "web" | "social" | "print";
type Container = "fixed" | "responsive";

function ratio(w: number, h: number) {
  return Number((w / h).toFixed(4));
}

export function imageStretchingIssuePredictor({
  originalWidth,
  originalHeight,
  targetWidth,
  targetHeight,
  context = "web",
  containerType = "fixed"
}: {
  originalWidth: number;
  originalHeight: number;
  targetWidth: number;
  targetHeight: number;
  context?: Context;
  containerType?: Container;
}) {
  const originalRatio = ratio(originalWidth, originalHeight);
  const targetRatio = ratio(targetWidth, targetHeight);

  let risk: "Low" | "Medium" | "High" = "Low";
  let cause = "Aspect ratios are compatible.";
  let recommendation = "Resize proportionally while keeping aspect ratio.";
  const warnings: string[] = [];

  if (originalRatio !== targetRatio) {
    risk = "High";
    cause = "Original and target aspect ratios are different, causing distortion if forced.";
    recommendation = "Use fit or crop strategy instead of stretching to exact size.";
  }

  if (containerType === "responsive" && context === "web") {
    warnings.push("Responsive containers may stretch images if width/height are forced.");
    if (risk === "Low") risk = "Medium";
  }

  if (targetWidth < 400 || targetHeight < 400) {
    warnings.push("Very small target size may cause blur after resizing.");
  }

  if (context === "government") {
    warnings.push("Government portals often force exact dimensions without preserving ratio.");
  }

  return {
    "Stretch Risk Level": risk,
    "Original Ratio": originalRatio,
    "Target Ratio": targetRatio,
    "Distortion Cause": cause,
    "Safe Strategy": recommendation,
    "Critical Warnings": warnings
  };
}