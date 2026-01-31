
export async function process(input: { bgColor: string, hasShadows: boolean }) {
  const rejected = input.bgColor !== "white" || input.hasShadows;
  return {
    rejected,
    reason: input.hasShadows ? "Background shadows detected" : (input.bgColor !== "white" ? "Non-white background" : "Clear background"),
    confidence: "92%"
  };
}
