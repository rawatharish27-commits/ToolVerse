
const usageStore = new Map<string, number>();

/**
 * Checks usage against a specific tool and IP.
 * Resets whenever the worker isolate restarts (stateless behavior).
 */
export function checkUsage(ip: string, toolId: string, limit = 20) {
  const key = `${ip}:${toolId}`;
  const used = usageStore.get(key) || 0;

  if (used >= limit) {
    throw new Error(`Usage limit of ${limit} reached for [${toolId}]. Please try again later.`);
  }

  usageStore.set(key, used + 1);
}
