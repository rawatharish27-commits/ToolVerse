export interface WebpConverterOptions {
  quality?: number; // 0 to 100
  lossless?: boolean;
}

export interface WebpConverterResult {
  blob: Blob;
  originalSize: number;
  finalSize: number;
  savings: string;
}

/**
 * Image to WebP Converter Engine
 * Uses native browser encoding for high performance.
 */
export async function imageToWebp(
  file: File,
  options: WebpConverterOptions = { quality: 75, lossless: false }
): Promise<WebpConverterResult> {
  const { quality = 75, lossless = false } = options;
  const originalSize = file.size;

  // 1. Load Image
  const img = new Image();
  const url = URL.createObjectURL(file);
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = url;
  });
  URL.revokeObjectURL(url);

  // 2. Setup Canvas
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d')!;
  
  // 3. Draw image (preserving transparency)
  ctx.drawImage(img, 0, 0);

  // 4. Convert to WebP Blob
  // Browser quality is 0 to 1
  const qValue = lossless ? 1.0 : quality / 100;
  
  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error("WebP conversion failed."));
      },
      'image/webp',
      qValue
    );
  });

  const savings = (((originalSize - blob.size) / originalSize) * 100).toFixed(1);

  return {
    blob,
    originalSize,
    finalSize: blob.size,
    savings: parseFloat(savings) > 0 ? `${savings}%` : '0%'
  };
}