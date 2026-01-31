
export async function process(input: { lighting: number, occlusion: boolean }) {
  const undetectable = input.lighting < 30 || input.occlusion;
  return {
    undetectable,
    cause: input.occlusion ? "Face covered by hair/glasses" : (input.lighting < 30 ? "Insufficient lighting" : "Face clearly visible"),
    fix: "Ensure face is fully visible with even lighting"
  };
}
