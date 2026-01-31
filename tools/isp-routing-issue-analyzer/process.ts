
export async function process(input: { hopCount: number, packetLoss: number }) {
  return {
    routingHealth: input.hopCount > 15 ? "Inefficient" : "Direct",
    bottleneckDetected: input.packetLoss > 2,
    recommendation: input.packetLoss > 5 ? "Switch to alternative DNS or VPN" : "Routing OK"
  };
}
