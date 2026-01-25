export const fileTypeIdentifierConfig = {
  slug: "file-type-identifier",
  title: "Binary File Identifier",
  description: "Detect the true format of any file by analyzing its binary signature. Perfect for corrupted or extension-less files.",
  icon: "🔍",
  colorClass: "bg-amber-600",
  options: []
};

// ... keep existing fileFormatConverterConfig, zipExtractorConfig, etc.
export const fileFormatConverterConfig = {
  slug: "file-format-converter",
  title: "File Format Converter Pro",
  description: "Universal converter for text-based data files. Switch between JSON, CSV, XML, and YAML.",
  icon: "🔄",
  colorClass: "bg-amber-600",
  options: [
    { id: "output", type: "select", label: "Target Format", values: ["json", "csv", "xml", "yaml"], default: "json" }
  ]
};

export const zipExtractorConfig = {
  slug: "zip-file-extractor",
  title: "ZIP File Extractor",
  description: "Unpack ZIP archives instantly in your browser.",
  icon: "📂",
  colorClass: "bg-amber-700",
  options: []
};

export const zipCreatorConfig = {
  slug: "zip-file-creator",
  title: "ZIP File Creator",
  description: "Bundle multiple files into a single ZIP archive.",
  icon: "📦",
  colorClass: "bg-amber-800",
  options: []
};

export const fileConverterConfig = {
  slug: "file-converter",
  title: "Professional File Converter",
  description: "Seamlessly convert between JSON, CSV, and Text formats.",
  icon: "🔄",
  colorClass: "bg-amber-600",
  options: [
    { id: "output", type: "select", label: "Target Format", values: ["json", "csv", "txt"], default: "json" }
  ],
};

export const fileCompressorConfig = {
  slug: "file-compressor",
  title: "Pro File Compressor",
  description: "Create or extract ZIP archives instantly.",
  icon: "📦",
  colorClass: "bg-amber-700",
  options: [
    { id: "mode", type: "select", label: "Operation Mode", values: ["Create ZIP", "Extract ZIP"], default: "Create ZIP" }
  ],
};

export const fileSplitterConfig = {
  slug: "file-splitter",
  title: "Precision File Splitter",
  description: "Split large files into manageable chunks.",
  icon: "✂️",
  colorClass: "bg-amber-800",
  options: [
    { id: "mode", type: "select", label: "Split Mode", values: ["By Size", "By Parts"], default: "By Size" }
  ],
};

export const fileMergerConfig = {
  slug: "file-merger",
  title: "Seamless File Merger",
  description: "Recombine split file parts into their original binary form.",
  icon: "🧩",
  colorClass: "bg-amber-900",
  options: [
    { id: "autoSort", type: "toggle", label: "Auto-Sort Parts (Numeric)", default: true },
  ],
};

export const fileHashConfig = {
  slug: "file-hash-generator",
  title: "File Hash Generator",
  description: "Generate MD5, SHA-1, and SHA-256 hashes for any file to verify integrity.",
  icon: "🔐",
  colorClass: "bg-amber-950",
  options: [
    { id: "md5", type: "toggle", label: "Generate MD5", default: true },
    { id: "sha1", type: "toggle", label: "Generate SHA-1", default: true },
    { id: "sha256", type: "toggle", label: "Generate SHA-256", default: true }
  ],
};