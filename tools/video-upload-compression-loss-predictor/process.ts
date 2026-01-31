
export async function process(input: { bitrateMbps: number, platform: string }) {
  let lossFactor = 0.3;
  if (input.platform === "whatsapp") lossFactor = 0.8;
  if (input.platform === "instagram") lossFactor = 0.6;
  if (input.platform === "youtube") lossFactor = 0.2;

  const qualityRetention = Math.max(0.1, 1 - (lossFactor * (10 / input.bitrateMbps)));
  return {
    qualityScore: Math.round(qualityRetention * 100),
    expectedArtifacts: qualityRetention < 0.6 ? "High" : "Low",
    verdict: qualityRetention < 0.5 ? "Significant degradation likely" : "Minor quality loss"
  };
}
