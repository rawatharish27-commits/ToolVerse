type Portal = "government" | "job" | "bank" | "university" | "other";
type ScanQuality = "low" | "medium" | "high";

type Issue = {
  reason: string;
  fix: string;
  score: number;
};

export function scannedPdfReadabilityTester({
  portal,
  scanQuality,
  dpi,
  contrast = "medium",
  blurPresent,
  fileSizeKB
}: {
  portal: Portal;
  scanQuality: ScanQuality;
  dpi?: number;
  contrast?: "low" | "medium" | "high";
  blurPresent?: boolean;
  fileSizeKB?: number;
}) {
  const issues: Issue[] = [];
  let score = 0;

  if (scanQuality === "low") {
    issues.push({
      reason: "Low baseline scan quality detected.",
      fix: "Re-scan document using a flatbed scanner or a dedicated scanning app.",
      score: 9
    });
    score += 4;
  }

  if (dpi && dpi < 200) {
    issues.push({
      reason: "Low DPI (<200) making text look pixelated.",
      fix: "Re-scan at 300 DPI (the global standard for OCR-ready documents).",
      score: 8
    });
    score += 3;
  }

  if (contrast === "low") {
    issues.push({
      reason: "Low contrast between text and background paper.",
      fix: "Increase 'Black Point' or 'Contrast' in scanner settings to make text pop.",
      score: 8
    });
    score += 3;
  }

  if (blurPresent) {
    issues.push({
      reason: "Significant blur detected (Camera shake or dirty scanner glass).",
      fix: "Clean scanner glass and ensure the document is perfectly flat.",
      score: 9
    });
    score += 4;
  }

  if (fileSizeKB && fileSizeKB > 8000) {
    issues.push({
      reason: "Extreme file size for a scan; portal may time-out.",
      fix: "Convert scan to Grayscale and use medium JPEG compression inside the PDF.",
      score: 6
    });
    score += 2;
  }

  let verdict: "Readable" | "Risky" | "Unreadable" = "Readable";
  if (score >= 8) verdict = "Unreadable";
  else if (score >= 4) verdict = "Risky";

  if (issues.length === 0) {
    return {
      "Readability Verdict": verdict.toUpperCase(),
      "Status": "Document appears sharp and portal-safe.",
      "Gold Standard Scan": "300 DPI, High Contrast, No Blur, PDF 1.4"
    };
  }

  issues.sort((a, b) => b.score - a.score);

  return {
    "Readability Verdict": verdict.toUpperCase(),
    "Primary Rejection Risk": issues[0].reason,
    "Recommended Action": issues[0].fix,
    "Secondary Factors": issues.slice(1).map(i => i.reason),
    "Application Tip": portal === "government" || portal === "bank" 
      ? "Official portals use automated bots for OCR. High sharpness is a hard requirement."
      : "Minor softness might be okay for manual human review."
  };
}