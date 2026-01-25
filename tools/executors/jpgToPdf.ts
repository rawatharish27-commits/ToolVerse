
import { getPdfLib } from '../../lib/wasm-engines';

export interface JpgToPdfOptions {
  pageSize: 'A4' | 'LETTER';
  orientation: 'PORTRAIT' | 'LANDSCAPE';
  margin: number;
}

/**
 * JPG to PDF Engine
 * Converts multiple image files into a structured PDF document.
 */
export async function jpgToPdf(
  files: FileList,
  options: JpgToPdfOptions
): Promise<Blob> {
  const { PDFDocument, PageSizes } = await getPdfLib();
  const pdfDoc = await PDFDocument.create();
  
  const size = options.pageSize === 'A4' ? PageSizes.A4 : PageSizes.Letter;
  const [width, height] = options.orientation === 'LANDSCAPE' ? [size[1], size[0]] : size;

  for (const file of Array.from(files)) {
    const page = pdfDoc.addPage([width, height]);
    const imageBytes = await file.arrayBuffer();
    
    let img;
    if (file.type === 'image/png') {
      img = await pdfDoc.embedPng(imageBytes);
    } else {
      img = await pdfDoc.embedJpg(imageBytes);
    }

    const { width: imgW, height: imgH } = img.scale(1);
    
    // Fit image to page while maintaining aspect ratio
    const margin = options.margin;
    const availableW = width - (margin * 2);
    const availableH = height - (margin * 2);
    const scale = Math.min(availableW / imgW, availableH / imgH);
    
    const finalW = imgW * scale;
    const finalH = imgH * scale;

    page.drawImage(img, {
      x: (width - finalW) / 2,
      y: (height - finalH) / 2,
      width: finalW,
      height: finalH,
    });
  }

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}
