
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
      onError("Please provide some input text.");
      return;
    }

    setLoading(true);
    setResult(null);

    const res = await executeOnEdge(slug, toolData?.category || 'general', { text: inputText });

    if (res.success) {
      setResult(res.data);
      onSuccess("Edge processing complete!");
    } else {
      onError(res.error || "Processing failed.");
    }
    setLoading(false);
  };

  const renderResult = () => {
    if (!result) return null;

    const output = result.output || result.formatted || result.password || JSON.stringify(result, null, 2);

    return (
      <div className="space-y-6 animate-in slide-in-from-top-4 duration-500">
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-50"></div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Edge Result Buffer</span>
            {result.proStatus && <span className="text-[9px] bg-indigo-500 text-white px-2 py-0.5 rounded-full font-bold">PRO ACCOUNT ACTIVE</span>}
          </div>
          <pre className="text-emerald-400 font-mono text-sm whitespace-pre-wrap leading-relaxed">
            {output}
          </pre>
        </div>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => { navigator.clipboard.writeText(output); onSuccess("Copied!"); }}
            className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all"
          >
            Copy Result
          </button>
          {result.engine && <span className="text-[8px] font-bold text-slate-400 self-center uppercase">Engine: {result.engine}</span>}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your content here for Edge processing..."
            className="w-full h-48 md:h-64 p-0 bg-transparent text-slate-700 font-sans text-lg border-none outline-none resize-none placeholder:text-slate-200"
          />
        </div>

        <button 
          onClick={handleExecute}
          disabled={loading}
          className="w-full py-7 bg-indigo-600 text-white rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-4">
               <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
               <span>Edge Processing...</span>
            </div>
          ) : "Run Tool Logic"}
        </button>
      </div>

      {renderResult()}
    </div>
  );
};

export default ToolRenderer;
