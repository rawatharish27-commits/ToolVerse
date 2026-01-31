
export async function process(input: { platform: string }) {
  const rules: Record<string, any> = {
    reels: { maxMb: 50, aspect: "9:16", maxDuration: 90 },
    shorts: { maxMb: 100, aspect: "9:16", maxDuration: 60 },
    tiktok: { maxMb: 287, aspect: "9:16", maxDuration: 600 }
  };
  return rules[input.platform.toLowerCase()] || { error: "Platform rules not found" };
}
