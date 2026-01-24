
export function enforcePayloadLimit(request: Request, maxKB = 25) {
  const size = Number(request.headers.get("content-length") || 0);
  if (size > maxKB * 1024) throw new Error("Payload too large (Max 25KB).");
}

export async function withTimeout<T>(promise: Promise<T>, ms = 4000): Promise<T> {
  let timeoutId: any;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("Edge Execution Timeout (4s).")), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
}
