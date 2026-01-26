
export interface ToolResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  needsKey?: boolean;
}

const AI_CACHE_KEY = 'tv_smart_cache_v4';

/**
 * Intelligent Edge Cache
 * Avoids duplicate AI requests by hashing inputs.
 */
const getCache = () => {
  const data = localStorage.getItem(AI_CACHE_KEY);
  return data ? JSON.parse(data) : {};
};

const setCache = (key: string, val: any) => {
  const cache = getCache();
  cache[key] = { 
    val, 
    expiry: Date.now() + (1000 * 60 * 60 * 24 * 3) // 3-day cache
  };
  localStorage.setItem(AI_CACHE_KEY, JSON.stringify(cache));
};

const computeHash = (input: any) => {
  const str = JSON.stringify(input);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(36);
};

export const executeOnEdge = async (toolId: string, category: string, input: any): Promise<ToolResponse> => {
  const cacheKey = `${toolId}:${computeHash(input)}`;

  // 1. Credit Shield: Immediate Cache Return
  if (category === 'ai' || toolId.startsWith('ai-')) {
    const cache = getCache();
    if (cache[cacheKey] && cache[cacheKey].expiry > Date.now()) {
      return { success: true, data: cache[cacheKey].val };
    }
  }

  try {
    const customKey = localStorage.getItem('tv_custom_gemini_key');
    
    // INTEGRATION: Full Backend Handshake
    const response = await fetch("/api/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(customKey ? { "X-Custom-API-Key": customKey } : {})
      },
      body: JSON.stringify({ toolId, category, input }),
    });

    const result = await response.json();
    
    if (result.success && (category === 'ai' || toolId.startsWith('ai-'))) {
      setCache(cacheKey, result.data);
    }

    // Handle exhaustion
    if (response.status === 429 || result.error?.includes("quota")) {
      return { success: false, error: "System Credits Exhausted.", needsKey: true };
    }

    return result.success ? { success: true, data: result.data } : { success: false, error: result.error };
  } catch {
    return { success: false, error: "Edge Link Failure." };
  }
};
