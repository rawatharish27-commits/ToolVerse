
import React, { useState, useEffect, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { TOOLS } from '../../data/tools';
import { getToolConfig } from '../../utils/configRegistry';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const PainPointTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const toolNode = useMemo(() => TOOLS.find(t => t.slug === slug), [slug]);
  const activeConfig = useMemo(() => getToolConfig(slug), [slug]);
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
    if (!input.trim() && !slug.includes('rule-decoder')) {
      return onError("Please provide the error message or text to analyze.");
    }

    setLoading(true);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Task: Diagnostic Analysis for ${toolNode?.title}
        Context: The user is facing a common digital barrier (Government portal failure, Job rejection, or document error).
        User Input/Error: "${input}"
        Parameters: ${JSON.stringify(options)}
        
        Provide a structured diagnostic response including:
        1. "Hidden Root Cause": The technical reason this is happening.
        2. "Human Translation": A simple explanation of the error.
        3. "Actionable Fix": Step-by-step instructions to solve it using ToolVerse.
        4. "Expert Tip": A pro-tip to prevent this in the future.
        
        Format the response as a clean, structured JSON-like text block.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: "You are the ToolVerse Diagnostic Engine. You help users overcome technical barriers in government and career portals. Be empathetic, authoritative, and extremely clear.",
          temperature: 0.2
        }
      });

      setResult(response.text);
      onSuccess("Diagnostic Node Synchronized!");
    } catch (err: any) {
      onError("Diagnostic engine is at capacity. Retrying...");
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
        <div className="space-y-6">
          <div className="p-8 bg-rose-50 border border-rose-100 rounded-[2rem] flex items-start gap-6">
             <div className="text-4xl">⚠️</div>
             <div>
                <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1">Diagnostic Mode Active</p>
                <p className="text-sm font-bold text-rose-900 leading-relaxed italic">
                  "Paste the exact error message or describe the problem. Our engine will decode the technical barrier for you."
                </p>
             </div>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Paste error message here (e.g. 'Invalid MIME type', 'Signature not clear', 'Wait for Scrutiny'...)"
            className="w-full h-44 p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] focus:ring-8 focus:ring-indigo-500/5 outline-none font-bold text-slate-700 shadow-inner resize-none transition-all"
          />
        </div>
      }
      options={activeConfig.options?.length > 0 ? <OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} /> : undefined}
      actions={<button onClick={handleRun} disabled={loading} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50`}>{loading ? "Running Logic Audit..." : "Execute Diagnostic Scan"}</button>}
      result={result && (
        <div className="animate-in zoom-in-95 space-y-8">
           <div className="bg-slate-900 p-10 md:p-16 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group border border-white/5">
              <div className="absolute top-0 right-0 p-8 opacity-5"><div className="text-9xl font-black italic">AUDIT</div></div>
              <div className="relative z-10 prose prose-invert max-w-none">
                 <div className="text-emerald-400 font-medium whitespace-pre-wrap leading-relaxed text-lg">
                   {result}
                 </div>
              </div>
           </div>
           
           <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => window.dispatchEvent(new Event('tv_open_menu'))} className="flex-1 py-5 bg-white border border-slate-100 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-50">Find Recommended Tool</button>
              <button onClick={() => { setInput(""); setResult(null); }} className="flex-1 py-5 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200">Start New Audit</button>
           </div>
        </div>
      )}
    />
  );
};

export default PainPointTools;
