
/**
 * Simple in-memory rate limiter for Edge isolates.
 * In production, this can be upgraded to Cloudflare KV or Durable Objects.
 */
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

const LIMIT = 30; // requests
const WINDOW = 60 * 1000; // 1 minute

export const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const userRecord = rateLimitMap.get(ip);

  if (!userRecord) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (now - userRecord.timestamp > WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (userRecord.count >= LIMIT) {
    return true;
  }

  userRecord.count++;
  return false;
};
