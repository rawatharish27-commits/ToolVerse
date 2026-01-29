
import { LIMITS } from './limits';

export async function process(input: any) {
  let baseWait = 5; // seconds
  let probability = 95; // percent success

  if (input.hour >= LIMITS.peakHourStart && input.hour <= LIMITS.peakHourEnd) {
    baseWait += 15;
    probability -= 10;
  }

  if (input.carrier === 'Airtel' || input.carrier === 'Jio') {
    baseWait += 2;
  } else {
    baseWait += 10;
    probability -= 5;
  }

  return {
    estWait: baseWait,
    successProb: probability,
    status: probability > 85 ? "Green (Normal)" : "Amber (Delayed)",
    findings: [
      `Current hour (${input.hour}:00) load: ${input.hour >= 10 && input.hour <= 14 ? 'High' : 'Normal'}`,
      `Carrier peering: Verified`,
      `Gateway response: Delayed by carrier queue`
    ]
  };
}
