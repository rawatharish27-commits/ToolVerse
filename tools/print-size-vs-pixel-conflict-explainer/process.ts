
export async function process(input: { widthPx: number, heightPx: number, printInches: number }) {
  const effectiveDpi = input.widthPx / input.printInches;
  return {
    effectiveDpi: Math.round(effectiveDpi),
    quality: effectiveDpi < 150 ? "Poor" : (effectiveDpi < 300 ? "Medium" : "Professional"),
    willLookPixelated: effectiveDpi < 200
  };
}
