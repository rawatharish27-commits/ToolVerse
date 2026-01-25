type PdfType = "scanned" | "text" | "mixed";
type Method = "online-tool" | "print-to-pdf" | "save-as" | "ocr";

type Cause = {
  reason: string;
  explanation: string;
  fix: string;
  score: number;
};

export function pdfSizeIncreaseExplainer({
  pdfType,
  compressionMethod,
  beforeSizeKB,
  afterSizeKB,
  imagesReencoded,
  fontsEmbedded,
  colorConverted,
  ocrApplied
}: {
  pdfType: PdfType;
  compressionMethod?: Method;
  beforeSizeKB?: number;
  afterSizeKB?: number;
  imagesReencoded?: boolean;
  fontsEmbedded?: boolean;
  colorConverted?: boolean;
  ocrApplied?: boolean;
}) {
  const causes: Cause[] = [];

  // OCR
  if (ocrApplied) {
    causes.push({
      reason: "OCR layer added",
      explanation:
        "OCR adds a searchable text layer and font data, increasing the internal binary complexity and file size.",
      fix:
        "Use OCR only if text search is required; otherwise keep the original scanned PDF.",
      score: 9
    });
  }

  // Print to PDF
  if (compressionMethod === "print-to-pdf") {
    causes.push({
      reason: "Print-to-PDF embeds all elements",
      explanation:
        "Printing re-renders pages and often embeds images and fonts fully rather than using compressed references.",
      fix:
        "Use optimized save/export features instead of print-to-PDF virtual printers.",
      score: 8
    });
  }

  // Font embedding
  if (fontsEmbedded) {
    causes.push({
      reason: "Full fonts embedded during save",
      explanation:
        "Embedding full font sets ensures compatibility across devices but adds significant KB/MB to the total file size.",
      fix:
        "Check 'Subset fonts' or 'Only embed characters used' in your PDF software settings.",
      score: 7
    });
  }

  // Image re-encoding
  if (imagesReencoded && pdfType !== "text") {
    causes.push({
      reason: "Images re-encoded at higher quality",
      explanation:
        "The compression tool used may have re-encoded existing images with less aggressive settings than the original.",
      fix:
        "Manually lower image quality/DPI or downscale resolution before saving.",
      score: 8
    });
  }

  // Color conversion
  if (colorConverted) {
    causes.push({
      reason: "Color space conversion increased data",
      explanation:
        "Some conversions (e.g., from Index color to RGB) expand pixel data, making the file heavier.",
      fix:
        "Maintain the original color space unless a specific conversion is required.",
      score: 6
    });
  }

  if (causes.length === 0) {
    return {
      "Explanation": "PDF compression changed the internal structure, adding overhead that outweighed data savings.",
      "Primary Suggestion": "Use targeted optimization based on content (e.g., downscale images for scanned docs)."
    };
  }

  causes.sort((a, b) => b.score - a.score);

  return {
    "Status": "Inflation Detected",
    "Primary Cause": causes[0].reason,
    "Why it Happened": causes[0].explanation,
    "Correct Fix": causes[0].fix,
    "Secondary Factors": causes.slice(1).map(c => c.reason),
    "One-Line Takeaway": "Compression must match PDF content; wrong method (like Print-to-PDF) often increases size."
  };
}