
export interface ToolResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  needsKey?: boolean;
}

const AI_CACHE_KEY = 'tv_intelligence_cache_v3';

/**
 * Intelligent Caching Layer
 * Hashes inputs to serve common requests instantly and save credits.
 */
const getCache = () => {
  const data = localStorage.getItem(AI_CACHE_KEY);
  return data ? JSON.parse(data) : {};
};

const setCache = (key: string, val: any) => {
  const cache = getCache();
  cache[key] = { 
    val, 
    expiry: Date.now() + (1000 * 60 * 60 * 24 * 7) // 7-day credit protection
  };
  localStorage.setItem(AI_CACHE_KEY, JSON.stringify(cache));
};

const fastHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(36);
};

export const executeOnEdge = async (toolId: string, category: string, input: any): Promise<ToolResponse> => {
  const inputStr = typeof input === 'string' ? input : JSON.stringify(input);
  const cacheKey = `${toolId}:${fastHash(inputStr)}`;

  // 1. Credit Saver: Check Cache first
  if (category === 'ai' || toolId.startsWith('ai-')) {
    const cache = getCache();
    if (cache[cacheKey] && cache[cacheKey].expiry > Date.now()) {
      console.debug("[Cache Hit] Serving from Intelligence Cache...");
      return { success: true, data: cache[cacheKey].val };
    }
  }

  try {
    const customKey = localStorage.getItem('tv_custom_gemini_key');
    
    const response = await fetch("/api/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(customKey ? { "X-Custom-API-Key": customKey } : {})
      },
      body: JSON.stringify({ toolId, category, input, timestamp: Date.now() }),
    });

    const result = await response.json();
    
    if (result.success && (category === 'ai' || toolId.startsWith('ai-'))) {
      setCache(cacheKey, result.data);
    }

    // Handle system quota exhaustion
    if (response.status === 429 || result.error?.includes("quota") || result.error?.includes("exhausted")) {
      return { success: false, error: "System AI Quota Exhausted.", needsKey: true };
    }

    return result.success ? { success: true, data: result.data } : { success: false, error: result.error };
  } catch {
    return { success: false, error: "Network Protocol Error." };
  }
};
