export function sizeVsDpiConflictExplainer({
  fileSizeKB,
  dpi,
  widthPx,
  heightPx,
  targetKB,
  context = "government"
}: {
  fileSizeKB: number;
  dpi: number;
  widthPx?: number;
  heightPx?: number;
  targetKB?: number;
  context?: "government" | "print" | "online";
}) {
  const messages: string[] = [];
  let rootCause = "Unknown";

  if (dpi > 300 && fileSizeKB < 50) {
    rootCause = "DPI value is high but image resolution is low";
    messages.push("Changing DPI alone does not increase real image quality.");
  }

  if (targetKB && fileSizeKB > targetKB) {
    rootCause = "File size exceeds allowed limit";
    messages.push("Reducing DPI may help, but resizing dimensions is safer.");
  }

  if (widthPx && heightPx && dpi < 100) {
    messages.push("Low DPI with large dimensions often causes rejection in government forms.");
  }

  if (messages.length === 0) {
    messages.push("No critical conflict detected. File likely rejected due to other rules.");
  }

  return {
    conflictDetected: rootCause !== "Unknown",
    rootCause,
    explanation: messages,
    safeFix: "Adjust dimensions first, then fine-tune DPI. Avoid aggressive compression.",
    warning: context === "government" ? "Do not rely on DPI change alone for form uploads." : "For print, ensure both DPI and dimensions meet requirements."
  };
}