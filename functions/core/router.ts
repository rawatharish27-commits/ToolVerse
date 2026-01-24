
import { getToolExecutor } from "./toolRegistry";
import { validateInput } from "./validator";

/**
 * ToolVerse Edge Router v3.0
 * Routes requests to specialized tool logic after validation.
 */
export async function routeRequest(toolId: string, category: string, input: any, env: any) {
  // 1. Resolve Executor
  const execute = getToolExecutor(toolId);

  // 2. Prep Payload (Handle special mapping for AI tools)
  const isAI = category === 'ai' || toolId.startsWith('ai-');
  const payload = isAI ? { ...input, toolId } : input;

  // 3. Structural Validation (Prevents logic crashes)
  validateInput(toolId, payload);

  // 4. Execution Pipeline
  return await execute(payload, env);
}
