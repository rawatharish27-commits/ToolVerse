export const aiArticleGeneratorConfig = {
  slug: "ai-article-generator",
  title: "AI Article Writer Pro",
  description: "Generate structured, 1000+ word SEO articles based on a topic and target keywords.",
  icon: "🖋️",
  colorClass: "bg-indigo-600",
  options: [
    { id: "tone", type: "select", label: "Writing Tone", values: ["Professional", "Conversational", "Educational", "Persuasive"], default: "Professional" },
    { id: "length", type: "select", label: "Word Count", values: ["Short (~500)", "Medium (~1000)", "Long (~1500)"], default: "Medium (~1000)" },
    { id: "format", type: "select", label: "Output Format", values: ["Markdown", "Plain Text", "HTML"], default: "Markdown" },
    { id: "includeCTA", type: "toggle", label: "Include Call to Action", default: true }
  ]
};

export const aiRewriterConfig = {
  slug: "ai-article-rewriter",
  title: "Smart Content Rewriter",
  description: "Paraphrase and restructure content to make it unique while keeping the same core message.",
  icon: "🔄",
  colorClass: "bg-indigo-500",
  options: [
    { id: "creativity", type: "slider", label: "Creativity Level", min: 1, max: 10, default: 5 },
    { id: "purpose", type: "select", label: "Goal", values: ["Simplify", "Professionalize", "Shorten", "Expand"], default: "Professionalize" }
  ]
};

export const aiGrammarConfig = {
  slug: "ai-grammar-fixer",
  title: "Professional Proofreader",
  description: "Advanced syntax and spelling correction with detailed explanations for every fix.",
  icon: "✅",
  colorClass: "bg-indigo-700",
  options: [
    { id: "dialect", type: "select", label: "English Dialect", values: ["US", "UK", "AU", "CA"], default: "US" },
    { id: "strictness", type: "select", label: "Mode", values: ["Relaxed", "Strict (Academic)"], default: "Strict (Academic)" }
  ]
};

export const aiToneConverterConfig = {
  slug: "ai-tone-converter",
  title: "Tone Shifter",
  description: "Shift the emotional resonance of your text to match specific audience expectations.",
  icon: "🎭",
  colorClass: "bg-violet-600",
  options: [
    { id: "targetTone", type: "select", label: "Target Tone", values: ["Formal", "Friendly", "Cold Outreach", "Urgent", "Witty"], default: "Formal" }
  ]
};

export const aiSeoOptimizerConfig = {
  slug: "ai-seo-optimizer",
  title: "SEO Enhancer",
  description: "Optimize title tags, headings, and keyword placement for specific search intent.",
  icon: "🚀",
  colorClass: "bg-blue-600",
  options: [
    { id: "engine", type: "select", label: "Platform", values: ["Google", "Amazon", "YouTube", "LinkedIn"], default: "Google" }
  ]
};

export const aiEmailGeneratorConfig = {
  slug: "ai-email-generator",
  title: "AI Email Assistant",
  description: "Craft high-response emails for sales, networking, or customer support.",
  icon: "✉️",
  colorClass: "bg-indigo-600",
  options: [
    { id: "type", type: "select", label: "Email Type", values: ["Cold Outreach", "Follow Up", "Resignation", "Announcement"], default: "Cold Outreach" }
  ]
};

export const aiResumeWriterConfig = {
  slug: "ai-resume-writer",
  title: "Resume Optimizer",
  description: "Turn task lists into accomplishment-driven bullet points for top-tier hiring pipelines.",
  icon: "📄",
  colorClass: "bg-indigo-800",
  options: [
    { id: "seniority", type: "select", label: "Experience Level", values: ["Junior", "Mid-Level", "Senior", "Executive"], default: "Mid-Level" }
  ]
};

export const aiStoryGeneratorConfig = {
  slug: "ai-story-generator",
  title: "Creative Story Studio",
  description: "Collaborate with AI to build worlds, characters, and gripping narratives.",
  icon: "📖",
  colorClass: "bg-purple-600",
  options: [
    { id: "genre", type: "select", label: "Genre", values: ["Sci-Fi", "Fantasy", "Mystery", "Romance", "Horror"], default: "Sci-Fi" }
  ]
};

export const aiYoutubeScriptConfig = {
  slug: "ai-youtube-script",
  title: "Script Architect",
  description: "Generate structured scripts with timestamps, visual cues, and engagement hooks.",
  icon: "📹",
  colorClass: "bg-red-600",
  options: [
    { id: "duration", type: "select", label: "Video Length", values: ["Short (<1m)", "Medium (5-10m)", "Long (>20m)"], default: "Medium (5-10m)" }
  ]
};

export const aiProductDescConfig = {
  slug: "ai-product-description",
  title: "Commerce Copywriter",
  description: "Sell more with persuasive descriptions focusing on benefits over features.",
  icon: "🛍️",
  colorClass: "bg-indigo-500",
  options: [
    { id: "platform", type: "select", label: "Sales Platform", values: ["Shopify", "Amazon", "Etsy", "Social Ads"], default: "Shopify" }
  ]
};