
export async function process(input: { expectedSize: number, actualSize: number }) {
  const corrupted = input.expectedSize !== input.actualSize;
  return {
    corrupted,
    integrityScore: corrupted ? "Failed" : "100%",
    reason: corrupted ? "Byte mismatch (Interrupted download)" : "No data loss"
  };
}
