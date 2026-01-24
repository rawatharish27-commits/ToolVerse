
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
    if (!inputText.trim()) return onError("Input required.");
    setLoading(true);
    const res = await executeOnEdge(slug, toolData?.category || 'general', { text: inputText });
    if (res.success) {
      setResult(res.data);
      onSuccess("Action Complete!");
    } else {
      onError(res.error || "Execution failed.");
    }
    setLoading(false);
  };

  const renderResult = () => {
    if (!result) return null;
    const output = result.output || JSON.stringify(result, null, 2);

    return (
      <div className="space-y-12 animate-in slide-in-from-top-4 duration-500">
        {/* RESULT ZONE */}
        <div className="bg-slate-950 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-800 relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-indigo-500"></div>
          <div className="flex justify-between items-center mb-8">
             <span className="text-[9px] font-black text-emerald-400 border border-emerald-400/30 px-3 py-1 rounded-full uppercase tracking-widest bg-emerald-400/5">Verified Logic Output</span>
             <button onClick={() => { navigator.clipboard.writeText(output); onSuccess("Copied!"); }} className="text-[10px] font-black text-slate-400 hover:text-white uppercase transition-colors">Copy Master Data</button>
          </div>
          <div className="prose prose-invert max-w-none">
            <pre className="text-emerald-400 font-mono text-sm whitespace-pre-wrap leading-relaxed bg-transparent p-0 selection:bg-indigo-500/50">{output}</pre>
          </div>
        </div>

        {/* --- HIGH-CONVERSION RETENTION LOOP --- */}
        <div className="bg-indigo-50/40 rounded-[3.5rem] p-12 border border-indigo-100 text-center space-y-10">
           <div className="space-y-3">
              <div className="inline-flex items-center px-4 py-1.5 bg-indigo-600 text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-2">Level Up Your Workflow</div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Success! What's your next mission?</h3>
              <p className="text-slate-500 text-sm font-medium">Keep the momentum going. Explore more high-speed tools or win a reward.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* TARGET A: Games (Max Retention) */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center group cursor-pointer hover:border-indigo-400 transition-all hover:-translate-y-1">
                 <div className="text-5xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform">🎁</div>
                 <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">Claim Daily Bonus</span>
                 <span className="text-base font-bold text-slate-800 mb-6">Spin the Lucky Wheel</span>
                 <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 group-hover:bg-indigo-700 transition-all">Engage Arcade</button>
              </div>

              {/* TARGET B: High RPM Related Tool (Max Revenue) */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center group cursor-pointer hover:border-emerald-400 transition-all hover:-translate-y-1">
                 <div className="text-5xl mb-6 group-hover:scale-110 group-hover:-rotate-12 transition-transform">⚡</div>
                 <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Next Gen Tech</span>
                 <span className="text-base font-bold text-slate-800 mb-6">AI Professional Enhancer</span>
                 <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-600/20 group-hover:bg-emerald-700 transition-all">Launch Next Tool</button>
              </div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.06)] border border-slate-100 focus-within:ring-8 focus-within:ring-indigo-500/5 transition-all">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type, paste, or drop your content here to begin..."
            className="w-full h-64 p-0 bg-transparent text-slate-700 font-sans text-xl border-none outline-none resize-none placeholder:text-slate-200"
          />
        </div>
        <button 
          onClick={handleExecute} 
          disabled={loading} 
          className="w-full py-8 bg-indigo-600 text-white rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-4"
        >
          {loading ? (
            <>
               <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
               <span className="animate-pulse">Processing Core Logic...</span>
            </>
          ) : "Engage Platform Core"}
        </button>
        <div className="flex flex-wrap justify-center gap-6 opacity-40 grayscale pointer-events-none">
           <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><span className="text-lg">🔒</span> Browser-Native Privacy</div>
           <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><span className="text-lg">⚡</span> High-Speed Edge Processing</div>
           <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><span className="text-lg">✅</span> 100% Free Ecosystem</div>
        </div>
      </div>
      {renderResult()}
    </div>
  );
};

export default ToolRenderer;
