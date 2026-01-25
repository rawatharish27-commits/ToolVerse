
import { handleRouting } from "../core/router";
import { success, error } from "../core/response";
import { checkUsage } from "../core/usage";
import { logToolUsage } from "../core/analytics";

/**
 * ToolVerse Cloudflare Edge API Handler
 * High-performance entry point for all server-side logic.
 */
export const onRequestPost = async (context: { request: Request; env: any }) => {
  const { request, env } = context;
  const ip = request.headers.get("CF-Connecting-IP") || "anonymous";

  try {
    const payload = await request.json();
    const { toolId, category, input } = payload;

    if (!toolId) return error("Missing toolId.");

    // Rate limiting & Analytics
    checkUsage(ip, toolId, 100);
    logToolUsage(toolId);

    // Orchestrate routing
    const result = await handleRouting(toolId, category || 'general', payload, env);
    
    // Check if success is true to discriminate result
    if (result.success) {
      return success(result.data);
    } else {
      // FIX: Cast result to any to safely access error property on union type when success is false.
      return error((result as any).error || "Logic node failed.");
    }
    
  } catch (err: any) {
    console.error(`[API_EXEC_ERR]: ${err.message}`);
    return error(err.message || "Engine Error", 500);
  }
};

export const onRequestOptions = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
};
