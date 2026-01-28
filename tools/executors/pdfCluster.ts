import { getPdfLib } from '../../lib/wasm-engines';

/**
 * ToolVerse PDF Cluster Logic
 * Deterministic document transformation engine.
 */
export const pdfCluster = {
  execute: async (slug: string, input: any, options: any) => {
    const { PDFDocument } = await getPdfLib();

    if (slug === 'pdf-merger') {
      const files = Array.isArray(input) ? input : [input];
      if (files.length < 2) throw new Error("PDF Merger requires minimum 2 documents.");

      const mergedDoc = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const pages = await mergedDoc.copyPages(doc, doc.getPageIndices());
        pages.forEach(p => mergedDoc.addPage(p));
      }

      const pdfBytes = await mergedDoc.save();
      return new Blob([pdfBytes], { type: 'application/pdf' });
    }

    // Fallback logic
    return { success: true, node: slug };
  }
};
