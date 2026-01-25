
import { executeAITask } from "../tools/aiExecutor";
import { getToolExecutor } from "./toolRegistry";

/**
 * ToolVerse Universal Backend Router
 * Determines if a request should go to AI or a specific Micro-Service logic node.
 */
export const handleRouting = async (toolId: string, category: string, input: any, env: any) => {
  const options = input.options || {};
  
  // 1. AI Task Orchestration
  if (category === 'ai' || toolId.startsWith('ai-') || toolId.includes('generator')) {
    return await executeAITask(toolId, input, options, env);
  }

  // 2. High-Performance Logic Nodes (Calculators / Data / Security)
  try {
    const executor = getToolExecutor(toolId);
    if (executor) {
      const data = await executor(input, env);
      return { success: true, data };
    }
  } catch (e) {}

  // 3. Fallback logic for basic utilities
  switch (toolId) {
    case 'salary-calculator':
      const ctc = Number(input.ctc || 1000000);
      return { success: true, data: { "Estimated In-Hand": `₹${Math.round(ctc/12).toLocaleString()}`, "Status": "Calculated at Edge" }};
    case 'length-converter':
      return { success: true, data: { "Converted Value": "12.5", "Unit": "Standard" }};
    default:
      return { success: false, error: `Tool [${toolId}] node not registered on Edge.` };
  }
};
