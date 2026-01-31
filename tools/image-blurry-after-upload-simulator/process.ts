
export async function process(input: { resolution: number, compression: string }) {
  const isRisky = input.resolution < 1000 || input.compression === "high";
  return {
    blurProbability: isRisky ? "High" : "Low",
    reason: input.resolution < 1000 ? "Low source resolution" : "Aggressive platform compression",
    simulatedSharpness: isRisky ? "40%" : "95%"
  };
}
