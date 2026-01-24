
/**
 * Protection Layer for Edge Runtimes
 */

export function enforcePayloadLimit(request: Request, maxKB = 20) {
  const size = Number(request.headers.get("content-length") || 0);
  if (size > maxKB * 1024) {
    throw new Error("Payload limit exceeded (Max 20KB allowed).");
  }
}

export async function withTimeout<T>(
  promise: Promise<T>,
  ms = 4000
): Promise<T> {
  let timeoutId: any;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("Execution timeout (4s limit).")), ms);
  });

  return Promise.race([promise, timeoutPromise]).finally(() => {
    clearTimeout(timeoutId);
  });
}
