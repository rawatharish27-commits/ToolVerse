
export interface KbReducerOptions {
  targetKb: number;
  format?: 'image/jpeg' | 'image/webp';
  precision?: 'Standard' | 'High' | 'Ultra';
}

export interface KbReducerResult {
  blob: Blob;
  finalSize: number;
  originalSize: number;
  qualityUsed: number;
  iterations: number;
}

/**
 * Enterprise Image KB Target Engine
 * Logic: Binary search optimization for file size constraints.
 */
export async function imageKbReducer(
  file: File,
  options: KbReducerOptions
): Promise<KbReducerResult> {
  const targetBytes = options.targetKb * 1024;
  const originalSize = file.size;
  const format = options.format === 'image/webp' ? 'image/webp' : 'image/jpeg';
  
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
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  // 2. Binary Search for Quality
  let minQ = 0.01;
  let maxQ = 0.99;
  let bestBlob: Blob | null = null;
  let bestQ = 0.5;
  
  const maxIterations = options.precision === 'Ultra' ? 12 : (options.precision === 'High' ? 8 : 5);
  let iterations = 0;

  for (let i = 0; i < maxIterations; i++) {
    iterations++;
    const currentQ = (minQ + maxQ) / 2;
    const blob: Blob = await new Promise((r) => canvas.toBlob(b => r(b!), format, currentQ));
    
    if (blob.size <= targetBytes) {
      bestBlob = blob;
      bestQ = currentQ;
      minQ = currentQ; // Try to get better quality
    } else {
      maxQ = currentQ; // Need smaller file
    }
  }

  // 3. Safety Fallback: If target is impossible at current dimensions
  if (!bestBlob) {
    // Return smallest possible at 0.01 quality
    bestBlob = await new Promise((r) => canvas.toBlob(b => r(b!), format, 0.01));
  }

  return {
    blob: bestBlob,
    finalSize: bestBlob.size,
    originalSize,
    qualityUsed: Number(bestQ.toFixed(2)),
    iterations
  };
}
