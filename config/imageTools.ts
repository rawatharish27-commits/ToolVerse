
export const imageSizeReducerKbSelectorConfig = {
  slug: "image-size-reducer-kb",
  title: "Image Size Reducer (KB Selector)",
  description: "Target a specific file size (e.g. 20KB for SSC/UPSC). Our engine uses binary-search quality optimization to hit your goal.",
  icon: "📉",
  colorClass: "bg-emerald-500",
  options: [
    { id: "targetKb", type: "number", label: "Target Size (KB)", default: 50 },
    { id: "format", type: "select", label: "Output Format", values: ["JPG", "WEBP"], default: "JPG" },
    { id: "precision", type: "select", label: "Logic Precision", values: ["Standard", "High", "Ultra"], default: "High" }
  ]
};

export const imageDpiCheckerConfig = {
  slug: "image-dpi-checker",
  title: "Image DPI Checker & Fixer",
  description: "Portals reject photos if DPI headers are missing. This tool injects standard 300 DPI headers into your image losslessly.",
  icon: "🖨️",
  colorClass: "bg-indigo-600",
  options: [
    { id: "targetDpi", type: "select", label: "Set New DPI", values: [72, 96, 150, 300, 600], default: 300 }
  ]
};

export const passportPhotoConfig = {
  slug: "passport-size-photo-maker",
  title: "Passport Size Photo Maker",
  description: "Official standard photo generator. Crop and align your face to Indian (35x45mm) or US (2x2in) specifications.",
  icon: "🛂",
  colorClass: "bg-indigo-600",
  options: [
    { id: "preset", type: "select", label: "Select Standard", values: ["Indian Passport (35x45mm)", "US Passport (2x2in)", "Custom (A4 Sheet)"], default: "Indian Passport (35x45mm)" },
    { id: "layout", type: "select", label: "Sheet Layout", values: ["Single Photo", "6 Photos (4x6)", "12 Photos (A4)"], default: "Single Photo" }
  ]
};

export const imageAuthenticityConfig = {
  slug: "image-authenticity-analyzer",
  title: "Image Authenticity Analyzer",
  description: "Analyze image for edits. Checks metadata for Canva/Photoshop signatures and looks for resolution inconsistencies.",
  icon: "🔎",
  colorClass: "bg-emerald-700",
  options: [
    { id: "deepScan", type: "toggle", label: "Scan Hidden Tags", default: true }
  ]
};

export const formImageFixerConfig = {
  slug: "form-image-auto-fixer",
  title: "Form Image Auto-Fixer",
  description: "Optimize photos for government portal uploads. Auto-adjusts contrast, brightness, and sharpness for better OCR readability.",
  icon: "🔧",
  colorClass: "bg-emerald-600",
  options: [
    { id: "target", type: "select", label: "Requirement", values: ["Passport Photo", "Signature Scan", "Document Scan"], default: "Passport Photo" }
  ]
};

export const imageCompressorConfig = {
  slug: "image-compressor",
  title: "Smart Image Compressor",
  description: "Advanced lossy and lossless compression. Control the balance between file size and visual fidelity with precision.",
  icon: "🖼️",
  colorClass: "bg-emerald-600",
  options: [
    { id: "quality", type: "slider", label: "Quality (%)", min: 10, max: 100, default: 75 }
  ]
};

export const imageFormatConverterConfig = {
  slug: "image-format-converter",
  title: "Universal Format Converter",
  description: "Convert between JPG, PNG, and WebP formats instantly. Corrects background transparency for JPEG conversions.",
  icon: "🔄",
  colorClass: "bg-emerald-700",
  options: [
    { id: "targetFormat", type: "select", label: "Convert To", values: ["JPG", "PNG", "WebP"], default: "PNG" }
  ]
};

export const imageMetadataViewerConfig = {
  slug: "image-metadata-viewer",
  title: "Deep Metadata Inspector",
  description: "Extract hidden EXIF tags, GPS coordinates, and camera details. Essential for verifying image authenticity.",
  icon: "🕵️",
  colorClass: "bg-emerald-800",
  options: []
};

// Fix: Adding configurations missing in original registry to satisfy ImageTools.tsx imports
export const imagePaletteExtractorConfig = {
  slug: 'image-palette-extractor',
  title: 'Image Palette Extractor',
  description: 'Derive standards-compliant color schemes from any visual asset.',
  icon: '🎨',
  colorClass: 'bg-emerald-500',
  options: []
};

export const imageShadowGeneratorConfig = {
  slug: 'image-shadow-generator',
  title: 'Image Shadow Generator',
  description: 'Architect realistic 2D/3D shadows for high-end product imagery.',
  icon: '👤',
  colorClass: 'bg-emerald-600',
  options: []
};

export const imagePrintSizeConfig = {
  slug: 'image-print-size-calculator',
  title: 'Image Print Size Calculator',
  description: 'Calculate physical output dimensions based on pixel density and target DPI.',
  icon: '📏',
  colorClass: 'bg-emerald-500',
  options: []
};

export const imageUploadFailureConfig = {
  slug: 'image-upload-failure-debugger',
  title: 'Image Upload Failure Debugger',
  description: 'Diagnose header corruption and structural MIME-type mismatches.',
  icon: '🛠️',
  colorClass: 'bg-rose-500',
  options: []
};

export const imageMetadataRemoverConfig = {
  slug: 'image-metadata-remover',
  title: 'Image Metadata Remover',
  description: 'Privacy-hardened EXIF, IPTC, and XMP scrubbing logic.',
  icon: '🛡️',
  colorClass: 'bg-emerald-700',
  options: []
};

export const backgroundRemoverNonAIConfig = {
  slug: 'background-remover-non-ai',
  title: 'Background Remover (Non-AI)',
  description: 'High-speed local masking for solid backgrounds without neural overhead.',
  icon: '✂️',
  colorClass: 'bg-emerald-500',
  options: []
};

export const signatureFixerConfig = {
  slug: 'signature-fixer',
  title: 'Signature Fixer',
  description: 'Standardize signature scans for official portal acceptance.',
  icon: '✒️',
  colorClass: 'bg-emerald-600',
  options: []
};

export const blurSimulatorConfig = {
  slug: 'image-looks-blurry-simulator',
  title: 'Upload Blur Simulator',
  description: 'Visualize platform-side compression before you hit upload.',
  icon: '🌫️',
  colorClass: 'bg-emerald-500',
  options: []
};

export const socialCompressionPreviewConfig = {
  slug: 'social-media-compression-preview',
  title: 'Social Compression Preview',
  description: 'Analyze quality loss on Instagram, WhatsApp, and X platforms.',
  icon: '📱',
  colorClass: 'bg-emerald-600',
  options: []
};

export const stretchingPredictorConfig = {
  slug: 'image-stretching-issue-predictor',
  title: 'Stretching Issue Predictor',
  description: 'Detect potential aspect ratio distortion before portal-side resizing.',
  icon: '↔️',
  colorClass: 'bg-emerald-500',
  options: []
};

export const pixelToKbConfig = {
  slug: 'pixel-to-kb-calculator',
  title: 'Pixel to KB Relationship',
  description: 'Mathematical model for file size forecasting based on entropy and format.',
  icon: '📊',
  colorClass: 'bg-emerald-600',
  options: []
};

export const cameraVsScreenshotConfig = {
  slug: 'camera-vs-screenshot-quality',
  title: 'Camera vs Screenshot Analyzer',
  description: 'Technical clarity delta identification between hardware captures and screen renders.',
  icon: '📸',
  colorClass: 'bg-emerald-500',
  options: []
};

export const photoClarityConfig = {
  slug: 'why-my-photo-is-not-clear',
  title: 'Photo Clarity Analyzer',
  description: 'Diagnostic audit for blur, motion artifacts, and pixelation root causes.',
  icon: '🔎',
  colorClass: 'bg-emerald-600',
  options: []
};

export const printVsScreenConfig = {
  slug: 'print-vs-screen-difference',
  title: 'Print vs Screen Difference',
  description: 'Visualize color gamut shifts between emissive and reflective displays.',
  icon: '🖨️',
  colorClass: 'bg-emerald-500',
  options: []
};

export const dpiMythBreakerConfig = {
  slug: 'image-dpi-myth-breaker',
  title: 'DPI Myth Breaker',
  description: 'Educational logic node identifying when DPI is irrelevant vs when it is mandatory.',
  icon: '🧠',
  colorClass: 'bg-emerald-600',
  options: []
};

export const mobileCameraAdvisorConfig = {
  slug: 'mobile-camera-setting-advisor',
  title: 'Mobile Camera Setting Advisor',
  description: 'Context-aware advice for capturing portal-perfect photos on Android/iOS.',
  icon: '📱',
  colorClass: 'bg-emerald-500',
  options: []
};

export const backgroundPredictorConfig = {
  slug: 'background-rejection-predictor',
  title: 'Background Rejection Predictor',
  description: 'Forecast upload rejection risk based on background contrast and color cast analysis.',
  icon: '🚫',
  colorClass: 'bg-emerald-600',
  options: []
};

export const imageToWebpConfig = {
  slug: 'image-to-webp-converter',
  title: 'Image to WebP Converter',
  description: 'High-speed transcoding for next-gen web delivery efficiency.',
  icon: '🕸️',
  colorClass: 'bg-emerald-600',
  options: []
};

// Fix: Aliases to handle different import naming conventions used in components
export const imageKbReducerConfig = imageSizeReducerKbSelectorConfig;
export const imageDpiConfig = imageDpiCheckerConfig;
export const imageDpiCheckerNewConfig = imageDpiCheckerConfig;
export const imageCompressorQcConfig = imageCompressorConfig;
export const imageFormatNewConfig = imageFormatConverterConfig;
export const imageMetadataViewerNewConfig = imageMetadataViewerConfig;
