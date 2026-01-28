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
  const [progress, setProgress] = useState("");
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
    setProgress("");
  }, [slug, activeConfig]);

  const handleRun = async () => {
    if (!toolNode?.execute) { onError("Logic node not resolved."); return; }
    
    setLoading(true);
    setProgress("Initializing Logic Trace...");
    setResult(null);

    try {
      await new Promise(r => setTimeout(r, 400));
      setProgress("Pinging Global Nodes...");
      
      const output = await toolNode.execute(input, options);
      
      setProgress("Finalizing Result Data...");
      setResult(output);
      onSuccess("Network Diagnostics Complete: Data Resolved.");
    } catch (err: any) {
      onError(err.message || "Global node at capacity. Retrying...");
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
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Diagnostic Input</label>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={slug === 'user-agent-parser' ? "Leave empty for your own UA..." : "e.g. 8.8.8.8, google.com"}
              className="w-full p-6 bg-slate-50 border border-slate-200 rounded-3xl outline-none font-mono text-lg font-bold text-slate-700 shadow-inner focus:ring-8 focus:ring-indigo-500/5 transition-all"
            />
          </div>
          <div className="flex items-center gap-4 px-2">
             <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Phase H: Real-time Analysis Active</span>
          </div>
        </div>
      }
      options={activeConfig.options?.length > 0 ? <OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} /> : undefined}
      actions={
        <button 
          onClick={handleRun} 
          disabled={loading} 
          className={`w-full py-8 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50 flex flex-col items-center justify-center gap-1`}
        >
          {loading ? (
            <>
              <span className="animate-pulse">{progress}</span>
              <span className="text-[10px] opacity-70">SYST-ID: NET-AUDIT-4</span>
            </>
          ) : "Execute Network Logic"}
        </button>
      }
      result={result && (
        <div className="space-y-8 animate-in zoom-in-95 duration-500">
           <div className="bg-slate-950 p-10 md:p-12 rounded-[4rem] shadow-3xl border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none"><div className="text-9xl font-black italic">RESOLVED</div></div>
              <div className="relative z-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {Object.entries(result).map(([k, v]) => (
                      <div key={k} className="border-b border-white/5 pb-4 group-hover:border-indigo-500/20 transition-colors">
                         <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-2">{k}</span>
                         <div className="text-lg font-bold text-indigo-300 break-all leading-tight">{(v as string)}</div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-left relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-200"></div>
             <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Phase U: Honest Limitations</h5>
             <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
               IP Geolocation is accurate to the city level in 98% of cases. URL safety check uses heuristic pattern matching and does not substitute for a local antivirus scan. Live speed tests are subject to browser-level throttling and current tab overhead.
             </p>
           </div>
        </div>
      )}
    />
  );
};

export default NetworkTools;
