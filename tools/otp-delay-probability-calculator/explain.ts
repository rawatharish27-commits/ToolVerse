
export function explain(output: any): string {
  return `Your estimated wait is ${output.estWait}s with a ${output.successProb}% arrival probability. Rejection is rarely a website error; it is usually carrier-level DND filtering or gateway queueing during peak hours. Recommendation: Do not click 'Resend' for at least 60s.`;
}
