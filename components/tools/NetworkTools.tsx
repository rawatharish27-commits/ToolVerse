
import React, { useState, useEffect, useMemo } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { getToolConfig } from '../../utils/configRegistry';
import { executeTool } from '../../services/executionEngine';
import { parseUserAgent, checkUrlSafetyHeuristic } from '../../tools/executors/networkCluster';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const NetworkTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

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

    // Auto-fill IP and UA for convenience
    if (slug === 'user-agent-parser') setInput(navigator.userAgent);
  }, [slug, activeConfig]);

  const handleRun = async () => {
    if (!input.trim() && slug !== 'internet-speed-test') {
      onError("Please provide a target IP, Domain, or URL.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      let output: any = null;

      // 1. Local Logic Path
      if (slug === 'user-agent-parser') {
        output = parseUserAgent(input);
      } else if (slug === 'url-safety-checker') {
        output = checkUrlSafetyHeuristic(input);
      } 
      // 2. Edge/Server Logic Path
      else {
        const res = await executeTool({
          slug,
          category: 'network',
          input: { target: input, ...options }
        });
        if (!res.success) throw new Error(res.error);
        output = res.data;
      }

      setResult(output);
      onSuccess("Network Diagnostics Complete!");
    } catch (err: any) {
      console.error(err);
      onError(err.message || "Failed to reach Edge diagnostic node.");
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
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Diagnostic Target</label>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={
              slug === 'dns-lookup' ? "e.g. google.com" :
              slug === 'ip-to-location' ? "e.g. 8.8.8.8" :
              "Enter domain, URL or IP address..."
            }
            className="w-full p-6 bg-slate-50 border border-slate-200 rounded-3xl outline-none font-mono text-lg font-bold text-slate-700 shadow-inner focus:ring-8 focus:ring-indigo-500/5 transition-all"
          />
        </div>
      }
      options={activeConfig.options?.length > 0 ? <OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} /> : undefined}
      actions={
        <button onClick={handleRun} disabled={loading} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50`}>
          {loading ? "Querying Global Nodes..." : `Run ${activeConfig.title}`}
        </button>
      }
      result={result && (
        <div className="space-y-6 animate-in zoom-in-95">
           <div className="bg-slate-950 p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <div className="text-8xl font-black italic">RESOLVED</div>
              </div>
              <div className="relative z-10">
                 {typeof result === 'string' ? (
                   <pre className="text-emerald-400 font-mono text-sm leading-relaxed whitespace-pre-wrap">{result}</pre>
                 ) : (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                      {Object.entries(result).map(([k, v]) => (
                        <div key={k} className="border-b border-white/5 pb-2">
                           <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{k}</span>
                           <div className={`text-sm font-bold ${k.includes('Risk') ? (v === 'LOW' ? 'text-emerald-400' : 'text-rose-500') : 'text-indigo-300'}`}>
                             {Array.isArray(v) ? (
                               <ul className="list-disc pl-4 mt-1">
                                 {v.map((item, i) => <li key={i}>{item}</li>)}
                               </ul>
                             ) : (v as string)}
                           </div>
                        </div>
                      ))}
                   </div>
                 )}
              </div>
           </div>
        </div>
      )}
    />
  );
};

export default NetworkTools;
