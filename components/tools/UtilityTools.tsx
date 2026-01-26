
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
      const output = await toolNode.execute(file || input || options, options);
      setResult(output);
      onSuccess("Diagnostic Node Synchronized!");
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
          {slug.includes('analyzer') || slug.includes('checker') || slug.includes('fixer') ? (
            <div className="p-16 border-4 border-dashed border-slate-100 rounded-[3rem] text-center hover:border-indigo-100 transition-all cursor-pointer relative group">
              <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" />
              <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">🔍</div>
              <p className="font-black text-slate-700 text-xl">{file ? file.name : "Staging Area: Drop File for Audit"}</p>
              <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Heuristic scan will perform 12+ checks</p>
            </div>
          ) : (
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Paste data for professional transformation..."
              className="w-full h-44 p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] outline-none font-sans text-lg font-bold text-slate-700 shadow-inner resize-none focus:ring-8 focus:ring-indigo-500/5 transition-all"
            />
          )}
        </div>
      }
      options={activeConfig.options?.length > 0 ? <OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} /> : undefined}
      actions={<button onClick={handleRun} disabled={loading} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50`}>{loading ? "Synchronizing Engines..." : "Execute Analysis"}</button>}
      result={result && (
        <div className="animate-in zoom-in-95">
           {result.findings || result.diagnosis ? (
             <div className="space-y-6">
                <div className="bg-slate-900 p-8 rounded-[3rem] text-white">
                   <h3 className="text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em] mb-4">Core Verdict</h3>
                   <p className="text-2xl font-black">{result.primaryReason || result.diagnosis || result.verdict}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="bg-rose-50 p-6 rounded-[2rem] border border-rose-100">
                      <h4 className="text-rose-600 font-black text-[10px] uppercase tracking-widest mb-3">Detected Mismatches</h4>
                      <ul className="space-y-2">
                         {(result.findings || result.fullAudit || []).map((f: string, i: number) => (
                           <li key={i} className="text-xs font-bold text-rose-900 flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-rose-400"></span> {f}
                           </li>
                         ))}
                      </ul>
                   </div>
                   <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100">
                      <h4 className="text-emerald-600 font-black text-[10px] uppercase tracking-widest mb-3">Corrective Actions</h4>
                      <ul className="space-y-2">
                         {(result.fixes || result.actionPlan || []).map((f: string, i: number) => (
                           <li key={i} className="text-xs font-bold text-emerald-900 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> {f}
                           </li>
                         ))}
                      </ul>
                   </div>
                </div>
             </div>
           ) : typeof result === 'object' ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(result).map(([k, v]) => (
                  <div key={k} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex justify-between items-center group">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{k}</span>
                     <span className="text-sm font-black text-indigo-600 truncate ml-4">{(v as any)}</span>
                  </div>
                ))}
             </div>
           ) : (
             <pre className="bg-slate-950 text-emerald-400 p-10 rounded-[3rem] font-mono text-xs shadow-2xl overflow-x-auto whitespace-pre-wrap">{result}</pre>
           )}
        </div>
      )}
    />
  );
};

export default UtilityTools;
