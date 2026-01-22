export const aiImageGeneratorConfig = {
  slug: "ai-image-generator",
  title: "AI Image Studio (Prompt Pro)",
  description: "Architect high-fidelity prompts with cinematic controls for professional AI image generation models.",
  icon: "🖼️",
  colorClass: "bg-indigo-600",
  options: [
    { id: "platform", type: "select", label: "Target Platform", values: ["General AI", "Midjourney", "Stable Diffusion", "DALL-E 3"], default: "General AI" },
    { id: "quality", type: "select", label: "Prompt Detail Level", values: ["Standard", "Ultra HD", "8K Hyper-realistic"], default: "Ultra HD" },
    { id: "ar", type: "select", label: "Aspect Ratio", values: ["1:1", "16:9", "9:16", "4:3", "3:4"], default: "1:1" },
    { id: "engine", type: "select", label: "Orchestrator Mode", values: ["Creative", "Scientific", "Surreal", "Corporate"], default: "Creative" }
  ]
};

export const aiBackgroundRemoverConfig = {
  slug: "ai-background-remover",
  title: "AI Background Architect",
  description: "Generate precision instructions and masks for AI-powered background removal and replacement.",
  icon: "🪄",
  colorClass: "bg-indigo-500",
  options: [
    { id: "platform", type: "select", label: "Tool Target", values: ["General AI", "Photoshop AI", "Stable Diffusion", "Canva Pro"], default: "General AI" },
    { id: "quality", type: "select", label: "Cutout Quality", values: ["Standard", "High Quality", "Professional Cutout"], default: "High Quality" },
    { id: "edgeType", type: "select", label: "Edge Handling", values: ["Smooth", "Sharp", "Feathered", "Hair/Fine Detail"], default: "Smooth" }
  ]
};

export const aiImageEnhancerConfig = {
  slug: "ai-image-enhancer",
  title: "AI Image Enhancer (Architect)",
  description: "Generate professional AI enhancement instructions to fix blur, noise, lighting, and texture details.",
  icon: "✨",
  colorClass: "bg-violet-600",
  options: [
    { id: "style", type: "select", label: "Enhancement Style", values: ["Natural", "Cinematic", "Studio"], default: "Natural" },
    { id: "platform", type: "select", label: "Target Platform", values: ["General AI", "Photoshop AI", "Stable Diffusion", "Topaz/Upscaler"], default: "General AI" },
    { id: "mode", type: "select", label: "Processing Strategy", values: ["Realism-First", "High-Impact", "Balanced"], default: "Balanced" }
  ]
};

export const aiImageUpscalerConfig = {
  slug: "ai-image-upscaler",
  title: "AI Image Upscaler (Architect)",
  description: "Generate professional super-resolution instructions and artifact-safe prompts for high-fidelity upscaling.",
  icon: "🔍",
  colorClass: "bg-emerald-600",
  options: [
    { id: "scale", type: "select", label: "Target Scale", values: ["2x", "4x", "8x"], default: "4x" },
    { id: "platform", type: "select", label: "Target Platform", values: ["General AI", "Stable Diffusion", "Photoshop AI", "Topaz Photo AI"], default: "General AI" },
    { id: "artifact", type: "select", label: "Artifact Strategy", values: ["Avoid artifacts", "Allow mild sharpening"], default: "Avoid artifacts" }
  ]
};

export const aiImageRecolorConfig = {
  slug: "ai-image-recolor",
  title: "AI Image Recolor (Architect)",
  description: "Generate professional recoloring instructions and AI prompts to change subject colors with realistic lighting preservation.",
  icon: "🎨",
  colorClass: "bg-pink-600",
  options: [
    { id: "accuracy", type: "select", label: "Color Accuracy", values: ["High accuracy", "Balanced", "Creative"], default: "High accuracy" },
    { id: "platform", type: "select", label: "Target Platform", values: ["General AI", "Photoshop AI", "Stable Diffusion", "Canva AI"], default: "General AI" },
    { id: "renderMode", type: "select", label: "Render Engine", values: ["PBR-Aware", "Visual-Match", "Overpaint"], default: "PBR-Aware" }
  ]
};

export const aiFaceRetouchConfig = {
  slug: "ai-face-retouch",
  title: "AI Face Retouch (Architect)",
  description: "Generate professional portrait retouching instructions for natural skin, eye brightness, and expert facial lighting.",
  icon: "👤",
  colorClass: "bg-orange-600",
  options: [
    { id: "retouchLevel", type: "select", label: "Retouch Intent", values: ["Natural", "Balanced", "High-end Portrait"], default: "Natural" },
    { id: "platform", type: "select", label: "Target Platform", values: ["General AI", "Photoshop AI", "Stable Diffusion", "Canva AI"], default: "General AI" },
    { id: "texturePreservation", type: "select", label: "Skin Texture", values: ["Max Preservation", "Optimized Smoothing", "Soft Focus"], default: "Max Preservation" }
  ]
};

export const aiImageStyleTransferConfig = {
  slug: "ai-image-style-transfer",
  title: "AI Style Transfer (Architect)",
  description: "Generate professional AI instructions and prompts to apply artistic styles to images while keeping structural integrity.",
  icon: "🖌️",
  colorClass: "bg-indigo-700",
  options: [
    { id: "strength", type: "select", label: "Style Strength", values: ["Subtle", "Balanced", "Strong"], default: "Balanced" },
    { id: "platform", type: "select", label: "Target Platform", values: ["General AI", "Stable Diffusion", "Photoshop AI", "DALL-E 3"], default: "General AI" },
    { id: "detailLevel", type: "select", label: "Detail Preservation", values: ["Low", "Medium", "High"], default: "High" }
  ]
};

export const aiThumbnailGeneratorConfig = {
  slug: "ai-thumbnail-generator",
  title: "AI Thumbnail Architect",
  description: "Generate high-CTR thumbnail concepts, text layout guides, and precise AI prompts to maximize video clicks.",
  icon: "📺",
  colorClass: "bg-red-600",
  options: [
    { id: "contrast", type: "select", label: "Contrast Level", values: ["High", "Medium"], default: "High" },
    { id: "platform", type: "select", label: "Platform", values: ["YouTube", "Shorts", "Instagram", "TikTok"], default: "YouTube" },
    { id: "emotionPreset", type: "select", label: "Emotion Focus", values: ["Shock", "Curiosity", "Fear", "Joy", "Serious"], default: "Curiosity" }
  ]
};

export const aiImageCaptionConfig = {
  slug: "ai-image-caption-generator",
  title: "AI Image Caption Master",
  description: "Generate platform-optimized, high-engagement captions for your images using context-aware AI writing architecture.",
  icon: "✍️",
  colorClass: "bg-cyan-600",
  options: [
    { id: "platform", type: "select", label: "Target Platform", values: ["Instagram", "YouTube", "Facebook", "Twitter (X)", "SEO / Website", "LinkedIn"], default: "Instagram" },
    { id: "length", type: "select", label: "Caption Length", values: ["Short", "Medium", "Long"], default: "Medium" },
    { id: "emojiUsage", type: "select", label: "Emoji Style", values: ["None", "Light", "Heavy", "Business"], default: "Light" }
  ]
};

export const aiMemeGeneratorConfig = {
  slug: "ai-meme-generator",
  title: "AI Meme Architect",
  description: "Generate viral meme concepts, punchlines, and layout guidance for Instagram, Reddit, and X using trend-aware AI.",
  icon: "🤡",
  colorClass: "bg-yellow-500",
  options: [
    { id: "format", type: "select", label: "Meme Format", values: ["Single panel", "Two panel", "Multi panel"], default: "Two panel" },
    { id: "virality", type: "select", label: "Humor Risk", values: ["Safe", "Edgy"], default: "Safe" }
  ]
};