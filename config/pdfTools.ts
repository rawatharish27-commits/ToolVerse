export const pdfCompressorConfig = {
  slug: "pdf-compressor",
  title: "Pro PDF Compressor",
  description: "Reduce PDF file size while maintaining visual integrity. Advanced local optimization engine.",
  icon: "📉",
  colorClass: "bg-red-600",
  options: [
    { id: "quality", type: "slider", label: "Image Quality (%)", min: 10, max: 100, default: 70 },
    { id: "dpi", type: "select", label: "Target DPI", values: [72, 144, 300], default: 144 },
    { id: "grayscale", type: "toggle", label: "Grayscale Images", default: false },
    { id: "removeMetadata", type: "toggle", label: "Strip Metadata", default: true },
    { id: "optimizeFonts", type: "toggle", label: "Subset Fonts", default: true },
    { id: "flattenForms", type: "toggle", label: "Flatten Forms", default: true },
    { id: "compressStreams", type: "toggle", label: "Stream Compression", default: true },
    { id: "removeAttachments", type: "toggle", label: "Remove Attachments", default: true },
    { id: "removeThumbnails", type: "toggle", label: "Remove Thumbnails", default: true },
    { id: "linearize", type: "toggle", label: "Fast Web View (Linearize)", default: true },
  ],
};

export const pdfSizeReducerConfig = {
  slug: "pdf-size-reducer",
  title: "PDF Size Reducer (MB Target)",
  description: "Reduce PDF file size to a specific target (1MB, 2MB, etc.) while maintaining document readability.",
  icon: "📉",
  colorClass: "bg-red-600",
  options: [
    { id: "targetMB", type: "select", label: "Target Size", values: ["1 MB", "2 MB", "5 MB", "10 MB", "Custom"], default: "2 MB" },
    { id: "customMB", type: "number", label: "Custom MB Limit", default: 2 },
    { id: "strategy", type: "select", label: "Compression Strategy", values: ["Balanced", "Aggressive", "Quality-First"], default: "Balanced" },
    { id: "dpi", type: "select", label: "Resolution (DPI)", values: [72, 150, 300], default: 150 },
    { id: "quality", type: "slider", label: "Visual Quality (%)", min: 10, max: 100, default: 80 }
  ],
};

export const pdfToImageConfig = {
  slug: "pdf-to-jpg",
  title: "Pro PDF to JPG Converter",
  description: "Convert PDF pages to high-quality JPG images. Select specific pages, control DPI, and adjust compression levels.",
  icon: "🖼️",
  colorClass: "bg-orange-600",
  options: [
    { id: "pageMode", type: "select", label: "Page Selection", values: ["All Pages", "Page Range", "Specific Pages"], default: "All Pages" },
    { id: "pageRange", type: "text", label: "Enter Pages (e.g. 1-3, 5)", default: "1" },
    { id: "quality", type: "slider", label: "JPG Quality (%)", min: 10, max: 100, default: 85 },
    { id: "dpi", type: "select", label: "Resolution (DPI)", values: [72, 150, 300, 600], default: 150 },
    { id: "zipOutput", type: "toggle", label: "Download as ZIP (Multi-page)", default: true },
  ],
};

export const pdfPageNumbersConfig = {
  slug: "pdf-page-number-adder",
  title: "PDF Page Number Adder",
  description: "Professionally add page numbers with custom formats (Roman, Fractions), ranges, and precise positioning.",
  icon: "🔢",
  colorClass: "bg-red-500",
  options: [
    { id: "position", type: "select", label: "Position", values: ["bottom-center", "bottom-left", "bottom-right", "top-center", "top-left", "top-right"], default: "bottom-center" },
    { id: "format", type: "select", label: "Number Format", values: ["number", "page-number", "fraction", "roman"], default: "number" },
    { id: "startFrom", type: "number", label: "Start From Page #", default: 1 },
    { id: "rangeStart", type: "number", label: "Only Start at Page #", default: 1 },
    { id: "rangeEnd", type: "number", label: "Stop at Page # (0 = End)", default: 0 },
    { id: "fontSize", type: "slider", label: "Font Size (px)", min: 6, max: 36, default: 12 },
    { id: "color", type: "select", label: "Text Color", values: ["#000000", "#FF0000", "#0000FF", "#808080"], default: "#000000" },
    { id: "margin", type: "slider", label: "Margin Offset (px)", min: 5, max: 100, default: 25 },
  ]
};

export const pdfWatermarkProConfig = {
  slug: "pdf-watermark-pro",
  title: "Professional PDF Watermark",
  description: "Protect and brand your PDF documents with custom text or image watermarks. Full control over opacity and placement.",
  icon: "🖋️",
  colorClass: "bg-red-800",
  options: [
    { id: "type", type: "select", label: "Watermark Type", values: ["Text", "Image (Logo)"], default: "Text" },
    { id: "text", type: "text", label: "Watermark Text", default: "CONFIDENTIAL" },
    { id: "opacity", type: "slider", label: "Opacity (%)", min: 5, max: 100, default: 20 },
    { id: "rotation", type: "slider", label: "Rotation (Deg)", min: 0, max: 360, default: 45 },
    { id: "fontSize", type: "slider", label: "Text Size", min: 10, max: 150, default: 50 },
    { id: "color", type: "select", label: "Text Color", values: ["#000000", "#FF0000", "#0000FF", "#808080"], default: "#808080" },
    { id: "imageScale", type: "slider", label: "Image Scale (%)", min: 5, max: 200, default: 50 },
    { id: "rangeStart", type: "number", label: "Start at Page #", default: 1 },
    { id: "rangeEnd", type: "number", label: "End at Page # (0 = All)", default: 0 },
  ]
};

export const pdfMergerConfig = {
  slug: "pdf-merger",
  title: "Professional PDF Merger",
  description: "Combine multiple PDF files with precise page range control per file and optional size normalization.",
  icon: "📂",
  colorClass: "bg-red-500",
  options: [
    { id: "normalizeSize", type: "select", label: "Page Size Normalization", values: ["Original Sizes", "Convert all to A4", "Convert all to Letter"], default: "Original Sizes" },
    { id: "removeMetadata", type: "toggle", label: "Strip Internal Metadata", default: true },
    { id: "optimizeOutput", type: "toggle", label: "Optimize for Fast Web View", default: true },
    { id: "flattenForms", type: "toggle", label: "Flatten Interactive Forms", default: false },
    { id: "addOutline", type: "toggle", label: "Generate TOC from Filenames", default: true },
  ],
};

export const pdfSplitterConfig = {
  slug: "pdf-splitter",
  title: "Professional PDF Splitter",
  description: "Extract specific pages, split by ranges, or separate every page into individual documents.",
  icon: "✂️",
  colorClass: "bg-rose-500",
  options: [
    { id: "mode", type: "select", label: "Split Mode", values: ["Individual Pages", "Page Range", "Custom List", "Odd Pages", "Even Pages"], default: "Individual Pages" },
    { id: "pageRange", type: "text", label: "Pages (e.g. 1-3, 5, 8-10)", default: "1" },
    { id: "outputType", type: "select", label: "Output Type", values: ["Multiple PDFs (ZIP)", "Single PDF (Subset)"], default: "Multiple PDFs (ZIP)" },
    { id: "removeMetadata", type: "toggle", label: "Remove Metadata", default: true },
    { id: "compressOutput", type: "toggle", label: "Optimize Resulting Files", default: true },
  ],
};

export const pdfPageReorderConfig = {
  slug: "pdf-page-reorder",
  title: "Pro PDF Reorder",
  description: "Rearrange, rotate, or delete pages from your PDF file with a professional visual workspace.",
  icon: "📑",
  colorClass: "bg-red-700",
  options: [
    { id: "removeMetadata", type: "toggle", label: "Remove Metadata", default: true },
    { id: "compressOutput", type: "toggle", label: "Optimize Document", default: true },
  ],
};

export const pdfProtectConfig = {
  slug: "pdf-password-protect",
  title: "Advanced PDF Protector",
  description: "Secure your PDF with AES-256 bit encryption. Control user access and granular editing/printing permissions.",
  icon: "🔒",
  colorClass: "bg-red-900",
  options: [
    { id: "userPassword", type: "text", label: "Open Password", default: "" },
    { id: "ownerPassword", type: "text", label: "Owner Password (Perms)", default: "" },
    { id: "encryption", type: "select", label: "Encryption Strength", values: ["AES-256 (Secure)", "AES-128 (Legacy)"], default: "AES-256 (Secure)" },
    { id: "allowPrint", type: "toggle", label: "Allow Printing", default: false },
    { id: "allowCopy", type: "toggle", label: "Allow Content Copying", default: false },
    { id: "allowModify", type: "toggle", label: "Allow Modification", default: false },
  ],
};

export const pdfUnlockConfig = {
  slug: "pdf-password-remover",
  title: "PDF Password Remover",
  description: "Remove passwords and restrictions from your PDF files instantly. Requires the correct current password to decrypt locally.",
  icon: "🔓",
  colorClass: "bg-red-500",
  options: [
    { id: "password", type: "text", label: "Current Password", default: "" },
    { id: "fullUnlock", type: "toggle", label: "Remove All Restrictions", default: true }
  ],
};

export const pdfMetadataConfig = {
  slug: "pdf-metadata-viewer",
  title: "PDF Metadata Inspector",
  description: "Examine hidden PDF properties including Author, Creation Date, Producer, and internal XMP data tags.",
  icon: "🕵️",
  colorClass: "bg-red-800",
  options: [
    { id: "detailLevel", type: "select", label: "Inspection Depth", values: ["Standard Info", "Extended Metadata", "Raw XMP Tags"], default: "Standard Info" },
    { id: "privacyCheck", type: "toggle", label: "Detect Privacy Risks", default: true }
  ],
};

export const imageToPdfConfig = {
  slug: "image-to-pdf",
  title: "Pro JPG to PDF Converter",
  description: "Convert multiple JPG/PNG images into a single professional PDF document with orientation, fit, and margin control.",
  icon: "📄",
  colorClass: "bg-rose-600",
  options: [
    { id: "pageSize", type: "select", label: "Page Size", values: ["A4", "Letter", "Original Image Size"], default: "A4" },
    { id: "orientation", type: "select", label: "Orientation", values: ["Portrait", "Landscape"], default: "Portrait" },
    { id: "fitMode", type: "select", label: "Image Fit", values: ["Fit to Page", "Fill Page", "Original (Centered)"], default: "Fit to Page" },
    { id: "margin", type: "slider", label: "Margin (px)", min: 0, max: 100, default: 20 },
    { id: "dpi", type: "select", label: "Output DPI", values: [72, 150, 300], default: 150 },
    { id: "zipOutput", type: "toggle", label: "Individual Pages as ZIP", default: false }
  ],
};

export const pdfToWordConfig = {
  slug: "pdf-to-word-converter",
  title: "Pro PDF to Word",
  description: "Convert PDF documents to editable Word (.docx) files. Advanced text extraction engine.",
  icon: "📝",
  colorClass: "bg-blue-600",
  options: [
    { id: "mode", type: "select", label: "Conversion Mode", values: ["Text Only", "Layout Preserved"], default: "Text Only" },
    { id: "normalizeSpacing", type: "toggle", label: "Normalize Spacing", default: true },
    { id: "removeEmptyLines", type: "toggle", label: "Remove Empty Lines", default: false }
  ],
};

export const pdfOcrConfig = {
  slug: "pdf-ocr",
  title: "Pro PDF OCR",
  description: "Extract text from scanned PDF documents and images using high-precision AI-powered OCR engines.",
  icon: "🔍",
  colorClass: "bg-red-800",
  options: [
    { id: "language", type: "select", label: "OCR Language", values: ["eng", "spa", "fra", "deu", "ita"], default: "eng" },
    { id: "scanResolution", type: "select", label: "Scan Quality (DPI)", values: [150, 300, 600], default: 300 },
    { id: "outputType", type: "select", label: "Result Format", values: ["Raw Text", "Formatted (.txt)"], default: "Formatted (.txt)" },
  ],
};