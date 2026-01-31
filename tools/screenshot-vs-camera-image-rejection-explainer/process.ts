
export async function process(input: { isScreenshot: boolean }) {
  return {
    rejectionRisk: input.isScreenshot ? "High" : "Low",
    reason: input.isScreenshot ? "Missing EXIF metadata and low DPI" : "Contains valid camera metadata",
    fix: input.isScreenshot ? "Use a physical camera photo" : "No action needed"
  };
}
