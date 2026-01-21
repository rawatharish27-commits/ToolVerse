export const metaTagGeneratorConfig = {
  slug: "meta-tag-generator",
  title: "SEO Meta Tag Generator",
  description: "Generate professional meta tags for Google, Facebook, and Twitter to improve your search visibility and social sharing.",
  icon: "🧠",
  colorClass: "bg-blue-600",
  options: [
    { 
      id: "robots", 
      label: "Search Engine Bots", 
      type: "select", 
      values: ["index, follow", "noindex, nofollow", "index, nofollow", "noindex, follow"], 
      default: "index, follow" 
    },
    {
      id: "author",
      label: "Content Author",
      type: "text",
      default: "ToolVerse"
    }
  ],
};

export const keywordDensityCheckerConfig = {
  slug: "keyword-density-checker",
  title: "SEO Keyword Density Checker",
  description: "Analyze your content for keyword frequency and density to optimize for search engine rankings.",
  icon: "📊",
  colorClass: "bg-indigo-600",
  options: [
    {
      id: "filterStopWords",
      type: "toggle",
      label: "Filter Stop Words",
      default: true
    },
    {
      id: "minWordLength",
      type: "slider",
      label: "Min Word Length",
      min: 1,
      max: 10,
      default: 3
    }
  ]
};

export const robotsTxtGeneratorConfig = {
  slug: "robots-txt-generator",
  title: "Robots.txt Generator",
  description: "Create standard-compliant robots.txt files to guide search engine crawlers and protect sensitive directories.",
  icon: "🤖",
  colorClass: "bg-slate-700",
  options: [
    {
      id: "userAgent",
      label: "User-Agent",
      type: "select",
      values: ["*", "Googlebot", "Bingbot", "Baiduspider", "YandexBot"],
      default: "*"
    },
    {
      id: "crawlDelay",
      label: "Crawl Delay (Seconds)",
      type: "select",
      values: ["None", "5", "10", "20", "60"],
      default: "None"
    }
  ],
};

export const sitemapGeneratorConfig = {
  slug: "xml-sitemap-generator",
  title: "XML Sitemap Generator Pro",
  description: "Generate Google-friendly XML sitemaps for your website to ensure all your pages are indexed efficiently.",
  icon: "🗺️",
  colorClass: "bg-slate-800",
  options: [
    {
      id: "changefreq",
      label: "Change Frequency",
      type: "select",
      values: ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"],
      default: "weekly"
    },
    {
      id: "priority",
      label: "Default Priority",
      type: "select",
      values: ["1.0", "0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3", "0.2", "0.1"],
      default: "0.8"
    },
    {
      id: "includeLastMod",
      label: "Include LastMod Date",
      type: "toggle",
      default: true
    }
  ],
};

export const metaTitleGeneratorConfig = {
  slug: "meta-title-generator",
  title: "SEO Meta Title Generator",
  description: "Generate click-worthy, SEO-safe meta titles that rank higher on search engines and improve CTR.",
  icon: "🏷️",
  colorClass: "bg-indigo-500",
  options: [
    {
      id: "separator",
      label: "Separator",
      type: "select",
      values: ["|", "-", "·", ":"],
      default: "|"
    }
  ]
};

export const metaDescriptionGeneratorConfig = {
  slug: "meta-description-generator",
  title: "SEO Meta Description Generator",
  description: "Generate high-CTR meta descriptions with natural keyword placement and character count optimization.",
  icon: "📝",
  colorClass: "bg-violet-500",
  options: []
};

export const serpPreviewToolConfig = {
  slug: "serp-preview-tool",
  title: "Google SERP Preview Tool",
  description: "Visualize exactly how your page will appear in Google Search results on Desktop and Mobile.",
  icon: "👁️",
  colorClass: "bg-emerald-600",
  options: [
    {
      id: "viewMode",
      label: "Preview Device",
      type: "select",
      values: ["Desktop", "Mobile"],
      default: "Desktop"
    }
  ],
};

export const seoScoreAnalyzerConfig = {
  slug: "seo-score-analyzer",
  title: "Professional SEO Score Analyzer",
  description: "Evaluate your on-page SEO with a comprehensive scoring system and get real-time fixes for better rankings.",
  icon: "📈",
  colorClass: "bg-indigo-700",
  options: []
};

export const schemaGeneratorConfig = {
  slug: "json-ld-schema-pro",
  title: "JSON-LD Schema Maker",
  description: "Create rich snippet schemas for better search rankings.",
  icon: "💎",
  colorClass: "bg-indigo-900",
  options: []
};