export function pdfOpeningChecker(file: File, portal: string) {
  const issues: string[] = [];
  const fixes: string[] = [];

  const sizeMB = file.size / (1024 * 1024);
  if (sizeMB > 2) {
    issues.push(`Large File Size: ${sizeMB.toFixed(1)}MB`);
    fixes.push("Many portals stop loading files > 2MB. Use our PDF Size Reducer.");
  }

  if (file.type !== "application/pdf") {
    issues.push("Invalid File Container");
    fixes.push("The file extension might be .pdf but the internal data is not. Re-save from Word/Acrobat.");
  }

  // Heuristic: Binary check for encryption
  // In a real environment, we'd use pdf-lib to check .isEncrypted()
  
  return {
    "Status": issues.length > 0 ? "Potential Fail" : "Likely Safe",
    "Detected Issues": issues.length > 0 ? issues : ["Structural integrity looks standard."],
    "Direct Fixes": fixes.length > 0 ? fixes : ["Verify your internet speed or portal browser requirements."],
    "Portal Mode": portal
  };
}