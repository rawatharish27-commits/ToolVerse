
/**
 * ToolVerse Network Cluster Logic
 * High-performance browser-native network utilities.
 */

export const parseUserAgent = (ua: string) => {
  const browserMatch = ua.match(/(firefox|msie|trident|chrome|safari|opera|edge|edg)/i) || ["Unknown"];
  const osMatch = ua.match(/(windows|macintosh|linux|android|ios|iphone|ipad)/i) || ["Unknown"];
  
  return {
    "Browser": browserMatch[0].replace('Edg', 'Edge'),
    "Operating System": osMatch[0].replace('Macintosh', 'macOS'),
    "Engine": ua.includes('AppleWebKit') ? 'WebKit' : ua.includes('Gecko') ? 'Gecko' : 'Other',
    "Mobile Device": /mobile|android|iphone|ipad/i.test(ua) ? "Yes" : "No",
    "Platform": navigator.platform || "Unknown",
    "Full String": ua
  };
};

export const identifyHashType = (hash: string) => {
  const h = hash.trim();
  const len = h.length;
  
  if (/^[a-f0-9]{32}$/i.test(h)) return { "Hash Type": "MD5", "Length": "128-bit", "Security": "LOW (Deprecated)" };
  if (/^[a-f0-9]{40}$/i.test(h)) return { "Hash Type": "SHA-1", "Length": "160-bit", "Security": "MEDIUM (Legacy)" };
  if (/^[a-f0-9]{64}$/i.test(h)) return { "Hash Type": "SHA-256", "Length": "256-bit", "Security": "HIGH (Standard)" };
  if (/^[a-f0-9]{128}$/i.test(h)) return { "Hash Type": "SHA-512", "Length": "512-bit", "Security": "ULTRA-HIGH" };
  if (h.startsWith('$2y$') || h.startsWith('$2a$')) return { "Hash Type": "BCrypt", "Security": "VERY HIGH (Adaptive)" };
  
  return { "Hash Type": "Unknown", "Note": "Length and format do not match common algorithms." };
};

export const checkUrlSafetyHeuristic = (urlString: string) => {
  try {
    const url = new URL(urlString.startsWith('http') ? urlString : `http://${urlString}`);
    const host = url.hostname;
    const risks: string[] = [];

    if (host.split('.').length > 3) risks.push("Excessive subdomains (Phishing pattern)");
    if (/[0-9]/.test(host.split('.')[0])) risks.push("Numeric characters in domain (Potential bot-gen)");
    if (url.pathname.includes('login') || url.pathname.includes('verify')) risks.push("Sensitive keyword in path");
    if (host.includes('-')) risks.push("Hyphenated domain (Common in typosquatting)");

    return {
      "Risk Score": risks.length > 2 ? "HIGH" : risks.length > 0 ? "MEDIUM" : "LOW",
      "Analysis": risks.length > 0 ? risks : ["No common phishing patterns detected."],
      "Protocol": url.protocol.toUpperCase().replace(':', ''),
      "Host": host
    };
  } catch (e) {
    return { "Error": "Invalid URL format." };
  }
};
