export function pdfFontErrorDecoder({
  errorMessage,
  softwareSource
}: {
  errorMessage: string;
  softwareSource?: string;
}) {
  const low = errorMessage.toLowerCase();
  let diagnosis = "General Font Embedding Issue";
  let solution = "Re-save the PDF and check 'Embed All Fonts'.";

  if (low.includes("cidfonttype2")) {
    diagnosis = "TrueType Font Mapping Conflict";
    solution = "Convert text to outlines or use a 'Print to PDF' method to flatten fonts into graphics.";
  }

  if (low.includes("embedded subset")) {
    diagnosis = "Missing Glyph Data";
    solution = "The PDF only contains characters used in the original doc. To edit or view correctly, you must have the full font installed or embed the full set.";
  }

  if (low.includes("not found") || low.includes("missing")) {
    diagnosis = "System Font Mismatch";
    solution = "Ensure common fonts like Arial, Times New Roman, or Calibri are used, as portals often lack specialty fonts.";
  }

  return {
    "Error Diagnosis": diagnosis,
    "Why it Happened": "PDF structure points to a font that is neither embedded in the file nor available on the portal's viewer.",
    "Step-by-Step Fix": solution,
    "Pro Tip": "In MS Word/Acrobat, use 'PDF/A' compliance mode to force font embedding for all characters."
  };
}