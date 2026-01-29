
import React, { useState, useMemo, useEffect } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { TOOLS } from '../../data/tools';
import { getToolConfig } from '../../utils/configRegistry';
import OutputController from '../OutputController';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const ImageTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [options, setOptions] = useState<Record<string, any>>({});

  const activeConfig = useMemo(() => getToolConfig(slug), [slug]);
  const toolNode = useMemo(() => TOOLS.find(t => t.slug === slug), [slug]);

  useEffect(() => {
    const initial: Record<string, any> = {};
    activeConfig.options.forEach((opt: any) => initial[opt.id] = opt.default);
    setOptions(initial);
    setOutputBlob(null);
    setOutputUrl(null);
    setAnalysis(null);
    setProgress("");
  }, [slug, activeConfig]);

  const handleRun = async () => {
    if (!file) { onError("Trust Failure: No image provided."); return; }
    if (file.size > 20 * 1024 * 1024) { onError("Payload Rejected: Size exceeds 20MB limit."); return; }
    if (!toolNode?.execute) { onError("Node Failure: Execution logic missing."); return; }

    setLoading(true);
    setProgress("Initializing WASM Isolate...");
    
    try {
      await new Promise(r => setTimeout(r, 400));
      setProgress("Crunching Pixel Buffer...");
      
      const result = await toolNode.execute(file, options);
      
      setProgress("Finalizing Result...");
      if (result.blob) {
        setOutputBlob(result.blob);
        setOutputUrl(URL.createObjectURL(result.blob));
      }
      if (result.data) setAnalysis(result.data);
      
      onSuccess("Software Process Complete: Result Ready.");
    } catch (e: any) {
      onError(e.message || "Operational Fault: Visual engine encountered an error.");
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
        <div className="p-16 border-4 border-dashed border-slate-100 rounded-[3rem] text-center hover:border-emerald-100 cursor-pointer relative group transition-all">
           <input type="file" accept="image/*" onChange={e => {
             const f = e.target.files?.[0] || null;
             setFile(f);
             if (f) {
               setOutputBlob(null);
               setOutputUrl(null);
             }
           }} className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" />
           <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">🖼️</div>
           <p className="font-black text-slate-700 text-xl">{file ? file.name : "Select Master Image Source"}</p>
        </div>
      }
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} />}
      actions={
        <button 
          onClick={handleRun} 
          disabled={loading || !file} 
          className="w-full py-8 bg-emerald-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50 flex flex-col items-center justify-center gap-1"
        >
          {loading ? <span>{progress}</span> : "Start Digital Processing"}
        </button>
      }
      result={(outputBlob || analysis) && (
        <div className="space-y-10 animate-in zoom-in-95 duration-500">
           {analysis && (
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(analysis).map(([k, v]) => (
                  <div key={k} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col">
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{k}</span>
                     <span className="text-xs font-black text-slate-900 truncate">{(v as string)}</span>
                  </div>
                ))}
             </div>
           )}
           
           <OutputController 
             type="image" 
             data={outputBlob} 
             previewUrl={outputUrl || undefined}
             fileName={`toolverse_${slug}_${Date.now()}.jpg`}
             onSuccess={onSuccess}
           />
        </div>
      )}
    />
  );
};

export default ImageTools;
