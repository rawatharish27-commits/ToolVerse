
export async function process(input: { pingMs: number, serviceType: string }) {
  const timeoutMap: Record<string, number> = { standard: 3000, govt: 5000, streaming: 1000 };
  const threshold = timeoutMap[input.serviceType.toLowerCase()] || 2000;
  
  return {
    timeoutLikely: input.pingMs > (threshold * 0.8),
    jitterRisk: input.pingMs > 200 ? "High" : "Low",
    verdict: input.pingMs > 500 ? "Critical Latency" : "Stable Connection"
  };
}
