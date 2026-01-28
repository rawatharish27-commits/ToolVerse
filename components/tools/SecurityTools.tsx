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
  const [progress, setProgress] = useState("");
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
    setProgress("");
  }, [slug, activeConfig]);

  const handleRun = async () => {
    // Phase E: Validation
    if (!input.trim() && slug !== 'password-generator') { onError("Validation Error: Input buffer empty."); return; }
    if (!toolNode?.execute) { onError("Node Failure: Security isolate offline."); return; }

    setLoading(true);
    setProgress("Initializing Cryptographic Isolate...");

    try {
      await new Promise(r => setTimeout(r, 400));
      setProgress("Generating Entropy...");
      
      const output = await toolNode.execute(input, options);
      
      setProgress("Finalizing Result...");
      setResult(output);
      onSuccess("Security Operation Complete: Buffer Loaded.");
    } catch (err: any) {
      onError(err.message || "Operational Fault: Security engine encountered a cryptographic error.");
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
          <div className="p-8 bg-slate-900 rounded-[2.5rem] border border-white/10 flex items-start gap-6">
             <div className="text-4xl">🔐</div>
             <div>
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Zero-Trust Environment</p>
                <p className="text-sm font-bold text-slate-300 leading-relaxed italic">
                  "All cryptographic operations occur within your browser's private memory isolate. Your raw data is never exposed to external networks."
                </p>
             </div>
          </div>
          
          {slug !== 'password-generator' && (
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Secure Input Buffer</label>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Paste sensitive content here for local transformation..."
                className="w-full h-44 p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] outline-none font-mono text-sm font-bold text-slate-700 shadow-inner resize-none focus:ring-8 focus:ring-indigo-500/5 transition-all"
              />
            </div>
          )}
          
          {slug === 'password-generator' && (
            <div className="py-16 text-center bg-indigo-50/50 rounded-[3.5rem] border border-dashed border-indigo-100 flex flex-col items-center group">
               <div className="text-8xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">🛡️</div>
               <p className="text-indigo-900 font-black text-xl">CSPRNG Logic Initialized</p>
               <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-[0.3em]">Configure complexity on the right</p>
            </div>
          )}
        </div>
      }
      options={activeConfig.options?.length > 0 ? <OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} /> : undefined}
      actions={
        <button 
          onClick={handleRun} 
          disabled={loading || (!input.trim() && slug !== 'password-generator')} 
          className="w-full py-8 bg-indigo-900 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50 flex flex-col items-center justify-center gap-1"
        >
          {loading ? (
            <>
              <span className="animate-pulse">{progress}</span>
              <span className="text-[10px] opacity-70 uppercase tracking-widest">Do not clear buffer</span>
            </>
          ) : "Execute Secure Logic"}
        </button>
      }
      result={result && (
        <div className="space-y-8 animate-in slide-in-from-top-4 duration-700">
           <div className="bg-slate-900 p-10 md:p-16 rounded-[4rem] shadow-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none"><div className="text-[15rem] font-black italic">VAULT</div></div>
              <div className="relative z-10">
                 {typeof result === 'string' ? (
                   <div className="space-y-6">
                      <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-3">
                         <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                         Secure Output Digest
                      </div>
                      <div className="text-2xl font-mono text-emerald-400 break-all leading-relaxed bg-white/5 p-10 rounded-[2.5rem] border border-white/5 shadow-inner">
                        {result}
                      </div>
                      <button 
                        onClick={() => { navigator.clipboard.writeText(result); onSuccess("Hash Copied to Buffer"); }} 
                        className="px-12 py-5 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-emerald-400 transition-all transform hover:-translate-y-1"
                      >
                        Copy Secure Asset
                      </button>
                   </div>
                 ) : (
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {Object.entries(result).map(([k, v]) => (
                        <div key={k} className="p-8 bg-white/5 rounded-[2rem] border border-white/5 group-hover:bg-white/[0.08] transition-all">
                           <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-3">{k}</span>
                           <div className="text-xl font-black text-indigo-300 break-all">{(v as string)}</div>
                        </div>
                      ))}
                      {result["Resolved Key"] && (
                        <button 
                          onClick={() => { navigator.clipboard.writeText(result["Resolved Key"]); onSuccess("Key Copied!"); }}
                          className="sm:col-span-2 py-6 bg-emerald-600 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:brightness-110 transition-all flex items-center justify-center gap-4"
                        >
                          <span>📋</span> Copy Secret Key
                        </button>
                      )}
                   </div>
                 )}
              </div>
           </div>

           <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 text-left relative overflow-hidden">
             <div className="absolute top-0 left-0 w-2 h-full bg-slate-200"></div>
             <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Phase U: Honest Limitations</h5>
             <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
               SHA-1 and MD5 are provided for compatibility only and are considered insecure for sensitive use-cases. Password entropy is calculated assuming a 94-character ASCII set. Encryption keys are derived via PBKDF2; strength depends entirely on the complexity of your master password.
             </p>
           </div>
        </div>
      )}
    />
  );
};

export default SecurityTools;