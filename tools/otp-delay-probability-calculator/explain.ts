
export function explain(output: { probability: number; carrierStatus: string }): string {
  const p = Math.round(output.probability * 100);
  let advice = "The network path is clear. Proceed with the request.";
  
  if (p < 50) advice = "High congestion detected. Carriers are likely queuing SMS packets. Switch to mobile data or try again after 10 PM IST.";
  else if (p < 80) advice = "Moderate delay expected. Do not click 'Resend' for at least 2 minutes to prevent session lockout.";

  return `Logic Resolved: ${p}% Probability. Status: ${output.carrierStatus}. Recommendation: ${advice}`;
}
