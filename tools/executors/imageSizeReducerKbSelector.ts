export async function imageSizeReducerKbSelector(file: File, options: any) {
  const targetBytes = options.targetKb * 1024;
  const originalSize = file.size;
  const img = new Image();
  const url = URL.createObjectURL(file);
  // Fix: Wrapped Promise executor in curly braces to prevent it from being seen as multiple arguments to the Promise constructor.
  await new Promise(r => { img.onload = r as any; img.src = url; });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  let bestBlob: Blob | null = null;
  
  // Logic precision control
  const maxIterations = options.precision === 'Ultra' ? 12 : 8;
  
  let low = 0.05, high = 1.0;
  for (let i = 0; i < maxIterations; i++) {
    const q = (low + high) / 2;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const blob: Blob = await new Promise(r => canvas.toBlob(b => r(b!), options.format === 'image/webp' ? 'image/webp' : 'image/jpeg', q));
    
    if (blob.size <= targetBytes) {
      bestBlob = blob;
      low = q;
    } else {
      high = q;
    }
  }

  return { blob: bestBlob || new Blob(), finalSize: bestBlob?.size || 0, originalSize };
}