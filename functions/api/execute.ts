
import { handleRouting } from "../core/router";
import { success, error } from "../core/response";
import { checkUsage } from "../core/usage";
import { logToolUsage } from "../core/analytics";

/**
 * ToolVerse Cloudflare Edge API Handler
 * Support for standard and custom user-provided API keys.
 */
export const onRequestPost = async (context: { request: Request; env: any }) => {
  const { request, env } = context;
  const ip = request.headers.get("CF-Connecting-IP") || "anonymous";
  const customKey = request.headers.get("X-Custom-API-Key");

  try {
    const payload = await request.json();
    const { toolId, category } = payload;

    if (!toolId) return error("Missing toolId.");

    // Rate limiting (Disabled for custom key users)
    if (!customKey) {
      checkUsage(ip, toolId, 100);
    }
    
    logToolUsage(toolId);

    // Merge custom key into environment if provided
    const executionEnv = customKey ? { ...env, API_KEY: customKey } : env;

    const result = await handleRouting(toolId, category || 'general', payload, executionEnv);
    
    if (result.success) {
      return success(result.data);
    } else {
      return error((result as any).error || "Logic node failed.");
    }
    
  } catch (err: any) {
    console.error(`[API_EXEC_ERR]: ${err.message}`);
    // Check if it's a quota error from Gemini
    if (err.message?.includes("429") || err.message?.includes("quota")) {
      return error("System AI Quota Exhausted. Use your own key.", 429);
    }
    return error(err.message || "Engine Error", 500);
  }
};

export const onRequestOptions = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Custom-API-Key",
    },
  });
};
