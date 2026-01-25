
export const charCounterConfig = {
  slug: "character-counter",
  title: "Pro Character Counter",
  description: "Real-time character counting with support for space exclusion and whitespace analysis.",
  icon: "🔢",
  colorClass: "bg-pink-500",
  options: []
};

export const wordCounterConfig = {
  slug: "word-counter",
  title: "Word Counter Pro",
  description: "Advanced word count analysis including reading speed and keyword density insights.",
  icon: "📝",
  colorClass: "bg-indigo-600",
  options: []
};

export const caseConverterConfig = {
  slug: "text-case-converter",
  title: "Pro Case Converter",
  description: "Instantly transform text between UPPER, lower, camelCase, snake_case, and Title Case.",
  icon: "🔡",
  colorClass: "bg-violet-600",
  options: [
    { id: "mode", type: "select", label: "Target Case", values: ["UPPERCASE", "lowercase", "Title Case", "Sentence case", "camelCase", "snake_case"], default: "UPPERCASE" }
  ]
};

export const dateDiffConfig = {
  slug: "date-difference-calculator",
  title: "Date Duration Finder",
  description: "Calculate exact days, weeks, and months between two dates with high precision.",
  icon: "📅",
  colorClass: "bg-pink-500",
  options: [
    { id: "endDate", type: "text", label: "End Date (YYYY-MM-DD)", default: new Date().toISOString().split('T')[0] }
  ]
};

export const fileSizeConfig = {
  slug: "file-size-converter",
  title: "Universal File Size Converter",
  description: "Convert between Bytes, KB, MB, GB and TB with standard binary base-1024 math.",
  icon: "💾",
  colorClass: "bg-slate-700",
  options: [
    { id: "fromUnit", type: "select", label: "Input Unit", values: ["Bytes", "KB", "MB", "GB", "TB"], default: "MB" }
  ]
};

export const uuidGeneratorConfig = {
  slug: "uuid-generator",
  title: "UUID v4 Generator",
  description: "Generate RFC-compliant cryptographically secure unique identifiers for developers.",
  icon: "🆔",
  colorClass: "bg-pink-800",
  options: [
    { id: "count", type: "slider", label: "Quantity", min: 1, max: 50, default: 5 }
  ]
};

export const qrCodeConfig = {
  slug: "qr-code-generator",
  title: "QR Code Architect",
  description: "Create high-resolution offline QR codes for any link, text, or contact information instantly.",
  icon: "🏁",
  colorClass: "bg-emerald-600",
  options: []
};

export const urlEncoderConfig = {
  slug: "url-encoder-decoder",
  title: "Pro URL Transcoder",
  description: "Safely encode or decode URL components to ensure web compatibility and data integrity.",
  icon: "🔗",
  colorClass: "bg-blue-800",
  options: [
    { id: "mode", type: "select", label: "Operation", values: ["Encode", "Decode"], default: "Encode" }
  ]
};

export const passwordStrengthConfig = {
  slug: "password-strength-checker",
  title: "Password Strength Auditor",
  description: "Audit the security entropy of your credentials. No data is sent to servers.",
  icon: "🔐",
  colorClass: "bg-indigo-900",
  options: []
};

// --- Maintenance of diagnostic tools ---
export const internetSlowConfig = { slug: "internet-slow-analyzer", title: "Slow Internet Analyzer", description: "Diagnose why your 100Mbps line feels like 1Mbps.", icon: "🌐", colorClass: "bg-indigo-600", options: [{ id: "connectionType", type: "select", label: "Connection", values: ["Wi-Fi", "Mobile Data", "Ethernet"], default: "Wi-Fi" }] };
export const upDownExplainerConfig = { slug: "upload-download-explainer", title: "Upload vs Download Explainer", description: "Why is uploading so much slower?", icon: "⏳", colorClass: "bg-indigo-500", options: [] };
export const appInstallConfig = { slug: "app-install-checker", title: "App Install Compatibility", description: "Checks APK requirements against device specs.", icon: "📲", colorClass: "bg-indigo-700", options: [{ id: "os", type: "select", label: "Your OS", values: ["Android 11+", "iOS 15+", "Legacy"], default: "Android 11+" }] };
export const fileCorruptionConfig = { slug: "file-corruption-predictor", title: "File Corruption Risk Predictor", description: "Checksum stability models.", icon: "❌", colorClass: "bg-indigo-800", options: [{ id: "transferMethod", type: "select", label: "Transfer Method", values: ["USB 2.0", "Cloud Sync", "Email Attachment", "FTP"], default: "Cloud Sync" }] };
export const otpAnalyzerConfig = { slug: "otp-not-coming-analyzer", title: "OTP Delivery Trace", description: "Find out if DND or filters are blocking OTPs.", icon: "💬", colorClass: "bg-indigo-900", options: [] };
export const emailBounceConfig = { slug: "email-bounce-decoder", title: "Email Bounce Decoder", description: "Translate SMTP errors into plain English.", icon: "📨", colorClass: "bg-indigo-400", options: [] };
export const responsiveAnalyzerConfig = { slug: "responsive-layout-analyzer", title: "Mobile Layout Analyzer", description: "Viewport and flexbox issues.", icon: "📱", colorClass: "bg-indigo-600", options: [] };
export const statusDecoderConfig = { slug: "application-status-meaning-decoder", title: "Status Decoder", description: "Actionable human steps for status messages.", icon: "📄", colorClass: "bg-indigo-600", options: [{ id: "portal", type: "select", label: "Portal Type", values: ["government", "job", "bank", "university", "other"], default: "government" }, { id: "daysInStatus", type: "number", label: "Days in status", default: 5 }] };
export const formatTranslatorConfig = { slug: "wrong-format-error-translator", title: "Wrong Format Translator", description: "Identify MIME-type mismatch.", icon: "🔁", colorClass: "bg-rose-600", options: [{ id: "fileType", type: "select", label: "File to Check", values: ["photo", "pdf", "doc", "other"], default: "photo" }, { id: "extension", type: "text", label: "Claimed Extension", default: ".jpg" }] };
export const dpiConflictConfig = { slug: "dpi-size-conflict-explainer", title: "DPI vs Size Conflict", description: "Mathematical feasibility of upload specs.", icon: "📐", colorClass: "bg-indigo-800", options: [{ id: "targetKb", type: "number", label: "KB limit", default: 50 }, { id: "targetDpi", type: "number", label: "Required DPI", default: 200 }, { id: "widthCm", type: "number", label: "Width (cm)", default: 3.5 }, { id: "heightCm", type: "number", label: "Height (cm)", default: 4.5 }] };
export const govtRuleDecoderConfig = { slug: "govt-rule-decoder", title: "Govt Form Rule Decoder", description: "Exact technical upload specs.", icon: "📜", colorClass: "bg-indigo-700", options: [{ id: "preset", type: "select", label: "Exam Preset", values: ["Custom", "SSC", "UPSC", "Banking", "Passport"], default: "Custom" }] };
export const uploadRejectionConfig = { slug: "upload-rejection-analyzer", title: "Rejection Finder", description: "Identify exactly why a document was rejected.", icon: "🚫", colorClass: "bg-rose-700", options: [{ id: "uploadType", type: "select", label: "Upload Type", values: ["Photo", "Signature", "Document", "Caste"], default: "Photo" }] };
export const docReadinessConfig = { slug: "document-upload-readiness", title: "Readiness Checker", description: "Check resolution and extension.", icon: "✅", colorClass: "bg-blue-600", options: [{ id: "preset", type: "select", label: "Requirement", values: ["Standard", "Passport", "Academic"], default: "Standard" }] };
export const deviceCompatConfig = { slug: "device-compatibility-checker", title: "Compatibility Checker", description: "Audit browser capabilities.", icon: "💻", colorClass: "bg-slate-700", options: [] };
export const workingDaysConfig = { slug: "working-days-calculator", title: "Working Days Calculator", description: "Days excluding weekends.", icon: "💼", colorClass: "bg-indigo-600", options: [{ id: "excludeSat", type: "toggle", label: "Exclude Sat", default: true }] };
