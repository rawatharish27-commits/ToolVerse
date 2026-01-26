
export interface ToolResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  needsKey?: boolean;
}

const AI_CACHE_KEY = 'tv_ai_cache_v1';

const getCache = () => {
  const data = localStorage.getItem(AI_CACHE_KEY);
  return data ? JSON.parse(data) : {};
};

const setCache = (key: string, val: any) => {
  const cache = getCache();
  cache[key] = { val, expiry: Date.now() + (1000 * 60 * 60 * 24 * 7) }; // 1 week cache
  localStorage.setItem(AI_CACHE_KEY, JSON.stringify(cache));
};

export const executeOnEdge = async (toolId: string, category: string, input: any): Promise<ToolResponse> => {
  // 1. Caching Layer for AI tools to save free credits
  const cacheKey = `${toolId}:${typeof input === 'string' ? input.slice(0, 100) : JSON.stringify(input).slice(0, 100)}`;
  if (category === 'ai' || toolId.startsWith('ai-')) {
    const cache = getCache();
    if (cache[cacheKey] && cache[cacheKey].expiry > Date.now()) {
      console.log("[Cache Hit] Returning cached intelligence...");
      return { success: true, data: cache[cacheKey].val };
    }
  }

  try {
    const proToken = localStorage.getItem('tv_pro_token');
    const customKey = localStorage.getItem('tv_custom_gemini_key');
    
    const response = await fetch("/api/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(proToken ? { "Authorization": `Bearer ${proToken}` } : {}),
        ...(customKey ? { "X-Custom-API-Key": customKey } : {})
      },
      body: JSON.stringify({
        toolId,
        category,
        input,
        adProof: sessionStorage.getItem('tv_ad_proof') || null
      }),
    });

    const result = await response.json();
    
    if (result.success && (category === 'ai' || toolId.startsWith('ai-'))) {
      setCache(cacheKey, result.data);
    }

    // Handle credit exhaustion
    if (result.error?.includes("quota") || result.error?.includes("exhausted")) {
      return { success: false, error: "System AI Credits Exhausted.", needsKey: true };
    }

    return result.success ? { success: true, data: result.data } : { success: false, error: result.error };
  } catch {
    return { success: false, error: "Edge Engine unreachable." };
  }
};
