
import React, { useState, useEffect, useMemo } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { TOOLS } from '../../data/tools';
import { getToolConfig } from '../../utils/configRegistry';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const UtilityTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const toolNode = useMemo(() => TOOLS.find(t => t.slug === slug), [slug]);
  const activeConfig = useMemo(() => getToolConfig(slug), [slug]);
  const [options, setOptions] = useState<Record<string, any>>({});

  useEffect(() => {
    const initial: Record<string, any> = {};
    if (activeConfig.options) {
      activeConfig.options.forEach((opt: any) => initial[opt.id] = opt.default);
    }
    setOptions(initial);
    setInput("");
    setResult(null);
    setFile(null);
  }, [slug, activeConfig]);

  const handleRun = async () => {
    if (!toolNode?.execute) return onError("Utility logic node not found.");
    
    setLoading(true);
    try {
      // Pass both input and current options to the executor
      const output = await toolNode.execute(input || options.value || "0", options);
      setResult(output);
      onSuccess("Task Resolved!");
    } catch (e: any) {
      onError(e.message || "Logic failure.");
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
        <div className="space-y-6">
          {slug !== 'uuid-generator' && slug !== 'file-size-converter' && (
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Paste data for professional transformation..."
              className="w-full h-44 p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] outline-none font-sans text-lg font-bold text-slate-700 shadow-inner resize-none focus:ring-8 focus:ring-indigo-500/5 transition-all"
            />
          )}
          {(slug === 'uuid-generator' || slug === 'file-size-converter') && (
            <div className="py-12 text-center bg-indigo-50/30 rounded-[3rem] border border-dashed border-indigo-100 flex flex-col items-center">
              <div className="text-7xl mb-6">⚙️</div>
              <p className="text-indigo-900 font-black text-lg">Logic Parameter Input Mode</p>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] mt-1">Configure options on the right to execute.</p>
            </div>
          )}
        </div>
      }
      options={activeConfig.options?.length > 0 ? <OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} /> : undefined}
      actions={<button onClick={handleRun} disabled={loading} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50`}>{loading ? "Synchronizing Engines..." : "Execute Logic Node"}</button>}
      result={result && (
        <div className="animate-in zoom-in-95">
           {result.qrUrl ? (
             <div className="flex flex-col items-center py-6">
                <img src={result.qrUrl} alt="QR" className="w-64 h-64 rounded-3xl shadow-2xl border-8 border-white" />
                <a href={result.qrUrl} download="toolverse_qr.png" className="mt-8 px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest">Download Image</a>
             </div>
           ) : typeof result === 'string' ? (
             <div className="relative group">
                <div className="absolute top-4 right-6 text-[8px] font-black text-slate-500 uppercase tracking-widest z-10">Output Buffer</div>
                <textarea readOnly value={result} className="w-full h-64 p-10 bg-slate-950 text-emerald-400 font-mono text-xs border-none outline-none resize-none rounded-[3rem] shadow-2xl" />
                <button onClick={() => { navigator.clipboard.writeText(result); onSuccess("Copied!"); }} className="absolute bottom-8 right-10 px-8 py-3 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl">Copy Result</button>
             </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(result).map(([k, v]) => (
                  <div key={k} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex justify-between items-center">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{k}</span>
                     <span className="text-sm font-black text-indigo-600">{(v as any)}</span>
                  </div>
                ))}
             </div>
           )}
        </div>
      )}
    />
  );
};

export default UtilityTools;
