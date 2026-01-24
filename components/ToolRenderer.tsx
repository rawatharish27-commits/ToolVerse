
import React, { useState, useEffect } from 'react';
import { executeOnEdge } from '../services/toolApi';
import { TOOLS } from '../data/tools';

interface ToolRendererProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const ToolRenderer: React.FC<ToolRendererProps> = ({ slug, onSuccess, onError }) => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const toolData = TOOLS.find(t => t.slug === slug);

  useEffect(() => {
    setInputText('');
    setResult(null);
  }, [slug]);

  const handleExecute = async () => {
    if (!inputText.trim()) {
      onError("Input required.");
      return;
    }

    setLoading(true);
    const res = await executeOnEdge(slug, toolData?.category || 'general', { text: inputText });

    if (res.success) {
      setResult(res.data);
      onSuccess("Processing complete!");
    } else {
      onError(res.error || "Failed.");
    }
    setLoading(false);
  };

  const renderResult = () => {
    if (!result) return null;
    const output = result.output || result.formatted || result.password || JSON.stringify(result, null, 2);

    return (
      <div className="space-y-6 animate-in slide-in-from-top-4 duration-500">
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-emerald-400">Result Buffer</span>
            {result.proStatus && <span className="text-[9px] bg-indigo-500 text-white px-2 py-0.5 rounded-full font-bold">PRO</span>}
          </div>
          <pre className="text-emerald-400 font-mono text-sm whitespace-pre-wrap leading-relaxed">{output}</pre>
        </div>
        <div className="flex justify-center">
          <button onClick={() => { navigator.clipboard.writeText(output); onSuccess("Copied!"); }} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase hover:bg-slate-800 transition-all">Copy Result</button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Input content for secure Edge processing..."
            className="w-full h-64 p-0 bg-transparent text-slate-700 font-sans text-lg border-none outline-none resize-none placeholder:text-slate-200"
          />
        </div>
        <button onClick={handleExecute} disabled={loading} className="w-full py-7 bg-indigo-600 text-white rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-indigo-700 transition-all disabled:opacity-50">
          {loading ? "Edge Processing..." : "Run Tool Logic"}
        </button>
      </div>
      {renderResult()}
    </div>
  );
};

export default ToolRenderer;
