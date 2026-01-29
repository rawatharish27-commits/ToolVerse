export const pdfToJpgConfig = {
  slug: "pdf-to-jpg-converter",
  title: "PDF to JPG Converter",
  description: "Save every page of your PDF as a separate high-quality image file.",
  icon: "🖼️",
  colorClass: "bg-red-500",
  options: [
    { id: "quality", type: "slider", label: "Image Quality", min: 10, max: 100, default: 80 },
    { id: "dpi", type: "select", label: "Clarity (DPI)", values: [72, 150, 300], default: 150 }
  ]
};

export const jpgToPdfConfig = {
  slug: "jpg-to-pdf-converter",
  title: "JPG to PDF Converter",
  description: "Combine multiple photos (JPG/PNG) into a single clean PDF file.",
  icon: "📄",
  colorClass: "bg-emerald-600",
  options: [
    { id: "pageSize", type: "select", label: "Page Size", values: ["A4", "LETTER"], default: "A4" },
    { id: "orientation", type: "select", label: "Orientation", values: ["PORTRAIT", "LANDSCAPE"], default: "PORTRAIT" },
    { id: "margin", type: "number", label: "Border Size", default: 20 }
  ]
};

export const pdfWatermarkConfig = {
  slug: "pdf-watermark-tool",
  title: "PDF Watermark Tool",
  description: "Add a 'Confidential' label or custom text over all pages of your PDF.",
  icon: "🛡️",
  colorClass: "bg-blue-600",
  options: [
    { id: "text", type: "text", label: "Watermark Text", default: "CONFIDENTIAL" },
    { id: "opacity", type: "slider", label: "Transparency", min: 1, max: 100, default: 30 },
    { id: "rotation", type: "slider", label: "Angle", min: -90, max: 90, default: 45 },
    { id: "fontSize", type: "number", label: "Text Size", default: 50 }
  ]
};

export const pdfCompressorConfig = {
  slug: "pdf-compressor",
  title: "PDF Size Reducer (MB target)",
  description: "Make your PDF file smaller so it uploads faster on portals.",
  icon: "📉",
  colorClass: "bg-red-600",
  options: [
    { id: "quality", type: "slider", label: "Compression Strength (%)", min: 10, max: 100, default: 70 },
    { id: "dpi", type: "select", label: "Resolution (DPI)", values: [72, 144, 300], default: 144 },
  ],
};

export const pdfMergerConfig = {
  slug: "pdf-merger",
  title: "PDF Merger",
  description: "Join two or more separate PDF documents into one single file.",
  icon: "📂",
  colorClass: "bg-red-500",
  options: [
    { id: "normalizeSize", type: "select", label: "Page Size", values: ["Original Sizes", "All A4", "All Letter"], default: "Original Sizes" },
  ],
};

export const pdfSplitterConfig = {
  slug: "pdf-splitter",
  title: "PDF Splitter",
  description: "Extract one page or a specific range from a large PDF document.",
  icon: "✂️",
  colorClass: "bg-rose-500",
  options: [
    { id: "mode", type: "select", label: "Split Type", values: ["All Individual Pages", "Specific Page Range", "Selected Pages"], default: "All Individual Pages" },
    { id: "pageRange", type: "text", label: "Page Numbers (e.g. 1-3, 5)", default: "1" },
  ],
};

export const pdfProtectConfig = {
  slug: "pdf-password-protect",
  title: "PDF Password Protector",
  description: "Lock your PDF with a secret password to keep it safe from others.",
  icon: "🔒",
  colorClass: "bg-red-900",
  options: [
    { id: "userPassword", type: "text", label: "Set Password", default: "" },
    { id: "allowPrint", type: "toggle", label: "Allow Printing?", default: false },
  ],
};

export const pdfUnlockConfig = {
  slug: "pdf-password-remover",
  title: "PDF Password Remover",
  description: "Remove passwords and restrictions so you can view or print the file.",
  icon: "🔓",
  colorClass: "bg-red-500",
  options: [
    { id: "password", type: "text", label: "Current Password", default: "" }
  ],
};

export const pdfMetadataConfig = {
  slug: "pdf-metadata-viewer",
  title: "PDF Metadata Viewer",
  description: "See the author, date, and software used to create a PDF file.",
  icon: "🕵️",
  colorClass: "bg-red-800",
  options: []
};