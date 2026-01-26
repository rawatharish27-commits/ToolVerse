
import React, { useState, useEffect, useMemo } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { TOOLS } from '../../data/tools';
import { 
  passwordStrengthConfig, hashGeneratorConfig, 
  hashIdentifierConfig, encryptorConfig, decryptorConfig 
} from '../../config/securityTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const SecurityTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const toolNode = useMemo(() => TOOLS.find(t => t.slug === slug), [slug]);
  const activeConfig = useMemo(() => [
    passwordStrengthConfig, hashGeneratorConfig, 
    hashIdentifierConfig, encryptorConfig, decryptorConfig
  ].find(c => c.slug === slug) || hashGeneratorConfig, [slug]);

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
    if (!toolNode?.execute) { onError("Vault logic missing."); return; }
    if (!input.trim()) { onError("Input data required for vault operation."); return; }

    setLoading(true);
    setResult(null);

    try {
      const output = await toolNode.execute(input, options);
      setResult(output);
      onSuccess("Security Operation Complete!");
    } catch (err: any) {
      onError("Security Engine Fault: " + err.message);
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
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Work Buffer</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Paste raw content for cryptographic processing..."
            className="w-full h-44 p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] outline-none font-mono text-lg font-bold text-slate-700 shadow-inner resize-none transition-all"
          />
        </div>
      }
      options={activeConfig.options?.length > 0 ? <OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} /> : undefined}
      actions={<button onClick={handleRun} disabled={loading} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50`}>{loading ? "Processing Encryption..." : "Execute Security Task"}</button>}
      result={result && (
        <div className="animate-in slide-in-from-top-4">
           <div className="bg-slate-900 p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5"><div className="text-8xl font-black italic uppercase">Vault</div></div>
              <div className="relative z-10">
                 {typeof result === 'string' ? (
                   <div className="space-y-4">
                      <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Computed Digest</div>
                      <div className="text-xl font-mono text-emerald-400 break-all leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/5">{result}</div>
                      <button onClick={() => { navigator.clipboard.writeText(result); onSuccess("Hash Copied!"); }} className="px-6 py-2 bg-white/10 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">Copy Hash</button>
                   </div>
                 ) : (
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {Object.entries(result).map(([k, v]) => (
                        <div key={k} className="border-b border-white/5 pb-2">
                           <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{k}</span>
                           <div className="text-lg font-bold text-indigo-300">{v as string}</div>
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

export default SecurityTools;
