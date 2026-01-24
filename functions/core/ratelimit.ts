
const limits = new Map<string, { count: number; time: number }>();

/**
 * Rate limit logic for Edge Isolates
 * Default: 30 requests per minute per IP
 */
export function isAllowed(ip: string, limit = 30, windowMs = 60000): boolean {
  const now = Date.now();
  const entry = limits.get(ip);

  // If new user or window expired, reset
  if (!entry || now - entry.time > windowMs) {
    limits.set(ip, { count: 1, time: now });
    return true;
  }

  // Check if limit exceeded
  if (entry.count >= limit) {
    return false;
  }

  // Increment count
  entry.count++;
  return true;
}
