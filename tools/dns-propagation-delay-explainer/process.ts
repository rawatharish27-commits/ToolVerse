
export async function process(input: { ttl: number, region: string }) {
  const baseHrs = input.ttl / 3600;
  return {
    estTimeHours: baseHrs,
    globalSync: baseHrs > 24 ? "Slow" : "Fast",
    advice: "Check status using global DNS checkers for major nodes (US, EU, ASIA)."
  };
}
