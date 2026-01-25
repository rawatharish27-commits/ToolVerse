export const statusDecoderConfig = {
  slug: "application-status-meaning-decoder",
  title: "Application Status Meaning Decoder",
  description: "Decode cryptic status messages like 'Under Scrutiny' or 'Objection Raised' into actionable human steps.",
  icon: "📄",
  colorClass: "bg-indigo-600",
  options: [
    { id: "portal", type: "select", label: "Portal Type", values: ["government", "job", "bank", "university", "other"], default: "government" },
    { id: "daysInStatus", type: "number", label: "Days in this status", default: 5 }
  ]
};

export const formatTranslatorConfig = {
  slug: "wrong-format-error-translator",
  title: "“Wrong Format” Error Translator",
  description: "Identify exactly why a portal rejects your file as 'wrong format' despite having the correct extension.",
  icon: "🔁",
  colorClass: "bg-rose-600",
  options: [
    { id: "fileType", type: "select", label: "File to Check", values: ["photo", "pdf", "doc", "other"], default: "photo" },
    { id: "extension", type: "text", label: "Claimed Extension (e.g. .jpg)", default: ".jpg" }
  ]
};

export const dpiConflictConfig = {
  slug: "dpi-size-conflict-explainer",
  title: "DPI vs Size Conflict Explainer",
  description: "Portals often demand high DPI but low file size. This tool calculates the mathematical feasibility and finds the 'Sweet Spot' dimensions.",
  icon: "📐",
  colorClass: "bg-indigo-800",
  options: [
    { id: "targetKb", type: "number", label: "Target KB limit", default: 50 },
    { id: "targetDpi", type: "number", label: "Required DPI", default: 200 },
    { id: "widthCm", type: "number", label: "Width (cm)", default: 3.5 },
    { id: "heightCm", type: "number", label: "Height (cm)", default: 4.5 }
  ]
};

export const govtRuleDecoderConfig = {
  slug: "govt-rule-decoder",
  title: "Govt Form File Rule Decoder",
  description: "Paste a job notification or select an exam to get the exact technical upload specs (Size, DPI, Dimensions).",
  icon: "📜",
  colorClass: "bg-indigo-700",
  options: [
    { id: "preset", type: "select", label: "Select Exam Preset", values: ["Custom (Paste Text)", "SSC (Staff Selection)", "UPSC / IAS", "Banking (IBPS/SBI)", "Passport Seva"], default: "Custom (Paste Text)" },
    { id: "fileType", type: "select", label: "File to Check", values: ["Photograph", "Signature", "Caste/EWS Certificate"], default: "Photograph" }
  ]
};

export const uploadRejectionConfig = {
  slug: "upload-rejection-analyzer",
  title: "Upload Rejection Reason Finder",
  description: "Identify exactly why your document, photo, or signature was rejected by portals and get the specific fix.",
  icon: "🚫",
  colorClass: "bg-rose-700",
  options: [
    { id: "uploadType", type: "select", label: "Upload Type", values: ["Photo (Passport/ID)", "Signature", "Document (PDF)", "Caste/Income Certificate"], default: "Photo (Passport/ID)" },
    { id: "portalType", type: "select", label: "Target Portal", values: ["Govt Job (SSC/UPSC/Bank)", "Exam (JEE/NEET)", "Visa/Passport", "University/College", "Other"], default: "Govt Job (SSC/UPSC/Bank)" },
    { id: "fileSize", type: "number", label: "File Size (KB) - Optional", default: 0 },
    { id: "dimensions", type: "text", label: "Dimensions (WxH) - Optional", default: "" }
  ]
};

export const docReadinessConfig = {
  slug: "document-upload-readiness",
  title: "Upload Readiness Checker",
  description: "Check if your documents meet portal requirements (Govt, Exams, Bank). Verifies resolution, file size, and extension.",
  icon: "✅",
  colorClass: "bg-blue-600",
  options: [
    { id: "preset", type: "select", label: "Target Requirement", values: ["Standard (200KB)", "Passport (500KB)", "Academic (1MB)"], default: "Standard (200KB)" }
  ]
};

export const deviceCompatConfig = {
  slug: "device-compatibility-checker",
  title: "System Compatibility Checker",
  description: "Audit your browser and device capabilities. Verifies hardware acceleration, screen depth, and OS architecture.",
  icon: "💻",
  colorClass: "bg-slate-700",
  options: []
};

export const workingDaysConfig = {
  slug: "working-days-calculator",
  title: "Working Days Calculator",
  description: "Calculate the exact number of business days between two dates, excluding weekends and public holidays.",
  icon: "💼",
  colorClass: "bg-indigo-600",
  options: [
    { id: "excludeSat", type: "toggle", label: "Exclude Saturdays", default: true },
    { id: "excludeSun", type: "toggle", label: "Exclude Sundays", default: true }
  ]
};

export const timeZoneConverterConfig = {
  slug: "time-zone-converter",
  title: "Universal Time Zone Converter",
  description: "Convert time between global zones.",
  icon: "🌎",
  colorClass: "bg-indigo-600",
  options: [
    { id: "fromZone", type: "select", label: "From Zone", values: ["UTC", "Asia/Kolkata", "America/New_York"], default: "UTC" },
    { id: "toZone", type: "select", label: "To Zone", values: ["UTC", "Asia/Kolkata", "America/New_York"], default: "Asia/Kolkata" }
  ]
};

export const ageDiffConfig = {
  slug: "age-difference-calculator",
  title: "Age Difference Calculator",
  description: "Calculate the exact age gap between two people.",
  icon: "⏳",
  colorClass: "bg-pink-500",
  options: []
};

export const htmlMinifierConfig = {
  slug: "html-minifier",
  title: "Pro HTML Minifier",
  description: "Compress HTML code.",
  icon: "📉",
  colorClass: "bg-orange-600",
  options: []
};

export const cssBeautifierConfig = {
  slug: "css-beautifier",
  title: "CSS Stylesheet Beautifier",
  description: "Format messy CSS.",
  icon: "🎨",
  colorClass: "bg-blue-500",
  options: []
};

export const textSummarizerConfig = {
  slug: "text-summarizer-rule-based",
  title: "Text Summarizer (Rule-Based)",
  description: "Condense long articles into key bullet points.",
  icon: "📝",
  colorClass: "bg-indigo-700",
  options: []
};

export const countdownGeneratorConfig = {
  slug: "countdown-timer-generator",
  title: "Event Countdown Generator",
  description: "Create a live countdown timer.",
  icon: "⏱️",
  colorClass: "bg-rose-600",
  options: []
};

export const passwordStrengthConfig = {
  slug: "password-strength-checker",
  title: "Password Strength Auditor",
  description: "Check security entropy.",
  icon: "🔐",
  colorClass: "bg-pink-600",
  options: []
};

export const charCounterConfig = {
  slug: "character-counter",
  title: "Pro Character Counter",
  description: "Count characters and words.",
  icon: "🔢",
  colorClass: "bg-pink-50",
  options: []
};

export const wordCounterConfig = {
  slug: "word-counter",
  title: "Word Counter Pro",
  description: "Advanced word count analysis.",
  icon: "📝",
  colorClass: "bg-pink-100",
  options: []
};

export const caseConverterConfig = {
  slug: "text-case-converter",
  title: "Pro Case Converter",
  description: "Instantly transform text case.",
  icon: "🔡",
  colorClass: "bg-pink-600",
  options: []
};

export const dateDiffConfig = {
  slug: "date-difference-calculator",
  title: "Date Difference Calculator",
  description: "Calculate duration between dates.",
  icon: "📅",
  colorClass: "bg-pink-500",
  options: []
};

export const fileSizeConfig = {
  slug: "file-size-converter",
  title: "File Size Converter",
  description: "Convert between file size units.",
  icon: "💾",
  colorClass: "bg-pink-600",
  options: []
};

export const randomNumberConfig = {
  slug: "random-number-generator",
  title: "Random Number Generator",
  description: "Generate truly random numbers.",
  icon: "🎲",
  colorClass: "bg-pink-700",
  options: []
};

export const uuidGeneratorConfig = {
  slug: "uuid-generator",
  title: "UUID v4 Generator",
  description: "Generate unique identifiers.",
  icon: "🆔",
  colorClass: "bg-pink-800",
  options: []
};

export const qrCodeConfig = {
  slug: "qr-code-generator",
  title: "QR Code Generator",
  description: "Generate high-res QR codes.",
  icon: "🏁",
  colorClass: "bg-pink-600",
  options: []
};

export const urlEncoderConfig = {
  slug: "url-encoder-decoder",
  title: "Pro URL Encoder / Decoder",
  description: "Safely transcode URLs.",
  icon: "🔗",
  colorClass: "bg-pink-500",
  options: []
};