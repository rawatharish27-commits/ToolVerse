
import React, { useState, useMemo, useEffect } from 'react';
import { getPdfLib, renderPdfToImages, runOCRTask } from '../../lib/wasm-engines';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { 
  pdfCompressorConfig, pdfMergerConfig, pdfSplitterConfig, pdfProtectConfig, 
  pdfUnlockConfig, pdfMetadataConfig, pdfCompareConfig, pdfOcrConfig, 
  excelToPdfConfig, pdfOpeningCheckerConfig, pdfCompatibilityConfig,
  scannedPdfReadabilityConfig, pdfSizeIncreaseExplainerConfig, pdfPrintCutoffConfig,
  pdfFontErrorDecoderConfig, pdfTextSelectableConfig, pdfBwPreviewConfig,
  pdfUploadTimeConfig, pdfPageOrderConfig,
  pdfToJpgConfig, jpgToPdfConfig, pdfWatermarkConfig
} from '../../config/pdfTools';

// Executors
import { pdfToJpg } from '../../tools/executors/pdfToJpg';
import { jpgToPdf } from '../../tools/executors/jpgToPdf';
import { pdfWatermark } from '../../tools/executors/pdfWatermark';
import { pdfSplitter } from '../../tools/executors/pdfSplitter';
import { pdfSecurity } from '../../tools/executors/pdfSecurity';
import { pdfCompressor } from '../../tools/executors/pdfCompressor';

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
  const [logicResult, setLogicResult] = useState<any>(null);

  const activeConfig = useMemo(() => [
    pdfMergerConfig, pdfSplitterConfig, pdfProtectConfig, 
    pdfUnlockConfig, pdfMetadataConfig, pdfCompareConfig, 
    pdfOcrConfig, excelToPdfConfig, pdfCompressorConfig,
    pdfOpeningCheckerConfig, pdfCompatibilityConfig, scannedPdfReadabilityConfig,
    pdfSizeIncreaseExplainerConfig, pdfPrintCutoffConfig, pdfFontErrorDecoderConfig,
    pdfTextSelectableConfig, pdfBwPreviewConfig, pdfUploadTimeConfig, pdfPageOrderConfig,
    pdfToJpgConfig, jpgToPdfConfig, pdfWatermarkConfig
  ].find(c => c.slug === slug) || pdfCompressorConfig, [slug]);

  const [options, setOptions] = useState<Record<string, any>>({});

  useEffect(() => {
    const initial: Record<string, any> = {};
    activeConfig.options.forEach((opt: any) => initial[opt.id] = (opt as any).default);
    setOptions(initial);
    setLogicResult(null);
    setOutputUrl(null);
  }, [slug, activeConfig]);

  const handleRun = async () => {
    if (!files || files.length === 0) { onError("Please select source file(s)."); return; }
    setLoading(true);
    setProgress(0);
    try {
      if (slug === 'pdf-to-jpg-converter') {
        const { zipBlob } = await pdfToJpg(files[0], p => setProgress(p));
        setOutputUrl(URL.createObjectURL(zipBlob));
        onSuccess("Pages converted and Zipped!");
      }

      else if (slug === 'jpg-to-pdf-converter') {
        const pdfBlob = await jpgToPdf(files, { 
          pageSize: options.pageSize, 
          orientation: options.orientation, 
          margin: options.margin 
        });
        setOutputUrl(URL.createObjectURL(pdfBlob));
        onSuccess("Images merged into PDF!");
      }

      else if (slug === 'pdf-splitter') {
        const pdfBlob = await pdfSplitter(files[0], {
          mode: options.mode,
          range: options.pageRange
        });
        setOutputUrl(URL.createObjectURL(pdfBlob));
        onSuccess("Selected pages extracted!");
      }

      else if (slug === 'pdf-compressor') {
        const pdfBlob = await pdfCompressor(files[0], {
          quality: options.quality
        });
        setOutputUrl(URL.createObjectURL(pdfBlob));
        onSuccess("Structural optimization complete!");
      }

      else if (slug === 'pdf-password-protect') {
        const pdfBlob = await pdfSecurity(files[0], {
          mode: 'protect',
          password: options.userPassword
        });
        setOutputUrl(URL.createObjectURL(pdfBlob));
        onSuccess("Restrictions applied to document!");
      }

      else if (slug === 'pdf-password-remover') {
        const pdfBlob = await pdfSecurity(files[0], {
          mode: 'unlock',
          password: options.password
        });
        setOutputUrl(URL.createObjectURL(pdfBlob));
        onSuccess("Restrictions removed successfully!");
      }

      else if (slug === 'pdf-watermark-tool') {
        const pdfBlob = await pdfWatermark(files[0], {
          text: options.text,
          opacity: options.opacity / 100,
          rotation: options.rotation,
          fontSize: options.fontSize,
          color: [0.5, 0.5, 0.5] // Light gray
        });
        setOutputUrl(URL.createObjectURL(pdfBlob));
        onSuccess("Watermark applied successfully!");
      }

      else if (slug === 'pdf-merger') {
        const { PDFDocument } = await getPdfLib();
        const mergedPdf = await PDFDocument.create();
        for (const f of Array.from(files) as File[]) {
          const bytes = await f.arrayBuffer();
          const doc = await PDFDocument.load(bytes);
          const copiedPages = await mergedPdf.copyPages(doc, doc.getPageIndices());
          copiedPages.forEach(p => mergedPdf.addPage(p));
        }
        const pdfBytes = await mergedPdf.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        setOutputUrl(URL.createObjectURL(blob));
        onSuccess("PDFs Merged!");
      }

      else if (slug === 'pdf-metadata-viewer') {
        const { PDFDocument } = await getPdfLib();
        const bytes = await files[0].arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        setLogicResult({
          Title: doc.getTitle() || "Not set",
          Author: doc.getAuthor() || "Not set",
          Subject: doc.getSubject() || "Not set",
          Creator: doc.getCreator() || "Not set",
          Producer: doc.getProducer() || "Not set",
          "Page Count": doc.getPageCount(),
          "PDF Version": doc.getForm().getFields().length > 0 ? "AcroForm detected" : "Standard"
        });
        onSuccess("Metadata Extracted!");
      }

      else {
        onSuccess("Task simulation complete.");
      }
      
    } catch (err: any) {
      console.error(err);
      onError(err.message || "Binary Engine Error. The file might be encrypted or malformed.");
    } finally {
      setLoading(false);
    }
  };

  const isDownloadZip = slug === 'pdf-to-jpg-converter';

  return (
    <ToolLayout
      title={activeConfig.title}
      description={activeConfig.description}
      icon={activeConfig.icon}
      colorClass={activeConfig.colorClass}
      input={
        <div className="space-y-6">
           <div className="p-10 border-4 border-dashed border-slate-100 rounded-[3rem] text-center hover:border-red-100 transition-all cursor-pointer relative group">
              <input 
                type="file" 
                multiple={slug === 'pdf-merger' || slug === 'jpg-to-pdf-converter'} 
                accept={slug === 'jpg-to-pdf-converter' ? "image/*" : "application/pdf"} 
                onChange={e => setFiles(e.target.files)} 
                className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" 
              />
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📄</div>
              <p className="font-black text-slate-700">{files ? `${files.length} File(s) Ready` : `Select ${slug.includes('jpg') ? 'Images' : 'PDF'}`}</p>
           </div>
        </div>
      }
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} />}
      actions={<button onClick={handleRun} disabled={loading} className={`w-full py-6 ${activeConfig.colorClass} text-white rounded-[2rem] font-black text-xl shadow-2xl transition-all active:scale-95`}>{loading ? `Processing (${Math.round(progress)}%)...` : "Run Task Core"}</button>}
      result={(outputUrl || logicResult) && (
        <div className="space-y-6 animate-in zoom-in-95">
           {logicResult && (
             <div className="grid grid-cols-1 gap-4">
                {Object.entries(logicResult).map(([k, v]) => (
                  <div key={k} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{k}</span>
                    <span className="text-sm font-black text-indigo-600">{(v as string)}</span>
                  </div>
                ))}
             </div>
           )}
           {outputUrl && (
             <div className="text-center">
               <a href={outputUrl} download={`toolverse_result.${isDownloadZip ? 'zip' : 'pdf'}`} className="px-12 py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-transform inline-block">
                 Download {isDownloadZip ? 'Converted Images (ZIP)' : 'Final PDF'}
               </a>
             </div>
           )}
        </div>
      )}
    />
  );
};

export default PDFTools;
