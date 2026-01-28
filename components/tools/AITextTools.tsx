import React, { useState, useEffect, useMemo } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { TOOLS } from '../../data/tools';
import { 
  aiArticleGeneratorConfig, aiRewriterConfig, aiGrammarConfig, 
  aiEmailGeneratorConfig, aiResumeWriterConfig, aiYoutubeScriptConfig 
} from '../../config/aiTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const AITextTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const toolNode = useMemo(() => TOOLS.find(t => t.slug === slug), [slug]);
  const activeConfig = useMemo(() => {
    const configs = [
      aiArticleGeneratorConfig, aiRewriterConfig, aiGrammarConfig, 
      aiEmailGeneratorConfig, aiResumeWriterConfig, aiYoutubeScriptConfig
    ];
    return configs.find(c => c.slug === slug) || {
      title: slug.replace(/-/g, ' '),
      description: "Neural intelligence utility initialized.",
      icon: "🧠",
      colorClass: "bg-indigo-600",
      options: []
    };
  }, [slug]);

  const [options, setOptions] = useState<Record<string, any>>({});

  useEffect(() => {
    const initial: Record<string, any> = {};
    if (activeConfig.options) {
      activeConfig.options.forEach((opt: any) => initial[opt.id] = opt.default);
    }
    setOptions(initial);
    setInputText("");
    setResult(null);
    setProgress("");
  }, [slug, activeConfig]);

  const handleRun = async () => {
    if (!toolNode?.execute) { onError("Node Failure: Logic isolate offline."); return; }
    if (!inputText.trim()) { onError("Input Domain Error: No context provided."); return; }

    setLoading(true);
    setProgress("Initializing Neural Core...");
    
    try {
      await new Promise(r => setTimeout(r, 400));
      setProgress("Orchestrating Logic Stream...");
      
      const output = await toolNode.execute(inputText, options);
      
      setProgress("Finalizing Dataset...");
      setResult(output);
      onSuccess("Neural Strategy Resolved Successfully.");
    } catch (err: any) {
      onError(err.message || "Neural engine at capacity. Try again in 10s.");
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
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Creative Context Buffer</label>
            <textarea
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Enter your topic, raw notes, or specific requirements..."
              className="w-full h-56 p-8 bg-slate-50 border border-slate-200 rounded-[3rem] focus:ring-8 focus:ring-indigo-500/5 outline-none font-sans text-lg font-bold text-slate-700 shadow-inner resize-none transition-all"
            />
          </div>
          <div className="flex items-center gap-4 px-2">
             <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Isolate Level: {slug.includes('article') ? 'Pro' : 'Standard'} Node</span>
          </div>
        </div>
      }
      options={activeConfig.options?.length > 0 ? <OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, val) => setOptions(p => ({ ...p, [id]: val }))} /> : undefined}
      actions={
        <button 
          onClick={handleRun} 
          disabled={loading || !inputText} 
          className="w-full py-8 bg-indigo-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50 flex flex-col items-center justify-center gap-1"
        >
          {loading ? (
            <>
              <span className="animate-pulse">{progress}</span>
              <span className="text-[10px] opacity-70">SYST-ID: NEURAL-GEN-3</span>
            </>
          ) : "Dispatch Intelligence Request"}
        </button>
      }
      result={result && (
        <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-700">
           <div className="bg-slate-50 p-10 md:p-16 rounded-[4rem] border-2 border-indigo-50 shadow-inner relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none select-none">
                 <div className="text-[15rem] font-black italic">GEN</div>
              </div>
              <div className="relative z-10 prose prose-slate max-w-none font-medium leading-relaxed text-slate-800 whitespace-pre-wrap text-lg">
                {result}
              </div>
           </div>
           
           <div className="flex flex-col sm:flex-row gap-5">
              <button 
                onClick={() => { navigator.clipboard.writeText(result); onSuccess("Strategy Copied to Clipboard!"); }}
                className="flex-[2] py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-indigo-600 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-4"
              >
                <span>📋</span> Copy Master Asset
              </button>
              <button 
                onClick={() => { setInputText(""); setResult(null); }}
                className="flex-1 py-6 bg-slate-100 text-slate-400 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
              >
                Clear Node
              </button>
           </div>

           <div className="p-8 bg-amber-50 rounded-[2.5rem] border border-amber-100 text-left relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-200"></div>
             <h5 className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-3">Phase L: Output Explanation</h5>
             <p className="text-xs text-amber-700 font-medium leading-relaxed italic">
               This result was generated using deterministic neural sampling. While highly accurate for the context provided, AI can occasionally hallucinate specific data points or URLs. Always verify critical facts against authoritative primary sources.
             </p>
           </div>
        </div>
      )}
    />
  );
};

export default AITextTools;