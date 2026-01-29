
export function verify(output: { blob: Blob, finalSize: number }) {
  if (output.finalSize === 0) return { valid: false, error: "Zero-byte binary generated." };
  return { valid: true };
}
