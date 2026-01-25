type UseCase = "government" | "kyc" | "job" | "social";
type Background =
  | "plain-white"
  | "off-white"
  | "colored"
  | "textured"
  | "outdoor";

type Risk = {
  reason: string;
  fix: string;
  score: number;
};

export function backgroundRejectionPredictor({
  useCase,
  backgroundType,
  shadowsPresent,
  colorCast = "none",
  wrinklesOrNoise,
  edgesContrast = "medium"
}: {
  useCase: UseCase;
  backgroundType: Background;
  shadowsPresent?: boolean;
  colorCast?: "none" | "warm" | "cool";
  wrinklesOrNoise?: boolean;
  edgesContrast?: "low" | "medium" | "high";
}) {
  const risks: Risk[] = [];

  // Base background rules
  if (backgroundType !== "plain-white") {
    risks.push({
      reason: "Background is not plain white",
      fix: "Use a clean white wall or white sheet as background",
      score: useCase === "social" ? 3 : 8
    });
  }

  // Shadows
  if (shadowsPresent) {
    risks.push({
      reason: "Shadows present on background",
      fix: "Use even lighting from front; avoid side light",
      score: 9
    });
  }

  // Color cast
  if (colorCast !== "none") {
    risks.push({
      reason: "Color cast detected on background",
      fix: "Use neutral lighting; avoid colored bulbs",
      score: 7
    });
  }

  // Texture / wrinkles
  if (wrinklesOrNoise) {
    risks.push({
      reason: "Textured or wrinkled background",
      fix: "Use smooth, flat background surface",
      score: 8
    });
  }

  // Edge contrast
  if (edgesContrast === "low") {
    risks.push({
      reason: "Poor separation between subject and background",
      fix: "Increase distance from background and improve lighting",
      score: 6
    });
  }

  if (risks.length === 0) {
    return {
      "Risk Level": "LOW",
      "Assessment": "Background is likely acceptable for this use-case.",
      "Gold Standard": "Plain white background with even lighting"
    };
  }

  const totalScore = risks.reduce((s, r) => s + r.score, 0);
  let riskLevel: "Low" | "Medium" | "High" = "Low";
  if (totalScore >= 15) riskLevel = "High";
  else if (totalScore >= 8) riskLevel = "Medium";

  risks.sort((a, b) => b.score - a.score);

  return {
    "Risk Level": riskLevel.toUpperCase(),
    "Primary Issue": risks[0].reason,
    "Required Fix": risks[0].fix,
    "Secondary Risks": risks.slice(1).map(r => r.reason),
    "Usage Note":
      useCase === "social"
        ? "Social platforms are more tolerant of backgrounds."
        : "Government/KYC uploads require strict plain backgrounds."
  };
}