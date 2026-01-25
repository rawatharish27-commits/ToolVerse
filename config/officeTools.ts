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

export const resumeRejectionAnalyzerConfig = {
  slug: "resume-rejection-analyzer",
  title: "Resume Rejection Reason Analyzer",
  description: "Identify exactly why your resume might be failing. Analyzes keywords, formatting, gaps, and ATS readiness.",
  icon: "🚫",
  colorClass: "bg-indigo-600",
  options: [
    { id: "targetRole", type: "text", label: "Target Job Role", default: "Software Engineer" },
    { id: "experienceYears", type: "number", label: "Years of Experience", default: 2 },
    { id: "formatType", type: "select", label: "Resume Format", values: ["Single Column", "Multi-Column", "Graphics-Heavy", "Photo-Included"], default: "Single Column" },
    { id: "hasGap", type: "toggle", label: "Has Employment Gaps?", default: false },
    { id: "containsKeywords", type: "toggle", label: "Includes JD Keywords?", default: true }
  ]
};

export const atsKeywordGapConfig = {
  slug: "ats-keyword-gap-finder",
  title: "ATS Keyword Gap Finder",
  description: "Identify missing skills and critical keywords by comparing your resume against a target job description.",
  icon: "🔍",
  colorClass: "bg-indigo-700",
  options: []
};

export const resumeFormatConfig = {
  slug: "resume-format-checker",
  title: "Format Compatibility Checker",
  description: "Test if your resume layout (columns, tables, headers) is safe for modern ATS parsing systems.",
  icon: "📋",
  colorClass: "bg-indigo-500",
  options: [
    { id: "hasColumns", type: "toggle", label: "Using Multi-Columns?", default: false },
    { id: "hasTables", type: "toggle", label: "Using Tables?", default: false },
    { id: "hasImages", type: "toggle", label: "Includes Graphics?", default: false }
  ]
};

export const experienceResolverConfig = {
  slug: "experience-dispute-resolver",
  title: "HR Experience Resolver",
  description: "Calculate total relevant years of experience including overlapping roles and career breaks.",
  icon: "⌛",
  colorClass: "bg-indigo-800",
  options: [
    { id: "totalBreakMonths", type: "number", label: "Total Career Breaks (Months)", default: 0 }
  ]
};

export const noticePeriodConfig = {
  slug: "notice-period-calculator",
  title: "Notice Period Eligibility",
  description: "Calculate your last working day and check buyout eligibility based on company resignation policy.",
  icon: "📅",
  colorClass: "bg-indigo-900",
  options: [
    { id: "policyDays", type: "number", label: "Policy Notice Days", default: 90 },
    { id: "buyoutAllowed", type: "toggle", label: "Buyout Allowed?", default: false }
  ]
};

export const resumeFilenameConfig = {
  slug: "resume-filename-checker",
  title: "Resume Filename Checker",
  description: "Is your filename professional? Check if 'Resume_Final_v2.pdf' is hurting your chances.",
  icon: "📁",
  colorClass: "bg-indigo-400",
  options: []
};

export const coverLetterOptimizerConfig = {
  slug: "cover-letter-optimizer",
  title: "Cover Letter Optimizer",
  description: "Check if your cover letter is too short for executives or too long for entry-level roles.",
  icon: "✉️",
  colorClass: "bg-indigo-600",
  options: [
    { id: "seniority", type: "select", label: "Career Level", values: ["Entry", "Mid", "Senior", "Executive"], default: "Mid" }
  ]
};

export const gapExplanationConfig = {
  slug: "gap-explanation-generator",
  title: "Career Gap Explainer",
  description: "Generate professional logic for career gaps due to health, family, or upskilling.",
  icon: "🛠️",
  colorClass: "bg-indigo-700",
  options: [
    { id: "gapReason", type: "select", label: "Primary Reason", values: ["Health", "Family Care", "Upskilling", "Travel", "Personal"], default: "Upskilling" }
  ]
};

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