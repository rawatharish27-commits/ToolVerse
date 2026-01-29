
import { ImageReducerInput } from './validate';

/**
 * Core processing node for Image KB reduction using recursive quantization.
 */
// Fix: Use unified ImageReducerInput and resolve Promise handler type mismatch
export async function process(input: ImageReducerInput): Promise<{ blob: Blob, finalSize: number }> {
  // Input verified by validate and targetBytes populated by normalize
  const file = input.file!;
  const targetBytes = input.targetBytes!;

  const img = new Image();
  const url = URL.createObjectURL(file);
  
  // Fix: Standardize promise executor for compatibility with img.onload
  await new Promise(r => { 
    img.onload = () => r(null);
    img.onerror = () => r(null);
    img.src = url; 
  });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  let low = 0.01;
  let high = 1.0;
  let bestBlob: Blob | null = null;

  // Binary search for quality to hit KB target (8 iterations for precision)
  for (let i = 0; i < 8; i++) {
    const mid = (low + high) / 2;
    const blob: Blob = await new Promise(r => canvas.toBlob(b => r(b!), 'image/jpeg', mid));
    if (blob.size <= targetBytes) {
      bestBlob = blob;
      low = mid;
    } else {
      high = mid;
    }
  }

  URL.revokeObjectURL(url);
  if (!bestBlob) {
     // Fallback: If target is physically impossible, force lowest allowed quality
     bestBlob = await new Promise(r => canvas.toBlob(b => r(b!), 'image/jpeg', 0.01));
  }

  return { blob: bestBlob!, finalSize: bestBlob!.size };
}
