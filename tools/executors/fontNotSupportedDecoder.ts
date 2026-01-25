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
        fix: "Re-export PDF using 'Embed All Fonts' or use 'PDF/A' compliance mode.",
        score: 10
      });
    }

    if (subsetFonts) {
      issues.push({
        reason: "Subset fonts (partial glyphs) detected. This can cause rendering failure on portal viewers.",
        fix: "Force full font embedding or convert the text layers to outlines/vector paths.",
        score: 8
      });
    }

    if (specialFonts) {
      issues.push({
        reason: "Decorative or custom fonts are likely not in the portal's whitelist.",
        fix: "Replace with standard web-safe fonts (Arial, Times New Roman) or flatten text to images.",
        score: 7
      });
    }

    if (unicodeFonts && portal !== "other") {
      issues.push({
        reason: "Unicode/Regional fonts require strict embedding for automated verification bots.",
        fix: "Ensure 'Unicode Encoding' is enabled during export or save as a high-res scan.",
        score: language !== "english" ? 9 : 6
      });
    }
  } else {
    return {
      "Verdict": "LIKELY COMPATIBLE",
      "Analysis": "Scanned PDFs use pixel data instead of font data, bypassing standard font support errors.",
      "Caveat": "Portal might still reject if the scan clarity is too low for their internal OCR."
    };
  }

  if (issues.length === 0) {
    return {
      "Verdict": "VERIFIED COMPATIBLE",
      "Diagnosis": "No font compatibility issues detected for this configuration.",
      "Accepted Profile": "Standard Fonts + Full Embedding + No Subsets"
    };
  }

  issues.sort((a, b) => b.score - a.score);

  return {
    "Verdict": "INCOMPATIBLE",
    "Primary Issue": issues[0].reason,
    "Required Fix": issues[0].fix,
    "Secondary Risks": issues.slice(1).map(i => i.reason),
    "Professional Recommendation": portal === "government" || portal === "bank" 
      ? "Use 'PDF/A-1b' archival format. This is the gold standard for portal acceptance."
      : "Standardize fonts and re-upload."
  };
}