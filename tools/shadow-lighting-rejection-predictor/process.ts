
export async function process(input: { shadowIntensity: number }) {
  const rejected = input.shadowIntensity > 20;
  return {
    rejected,
    intensityScore: input.shadowIntensity,
    verdict: rejected ? "Harsh shadows will trigger rejection" : "Lighting is uniform"
  };
}
