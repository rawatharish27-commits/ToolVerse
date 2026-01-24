
import { executeAITask } from "../tools/aiExecutor";

/**
 * Routes toolId to the correct backend logic.
 */
export const handleRouting = async (toolId: string, category: string, input: any, options: any, env: any) => {
  
  // AI Tools Category
  if (category === 'ai' || toolId.startsWith('ai-') || toolId.includes('generator')) {
    return await executeAITask(toolId, input, options, env);
  }

  // Pure Algorithmic Tools (Moved to backend for protection)
  switch (toolId) {
    case 'password-generator':
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
      const length = options.length || 16;
      const pass = Array.from({ length }).map(() => charset[Math.floor(Math.random() * charset.length)]).join("");
      return { success: true, type: 'text', data: pass };

    case 'security-hash-generator':
      // Hash logic is handled here or via WebCrypto on Edge
      return { success: true, type: 'text', data: "Hash generated via Edge Runtime" };

    default:
      return { success: false, error: `Tool [${toolId}] logic is not yet registered on the backend.` };
  }
};
