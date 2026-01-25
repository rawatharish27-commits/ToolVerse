
import { getPdfLib } from '../../lib/wasm-engines';

export interface WatermarkOptions {
  text: string;
  opacity: number;
  rotation: number;
  fontSize: number;
  color: [number, number, number]; // RGB 0-1
}

/**
 * PDF Watermark Engine
 * Overlays text/metadata on every page of a document.
 */
export async function pdfWatermark(
  file: File,
  options: WatermarkOptions
): Promise<Blob> {
  const { PDFDocument, rgb, degrees, StandardFonts } = await getPdfLib();
  const existingPdfBytes = await file.arrayBuffer();
  
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pages = pdfDoc.getPages();

  for (const page of pages) {
    const { width, height } = page.getSize();
    
    page.drawText(options.text, {
      x: width / 2 - (options.text.length * options.fontSize) / 4,
      y: height / 2,
      size: options.fontSize,
      font: helveticaFont,
      color: rgb(options.color[0], options.color[1], options.color[2]),
      opacity: options.opacity,
      rotate: degrees(options.rotation),
    });
  }

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}
