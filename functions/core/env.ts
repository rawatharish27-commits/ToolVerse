
/**
 * ToolVerse Edge Environment Utility
 * Safely handles variable extraction from the Cloudflare context.
 */

export function getEnv(env: any, key: string): string {
  const value = env[key];
  if (!value) {
    console.error(`[ENV_MISSING]: ${key} is not defined in the Cloudflare environment.`);
    // We throw a clear error that the gateway can catch and report
    throw new Error(`Configuration Error: ${key} is required for this operation.`);
  }
  return value;
}
