
export async function process(input: { connectionRefused: boolean, timedOut: boolean }) {
  return {
    firewallLikely: input.connectionRefused,
    stealthMode: input.timedOut && !input.connectionRefused,
    advice: input.connectionRefused ? "Port is explicitly closed" : "Packets are being dropped silently"
  };
}
