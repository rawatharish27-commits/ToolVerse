
export async function process(input: { lossPercent: number }) {
  return {
    voiceQuality: input.lossPercent > 5 ? "Choppy" : "Clear",
    videoQuality: input.lossPercent > 2 ? "Buffering" : "Smooth",
    gamingPing: input.lossPercent > 1 ? "Rubber-banding" : "Stable"
  };
}
