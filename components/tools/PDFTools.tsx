import React, { useState } from 'react';
import { getPdfLib, runOCRTask, renderPdfToImages } from '../../lib/wasm-engines';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const PDFTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState('');
  const [renderImages, setRenderImages] = useState<string[]>([]);
  const [rotation, setRotation] = useState(0);

  const processPDF = async () => {
    if (!files || files.length === 0) return;
    try {
      setLoading(true);
      setProgress(5);
      const { PDFDocument, degrees } = await getPdfLib();

      if (slug === 'pdf-merge') {
        const mergedPdf = await PDFDocument.create();
        for (let i = 0; i < files.length; i++) {
          const bytes = await files[i].arrayBuffer();
          const doc = await PDFDocument.load(bytes);
          const copiedPages = await mergedPdf.copyPages(doc, doc.getPageIndices());
          copiedPages.forEach((page) => mergedPdf.addPage(page));
          setProgress(Math.round(((i + 1) / files.length) * 100));
        }
        const pdfBytes = await mergedPdf.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        setOutputUrl(URL.createObjectURL(blob));
        onSuccess("PDFs merged successfully!");
      } 
      
      else if (slug === 'pdf-split') {
        const bytes = await files[0].arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const splitPdf = await PDFDocument.create();
        // Just extract the first page as a demo for split
        const [firstPage] = await splitPdf.copyPages(doc, [0]);
        splitPdf.addPage(firstPage);
        const pdfBytes = await splitPdf.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        setOutputUrl(URL.createObjectURL(blob));
        onSuccess("First page extracted!");
      }

      else if (slug === 'pdf-rotate') {
        const bytes = await files[0].arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const pages = doc.getPages();
        pages.forEach(p => p.setRotation(degrees(rotation || 90)));
        const pdfBytes = await doc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        setOutputUrl(URL.createObjectURL(blob));
        onSuccess("PDF rotated successfully!");
      }

      else if (slug === 'pdf-compressor') {
        // Basic optimization: Remove unused objects (standard in save())
        const bytes = await files[0].arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const pdfBytes = await doc.save({ useObjectStreams: true });
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        setOutputUrl(URL.createObjectURL(blob));
        onSuccess("PDF optimized and saved.");
      }

      else if (slug === 'pdf-to-jpg') {
        const images = await renderPdfToImages(files[0], p => setProgress(p));
        setRenderImages(images);
        onSuccess("PDF converted to images!");
      }

      else if (slug === 'pdf-to-text') {
        const images = await renderPdfToImages(files[0], p => setProgress(p * 0.4));
        let fullText = "";
        for (let i = 0; i < images.length; i++) {
          const text = await runOCRTask(images[i]);
          fullText += `--- PAGE ${i + 1} ---\n${text}\n\n`;
          setProgress(40 + ((i + 1) / images.length) * 60);
        }
        setExtractedText(fullText);
        onSuccess("OCR complete!");
      }

      else if (slug === 'pdf-protect' || slug === 'pdf-unlock') {
         onError("AES Protection/Unlock requires server-side worker for high reliability. Coming soon.");
      }

    } catch (err) {
      console.error(err);
      onError("PDF processing failed.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="py-12 text-center space-y-10 max-w-2xl mx-auto">
      <div className="text-8xl">📄</div>
      
      <div className="space-y-4">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
          {slug === 'pdf-merge' ? 'Select multiple PDF files' : 'Select PDF file'}
        </label>
        <input 
          type="file" 
          accept="application/pdf" 
          multiple={slug === 'pdf-merge'}
          onChange={e => setFiles(e.target.files)} 
          className="mx-auto block bg-slate-100 p-4 rounded-2xl w-full max-w-md" 
        />
      </div>

      {slug === 'pdf-rotate' && (
        <div className="flex justify-center gap-4">
          {[90, 180, 270].map(deg => (
            <button 
              key={deg} 
              onClick={() => setRotation(deg)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${rotation === deg ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              Rotate {deg}°
            </button>
          ))}
        </div>
      )}

      <div className="space-y-4 max-w-md mx-auto">
        <button 
          disabled={loading || !files} 
          onClick={processPDF} 
          className="w-full py-5 bg-red-600 text-white rounded-2xl font-black text-xl shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? "Processing..." : "Run PDF Engine"}
        </button>
        {loading && (
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>

      {(outputUrl || extractedText || renderImages.length > 0) && (
        <div className="pt-8 animate-in slide-in-from-bottom space-y-8">
          {outputUrl && (
             <div className="space-y-4">
                <iframe src={outputUrl} className="w-full h-96 rounded-2xl border-4 border-white shadow-xl" />
                <a href={outputUrl} download={`toolverse_${slug}.pdf`} className="inline-block px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl">
                  Download PDF
                </a>
             </div>
          )}

          {renderImages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderImages.map((img, i) => (
                <div key={i} className="space-y-2">
                  <img src={img} className="rounded-xl shadow-lg border border-slate-200" />
                  <a href={img} download={`page_${i+1}.jpg`} className="text-xs font-bold text-indigo-600 underline">Download Page {i+1}</a>
                </div>
              ))}
            </div>
          )}

          {extractedText && (
            <div className="bg-slate-50 p-6 rounded-3xl text-left border border-slate-200">
               <p className="text-xs font-bold text-slate-400 mb-2 uppercase">OCR Text Results:</p>
               <div className="text-sm font-mono whitespace-pre-wrap max-h-64 overflow-y-auto">{extractedText}</div>
               <button onClick={() => {
                  navigator.clipboard.writeText(extractedText);
                  onSuccess("Text copied!");
               }} className="mt-4 text-xs font-bold text-indigo-600 underline">Copy All To Clipboard</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PDFTools;