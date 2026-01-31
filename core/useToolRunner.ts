
import { useState } from 'react';
import { executeTool } from './executeTool';
// Fix: Import types from '../types' instead of assuming they are exported from executeTool.ts
// ToolResult is aliased from ExecutionResult for local naming consistency.
import { ToolPipeline, ExecutionResult as ToolResult } from '../types';

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
    // Fix: Wrapped arguments in a single object as expected by executeTool and utilized generic parameters to resolve type argument errors.
    const res = await executeTool<I, O>({ input, ...pipeline, options });
    setResult(res as any);
    setLoading(false);
  };

  const reset = () => {
    setResult(null);
    setLoading(false);
  };

  return { run, reset, loading, result };
}
