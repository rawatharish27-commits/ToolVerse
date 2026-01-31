
import { handleRouting } from "../core/router";
import { success, error } from "../core/response";
import { isAllowed } from "../core/ratelimit";
import { logToolUsage } from "../core/analytics";

/**
 * ToolVerse Universal Edge Isolate
 * Logic orchestrator for 500+ utilities.
 */
export const onRequestPost = async (context: { request: Request; env: any }) => {
  const { request, env } = context;
  const ip = request.headers.get("CF-Connecting-IP") || "anonymous";
  
  // SECURE KEY INJECTION: Priority given to user-provided keys
  const customKey = request.headers.get("X-Custom-API-Key");

  try {
    const payload = await request.json();
    const { toolId, category } = payload;

    if (!toolId) return error("Logic identification failed.");

    // Rate Limiting Policy: Bypass if user provides their own key
    if (!customKey) {
      if (!isAllowed(ip, 20)) return error("System cooldown active. Try again later or use your own key.", 429);
    }
    
    logToolUsage(toolId);

    // Merge custom key into execution context
    const isolateEnv = customKey ? { ...env, API_KEY: customKey } : env;

    const result = await handleRouting(toolId, category || 'general', payload, isolateEnv);
    
    // Fix: Explicitly cast result to any to bypass TypeScript union property access restrictions for 'data' and 'error'
    const finalResult = result as any;
    if (finalResult.success) {
      return success(finalResult.data);
    } else {
      const errCode = finalResult.error?.includes("429") ? 429 : 400;
      return error(finalResult.error || "Node logic failure.", errCode);
    }
    
  } catch (err: any) {
    console.error(`[EDGE_FAULT]: ${err.message}`);
    return error(err.message || "Logic Isolate Error", 500);
  }
};

export const onRequestOptions = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Custom-API-Key",
    },
  });
};
