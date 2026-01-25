type Portal = "government" | "job" | "bank" | "university" | "other";
type PdfType = "text" | "scanned" | "mixed";

type Issue = { reason: string; fix: string; score: number };

export function fontNotSupportedDecoder({
  portal,
  pdfType,
  fontsEmbedded,
  subsetFonts,
  specialFonts,
  unicodeFonts,
  language = "english"
}: {
  portal: Portal;
  pdfType: PdfType;
  fontsEmbedded?: boolean;
  subsetFonts?: boolean;
  specialFonts?: boolean;
  unicodeFonts?: boolean;
  language?: "english" | "hindi" | "other";
}) {
  const issues: Issue[] = [];

  if (pdfType !== "scanned") {
    if (fontsEmbedded === false) {
      issues.push({
        reason: "Primary fonts are not embedded in the PDF binary.",
        fix: "Re-export the PDF using 'Embed All Fonts' or 'PDF/A' compliance mode.",
        score: 10
      });
    }

    if (subsetFonts) {
      issues.push({
        reason: "Subset fonts (partial glyphs) used. This can cause rendering failure on portal viewers.",
        fix: "Use full embedding or convert the text layers to vector paths/shapes.",
        score: 8
      });
    }

    if (specialFonts) {
      issues.push({
        reason: "Decorative or custom fonts are not in the portal's whitelist.",
        fix: "Switch to standard web fonts (Arial, Georgia) or 'Flatten' the PDF to an image-based format.",
        score: 7
      });
    }

    if (unicodeFonts && portal !== "other") {
      issues.push({
        reason: "Unicode/Regional characters require strict embedding for automated OCR bots.",
        fix: "Ensure 'Unicode Encoding' is checked during export or re-save as a High-Res scan.",
        score: language !== "english" ? 9 : 6
      });
    }
  } else {
    return {
      "Verdict": "Likely Compatible",
      "Analysis": "Scanned PDFs use pixel data instead of font data, bypassing font-specific support errors.",
      "Portal Note": "Portal might still reject if the scan is not sharp enough for their OCR bots."
    };
  }

  if (issues.length === 0) {
    return {
      "Status": "Verified Compatible",
      "Diagnosis": "Font structure appears standard and should render correctly.",
      "Accepted Profile": "Standard Fonts + Full Embedding + No Subsets"
    };
  }

  issues.sort((a, b) => b.score - a.score);

  return {
    "Error Diagnosis": issues[0].reason,
    "portal Expectation": portal === "government" || portal === "bank" ? "Full embedding (PDF/A) is often mandatory." : "Standard font compatibility required.",
    "Required Fix": issues[0].fix,
    "Secondary Issues": issues.slice(1).map(i => i.reason),
    "Golden Rule": "When in doubt, re-save as 'PDF/A-1b' to force universal font rendering."
  };
}