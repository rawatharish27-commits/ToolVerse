export const imageCompressorConfig = {
  slug: "image-compressor",
  title: "Smart Image Compressor",
  description: "Advanced lossy and lossless compression for PNG, JPG, and WebP. Reduce file size significantly while keeping original pixels and resolution intact.",
  icon: "🖼️",
  colorClass: "bg-emerald-600",
  options: [
    { id: "preset", type: "select", label: "Quality Preset", values: ["Custom (Slider)", "High Quality (90%)", "Balanced (75%)", "Web Optimized (60%)", "Maximum Compression (40%)"], default: "Balanced (75%)" },
    { id: "quality", type: "slider", label: "Custom Quality (%)", min: 10, max: 100, default: 75 },
    { id: "maxWidthOrHeight", type: "number", label: "Max Dimension (px)", default: 4000 },
    { id: "useWebWorker", type: "toggle", label: "Use Multi-threading", default: true },
    { id: "preserveExif", type: "toggle", label: "Preserve EXIF Metadata", default: false },
    { id: "fileType", type: "select", label: "Output Format", values: ["original", "image/jpeg", "image/png", "image/webp"], default: "original" },
  ],
};

export const imageFormatConverterConfig = {
  slug: "image-format-converter",
  title: "Image Format Converter",
  description: "Convert images between JPG, PNG, and WebP formats instantly. Preserve quality or choose custom compression levels.",
  icon: "🔄",
  colorClass: "bg-emerald-700",
  options: [
    { id: "targetFormat", type: "select", label: "Convert To", values: ["JPG", "PNG", "WebP"], default: "PNG" },
    { id: "qualityPreset", type: "select", label: "Quality Profile", values: ["Lossless", "High", "Balanced", "Minimum Size"], default: "High" },
    { id: "customQuality", type: "slider", label: "Custom Quality (%)", min: 10, max: 100, default: 90 },
    { id: "zipOutput", type: "toggle", label: "Download as ZIP (Batch)", default: true }
  ]
};

export const imageMetadataViewerConfig = {
  slug: "image-metadata-viewer",
  title: "Image Metadata Viewer",
  description: "Inspect hidden image details including resolution, file type, color depth, and internal properties without any modifications.",
  icon: "🕵️",
  colorClass: "bg-emerald-800",
  options: [
    { id: "showAdvanced", type: "toggle", label: "Show Internal Headers", default: false }
  ]
};

export const imageKbReducerConfig = {
  slug: "image-kb-reducer",
  title: "Image Size Reducer (Exact KB)",
  description: "Reduce image size to a specific target (e.g. 20KB, 50KB) while keeping original pixels and resolution intact.",
  icon: "📉",
  colorClass: "bg-emerald-500",
  options: [
    { id: "targetKb", type: "number", label: "Target Size (KB)", default: 50 },
    { id: "format", type: "select", label: "Save As", values: ["jpeg", "webp"], default: "jpeg" },
    { id: "noResize", type: "toggle", label: "Keep Original Dimensions", default: true }
  ]
};

export const passportPhotoConfig = {
  slug: "passport-size-photo-maker",
  title: "Passport Size Photo Maker",
  description: "Generate official passport and visa photos. Select from presets for India, US, or set custom dimensions with DPI control.",
  icon: "🛂",
  colorClass: "bg-indigo-600",
  options: [
    { id: "preset", type: "select", label: "Select Standard", values: ["Indian Passport (35x45mm)", "US Passport (2x2in)", "Schengen Visa (35x45mm)", "Custom Dimensions"], default: "Indian Passport (35x45mm)" },
    { id: "customWidth", type: "number", label: "Custom Width (mm)", default: 35 },
    { id: "customHeight", type: "number", label: "Custom Height (mm)", default: 45 },
    { id: "bg", type: "select", label: "Background Color", values: ["White", "Light Blue", "Off White", "Transparent"], default: "White" },
    { id: "dpi", type: "select", label: "Print Quality (DPI)", values: [300, 600, 150, 72], default: 300 },
    { id: "autoCrop", type: "toggle", label: "Auto-Center Head (AI)", default: true },
    { id: "outputFormat", type: "select", label: "Save As", values: ["jpeg", "png"], default: "jpeg" }
  ]
};

export const imageToWebpConfig = {
  slug: "image-to-webp",
  title: "Image to WebP Converter",
  description: "Convert JPG/PNG to next-gen WebP format for superior compression and faster web loading.",
  icon: "🕸️",
  colorClass: "bg-emerald-600",
  options: [
    { id: "quality", type: "slider", label: "Lossy Quality (%)", min: 10, max: 100, default: 80 },
    { id: "lossless", type: "toggle", label: "Use Lossless Mode", default: false }
  ]
};

export const imageResizerConfig = {
  slug: "image-resizer",
  title: "Bulk Image Resizer",
  description: "Resize images to custom dimensions or percentage scale. Fast, local, and professional resizing engine.",
  icon: "📏",
  colorClass: "bg-emerald-500",
  options: [
    { id: "mode", type: "select", label: "Resize Mode", values: ["Dimensions", "Percentage"], default: "Dimensions" },
    { id: "width", type: "number", label: "Target Width (px)", default: 1080 },
    { id: "height", type: "number", label: "Target Height (px)", default: 1080 },
    { id: "maintainAspect", type: "toggle", label: "Maintain Aspect Ratio", default: true },
    { id: "scale", type: "slider", label: "Scale (%)", min: 1, max: 200, default: 50 },
    { id: "outputFormat", type: "select", label: "Format", values: ["original", "png", "jpeg", "webp"], default: "original" },
  ],
};

export const imageCropperConfig = {
  slug: "image-cropper",
  title: "Image Cropper Pro",
  description: "Precision cropping tool for social media and web assets. Support for various aspect ratios and local high-res output.",
  icon: "✂️",
  colorClass: "bg-emerald-700",
  options: [
    { id: "aspectRatio", type: "select", label: "Aspect Ratio", values: ["Free", "1:1", "4:3", "16:9", "9:16"], default: "Free" },
    { id: "format", type: "select", label: "Output Format", values: ["png", "jpeg", "webp"], default: "png" },
    { id: "zoom", type: "slider", label: "Default Zoom", min: 1, max: 3, default: 1 },
  ],
};

export const imageConverterConfig = {
  slug: "image-converter",
  title: "Image Converter Pro",
  description: "Convert images between JPG, PNG, and WebP instantly. Batch convert hundreds of images in seconds while controlling quality.",
  icon: "🔄",
  colorClass: "bg-emerald-800",
  options: [
    { id: "format", type: "select", label: "Output Format", values: ["image/jpeg", "image/png", "image/webp"], default: "image/jpeg" },
    { id: "quality", type: "slider", label: "Quality (%)", min: 20, max: 100, default: 90 },
    { id: "background", type: "select", label: "BG (for JPEG)", values: ["white", "black", "transparent"], default: "white" },
    { id: "zipOutput", type: "toggle", label: "Download as ZIP", default: true },
  ],
};

export const backgroundRemoverConfig = {
  slug: "background-remover",
  title: "AI Background Remover",
  description: "Detect subject and remove background instantly using neural networks. High-precision segmentation for professional transparent PNGs.",
  icon: "🪄",
  colorClass: "bg-indigo-600",
  options: [
    { id: "quality", type: "select", label: "AI Accuracy", values: ["Fast", "Balanced", "High Accuracy"], default: "Balanced" },
    { id: "edgeSmoothing", type: "slider", label: "Edge Smoothing", min: 0, max: 10, default: 4 },
    { id: "zipOutput", type: "toggle", label: "Download as ZIP", default: true }
  ]
};

export const imageRotatorConfig = {
  slug: "image-rotator",
  title: "Image Rotator & Flip",
  description: "Correct image orientation or create mirrored effects instantly. Perfect for fixing mobile camera orientation issues.",
  icon: "🔃",
  colorClass: "bg-emerald-600",
  options: [
    { id: "rotation", type: "select", label: "Rotation (Degrees)", values: ["0", "90", "180", "270"], default: "90" },
    { id: "flipH", type: "toggle", label: "Flip Horizontal", default: false },
    { id: "flipV", type: "toggle", label: "Flip Vertical", default: false },
    { id: "format", type: "select", label: "Save As", values: ["png", "jpg", "webp"], default: "png" },
  ]
};

export const imageWatermarkConfig = {
  slug: "image-watermark",
  title: "Bulk Watermark Tool",
  description: "Protect your creative assets by adding custom text or logo watermarks. Control opacity, position, and size precisely.",
  icon: "🖋️",
  colorClass: "bg-emerald-700",
  options: [
    { id: "type", type: "select", label: "Watermark Type", values: ["Text", "Logo/Image"], default: "Text" },
    { id: "text", type: "text", label: "Watermark Text", default: "© ToolVerse" },
    { id: "opacity", type: "slider", label: "Opacity (%)", min: 5, max: 100, default: 50 },
    { id: "position", type: "select", label: "Position", values: ["Center", "Top-Left", "Top-Right", "Bottom-Left", "Bottom-Right"], default: "Bottom-Right" },
    { id: "fontSize", type: "slider", label: "Scale/Font Size", min: 10, max: 200, default: 40 },
    { id: "color", type: "select", label: "Text Color", values: ["White", "Black", "Red", "Blue"], default: "White" },
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

export const imageDpiConfig = {
  slug: "image-dpi-checker",
  title: "Image DPI Checker & Fixer",
  description: "Check and modify image Dots Per Inch (DPI) for high-quality printing.",
  icon: "🖨️",
  colorClass: "bg-emerald-600",
  options: [
    { id: "targetDpi", type: "number", label: "Target DPI", default: 300 },
    { id: "format", type: "select", label: "Output Format", values: ["jpeg", "png", "webp"], default: "jpeg" }
  ]
};