
import { getToolExecutor } from "./toolRegistry";
import { validateInput } from "./validator";

export async function routeRequest(toolId: string, category: string, input: any, env: any) {
  const execute = getToolExecutor(toolId);
  
  // Format payload for tool execution
  const isAI = category === 'ai' || toolId.startsWith('ai-');
  const payload = isAI ? { ...input, toolId } : input;

  // Enforce schema
  validateInput(toolId, payload);

  return await execute(payload, env);
}
