
export async function process(input: { text: string }) {
  const triggers = ["win", "free", "money", "urgent", "cash", "winner", "account"];
  const found = triggers.filter(word => input.text.toLowerCase().includes(word));
  return {
    spamScore: Math.min(found.length * 20, 100),
    flaggedWords: found,
    verdict: found.length > 2 ? "High Risk" : "Safe"
  };
}
