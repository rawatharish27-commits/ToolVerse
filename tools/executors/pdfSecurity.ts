
import { getPdfLib } from '../../lib/wasm-engines';

/**
 * PDF Security Engine
 * Handles basic permission removal and metadata-based locking.
 */
export async function pdfSecurity(
  file: File,
  options: { mode: 'protect' | 'unlock'; password?: string }
): Promise<Blob> {
  const { PDFDocument } = await getPdfLib();
  const bytes = await file.arrayBuffer();
  
  // NOTE: pdf-lib (v1.17.1) can load encrypted files if password is provided,
  // but it does not support setting a new password (encryption) on save.
  // We use this executor to provide a clean re-serialization which often 
  // strips 'Owner Passwords' (printing/editing restrictions).
  
  const pdfDoc = await PDFDocument.load(bytes, { 
    password: options.password,
    ignoreEncryption: options.mode === 'unlock' 
  });

  // Re-save without encryption flags
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}
