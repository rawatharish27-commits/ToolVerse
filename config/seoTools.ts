export const seoTitleCheckerConfig = {
  slug: "seo-title-length-checker",
  title: "SEO Title Length Checker",
  description: "Check if your page title is optimized for Google Search. Ensures it stays within the pixel limit to avoid truncation.",
  icon: "📛",
  colorClass: "bg-blue-600",
  options: [
    { id: "device", type: "select", label: "Preview Device", values: ["Mobile (600px)", "Desktop (580px)"], default: "Desktop (580px)" }
  ]
};

export const seoMetaCheckerConfig = {
  slug: "meta-description-length-checker",
  title: "Meta Description Checker",
  description: "Validate meta description length. Keep your snippets engaging and fully visible in search results.",
  icon: "📝",
  colorClass: "bg-indigo-600",
  options: []
};

export const serpPreviewToolConfig = {
  slug: "serp-snippet-preview-tool",
  title: "SERP Snippet Preview",
  description: "Visualize how your title, URL, and meta description look in Google Search results instantly.",
  icon: "👁️",
  colorClass: "bg-emerald-600",
  options: [
    { id: "viewMode", type: "select", label: "View Mode", values: ["Desktop", "Mobile"], default: "Desktop" },
    { id: "highlightKeywords", type: "text", label: "Bold Keywords (CSV)", default: "" }
  ]
};

export const internalLinkGeneratorConfig = {
  slug: "internal-link-generator",
  title: "Internal Link Architect",
  description: "Generate natural internal linking suggestions based on your target keyword and page structure.",
  icon: "🔗",
  colorClass: "bg-cyan-600",
  options: [
    { id: "anchorStyle", type: "select", label: "Anchor Text Style", values: ["Exact Match", "Descriptive", "LSI-based"], default: "Descriptive" }
  ]
};

export const keywordDifficultyConfig = {
  slug: "keyword-difficulty-checker",
  title: "Keyword Difficulty Explorer",
  description: "Analyze how hard it is to rank for a keyword based on search volume and competition heuristics.",
  icon: "🏔️",
  colorClass: "bg-slate-700",
  options: [
    { id: "region", type: "select", label: "Target Region", values: ["Global", "India", "USA", "UK"], default: "Global" }
  ]
};

export const keywordDensityConfig = {
  slug: "keyword-density-checker",
  title: "Keyword Density Analyzer",
  description: "Analyze word frequency and density to avoid over-optimization and keyword stuffing.",
  icon: "📊",
  colorClass: "bg-indigo-500",
  options: [
    { id: "ignoreCommon", type: "toggle", label: "Ignore Stopwords (the, a, is)", default: true }
  ]
};

export const robotsTxtConfig = {
  slug: "robots-txt-generator",
  title: "Robots.txt Generator",
  description: "Generate a perfectly formatted robots.txt file to guide search engine crawlers accurately.",
  icon: "🤖",
  colorClass: "bg-slate-800",
  options: [
    { id: "allowAll", type: "toggle", label: "Allow All Bots", default: true },
    { id: "sitemapUrl", type: "text", label: "Sitemap URL", default: "https://example.com/sitemap.xml" }
  ]
};

export const xmlSitemapConfig = {
  slug: "xml-sitemap-generator",
  title: "XML Sitemap Generator",
  description: "Create a search-engine ready XML sitemap for your website URLs.",
  icon: "🗺️",
  colorClass: "bg-orange-600",
  options: [
    { id: "priority", type: "select", label: "Default Priority", values: ["0.5", "0.8", "1.0"], default: "0.8" },
    { id: "changefreq", type: "select", label: "Change Frequency", values: ["daily", "weekly", "monthly"], default: "weekly" }
  ]
};

export const faqSchemaConfig = {
  slug: "faq-schema-generator",
  title: "FAQ Schema Pro",
  description: "Generate valid JSON-LD FAQ schema for rich results in Google Search.",
  icon: "❓",
  colorClass: "bg-indigo-700",
  options: []
};

export const breadcrumbSchemaConfig = {
  slug: "breadcrumb-schema-generator",
  title: "Breadcrumb Schema Maker",
  description: "Create structured data for breadcrumbs to improve site hierarchy in SERPs.",
  icon: "🍞",
  colorClass: "bg-amber-600",
  options: []
};

// Original ones maintained for compatibility
export const aiSeoAnalyzerConfig = {
  slug: "ai-seo-analyzer",
  title: "AI SEO Content Architect",
  description: "Generate deep on-page SEO audits and content architecture plans.",
  icon: "🔍",
  colorClass: "bg-indigo-600",
  options: []
};

export const metaTagGeneratorConfig = {
  slug: "meta-tag-generator",
  title: "AI SEO Meta Tag Generator",
  description: "Generate click-worthy meta tags optimized for CTR.",
  icon: "🧠",
  colorClass: "bg-blue-600",
  options: []
};