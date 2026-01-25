export const emailHeaderAnalyzerConfig = {
  slug: "email-header-analyzer",
  title: "Email Header Analyzer",
  description: "Deconstruct email headers to track sender IPs, mail hops, and verify SPF/DKIM/DMARC authentication.",
  icon: "📨",
  colorClass: "bg-cyan-800",
  options: [
    { id: "deepTrace", type: "toggle", label: "Deep Hop Analysis", default: true }
  ]
};

export const ipInfoOfflineConfig = {
  slug: "ip-info-tool",
  title: "IP Address Info Tool",
  description: "Identify IP version, subnet class, and reserved status for any IP without external API calls.",
  icon: "🌐",
  colorClass: "bg-cyan-600",
  options: []
};

export const dataMaskingConfig = {
  slug: "data-masking-tool",
  title: "PII Data Masking Tool",
  description: "Securely mask sensitive data like emails, credit card numbers, and IPs for documentation and sharing.",
  icon: "🎭",
  colorClass: "bg-slate-900",
  options: [
    { id: "maskEmails", type: "toggle", label: "Mask Emails", default: true },
    { id: "maskIps", type: "toggle", label: "Mask IP Addresses", default: true },
    { id: "maskCc", type: "toggle", label: "Mask Card Numbers", default: true }
  ]
};

// ... maintain existing ipLookupConfig, dnsLookupConfig, etc.
export const ipLookupConfig = {
  slug: "ip-to-location",
  title: "IP to Location Lookup",
  description: "Identify geographical data and ISP for any IP address.",
  icon: "📍",
  colorClass: "bg-cyan-600",
  options: []
};

export const dnsLookupConfig = {
  slug: "dns-lookup",
  title: "Pro DNS Lookup",
  description: "Query DNS records for any domain.",
  icon: "📂",
  colorClass: "bg-cyan-700",
  options: []
};

export const sslCheckerConfig = {
  slug: "ssl-expiry-checker",
  title: "SSL Expiry & Health Checker",
  description: "Check SSL certificate validity and expiry.",
  icon: "🔒",
  colorClass: "bg-emerald-600",
  options: []
};

export const uaParserConfig = {
  slug: "user-agent-parser",
  title: "User Agent Parser",
  description: "Decode User-Agent strings.",
  icon: "💻",
  colorClass: "bg-slate-700",
  options: []
};

export const portCheckerConfig = {
  slug: "port-checker",
  title: "Port Scanner & Checker",
  description: "Check for open network ports.",
  icon: "🔌",
  colorClass: "bg-cyan-800",
  options: []
};

export const headerCheckerConfig = {
  slug: "http-header-checker",
  title: "HTTP Header Inspector",
  description: "Analyze HTTP response headers.",
  icon: "📡",
  colorClass: "bg-indigo-600",
  options: []
};

export const urlSafetyConfig = {
  slug: "url-safety-checker",
  title: "URL Safety & Phishing Guard",
  description: "Analyze URLs for potential security risks.",
  icon: "🛡️",
  colorClass: "bg-rose-600",
  options: []
};

export const internetSpeedTestConfig = {
  slug: "internet-speed-test",
  title: "Internet Speed Analyzer",
  description: "Evaluate connection quality.",
  icon: "🚀",
  colorClass: "bg-cyan-600",
  options: []
};