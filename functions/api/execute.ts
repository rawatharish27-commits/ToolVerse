
import { routeRequest } from "../core/router";
import { isAllowed } from "../core/ratelimit";
import { enforcePayloadLimit, withTimeout } from "../core/safety";
import { checkUsage } from "../core/usage";
import { success, error } from "../core/response";
import { verifyProToken } from "../core/pro";
import { verifyAdProof } from "../core/adUnlock";
import { logToolUsage } from "../core/analytics";

/**
 * PRODUCTION EDGE GATEWAY
 * Handles all tool execution requests with zero database overhead.
 */
export const onRequestPost = async (context: { request: Request; env: any }) => {
  const { request, env } = context;
  const ip = request.headers.get("CF-Connecting-IP") || "anonymous";

  try {
    // 1. Safety Layer: Guard against volumetric abuse
    enforcePayloadLimit(request, 25); // 25KB Max

    // 2. Global Rate Limit (In-memory isolate guard)
    if (!isAllowed(ip)) {
      return error("Global rate limit hit. Try again in 60s.", 429);
    }

    const payload = await request.json();
    const { toolId, category, input, adProof } = payload;

    if (!toolId) return error("Missing toolId parameter.");

    // 3. Telemetry: Log usage without PII
    logToolUsage(toolId);

    // 4. Identity Layer: HMAC Pro Verification
    const authHeader = request.headers.get("Authorization");
    let isPro = false;
    if (authHeader?.startsWith("Bearer ")) {
      const proData = await verifyProToken(
        authHeader.split(" ")[1], 
        env.PRO_SECRET || "prod_fallback_secret"
      );
      if (proData) isPro = true;
    }

    // 5. Reward Layer: Ad-based usage boost
    const hasAdBoost = adProof ? verifyAdProof(adProof) : false;

    // 6. Monetization Guard: Tiered Usage Caps
    // Free: 10/hr, Ad-Boosted: 40/hr, Pro: 1000/hr
    const cap = isPro ? 1000 : (hasAdBoost ? 40 : 10);
    checkUsage(ip, toolId, cap);

    // 7. Logic Execution: Hardened with 4s Timeout
    const data = await withTimeout(
      routeRequest(toolId, category || 'general', input, env)
    );
    
    return success({ 
      ...data, 
      proStatus: isPro, 
      boosted: hasAdBoost,
      executionNode: "cloudflare-edge"
    });
  } catch (err: any) {
    console.error(`[ENGINE CRITICAL]: ${err.message}`);
    return error(err.message || "An internal error occurred during tool execution.", 500);
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
