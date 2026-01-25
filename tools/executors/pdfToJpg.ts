
import { renderPdfToImages } from '../../lib/wasm-engines';
import JSZip from 'jszip';

export interface PdfToJpgResult {
  zipBlob: Blob;
  imageCount: number;
  individualImages: string[];
}

/**
 * PDF to JPG Engine
 * Renders pages to canvas and bundles them into a downloadable ZIP.
 */
export async function pdfToJpg(
  file: File,
  onProgress: (p: number) => void
): Promise<PdfToJpgResult> {
  // 1. Render all pages to high-res JPEG strings
  const images = await renderPdfToImages(file, onProgress);
  
  // 2. Bundle into ZIP
  const zip = new JSZip();
  const folder = zip.folder("toolverse_images");
  
  images.forEach((dataUrl, index) => {
    const base64Data = dataUrl.split(',')[1];
    folder?.file(`page_${index + 1}.jpg`, base64Data, { base64: true });
  });

  const zipBlob = await zip.generateAsync({ type: 'blob' });

  return {
    zipBlob,
    imageCount: images.length,
    individualImages: images
  };
}
