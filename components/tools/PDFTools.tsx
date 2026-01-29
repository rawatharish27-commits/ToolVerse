
import React, { useState, useMemo, useEffect } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { TOOLS } from '../../data/tools';
import { 
  pdfCompressorConfig, pdfSplitterConfig, pdfMergerConfig, 
  pdfProtectConfig, pdfUnlockConfig, pdfMetadataConfig, pdfToJpgConfig, 
  jpgToPdfConfig, pdfWatermarkConfig
} from '../../config/pdfTools';
import OutputController from '../OutputController';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const PDFTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
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
    setOutputBlob(null);
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
        setOutputBlob(result);
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
             setOutputBlob(null);
             setOutputUrl(null);
           }} className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" />
           <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">📄</div>
           <p className="font-black text-slate-700 text-xl">{files ? `${files.length} Document(s) Staged` : "Select PDF Source"}</p>
        </div>
      }
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} />}
      actions={
        <button 
          onClick={handleRun} 
          disabled={loading || !files} 
          className="w-full py-8 bg-red-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl active:scale-95 transition-all disabled:opacity-50 flex flex-col items-center justify-center gap-1"
        >
          {loading ? <span className="animate-pulse">{progress}</span> : "Start Digital Processing"}
        </button>
      }
      result={outputBlob && (
        <OutputController 
          type="pdf" 
          data={outputBlob} 
          previewUrl={outputUrl || undefined}
          fileName={`toolverse_${slug}_${Date.now()}.pdf`}
          onSuccess={onSuccess}
        />
      )}
    />
  );
};

export default PDFTools;
