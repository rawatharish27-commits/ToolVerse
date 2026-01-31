
export async function process(input: { qualityValue: number }) {
  const rejected = input.qualityValue < 60;
  return {
    rejected,
    ocrReadability: input.qualityValue < 40 ? "Unreadable" : "Readable",
    recommendation: rejected ? "Increase quality to at least 80%" : "Compression level safe"
  };
}
