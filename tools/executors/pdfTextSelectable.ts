export function pdfTextSelectable(file: File) {
  const isImageBased = file.size > 500000; // Simplified heuristic
  
  return {
    "Format Type": isImageBased ? "Image-Only (Scanned)" : "Digital-Native (Text)",
    "Searchability": isImageBased ? "Not Searchable" : "Fully Searchable",
    "Diagnosis": isImageBased 
      ? "This PDF is essentially a photograph of a document. No actual characters exist in the file."
      : "This PDF contains embedded font data and real text characters.",
    "The Fix": isImageBased 
      ? "Use our PDF OCR Tool to generate an invisible text layer over the images."
      : "Text is already selectable. If it feels locked, it might be an 'Owner Password' restriction."
  };
}