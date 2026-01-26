
export interface ToolResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  needsKey?: boolean;
}

const AI_CACHE_KEY = 'tv_ai_cache_v2';

/**
 * ToolVerse Intelligence Caching System
 * Prevents redundant API calls to save free credits.
 */
const getCache = () => {
  const data = localStorage.getItem(AI_CACHE_KEY);
  return data ? JSON.parse(data) : {};
};

const setCache = (key: string, val: any) => {
  const cache = getCache();
  cache[key] = { 
    val, 
    expiry: Date.now() + (1000 * 60 * 60 * 24 * 7), // 7 Day TTL
    timestamp: new Date().toISOString()
  };
  localStorage.setItem(AI_CACHE_KEY, JSON.stringify(cache));
};

// Generates a simple hash for input strings to use as cache keys
const generateHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
};

export const executeOnEdge = async (toolId: string, category: string, input: any): Promise<ToolResponse> => {
  const inputStr = typeof input === 'string' ? input : JSON.stringify(input);
  const cacheKey = `${toolId}:${generateHash(inputStr)}`;

  // 1. Check Intelligence Cache
  if (category === 'ai' || toolId.startsWith('ai-')) {
    const cache = getCache();
    if (cache[cacheKey] && cache[cacheKey].expiry > Date.now()) {
      console.debug("[Intelligence Core] Serving from local edge cache...");
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
      body: JSON.stringify({
        toolId,
        category,
        input,
        timestamp: Date.now()
      }),
    });

    const result = await response.json();
    
    if (result.success && (category === 'ai' || toolId.startsWith('ai-'))) {
      setCache(cacheKey, result.data);
    }

    // 2. Dynamic Quota Handling
    if (response.status === 429 || result.error?.includes("quota") || result.error?.includes("exhausted")) {
      return { success: false, error: "System AI Quota Reached.", needsKey: true };
    }

    return result.success ? { success: true, data: result.data } : { success: false, error: result.error };
  } catch {
    return { success: false, error: "Edge Gateway Communication Error." };
  }
};
