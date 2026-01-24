
export async function verifyProToken(token: string, secret: string) {
  try {
    const [dataB64, sigB64] = token.split(".");
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
    const data = encoder.encode(dataB64);
    const sig = Uint8Array.from(atob(sigB64), c => c.charCodeAt(0));
    const ok = await crypto.subtle.verify("HMAC", key, sig, data);
    if (!ok) return null;
    const payload = JSON.parse(atob(dataB64));
    return Date.now() > payload.exp ? null : payload;
  } catch { return null; }
}
