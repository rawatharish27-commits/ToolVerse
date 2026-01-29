
export interface ExecutionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  stage?: string;
  explanation?: string;
  timing?: number;
}

export interface ToolPipeline<I, O> {
  validate: (input: I) => { valid: boolean; error?: string };
  normalize: (input: I) => I;
  process: (input: I) => Promise<O>;
  verify: (output: O) => { valid: boolean; error?: string };
  explain: (output: O) => string;
}

export class PipelineRunner {
  static async run<I, O>(
    slug: string,
    definition: ToolPipeline<I, O>,
    input: I
  ): Promise<ExecutionResult<O>> {
    const startTime = performance.now();
    try {
      // 1. Lightweight Validation (Fast Fail)
      const v = definition.validate(input);
      if (!v.valid) throw new Error(v.error || "Validation Failed");

      // 2. Input Normalization
      const normalized = definition.normalize(input);

      // 3. Core Processing
      const output = await definition.process(normalized);

      // 4. Output Verification
      const ver = definition.verify(output);
      if (!ver.valid) throw new Error(ver.error || "Integrity Check Failed");

      // 5. Success and Explanation
      return {
        success: true,
        data: output,
        explanation: definition.explain(output),
        timing: performance.now() - startTime
      };
    } catch (e: any) {
      return {
        success: false,
        error: e.message,
        stage: "pipeline_failure",
        timing: performance.now() - startTime
      };
    }
  }
}
