
import React, { useState, useEffect, useMemo } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { TOOLS } from '../../data/tools';
import { 
  ipLookupConfig, dnsLookupConfig, sslCheckerConfig, 
  uaParserConfig, urlSafetyConfig, internetSpeedTestConfig 
} from '../../config/networkTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const NetworkTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const toolNode = useMemo(() => TOOLS.find(t => t.slug === slug), [slug]);
  const activeConfig = useMemo(() => [
    ipLookupConfig, dnsLookupConfig, sslCheckerConfig, 
    uaParserConfig, urlSafetyConfig, internetSpeedTestConfig
  ].find(c => c.slug === slug) || ipLookupConfig, [slug]);

  const [options, setOptions] = useState<Record<string, any>>({});

  useEffect(() => {
    const initial: Record<string, any> = {};
    if (activeConfig.options) {
      activeConfig.options.forEach((opt: any) => initial[opt.id] = opt.default);
    }
    setOptions(initial);
    setInput("");
    setResult(null);
  }, [slug, activeConfig]);

  const handleRun = async () => {
    if (!toolNode?.execute) { onError("Logic node not resolved."); return; }
    setLoading(true);
    setResult(null);

    try {
      const output = await toolNode.execute(input, options);
      setResult(output);
      onSuccess("Network Diagnostics Complete!");
    } catch (err: any) {
      onError("Global node at capacity. Retrying...");
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
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Diagnostic Input</label>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="e.g. 8.8.8.8, google.com, or leave empty for local diagnostics"
            className="w-full p-6 bg-slate-50 border border-slate-200 rounded-3xl outline-none font-mono text-lg font-bold text-slate-700 shadow-inner focus:ring-8 focus:ring-indigo-500/5 transition-all"
          />
        </div>
      }
      options={activeConfig.options?.length > 0 ? <OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} /> : undefined}
      actions={<button onClick={handleRun} disabled={loading} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95`}>{loading ? "Querying Network Nodes..." : "Execute Analysis"}</button>}
      result={result && (
        <div className="animate-in zoom-in-95">
           <div className="bg-slate-950 p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5"><div className="text-8xl font-black italic">RESOLVED</div></div>
              <div className="relative z-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {Object.entries(result).map(([k, v]) => (
                      <div key={k} className="border-b border-white/5 pb-2">
                         <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{k}</span>
                         <div className="text-sm font-bold text-indigo-300">{(v as string)}</div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}
    />
  );
};

export default NetworkTools;
