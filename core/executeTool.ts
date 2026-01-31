
/**
 * TOOLVERSE CORE ENGINE v1.1
 * Simplified Phase 2 Execution Model
 */
// Fix: Added generic types and updated return structure to include success, data, error, and timing
export async function executeTool<I = any, O = any>({
  input,
  validate,
  normalize,
  process,
  verify,
  explain,
  options
}: {
  input: I;
  validate?: (input: I) => { valid: boolean; error?: string };
  normalize?: (input: I) => I;
  process: (input: I, options?: any) => Promise<O>;
  verify?: (output: O) => { secure: boolean; error?: string };
  explain?: (output: O) => string;
  options?: any;
}) {
  const startTime = performance.now();
  try {
    // 1. Validate
    if (validate) {
      const v = validate(input);
      if (v && v.valid === false) throw new Error(v.error || "Validation failed");
    }

    // 2. Normalize
    const norm = normalize ? normalize(input) : input;

    // 3. Process
    const output = await process(norm, options);

    // 4. Verify
    if (verify) {
      const v = verify(output);
      if (v && v.secure === false) throw new Error(v.error || "Verification failed");
    }

    // 5. Explain & Return
    return {
      success: true,
      data: output,
      explanation: explain ? explain(output) : "Logic executed successfully in browser-native memory.",
      timing: performance.now() - startTime
    };
  } catch (e: any) {
    return {
      success: false,
      error: e.message || "Logic Isolate Error",
      timing: performance.now() - startTime
    };
  }
}
