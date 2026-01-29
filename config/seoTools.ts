export const seoTitleCheckerConfig = {
  slug: "seo-title-length-checker",
  title: "Check SEO Title Length",
  description: "Check if your page title is optimized for Google Search. Ensures it stays within the pixel limit to avoid truncation.",
  icon: "📛",
  colorClass: "bg-blue-600",
  options: []
};

export const seoMetaCheckerConfig = {
  slug: "meta-description-length-checker",
  title: "Check Meta Description",
  description: "Validate meta description length. Keep your snippets engaging and fully visible in search results.",
  icon: "📝",
  colorClass: "bg-indigo-600",
  options: []
};

export const serpPreviewToolConfig = {
  slug: "serp-snippet-preview-tool",
  title: "Preview Google Search Result",
  description: "Visualize how your title, URL, and meta description look in Google Search results instantly.",
  icon: "👁️",
  colorClass: "bg-emerald-600",
  options: [
    { id: "description", type: "text", label: "Meta Description", default: "" },
    { id: "url", type: "text", label: "Page URL", default: "https://yoursite.com/page-title" }
  ]
};

export const internalLinkGeneratorConfig = {
  slug: "internal-link-generator",
  title: "Generate Internal Link Suggestions",
  description: "Generate natural internal linking suggestions based on your target keyword and page structure.",
  icon: "🔗",
  colorClass: "bg-cyan-600",
  options: []
};

export const keywordDifficultyConfig = {
  slug: "keyword-difficulty-checker",
  title: "Check Keyword Difficulty",
  description: "Analyze how hard it is to rank for a keyword based on search volume and competition heuristics.",
  icon: "🏔️",
  colorClass: "bg-slate-700",
  options: []
};

export const keywordDensityConfig = {
  slug: "keyword-density-checker",
  title: "Analyze Keyword Density",
  description: "Analyze word frequency and density to avoid over-optimization and keyword stuffing.",
  icon: "📊",
  colorClass: "bg-indigo-500",
  options: [
    { id: "ignoreCommon", type: "toggle", label: "Ignore Stopwords", default: true }
  ]
};

export const robotsTxtConfig = {
  slug: "robots-txt-generator",
  title: "Generate Robots.txt",
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
  title: "Generate XML Sitemap",
  description: "Create a search-engine ready XML sitemap for your website URLs.",
  icon: "🗺️",
  colorClass: "bg-orange-600",
  options: [
    { id: "priority", type: "select", label: "Priority", values: ["0.5", "0.8", "1.0"], default: "0.8" },
    { id: "changefreq", type: "select", label: "Frequency", values: ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"], default: "weekly" }
  ]
};

export const faqSchemaConfig = {
  slug: "faq-schema-generator",
  title: "Generate FAQ Schema",
  description: "Generate valid JSON-LD FAQ schema for rich results in Google Search.",
  icon: "❓",
  colorClass: "bg-indigo-700",
  options: []
};

export const breadcrumbSchemaConfig = {
  slug: "breadcrumb-schema-generator",
  title: "Generate Breadcrumb Schema",
  description: "Create structured data for breadcrumbs to improve site hierarchy in SERPs.",
  icon: "🍞",
  colorClass: "bg-amber-600",
  options: []
};