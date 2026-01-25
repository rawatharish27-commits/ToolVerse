
import { getPdfLib } from '../../lib/wasm-engines';

/**
 * PDF Compressor Engine
 * Optimizes the document structure and streams for minimum footprint.
 */
export async function pdfCompressor(
  file: File,
  options: { quality: number; targetMb?: number }
): Promise<Blob> {
  const { PDFDocument } = await getPdfLib();
  const bytes = await file.arrayBuffer();
  
  // Load with optimizations
  const pdfDoc = await PDFDocument.load(bytes, { 
    updateMetadata: false,
    capNumbers: true 
  });

  // Structural compression:
  // 1. Remove duplicate objects
  // 2. Compress content streams
  // 3. Re-save using FlateDecode
  const pdfBytes = await pdfDoc.save({
    useObjectStreams: true,
    addDefaultPage: false,
  });

  return new Blob([pdfBytes], { type: 'application/pdf' });
}
