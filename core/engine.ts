
import { ToolPipeline, ExecutionResult } from '../types/platform';

export class ToolEngine {
  static async run<I, O>(
    pipeline: ToolPipeline<I, O>,
    input: I,
    options?: any,
    onProgress?: (stage: string) => void
  ): Promise<ExecutionResult<O>> {
    try {
      // 1. Validation (Fast Fail)
      onProgress?.('Validating input parameters...');
      const v = pipeline.validate(input);
      if (!v.valid) return { success: false, error: v.error, stage: 'validation' };

      // 2. Normalization
      onProgress?.('Normalizing formats...');
      const normalizedInput = pipeline.normalize(input);

      // 3. Core Processing
      onProgress?.('Processing logic nodes...');
      const output = await pipeline.process(normalizedInput, options);

      // 4. Output Verification
      onProgress?.('Verifying result integrity...');
      const ver = pipeline.verify(output);
      if (!ver.secure) return { success: false, error: ver.error, stage: 'verification' };

      // 5. Success
      return {
        success: true,
        data: output,
        explanation: pipeline.explain(output)
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'Unknown execution fault in logic isolate.',
        stage: 'processing'
      };
    }
  }
}
