
export const imageSizeReducerKbSelectorConfig = {
  slug: "image-size-reducer-kb-selector",
  title: "Image Size Reducer (KB selector)",
  description: "Target a specific file size (e.g. 20KB for govt forms). Our engine uses binary-search quality optimization to hit your goal.",
  icon: "📉",
  colorClass: "bg-emerald-500",
  options: [
    { id: "targetKb", type: "number", label: "Target Size (KB)", default: 50 },
    { id: "format", type: "select", label: "Output Format", values: ["JPG", "WEBP"], default: "JPG" },
    { id: "precision", type: "select", label: "Logic Precision", values: ["Standard", "High", "Ultra"], default: "High" }
  ]
};

export const imageDpiCheckerNewConfig = {
  slug: "image-dpi-checker-new",
  title: "Image DPI Checker",
  description: "Inspect and modify DPI headers losslessly for print and portal compliance.",
  icon: "🖨️",
  colorClass: "bg-indigo-600",
  options: [
    { id: "targetDpi", type: "select", label: "Set New DPI", values: [72, 96, 150, 300, 600], default: 300 }
  ]
};

export const imageCompressorQcConfig = {
  slug: "image-compressor-qc",
  title: "Image Compressor (quality control)",
  description: "Advanced lossy compression with interactive bit-depth and sub-sampling control.",
  icon: "🖼️",
  colorClass: "bg-emerald-600",
  options: [
    { id: "quality", type: "slider", label: "Precision Quality (%)", min: 1, max: 100, default: 75 },
    { id: "sampling", type: "select", label: "Chroma Sub-sampling", values: ["4:4:4", "4:2:2", "4:2:0"], default: "4:2:0" }
  ]
};

export const imageFormatNewConfig = {
  slug: "image-format-new",
  title: "Image Format Converter",
  description: "Professional transcoding between JPG, PNG, WEBP, HEIC, and TIFF.",
  icon: "🔄",
  colorClass: "bg-emerald-700",
  options: [
    { id: "targetFormat", type: "select", label: "Convert To", values: ["JPG", "PNG", "WebP", "GIF", "ICO"], default: "PNG" }
  ]
};

export const imageMetadataViewerNewConfig = {
  slug: "image-metadata-viewer-new",
  title: "Image Metadata Viewer",
  description: "Deep byte-level inspection of Exif, IPTC, and XMP data segments.",
  icon: "🕵️",
  colorClass: "bg-emerald-800",
  options: [
    { id: "deepScan", type: "toggle", label: "Scan Hidden Tags", default: true }
  ]
};

export const imageKbReducerConfig = {
  slug: "image-kb-reducer",
  title: "Image Size Reducer (Exact KB)",
  description: "Target a specific file size (e.g. 20KB for govt forms). Our engine uses binary-search quality optimization to hit your goal.",
  icon: "📉",
  colorClass: "bg-emerald-500",
  options: [
    { id: "targetKb", type: "number", label: "Target Size (KB)", default: 50 },
    { id: "format", type: "select", label: "Output Format", values: ["JPG", "WEBP"], default: "JPG" }
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
    { id: "layout", type: "select", label: "Sheet Layout", values: ["Single Photo", "6 Photos (4x6)", "12 Photos (A4)", "32 Photos (A4)"], default: "Single Photo" }
  ]
};

export const imageToWebpConfig = {
  slug: "image-to-webp",
  title: "Image to WebP Converter",
  description: "Convert outdated JPG/PNG files to next-gen WebP. Reduce storage by up to 80% with no visible quality loss.",
  icon: "🕸️",
  colorClass: "bg-emerald-600",
  options: [
    { id: "quality", type: "slider", label: "Compression Quality", min: 10, max: 100, default: 80 },
    { id: "lossless", type: "toggle", label: "Lossless Mode", default: false },
    { id: "preserveMetadata", type: "toggle", label: "Preserve Metadata", default: true }
  ]
};

export const imageDpiConfig = {
  slug: "image-dpi-checker",
  title: "Image DPI Checker & Fixer",
  description: "Portals reject photos if DPI metadata is missing. This tool injects standard 300 DPI headers into your image losslessly.",
  icon: "🖨️",
  colorClass: "bg-emerald-600",
  options: []
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

export const dpiMythBreakerConfig = {
  slug: "image-dpi-myth-breaker",
  title: "Image DPI Myth Breaker",
  description: "Debunk common DPI myths. Find out when DPI matters and when it's completely ignored by websites and forms.",
  icon: "🧠",
  colorClass: "bg-indigo-600",
  options: [
    { id: "useCase", type: "select", label: "Target Use Case", values: ["online", "government", "print"], default: "online" },
    { id: "dpi", type: "number", label: "Stated DPI", default: 300 },
    { id: "widthPx", type: "number", label: "Width (px)", default: 1000 },
    { id: "heightPx", type: "number", label: "Height (px)", default: 1000 },
    { id: "printSizeInches", type: "number", label: "Print Width (inches)", default: 4 }
  ]
};

export const mobileCameraAdvisorConfig = {
  slug: "mobile-camera-setting-advisor",
  title: "Mobile Camera Advisor",
  description: "Optimization guide for phone photography. Get exact settings for Android or iPhone to capture portal-perfect photos.",
  icon: "📱",
  colorClass: "bg-emerald-600",
  options: [
    { id: "useCase", type: "select", label: "Usage Context", values: ["government", "kyc", "social", "print"], default: "government" },
    { id: "phoneType", type: "select", label: "Phone Type", values: ["android", "iphone"], default: "android" },
    { id: "cameraMode", type: "select", label: "App Mode", values: ["auto", "pro"], default: "auto" },
    { id: "lighting", type: "select", label: "Ambient Lighting", values: ["poor", "average", "good"], default: "average" },
    { id: "movement", type: "select", label: "Hand Stability", values: ["static", "handheld"], default: "handheld" }
  ]
};

export const backgroundPredictorConfig = {
  slug: "background-rejection-predictor",
  title: "Background Rejection Predictor",
  description: "Will your background cause an upload error? Predict rejection risk and see how to prepare a 'safe' background.",
  icon: "🧱",
  colorClass: "bg-slate-700",
  options: [
    { id: "useCase", type: "select", label: "Portal Type", values: ["government", "kyc", "job", "social"], default: "government" },
    { id: "backgroundType", type: "select", label: "Current Background", values: ["plain-white", "off-white", "colored", "textured", "outdoor"], default: "plain-white" },
    { id: "shadowsPresent", type: "toggle", label: "Shadows Visible?", default: false },
    { id: "wrinklesOrNoise", type: "toggle", label: "Wrinkles/Grain?", default: false }
  ]
};

export const cameraVsScreenshotConfig = {
  slug: "camera-vs-screenshot-quality-tool",
  title: "Camera vs Screenshot Tool",
  description: "Identify why screenshots are often rejected and see the technical quality gap between a real photo and a screen capture.",
  icon: "📸",
  colorClass: "bg-indigo-600",
  options: [
    { id: "source", type: "select", label: "Source Type", values: ["camera", "screenshot"], default: "camera" },
    { id: "useCase", type: "select", label: "Use Case", values: ["government", "kyc", "social", "print", "general"], default: "government" },
    { id: "compressionLevel", type: "select", label: "Assumed Compression", values: ["low", "medium", "high"], default: "medium" },
    { id: "containsText", type: "toggle", label: "Image contains text?", default: false }
  ]
};

export const photoClarityConfig = {
  slug: "photo-clarity-analyzer",
  title: "Photo Clarity Analyzer",
  description: "Diagnose why your photo looks blurry, grainy, or pixelated. Find the exact root cause and get the specific fix path.",
  icon: "🔍",
  colorClass: "bg-emerald-600",
  options: [
    { id: "symptom", type: "select", label: "Main Symptom", values: ["blur", "grain", "dull", "pixelated"], default: "blur" },
    { id: "source", type: "select", label: "Source", values: ["camera", "screenshot"], default: "camera" },
    { id: "useCase", type: "select", label: "Target Usage", values: ["government", "kyc", "social", "print", "general"], default: "government" },
    { id: "lighting", type: "select", label: "Lighting Conditions", values: ["poor", "average", "good"], default: "average" },
    { id: "motionBlur", type: "toggle", label: "Motion during capture?", default: false }
  ]
};

export const printVsScreenConfig = {
  slug: "print-vs-screen-image-difference-tool",
  title: "Print vs Screen Comparison",
  description: "Solve the 'why it looks different' mystery. See exactly what changes when moving from a glowing screen to physical paper.",
  icon: "🖨️",
  colorClass: "bg-rose-500",
  options: [
    { id: "output", type: "select", label: "Final Output", values: ["screen", "print"], default: "print" },
    { id: "paperType", type: "select", label: "Paper Type", values: ["plain", "glossy", "matte"], default: "plain" },
    { id: "printerType", type: "select", label: "Printer Technology", values: ["inkjet", "laser"], default: "inkjet" },
    { id: "colorMode", type: "select", label: "Input Color Mode", values: ["rgb", "cmyk"], default: "rgb" },
    { id: "brightnessAdjusted", type: "toggle", label: "Brightness pre-adjusted?", default: false }
  ]
};

export const socialCompressionPreviewConfig = {
  slug: "social-media-compression-preview",
  title: "Social Compression Preview",
  description: "Peel back the curtain on platform algorithms. See how much quality you'll lose on Instagram, WhatsApp, or Twitter before you hit send.",
  icon: "📲",
  colorClass: "bg-blue-600",
  options: [
    { id: "platform", type: "select", label: "Target Platform", values: ["instagram", "facebook", "whatsapp", "twitter", "linkedin"], default: "instagram" },
    { id: "imageType", type: "select", label: "Image Type", values: ["photo", "text", "logo"], default: "photo" },
    { id: "fileSizeKB", type: "number", label: "Current File Size (KB)", default: 500 }
  ]
};

export const stretchingPredictorConfig = {
  slug: "image-stretching-issue-predictor",
  title: "Image Stretching Predictor",
  description: "Will your photo look 'squashed' or 'stretched'? Enter your original and target dimensions to find out.",
  icon: "↔️",
  colorClass: "bg-rose-500",
  options: [
    { id: "originalWidth", type: "number", label: "Original Width (px)", default: 1920 },
    { id: "originalHeight", type: "number", label: "Original Height (px)", default: 1080 },
    { id: "targetWidth", type: "number", label: "Target Width (px)", default: 500 },
    { id: "targetHeight", type: "number", label: "Target Height (px)", default: 500 },
    { id: "context", type: "select", label: "Usage Context", values: ["government", "web", "social", "print"], default: "web" }
  ]
};

export const pixelToKbConfig = {
  slug: "pixel-to-kb-calculator",
  title: "Pixel → KB Relationship Tool",
  description: "The missing math between resolution and storage. Estimate your final file size in KB based on dimensions and quality.",
  icon: "📏",
  colorClass: "bg-emerald-600",
  options: [
    { id: "widthPx", type: "number", label: "Width (pixels)", default: 1000 },
    { id: "heightPx", type: "number", label: "Height (pixels)", default: 1000 },
    { id: "format", type: "select", label: "Image Format", values: ["jpg", "png", "webp"], default: "jpg" },
    { id: "quality", type: "slider", label: "JPEG/WebP Quality", min: 1, max: 100, default: 80 }
  ]
};

export const blurSimulatorConfig = {
  slug: "image-blur-upload-simulator",
  title: "Upload Blur Simulator",
  description: "Visualize why images lose quality on platforms like WhatsApp or strict Govt portals. Tests compression vs. resolution.",
  icon: "🟣",
  colorClass: "bg-purple-600",
  options: [
    { id: "platform", type: "select", label: "Upload Platform", values: ["government", "social", "website", "messaging"], default: "social" },
    { id: "originalQuality", type: "select", label: "Original Condition", values: ["low", "medium", "high"], default: "medium" }
  ]
};

export const signatureFixerConfig = {
  slug: "signature-upload-fixer",
  title: "Signature Upload Fix Tool",
  description: "Perfect your signature for Govt forms. Strips shadows, enhances black ink, and standardizes background to pure white.",
  icon: "🖋️",
  colorClass: "bg-indigo-600",
  options: [
    { id: "threshold", type: "slider", label: "Ink Sensitivity", min: 50, max: 200, default: 128 },
    { id: "autoCrop", type: "toggle", label: "Auto-Crop to Signature", default: true },
    { id: "outputPadding", type: "number", label: "Border Padding (px)", default: 10 }
  ]
};

export const imageAuthenticityConfig = {
  slug: "image-authenticity-analyzer",
  title: "Image Authenticity Analyzer",
  description: "Analyze image for edits. Checks metadata for 'Canva', 'Photoshop' signatures and looks for resolution inconsistencies.",
  icon: "🔎",
  colorClass: "bg-indigo-600",
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
    { id: "target", type: "select", label: "Target Requirement", values: ["Passport Photo", "Signature Scan", "Document Scan"], default: "Passport Photo" },
    { id: "enhanceText", type: "toggle", label: "Boost Text Sharpness", default: true },
    { id: "grayscale", type: "toggle", label: "Convert to B&W", default: false }
  ]
};

export const imageUploadFailureConfig = {
  slug: "image-upload-failure-debugger",
  title: "Upload Failure Debugger",
  description: "Analyze why your image might be failing on portals. Checks dimensions, MIME type, and header corruption.",
  icon: "🛠️",
  colorClass: "bg-rose-500",
  options: [
    { id: "targetPortal", type: "select", label: "Portal Limit Preset", values: ["Standard (2MB)", "Govt/Exam (200KB)", "Social (No Limit)"], default: "Govt/Exam (200KB)" }
  ]
};

export const imageMetadataRemoverConfig = {
  slug: "image-metadata-remover",
  title: "Image Privacy Scrubber",
  description: "Strip all EXIF data, GPS coordinates, and camera metadata from your images for secure social media sharing.",
  icon: "🕵️",
  colorClass: "bg-emerald-800",
  options: [
    { id: "format", type: "select", label: "Re-save As", values: ["jpeg", "png", "webp"], default: "jpeg" },
    { id: "quality", type: "slider", label: "Output Quality", min: 50, max: 100, default: 95 },
  ]
};

export const backgroundRemoverNonAIConfig = {
  slug: "background-remover-non-ai",
  title: "BG Remover (Smart Mask)",
  description: "A lightweight, non-AI background remover that uses color thresholding to strip solid backgrounds instantly.",
  icon: "🪄",
  colorClass: "bg-cyan-600",
  options: [
    { id: "tolerance", type: "slider", label: "Color Tolerance", min: 1, max: 100, default: 20 },
    { id: "targetColor", type: "select", label: "Key Color", values: ["Auto (Top-Left)", "White", "Green"], default: "Auto (Top-Left)" }
  ]
};

export const imageNoiseReducerConfig = {
  slug: "image-noise-reducer",
  title: "AI Image Noise Reducer",
  description: "Remove digital noise and grain from low-light photos while preserving fine textures and edges.",
  icon: "🌫️",
  colorClass: "bg-emerald-600",
  options: [
    { id: "strength", type: "slider", label: "Denoise Strength", min: 1, max: 10, default: 5 },
    { id: "sharpness", type: "slider", label: "Preserve Sharpness", min: 1, max: 10, default: 4 }
  ]
};

export const imagePaletteExtractorConfig = {
  slug: "image-color-palette-extractor",
  title: "Image Palette Extractor",
  description: "Extract professional color schemes from any image. Get Hex, RGB, and HSL codes instantly.",
  icon: "🎨",
  colorClass: "bg-emerald-500",
  options: [
    { id: "colorCount", type: "select", label: "Colors to Extract", values: [5, 8, 10, 12], default: 8 },
    { id: "format", type: "select", label: "Code Format", values: ["HEX", "RGB", "HSL"], default: "HEX" }
  ]
};

export const imageShadowGeneratorConfig = {
  slug: "image-shadow-generator",
  title: "Image Shadow Architect",
  description: "Apply realistic 2D/3D shadows to images. Perfect for product photography and UI mockups.",
  icon: "👤",
  colorClass: "bg-slate-700",
  options: [
    { id: "blur", type: "slider", label: "Shadow Blur", min: 0, max: 100, default: 20 },
    { id: "opacity", type: "slider", label: "Shadow Opacity", min: 0, max: 100, default: 30 },
    { id: "offset", type: "number", label: "Y-Offset (px)", default: 10 }
  ]
};

export const imagePerspectiveConfig = {
  slug: "image-perspective-corrector",
  title: "Perspective Corrector",
  description: "Fix keystone distortion and skewed angles in photos of documents, buildings, or signage.",
  icon: "📐",
  colorClass: "bg-emerald-700",
  options: [
    { id: "mode", type: "select", label: "Correction Mode", values: ["Manual Warp", "Auto-Level"], default: "Manual Warp" }
  ]
};

export const imagePrintSizeConfig = {
  slug: "image-print-size-calculator",
  title: "Print Size Calculator",
  description: "Calculate the maximum high-quality print dimensions (inches/cm) based on image pixels and DPI.",
  icon: "🖨️",
  colorClass: "bg-emerald-600",
  options: [
    { id: "dpi", type: "select", label: "Print Quality (DPI)", values: [72, 150, 300, 600], default: 300 },
    { id: "unit", type: "select", label: "Output Unit", values: ["inches", "cm", "mm"], default: "inches" }
  ]
};

export const backgroundBlurConfig = {
  slug: "background-blur-tool",
  title: "Background Blur Utility",
  description: "Instantly apply localized blur filters to image backgrounds while maintaining subject focus.",
  icon: "🌫️",
  colorClass: "bg-emerald-600",
  options: [
    { id: "blurAmount", type: "slider", label: "Blur Radius (px)", min: 1, max: 20, default: 5 },
    { id: "grayscale", type: "toggle", label: "Grayscale Background", default: false }
  ]
};
