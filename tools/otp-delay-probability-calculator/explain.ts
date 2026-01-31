
export function explain(output: any): string {
  const p = Math.round(output.probability * 100);
  if (p > 80) return "Connection path is optimal. Your OTP should arrive within 30 seconds.";
  if (p > 50) return "Moderate network congestion detected. Delay of up to 2 minutes is likely.";
  return "High carrier load identified. Your OTP request might time out; try using a different network if possible.";
}
