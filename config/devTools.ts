export const jsonFormatterConfig = {
  slug: "json-formatter",
  title: "JSON Formatter & Validator",
  description: "Transform messy JSON into readable, valid, and professionally formatted code. Validate syntax and minify with a single click.",
  icon: "🧩",
  colorClass: "bg-slate-800",
  options: [
    {
      id: "mode",
      type: "select",
      label: "Operation Mode",
      values: ["Format", "Minify"],
      default: "Format"
    },
    {
      id: "indent",
      type: "select",
      label: "Indentation",
      values: [2, 4],
      default: 2
    },
    {
      id: "sortKeys",
      type: "toggle",
      label: "Sort Keys Alphabetically",
      default: false
    }
  ],
};

export const htmlCssFormatterConfig = {
  slug: "html-css-formatter",
  title: "HTML / CSS Formatter",
  description: "Professionally beautify or minify your markup and stylesheets. Supports automatic language detection and inline style preservation.",
  icon: "🌈",
  colorClass: "bg-blue-600",
  options: [
    {
      id: "language",
      type: "select",
      label: "Code Language",
      values: ["Auto-Detect", "HTML", "CSS"],
      default: "Auto-Detect"
    },
    {
      id: "mode",
      type: "select",
      label: "Operation Mode",
      values: ["Beautify", "Minify"],
      default: "Beautify"
    },
    {
      id: "indent",
      type: "select",
      label: "Indent Size",
      values: [2, 4, 8],
      default: 2
    }
  ]
};

export const jsMinifierConfig = {
  slug: "js-minifier",
  title: "JavaScript Minifier",
  description: "Compress and optimize your JavaScript code for production use by removing comments, whitespace, and unnecessary characters.",
  icon: "📦",
  colorClass: "bg-amber-500",
  options: [
    {
      id: "preserveComments",
      type: "toggle",
      label: "Preserve Important Comments (/*! ... */)",
      default: false
    },
    {
      id: "removeNewlines",
      type: "toggle",
      label: "Remove Newlines",
      default: true
    },
    {
      id: "obfuscate",
      type: "toggle",
      label: "Aggressive Whitespace Removal",
      default: true
    }
  ]
};

export const base64Config = {
  slug: "base64-encoder-decoder",
  title: "Base64 Encoder / Decoder",
  description: "Securely encode or decode text and binary files using Base64. Complete privacy with local browser processing. Supports all file types up to 50MB.",
  icon: "🔐",
  colorClass: "bg-slate-700",
  options: [
    {
      id: "mode",
      type: "select",
      label: "Operation Mode",
      values: ["Encode", "Decode"],
      default: "Encode"
    },
    {
      id: "inputType",
      type: "select",
      label: "Input Type",
      values: ["Text", "File"],
      default: "Text"
    },
    {
      id: "urlSafe",
      type: "toggle",
      label: "URL Safe Base64 (+/- and /_)",
      default: false
    }
  ],
};

export const jwtDecoderConfig = {
  slug: "jwt-decoder",
  title: "JWT Decoder & Inspector",
  description: "Instantly decode JSON Web Tokens to inspect headers and payload data. Check expiry status and algorithm details securely in your browser.",
  icon: "🔑",
  colorClass: "bg-indigo-900",
  options: [
    {
      id: "showSignature",
      type: "toggle",
      label: "Show Signature Hash",
      default: true
    }
  ],
};

export const regexTesterConfig = {
  slug: "regex-tester",
  title: "Regex Tester & Debugger",
  description: "Test regular expressions with live matches, capture groups, and highlighting. Essential for developers and data processing.",
  icon: "🔎",
  colorClass: "bg-slate-900",
  options: [
    {
      id: "mode",
      type: "select",
      label: "Operation Mode",
      values: ["Match", "Replace"],
      default: "Match"
    },
    { id: "flagGlobal", type: "toggle", label: "Global (g)", default: true },
    { id: "flagIgnoreCase", type: "toggle", label: "Ignore Case (i)", default: true },
    { id: "flagMultiline", type: "toggle", label: "Multiline (m)", default: false },
    { id: "flagDotAll", type: "toggle", label: "DotAll (s)", default: false },
    { id: "flagUnicode", type: "toggle", label: "Unicode (u)", default: false },
  ],
};

export const urlEncoderConfig = {
  slug: "url-encoder-decoder",
  title: "URL Encoder / Decoder",
  description: "Safely encode or decode URLs and query parameters for web usage. Fast, private, and browser-native processing.",
  icon: "🔗",
  colorClass: "bg-blue-800",
  options: [
    {
      id: "mode",
      type: "select",
      label: "Operation Mode",
      values: ["Encode", "Decode"],
      default: "Encode"
    },
    {
      id: "scope",
      type: "select",
      label: "Processing Scope",
      values: ["Full URL", "Query Params Only"],
      default: "Full URL"
    }
  ],
};

export const apiResponseViewerConfig = {
  slug: "api-response-viewer",
  title: "API Response Viewer",
  description: "Inspect API endpoints by viewing status codes, response headers, performance timing, and body data with JSON syntax highlighting.",
  icon: "🔌",
  colorClass: "bg-indigo-500",
  options: [
    {
      id: "method",
      type: "select",
      label: "HTTP Method",
      values: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
      default: "GET"
    },
    {
      id: "includeHeaders",
      type: "toggle",
      label: "Show Response Headers",
      default: true
    }
  ],
};