import React, { useState, useEffect, useMemo } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { executeTool } from '../../services/executionEngine';
import { getToolConfig } from '../../utils/configRegistry';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

/**
 * Universal AI Orchestrator v5.2
 * Dynamically adapts UI and parameters for all 180 ToolVerse slugs.
 */
const AITextTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // 🧠 Logic: Resolve specialized config for this specific tool slug
  const activeConfig = useMemo(() => getToolConfig(slug), [slug]);

  const [options, setOptions] = useState<Record<string, any>>({});

  // Sync options when slug changes
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
    if (!inputText.trim()) return onError("Input context is required.");
    setLoading(true);
    setResult(null);

    const res = await executeTool({ 
      slug, 
      category: 'ai', // Gateway handles sub-categories
      input: inputText, 
      options 
    });
    
    if (res.success) {
      setResult(res.data);
      onSuccess("AI Intelligence Orchestrated!");
    } else {
      onError(res.error || "Generation failed. Ensure API Key is active.");
    }
    setLoading(false);
  };

  const inputPlaceholder = useMemo(() => {
    if (slug.includes('resume')) return "Paste your experience or current CV...";
    if (slug.includes('caption')) return "Describe the image or video content...";
    if (slug.includes('article')) return "Enter target topic and focus keywords...";
    return "Enter data or context for processing...";
  }, [slug]);

  return (
    <ToolLayout
      title={activeConfig.title}
      description={activeConfig.description || "Professional AI Orchestration Node."}
      icon={activeConfig.icon}
      colorClass={activeConfig.colorClass}
      input={
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Data Context Buffer</label>
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder={inputPlaceholder}
            className="w-full h-44 p-6 bg-slate-50 border border-slate-200 rounded-[2rem] focus:ring-8 focus:ring-indigo-500/5 outline-none font-sans text-base text-slate-700 shadow-inner resize-none transition-all"
          />
        </div>
      }
      options={activeConfig.options?.length > 0 ? (
        <OptionsPanel 
          options={activeConfig.options} 
          values={options} 
          onChange={(id, val) => setOptions(p => ({ ...p, [id]: val }))} 
        />
      ) : undefined}
      actions={
        <button 
          onClick={handleRun} 
          disabled={loading} 
          className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl hover:brightness-110 transition-all active:scale-95 disabled:opacity-50`}
        >
          {loading ? "Syncing Logic..." : "Dispatch AI Request"}
        </button>
      }
      result={result && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4">
           <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-inner prose prose-slate max-w-none font-medium leading-relaxed whitespace-pre-wrap">
              {result}
           </div>
           <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => { navigator.clipboard.writeText(result); onSuccess("Copied!"); }} 
                className="flex-grow py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl"
              >
                Copy to Clipboard
              </button>
              <button 
                onClick={() => {
                  const blob = new Blob([result], { type: 'text/markdown' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `toolverse_${slug}_result.md`;
                  a.click();
                }}
                className="px-10 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white border border-slate-200"
              >
                Download (.md)
              </button>
           </div>
        </div>
      )}
    />
  );
};

export default AITextTools;