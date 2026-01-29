export const aiArticleGeneratorConfig = {
  slug: "ai-article-generator",
  title: "AI Article & Blog Writer",
  description: "Write professional articles and blog posts instantly using AI.",
  icon: "🖋️",
  colorClass: "bg-indigo-600",
  options: [
    { id: "tone", type: "select", label: "Writing Style", values: ["Professional", "Conversational", "Educational", "Friendly"], default: "Professional" },
    { id: "length", type: "select", label: "Article Length", values: ["Short (~500 words)", "Medium (~1000 words)", "Long (~1500 words)"], default: "Medium (~1000 words)" },
    { id: "format", type: "select", label: "Format", values: ["Markdown", "Plain Text", "HTML"], default: "Markdown" }
  ]
};

export const aiRewriterConfig = {
  slug: "ai-article-rewriter",
  title: "Rewrite My Text",
  description: "Change the wording of your text while keeping the same meaning.",
  icon: "🔄",
  colorClass: "bg-indigo-500",
  options: [
    { id: "creativity", type: "slider", label: "Creativity", min: 1, max: 10, default: 5 },
    { id: "purpose", type: "select", label: "Goal", values: ["Simplify", "Make Professional", "Make Short", "Make Long"], default: "Make Professional" }
  ]
};

export const aiGrammarConfig = {
  slug: "ai-grammar-fixer",
  title: "Correct My Grammar",
  description: "Fix all spelling and grammar mistakes in your text instantly.",
  icon: "✅",
  colorClass: "bg-indigo-700",
  options: [
    { id: "dialect", type: "select", label: "English Type", values: ["US", "UK", "AU", "CA"], default: "US" },
    { id: "strictness", type: "select", label: "Mode", values: ["Easy", "Strict (Office/School)"], default: "Strict (Office/School)" }
  ]
};

export const aiToneConverterConfig = {
  slug: "ai-tone-converter",
  title: "Change Text Tone",
  description: "Make your text sound more formal, friendly, or funny.",
  icon: "🎭",
  colorClass: "bg-violet-600",
  options: [
    { id: "targetTone", type: "select", label: "Target Tone", values: ["Formal", "Friendly", "Cold Email", "Urgent", "Witty"], default: "Formal" }
  ]
};

export const aiSeoOptimizerConfig = {
  slug: "ai-seo-optimizer",
  title: "Improve Search Ranking",
  description: "Optimize your text so it ranks higher on Google and social media.",
  icon: "🚀",
  colorClass: "bg-blue-600",
  options: [
    { id: "engine", type: "select", label: "Website", values: ["Google", "Amazon", "YouTube", "LinkedIn"], default: "Google" }
  ]
};

export const aiEmailGeneratorConfig = {
  slug: "ai-email-generator",
  title: "Write an Email for Me",
  description: "Craft high-quality emails for work, job applications, or support.",
  icon: "✉️",
  colorClass: "bg-indigo-600",
  options: [
    { id: "type", type: "select", label: "Email Type", values: ["Job Application", "Follow Up", "Resignation", "Announcement"], default: "Job Application" }
  ]
};

export const aiResumeWriterConfig = {
  slug: "ai-resume-writer",
  title: "Write Professional Resume",
  description: "Transform your job tasks into impressive bullet points for recruiters.",
  icon: "📄",
  colorClass: "bg-indigo-800",
  options: [
    { id: "seniority", type: "select", label: "Job Level", values: ["Junior", "Mid-Level", "Senior", "Executive"], default: "Mid-Level" }
  ]
};

export const aiStoryGeneratorConfig = {
  slug: "ai-story-generator",
  title: "Write a Story with AI",
  description: "Generate creative stories, characters, and plot ideas.",
  icon: "📖",
  colorClass: "bg-purple-600",
  options: [
    { id: "genre", type: "select", label: "Genre", values: ["Sci-Fi", "Fantasy", "Mystery", "Romance", "Horror"], default: "Sci-Fi" }
  ]
};

export const aiYoutubeScriptConfig = {
  slug: "ai-youtube-script",
  title: "Write Video Scripts",
  description: "Create structured scripts for YouTube videos or Reels.",
  icon: "📹",
  colorClass: "bg-red-600",
  options: [
    { id: "duration", type: "select", label: "Video Time", values: ["Short (<1m)", "Medium (5-10m)", "Long (>20m)"], default: "Medium (5-10m)" }
  ]
};

export const aiProductDescConfig = {
  slug: "ai-product-description",
  title: "Write Product Descriptions",
  description: "Write selling descriptions for your products on Shopify or Amazon.",
  icon: "🛍️",
  colorClass: "bg-indigo-500",
  options: [
    { id: "platform", type: "select", label: "App", values: ["Shopify", "Amazon", "Etsy", "Social Ads"], default: "Shopify" }
  ]
};