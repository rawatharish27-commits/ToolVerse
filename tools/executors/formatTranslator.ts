export function formatTranslator({
  claimedExtension,
  actualFormatHint,
  errorMessage
}: {
  claimedExtension: string;
  actualFormatHint?: string;
  errorMessage?: string;
}) {
  let diagnosis = "Hidden MIME-type mismatch.";
  let fix = "Re-save the file using a standard editor (like MS Paint or Preview) instead of just renaming the extension.";

  if (claimedExtension.toLowerCase() === "jpg" && actualFormatHint === "jfif") {
    diagnosis = "Your file is a JFIF (web format) incorrectly named as JPG. Some portals reject this.";
    fix = "Open the file in a browser, 'Save As' and choose 'JPEG' explicitly.";
  }

  if (errorMessage?.toLowerCase().includes("magic number")) {
    diagnosis = "File header corruption. The 'binary signature' of the file doesn't match its name.";
    fix = "Your file might be a PDF renamed to .jpg. Convert it properly.";
  }

  return {
    diagnosis,
    fix,
    techNote: "Portals check the first few bytes of a file (Magic Numbers) to verify its true nature."
  };
}