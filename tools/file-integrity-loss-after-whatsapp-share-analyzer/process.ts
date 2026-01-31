
export async function process(input: { originalSize: number, sharedSize: number }) {
  const lossPercent = ((input.originalSize - input.sharedSize) / input.originalSize) * 100;
  return {
    lossPercent: lossPercent.toFixed(1) + "%",
    strippedMetadata: true,
    recommendation: lossPercent > 50 ? "Use 'Document' mode to share" : "Minimal impact"
  };
}
