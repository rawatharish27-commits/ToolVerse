export const ipLookupConfig = {
  slug: "ip-lookup",
  title: "IP Intelligence Lookup",
  description: "Deep logical and heuristic analysis of IPv4/IPv6 addresses for security audits and OSINT research.",
  icon: "🌐",
  colorClass: "bg-cyan-600",
  options: [
    { id: "ipVersion", type: "select", label: "IP Version Preference", values: ["Auto detect", "IPv4", "IPv6"], default: "Auto detect" },
    { id: "ipUseCase", type: "select", label: "Analysis Use Case", values: ["General analysis", "Security check", "OSINT / Investigation"], default: "Security check" },
    { id: "ipDetailLevel", type: "select", label: "Detail Depth", values: ["Basic", "Detailed"], default: "Detailed" },
    { id: "ipRiskCheck", type: "select", label: "Security Risk Signals", values: ["Yes", "No"], default: "Yes" },
    { id: "ipProxyCheck", type: "select", label: "Proxy/VPN Probability", values: ["Yes", "No"], default: "Yes" },
    { id: "ipHostingCheck", type: "select", label: "Datacenter/Hosting Check", values: ["Yes", "No"], default: "Yes" },
    { id: "ipOutputStyle", type: "select", label: "Report Style", values: ["Readable report", "Bullet points"], default: "Readable report" },
    { id: "ipLanguage", type: "select", label: "Output Language", values: ["English", "Hinglish"], default: "English" }
  ],
};

export const dnsLookupConfig = {
  slug: "dns-lookup",
  title: "DNS Lookup & Analyzer",
  description: "Identify record types, purpose, and misconfigurations for any domain. Perfect for email and website troubleshooting.",
  icon: "📂",
  colorClass: "bg-cyan-700",
  options: [
    { id: "dnsRecordType", type: "select", label: "Record Type Preference", values: ["Auto (All)", "A", "AAAA", "CNAME", "MX", "TXT", "NS"], default: "Auto (All)" },
    { id: "dnsUseCase", type: "select", label: "Analysis Use Case", values: ["General analysis", "Email delivery", "Website troubleshooting", "Security audit"], default: "Security audit" },
    { id: "dnsDepth", type: "select", label: "Analysis Depth", values: ["Basic", "Detailed"], default: "Detailed" },
    { id: "dnsEmailCheck", type: "select", label: "Security Records (SPF/DKIM)", values: ["Check SPF/DKIM/DMARC", "Skip email checks"], default: "Check SPF/DKIM/DMARC" },
    { id: "dnsCDNCheck", type: "select", label: "CDN/Proxy Check", values: ["Detect CDN / Proxy", "Skip CDN check"], default: "Detect CDN / Proxy" },
    { id: "dnsTTLCheck", type: "select", label: "TTL Analysis", values: ["Analyze TTL", "Ignore TTL"], default: "Analyze TTL" },
    { id: "dnsOutput", type: "select", label: "Report Style", values: ["Readable report", "Bullet summary"], default: "Readable report" },
    { id: "dnsLanguage", type: "select", label: "Output Language", values: ["English", "Hinglish"], default: "English" }
  ],
};

export const whoisLookupConfig = {
  slug: "whois-lookup",
  title: "WHOIS Lookup & Analyzer",
  description: "Analyze domain and IP registration data. Uncover ownership history, expiry timelines, and potential risk signals.",
  icon: "🕵️",
  colorClass: "bg-cyan-800",
  options: [
    { id: "whoisTargetType", type: "select", label: "Target Type", values: ["Auto detect", "Domain", "IP address"], default: "Auto detect" },
    { id: "whoisUseCase", type: "select", label: "Analysis Use Case", values: ["General info", "Security / Phishing check", "OSINT investigation"], default: "Security / Phishing check" },
    { id: "whoisDetail", type: "select", label: "Detail Level", values: ["Basic", "Detailed"], default: "Detailed" },
    { id: "whoisPrivacy", type: "select", label: "Privacy Protection", values: ["Analyze privacy protection", "Ignore privacy"], default: "Analyze privacy protection" },
    { id: "whoisAge", type: "select", label: "Domain Age Analysis", values: ["Analyze domain age", "Ignore age"], default: "Analyze domain age" },
    { id: "whoisRegistrar", type: "select", label: "Registrar Reputation", values: ["Analyze registrar reputation", "Skip registrar analysis"], default: "Analyze registrar reputation" },
    { id: "whoisOutput", type: "select", label: "Report Style", values: ["Readable report", "Bullet summary"], default: "Readable report" },
    { id: "whoisLanguage", type: "select", label: "Output Language", values: ["English", "Hinglish"], default: "English" }
  ],
};

export const pingToolConfig = {
  slug: "ping-tool",
  title: "Ping & Connectivity Analyzer",
  description: "Diagnose host reachability and latency quality. Paste terminal ping output for deep AI-powered interpretation.",
  icon: "📡",
  colorClass: "bg-cyan-600",
  options: [
    { id: "pgTargetType", type: "select", label: "Target Type", values: ["Auto detect", "Domain", "IP"], default: "Auto detect" },
    { id: "pgUseCase", type: "select", label: "Analysis Use Case", values: ["Basic connectivity", "Network troubleshooting", "Gaming / latency check"], default: "Network troubleshooting" },
    { id: "pgCount", type: "select", label: "Packet Count", values: ["4 packets", "10 packets", "Continuous"], default: "10 packets" },
    { id: "pgPacketSize", type: "select", label: "Packet Size", values: ["Default", "Large packets"], default: "Default" },
    { id: "pgLossCheck", type: "select", label: "Packet Loss Analysis", values: ["Analyze packet loss", "Ignore packet loss"], default: "Analyze packet loss" },
    { id: "pgLatencyExplain", type: "select", label: "Interpretation Mode", values: ["Explain latency quality", "Raw numbers only"], default: "Explain latency quality" },
    { id: "pgOutput", type: "select", label: "Report Style", values: ["Readable report", "Bullet summary"], default: "Readable report" },
    { id: "pgLanguage", type: "select", label: "Output Language", values: ["English", "Hinglish"], default: "English" }
  ],
};

export const tracerouteToolConfig = {
  slug: "traceroute-tool",
  title: "Traceroute Path Analyzer",
  description: "Analyze network routing paths and identify hop-by-hop bottlenecks. Paste terminal traceroute output for AI interpretation.",
  icon: "🛤️",
  colorClass: "bg-cyan-700",
  options: [
    { id: "trMethod", type: "select", label: "Trace Method", values: ["Auto (ICMP)", "UDP", "TCP"], default: "Auto (ICMP)" },
    { id: "trUseCase", type: "select", label: "Analysis Use Case", values: ["Latency troubleshooting", "Packet loss analysis", "Routing visibility"], default: "Latency troubleshooting" },
    { id: "trDepth", type: "select", label: "Detail Level", values: ["Basic", "Detailed"], default: "Detailed" },
    { id: "trTimeouts", type: "select", label: "Timeout Analysis", values: ["Analyze timeouts (*)", "Ignore timeouts"], default: "Analyze timeouts (*)" },
    { id: "trGeoHint", type: "select", label: "Geography Hinting", values: ["Infer hop geography", "No geo inference"], default: "Infer hop geography" },
    { id: "trISPBoundary", type: "select", label: "ISP Boundaries", values: ["Detect ISP boundaries", "Skip ISP analysis"], default: "Detect ISP boundaries" },
    { id: "trOutput", type: "select", label: "Report Style", values: ["Readable report", "Hop-by-hop table"], default: "Readable report" },
    { id: "trLanguage", type: "select", label: "Output Language", values: ["English", "Hinglish"], default: "English" }
  ],
};

export const portCheckerConfig = {
  slug: "port-checker",
  title: "Port Checker & Service Analyzer",
  description: "Analyze network port exposure and service mapping. Paste terminal scan results (nmap/netstat) for professional security interpretation.",
  icon: "🔌",
  colorClass: "bg-cyan-800",
  options: [
    { id: "pcProtocol", type: "select", label: "Protocol", values: ["TCP", "UDP"], default: "TCP" },
    { id: "pcUseCase", type: "select", label: "Analysis Use Case", values: ["Service check", "Security audit", "Troubleshooting"], default: "Security audit" },
    { id: "pcDetail", type: "select", label: "Detail Level", values: ["Basic", "Detailed"], default: "Detailed" },
    { id: "pcFirewall", type: "select", label: "Firewall Impact", values: ["Analyze firewall impact", "Ignore firewall"], default: "Analyze firewall impact" },
    { id: "pcExposure", type: "select", label: "Exposure Scope", values: ["Public exposure check", "Internal network only"], default: "Public exposure check" },
    { id: "pcOutput", type: "select", label: "Report Style", values: ["Readable report", "Table summary"], default: "Readable report" },
    { id: "pcLanguage", type: "select", label: "Output Language", values: ["English", "Hinglish"], default: "English" }
  ],
};

export const internetSpeedTestConfig = {
  slug: "internet-speed-test",
  title: "Internet Speed & Stability Analyzer",
  description: "Evaluate your connection quality, latency stability, and jitter performance. Get actionable performance insights.",
  icon: "🚀",
  colorClass: "bg-cyan-600",
  options: [
    { id: "stTestMode", type: "select", label: "Test Mode", values: ["Quick check", "Detailed analysis"], default: "Detailed analysis" },
    { id: "stConnection", type: "select", label: "Connection Type", values: ["Wi-Fi", "Ethernet", "Mobile hotspot"], default: "Wi-Fi" },
    { id: "stUseCase", type: "select", label: "Primary Use Case", values: ["General browsing", "Streaming", "Gaming", "Work/Meetings"], default: "Work/Meetings" },
    { id: "stRuns", type: "select", label: "Execution Cycles", values: ["1 run", "3 runs (average)"], default: "3 runs (average)" },
    { id: "stServerPref", type: "select", label: "Server Preference", values: ["Auto", "Nearby"], default: "Auto" },
    { id: "stJitterCheck", type: "select", label: "Jitter Analysis", values: ["Analyze jitter", "Skip jitter"], default: "Analyze jitter" },
    { id: "stPacketLoss", type: "select", label: "Loss Estimation", values: ["Estimate packet loss", "Skip packet loss"], default: "Estimate packet loss" },
    { id: "stPeakOffpeak", type: "select", label: "Time Context", values: ["Peak hours", "Off-peak hours"], default: "Peak hours" },
    { id: "stOutput", type: "select", label: "Report Style", values: ["Readable report", "Scorecard"], default: "Readable report" },
    { id: "stLanguage", type: "select", label: "Output Language", values: ["English", "Hinglish"], default: "English" }
  ],
};