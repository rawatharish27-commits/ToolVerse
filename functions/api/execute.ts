
import { routeRequest } from "../core/router";
import { isAllowed } from "../core/ratelimit";
import { enforcePayloadLimit, withTimeout } from "../core/safety";
import { checkUsage } from "../core/usage";
import { success, error } from "../core/response";
import { verifyProToken } from "../core/pro";
import { verifyAdProof } from "../core/adUnlock";
import { logToolUsage } from "../core/analytics";

/**
 * ToolVerse Production Gateway (V3.5 Hybrid Orchestrator)
 */
export const onRequestPost = async (context: { request: Request; env: any }) => {
  const { request, env } = context;
  
  (globalThis as any).process = {
    env: { API_KEY: env.API_KEY || "" }
  };

  const ip = request.headers.get("CF-Connecting-IP") || "anonymous";

  try {
    const payload = await request.json();
    const { toolId, category, input, adProof } = payload;

    if (!toolId) return error("toolId is mandatory.");

    // Identity and Pro Status Check
    const authHeader = request.headers.get("Authorization");
    let isPro = false;
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const proData = await verifyProToken(token, env.PRO_SECRET || "default_secret");
      if (proData) isPro = true;
    }

    // Rate Limiting (Stricter for AI if not Pro)
    const isAITool = toolId.startsWith('ai-') || category === 'ai';
    const limit = isPro ? 500 : (adProof ? 20 : 5);
    
    checkUsage(ip, toolId, limit);
    logToolUsage(toolId);

    // Execute with Pro status injected into input payload
    const enrichedInput = { ...input, isProStatus: isPro, toolId };

    const data = await withTimeout(
      routeRequest(toolId, category || 'general', enrichedInput, env),
      15000 
    );
    
    return success({ 
      ...data, 
      proStatus: isPro,
      engine: isPro ? "Neural-V3" : "Instant-V1"
    });
  } catch (err: any) {
    if (err.message?.includes("Usage limit")) {
      return error("Session limit reached. Upgrade to Pro for unlimited neural access.", 429);
    }
    console.error(`[GW_ERR]: ${err.message}`);
    return error(err.message || "Internal Engine Error", 500);
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
