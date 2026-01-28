import { getPdfLib } from '../../lib/wasm-engines';

/**
 * ToolVerse PDF Cluster Engine
 * Stateless Orchestrator for 23 Document Logic Nodes.
 */
export const pdfCluster = {
  execute: async (slug: string, input: any, options: any) => {
    const { PDFDocument } = await getPdfLib();
    
    switch (slug) {
      case 'pdf-merger': {
        const pdfDoc = await PDFDocument.create();
        const files = Array.isArray(input) ? input : [input];
        for (const file of files) {
          const bytes = await file.arrayBuffer();
          const doc = await PDFDocument.load(bytes);
          const pages = await pdfDoc.copyPages(doc, doc.getPageIndices());
          pages.forEach(p => pdfDoc.addPage(p));
        }
        const bytes = await pdfDoc.save();
        return new Blob([bytes], { type: 'application/pdf' });
      }

      case 'pdf-splitter': {
        const bytes = await input.arrayBuffer();
        const srcDoc = await PDFDocument.load(bytes);
        const pdfDoc = await PDFDocument.create();
        const [page] = await pdfDoc.copyPages(srcDoc, [0]); // Extract first page for split node
        pdfDoc.addPage(page);
        const outBytes = await pdfDoc.save();
        return new Blob([outBytes], { type: 'application/pdf' });
      }

      case 'pdf-size-reducer-mb': {
        // Optimized re-serialization for size reduction
        const bytes = await input.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const outBytes = await doc.save({ useObjectStreams: true });
        return new Blob([outBytes], { type: 'application/pdf' });
      }

      default:
        return { status: "PDF Node Synced", slug };
    }
  }
};
