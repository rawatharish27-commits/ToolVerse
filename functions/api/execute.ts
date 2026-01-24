
import { routeRequest } from "../core/router";
import { isAllowed } from "../core/ratelimit";
import { enforcePayloadLimit, withTimeout } from "../core/safety";
import { checkUsage } from "../core/usage";
import { success, error } from "../core/response";
import { verifyProToken } from "../core/pro";
import { verifyAdProof } from "../core/adUnlock";
import { logToolUsage } from "../core/analytics";

/**
 * ToolVerse Production Edge Engine
 */
export const onRequestPost = async (context: { request: Request; env: any }) => {
  const { request, env } = context;
  const ip = request.headers.get("CF-Connecting-IP") || "anonymous";

  try {
    // 1. Volumetric Protection
    enforcePayloadLimit(request, 25); 

    // 2. Global Rate Limiter
    if (!isAllowed(ip)) {
      return error("Global rate limit exceeded. Retry in 60s.", 429);
    }

    const payload = await request.json();
    const { toolId, category, input, adProof } = payload;

    if (!toolId) return error("Missing toolId.");

    // 3. Telemetry
    logToolUsage(toolId);

    // 4. Identity & Monetization Check
    const authHeader = request.headers.get("Authorization");
    let isPro = false;
    if (authHeader?.startsWith("Bearer ")) {
      const proData = await verifyProToken(authHeader.split(" ")[1], env.PRO_SECRET || "default_secret");
      if (proData) isPro = true;
    }

    const hasAdBoost = adProof ? verifyAdProof(adProof) : false;

    // 5. Tiered Usage Guard
    const cap = isPro ? 1000 : (hasAdBoost ? 40 : 10);
    checkUsage(ip, toolId, cap);

    // 6. Execute Logic with 4s Timeout
    const data = await withTimeout(
      routeRequest(toolId, category || 'general', input, env)
    );
    
    return success({ 
      ...data, 
      proStatus: isPro, 
      boosted: hasAdBoost,
      node: "edge-v3"
    });
  } catch (err: any) {
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
