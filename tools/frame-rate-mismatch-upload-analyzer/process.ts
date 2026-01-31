
export async function process(input: { sourceFps: number, targetFps: number }) {
  const mismatch = input.sourceFps !== input.targetFps;
  return {
    mismatchDetected: mismatch,
    judderRisk: mismatch && (input.sourceFps % input.targetFps !== 0),
    recommendation: mismatch ? "Use motion interpolation or frame sampling" : "Native sync preserved"
  };
}
