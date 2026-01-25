
export const pdfToJpgConfig = {
  slug: "pdf-to-jpg-converter",
  title: "PDF to JPG Converter",
  description: "Convert PDF pages into high-quality JPEG images locally in your browser. All pages are bundled into a ZIP file.",
  icon: "🖼️",
  colorClass: "bg-red-500",
  options: [
    { id: "quality", type: "slider", label: "Image Quality", min: 10, max: 100, default: 80 },
    { id: "dpi", type: "select", label: "Render Density", values: [72, 150, 300], default: 150 }
  ]
};

export const jpgToPdfConfig = {
  slug: "jpg-to-pdf-converter",
  title: "JPG to PDF Converter",
  description: "Merge multiple images (JPG, PNG) into a single, professional PDF document.",
  icon: "📄",
  colorClass: "bg-emerald-600",
  options: [
    { id: "pageSize", type: "select", label: "Page Size", values: ["A4", "LETTER"], default: "A4" },
    { id: "orientation", type: "select", label: "Orientation", values: ["PORTRAIT", "LANDSCAPE"], default: "PORTRAIT" },
    { id: "margin", type: "number", label: "Margin (px)", default: 20 }
  ]
};

export const pdfWatermarkConfig = {
  slug: "pdf-watermark-tool",
  title: "PDF Watermark Tool",
  description: "Protect your intellectual property by adding custom text watermarks across all pages of your PDF.",
  icon: "🛡️",
  colorClass: "bg-blue-600",
  options: [
    { id: "text", type: "text", label: "Watermark Text", default: "CONFIDENTIAL" },
    { id: "opacity", type: "slider", label: "Opacity", min: 1, max: 100, default: 30 },
    { id: "rotation", type: "slider", label: "Rotation", min: -90, max: 90, default: 45 },
    { id: "fontSize", type: "number", label: "Font Size", default: 50 }
  ]
};

// ... existing configs (pdfOpeningCheckerConfig, pdfCompatibilityConfig, etc.)
export const pdfOpeningCheckerConfig = {
  slug: "pdf-opening-checker",
  title: "Portal Opening Checker",
  description: "Diagnose why a portal refuses to open your PDF. Checks internal structure, header integrity, and security locks.",
  icon: "🚫",
  colorClass: "bg-red-600",
  options: [
    { id: "targetPortal", type: "select", label: "Target Portal", values: ["Legacy (Govt/Bank)", "Modern (Enterprise)", "Cloud (Social/Drive)"], default: "Legacy (Govt/Bank)" }
  ]
};

export const pdfCompatibilityConfig = {
  slug: "pdf-compatibility-analyzer",
  title: "Version & Standard Analyzer",
  description: "Check if your PDF is 1.4 (Legacy) or 1.7+ (Modern). Essential for strict government and judicial uploads.",
  icon: "⚙️",
  colorClass: "bg-red-700",
  options: [
    { id: "portal", type: "select", label: "Portal Type", values: ["government", "job", "bank", "university", "other"], default: "government" },
    { id: "pdfVersion", type: "number", label: "Known Version", default: 1.7 },
    { id: "encrypted", type: "toggle", label: "Is Encrypted?", default: false },
    { id: "hasForms", type: "toggle", label: "Has Forms?", default: false }
  ]
};

export const scannedPdfReadabilityConfig = {
  slug: "scanned-pdf-readability-tester",
  title: "Scanned Readability Tester",
  description: "Will an OCR bot understand your scan? Tests contrast, noise, and simulated clarity for bot acceptance.",
  icon: "🔍",
  colorClass: "bg-red-800",
  options: [
    { id: "scanQuality", type: "select", label: "Original Method", values: ["low", "medium", "high"], default: "medium" },
    { id: "portal", type: "select", label: "Target Portal", values: ["government", "job", "bank", "university", "other"], default: "government" },
    { id: "blurPresent", type: "toggle", label: "Blur Detected?", default: false }
  ]
};

export const pdfSizeIncreaseExplainerConfig = {
  slug: "pdf-size-increase-explainer",
  title: "Compression Failure Explainer",
  description: "Ever tried to compress a PDF and it got LARGER? We explain why (Fonts, Metadata, or Optimization Overhead) and provide the true fix.",
  icon: "📈",
  colorClass: "bg-red-500",
  options: [
    { id: "pdfType", type: "select", label: "PDF Type", values: ["scanned", "text", "mixed"], default: "text" },
    { id: "compressionMethod", type: "select", label: "Method Used", values: ["online-tool", "print-to-pdf", "save-as", "ocr"], default: "online-tool" },
    { id: "fontsEmbedded", type: "toggle", label: "Embedded Fonts?", default: false },
    { id: "ocrApplied", type: "toggle", label: "Applied OCR?", default: false }
  ]
};

export const pdfPrintCutoffConfig = {
  slug: "pdf-print-cutoff-predictor",
  title: "Print Cut-Off Predictor",
  description: "A4 vs Letter size mismatch is a common print error. Predict if your borders will be sliced off by standard printers.",
  icon: "✂️",
  colorClass: "bg-rose-600",
  options: [
    { id: "pageSize", type: "select", label: "Physical Paper", values: ["A4", "Letter", "Legal"], default: "A4" },
    { id: "printerType", type: "select", label: "Printer Technology", values: ["inkjet", "laser"], default: "inkjet" },
    { id: "scaling", type: "select", label: "Print Scaling", values: ["actual", "fit", "custom"], default: "actual" },
    { id: "contentNearEdges", type: "select", label: "Edge Content", values: ["none", "header", "footer", "sides"], default: "none" }
  ]
};

export const pdfFontErrorDecoderConfig = {
  slug: "font-not-supported-decoder",
  title: "Font Not Supported Error Decoder",
  description: "Decipher 'CIDFontType2' or 'Embedded Subset' errors that make PDFs look like gibberish or fail to upload.",
  icon: "🔠",
  colorClass: "bg-red-900",
  options: [
    { id: "portal", type: "select", label: "Portal Type", values: ["government", "job", "bank", "university", "other"], default: "government" },
    { id: "pdfType", type: "select", label: "PDF Type", values: ["text", "scanned", "mixed"], default: "text" },
    { id: "fontsEmbedded", type: "toggle", label: "Fonts Fully Embedded?", default: false },
    { id: "subsetFonts", type: "toggle", label: "Using Subset Fonts?", default: true }
  ]
};

export const pdfTextSelectableConfig = {
  slug: "pdf-text-selectable-checker",
  title: "Searchability Checker",
  description: "Check if your document is 'Flat' (Image) or 'Searchable' (Text). Critical for legal and research submissions.",
  icon: "🖱️",
  colorClass: "bg-red-600",
  options: []
};

export const pdfBwPreviewConfig = {
  slug: "pdf-bw-print-preview",
  title: "B&W Print Predictor",
  description: "Preview how your colored PDF looks in grayscale. Predicts if charts or highlights will vanish during physical printing.",
  icon: "🏁",
  colorClass: "bg-slate-700",
  options: [
    { id: "contentType", type: "select", label: "Content Type", values: ["text", "form", "chart", "mixed"], default: "text" },
    { id: "colorUsage", type: "select", label: "Color Usage", values: ["none", "light", "medium", "heavy"], default: "light" },
    { id: "usesHighlights", type: "toggle", label: "Uses Highlights?", default: false },
    { id: "usesLightGrayText", type: "toggle", label: "Light Gray Text?", default: false },
    { id: "thinLines", type: "toggle", label: "Colored Thin Lines?", default: false }
  ]
};

export const pdfUploadTimeConfig = {
  slug: "pdf-upload-time-estimator",
  title: "Upload Speed Estimator",
  description: "Calculate how long your PDF will take to upload on current connection and predict timeout risks.",
  icon: "⏳",
  colorClass: "bg-indigo-600",
  options: [
    { id: "fileSizeMB", type: "number", label: "File Size (MB)", default: 2 },
    { id: "uploadSpeedMbps", type: "number", label: "Upload Speed (Mbps)", default: 5 },
    { id: "portal", type: "select", label: "Target Portal", values: ["government", "job", "bank", "university", "other"], default: "government" },
    { id: "stability", type: "select", label: "Connection Stability", values: ["poor", "average", "good"], default: "average" }
  ]
};

export const pdfPageOrderConfig = {
  slug: "pdf-page-order-solver",
  title: "Page Order Genius",
  description: "Solve the 'Mixed Order' nightmare from duplex scanning or manual flatbed scans. We diagnose the flip.",
  icon: "🗂️",
  colorClass: "bg-red-800",
  options: [
    { id: "creationMethod", type: "select", label: "Creation Method", values: ["scan", "merge", "export", "print-to-pdf"], default: "scan" },
    { id: "scanType", type: "select", label: "Scan Logic", values: ["single-side", "duplex"], default: "single-side" },
    { id: "feederUsed", type: "toggle", label: "Used Auto Feeder?", default: true },
    { id: "patternObserved", type: "select", label: "Observed Pattern", values: ["reversed", "odd-even", "random"], default: "random" }
  ]
};

export const pdfCompareConfig = {
  slug: "pdf-compare-tool",
  title: "Visual PDF Compare",
  description: "Compare two PDF documents side-by-side and highlight textual differences and changes.",
  icon: "⚖️",
  colorClass: "bg-red-700",
  options: [
    { id: "diffMode", type: "select", label: "Diff Mode", values: ["Textual (Precise)", "Visual (Coming Soon)"], default: "Textual (Precise)" }
  ]
};

export const pdfOcrConfig = {
  slug: "pdf-ocr-tool",
  title: "Pro PDF OCR (Scan to Text)",
  description: "Extract editable text from scanned PDF files using high-precision local OCR technology.",
  icon: "🔍",
  colorClass: "bg-red-800",
  options: [
    { id: "language", type: "select", label: "Language", values: ["eng", "spa", "fra", "deu"], default: "eng" },
    { id: "format", type: "select", label: "Output Format", values: ["Text File", "Markdown"], default: "Text File" }
  ]
};

export const excelToPdfConfig = {
  slug: "excel-to-pdf-converter",
  title: "Excel to PDF Converter",
  description: "Convert spreadsheet workbooks (.xlsx, .csv) into professional, printable PDF documents.",
  icon: "📊",
  colorClass: "bg-emerald-600",
  options: [
    { id: "pageSize", type: "select", label: "Page Size", values: ["A4", "Letter", "Legal"], default: "A4" },
    { id: "orientation", type: "select", label: "Orientation", values: ["Portrait", "Landscape"], default: "Landscape" }
  ]
};

export const pdfCompressorConfig = {
  slug: "pdf-compressor",
  title: "Pro PDF Compressor",
  description: "Reduce PDF file size while maintaining visual integrity. Advanced local optimization engine.",
  icon: "📉",
  colorClass: "bg-red-600",
  options: [
    { id: "quality", type: "slider", label: "Image Quality (%)", min: 10, max: 100, default: 70 },
    { id: "dpi", type: "select", label: "Target DPI", values: [72, 144, 300], default: 144 },
    { id: "linearize", type: "toggle", label: "Fast Web View (Linearize)", default: true },
  ],
};

export const pdfMergerConfig = {
  slug: "pdf-merger",
  title: "Professional PDF Merger",
  description: "Combine multiple PDF files with precise page range control per file.",
  icon: "📂",
  colorClass: "bg-red-500",
  options: [
    { id: "normalizeSize", type: "select", label: "Page Size Normalization", values: ["Original Sizes", "Convert all to A4", "Convert all to Letter"], default: "Original Sizes" },
  ],
};

export const pdfSplitterConfig = {
  slug: "pdf-splitter",
  title: "Professional PDF Splitter",
  description: "Extract specific pages or separate every page into individual documents.",
  icon: "✂️",
  colorClass: "bg-rose-500",
  options: [
    { id: "mode", type: "select", label: "Split Mode", values: ["Individual Pages", "Page Range", "Custom List"], default: "Individual Pages" },
    { id: "pageRange", type: "text", label: "Pages (e.g. 1-3, 5)", default: "1" },
  ],
};

export const pdfProtectConfig = {
  slug: "pdf-password-protect",
  title: "Advanced PDF Protector",
  description: "Secure your PDF with AES-256 bit encryption and control permissions.",
  icon: "🔒",
  colorClass: "bg-red-900",
  options: [
    { id: "userPassword", type: "text", label: "Open Password", default: "" },
    { id: "allowPrint", type: "toggle", label: "Allow Printing", default: false },
  ],
};

export const pdfUnlockConfig = {
  slug: "pdf-password-remover",
  title: "PDF Password Remover",
  description: "Remove passwords and restrictions from your PDF files instantly.",
  icon: "🔓",
  colorClass: "bg-red-500",
  options: [
    { id: "password", type: "text", label: "Current Password", default: "" }
  ],
};

export const pdfMetadataConfig = {
  slug: "pdf-metadata-viewer",
  title: "PDF Metadata Inspector",
  description: "Examine hidden PDF properties including Author, Creation Date, and Producer.",
  icon: "🕵️",
  colorClass: "bg-red-800",
  options: []
};
