type Symptom = "blur" | "grain" | "dull" | "pixelated";
type Source = "camera" | "screenshot";
type UseCase = "government" | "kyc" | "social" | "print" | "general";

type Cause = {
  cause: string;
  fix: string;
  avoid: string;
  score: number;
};

export function photoClarityAnalyzer({
  symptom,
  source,
  useCase,
  widthPx,
  heightPx,
  lighting,
  compressionLevel = "medium",
  motionBlur,
  focusMissed
}: {
  symptom: Symptom;
  source: Source;
  useCase: UseCase;
  widthPx?: number;
  heightPx?: number;
  lighting?: "poor" | "average" | "good";
  compressionLevel?: "low" | "medium" | "high";
  motionBlur?: boolean;
  focusMissed?: boolean;
}) {
  const causes: Cause[] = [];

  // Symptom-based causes
  if (symptom === "blur") {
    causes.push({
      cause: "Camera shake or missed optical focus",
      fix: "Hold device steady with both hands and tap the screen to lock focus before capture.",
      avoid: "Capturing images while moving or walking.",
      score: motionBlur || focusMissed ? 10 : 7
    });
  }

  if (symptom === "grain") {
    causes.push({
      cause: "Sensor noise due to poor lighting",
      fix: "Capture in natural daylight or increase artificial lighting; reduce ISO settings.",
      avoid: "Dimly lit environments or aggressive software sharpening.",
      score: lighting === "poor" ? 9 : 6
    });
  }

  if (symptom === "dull") {
    causes.push({
      cause: "Low contrast or heavy digital compression",
      fix: "Increase light source and export image at higher quality (85%+).",
      avoid: "Repeated saving or sharing via non-document messaging.",
      score: compressionLevel === "high" ? 8 : 6
    });
  }

  if (symptom === "pixelated") {
    causes.push({
      cause: "Insufficient resolution for the target size",
      fix: "Re-capture the subject at a higher resolution (at least 2000px).",
      avoid: "Upscaling small original images or taking screenshots of small previews.",
      score: widthPx && heightPx && (widthPx < 800 || heightPx < 800) ? 9 : 7
    });
  }

  // Source & use-case rules
  if (source === "screenshot") {
    causes.push({
      cause: "Platform-level screenshot scaling artifacts",
      fix: "Use the original image file or a fresh camera photo instead of a screen capture.",
      avoid: "Uploading screenshots for official verification.",
      score: useCase === "government" || useCase === "kyc" ? 9 : 6
    });
  }

  // Rank causes
  causes.sort((a, b) => b.score - a.score);

  if (causes.length === 0) {
    return {
      "Root Cause": "No major clarity issue detected based on parameters.",
      "Primary Fix": "Ensure adequate resolution and minimal compression.",
      "What to Avoid": "Unnecessary re-exports through editing apps.",
      "Technical Note": "Minor softness is normal in most mobile captures."
    };
  }

  return {
    "Primary Root Cause": causes[0].cause,
    "Recommended Fix": causes[0].fix,
    "Action to Avoid": causes[0].avoid,
    "Secondary Factors": causes.slice(1).map(c => c.cause),
    "Application Tip":
      useCase === "government" || useCase === "kyc"
        ? "Official portals use automated clarity checks. High sharpness is mandatory."
        : "For social platforms, minor grain is often hidden by filters."
  };
}