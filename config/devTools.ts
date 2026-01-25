export const jsonValidatorConfig = {
  slug: "json-validator",
  title: "JSON Syntax Validator",
  description: "Strict RFC-8259 compliant JSON validation. Detects syntax errors, mismatched brackets, and data type issues with precise line numbers.",
  icon: "✅",
  colorClass: "bg-slate-900",
  options: [
    { id: "strict", type: "toggle", label: "Strict Mode (No single quotes)", default: true }
  ]
};

export const jsonFormatterConfig = {
  slug: "json-formatter",
  title: "JSON Formatter & Validator",
  description: "Transform messy JSON into readable, valid, and professionally formatted code.",
  icon: "🧩",
  colorClass: "bg-slate-800",
  options: [
    { id: "indent", type: "select", label: "Indentation", values: [2, 4], default: 2 },
    { id: "sortKeys", type: "toggle", label: "Sort Keys Alphabetically", default: false }
  ],
};

export const htmlCssFormatterConfig = {
  slug: "html-css-formatter",
  title: "HTML / CSS Formatter",
  description: "Professionally beautify or minify your markup and stylesheets.",
  icon: "🌈",
  colorClass: "bg-blue-600",
  options: [
    { id: "language", type: "select", label: "Code Language", values: ["Auto-Detect", "HTML", "CSS"], default: "Auto-Detect" },
    { id: "mode", type: "select", label: "Operation Mode", values: ["Beautify", "Minify"], default: "Beautify" }
  ]
};

export const jsMinifierConfig = {
  slug: "js-minifier",
  title: "JavaScript Minifier",
  description: "Compress and optimize your JavaScript code for production use.",
  icon: "📦",
  colorClass: "bg-amber-500",
  options: [
    { id: "preserveComments", type: "toggle", label: "Preserve Comments", default: false }
  ]
};

export const base64Config = {
  slug: "base64-encoder-decoder",
  title: "Base64 Encoder / Decoder",
  description: "Securely encode or decode text and binary files using Base64.",
  icon: "🔐",
  colorClass: "bg-slate-700",
  options: [
    { id: "mode", type: "select", label: "Operation Mode", values: ["Encode", "Decode"], default: "Encode" },
    { id: "inputType", type: "select", label: "Input Type", values: ["Text", "File"], default: "Text" }
  ],
};

export const jwtDecoderConfig = {
  slug: "jwt-decoder",
  title: "JWT Decoder & Inspector",
  description: "Instantly decode JSON Web Tokens to inspect headers and payload data.",
  icon: "🔑",
  colorClass: "bg-indigo-900",
  options: [
    { id: "showSignature", type: "toggle", label: "Show Signature Hash", default: true }
  ],
};

export const regexTesterConfig = {
  slug: "regex-tester",
  title: "Regex Tester & Debugger",
  description: "Test regular expressions with live matches, capture groups, and highlighting.",
  icon: "🔎",
  colorClass: "bg-slate-900",
  options: [
    { id: "flagGlobal", type: "toggle", label: "Global (g)", default: true },
    { id: "flagIgnoreCase", type: "toggle", label: "Ignore Case (i)", default: true }
  ],
};

export const urlEncoderConfig = {
  slug: "url-encoder-decoder",
  title: "URL Encoder / Decoder",
  description: "Safely encode or decode URLs and query parameters for web usage.",
  icon: "🔗",
  colorClass: "bg-blue-800",
  options: [
    { id: "mode", type: "select", label: "Operation Mode", values: ["Encode", "Decode"], default: "Encode" }
  ],
};

export const apiResponseViewerConfig = {
  slug: "api-response-viewer",
  title: "API Response Viewer",
  description: "Inspect API endpoints by viewing status codes, response headers, and performance.",
  icon: "🔌",
  colorClass: "bg-indigo-500",
  options: [
    { id: "method", type: "select", label: "HTTP Method", values: ["GET", "POST", "PUT", "DELETE"], default: "GET" }
  ],
};