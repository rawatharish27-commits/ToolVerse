export interface FormatConverterOptions {
  targetFormat: 'image/jpeg' | 'image/png' | 'image/webp';
  quality: number; // 0 to 1
}

export interface FormatConverterResult {
  blob: Blob;
  originalSize: number;
  finalSize: number;
  newFormat: string;
}

/**
 * Image Format Converter Engine
 * Performs high-speed transcoding in the browser's graphics layer.
 */
export async function imageFormatConverter(
  file: File,
  options: FormatConverterOptions
): Promise<FormatConverterResult> {
  const originalSize = file.size;

  // 1. Create Image Object and Load Data
  const img = new Image();
  const url = URL.createObjectURL(file);
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = url;
  });
  URL.revokeObjectURL(url);

  // 2. Prepare Canvas Context
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d', { alpha: options.targetFormat !== 'image/jpeg' })!;

  // 3. Draw image to pixel buffer
  // If target is JPEG, fill background with white (prevents black background on transparency)
  if (options.targetFormat === 'image/jpeg') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  ctx.drawImage(img, 0, 0);

  // 4. Transcode to target MIME type
  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error("Transcoding failure: Pixel buffer could not be encoded."));
      },
      options.targetFormat,
      options.quality
    );
  });

  return {
    blob,
    originalSize,
    finalSize: blob.size,
    newFormat: options.targetFormat.split('/')[1].toUpperCase()
  };
}