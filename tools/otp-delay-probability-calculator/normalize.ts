
export function normalize(input: any) {
  return {
    carrier: String(input.carrier).trim(),
    signal: Math.floor(Number(input.signal)) || 3,
    timeElapsed: Number(input.timeElapsed) || 0
  };
}
