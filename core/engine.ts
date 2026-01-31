
import { ValidationResult, VerificationResult } from '../types';

export interface ExecutionResult<O> {
  success: boolean;
  data?: O;
  error?: string;
  explanation?: string;
  timing: number;
}

export interface ToolPipeline<I, O> {
  validate: (input: I) => ValidationResult;
  normalize: (input: I) => I;
  process: (input: I, options?: any) => Promise<O>;
  verify: (output: O) => VerificationResult;
  explain: (output: O) => string;
}

/**
 * Global Tool Orchestrator
 * Executes stateless logic nodes with integrity checks.
 */
export async function executeLogic<I, O>(
  input: I,
  pipeline: ToolPipeline<I, O>,
  options?: any
): Promise<ExecutionResult<O>> {
  const startTime = performance.now();
  try {
    // 1. Schema Validation
    const val = pipeline.validate(input);
    if (!val.valid) throw new Error(val.error || "Input rejected by validation layer.");

    // 2. Data Normalization
    const normalized = pipeline.normalize(input);

    // 3. Execution (Logic Node)
    const output = await pipeline.process(normalized, options);

    // 4. Integrity Verification
    const ver = pipeline.verify(output);
    if (!ver.secure) throw new Error(ver.error || "Result failed post-computation audit.");

    return {
      success: true,
      data: output,
      explanation: pipeline.explain(output),
      timing: performance.now() - startTime
    };
  } catch (err: any) {
    console.error("[LogicEngine Error]:", err.message);
    return {
      success: false,
      error: err.message || "Logic Isolate Fault",
      timing: performance.now() - startTime
    };
  }
}
