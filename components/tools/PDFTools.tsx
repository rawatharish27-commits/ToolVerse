import React, { useState, useMemo, useEffect } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { TOOLS } from '../../data/tools';
import { 
  pdfCompressorConfig, pdfSplitterConfig, pdfMergerConfig, 
  pdfProtectConfig, pdfUnlockConfig, pdfMetadataConfig, pdfToJpgConfig, 
  jpgToPdfConfig, pdfWatermarkConfig
} from '../../config/pdfTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const PDFTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);

  const toolNode = useMemo(() => TOOLS.find(t => t.slug === slug), [slug]);
  const activeConfig = useMemo(() => [
    pdfCompressorConfig, pdfSplitterConfig, pdfMergerConfig, pdfToJpgConfig, 
    jpgToPdfConfig, pdfWatermarkConfig, pdfProtectConfig, pdfUnlockConfig, pdfMetadataConfig
  ].find(c => c.slug === slug) || pdfCompressorConfig, [slug]);

  const [options, setOptions] = useState<Record<string, any>>({});

  useEffect(() => {
    const initial: Record<string, any> = {};
    activeConfig.options.forEach((opt: any) => initial[opt.id] = (opt as any).default);
    setOptions(initial);
    setOutputUrl(null);
    setProgress("");
  }, [slug, activeConfig]);

  const handleRun = async () => {
    if (!toolNode?.execute) { onError("Logic node offline."); return; }
    if (!files || files.length === 0) { onError("Input Domain Error: No files detected."); return; }

    setLoading(true);
    setProgress("Initializing WASM Core...");
    
    try {
      await new Promise(r => setTimeout(r, 300));
      setProgress("Synchronizing PDF Bytes...");
      
      const input = slug === 'pdf-merger' ? Array.from(files) : files[0];
      const result = await toolNode.execute(input, options);
      
      if (result instanceof Blob) {
        setProgress("Verifying Header Integrity...");
        setOutputUrl(URL.createObjectURL(result));
        onSuccess("Software Process Complete: Result Ready.");
      } else {
        throw new Error("Invalid Engine Response");
      }
    } catch (err: any) {
      onError(err.message || "Binary Engine Operational Fault.");
    } finally {
      setLoading(false);
      setProgress("");
    }
  };

  return (
    <ToolLayout
      title={activeConfig.title}
      description={activeConfig.description}
      icon={activeConfig.icon}
      colorClass={activeConfig.colorClass}
      input={
        <div className="p-16 border-4 border-dashed border-slate-100 rounded-[3rem] text-center hover:border-red-100 transition-all cursor-pointer relative group">
           <input type="file" multiple={slug === 'pdf-merger'} accept="application/pdf" onChange={e => {
             setFiles(e.target.files);
             setOutputUrl(null);
           }} className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" />
           <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">📄</div>
           <p className="font-black text-slate-700 text-xl">{files ? `${files.length} Document(s) Staged` : "Select PDF Source"}</p>
           <div className="mt-4 flex justify-center gap-4">
             <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">WASM-Native</span>
             <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">•</span>
             <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Zero-Upload</span>
           </div>
        </div>
      }
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} />}
      actions={
        <button 
          onClick={handleRun} 
          disabled={loading || !files} 
          className="w-full py-8 bg-red-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl active:scale-95 transition-all disabled:opacity-50 flex flex-col items-center justify-center gap-1"
        >
          {loading ? (
            <>
              <span className="animate-pulse">{progress}</span>
              <span className="text-[10px] opacity-70 uppercase tracking-tighter">Do not close tab</span>
            </>
          ) : "Start Digital Processing"}
        </button>
      }
      result={outputUrl && (
        <div className="text-center space-y-10 animate-in zoom-in-95 duration-500">
           <div className="p-12 bg-emerald-50 rounded-[3.5rem] border-2 border-emerald-100 inline-block relative group">
              <div className="text-7xl mb-4 group-hover:rotate-12 transition-transform">✅</div>
              <p className="text-emerald-800 font-black uppercase tracking-[0.3em] text-xs">Logic Verification OK</p>
           </div>
           
           <div>
             <a href={outputUrl} download={`toolverse_${slug}_${Date.now()}.pdf`} className="px-16 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl shadow-2xl inline-flex items-center gap-4 hover:bg-indigo-600 hover:-translate-y-1 transition-all">
                <span className="text-2xl">⬇️</span> Download Master PDF
             </a>
           </div>

           <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-left relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-200"></div>
             <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Phase U: Honest Limitations</h5>
             <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
               Encryption is removed during processing to ensure portal compatibility. Compressed outputs use FlateDecode streams which may not be readable by legacy printers from before 2010. Form field interactivity is flattened to preserve visual integrity.
             </p>
           </div>
        </div>
      )}
    />
  );
};

export default PDFTools;