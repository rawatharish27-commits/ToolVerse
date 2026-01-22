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

export const videoThumbnailConfig = {
  slug: "video-thumbnail-extractor",
  title: "Video Thumbnail Extractor",
  description: "Extract perfect high-quality still frames from any point in your video. Ideal for YouTube thumbnails and social media.",
  icon: "🖼️",
  colorClass: "bg-purple-600",
  options: [
    { id: "time", type: "text", label: "Extract at (HH:MM:SS)", default: "00:00:01" },
    { id: "format", type: "select", label: "Image Format", values: ["jpg", "png"], default: "jpg" },
    { id: "scale", type: "select", label: "Image Resolution", values: ["Source", "1080p", "720p"], default: "Source" },
  ],
};

export const videoAudioExtractorConfig = {
  slug: "video-audio-extractor",
  title: "Video Audio Extractor",
  description: "Extract clear audio tracks from video files without re-encoding when possible. High-fidelity output.",
  icon: "🎵",
  colorClass: "bg-indigo-600",
  options: [
    { id: "format", type: "select", label: "Audio Format", values: ["mp3", "wav", "aac"], default: "mp3" },
    { id: "bitrate", type: "select", label: "Bitrate", values: ["320k", "192k", "128k"], default: "320k" },
  ],
};

export const videoSpeedConfig = {
  slug: "video-speed-controller",
  title: "Video Speed Master",
  description: "Change video playback speed precisely. Supports slow-motion (0.25x) and fast-motion (up to 4x).",
  icon: "⏩",
  colorClass: "bg-purple-700",
  options: [
    { id: "speed", type: "select", label: "Speed Multiplier", values: ["0.25", "0.5", "1.25", "1.5", "2.0", "3.0", "4.0"], default: "2.0" },
    { id: "pitch", type: "toggle", label: "Maintain Audio Pitch", default: true },
  ],
};