
/**
 * Temporary usage boost via Ad proof
 */
export function verifyAdProof(proof: string): boolean {
  try {
    const timestamp = Number(atob(proof));
    const now = Date.now();
    // Proof must be generated within last 2 minutes (prevents reuse)
    return (now - timestamp) < (2 * 60 * 1000) && (now - timestamp) >= 0;
  } catch (e) {
    return false;
  }
}
