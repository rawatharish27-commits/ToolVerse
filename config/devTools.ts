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

export const base64Config = {
  slug: "base64-encoder-decoder",
  title: "Base64 Encoder / Decoder",
  description: "Securely encode or decode text and files using Base64. Complete privacy with local browser processing. Supports all file types up to 50MB.",
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
  ],
};

export const jwtDecoderConfig = {
  slug: "jwt-decoder",
  title: "JWT Decoder & Inspector",
  description: "Instantly decode JSON Web Tokens to inspect headers and payload data. Check expiry status and algorithm details without exposing sensitive data.",
  icon: "🔑",
  colorClass: "bg-indigo-900",
  options: [],
};

export const regexTesterConfig = {
  slug: "regex-tester",
  title: "Regex Tester & Debugger",
  description: "Live regular expression testing with group highlighting and replacement preview. Browser-native engine for maximum accuracy.",
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
