
import { routeRequest } from "../core/router";
import { isAllowed } from "../core/ratelimit";
import { enforcePayloadLimit, withTimeout } from "../core/safety";
import { checkUsage } from "../core/usage";
import { success, error } from "../core/response";
import { verifyProToken } from "../core/pro";
import { verifyAdProof } from "../core/adUnlock";
import { logToolUsage } from "../core/analytics";

export const onRequestPost = async (context: { request: Request; env: any }) => {
  const { request, env } = context;
  const ip = request.headers.get("CF-Connecting-IP") || "anonymous";

  try {
    // Basic protection
    enforcePayloadLimit(request, 50); // Increased to 50KB for larger AI inputs

    if (!isAllowed(ip)) {
      return error("Rate limit exceeded. Please wait 60 seconds.", 429);
    }

    const payload = await request.json();
    const { toolId, category, input, adProof } = payload;

    if (!toolId) return error("toolId is mandatory for execution.");

    logToolUsage(toolId);

    // Monetization Logic
    const authHeader = request.headers.get("Authorization");
    let isPro = false;
    if (authHeader?.startsWith("Bearer ")) {
      const proData = await verifyProToken(authHeader.split(" ")[1], env.PRO_SECRET || "default_secret");
      if (proData) isPro = true;
    }

    const hasAdBoost = adProof ? verifyAdProof(adProof) : false;
    const limit = isPro ? 1000 : (hasAdBoost ? 50 : 20);
    
    checkUsage(ip, toolId, limit);

    // Core Execution - Passing both tool input and the full environment context
    const data = await withTimeout(
      routeRequest(toolId, category || 'general', input, env),
      8000 // Extended timeout to 8s for complex AI generations
    );
    
    return success({ 
      ...data, 
      proStatus: isPro, 
      boosted: hasAdBoost,
      node: "edge-v3-hardened"
    });
  } catch (err: any) {
    console.error(`[EXECUTION_ERROR]: ${err.message}`);
    
    // Friendly error for missing keys
    if (err.message.includes("process.env.API_KEY")) {
      return error("Backend Configuration Error: AI API Key is not set in Cloudflare Settings. Please check dashboard environment variables.", 500);
    }

    return error(err.message || "Internal Toolverse Engine Error", 500);
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
