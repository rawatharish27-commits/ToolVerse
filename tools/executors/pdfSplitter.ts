
import { getPdfLib } from '../../lib/wasm-engines';

/**
 * Parses strings like "1-3, 5, 8-10" into an array of 0-indexed page numbers.
 */
function parsePageRange(rangeStr: string, maxPages: number): number[] {
  const pages: number[] = [];
  const parts = rangeStr.split(',').map(p => p.trim());

  parts.forEach(part => {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map(n => parseInt(n));
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = Math.max(1, start); i <= Math.min(end, maxPages); i++) {
          pages.push(i - 1);
        }
      }
    } else {
      const p = parseInt(part);
      if (!isNaN(p) && p >= 1 && p <= maxPages) {
        pages.push(p - 1);
      }
    }
  });

  return Array.from(new Set(pages)).sort((a, b) => a - b);
}

/**
 * PDF Splitter Engine
 * Extracts specific pages into a new PDF document.
 */
export async function pdfSplitter(
  file: File,
  options: { mode: string; range: string }
): Promise<Blob> {
  const { PDFDocument } = await getPdfLib();
  const bytes = await file.arrayBuffer();
  const sourceDoc = await PDFDocument.load(bytes);
  const totalPages = sourceDoc.getPageCount();
  
  const targetDoc = await PDFDocument.create();
  let indicesToCopy: number[] = [];

  if (options.mode === 'Individual Pages') {
    // Default to first page if nothing provided
    indicesToCopy = options.range ? parsePageRange(options.range, totalPages) : [0];
  } else {
    indicesToCopy = parsePageRange(options.range, totalPages);
  }

  if (indicesToCopy.length === 0) throw new Error("No valid pages selected for extraction.");

  const copiedPages = await targetDoc.copyPages(sourceDoc, indicesToCopy);
  copiedPages.forEach(p => targetDoc.addPage(p));

  const pdfBytes = await targetDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}
