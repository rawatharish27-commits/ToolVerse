
import { success, error } from "../core/response";

/**
 * ToolVerse Production Analytics Engine
 * Tracks Real Visitors (Today & Total) and Geo-distribution.
 */
export const onRequest = async (context: { request: Request; env: any }) => {
  const { request, env } = context;
  
  // NAMESPACE for counter service
  const NAMESPACE = 'toolverse_production_v10';
  const API_BASE = 'https://api.counterapi.dev/v1';

  try {
    if (request.method === "POST") {
      const country = request.headers.get("cf-ipcountry") || "GL";
      const today = new Date().toISOString().split('T')[0];

      // Parallel increments for high-speed hit tracking
      const trackers = [
        `${NAMESPACE}_total_hits`,                 // Global Lifetime
        `${NAMESPACE}_daily_${today}`,             // Global Today
        `${NAMESPACE}_country_${country}`,         // Country Lifetime
        `${NAMESPACE}_c_daily_${today}_${country}` // Country Today
      ];

      // Non-blocking increment to keep Edge performance peak
      trackers.forEach(key => {
        fetch(`${API_BASE}/${key}/up`).catch(() => {});
      });

      return success({ tracked: true, country });
    }

    // Default GET response
    return success({
      engine: "ToolVerse-Edge-Analytics",
      timestamp: Date.now()
    });
    
  } catch (err: any) {
    return error("Analytics node failure.");
  }
};
