import React, { useState } from 'react';
import { getPdfLib, getPdfJs, runOCRTask } from '../../lib/wasm-engines';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { pdfCompressorConfig, pdfMergerConfig, pdfSplitterConfig, pdfPageReorderConfig, pdfToImageConfig, imageToPdfConfig, pdfToWordConfig, pdfOcrConfig } from '../../config/pdfTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const PAGE_SIZES: Record<string, [number, number]> = {
  A4: [595.28, 841.89],
  Letter: [612, 792],
};

const PDFTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState('');
  const [renderImages, setRenderImages] = useState<string[]>([]);
  const [resultSize, setResultSize] = useState<number>(0);
  const [isZip, setIsZip] = useState(false);
  
  // Reorder State
  const [pageOrder, setPageOrder] = useState<number[]>([]);
  
  // Dynamic State for Options
  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    const configs = [pdfCompressorConfig, pdfMergerConfig, pdfSplitterConfig, pdfPageReorderConfig, pdfToImageConfig, imageToPdfConfig, pdfToWordConfig, pdfOcrConfig];
    const target = configs.find(c => c.slug === slug || (slug.includes('merge') && c.slug.includes('merge')) || (slug.includes('split') && c.slug.includes('split')));
    
    if (target) {
      target.options.forEach(opt => initial[opt.id] = opt.default);
    }
    return initial;
  });

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    setFiles(selectedFiles);
    
    if (slug === 'pdf-page-reorder' && selectedFiles && selectedFiles.length > 0) {
      try {
        setLoading(true);
        const { PDFDocument } = await getPdfLib();
        const bytes = await selectedFiles[0].arrayBuffer();
        const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
        const count = doc.getPageCount();
        setPageOrder(Array.from({ length: count }, (_, i) => i));
      } catch (err) {
        onError("Failed to analyze PDF pages. It might be encrypted or corrupted.");
      } finally {
        setLoading(false);
      }
    }
  };

  const processPDF = async () => {
    if (!files || files.length === 0) return;
    try {
      setLoading(true);
      setProgress(10);
      const { PDFDocument } = await getPdfLib();

      if (slug === 'pdf-compressor' || slug === 'pdf-compressor-pro') {
        const file = files[0];
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        
        setProgress(40);
        if (options.removeMetadata) {
          doc.setTitle(''); doc.setAuthor(''); doc.setSubject(''); doc.setCreator(''); doc.setProducer('');
        }
        if (options.flattenForms) {
          try { doc.getForm().flatten(); } catch (e) {}
        }

        setProgress(70);
        const pdfBytes = await doc.save({ 
          useObjectStreams: options.compressStreams,
          addDefaultPage: false,
          updateFieldAppearances: false
        });

        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        setResultSize(blob.size);
        setOutputUrl(URL.createObjectURL(blob));
        onSuccess(`Compression complete! Saved ${Math.round(((file.size - blob.size) / file.size) * 100)}% space.`);
      } 
      
      else if (slug === 'pdf-merger' || slug === 'pdf-merge') {
        if (files.length < 2) throw new Error("At least 2 PDF files required.");
        
        const mergedPdf = await PDFDocument.create();
        const fileList = Array.from(files) as File[];
        
        for (let i = 0; i < fileList.length; i++) {
          const bytes = await fileList[i].arrayBuffer();
          const doc = await PDFDocument.load(bytes);
          const copiedPages = await mergedPdf.copyPages(doc, doc.getPageIndices());
          copiedPages.forEach((page) => mergedPdf.addPage(page));
          setProgress(Math.round(((i + 1) / fileList.length) * 100));
        }

        if (options.removeMetadata) {
          mergedPdf.setTitle(''); mergedPdf.setAuthor(''); mergedPdf.setSubject(''); mergedPdf.setCreator('');
        }

        if (options.flattenForms) {
          try { mergedPdf.getForm().flatten(); } catch (e) {}
        }

        const pdfBytes = await mergedPdf.save({
          useObjectStreams: options.compressAfterMerge,
          compress: options.compressAfterMerge
        });

        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        setResultSize(blob.size);
        setOutputUrl(URL.createObjectURL(blob));
        onSuccess("PDFs merged successfully!");
      }

      else if (slug === 'pdf-splitter' || slug === 'pdf-split') {
        const file = files[0];
        const bytes = await file.arrayBuffer();
        const srcPdf = await PDFDocument.load(bytes);
        const totalPages = srcPdf.getPageCount();
        
        const { default: JSZip } = await import('jszip');
        const zip = new JSZip();
        let pdfCount = 0;

        const addChunkToZip = async (indices: number[], name: string) => {
          const newPdf = await PDFDocument.create();
          const copied = await newPdf.copyPages(srcPdf, indices);
          copied.forEach(p => newPdf.addPage(p));
          
          if (options.removeMetadata) {
            newPdf.setTitle(''); newPdf.setAuthor('');
          }

          const pdfBytes = await newPdf.save({ useObjectStreams: options.compressOutput });
          zip.file(name, pdfBytes);
          pdfCount++;
        };

        if (options.mode === "Every Page") {
          for (let i = 0; i < totalPages; i++) {
            await addChunkToZip([i], `page-${i + 1}.pdf`);
            setProgress(Math.round((i / totalPages) * 100));
          }
        } else if (options.mode === "Every N Pages") {
          const n = parseInt(options.everyN) || 1;
          for (let i = 0; i < totalPages; i += n) {
            const indices = [];
            for (let j = i; j < i + n && j < totalPages; j++) indices.push(j);
            await addChunkToZip(indices, `split-${Math.floor(i / n) + 1}.pdf`);
            setProgress(Math.round((i / totalPages) * 100));
          }
        } else {
          // Page Range mode (1-3, 5)
          const ranges = options.pageRange.split(',');
          for (let i = 0; i < ranges.length; i++) {
            const range = ranges[i].trim();
            if (range.includes('-')) {
              const [start, end] = range.split('-').map(v => parseInt(v.trim()));
              const indices = [];
              for (let idx = start - 1; idx < end && idx < totalPages; idx++) {
                if (idx >= 0) indices.push(idx);
              }
              if (indices.length > 0) await addChunkToZip(indices, `range-${start}-${end}.pdf`);
            } else {
              const idx = parseInt(range) - 1;
              if (idx >= 0 && idx < totalPages) await addChunkToZip([idx], `page-${range}.pdf`);
            }
          }
        }

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        setResultSize(zipBlob.size);
        setOutputUrl(URL.createObjectURL(zipBlob));
        setIsZip(true);
        onSuccess(`PDF split into ${pdfCount} file(s).`);
      }

      else if (slug === 'pdf-page-reorder') {
        if (pageOrder.length === 0) throw new Error("No pages selected.");
        const file = files[0];
        const bytes = await file.arrayBuffer();
        const srcPdf = await PDFDocument.load(bytes);
        const outPdf = await PDFDocument.create();

        setProgress(30);
        const copiedPages = await outPdf.copyPages(srcPdf, pageOrder);
        copiedPages.forEach(p => outPdf.addPage(p));
        
        setProgress(70);
        if (options.removeMetadata) {
          outPdf.setTitle(''); outPdf.setAuthor('');
        }
        
        const pdfBytes = await outPdf.save({ useObjectStreams: options.compressOutput });
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        setResultSize(blob.size);
        setOutputUrl(URL.createObjectURL(blob));
        onSuccess("PDF pages reordered successfully!");
      }

      else if (slug === 'pdf-to-image' || slug === 'pdf-to-jpg') {
        const file = files[0];
        const pdfjs = await getPdfJs();
        pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
        
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        const totalPages = pdf.numPages;
        
        const { default: JSZip } = await import('jszip');
        const zip = new JSZip();
        const format = options.format || 'png';
        const mime = format === 'jpg' ? 'image/jpeg' : 'image/png';
        const scale = (parseInt(options.dpi) || 150) / 72;
        const quality = (options.quality || 85) / 100;
        const images: string[] = [];

        for (let i = 1; i <= totalPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          
          await page.render({ canvasContext: ctx, viewport }).promise;
          
          if (options.zipOutput) {
            const blob: Blob = await new Promise(resolve => canvas.toBlob(b => resolve(b!), mime, quality));
            zip.file(`page-${i}.${format}`, blob);
          } else {
            images.push(canvas.toDataURL(mime, quality));
          }
          
          setProgress(Math.round((i / totalPages) * 100));
        }

        if (options.zipOutput) {
          const zipBlob = await zip.generateAsync({ type: 'blob' });
          setResultSize(zipBlob.size);
          setOutputUrl(URL.createObjectURL(zipBlob));
          setIsZip(true);
        } else {
          setRenderImages(images);
          onSuccess(`${totalPages} images rendered.`);
        }
        onSuccess("PDF conversion complete!");
      }

      else if (slug === 'image-to-pdf') {
        const outPdf = await PDFDocument.create();
        const fileList = Array.from(files) as File[];
        const margin = options.margin || 0;
        
        for (let i = 0; i < fileList.length; i++) {
          const file = fileList[i];
          const bytes = await file.arrayBuffer();
          let img;
          if (file.type === 'image/png') {
            img = await outPdf.embedPng(bytes);
          } else if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
            img = await outPdf.embedJpg(bytes);
          } else {
            continue; // Skip unsupported formats
          }

          let pageWidth, pageHeight;
          if (options.pageSize === 'Original') {
            pageWidth = img.width + (margin * 2);
            pageHeight = img.height + (margin * 2);
          } else {
            const standardSize = PAGE_SIZES[options.pageSize || 'A4'];
            [pageWidth, pageHeight] = options.orientation === 'Landscape' ? [standardSize[1], standardSize[0]] : [standardSize[0], standardSize[1]];
          }

          const page = outPdf.addPage([pageWidth, pageHeight]);
          const usableWidth = pageWidth - (margin * 2);
          const usableHeight = pageHeight - (margin * 2);

          let drawWidth = usableWidth;
          let drawHeight = usableHeight;
          const imgRatio = img.width / img.height;
          const pageRatio = usableWidth / usableHeight;

          if (options.fitMode === 'Contain') {
            if (imgRatio > pageRatio) {
              drawHeight = usableWidth / imgRatio;
            } else {
              drawWidth = usableHeight * imgRatio;
            }
          } else { // Cover
            if (imgRatio > pageRatio) {
              drawWidth = usableHeight * imgRatio;
            } else {
              drawHeight = usableWidth / imgRatio;
            }
          }

          page.drawImage(img, {
            x: margin + (usableWidth - drawWidth) / 2,
            y: margin + (usableHeight - drawHeight) / 2,
            width: drawWidth,
            height: drawHeight,
          });

          setProgress(Math.round(((i + 1) / fileList.length) * 100));
        }

        const pdfBytes = await outPdf.save({ useObjectStreams: true });
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        setResultSize(blob.size);
        setOutputUrl(URL.createObjectURL(blob));
        onSuccess("PDF created from images!");
      }

      else if (slug === 'pdf-to-word-converter' || slug === 'pdf-to-word') {
        const file = files[0];
        const pdfjs = await getPdfJs();
        pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        const totalPages = pdf.numPages;

        const { Document, Packer, Paragraph, TextRun } = await import('docx');
        const sectionsChildren: any[] = [];

        for (let i = 1; i <= totalPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const lines: string[] = [];
          let lastY = -1;
          let currentLine = "";

          content.items.forEach((item: any) => {
            if (lastY !== -1 && Math.abs(item.transform[5] - lastY) > 5) {
              lines.push(currentLine);
              currentLine = "";
            }
            currentLine += item.str + " ";
            lastY = item.transform[5];
          });
          lines.push(currentLine);

          lines.forEach(line => {
            const trimmed = line.trim();
            if (options.removeEmptyLines && !trimmed) return;
            sectionsChildren.push(new Paragraph({
              children: [new TextRun({ text: options.normalizeSpacing ? trimmed.replace(/\s+/g, ' ') : line })]
            }));
          });
          
          if (i < totalPages) {
            sectionsChildren.push(new Paragraph({ children: [new TextRun({ text: "", break: 1 })] }));
          }
          
          setProgress(Math.round((i / totalPages) * 100));
        }

        const doc = new Document({
          sections: [{
            properties: {},
            children: sectionsChildren,
          }],
        });

        const docxBlob = await Packer.toBlob(doc);
        setResultSize(docxBlob.size);
        setOutputUrl(URL.createObjectURL(docxBlob));
        onSuccess("PDF converted to Word document!");
      }

      else if (slug === 'pdf-ocr' || slug === 'pdf-to-text') {
        const file = files[0];
        const pdfjs = await getPdfJs();
        pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
        
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        const totalPages = pdf.numPages;
        
        let fullText = "";
        const dpi = parseInt(options.scanResolution) || 300;
        const scale = dpi / 72;

        for (let i = 1; i <= totalPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          
          // Phase 1: Rendering
          await page.render({ canvasContext: ctx, viewport }).promise;
          const imageBlob: Blob = await new Promise(resolve => canvas.toBlob(b => resolve(b!), 'image/jpeg', 0.9));
          
          // Phase 2: OCR
          const pageText = await runOCRTask(imageBlob, (p) => {
            const currentTotal = Math.round(((i - 1 + p) / totalPages) * 100);
            setProgress(currentTotal);
          });
          
          fullText += `--- PAGE ${i} ---\n${pageText}\n\n`;
        }

        setExtractedText(fullText);
        if (options.outputType === "Formatted (.txt)") {
          const blob = new Blob([fullText], { type: 'text/plain' });
          setOutputUrl(URL.createObjectURL(blob));
        }
        onSuccess("AI-OCR Analysis Complete!");
      }

    } catch (err: any) {
      console.error(err);
      onError(err.message || "PDF processing failed.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const isMerge = (slug === 'pdf-merger' || slug === 'pdf-merge');
  const isSplit = (slug === 'pdf-splitter' || slug === 'pdf-split');
  const isCompress = (slug === 'pdf-compressor' || slug === 'pdf-compressor-pro');
  const isReorder = (slug === 'pdf-page-reorder');
  const isToImage = (slug === 'pdf-to-image' || slug === 'pdf-to-jpg');
  const isImageToPdf = (slug === 'image-to-pdf');
  const isToWord = (slug === 'pdf-to-word-converter' || slug === 'pdf-to-word');
  const isOcr = (slug === 'pdf-ocr' || slug === 'pdf-to-text');

  const currentConfig = isMerge ? pdfMergerConfig : isSplit ? pdfSplitterConfig : isReorder ? pdfPageReorderConfig : isToImage ? pdfToImageConfig : isImageToPdf ? imageToPdfConfig : isToWord ? pdfToWordConfig : isOcr ? pdfOcrConfig : pdfCompressorConfig;

  const movePage = (index: number, direction: number) => {
    const newOrder = [...pageOrder];
    const target = index + direction;
    if (target < 0 || target >= newOrder.length) return;
    [newOrder[index], newOrder[target]] = [newOrder[target], newOrder[index]];
    setPageOrder(newOrder);
  };

  const removePage = (index: number) => {
    setPageOrder(pageOrder.filter((_, i) => i !== index));
  };

  const inputSlot = (
    <div className="space-y-8">
      <div className="p-10 md:p-16 border-4 border-dashed border-slate-100 rounded-[3rem] text-center hover:border-red-100 transition-all cursor-pointer group relative">
        <input 
          type="file" 
          accept={isImageToPdf ? "image/png, image/jpeg" : "application/pdf"} 
          multiple={isMerge || isImageToPdf}
          onChange={handleFileChange} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
        />
        <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">{currentConfig.icon}</div>
        <p className="text-slate-900 font-black text-lg">
          {files ? `${files.length} File(s) Selected` : isMerge ? "Select multiple PDFs to merge" : isImageToPdf ? "Select images to convert to PDF" : isOcr ? "Upload scanned PDF for OCR" : "Click or Drag PDF file here"}
        </p>
        <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-widest">
           {isImageToPdf ? "Supports JPG and PNG" : "Supports high-res documents"}
        </p>
      </div>

      {isReorder && pageOrder.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-in fade-in duration-500">
           {pageOrder.map((pageIdx, i) => (
             <div key={`${pageIdx}-${i}`} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 group/item hover:border-red-200 transition-all">
                <div className="flex justify-between items-center mb-4">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Page {pageIdx + 1}</span>
                   <button onClick={() => removePage(i)} className="text-slate-300 hover:text-red-500 transition-colors">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                   </button>
                </div>
                <div className="aspect-[3/4] bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center text-3xl font-black text-slate-200 mb-4">
                  {pageIdx + 1}
                </div>
                <div className="flex gap-2">
                   <button 
                    disabled={i === 0} 
                    onClick={() => movePage(i, -1)} 
                    className="flex-grow py-2 bg-white text-slate-400 hover:text-red-600 rounded-xl border border-slate-100 hover:border-red-100 transition-all disabled:opacity-30"
                   >
                     ←
                   </button>
                   <button 
                    disabled={i === pageOrder.length - 1} 
                    onClick={() => movePage(i, 1)} 
                    className="flex-grow py-2 bg-white text-slate-400 hover:text-red-600 rounded-xl border border-slate-100 hover:border-red-100 transition-all disabled:opacity-30"
                   >
                     →
                   </button>
                </div>
             </div>
           ))}
        </div>
      )}
    </div>
  );

  const optionsSlot = (isMerge || isSplit || isCompress || isReorder || isToImage || isImageToPdf || isToWord || isOcr) ? (
    <OptionsPanel 
      options={currentConfig.options as any} 
      values={options} 
      onChange={handleOptionChange} 
    />
  ) : undefined;

  const actionsSlot = (
    <button 
      disabled={loading || !files || (isReorder && pageOrder.length === 0)} 
      onClick={processPDF} 
      className="w-full py-6 bg-red-600 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50"
    >
      {loading ? `Processing (${progress}%)...` : isMerge ? "Merge Selected PDFs" : isSplit ? "Split PDF Document" : isReorder ? "Reorder and Save PDF" : isToImage ? "Convert PDF to Images" : isImageToPdf ? "Create PDF from Images" : isToWord ? "Convert PDF to Word" : isOcr ? "Extract Text via OCR" : "Optimize PDF"}
    </button>
  );

  const resultSlot = (
    <div className="space-y-8">
      {outputUrl && (
        <div className="space-y-6 text-center">
          {(!isZip && !isToWord && !isOcr) && (
            <div className="rounded-[2.5rem] overflow-hidden border-8 border-slate-50 shadow-inner h-[500px]">
              <iframe src={outputUrl} className="w-full h-full" />
            </div>
          )}
          {(isZip || isToWord || isOcr) && (
             <div className="p-16 bg-slate-50 rounded-[3rem] border border-slate-200 text-center">
               <div className="text-7xl mb-6">{isToWord || isOcr ? '📝' : '📦'}</div>
               <h3 className="text-2xl font-black text-slate-900 mb-2">Result Ready</h3>
               <p className="text-slate-500 font-medium mb-8">
                 {isOcr ? 'Optical Character Recognition complete. Your text file is ready.' : isToWord ? 'Your editable Word document has been generated.' : 'Your processed files have been bundled into a ZIP archive.'}
               </p>
             </div>
          )}
          <div className="flex justify-center">
            <a href={outputUrl} download={`toolverse_${slug}_${Date.now()}.${isZip ? 'zip' : isOcr ? 'txt' : isToWord ? 'docx' : 'pdf'}`} className="px-12 py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-emerald-700 transition-all transform hover:scale-105">
               Download {isZip ? 'All Files (ZIP)' : isOcr ? 'Text File' : isToWord ? 'Word Document' : 'Processed File'}
            </a>
          </div>
        </div>
      )}

      {extractedText && (
        <div className="bg-slate-950 p-8 rounded-[2.5rem] text-left border border-slate-800 shadow-2xl relative">
           <div className="flex justify-between items-center mb-6">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Data Buffer (OCR Output)</span>
             <button onClick={() => { navigator.clipboard.writeText(extractedText); onSuccess("Copied!"); }} className="text-emerald-400 text-xs font-black uppercase hover:underline">Copy All</button>
           </div>
           <div className="text-sm font-mono text-emerald-500/80 whitespace-pre-wrap max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 leading-relaxed">
             {extractedText}
           </div>
        </div>
      )}
    </div>
  );

  const totalOriginalSize = files ? (Array.from(files) as File[]).reduce((acc: number, f: File) => acc + f.size, 0) : 0;

  return (
    <ToolLayout
      title={currentConfig.title}
      description={currentConfig.description}
      icon={currentConfig.icon}
      colorClass={currentConfig.colorClass}
      input={inputSlot}
      options={optionsSlot}
      actions={actionsSlot}
      result={(outputUrl || extractedText || renderImages.length > 0) ? resultSlot : undefined}
      comparison={files && outputUrl && !isOcr ? (
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="text-center md:text-left">
              <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Source Size</div>
              <div className="text-3xl font-black">{(totalOriginalSize / 1024 / 1024).toFixed(2)} MB</div>
           </div>
           <div className="w-12 h-12 flex items-center justify-center text-red-400 text-2xl font-black">»</div>
           <div className="text-center md:text-right">
              <div className="text-red-400 text-[10px] font-black uppercase tracking-widest mb-1">Processed Result</div>
              <div className="text-3xl font-black text-emerald-400">
                {(resultSize / 1024 / 1024).toFixed(2)} MB
              </div>
           </div>
        </div>
      ) : undefined}
    />
  );
};

export default PDFTools;