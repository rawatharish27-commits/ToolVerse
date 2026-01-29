export const imageSizeReducerKbSelectorConfig = {
  slug: "image-size-reducer-kb",
  title: "Image Size Reducer (KB selector)",
  description: "Target a specific file size for job or form uploads. Our tool adjusts quality automatically to hit your goal.",
  icon: "📉",
  colorClass: "bg-emerald-500",
  options: [
    { id: "targetKb", type: "number", label: "Target Size (KB)", default: 50 },
    { id: "format", type: "select", label: "Save As", values: ["JPG", "WEBP"], default: "JPG" },
    { id: "precision", type: "select", label: "Accuracy", values: ["Standard", "High", "Best"], default: "High" }
  ]
};

export const imageDpiCheckerConfig = {
  slug: "image-dpi-checker",
  title: "Image DPI Checker",
  description: "Some portals reject photos if DPI is wrong. This tool adds 300 DPI headers to your photo instantly.",
  icon: "🖨️",
  colorClass: "bg-indigo-600",
  options: [
    { id: "targetDpi", type: "select", label: "Set New DPI", values: [72, 96, 150, 300, 600], default: 300 }
  ]
};

export const passportPhotoConfig = {
  slug: "passport-size-photo-maker",
  title: "Passport Size Photo Maker",
  description: "Crop and align your face to official passport sizes (Indian 35x45mm or US 2x2in).",
  icon: "🛂",
  colorClass: "bg-indigo-600",
  options: [
    { id: "preset", type: "select", label: "Standard Size", values: ["Indian Passport (35x45mm)", "US Passport (2x2in)", "Custom"], default: "Indian Passport (35x45mm)" },
    { id: "layout", type: "select", label: "Page Layout", values: ["Single Photo", "6 Photos (4x6)", "12 Photos (A4)"], default: "Single Photo" }
  ]
};

export const imageCompressorConfig = {
  slug: "image-compressor",
  title: "Image Compressor",
  description: "Reduce the file size of your photos while keeping them clear and high quality.",
  icon: "🖼️",
  colorClass: "bg-emerald-600",
  options: [
    { id: "quality", type: "slider", label: "Quality Level", min: 10, max: 100, default: 75 }
  ]
};

export const imageFormatConverterConfig = {
  slug: "image-format-converter",
  title: "Image Format Converter",
  description: "Change your photo from JPG to PNG, or PNG to WebP instantly.",
  icon: "🔄",
  colorClass: "bg-emerald-700",
  options: [
    { id: "targetFormat", type: "select", label: "Convert To", values: ["JPG", "PNG", "WebP"], default: "PNG" }
  ]
};

export const imageMetadataViewerConfig = {
  slug: "image-metadata-viewer",
  title: "Image Metadata Viewer",
  description: "See the date, location, and camera details hidden inside any photo.",
  icon: "🕵️",
  colorClass: "bg-emerald-800",
  options: []
};

export const imagePaletteExtractorConfig = {
  slug: 'image-palette-extractor',
  title: 'Image Palette Extractor',
  description: 'Get a professional color palette from any image you upload.',
  icon: '🎨',
  colorClass: 'bg-emerald-500',
  options: []
};

export const imageShadowGeneratorConfig = {
  slug: 'image-shadow-generator',
  title: 'Image Shadow Generator',
  description: 'Add a professional 3D shadow effect to your product photos or logos.',
  icon: '👤',
  colorClass: 'bg-emerald-600',
  options: []
};

export const imagePrintSizeConfig = {
  slug: 'image-print-size-calculator',
  title: 'Image Print Size Calculator',
  description: 'Find out the best size to print your photo without it looking blurry.',
  icon: '📏',
  colorClass: 'bg-emerald-500',
  options: []
};

export const imageUploadFailureConfig = {
  slug: 'image-upload-failure-debugger',
  title: 'Image Upload Failure Debugger',
  description: 'Diagnose why a website is refusing to upload your photo.',
  icon: '🛠️',
  colorClass: 'bg-rose-500',
  options: []
};

export const imageMetadataRemoverConfig = {
  slug: 'image-metadata-remover',
  title: 'Image Metadata Remover',
  description: 'Delete hidden location and camera data from photos before sharing them online.',
  icon: '🛡️',
  colorClass: 'bg-emerald-700',
  options: []
};

export const backgroundRemoverNonAIConfig = {
  slug: 'background-remover-non-ai',
  title: 'Background Remover (Non-AI)',
  description: 'Instantly remove plain white or colored backgrounds from logos and icons.',
  icon: '✂️',
  colorClass: 'bg-emerald-500',
  options: []
};

export const signatureFixerConfig = {
  slug: 'signature-fixer',
  title: 'Signature Scanner Fixer',
  description: 'Clean up your signature scans for government or office forms.',
  icon: '✒️',
  colorClass: 'bg-emerald-600',
  options: []
};

export const blurSimulatorConfig = {
  slug: 'image-looks-blurry-simulator',
  title: 'Image Looks Blurry After Upload Simulator',
  description: 'See how blurry your photo might look after uploading it to different apps.',
  icon: '🌫️',
  colorClass: 'bg-emerald-500',
  options: []
};

export const socialCompressionPreviewConfig = {
  slug: 'social-media-compression-preview',
  title: 'Social Media Compression Preview Tool',
  description: 'Check if Instagram or WhatsApp will ruin your photo quality.',
  icon: '📱',
  colorClass: 'bg-emerald-600',
  options: []
};

export const stretchingPredictorConfig = {
  slug: 'image-stretching-issue-predictor',
  title: 'Image Stretching Issue Predictor',
  description: 'Check if a website will stretch or squeeze your photo incorrectly.',
  icon: '↔️',
  colorClass: 'bg-emerald-500',
  options: []
};

export const pixelToKbConfig = {
  slug: 'pixel-to-kb-calculator',
  title: 'Exact Pixel to KB Relationship Calculator',
  description: 'Calculate how many KB your photo will be based on its size and quality.',
  icon: '📊',
  colorClass: 'bg-emerald-600',
  options: []
};

export const cameraVsScreenshotConfig = {
  slug: 'camera-vs-screenshot-quality',
  title: 'Camera vs Screenshot Quality Analyzer',
  description: 'Compare quality between a camera photo and a screenshot for official use.',
  icon: '📸',
  colorClass: 'bg-emerald-500',
  options: []
};

export const photoClarityConfig = {
  slug: 'why-my-photo-is-not-clear',
  title: 'Why My Photo Is Not Clear Analyzer',
  description: 'Find out why your photo is blurry, grainy, or pixelated.',
  icon: '🔎',
  colorClass: 'bg-emerald-600',
  options: []
};

export const printVsScreenConfig = {
  slug: 'print-vs-screen-difference',
  title: 'Print vs Screen Image Difference Tool',
  description: 'See how the colors of your photo will change when you print it on paper.',
  icon: '🖨️',
  colorClass: 'bg-emerald-500',
  options: []
};

export const dpiMythBreakerConfig = {
  slug: 'image-dpi-myth-breaker',
  title: 'Image DPI Myth Breaker Tool',
  description: 'Learn when DPI actually matters and when it does not.',
  icon: '🧠',
  colorClass: 'bg-emerald-600',
  options: []
};

export const mobileCameraAdvisorConfig = {
  slug: 'mobile-camera-setting-advisor',
  title: 'Mobile Camera Setting Advisor',
  description: 'Get the best camera settings for taking clear photos for govt forms.',
  icon: '📱',
  colorClass: 'bg-emerald-500',
  options: []
};

export const backgroundPredictorConfig = {
  slug: 'background-rejection-predictor',
  title: 'Background Rejection Predictor',
  description: 'Check if your photo background will be rejected by a visa or govt portal.',
  icon: '🚫',
  colorClass: 'bg-emerald-600',
  options: []
};

export const imageToWebpConfig = {
  slug: 'image-to-webp-converter',
  title: 'Image to WebP Converter',
  description: 'Convert images to the modern WebP format for faster website loading.',
  icon: '🕸️',
  colorClass: 'bg-emerald-600',
  options: []
};

export const imageAuthenticityConfig = {
  slug: "image-authenticity-analyzer",
  title: "Image Authenticity Analyzer",
  description: "Analyze image for potential AI generation or digital manipulation signatures.",
  icon: "🔍",
  colorClass: "bg-emerald-700",
  options: [
    { id: "sensitivity", type: "select", label: "Scan Sensitivity", values: ["Standard", "High", "Deep Audit"], default: "Standard" }
  ]
};

export const imageKbReducerConfig = imageSizeReducerKbSelectorConfig;
export const imageDpiConfig = imageDpiCheckerConfig;
export const imageDpiCheckerNewConfig = imageDpiCheckerConfig;
export const imageCompressorQcConfig = imageCompressorConfig;
export const imageFormatNewConfig = imageFormatConverterConfig;
export const imageMetadataViewerNewConfig = imageMetadataViewerConfig;