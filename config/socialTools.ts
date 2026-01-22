export const socialCaptionGeneratorConfig = {
  slug: "social-caption-generator",
  title: "AI Social Caption Master",
  description: "Generate scroll-stopping captions optimized for engagement psychology across major social platforms.",
  icon: "📱",
  colorClass: "bg-cyan-600",
  options: [
    { id: "platform", type: "select", label: "Platform", values: ["Instagram", "YouTube", "X (Twitter)", "Facebook", "LinkedIn"], default: "Instagram" },
    { id: "length", type: "select", label: "Caption Length", values: ["Short", "Medium", "Long"], default: "Short" },
    { id: "emoji", type: "select", label: "Emoji Usage", values: ["None", "Light", "Heavy"], default: "Light" },
    { id: "hashtags", type: "select", label: "Include Hashtags", values: ["Yes", "No"], default: "Yes" },
    { id: "variations", type: "select", label: "Variations", values: ["3", "5"], default: "3" }
  ],
};

export const socialHashtagGeneratorConfig = {
  slug: "social-hashtag-generator",
  title: "AI Social Hashtag Architect",
  description: "Generate highly effective, platform-optimized hashtag sets to increase organic reach and discoverability.",
  icon: "🏷️",
  colorClass: "bg-cyan-500",
  options: [
    { id: "platform", type: "select", label: "Platform", values: ["Instagram", "YouTube", "X (Twitter)", "Facebook", "LinkedIn"], default: "Instagram" },
    { id: "reachMix", type: "select", label: "Reach Mix", values: ["Balanced", "High Reach", "Niche Focused"], default: "Balanced" },
    { id: "count", type: "select", label: "Hashtag Count", values: ["5", "10", "15", "20", "30"], default: "15" },
    { id: "competition", type: "select", label: "Target Competition", values: ["Low", "Medium", "High"], default: "Medium" },
    { id: "brandTag", type: "select", label: "Include Brand Tag", values: ["Include Brand Tag", "No Brand Tag"], default: "No Brand Tag" },
    { id: "language", type: "select", label: "Language", values: ["English", "Hinglish"], default: "English" }
  ],
};

export const socialBioGeneratorConfig = {
  slug: "social-bio-generator",
  title: "AI Social Bio Architect",
  description: "Generate professional, clear, and high-conversion bios optimized for major social media platforms.",
  icon: "👤",
  colorClass: "bg-cyan-700",
  options: [
    { id: "platform", type: "select", label: "Platform", values: ["Instagram", "LinkedIn", "X (Twitter)", "YouTube"], default: "Instagram" },
    { id: "tone", type: "select", label: "Tone", values: ["Professional", "Friendly", "Bold", "Witty"], default: "Professional" },
    { id: "emoji", type: "select", label: "Emoji Usage", values: ["None", "Light", "Heavy"], default: "Light" },
    { id: "length", type: "select", label: "Bio Length", values: ["Short", "Medium"], default: "Short" },
    { id: "links", type: "select", label: "Link Strategy", values: ["Single link", "Multiple links"], default: "Single link" }
  ],
};

export const socialReelIdeaGeneratorConfig = {
  slug: "social-reel-idea-generator",
  title: "AI Reel Idea Architect",
  description: "Generate viral reel concepts with hooks, scene flows, and CTAs optimized for viewer retention.",
  icon: "🎬",
  colorClass: "bg-cyan-800",
  options: [
    { id: "platform", type: "select", label: "Platform", values: ["Instagram Reels", "YouTube Shorts", "TikTok"], default: "Instagram Reels" },
    { id: "goal", type: "select", label: "Content Goal", values: ["Reach", "Followers", "Sales", "Engagement"], default: "Reach" },
    { id: "contentType", type: "select", label: "Reel Type", values: ["Educational", "Entertainment", "Storytelling", "Trend Remix"], default: "Educational" },
    { id: "length", type: "select", label: "Target Length", values: ["7–10 sec", "10–20 sec", "20–30 sec", "30–60 sec"], default: "10–20 sec" },
    { id: "hookStyle", type: "select", label: "Hook Psychology", values: ["Shock", "Curiosity", "Relatable", "Educational"], default: "Curiosity" },
    { id: "variations", type: "select", label: "Variations", values: ["3", "5"], default: "3" }
  ],
};

export const socialCommentGeneratorConfig = {
  slug: "social-comment-generator",
  title: "AI Social Comment Architect",
  description: "Generate strategic comments and replies designed to spark conversation and boost post engagement.",
  icon: "💬",
  colorClass: "bg-cyan-400",
  options: [
    { id: "platform", type: "select", label: "Platform", values: ["Instagram", "YouTube", "X (Twitter)", "Facebook", "LinkedIn"], default: "Instagram" },
    { id: "commentType", type: "select", label: "Strategy", values: ["First Comment", "Reply to Comment", "Conversation Starter", "Value Add"], default: "First Comment" },
    { id: "length", type: "select", label: "Comment Length", values: ["Short", "Medium"], default: "Short" },
    { id: "emoji", type: "select", label: "Emoji Usage", values: ["None", "Light", "Heavy"], default: "Light" },
    { id: "risk", type: "select", label: "Social Risk", values: ["Safe", "Edgy"], default: "Safe" },
    { id: "variations", type: "select", label: "Variations", values: ["3", "5"], default: "3" }
  ],
};

export const socialPostSchedulerConfig = {
  slug: "social-post-scheduler",
  title: "AI Social Post Scheduler",
  description: "Generate optimized posting schedules and content calendars for maximum organic reach and consistency.",
  icon: "🗓️",
  colorClass: "bg-cyan-600",
  options: [
    { id: "platform", type: "select", label: "Platform", values: ["Instagram", "YouTube", "X (Twitter)", "LinkedIn"], default: "Instagram" },
    { id: "goal", type: "select", label: "Primary Goal", values: ["Reach", "Followers", "Sales", "Engagement"], default: "Reach" },
    { id: "frequency", type: "select", label: "Frequency", values: ["Daily", "3x per week", "Weekly"], default: "3x per week" },
    { id: "postType", type: "select", label: "Post Mix", values: ["Reels / Shorts", "Images", "Carousels", "Mixed"], default: "Mixed" },
    { id: "timeZone", type: "select", label: "Time Zone", values: ["IST", "UTC", "EST", "PST"], default: "IST" },
    { id: "duration", type: "select", label: "Schedule For", values: ["7 days", "14 days", "30 days"], default: "7 days" },
    { id: "bestTime", type: "select", label: "Timing Mode", values: ["Auto (AI suggested)", "Morning", "Evening", "Custom"], default: "Auto (AI suggested)" },
    { id: "consistency", type: "select", label: "Pacing", values: ["Strict", "Flexible"], default: "Flexible" }
  ],
};

export const socialThumbnailPreviewerConfig = {
  slug: "social-thumbnail-previewer",
  title: "AI Social Thumbnail Previewer",
  description: "Generate visual QA and CTR analysis for thumbnails to ensure clarity and impact across social feeds.",
  icon: "👁️",
  colorClass: "bg-cyan-500",
  options: [
    { id: "platform", type: "select", label: "Platform", values: ["YouTube", "Instagram", "YouTube Shorts"], default: "YouTube" },
    { id: "face", type: "select", label: "Subject", values: ["No face", "Face with emotion"], default: "Face with emotion" },
    { id: "contrast", type: "select", label: "Contrast", values: ["High", "Medium"], default: "High" },
    { id: "textSize", type: "select", label: "Text Size", values: ["Large", "Medium"], default: "Large" },
    { id: "clutter", type: "select", label: "Clutter Level", values: ["Minimal", "Busy"], default: "Minimal" },
    { id: "device", type: "select", label: "View Device", values: ["Mobile", "Desktop"], default: "Mobile" }
  ],
};

export const socialImageRatioConfig = {
  slug: "social-image-ratio-tool",
  title: "AI Social Image Ratio Architect",
  description: "Generate correct aspect ratios, safe-area guidance, and crop instructions for any social platform.",
  icon: "📐",
  colorClass: "bg-cyan-600",
  options: [
    { id: "platform", type: "select", label: "Platform", values: ["Instagram Feed", "Instagram Reels", "YouTube", "YouTube Shorts", "TikTok", "LinkedIn"], default: "Instagram Reels" },
    { id: "contentType", type: "select", label: "Content Type", values: ["Image", "Video"], default: "Video" },
    { id: "orientation", type: "select", label: "Target Orientation", values: ["Portrait", "Square", "Landscape"], default: "Portrait" },
    { id: "priorityArea", type: "select", label: "Focus Point", values: ["Center", "Top", "Bottom"], default: "Center" },
    { id: "textSafe", type: "select", label: "Text Safe Area", values: ["Yes", "No"], default: "Yes" },
    { id: "faceSafe", type: "select", label: "Face Safe Area", values: ["Yes", "No"], default: "Yes" },
    { id: "exportQuality", type: "select", label: "Export Standard", values: ["High", "Standard"], default: "High" },
    { id: "compression", type: "select", label: "Compression level", values: ["Low", "Medium"], default: "Low" },
    { id: "batch", type: "select", label: "Batch Mode", values: ["Single", "Multiple"], default: "Single" }
  ],
};

export const socialEmojiPickerConfig = {
  slug: "social-emoji-picker",
  title: "AI Social Emoji Architect",
  description: "Generate platform-aware, context-sensitive emoji recommendations for any social media copy.",
  icon: "😀",
  colorClass: "bg-cyan-400",
  options: [
    { id: "platform", type: "select", label: "Platform", values: ["Instagram", "YouTube", "X (Twitter)", "LinkedIn"], default: "Instagram" },
    { id: "tone", type: "select", label: "Desired Tone", values: ["Professional", "Friendly", "Funny", "Emotional"], default: "Friendly" },
    { id: "purpose", type: "select", label: "Primary Purpose", values: ["Engagement", "Clarity", "CTA Boost"], default: "Engagement" },
    { id: "density", type: "select", label: "Emoji Density", values: ["None", "Light", "Medium"], default: "Light" },
    { id: "position", type: "select", label: "Preferred Position", values: ["Beginning", "Middle", "End"], default: "End" },
    { id: "audience", type: "select", label: "Target Audience", values: ["General", "Gen Z", "Professional"], default: "General" },
    { id: "language", type: "select", label: "Language", values: ["English", "Hinglish"], default: "English" },
    { id: "variation", type: "select", label: "Variations", values: ["Single set", "Multiple options"], default: "Multiple options" }
  ],
};

export const socialPollCreatorConfig = {
  slug: "social-poll-creator",
  title: "AI Social Poll Architect",
  description: "Generate high-engagement poll questions, options, and posting strategies to maximize audience interaction.",
  icon: "🗳️",
  colorClass: "bg-cyan-500",
  options: [
    { id: "platform", type: "select", label: "Platform", values: ["Instagram Story", "YouTube Community", "X (Twitter)", "LinkedIn"], default: "Instagram Story" },
    { id: "goal", type: "select", label: "Primary Goal", values: ["Engagement", "Opinion", "Feedback", "Market Research"], default: "Engagement" },
    { id: "tone", type: "select", label: "Tone", values: ["Casual", "Professional", "Fun"], default: "Casual" },
    { id: "optionsCount", type: "select", label: "Number of Options", values: ["2 options", "3 options", "4 options"], default: "2 options" },
    { id: "bias", type: "select", label: "Poll Bias", values: ["Neutral", "Slightly provocative"], default: "Neutral" },
    { id: "duration", type: "select", label: "Duration", values: ["24 hours", "3 days", "7 days"], default: "24 hours" },
    { id: "language", type: "select", label: "Language", values: ["English", "Hinglish"], default: "English" },
    { id: "cta", type: "select", label: "CTA Type", values: ["Vote now", "Comment why", "No CTA"], default: "Vote now" }
  ],
};