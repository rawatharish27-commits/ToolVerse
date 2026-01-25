export interface KbReducerOptions {
  targetKb: number;
  format?: 'image/jpeg' | 'image/webp';
  allowResizing?: boolean;
}

export interface KbReducerResult {
  blob: Blob;
  finalSize: number;
  originalSize: number;
  qualityUsed: number;
  dimensions: { width: number; height: number };
}

/**
 * Image KB Reducer Engine
 * Uses binary search to find the optimal quality for a target file size.
 */
export async function imageKbReducer(
  file: File,
  options: KbReducerOptions
): Promise<KbReducerResult> {
  const { targetKb, format = 'image/jpeg', allowResizing = true } = options;
  const targetBytes = targetKb * 1024;
  const originalSize = file.size;

  // 1. Create Image Object
  const img = new Image();
  const url = URL.createObjectURL(file);
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = url;
  });
  URL.revokeObjectURL(url);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  
  let width = img.width;
  let height = img.height;
  let quality = 0.9;
  let bestBlob: Blob | null = null;

  // Helper to test a specific configuration
  const testCompression = async (q: number, w: number, h: number): Promise<Blob> => {
    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(img, 0, 0, w, h);
    return new Promise((resolve) => {
      canvas.toBlob((b) => resolve(b!), format, q);
    });
  };

  // Step 1: Binary Search for Quality (Fixed Dimensions)
  let minQ = 0.05;
  let maxQ = 1.0;
  
  for (let i = 0; i < 8; i++) {
    quality = (minQ + maxQ) / 2;
    const blob = await testCompression(quality, width, height);
    
    if (blob.size <= targetBytes) {
      bestBlob = blob;
      minQ = quality; // Try higher quality
    } else {
      maxQ = quality; // Need lower quality
    }
  }

  // Step 2: If lowest quality is still too big, start reducing resolution
  if ((!bestBlob || bestBlob.size > targetBytes) && allowResizing) {
    let scale = 0.9;
    while (scale > 0.1) {
      const scaledW = Math.floor(img.width * scale);
      const scaledH = Math.floor(img.height * scale);
      const blob = await testCompression(0.5, scaledW, scaledH); // Use decent quality while scaling
      
      if (blob.size <= targetBytes) {
        // Once dimensions fit, do one more quick quality pass if needed
        bestBlob = blob;
        width = scaledW;
        height = scaledH;
        break;
      }
      scale -= 0.1;
    }
  }

  // Final fallback
  if (!bestBlob) {
    bestBlob = await testCompression(0.1, Math.floor(img.width * 0.5), Math.floor(img.height * 0.5));
  }

  return {
    blob: bestBlob,
    finalSize: bestBlob.size,
    originalSize,
    qualityUsed: Number(quality.toFixed(2)),
    dimensions: { width, height }
  };
}