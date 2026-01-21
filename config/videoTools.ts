export const videoCompressorConfig = {
  slug: "video-compressor",
  title: "Professional Video Compressor",
  description: "Advanced browser-side video compression. Reduce file size while preserving visual quality using high-efficiency encoding.",
  icon: "🎥",
  colorClass: "bg-purple-600",
  options: [
    { id: "resolution", type: "select", label: "Target Resolution", values: ["Original", "1080p", "720p", "480p", "360p"], default: "720p" },
    { id: "bitrate", type: "select", label: "Bitrate Preset", values: ["High", "Medium", "Low", "Ultra Low"], default: "Medium" },
    { id: "fps", type: "select", label: "Frame Rate (FPS)", values: ["Original", 60, 30, 24, 15], default: "Original" },
    { id: "format", type: "select", label: "Output Format", values: ["mp4", "webm"], default: "mp4" },
    { id: "mute", type: "toggle", label: "Mute Audio", default: false },
  ],
};

export const videoConverterConfig = {
  slug: "video-converter",
  title: "Video Converter Pro",
  description: "Convert videos between MP4, WebM, and GIF online. Control resolution and audio tracks with browser-side processing.",
  icon: "🔄",
  colorClass: "bg-purple-500",
  options: [
    { id: "format", type: "select", label: "Output Format", values: ["mp4", "webm", "gif"], default: "mp4" },
    { id: "resolution", type: "select", label: "Resolution", values: ["Original", "1080p", "720p", "480p"], default: "Original" },
    { id: "audio", type: "toggle", label: "Keep Audio", default: true },
  ],
};

export const videoTrimmerConfig = {
  slug: "video-trimmer",
  title: "Video Trimmer Studio",
  description: "Cut and trim videos with millisecond precision. Fast browser-side processing with optional stream-copy support.",
  icon: "🎬",
  colorClass: "bg-purple-700",
  options: [
    { id: "start", type: "text", label: "Start Time (HH:MM:SS)", default: "00:00:00" },
    { id: "end", type: "text", label: "End Time (HH:MM:SS)", default: "00:00:10" },
    { id: "fastCopy", type: "toggle", label: "Fast Trim (No Re-encode)", default: true },
    { id: "format", type: "select", label: "Output Format", values: ["mp4", "webm"], default: "mp4" },
  ],
};

export const videoMergerConfig = {
  slug: "video-merger",
  title: "Video Merger Pro",
  description: "Merge multiple video files into a single seamless video. Perfect for combining clips, reels, or social media assets.",
  icon: "🎞️",
  colorClass: "bg-purple-800",
  options: [
    { id: "fastCopy", type: "toggle", label: "Fast Merge (No Re-encode)", default: true },
    { id: "format", type: "select", label: "Output Format", values: ["mp4", "webm"], default: "mp4" },
  ],
};

export const videoToGifConfig = {
  slug: "video-to-gif-high-res",
  title: "Video to GIF Studio",
  description: "Generate high-resolution animated GIFs from any video segment with optimized color palettes and loop control.",
  icon: "🎞️",
  colorClass: "bg-pink-600",
  options: [
    { id: "start", type: "text", label: "Start Time (HH:MM:SS)", default: "00:00:00" },
    { id: "duration", type: "number", label: "Duration (seconds)", default: 5 },
    { id: "fps", type: "select", label: "GIF Frame Rate", values: [5, 10, 15, 20, 24], default: 15 },
    { id: "width", type: "select", label: "Output Width", values: [320, 480, 640, 800], default: 480 },
    { id: "loop", type: "toggle", label: "Infinite Loop", default: true },
  ],
};