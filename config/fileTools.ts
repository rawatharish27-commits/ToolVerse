
export const fileConverterConfig = {
  slug: "file-converter",
  title: "Professional File Converter",
  description: "Seamlessly convert between JSON, CSV, and Text formats directly in your browser. Fast, secure, and privacy-focused.",
  icon: "🔄",
  colorClass: "bg-amber-600",
  options: [
    {
      id: "output",
      type: "select",
      label: "Target Format",
      values: ["json", "csv", "txt"],
      default: "json"
    },
    {
      id: "pretty",
      type: "toggle",
      label: "Pretty Print (JSON)",
      default: true
    },
    {
      id: "delimiter",
      type: "select",
      label: "CSV Delimiter",
      values: [",", ";", "|", "Tab"],
      default: ","
    },
  ],
};

export const fileCompressorConfig = {
  slug: "file-compressor",
  title: "Pro File Compressor",
  description: "Create ZIP archives from multiple files or extract existing ZIP files instantly. Zero server uploads.",
  icon: "📦",
  colorClass: "bg-amber-700",
  options: [
    {
      id: "mode",
      type: "select",
      label: "Operation Mode",
      values: ["Create ZIP", "Extract ZIP"],
      default: "Create ZIP"
    },
    {
      id: "compression",
      type: "select",
      label: "Compression Level",
      values: ["Fast", "Balanced", "Maximum"],
      default: "Balanced"
    },
  ],
};

export const fileSplitterConfig = {
  slug: "file-splitter",
  title: "Precision File Splitter",
  description: "Split large files into manageable chunks by size or number of parts. Perfect for email limits and storage management.",
  icon: "✂️",
  colorClass: "bg-amber-800",
  options: [
    {
      id: "mode",
      type: "select",
      label: "Split Mode",
      values: ["By Size", "By Parts"],
      default: "By Size"
    },
    {
      id: "chunkSizeMB",
      type: "number",
      label: "Chunk Size (MB)",
      default: 5
    },
    {
      id: "parts",
      type: "number",
      label: "Number of Parts",
      default: 2
    },
  ],
};

export const fileMergerConfig = {
  slug: "file-merger",
  title: "Seamless File Merger",
  description: "Recombine split file parts into their original binary form. Automatic sorting ensures correct assembly.",
  icon: "🧩",
  colorClass: "bg-amber-900",
  options: [
    {
      id: "autoSort",
      type: "toggle",
      label: "Auto-Sort Parts (Numeric)",
      default: true
    },
  ],
};

export const fileHashConfig = {
  slug: "file-hash-generator",
  title: "File Hash Generator",
  description: "Generate MD5, SHA-1, and SHA-256 hashes for any file. Fast, secure, and entirely browser-side processing.",
  icon: "🔐",
  colorClass: "bg-amber-950",
  options: [
    {
      id: "md5",
      type: "toggle",
      label: "Generate MD5",
      default: true
    },
    {
      id: "sha1",
      type: "toggle",
      label: "Generate SHA-1",
      default: true
    },
    {
      id: "sha256",
      type: "toggle",
      label: "Generate SHA-256",
      default: true
    },
  ],
};
