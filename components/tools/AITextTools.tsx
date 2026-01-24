
import React, { useState, useEffect } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { executeTool } from '../../services/executionEngine';
import { aiArticleGeneratorConfig } from '../../config/aiTools'; // Assumed existing config

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const AITextTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // Auto-detect config from existing imports or use default
  const activeConfig = aiArticleGeneratorConfig; 

  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    activeConfig.options.forEach(opt => initial[opt.id] = (opt as any).default);
    return initial;
  });

  const handleRun = async () => {
    if (!inputText.trim()) return onError("Input is required.");
    setLoading(true);
    setResult(null);

    const res = await executeTool({ slug, category: 'ai', input: inputText, options });
    
    if (res.success) {
      setResult(res.data);
      onSuccess("AI Content Orchestrated!");
    } else {
      onError(res.error || "Generation failed.");
    }
    setLoading(false);
  };

  return (
    <ToolLayout
      title={slug.replace(/-/g, ' ')}
      description="Professional AI Content Orchestration"
      icon="🧠"
      input={
        <textarea
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Enter topic or context..."
          className="w-full h-40 p-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-sans text-base text-slate-700"
        />
      }
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, val) => setOptions(p => ({ ...p, [id]: val }))} />}
      actions={
        <button onClick={handleRun} disabled={loading} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-indigo-700 disabled:opacity-50 transition-all">
          {loading ? "Engine Syncing..." : "Generate Final Content"}
        </button>
      }
      result={result && (
        <div className="space-y-6">
           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm prose prose-slate max-w-none font-medium leading-relaxed whitespace-pre-wrap">
              {result}
           </div>
           <button onClick={() => { navigator.clipboard.writeText(result); onSuccess("Copied!"); }} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-sm uppercase tracking-widest">Copy to Clipboard</button>
        </div>
      )}
    />
  );
};

export default AITextTools;
