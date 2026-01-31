
export async function process(input: { fpsMismatch: boolean, delayMs: number }) {
  return {
    syncIssue: input.fpsMismatch || Math.abs(input.delayMs) > 100,
    cause: input.fpsMismatch ? "Frame rate mismatch (23.976 vs 24/25 fps)" : "Fixed offset delay",
    solution: input.fpsMismatch ? "Resync using frame rate conversion" : `Apply ${input.delayMs * -1}ms shift`
  };
}
