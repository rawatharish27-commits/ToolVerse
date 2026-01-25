
export const ipLookupConfig = {
  slug: "ip-to-location",
  title: "IP to Location Lookup",
  description: "Identify geographical data, ISP, and ASN metadata for any IP address instantly.",
  icon: "📍",
  colorClass: "bg-cyan-600",
  options: []
};

export const dnsLookupConfig = {
  slug: "dns-lookup",
  title: "Pro DNS Lookup",
  description: "Query global DNS records including A, AAAA, MX, TXT, and NS records for any domain.",
  icon: "📂",
  colorClass: "bg-cyan-700",
  options: [
    { id: "type", type: "select", label: "Record Type", values: ["ANY", "A", "AAAA", "MX", "TXT", "NS", "CNAME"], default: "ANY" }
  ]
};

export const sslCheckerConfig = {
  slug: "ssl-expiry-checker",
  title: "SSL Expiry & Health Checker",
  description: "Check SSL certificate validity, issuer details, and precise expiration timestamps for any domain.",
  icon: "🔒",
  colorClass: "bg-emerald-600",
  options: []
};

export const uaParserConfig = {
  slug: "user-agent-parser",
  title: "User Agent Parser",
  description: "Decode User-Agent strings to identify browser, OS, and device hardware details.",
  icon: "💻",
  colorClass: "bg-slate-700",
  options: []
};

export const portCheckerConfig = {
  slug: "port-checker",
  title: "Remote Port Scanner",
  description: "Check for open network ports (SSH, HTTP, MySQL, etc.) on any public IP or hostname.",
  icon: "🔌",
  colorClass: "bg-cyan-800",
  options: [
    { id: "ports", type: "text", label: "Port Range (e.g. 22, 80, 443)", default: "80, 443, 22" }
  ]
};

export const headerCheckerConfig = {
  slug: "http-header-checker",
  title: "HTTP Header Inspector",
  description: "Analyze HTTP response headers for security compliance, caching, and server identification.",
  icon: "📡",
  colorClass: "bg-indigo-600",
  options: []
};

export const urlSafetyConfig = {
  slug: "url-safety-checker",
  title: "URL Safety & Phishing Guard",
  description: "Analyze URLs for potential security risks, malicious patterns, and typosquatting attempts.",
  icon: "🛡️",
  colorClass: "bg-rose-600",
  options: []
};

export const internetSpeedTestConfig = {
  slug: "internet-speed-test",
  title: "Internet Speed Analyzer",
  description: "Evaluate your current connection quality, latency (ping), and bandwidth throughput.",
  icon: "🚀",
  colorClass: "bg-cyan-600",
  options: []
};

export const emailHeaderAnalyzerConfig = {
  slug: "email-header-analyzer",
  title: "Email Header Analyzer",
  description: "Deconstruct email headers to track sender IPs and verify authentication (SPF/DKIM).",
  icon: "📨",
  colorClass: "bg-cyan-800",
  options: []
};

export const ipInfoOfflineConfig = {
  slug: "ip-info-tool",
  title: "IP Address Info Tool",
  description: "Identify IP version, subnet class, and reserved status for any IP without external calls.",
  icon: "🌐",
  colorClass: "bg-cyan-600",
  options: []
};

export const dataMaskingConfig = {
  slug: "data-masking-tool",
  title: "PII Data Masking Tool",
  description: "Securely mask sensitive data like emails and credit cards for safe sharing.",
  icon: "🎭",
  colorClass: "bg-slate-900",
  options: [
    { id: "maskEmails", type: "toggle", label: "Mask Emails", default: true },
    { id: "maskIps", type: "toggle", label: "Mask IP Addresses", default: true }
  ]
};
