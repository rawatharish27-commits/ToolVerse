export const imageCompressorConfig = {
  slug: "image-compressor",
  title: "Smart Image Compressor",
  description: "Advanced lossy and lossless compression for PNG, JPG, and WebP. Reduce file size by up to 90% without visible quality loss.",
  icon: "🖼️",
  colorClass: "bg-emerald-600",
  options: [
    { id: "quality", type: "slider", label: "Target Quality (%)", min: 10, max: 100, default: 75 },
    { id: "maxWidthOrHeight", type: "number", label: "Max Dimension (px)", default: 1920 },
    { id: "useWebWorker", type: "toggle", label: "Use Multi-threading", default: true },
    { id: "preserveExif", type: "toggle", label: "Preserve EXIF Metadata", default: false },
    { id: "fileType", type: "select", label: "Output Format", values: ["original", "image/jpeg", "image/png", "image/webp"], default: "original" },
  ],
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