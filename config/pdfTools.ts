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

export const pdfMergerConfig = {
  slug: "pdf-merger",
  title: "Pro PDF Merger",
  description: "Combine multiple PDF files into a single high-quality document. Order is preserved exactly as selected.",
  icon: "📂",
  colorClass: "bg-red-500",
  options: [
    { id: "removeMetadata", type: "toggle", label: "Strip Metadata", default: true },
    { id: "compressAfterMerge", type: "toggle", label: "Optimize Output", default: true },
    { id: "flattenForms", type: "toggle", label: "Flatten Forms", default: false },
    { id: "addOutline", type: "toggle", label: "Generate Outlines", default: true },
    { id: "normalizePages", type: "toggle", label: "Normalize Page Size", default: false },
  ],
};

export const pdfSplitterConfig = {
  slug: "pdf-splitter",
  title: "Pro PDF Splitter",
  description: "Extract specific pages or split your PDF document into multiple separate files instantly.",
  icon: "✂️",
  colorClass: "bg-rose-500",
  options: [
    { id: "mode", type: "select", label: "Split Mode", values: ["Page Range", "Every Page", "Every N Pages"], default: "Page Range" },
    { id: "pageRange", type: "text", label: "Page Range (e.g. 1-3,5)", default: "1-1" },
    { id: "everyN", type: "select", label: "Split Every N Pages", values: [1, 2, 3, 5, 10], default: 1 },
    { id: "removeMetadata", type: "toggle", label: "Remove Metadata", default: true },
    { id: "compressOutput", type: "toggle", label: "Compress Resulting Files", default: true },
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

export const pdfToImageConfig = {
  slug: "pdf-to-image",
  title: "Pro PDF to Image",
  description: "Convert PDF pages into high-resolution JPG or PNG images. Fast, secure, and accurate rendering.",
  icon: "🖼️",
  colorClass: "bg-orange-600",
  options: [
    { id: "format", type: "select", label: "Output Format", values: ["png", "jpg"], default: "png" },
    { id: "dpi", type: "select", label: "Resolution (DPI)", values: [72, 150, 300, 600], default: 150 },
    { id: "quality", type: "slider", label: "Compression Quality", min: 10, max: 100, default: 85 },
    { id: "zipOutput", type: "toggle", label: "Package as ZIP", default: true },
  ],
};

export const imageToPdfConfig = {
  slug: "image-to-pdf",
  title: "Pro Image to PDF",
  description: "Convert multiple JPG or PNG images into a single professional PDF document. Fast and local processing.",
  icon: "📄",
  colorClass: "bg-rose-600",
  options: [
    { id: "pageSize", type: "select", label: "Page Size", values: ["A4", "Letter", "Original"], default: "A4" },
    { id: "orientation", type: "select", label: "Orientation", values: ["Portrait", "Landscape"], default: "Portrait" },
    { id: "margin", type: "slider", label: "Margin (px)", min: 0, max: 100, default: 20 },
    { id: "fitMode", type: "select", label: "Image Fit", values: ["Contain", "Cover"], default: "Contain" },
    { id: "compress", type: "toggle", label: "Compress Images", default: true },
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