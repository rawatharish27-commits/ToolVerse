
export async function imageFormatV2(file: File, target: string) {
  const img = new Image();
  img.src = URL.createObjectURL(file);
  await new Promise(r => img.onload = r);
  
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d')!;
  
  if (target === 'jpg' || target === 'jpeg') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(img, 0, 0);
  
  const mime = target === 'ico' ? 'image/x-icon' : `image/${target}`;
  const blob: Blob = await new Promise(r => canvas.toBlob(b => r(b!), mime, 0.95));
  
  return { blob };
}
