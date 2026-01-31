
export function normalize(input: any) {
  return {
    carrier: String(input.carrier).toLowerCase(),
    signal: Number(input.signal),
    timestamp: Date.now()
  };
}
