
import { useState } from 'react';
import { executeTool, ToolPipeline, ToolResult } from './executeTool';

/**
 * Universal Hook for Tool Interaction
 * Orchestrates loading states and result verification.
 */
export function useToolRunner<I, O>(pipeline: ToolPipeline<I, O>) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ToolResult<O> | null>(null);

  const run = async (input: I, options?: any) => {
    setLoading(true);
    setResult(null);
    const res = await executeTool<I, O>(input, pipeline, options);
    setResult(res);
    setLoading(false);
  };

  const reset = () => {
    setResult(null);
    setLoading(false);
  };

  return { run, reset, loading, result };
}
