
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

/**
 * ToolVerse Diagnostic Hub
 * Uses AI to solve common hurdles (Govt Portal Errors, Career Blockers).
 */
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
    // If it's a rule decoder, it might not need input text
    const isDecoder = slug.includes('rule-decoder') || slug.includes('checker');
    if (!input.trim() && !isDecoder) {
      return onError("Please describe the issue or paste the error message.");
    }

    setLoading(true);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Context: The user is using the tool "${toolNode?.title}" on the ToolVerse platform.
        Category: ${toolNode?.category}
        Specific User Task: "${input || 'General guidance request for this tool'}"
        Parameters: ${JSON.stringify(options)}
        
        Provide a professional diagnostic report with:
        1. "Root Analysis": What is technically causing the barrier.
        2. "Solution Protocol": Step-by-step instructions.
        3. "ToolVerse Recommendation": Which other tools to use (e.g. Image Compressor if size is the issue).
        4. "Compliance Note": Mention any specific government or industry standards.
        
        Style: Authoritative, helpful, technical but accessible. Format in Markdown.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: "You are the ToolVerse Expert Diagnostic Node. You help users solve technical hurdles in government portals, job applications, and document management.",
          temperature: 0.2
        }
      });

      setResult(response.text);
      onSuccess("Diagnostic Audit Complete.");
    } catch (err: any) {
      console.error(err);
      onError("Neural core is synchronized but busy. Please retry.");
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
          <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-[2rem] flex items-start gap-6">
             <div className="text-4xl">🔬</div>
             <div>
                <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">Advanced Diagnostic Isolate</p>
                <p className="text-sm font-bold text-slate-700 leading-relaxed italic">
                  "Input the error message or describe your requirement. Our expert node will architect a solution based on current compliance rules."
                </p>
             </div>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Paste portal error here (e.g. 'Photo background not white', 'Signature too large', 'Wait for Scrutiny'...)"
            className="w-full h-44 p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] focus:ring-8 focus:ring-indigo-500/5 outline-none font-bold text-slate-700 shadow-inner resize-none transition-all"
          />
        </div>
      }
      options={activeConfig.options?.length > 0 ? <OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} /> : undefined}
      actions={<button onClick={handleRun} disabled={loading} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50`}>{loading ? "Running Intelligence Audit..." : "Dispatch Solution Node"}</button>}
      result={result && (
        <div className="animate-in zoom-in-95 space-y-8">
           <div className="bg-slate-900 p-10 md:p-16 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group border border-white/5">
              <div className="absolute top-0 right-0 p-8 opacity-5"><div className="text-9xl font-black italic">SOLVED</div></div>
              <div className="relative z-10 prose prose-invert max-w-none">
                 <div className="text-emerald-400 font-medium whitespace-pre-wrap leading-relaxed text-lg">
                   {result}
                 </div>
              </div>
           </div>
           <button onClick={() => { navigator.clipboard.writeText(result); onSuccess("Copied!"); }} className="w-full py-5 bg-white border border-slate-100 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Copy Solution Roadmap</button>
        </div>
      )}
    />
  );
};

export default PainPointTools;
