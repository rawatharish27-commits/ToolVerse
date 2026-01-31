
/**
 * OTP Delay Probability Kernel
 * Uses historical delay weights for major carriers and network signal modifiers.
 */
export async function process(input: { carrier: string; signal: number; timeElapsed?: number }) {
  const carrier = String(input.carrier).toLowerCase();
  
  // Base weights based on carrier infrastructure
  let baseProb = 0.95;
  if (carrier.includes('govt') || carrier.includes('bsnl')) baseProb = 0.65;
  if (carrier.includes('international')) baseProb = 0.75;
  
  // Signal strength penalty (1 to 5)
  const signalPenalty = (5 - input.signal) * 0.12;
  
  // Time elapsed modifier (re-requesting often fails if done too soon)
  const timeMod = input.timeElapsed && input.timeElapsed < 60 ? -0.2 : 0;

  const finalProbability = Math.max(0.05, Math.min(0.99, baseProb - signalPenalty + timeMod));

  return {
    probability: Number(finalProbability.toFixed(2)),
    carrierStatus: finalProbability > 0.8 ? "Stable" : finalProbability > 0.5 ? "Congested" : "Critical Delay",
    logicTimestamp: Date.now()
  };
}
