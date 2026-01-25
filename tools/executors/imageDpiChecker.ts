export interface DpiResult {
  blob: Blob;
  originalDpi: number;
  newDpi: number;
  format: string;
}

/**
 * Image DPI Checker & Fixer Engine
 * Manipulates binary headers (JFIF/pHYs) for lossless DPI updates.
 */
export async function imageDpiChecker(
  file: File,
  targetDpi: number
): Promise<DpiResult> {
  const buffer = await file.arrayBuffer();
  const view = new DataView(buffer);
  let originalDpi = 72; // Default fallback
  let modifiedBuffer = buffer;

  // JPEG Detection & Fix (JFIF APP0)
  if (view.getUint16(0) === 0xFFD8) {
    let offset = 2;
    while (offset < view.byteLength) {
      const marker = view.getUint16(offset);
      const length = view.getUint16(offset + 2);
      
      if (marker === 0xFFE0) { // APP0 Marker
        // 0-4: "JFIF\0", 5-6: Version, 7: Units, 8-9: Xdensity, 10-11: Ydensity
        const units = view.getUint8(offset + 11);
        originalDpi = view.getUint16(offset + 12);
        
        // Fix: Set units to 1 (pixels per inch) and inject target DPI
        view.setUint8(offset + 11, 1);
        view.setUint16(offset + 12, targetDpi); // X
        view.setUint16(offset + 14, targetDpi); // Y
        modifiedBuffer = buffer;
        break;
      }
      offset += 2 + length;
    }
  } 
  
  // PNG Detection & Fix (pHYs chunk)
  else if (view.getUint32(0) === 0x89504E47) {
    // PNG is more complex as pHYs chunk might not exist.
    // Standard approach: if not found, we'd need to insert it.
    // For this version, we report the pixel density if pHYs is found.
    let offset = 8;
    while (offset < view.byteLength) {
      const length = view.getUint32(offset);
      const type = view.getUint32(offset + 4);
      if (type === 0x70485973) { // pHYs
        const ppm = view.getUint32(offset + 8); // Pixels per meter
        originalDpi = Math.round(ppm / 39.3701);
        
        const newPpm = Math.round(targetDpi * 39.3701);
        view.setUint32(offset + 8, newPpm);
        view.setUint32(offset + 12, newPpm);
        break;
      }
      offset += length + 12;
    }
  }

  return {
    blob: new Blob([modifiedBuffer], { type: file.type }),
    originalDpi,
    newDpi: targetDpi,
    format: file.type.split('/')[1].toUpperCase()
  };
}