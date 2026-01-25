export const textToDocxConfig = {
  slug: "text-to-docx-converter",
  title: "Text to DOCX Converter",
  description: "Convert plain text or Markdown into professional Microsoft Word (.docx) documents with basic styling.",
  icon: "📝",
  colorClass: "bg-blue-600",
  options: [
    { id: "fontSize", type: "select", label: "Body Font Size", values: [10, 11, 12, 14], default: 12 },
    { id: "margins", type: "select", label: "Margins", values: ["Standard (1in)", "Narrow (0.5in)"], default: "Standard (1in)" }
  ]
};

export const docxMetadataConfig = {
  slug: "docx-metadata-viewer",
  title: "DOCX Metadata Viewer",
  description: "Examine hidden document properties like Author, Created Date, and Last Modified from Word files.",
  icon: "🕵️",
  colorClass: "bg-blue-700",
  options: []
};

// ... existing invoiceGeneratorConfig, resumeBuilderConfig, etc.
export const invoiceGeneratorConfig = {
  slug: "invoice-generator",
  title: "Professional Invoice Generator",
  description: "Create professional business invoices via AI.",
  icon: "🧾",
  colorClass: "bg-slate-800",
  options: [
    { id: "currency", type: "select", label: "Currency", values: ["USD ($)", "INR (₹)"], default: "INR (₹)" }
  ]
};

export const resumeBuilderConfig = {
  slug: "resume-builder",
  title: "AI Resume Builder",
  description: "Build ATS-friendly professional resumes.",
  icon: "📄",
  colorClass: "bg-slate-900",
  options: []
};

export const wordCounterConfig = {
  slug: "word-counter",
  title: "Advanced Word Counter",
  description: "Comprehensive text analysis with word frequency.",
  icon: "📝",
  colorClass: "bg-blue-600",
  options: []
};

export const characterCounterConfig = {
  slug: "character-counter",
  title: "Pro Character Counter",
  description: "Real-time character counting.",
  icon: "🔢",
  colorClass: "bg-indigo-500",
  options: []
};

export const textCleanerConfig = {
  slug: "text-cleaner",
  title: "Professional Text Cleaner",
  description: "Sanitize and normalize messy text.",
  icon: "🧹",
  colorClass: "bg-cyan-600",
  options: []
};

export const caseConverterConfig = {
  slug: "case-converter",
  title: "Case Converter",
  description: "Transform text between UPPERCASE, lowercase, and more.",
  icon: "🔡",
  colorClass: "bg-violet-600",
  options: []
};

export const findReplaceConfig = {
  slug: "find-and-replace",
  title: "Find & Replace",
  description: "Search and replace text instantly.",
  icon: "🔍",
  colorClass: "bg-blue-700",
  options: []
};

export const duplicateRemoverConfig = {
  slug: "duplicate-line-remover",
  title: "Duplicate Line Remover",
  description: "Clean up lists by removing duplicate lines.",
  icon: "👯",
  colorClass: "bg-indigo-600",
  options: []
};

export const ttsConfig = {
  slug: "text-to-speech-reader",
  title: "AI Voice Reader (TTS)",
  description: "Transform written text into natural human speech.",
  icon: "🗣️",
  colorClass: "bg-indigo-600",
  options: []
};

export const textCompareConfig = {
  slug: "text-compare",
  title: "Visual Diff Checker",
  description: "Compare two versions of text side-by-side.",
  icon: "⚖️",
  colorClass: "bg-indigo-700",
  options: []
};