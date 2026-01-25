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

  // OCR Logic
  if (ocrApplied) {
    causes.push({
      reason: "OCR layer added",
      explanation: "OCR adds a searchable text layer and font data, increasing the internal complexity and file size.",
      fix: "Use OCR only if text search or selection is strictly required; otherwise, keep the original scanned PDF.",
      score: 9
    });
  }

  // Print to PDF Logic
  if (compressionMethod === "print-to-pdf") {
    causes.push({
      reason: "Print-to-PDF embeds all elements",
      explanation: "Printing re-renders the entire document, often embedding images at higher uncompressed states and re-embedding all font sets.",
      fix: "Use an 'Export' or 'Save As Optimized PDF' function instead of the virtual printer route.",
      score: 8
    });
  }

  // Font embedding Logic
  if (fontsEmbedded) {
    causes.push({
      reason: "Full fonts embedded during save",
      explanation: "Embedding complete font sets ensures compatibility but adds significant 'meta' weight to the file.",
      fix: "Embed 'Subsets' only or use standard system fonts (Arial, Times New Roman) when possible.",
      score: 7
    });
  }

  // Image re-encoding Logic
  if (imagesReencoded && pdfType !== "text") {
    causes.push({
      reason: "Images re-encoded with higher fidelity",
      explanation: "The optimization tool may have used a higher JPEG quality setting than the original file, causing binary inflation.",
      fix: "Manually lower the image quality setting (DPI/Quality) or downscale dimensions before PDF creation.",
      score: 8
    });
  }

  // Color conversion Logic
  if (colorConverted) {
    causes.push({
      reason: "Color space conversion overhead",
      explanation: "Converting from RGB to CMYK or adjusting color profiles can expand pixel data instead of reducing it.",
      fix: "Keep the original color space unless grayscale is specifically required by the portal.",
      score: 6
    });
  }

  if (causes.length === 0) {
    return {
      "Explanation": "PDF compression changed internal binary structure, causing overhead that outweighs the data savings.",
      "Primary Suggestion": "Try using a multi-pass optimizer or targeted image reduction tools."
    };
  }

  causes.sort((a, b) => b.score - a.score);

  return {
    "Status": "Inflation Detected",
    "Primary Cause": causes[0].reason,
    "Why it Happened": causes[0].explanation,
    "Actionable Fix": causes[0].fix,
    "Secondary Factors": causes.slice(1).map(c => c.reason),
    "One-Line Takeaway": "Compression must match content; choosing the wrong method (like Print-to-PDF) often backfires."
  };
}