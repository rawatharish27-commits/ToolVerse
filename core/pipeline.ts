
export interface ValidationResult { valid: boolean; error?: string; }
export interface VerificationResult { secure: boolean; error?: string; }

// Fix: Added ExecutionResult interface to satisfy UI component requirements
export interface ExecutionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  explanation?: string;
  latency?: number;
  timing?: number;
  stage?: string;
}

export interface ToolPipeline<I, O> {
  validate: (input: I) => ValidationResult;
  normalize: (input: I) => I;
  process: (input: I, options?: any) => Promise<O>;
  verify: (output: O) => VerificationResult;
  explain: (output: O) => string;
}

export class PipelineRunner {
  // Fix: Explicitly typed the return value of run to ExecutionResult<O> to ensure consistency across the application
  static async run<I, O>(
    slug: string,
    pipeline: ToolPipeline<I, O>,
    input: I,
    options?: any
  ): Promise<ExecutionResult<O>> {
    const startTime = performance.now();
    try {
      // 1. Fast Validation
      const val = pipeline.validate(input);
      if (!val.valid) throw new Error(`[Validation Failure]: ${val.error}`);

      // 2. Input Normalization
      const normalizedInput = pipeline.normalize(input);

      // 3. Core Processing
      const output = await pipeline.process(normalizedInput, options);

      // 4. Output Verification
      const ver = pipeline.verify(output);
      if (!ver.secure) throw new Error(`[Integrity Fault]: ${ver.error}`);

      // 5. Success
      const endTime = performance.now();
      return {
        success: true,
        data: output,
        explanation: pipeline.explain(output),
        latency: endTime - startTime,
        timing: endTime - startTime
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.message,
        stage: "Execution Aborted"
      };
    }
  }
}
