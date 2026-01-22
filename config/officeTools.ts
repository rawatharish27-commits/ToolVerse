export const wordCounterConfig = {
  slug: "word-counter",
  title: "Advanced Word Counter",
  description: "Comprehensive text analysis with word frequency, character counts, and time estimates. Perfect for editors, students, and copywriters.",
  icon: "📝",
  colorClass: "bg-blue-600",
  options: [
    {
      id: "ignoreNumbers",
      label: "Ignore Numbers",
      type: "toggle",
      default: false
    },
    {
      id: "ignorePunctuation",
      label: "Ignore Punctuation",
      type: "toggle",
      default: false
    }
  ],
};

export const characterCounterConfig = {
  slug: "character-counter",
  title: "Pro Character Counter",
  description: "Real-time character counting with social media limit validation (Twitter, Instagram, SMS) and progress tracking.",
  icon: "🔢",
  colorClass: "bg-indigo-500",
  options: [
    {
      id: "showSocial",
      label: "Show Social Limits",
      type: "toggle",
      default: true
    },
    {
      id: "countSpaces",
      label: "Count Spaces in Stats",
      type: "toggle",
      default: true
    }
  ],
};

export const textCleanerConfig = {
  slug: "text-cleaner",
  title: "Professional Text Cleaner",
  description: "Sanitize and normalize messy text. Remove extra spaces, empty lines, HTML tags, and fix punctuation issues.",
  icon: "🧹",
  colorClass: "bg-cyan-600",
  options: [
    {
      id: "collapseSpaces",
      label: "Collapse Extra Spaces",
      type: "toggle",
      default: true
    },
    {
      id: "removeLines",
      label: "Remove All Line Breaks",
      type: "toggle",
      default: false
    },
    {
      id: "removeEmptyLines",
      label: "Remove Empty Lines",
      type: "toggle",
      default: true
    },
    {
      id: "normalizeQuotes",
      label: "Normalize Quotes",
      type: "toggle",
      default: true
    },
    {
      id: "removePunctuation",
      label: "Remove Punctuation",
      type: "toggle",
      default: false
    },
    {
      id: "stripHtml",
      label: "Strip HTML Tags",
      type: "toggle",
      default: false
    }
  ],
};

export const caseConverterConfig = {
  slug: "case-converter",
  title: "Case Converter",
  description: "Transform text between UPPERCASE, lowercase, Title Case, and Sentence case instantly with professional rules.",
  icon: "🔡",
  colorClass: "bg-violet-600",
  options: [
    {
      id: "mode",
      label: "Transformation Mode",
      type: "select",
      values: ["UPPERCASE", "lowercase", "Title Case", "Sentence case", "Toggle Case"],
      default: "UPPERCASE"
    },
    {
      id: "autoCopy",
      label: "Auto-Copy on Change",
      type: "toggle",
      default: false
    }
  ],
};

export const findReplaceConfig = {
  slug: "find-and-replace",
  title: "Find & Replace",
  description: "Search for specific text or patterns using Regex and replace them instantly. Supports case sensitivity and bulk processing.",
  icon: "🔍",
  colorClass: "bg-blue-700",
  options: [
    { id: "find", type: "text", label: "Find Text", default: "" },
    { id: "replace", type: "text", label: "Replace With", default: "" },
    { id: "caseSensitive", type: "toggle", label: "Case Sensitive", default: false },
    { id: "wholeWord", type: "toggle", label: "Whole Word Match", default: false },
    { id: "useRegex", type: "toggle", label: "Use Regular Expressions", default: false },
  ],
};

export const duplicateRemoverConfig = {
  slug: "duplicate-line-remover",
  title: "Duplicate Line Remover",
  description: "Clean up lists and datasets by removing duplicate lines while preserving the original sequence.",
  icon: "👯",
  colorClass: "bg-indigo-600",
  options: [
    { id: "caseSensitive", type: "toggle", label: "Case Sensitive", default: false },
    { id: "trimLines", type: "toggle", label: "Trim Spaces Before Compare", default: true },
    { id: "removeEmpty", type: "toggle", label: "Ignore Empty Lines", default: true },
    { id: "sortOutput", type: "toggle", label: "Sort Alphabetically", default: false },
  ],
};

export const ttsConfig = {
  slug: "text-to-speech-reader",
  title: "AI Voice Reader (TTS)",
  description: "Transform written text into natural human-sounding speech. Adjust pitch, rate, and select from available system voices.",
  icon: "🗣️",
  colorClass: "bg-indigo-600",
  options: [
    {
      id: "rate",
      label: "Speech Rate",
      type: "slider",
      min: 0.5,
      max: 2,
      default: 1
    },
    {
      id: "pitch",
      label: "Voice Pitch",
      type: "slider",
      min: 0,
      max: 2,
      default: 1
    }
  ],
};

export const textCompareConfig = {
  slug: "text-compare",
  title: "Visual Diff Checker",
  description: "Compare two versions of text side-by-side. Instantly highlight additions, deletions, and modifications with professional accuracy.",
  icon: "⚖️",
  colorClass: "bg-indigo-700",
  options: [
    {
      id: "caseSensitive",
      label: "Case Sensitive",
      type: "toggle",
      default: false
    },
    {
      id: "ignoreWhitespace",
      label: "Ignore Whitespace",
      type: "toggle",
      default: true
    }
  ],
};