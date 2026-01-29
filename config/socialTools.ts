export const instagramHashtagAnalyzerConfig = {
  slug: "instagram-hashtag-analyzer",
  title: "Analyze Instagram Hashtags",
  description: "Analyze hashtag efficacy and competition. Get a mix of niche, medium, and viral tags for your post.",
  icon: "📊",
  colorClass: "bg-fuchsia-600",
  options: [
    { id: "niche", type: "text", label: "Industry/Niche", default: "Photography" },
    { id: "reachGoal", type: "select", label: "Reach Goal", values: ["Organic Growth", "Niche Community", "Viral Exploit"], default: "Organic Growth" }
  ]
};

export const reelHookGeneratorConfig = {
  slug: "reel-hook-generator",
  title: "Generate Reel Hooks",
  description: "Generate the first 3 seconds of your Reel/Short. Includes visual cues and psychological text hooks.",
  icon: "🪝",
  colorClass: "bg-cyan-500",
  options: [
    { id: "mood", type: "select", label: "Video Mood", values: ["Shocking", "Educational", "Relatable", "Storytelling"], default: "Relatable" },
    { id: "target", type: "select", label: "Target Audience", values: ["Gen-Z", "Professionals", "Entrepreneurs", "General"], default: "Gen-Z" }
  ]
};

export const youtubeIdeaGeneratorConfig = {
  slug: "youtube-video-idea-generator",
  title: "Generate YouTube Video Ideas",
  description: "Banish creator's block. Generate 10 viral video concepts based on your channel niche and trending topics.",
  icon: "💡",
  colorClass: "bg-red-600",
  options: [
    { id: "niche", type: "text", label: "Channel Niche", default: "Tech Reviews" },
    { id: "style", type: "select", label: "Content Style", values: ["Educational", "Entertainment", "Vlog", "Documentary"], default: "Educational" }
  ]
};

export const viralCaptionFormatterConfig = {
  slug: "viral-caption-formatter",
  title: "Format Viral Captions",
  description: "Turn boring text into high-engagement captions with line breaks, emojis, and a clear call-to-action.",
  icon: "✍️",
  colorClass: "bg-indigo-500",
  options: [
    { id: "tone", type: "select", label: "Engagement Tone", values: ["Hype", "Professional", "Minimalist", "Gen-Z"], default: "Hype" },
    { id: "cta", type: "select", label: "Call to Action", values: ["Link in Bio", "Comment Below", "Save for Later", "None"], default: "Comment Below" }
  ]
};

export const socialBioFormatterConfig = {
  slug: "social-media-bio-formatter",
  title: "Format Social Bio",
  description: "Craft high-conversion bios for Instagram, X, or TikTok. Professional, catchy, and within character limits.",
  icon: "👤",
  colorClass: "bg-cyan-600",
  options: [
    { id: "platform", type: "select", label: "Platform", values: ["Instagram", "Twitter (X)", "TikTok", "LinkedIn"], default: "Instagram" },
    { id: "objective", type: "select", label: "Goal", values: ["Authority", "Friendliness", "Sales/Lead Gen"], default: "Authority" }
  ]
};

export const youtubeTitleGeneratorConfig = {
  slug: "youtube-title-generator",
  title: "Generate YouTube Titles",
  description: "Generate high-CTR, SEO-optimized titles. Includes 'Clickbait' vs 'Educational' variations.",
  icon: "📛",
  colorClass: "bg-red-500",
  options: [
    { id: "keywords", type: "text", label: "Focus Keywords", default: "iPhone 16 Review" },
    { id: "intensity", type: "select", label: "Title Intensity", values: ["Safe SEO", "High CTR (Clicky)", "Extreme"], default: "High CTR (Clicky)" }
  ]
};

export const youtubeDescriptionGeneratorConfig = {
  slug: "youtube-description-generator",
  title: "Generate YouTube Descriptions",
  description: "Generate complete video descriptions with timestamps, social links, and SEO keyword density.",
  icon: "📝",
  colorClass: "bg-red-700",
  options: [
    { id: "includeTimestamps", type: "toggle", label: "Include Timestamp Placeholders", default: true },
    { id: "seoFocus", type: "select", label: "SEO Priority", values: ["Maximum", "Balanced", "Minimal"], default: "Balanced" }
  ]
};

export const instagramCaptionGeneratorConfig = {
  slug: "instagram-caption-generator",
  title: "Generate Instagram Captions",
  description: "Generate trendy, witty, or deep captions for posts and stories. Optimized for the Instagram algorithm.",
  icon: "📸",
  colorClass: "bg-fuchsia-500",
  options: [
    { id: "length", type: "select", label: "Length", values: ["Short & Sweet", "Storytelling (Long)", "Micro-blog"], default: "Short & Sweet" },
    { id: "emojiLevel", type: "select", label: "Emoji Density", values: ["Low", "Standard", "High"], default: "Standard" }
  ]
};

export const commentReplyGeneratorConfig = {
  slug: "comment-reply-generator",
  title: "Generate Comment Replies",
  description: "Maintain engagement by generating smart, thoughtful, or funny replies to your followers' comments.",
  icon: "💬",
  colorClass: "bg-cyan-400",
  options: [
    { id: "style", type: "select", label: "Reply Style", values: ["Grateful", "Funny/Sassy", "Helpful", "Professional"], default: "Grateful" },
    { id: "handleHaters", type: "toggle", label: "Anti-Troll Mode", default: false }
  ]
};

export const generalHashtagGeneratorConfig = {
  slug: "hashtag-generator",
  title: "Generate Hashtags for Posts",
  description: "Universal hashtag generator for any platform. Multi-language support and reach-based categories.",
  icon: "🏷️",
  colorClass: "bg-slate-700",
  options: [
    { id: "count", type: "select", label: "Tag Count", values: ["10", "20", "30"], default: "20" },
    { id: "platform", type: "select", label: "Primary Platform", values: ["Instagram", "LinkedIn", "Pinterest", "TikTok"], default: "Instagram" }
  ]
};