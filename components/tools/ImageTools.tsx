import React, { useState, useMemo, useEffect } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { TOOLS } from '../../data/tools';
import { getToolConfig } from '../../utils/configRegistry';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const ImageTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [options, setOptions] = useState<Record<string, any>>({});

  const toolNode = useMemo(() => TOOLS.find(t => t.slug === slug), [slug]);
  const activeConfig = useMemo(() => getToolConfig(slug), [slug]);

  useEffect(() => {
    const initial: Record<string, any> = {};
    if (activeConfig.options) {
      activeConfig.options.forEach((opt: any) => initial[opt.id] = opt.default);
    }
    setOptions(initial);
    setOutputUrl(null);
    setAnalysis(null);
  }, [slug, activeConfig]);

  const handleRun = async () => {
    if (!file) { onError("Phase E: No input detected."); return; }
    if (!toolNode?.execute) { onError("Phase G: Logic node offline."); return; }

    setLoading(true);
    try {
      const result = await toolNode.execute(file, options);
      if (result.blob) setOutputUrl(URL.createObjectURL(result.blob));
      if (result.data) setAnalysis(result.data);
      onSuccess("Phase I: Processing Complete");
    } catch (e: any) {
      onError(e.message || "Phase M: Operational Fault.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title={activeConfig.title}
      description={activeConfig.description}
      icon={activeConfig.icon}
      colorClass={activeConfig.colorClass}
      input={
        <div className="p-16 border-4 border-dashed border-slate-100 rounded-[3rem] text-center hover:border-emerald-100 cursor-pointer relative group">
           <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" />
           <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">🖼️</div>
           <p className="font-black text-slate-700 text-xl">{file ? file.name : "Select Image Source"}</p>
           <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">WASM Isolate: Ready</p>
        </div>
      }
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} />}
      actions={<button onClick={handleRun} disabled={loading || !file} className="w-full py-8 bg-emerald-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50">{loading ? "Crunching Pixels..." : "Run Software logic"}</button>}
      result={(outputUrl || analysis) && (
        <div className="space-y-8 animate-in zoom-in-95">
           {analysis && (
             <div className="grid grid-cols-2 gap-4">
                {Object.entries(analysis).map(([k, v]) => (
                  <div key={k} className="bg-slate-50 p-4 rounded-xl flex justify-between items-center">
                     <span className="text-[10px] font-black text-slate-400 uppercase">{k}</span>
                     <span className="text-sm font-black text-slate-900">{v as string}</span>
                  </div>
                ))}
             </div>
           )}
           {outputUrl && (
             <div className="text-center space-y-6">
                <div className="relative inline-block">
                  <img src={outputUrl} className="max-h-80 mx-auto rounded-3xl shadow-xl border-4 border-white" alt="Output" />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md text-white text-[8px] font-black uppercase rounded-lg">Logic Verified</div>
                </div>
                <div>
                  <a href={outputUrl} download={`toolverse_${slug}.jpg`} className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black shadow-xl inline-block hover:bg-indigo-600 transition-all">Download Master Asset</a>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                  <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Phase L: Honest Limitations</h5>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">
                    Binary search optimization used to reach target KB. Result is lossy; fine text may degrade if target is extremely small. Original aspect ratio preserved.
                  </p>
                </div>
             </div>
           )}
        </div>
      )}
    />
  );
};

export default ImageTools;
