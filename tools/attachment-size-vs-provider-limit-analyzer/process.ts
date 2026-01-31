
export async function process(input: { sizeMb: number, provider: string }) {
  const limits: Record<string, number> = { gmail: 25, outlook: 20, icloud: 20, proton: 25 };
  const limit = limits[input.provider.toLowerCase()] || 25;
  const passed = input.sizeMb <= limit;
  return {
    passed,
    limitMb: limit,
    remainingMb: passed ? limit - input.sizeMb : 0,
    recommendation: passed ? "Safe to attach" : "Use Google Drive or WeTransfer"
  };
}
