type FileType = "photo" | "pdf" | "doc" | "other";

export function wrongFormatErrorTranslator({
  errorMessage,
  fileType,
  extension
}: {
  errorMessage: string;
  fileType: FileType;
  extension?: string;
}) {
  const lowError = errorMessage.toLowerCase();
  const findings: string[] = [];
  const fix: string[] = [];

  if (lowError.includes("mime") || lowError.includes("magic")) {
    findings.push("Binary Header Mismatch: You likely renamed the file extension manually.");
    fix.push("Open the original file in a proper editor and use 'Save As' to choose the format.");
  }

  if (extension && extension.toLowerCase() === ".jpg" && lowError.includes("format")) {
    findings.push("JFIF Issue: Your file is a JFIF/Web format named as JPG.");
    fix.push("Convert to standard baseline JPEG using a converter.");
  }

  if (fileType === "pdf" && lowError.includes("version")) {
    findings.push("Version Incompatibility: Portal requires PDF 1.4 but yours is newer.");
    fix.push("Print to PDF or use a 'Linearize PDF' tool to standardize.");
  }

  if (findings.length === 0) {
    findings.push("Generic Strict Validation: The file structure is technically valid but the portal validator is overly sensitive.");
    fix.push("Take a screenshot of the document/photo and save it as a fresh .jpg to reset headers.");
  }

  return {
    "Hidden Diagnosis": findings,
    "Direct Fix": fix,
    "Technical Fact": "Portals check 'Magic Numbers' inside the file, not just the name.",
    "Compatibility Score": "Medium - Requires Re-export"
  };
}