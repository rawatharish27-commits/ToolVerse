
import React, { useState } from 'react';
import { ToolMetadata, ExecutionResult } from '../types/platform';
import { ToolEngine } from '../core/engine';

interface Props {
  tool: ToolMetadata;
}

const UniversalToolShell: React.FC<Props> = ({ tool }) => {
  const [input, setInput] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [result, setResult] = useState<ExecutionResult<any> | null>(null);

  const handleExecute = async () => {
    setLoading(true);
    setResult(null);
    
    // Dynamic import of the tool's specific pipeline to save initial weight
    const module = await import(`../tools/${tool.slug}/index`);
    const pipeline = module.pipeline;

    const res = await ToolEngine.run(pipeline, input, {}, setProgress);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-[4rem] p-12 md:p-20 shadow-3xl border border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600 opacity-20"></div>
      
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4">{tool.name}</h1>
        <p className="text-slate-500 font-medium text-lg max-w-2xl italic">"Stateless processing for professional requirements."</p>
      </div>

      <div className="space-y-10">
        {/* Dynamic Input Area */}
        <div className="p-8 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 min-h-[200px] flex items-center justify-center text-center">
          {tool.inputType === 'file' ? (
            <input type="file" onChange={(e) => setInput(e.target.files?.[0])} className="font-bold text-slate-700" />
          ) : (
            <textarea 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Paste data for deterministic analysis..." 
              className="w-full bg-transparent border-none outline-none font-mono text-sm resize-none h-40"
            />
          )}
        </div>

        <button 
          onClick={handleExecute}
          disabled={loading || !input}
          className="w-full py-8 bg-indigo-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-30 disabled:grayscale"
        >
          {loading ? progress : 'START DIGITAL EXECUTION'}
        </button>

        {/* Result Block - Phase K */}
        {result && (
          <div className="animate-in zoom-in-95 duration-500">
            {result.success ? (
              <div className="p-10 bg-emerald-50 rounded-[3rem] border border-emerald-100">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">✅</span>
                  <h3 className="text-2xl font-black text-emerald-900 uppercase tracking-tighter">Success: Result Verified</h3>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-inner font-mono text-sm overflow-auto max-h-96">
                   {/* Format based on outputType */}
                   {tool.outputType === 'file' ? 'File processed successfully. Download below.' : JSON.stringify(result.data, null, 2)}
                </div>
                <p className="mt-6 text-xs text-emerald-600 font-bold uppercase tracking-widest">{result.explanation}</p>
              </div>
            ) : (
              <div className="p-10 bg-rose-50 rounded-[3rem] border border-rose-100">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">❌</span>
                  <h3 className="text-xl font-black text-rose-900 uppercase">Stage Fault: {result.stage}</h3>
                </div>
                <p className="text-rose-700 font-bold text-lg">{result.error}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversalToolShell;
