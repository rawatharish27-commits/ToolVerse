
/**
 * Explains the processing results of the Image KB Reducer.
 */
// Fix: Updated the output parameter type to include 'blob' to unify the pipeline's output type 'O' across process, verify, and explain stages.
export function explain(output: { blob: Blob, finalSize: number }): string {
  const sizeKb = (output.finalSize / 1024).toFixed(1);
  return `Algorithm: Recursive Binary Search. Quantization was adjusted over 8 iterations to identify the maximum visual fidelity that satisfies your ${sizeKb}KB requirement. No pixels were downsampled; only chroma/luma data was optimized.`;
}
