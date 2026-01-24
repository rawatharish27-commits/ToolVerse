
/**
 * ToolVerse Pro Logic (Stateless)
 */

export async function verifyProToken(token: string, secret: string) {
  try {
    const [dataB64, signatureB64] = token.split(".");
    const encoder = new TextEncoder();
    
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const dataArr = encoder.encode(dataB64);
    const sigArr = Uint8Array.from(atob(signatureB64), c => c.charCodeAt(0));

    const isValid = await crypto.subtle.verify("HMAC", key, sigArr, dataArr);
    if (!isValid) return null;

    const payload = JSON.parse(atob(dataB64));
    if (Date.now() > payload.exp) return null; // Token Expired

    return payload;
  } catch (e) {
    return null;
  }
}
