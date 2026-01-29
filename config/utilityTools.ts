export const charCounterConfig = {
  slug: "character-counter",
  title: "Character Counter",
  description: "Count every character and space in your text for strict submission limits.",
  icon: "🔢",
  colorClass: "bg-pink-500",
  options: []
};

export const wordCounterConfig = {
  slug: "word-counter",
  title: "Word Counter",
  description: "Get word counts, sentence counts, and estimated reading speed.",
  icon: "📝",
  colorClass: "bg-indigo-600",
  options: []
};

export const caseConverterConfig = {
  slug: "text-case-converter",
  title: "Text Case Converter",
  description: "Instantly switch text to UPPERCASE, lowercase, or Title Case.",
  icon: "🔡",
  colorClass: "bg-violet-600",
  options: [
    { id: "mode", type: "select", label: "Target Case", values: ["UPPERCASE", "lowercase", "Title Case", "Sentence case", "camelCase", "snake_case"], default: "UPPERCASE" }
  ]
};

export const dateDiffConfig = {
  slug: "date-difference-calculator",
  title: "Date Difference Calculator",
  description: "Calculate exactly how many days, weeks, or months exist between two dates.",
  icon: "📅",
  colorClass: "bg-pink-500",
  options: [
    { id: "endDate", type: "text", label: "End Date (YYYY-MM-DD)", default: new Date().toISOString().split('T')[0] }
  ]
};

export const fileSizeConfig = {
  slug: "file-size-converter",
  title: "File Size Converter",
  description: "Convert digital storage units between Bytes, KB, MB, GB, and TB.",
  icon: "💾",
  colorClass: "bg-slate-700",
  options: [
    { id: "fromUnit", type: "select", label: "Current Unit", values: ["Bytes", "KB", "MB", "GB", "TB"], default: "MB" }
  ]
};

export const uuidGeneratorConfig = {
  slug: "uuid-generator",
  title: "UUID Generator",
  description: "Generate unique random ID codes for developers and testing.",
  icon: "🆔",
  colorClass: "bg-pink-800",
  options: [
    { id: "count", type: "slider", label: "Quantity", min: 1, max: 50, default: 5 }
  ]
};

export const qrCodeConfig = {
  slug: "qr-code-generator",
  title: "QR Code Generator",
  description: "Create high-res QR codes for website links, text, or Wi-Fi passwords.",
  icon: "🏁",
  colorClass: "bg-emerald-600",
  options: []
};

export const urlEncoderConfig = {
  slug: "url-encoder-decoder",
  title: "URL Encoder / Decoder",
  description: "Make website links safe for the browser or turn them back into readable text.",
  icon: "🔗",
  colorClass: "bg-blue-800",
  options: [
    { id: "mode", type: "select", label: "Action", values: ["Encode", "Decode"], default: "Encode" }
  ]
};

export const passwordStrengthConfig = {
  slug: "password-strength-checker",
  title: "Password Strength Checker",
  description: "Check if your password is easy to hack or truly secure using entropy analysis.",
  icon: "🔐",
  colorClass: "bg-indigo-900",
  options: []
};