
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
  const [result, setResult] = useState<string | null>(null);

  const toolNode = useMemo(() => TOOLS.find(t => t.slug === slug), [slug]);
  const activeConfig = useMemo(() => {
    const configs = [
      aiArticleGeneratorConfig, aiRewriterConfig, aiGrammarConfig, 
      aiEmailGeneratorConfig, aiResumeWriterConfig, aiYoutubeScriptConfig
    ];
    return configs.find(c => c.slug === slug) || {
      title: slug.replace(/-/g, ' '),
      description: "Neural intelligence utility.",
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
  }, [slug, activeConfig]);

  const handleRun = async () => {
    if (!toolNode?.execute) { onError("Neural Node implementation missing."); return; }
    if (!inputText.trim()) { onError("Intelligence context required."); return; }

    setLoading(true);
    try {
      const output = await toolNode.execute(inputText, options);
      setResult(output);
      onSuccess("Neural Strategy Orchestrated!");
    } catch (err: any) {
      onError("AI Engine at capacity. Try again in 10s.");
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
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Creative Context Buffer</label>
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Enter your topic, raw notes, or specific requirements..."
            className="w-full h-48 p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] focus:ring-8 focus:ring-indigo-500/5 outline-none font-sans text-lg font-bold text-slate-700 shadow-inner resize-none transition-all"
          />
        </div>
      }
      options={activeConfig.options?.length > 0 ? <OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, val) => setOptions(p => ({ ...p, [id]: val }))} /> : undefined}
      actions={<button onClick={handleRun} disabled={loading} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50`}>{loading ? "Architecting Content..." : "Dispatch Neural Request"}</button>}
      result={result && (
        <div className="space-y-8 animate-in slide-in-from-bottom-6">
           <div className="bg-white p-10 md:p-16 rounded-[4rem] border border-slate-100 shadow-inner prose prose-slate max-w-none font-medium leading-relaxed whitespace-pre-wrap">
              {result}
           </div>
           <button 
            onClick={() => { navigator.clipboard.writeText(result); onSuccess("Copied!"); }}
            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl"
          >
            Copy Generation to Clipboard
          </button>
        </div>
      )}
    />
  );
};

export default AITextTools;
