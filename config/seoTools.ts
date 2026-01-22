export const aiSeoAnalyzerConfig = {
  slug: "ai-seo-analyzer",
  title: "AI SEO Content Architect",
  description: "Generate deep on-page SEO audits and content architecture plans based on user-provided text snapshots.",
  icon: "🔍",
  colorClass: "bg-indigo-600",
  options: [
    { id: "contentType", type: "select", label: "Content Type", values: ["Blog", "Landing Page", "Product Page"], default: "Blog" },
    { id: "intent", type: "select", label: "Search Intent", values: ["Informational", "Commercial", "Transactional"], default: "Informational" },
    { id: "depth", type: "select", label: "Audit Depth", values: ["Quick Audit", "Detailed Audit"], default: "Detailed Audit" },
    { id: "device", type: "select", label: "Primary Device", values: ["Mobile", "Desktop"], default: "Mobile" }
  ]
};

export const metaTagGeneratorConfig = {
  slug: "meta-tag-generator",
  title: "AI SEO Meta Tag Generator",
  description: "Generate click-worthy meta tags (Title, Description, OG, Twitter) optimized for CTR and search intent.",
  icon: "🧠",
  colorClass: "bg-blue-600",
  options: [
    { id: "pageType", type: "select", label: "Page Type", values: ["Blog", "Landing Page", "Product Page"], default: "Blog" },
    { id: "intent", type: "select", label: "Search Intent", values: ["Informational", "Commercial", "Transactional"], default: "Informational" },
    { id: "tone", type: "select", label: "Tone", values: ["Professional", "Friendly", "Persuasive"], default: "Professional" },
    { id: "length", type: "select", label: "Length Priority", values: ["Safe", "Aggressive (max CTR)"], default: "Safe" },
    { id: "social", type: "select", label: "Social Preview", values: ["Include OG + Twitter", "Only Google"], default: "Include OG + Twitter" }
  ],
};

export const keywordDensityCheckerConfig = {
  slug: "keyword-density-checker",
  title: "AI Keyword Density Expert",
  description: "Analyze your content for keyword frequency and density with actionable AI advice for optimization.",
  icon: "📊",
  colorClass: "bg-indigo-600",
  options: [
    { id: "matchType", type: "select", label: "Match Type", values: ["Exact Match", "Partial Match"], default: "Exact Match" },
    { id: "scope", type: "select", label: "Analysis Scope", values: ["Whole Content", "Headings Only"], default: "Whole Content" },
    { id: "language", type: "select", label: "Language Context", values: ["English", "Hinglish"], default: "English" },
    { id: "tolerance", type: "select", label: "AI Tolerance", values: ["Strict", "Balanced"], default: "Balanced" },
    { id: "intent", type: "select", label: "Search Intent", values: ["Informational", "Commercial", "Transactional"], default: "Informational" },
    { id: "report", type: "select", label: "Report Detail", values: ["Quick", "Detailed"], default: "Detailed" }
  ]
};

export const serpPreviewToolConfig = {
  slug: "serp-preview-tool",
  title: "AI SERP Preview Analyst",
  description: "High-fidelity Google simulation with AI-powered CTR analysis, truncation detection, and emotional resonance testing.",
  icon: "👁️",
  colorClass: "bg-emerald-600",
  options: [
    { id: "device", type: "select", label: "Preview Device", values: ["Mobile", "Desktop"], default: "Desktop" },
    { id: "intent", type: "select", label: "Target Intent", values: ["Informational", "Commercial", "Transactional", "Navigational"], default: "Informational" },
    { id: "region", type: "select", label: "Target Region", values: ["India", "US", "UK", "Global"], default: "Global" },
    { id: "emoji", type: "select", label: "Emoji Usage", values: ["Strict (None)", "Standard", "Experimental"], default: "Strict (None)" },
    { id: "date", type: "select", label: "Result Date", values: ["None", "Current Day", "Static (2025)"], default: "None" }
  ],
};

export const headingStructureCheckerConfig = {
  slug: "heading-structure-checker",
  title: "AI Heading Hierarchy Auditor",
  description: "Perform a deep structural audit of H1–H6 tags. Validate logical hierarchy and keyword distribution for maximum SEO impact.",
  icon: "🗂️",
  colorClass: "bg-blue-500",
  options: [
    { id: "contentType", type: "select", label: "Content Type", values: ["Blog", "Landing Page", "Product Page"], default: "Blog" },
    { id: "intent", type: "select", label: "Search Intent", values: ["Informational", "Commercial", "Transactional"], default: "Informational" },
    { id: "depth", type: "select", label: "Audit Depth", values: ["Quick Check", "Detailed Audit"], default: "Detailed Audit" },
    { id: "device", type: "select", label: "Device Focus", values: ["Mobile", "Desktop"], default: "Desktop" },
    { id: "readability", type: "select", label: "Readability Goal", values: ["Simple", "Balanced", "Advanced"], default: "Balanced" },
    { id: "dupH1", type: "select", label: "Duplicate H1 Check", values: ["Check Duplicate H1", "Ignore Duplicate H1"], default: "Check Duplicate H1" }
  ]
};

export const sitemapGeneratorConfig = {
  slug: "xml-sitemap-generator",
  title: "AI XML Sitemap Architect",
  description: "Architect search-engine compliant XML sitemaps with AI-powered priority mapping and protocol validation.",
  icon: "🗺️",
  colorClass: "bg-slate-800",
  options: [
    { id: "changefreq", label: "Change Frequency", type: "select", values: ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"], default: "weekly" },
    { id: "priority", label: "Default Priority", type: "select", values: ["1.0", "0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3", "0.2", "0.1"], default: "0.8" },
    { id: "includeImages", label: "Include Images", type: "select", values: ["Yes", "No"], default: "No" },
    { id: "includeVideos", label: "Include Videos", type: "select", values: ["Yes", "No"], default: "No" },
    { id: "canonicalOnly", label: "Canonical Only", type: "select", values: ["Yes", "No"], default: "Yes" },
    { id: "trailingSlash", label: "Trailing Slash", type: "select", values: ["Keep as is", "Add trailing slash", "Remove trailing slash"], default: "Keep as is" },
    { id: "protocol", label: "Protocol Force", type: "select", values: ["https", "http"], default: "https" },
    { id: "outputFormat", label: "Output Mode", type: "select", values: ["Standard XML", "Pretty XML"], default: "Pretty XML" }
  ],
};

export const robotsTxtGeneratorConfig = {
  slug: "robots-txt-generator",
  title: "AI Robots.txt Crawl Architect",
  description: "Generate high-precision crawl instructions. Prevent indexing of sensitive paths while ensuring render-critical assets (CSS/JS) stay accessible.",
  icon: "🤖",
  colorClass: "bg-slate-700",
  options: [
    { id: "blockAdmin", type: "toggle", label: "Block Admin Paths (/admin)", default: true },
    { id: "blockSearch", type: "toggle", label: "Block Internal Search", default: true },
    { id: "blockCart", type: "toggle", label: "Block Cart/Checkout", default: true },
    { id: "allowImages", type: "toggle", label: "Allow Image Crawling", default: true },
    { id: "allowCSSJS", type: "toggle", label: "Allow CSS/JS Crawling", default: true },
    { id: "botScope", type: "select", label: "Bot Scope", values: ["All bots (*)", "Googlebot Only", "AdsBot-Google"], default: "All bots (*)" }
  ],
};

export const canonicalTagCheckerConfig = {
  slug: "canonical-tag-checker",
  title: "AI Canonical Tag Architect",
  description: "Perform a deep audit of canonical implementation to prevent duplicate content issues. Verify protocol, slashes, and parameter handling.",
  icon: "🔗",
  colorClass: "bg-blue-600",
  options: [
    { id: "pageType", type: "select", label: "Page Type", values: ["Blog", "Product Page", "Category Page", "Landing Page"], default: "Blog" },
    { id: "dupRisk", type: "select", label: "Duplicate Risk", values: ["Low", "Medium", "High"], default: "Low" },
    { id: "paramHandling", type: "select", label: "Parameter Logic", values: ["Ignore parameters", "Canonicalize parameters"], default: "Canonicalize parameters" },
    { id: "slashRule", type: "select", label: "Trailing Slash", values: ["Trailing slash", "No trailing slash"], default: "No trailing slash" },
    { id: "protocol", type: "select", label: "Protocol Pref", values: ["https", "http"], default: "https" },
    { id: "indexing", type: "select", label: "Indexing Intent", values: ["Index", "Noindex"], default: "Index" },
    { id: "scope", type: "select", label: "Audit Scope", values: ["Single page", "Template-level"], default: "Single page" }
  ],
};

export const seoScoreAnalyzerConfig = {
  slug: "seo-score-analyzer",
  title: "AI SEO Score Calculator",
  description: "Evaluate your on-page SEO with a comprehensive scoring system and get real-time fixes for better rankings.",
  icon: "📈",
  colorClass: "bg-indigo-700",
  options: [
    { id: "contentType", type: "select", label: "Content Type", values: ["Blog", "Landing Page", "Product Page"], default: "Blog" },
    { id: "intent", type: "select", label: "Search Intent", values: ["Informational", "Commercial", "Transactional"], default: "Informational" },
    { id: "readability", type: "select", label: "Readability Level", values: ["Easy", "Balanced", "Advanced"], default: "Balanced" },
    { id: "headings", type: "select", label: "Heading Quality", values: ["Optimized", "Needs Improvement"], default: "Optimized" },
    { id: "internalLinks", type: "select", label: "Internal Linking", values: ["Good", "Few", "None"], default: "Good" },
    { id: "images", type: "select", label: "Image SEO", values: ["Optimized (ALT)", "Missing ALT"], default: "Optimized (ALT)" }
  ]
};

export const schemaGeneratorConfig = {
  slug: "json-ld-schema-pro",
  title: "JSON-LD Schema Maker",
  description: "Create rich snippet schemas for better search rankings.",
  icon: "💎",
  colorClass: "bg-indigo-900",
  options: []
};