export const audioConverterConfig = {
  slug: "audio-converter",
  title: "Pro Audio Converter",
  description: "Convert audio files between MP3, WAV, AAC, and OGG formats with professional quality control.",
  icon: "🎧",
  colorClass: "bg-blue-500",
  options: [
    { id: "format", type: "select", label: "Output Format", values: ["mp3", "wav", "aac", "ogg"], default: "mp3" },
    { id: "bitrate", type: "select", label: "Bitrate", values: ["64k", "128k", "192k", "256k", "320k"], default: "192k" },
    { id: "sampleRate", type: "select", label: "Sample Rate (Hz)", values: [22050, 32000, 44100, 48000], default: 44100 },
    { id: "channels", type: "select", label: "Channels", values: ["mono", "stereo"], default: "stereo" },
  ],
};

export const audioCompressorConfig = {
  slug: "audio-compressor",
  title: "Smart Audio Compressor",
  description: "Reduce audio file size significantly while maintaining clear playback quality using advanced bitrate reduction.",
  icon: "📉",
  colorClass: "bg-blue-600",
  options: [
    { id: "bitrate", type: "select", label: "Target Bitrate", values: ["32k", "64k", "96k", "128k", "160k"], default: "64k" },
    { id: "sampleRate", type: "select", label: "Sample Rate (Hz)", values: [16000, 22050, 32000, 44100], default: 22050 },
    { id: "channels", type: "select", label: "Channels", values: ["mono", "stereo"], default: "mono" },
    { id: "format", type: "select", label: "Output Format", values: ["mp3", "aac", "ogg"], default: "mp3" },
  ],
};

export const audioCutterConfig = {
  slug: "audio-cutter",
  title: "Precision Audio Cutter",
  description: "Cut and trim audio segments with millisecond accuracy. Supports high-speed processing without quality loss.",
  icon: "✂️",
  colorClass: "bg-blue-700",
  options: [
    { id: "start", type: "text", label: "Start Time (HH:MM:SS)", default: "00:00:00" },
    { id: "end", type: "text", label: "End Time (HH:MM:SS)", default: "00:00:10" },
    { id: "fastCopy", type: "toggle", label: "Fast Cut (No Re-encode)", default: true },
    { id: "format", type: "select", label: "Output Format", values: ["mp3", "wav", "aac", "ogg"], default: "mp3" },
  ],
};

export const audioSpeedPitchConfig = {
  slug: "audio-speed-pitch-control",
  title: "Audio Tempo & Pitch Master",
  description: "Adjust playback speed (0.5x to 2.0x) and shift pitch independently for musical or vocal editing.",
  icon: "🎹",
  colorClass: "bg-blue-600",
  options: [
    { id: "tempo", type: "slider", label: "Playback Speed (Tempo)", min: 0.5, max: 2.0, default: 1.0 },
    { id: "pitch", type: "slider", label: "Pitch Shift (Semitones)", min: -12, max: 12, default: 0 },
    { id: "format", type: "select", label: "Output Format", values: ["mp3", "wav"], default: "mp3" },
  ],
};

export const audioNoiseRemoverConfig = {
  slug: "audio-noise-remover",
  title: "AI Audio Denoiser",
  description: "Remove background hiss, hum, and environmental noise using advanced FFT spectral subtraction filters.",
  icon: "🧹",
  colorClass: "bg-blue-800",
  options: [
    { id: "strength", type: "select", label: "Noise Reduction Strength", values: ["Low", "Medium", "High"], default: "Medium" },
    { id: "format", type: "select", label: "Output Format", values: ["mp3", "wav", "aac", "ogg"], default: "mp3" },
  ],
};

export const audioMergerConfig = {
  slug: "audio-merger",
  title: "Pro Audio Merger",
  description: "Join multiple audio clips into a single seamless track. Perfect for podcasts, music mixes, and voiceovers.",
  icon: "🧩",
  colorClass: "bg-blue-900",
  options: [
    { id: "fastCopy", type: "toggle", label: "Fast Merge (No Re-encode)", default: true },
    { id: "format", type: "select", label: "Output Format", values: ["mp3", "wav", "aac", "ogg"], default: "mp3" },
  ],
};