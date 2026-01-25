export interface PassportOptions {
  width: number;
  height: number;
  unit: 'mm' | 'in';
  dpi: number;
  backgroundColor: string;
  format: 'image/jpeg' | 'image/png';
}

export interface PassportResult {
  blob: Blob;
  pixels: { width: number; height: number };
}

/**
 * Passport Photo Processing Engine
 * Handles unit conversion and high-DPI canvas rendering.
 */
export async function passportPhotoMaker(
  imageSrc: string,
  cropArea: { x: number; y: number; width: number; height: number },
  options: PassportOptions
): Promise<PassportResult> {
  const { width, height, unit, dpi, backgroundColor, format } = options;

  // 1. Convert Physical Size to Pixels
  const mmToIn = 25.4;
  const targetWidthPx = Math.round(unit === 'mm' ? (width / mmToIn) * dpi : width * dpi);
  const targetHeightPx = Math.round(unit === 'mm' ? (height / mmToIn) * dpi : height * dpi);

  // 2. Setup Canvas
  const canvas = document.createElement('canvas');
  canvas.width = targetWidthPx;
  canvas.height = targetHeightPx;
  const ctx = canvas.getContext('2d')!;

  // 3. Load Source Image
  const img = new Image();
  img.src = imageSrc;
  await new Promise((resolve) => (img.onload = resolve));

  // 4. Draw Background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, targetWidthPx, targetHeightPx);

  // 5. Draw Cropped Image (Centered and Scaled to Fit)
  // We draw from the source cropArea to the destination target size
  ctx.drawImage(
    img,
    cropArea.x,
    cropArea.y,
    cropArea.width,
    cropArea.height,
    0,
    0,
    targetWidthPx,
    targetHeightPx
  );

  // 6. Generate Output
  const blob: Blob = await new Promise((resolve) => {
    canvas.toBlob((b) => resolve(b!), format, 0.95);
  });

  return {
    blob,
    pixels: { width: targetWidthPx, height: targetHeightPx }
  };
}