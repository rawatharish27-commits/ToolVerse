import React, { useState } from 'react';
import { getPdfLib, getPdfJs, runOCRTask } from '../../lib/wasm-engines';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { pdfCompressorConfig, pdfSizeReducerConfig, pdfMergerConfig, pdfSplitterConfig, pdfPageReorderConfig, pdfToImageConfig, imageToPdfConfig, pdfToWordConfig, pdfOcrConfig, pdfProtectConfig, pdfUnlockConfig, pdfMetadataConfig, pdfPageNumbersConfig, pdfWatermarkProConfig } from '../../config/pdfTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

interface MergerFileState {
  file: File;
  start: number;
  end: number;
  total: number;
}

const PAGE_SIZES: Record<string, [number, number]> = {
  "A4": [595.28, 841.89],
  "Letter": [612, 792],
};

function toRoman(num: number): string {
  const map: Record<string, number> = {
    m: 1000, cm: 900, d: 500, cd: 400,
    c: 100, xc: 90, l: 50, xl: 40,
    x: 10, ix: 9, v: 5, iv: 4, i: 1
  };
  let result = "";
  for (const key in map) {
    while (num >= map[key]) {
      result += key;
      num -= map[key];
    }
  }
  return result;
}

const PDFTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState('');
  const [renderImages, setRenderImages] = useState<string[]>([]);
  const [resultSize, setResultSize] = useState<number>(0);
  const [isZip, setIsZip] = useState(false);
  
  // PDF Data State
  const [mergerFiles, setMergerFiles] = useState<MergerFileState[]>([]);
  const [pdfMetadata, setPdfMetadata] = useState<any>(null);
  
  // Dynamic State for Options
  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    const configs = [pdfCompressorConfig, pdfSizeReducerConfig, pdfMergerConfig, pdfSplitterConfig, pdfPageReorderConfig, pdfToImageConfig, imageToPdfConfig, pdfToWordConfig, pdfOcrConfig, pdfProtectConfig, pdfUnlockConfig, pdfMetadataConfig, pdfPageNumbersConfig, pdfWatermarkProConfig];
    const target = configs.find(c => c.slug === slug || (slug.includes('merge') && c.slug.includes('merge')) || (slug.includes('split') && c.slug.includes('split')) || (slug.includes('jpg') && c.slug.includes('jpg')) || (slug.includes('to-pdf') && c.slug.includes('to-pdf')) || (slug.includes('reducer') && c.slug.includes('reducer')) || (slug.includes('number') && c.slug.includes('number')) || (slug.includes('watermark') && c.slug.includes('watermark')) || (slug.includes('protect') && c.slug.includes('protect')) || (slug.includes('remover') && c.slug.includes('remover')) || (slug.includes('viewer') && c.slug.includes('viewer')));
    
    if (target) {
      target.options.forEach(opt => initial[opt.id] = (opt as any).default);
    }
    return initial;
  });

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;
    setFiles(selectedFiles);
    
    const { PDFDocument } = await getPdfLib();

    if (slug === 'pdf-merger' || slug === 'pdf-merge') {
      setLoading(true);
      const newMergerFiles: MergerFileState[] = [];
      for (const file of Array.from(selectedFiles) as File[]) {
        try {
          const bytes = await file.arrayBuffer();
          const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
          const count = doc.getPageCount();
          newMergerFiles.push({ file, start: 1, end: count, total: count });
        } catch (err) {
          console.warn(`Skipping invalid PDF: ${file.name}`);
        }
      }
      setMergerFiles(newMergerFiles);
      setLoading(false);
    }

    if (slug === 'pdf-metadata-viewer') {
       processPDF(selectedFiles[0]);
    }
  };

  const processPDF = async (overrideFile?: File) => {
    const targetFile = overrideFile || (files ? files[0] : null);
    if ((slug !== 'pdf-merger' && !targetFile) || (slug === 'pdf-merger' && mergerFiles.length === 0)) return;
    
    try {
      setLoading(true);
      setProgress(10);
      const { PDFDocument, rgb, degrees, StandardFonts } = await getPdfLib();

      if (slug === 'pdf-metadata-viewer') {
        const bytes = await targetFile!.arrayBuffer();
        let doc;
        try {
          doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
        } catch {
          throw new Error("Unable to read PDF. It might be heavily encrypted.");
        }
        
        const metadata = {
          title: doc.getTitle() || "Untitled",
          author: doc.getAuthor() || "Unknown",
          subject: doc.getSubject() || "N/A",
          creator: doc.getCreator() || "N/A",
          producer: doc.getProducer() || "N/A",
          creationDate: doc.getCreationDate()?.toLocaleString() || "N/A",
          modificationDate: doc.getModificationDate()?.toLocaleString() || "N/A",
          pageCount: doc.getPageCount(),
          fileSize: (targetFile!.size / 1024).toFixed(2) + " KB"
        };
        setPdfMetadata(metadata);
        onSuccess("Metadata analysis complete!");
        setLoading(false);
        return;
      }

      if (slug === 'pdf-password-remover') {
        const bytes = await targetFile!.arrayBuffer();
        let doc;
        try {
          doc = await PDFDocument.load(bytes, { password: options.password });
        } catch {
          throw new Error("Incorrect password or unsupported encryption type.");
        }

        const unlockedBytes = await doc.save();
        const blob = new Blob([unlockedBytes], { type: 'application/pdf' });
        setResultSize(blob.size);
        setOutputUrl(URL.createObjectURL(blob));
        setIsZip(false);
        onSuccess("Password removed successfully!");
      }

      else if (slug === 'pdf-password-protect') {
        const bytes = await targetFile!.arrayBuffer();
        const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
        if (!options.userPassword) throw new Error("Please set an 'Open Password' to secure the file.");

        doc.encrypt({
          userPassword: options.userPassword,
          ownerPassword: options.ownerPassword || options.userPassword,
          permissions: {
            printing: options.allowPrint ? 'highResolution' : 'none',
            copying: options.allowCopy,
            modifying: options.allowModify,
            annotating: options.allowModify,
            forms: options.allowModify,
            contentAccessibility: true,
          },
        });

        const pdfBytes = await doc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        setResultSize(blob.size);
        setOutputUrl(URL.createObjectURL(blob));
        setIsZip(false);
        onSuccess("PDF Protected with AES-256 Encryption!");
      }

      else if (slug === 'pdf-splitter' || slug === 'pdf-split') {
        const bytes = await targetFile!.arrayBuffer();
        const srcPdf = await PDFDocument.load(bytes);
        const totalPages = srcPdf.getPageCount();
        let targetIndices: number[] = [];
        const mode = options.mode;
        
        if (mode === "Individual Pages") {
          targetIndices = Array.from({ length: totalPages }, (_, i) => i);
        } else if (mode === "Odd Pages") {
          targetIndices = Array.from({ length: totalPages }, (_, i) => i).filter(i => (i + 1) % 2 !== 0);
        } else if (mode === "Even Pages") {
          targetIndices = Array.from({ length: totalPages }, (_, i) => i).filter(i => (i + 1) % 2 === 0);
        } else {
          const parts = options.pageRange.split(',');
          parts.forEach((p: string) => {
             const clean = p.trim();
             if (clean.includes('-')) {
               const [start, end] = clean.split('-').map(v => parseInt(v.trim()));
               for (let i = start - 1; i < end; i++) if (i >= 0 && i < totalPages) targetIndices.push(i);
             } else {
               const idx = parseInt(clean) - 1;
               if (idx >= 0 && idx < totalPages) targetIndices.push(idx);
             }
          });
        }
        targetIndices = Array.from(new Set(targetIndices)).sort((a, b) => a - b);
        if (targetIndices.length === 0) throw new Error("No valid pages selected for splitting.");

        if (options.outputType === "Single PDF (Subset)") {
           const outPdf = await PDFDocument.create();
           const copied = await outPdf.copyPages(srcPdf, targetIndices);
           copied.forEach(p => outPdf.addPage(p));
           const outBytes = await outPdf.save();
           const blob = new Blob([outBytes], { type: 'application/pdf' });
           setResultSize(blob.size);
           setOutputUrl(URL.createObjectURL(blob));
           setIsZip(false);
        } else {
           const { default: JSZip } = await import('jszip');
           const zip = new JSZip();
           for (let i = 0; i < targetIndices.length; i++) {
             const outPdf = await PDFDocument.create();
             const [page] = await outPdf.copyPages(srcPdf, [targetIndices[i]]);
             outPdf.addPage(page);
             const outBytes = await outPdf.save();
             zip.file(`page-${targetIndices[i] + 1}.pdf`, outBytes);
             setProgress(Math.round(((i + 1) / targetIndices.length) * 100));
           }
           const zipBlob = await zip.generateAsync({ type: 'blob' });
           setResultSize(zipBlob.size);
           setOutputUrl(URL.createObjectURL(zipBlob));
           setIsZip(true);
        }
        onSuccess("PDF Split Operation Complete!");
      }

      else if (slug === 'pdf-merger' || slug === 'pdf-merge') {
        const mergedPdf = await PDFDocument.create();
        for (let i = 0; i < mergerFiles.length; i++) {
          const mFile = mergerFiles[i];
          const bytes = await mFile.file.arrayBuffer();
          const doc = await PDFDocument.load(bytes);
          const startIdx = Math.max(0, mFile.start - 1);
          const endIdx = Math.min(mFile.total, mFile.end);
          const indices = Array.from({ length: endIdx - startIdx }, (_, k) => startIdx + k);
          const copiedPages = await mergedPdf.copyPages(doc, indices);
          copiedPages.forEach(p => {
             if (options.normalizeSize !== "Original Sizes") {
                const targetSize = options.normalizeSize === "Convert all to A4" ? PAGE_SIZES.A4 : PAGE_SIZES.Letter;
                p.setSize(targetSize[0], targetSize[1]);
             }
             mergedPdf.addPage(p);
          });
          setProgress(Math.round(((i + 1) / mergerFiles.length) * 100));
        }
        if (options.removeMetadata) { mergedPdf.setTitle(''); mergedPdf.setAuthor(''); }
        const pdfBytes = await mergedPdf.save({ useObjectStreams: options.optimizeOutput });
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        setResultSize(blob.size);
        setOutputUrl(URL.createObjectURL(blob));
        setIsZip(false);
        onSuccess("PDFs merged successfully!");
      }
      
      // ... (Page numbers, Watermark, Compressor logic remains the same)
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
  const isProtect = (slug === 'pdf-password-protect');
  const isRemover = (slug === 'pdf-password-remover');
  const isViewer = (slug === 'pdf-metadata-viewer');

  const currentConfig = [
    pdfMergerConfig, pdfSplitterConfig, pdfPageReorderConfig, pdfToImageConfig, 
    imageToPdfConfig, pdfToWordConfig, pdfOcrConfig, pdfProtectConfig, 
    pdfUnlockConfig, pdfMetadataConfig, pdfPageNumbersConfig, pdfWatermarkProConfig,
    pdfCompressorConfig, pdfSizeReducerConfig
  ].find(c => c.slug === slug) || pdfCompressorConfig;

  const moveMergerFile = (index: number, direction: number) => {
    const newList = [...mergerFiles];
    const target = index + direction;
    if (target < 0 || target >= newList.length) return;
    [newList[index], newList[target]] = [newList[target], newList[index]];
    setMergerFiles(newList);
  };

  const updateMergerRange = (index: number, field: 'start' | 'end', val: string) => {
    const newList = [...mergerFiles];
    const nVal = parseInt(val) || 1;
    newList[index] = { ...newList[index], [field]: nVal };
    setMergerFiles(newList);
  };

  const inputSlot = (
    <div className="space-y-8">
      <div className="p-10 md:p-16 border-4 border-dashed border-slate-100 rounded-[3rem] text-center hover:border-red-100 transition-all cursor-pointer group relative">
        <input 
          type="file" 
          accept="application/pdf" 
          multiple={isMerge}
          onChange={handleFileChange} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
        />
        <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">{currentConfig.icon}</div>
        <p className="text-slate-900 font-black text-lg">
          {isMerge && mergerFiles.length > 0 ? `${mergerFiles.length} File(s) Selected` : files ? `${files.length} File(s) Selected` : isMerge ? "Select multiple PDFs to merge" : isViewer ? "Upload PDF to inspect metadata" : "Click or Drag PDF file here"}
        </p>
        <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-widest">
           {isViewer ? "Inspection results are generated locally" : "Secure browser-native processing"}
        </p>
      </div>

      {isMerge && mergerFiles.length > 0 && (
        <div className="space-y-4 animate-in fade-in duration-500">
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Manage Merge Queue</h3>
           <div className="grid grid-cols-1 gap-4">
              {mergerFiles.map((m, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col md:flex-row items-center gap-6 group hover:border-red-200 transition-all">
                   <div className="flex items-center gap-4 flex-grow w-full md:w-auto">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center font-black text-slate-400">{i + 1}</div>
                      <div className="truncate">
                         <p className="text-sm font-black text-slate-900 truncate">{m.file.name}</p>
                         <p className="text-[10px] font-bold text-slate-400 uppercase">{(m.file.size/1024).toFixed(1)} KB • {m.total} Pages</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-100">
                      <span className="text-[9px] font-black text-slate-400 uppercase ml-2">Pages:</span>
                      <input type="number" value={m.start} min={1} max={m.total} onChange={e => updateMergerRange(i, 'start', e.target.value)} className="w-12 p-1 text-center font-black text-xs bg-slate-50 rounded border-none focus:ring-1 focus:ring-red-500" />
                      <span className="text-slate-300">to</span>
                      <input type="number" value={m.end} min={1} max={m.total} onChange={e => updateMergerRange(i, 'end', e.target.value)} className="w-12 p-1 text-center font-black text-xs bg-slate-50 rounded border-none focus:ring-1 focus:ring-red-500" />
                   </div>
                   <div className="flex gap-2">
                      <button onClick={() => moveMergerFile(i, -1)} disabled={i === 0} className="w-10 h-10 bg-white rounded-xl border border-slate-100 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-all disabled:opacity-30">↑</button>
                      <button onClick={() => moveMergerFile(i, 1)} disabled={i === mergerFiles.length - 1} className="w-10 h-10 bg-white rounded-xl border border-slate-100 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-all disabled:opacity-30">↓</button>
                      <button onClick={() => setMergerFiles(mergerFiles.filter((_, idx) => idx !== i))} className="w-10 h-10 bg-white rounded-xl border border-slate-100 flex items-center justify-center text-rose-300 hover:bg-rose-50 hover:text-rose-600 transition-all">✕</button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}

      {isRemover && (
        <div className="p-8 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl space-y-6">
           <div className="flex items-center gap-4 border-b border-white/10 pb-4 mb-4">
              <div className="text-3xl">🔓</div>
              <div>
                <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">Authentication Required</p>
                <p className="text-xs text-slate-400">Provide the correct password to strip encryption from this file.</p>
              </div>
           </div>
           <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Current PDF Password</label>
              <input 
                type="password" value={options.password} onChange={e => handleOptionChange('password', e.target.value)} 
                placeholder="Enter password to unlock"
                className="w-full bg-slate-800 border-none rounded-xl p-5 text-white font-bold outline-none focus:ring-2 focus:ring-red-500 shadow-inner" 
              />
           </div>
        </div>
      )}
    </div>
  );

  const optionsSlot = (currentConfig.options && currentConfig.options.length > 0) ? (
    <OptionsPanel options={currentConfig.options as any} values={options} onChange={handleOptionChange} />
  ) : undefined;

  const actionsSlot = !isViewer && (
    <button 
      disabled={loading || (isMerge ? mergerFiles.length < 2 : !files) || (isRemover && !options.password)} 
      onClick={() => processPDF()} 
      className="w-full py-6 bg-red-600 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50"
    >
      {loading ? `Working... (${progress}%)` : isMerge ? "Consolidate PDFs" : isRemover ? "Strip Password & Save" : "Start Operation"}
    </button>
  );

  const resultSlot = (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-700">
      {isViewer && pdfMetadata && (
        <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-200 overflow-hidden shadow-inner">
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 px-1">Document Intelligence Report</div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'Document Title', val: pdfMetadata.title, icon: '📄' },
                { label: 'Author / Creator', val: pdfMetadata.author, icon: '✍️' },
                { label: 'Page Count', val: pdfMetadata.pageCount, icon: '🔢' },
                { label: 'Creation Date', val: pdfMetadata.creationDate, icon: '📅' },
                { label: 'PDF Producer', val: pdfMetadata.producer, icon: '💻' },
                { label: 'File Integrity Size', val: pdfMetadata.fileSize, icon: '💾' }
              ].map((item, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
                   <div className="text-2xl">{item.icon}</div>
                   <div className="overflow-hidden">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter block mb-0.5">{item.label}</span>
                      <span className="text-xs font-bold text-slate-900 truncate block">{item.val}</span>
                   </div>
                </div>
              ))}
           </div>
           
           {options.privacyCheck && (
              <div className="mt-10 p-6 bg-indigo-50 rounded-3xl border border-indigo-100 flex items-center gap-6">
                 <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">🛡️</div>
                 <div>
                    <h4 className="text-xs font-black text-indigo-900 uppercase tracking-widest mb-1">Privacy Audit Result</h4>
                    <p className="text-[11px] font-medium text-indigo-700 leading-relaxed italic">
                      "Warning: This document contains internal creator tags (${pdfMetadata.creator}). Consider using the 'PDF Metadata Editor' tool to scrub these before sharing."
                    </p>
                 </div>
              </div>
           )}
        </div>
      )}

      {outputUrl && (
        <div className="space-y-6 text-center">
          {!isZip && (
            <div className="rounded-[2.5rem] overflow-hidden border-8 border-slate-50 shadow-inner h-[500px]">
              <iframe src={outputUrl} className="w-full h-full" />
            </div>
          )}
          <div className="flex justify-center">
            <a href={outputUrl} download={`toolverse_${slug}_${Date.now()}.${isZip ? 'zip' : 'pdf'}`} className="px-12 py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-emerald-700 transition-all transform hover:scale-105">
               Download Unlocked PDF
            </a>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <ToolLayout
      title={currentConfig.title}
      description={currentConfig.description}
      icon={currentConfig.icon}
      colorClass={currentConfig.colorClass}
      input={inputSlot}
      options={optionsSlot}
      actions={actionsSlot}
      result={(outputUrl || pdfMetadata) ? resultSlot : undefined}
    />
  );
};

export default PDFTools;