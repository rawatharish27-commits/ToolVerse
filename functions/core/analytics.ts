
const usageMap = new Map<string, number>();

/**
 * Logs tool usage per worker isolate.
 * Data is emitted to Cloudflare Logs periodically.
 */
export function logToolUsage(toolId: string) {
  const current = usageMap.get(toolId) || 0;
  usageMap.set(toolId, current + 1);

  // Per-isolate reporting threshold
  if (usageMap.size >= 50) {
    console.log(`[ANALYTICS_SNAPSHOT]: ${JSON.stringify(Object.fromEntries(usageMap))}`);
    usageMap.clear();
  }
}
