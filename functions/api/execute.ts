
import { routeRequest } from "../core/router";
import { isAllowed } from "../core/ratelimit";
import { enforcePayloadLimit, withTimeout } from "../core/safety";
import { checkUsage } from "../core/usage";
import { success, error } from "../core/response";
import { verifyProToken } from "../core/pro";
import { verifyAdProof } from "../core/adUnlock";
import { logToolUsage } from "../core/analytics";

/**
 * ToolVerse Production Gateway (V3 Hardened)
 * 
 * This file serves as the single bridge between the Cloudflare request context
 * and the Google GenAI SDK's dependency on global 'process'.
 */
export const onRequestPost = async (context: { request: Request; env: any }) => {
  const { request, env } = context;
  
  // STEP 1: Shim global process for SDK compatibility.
  // The Gemini SDK requires process.env.API_KEY. We inject it here safely.
  (globalThis as any).process = {
    env: { 
      API_KEY: env.API_KEY || "",
      AI_PROMPT_VERSION: env.AI_PROMPT_VERSION || "v1"
    }
  };

  const ip = request.headers.get("CF-Connecting-IP") || "anonymous";

  try {
    enforcePayloadLimit(request, 60); // 60KB limit for rich AI contexts

    if (!isAllowed(ip)) {
      return error("Rate limit exceeded. Please wait 60 seconds.", 429);
    }

    const payload = await request.json();
    const { toolId, category, input, adProof } = payload;

    if (!toolId) return error("toolId is mandatory.");

    logToolUsage(toolId);

    // Identity and Monetization Logic
    const authHeader = request.headers.get("Authorization");
    let isPro = false;
    if (authHeader?.startsWith("Bearer ")) {
      const proData = await verifyProToken(authHeader.split(" ")[1], env.PRO_SECRET || "default_secret");
      if (proData) isPro = true;
    }

    const hasAdBoost = adProof ? verifyAdProof(adProof) : false;
    const limit = isPro ? 1000 : (hasAdBoost ? 50 : 20);
    
    checkUsage(ip, toolId, limit);

    // Execute logic - passing 'env' for tools that use getEnv helper
    const data = await withTimeout(
      routeRequest(toolId, category || 'general', input, env),
      12000 // Extended to 12s for long article generation
    );
    
    return success({ 
      ...data, 
      proStatus: isPro, 
      node: "edge-production-v3"
    });
  } catch (err: any) {
    console.error(`[EXECUTION_CRASH]: ${err.message}`);
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
