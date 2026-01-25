
import React, { useState, useEffect } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { getToolConfig } from '../../utils/configRegistry';
import { GoogleGenAI } from "@google/genai";
import { atsKeywordGapFinder, resumeFormatChecker, resumeFileNameChecker } from '../../tools/executors/jobCluster';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const OfficeTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [inputText, setInputText] = useState("");
  const [secondaryText, setSecondaryText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const activeConfig = getToolConfig(slug);
  const [options, setOptions] = useState<Record<string, any>>({});

  useEffect(() => {
    const initial: Record<string, any> = {};
    if (activeConfig.options) {
      activeConfig.options.forEach((opt: any) => initial[opt.id] = opt.default);
    }
    setOptions(initial);
    setInputText("");
    setSecondaryText("");
    setResult(null);
  }, [slug, activeConfig]);

  const handleRun = async () => {
    if (!inputText.trim()) {
      onError("Please provide context for the AI Architect.");
      return;
    }

    setLoading(true);
    try {
      if (slug === 'ats-keyword-gap-finder') {
        setResult(atsKeywordGapFinder(inputText, secondaryText));
        onSuccess("Gap Analysis Complete!");
      } else if (slug === 'resume-filename-checker') {
        setResult(resumeFileNameChecker(inputText));
        onSuccess("Filename Audit Ready!");
      } else {
        // AI Generation Path (Resume Builder, Invoice Generator)
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const systemInstruction = slug === 'invoice-generator' 
          ? "You are an Expert Accountant. Generate a clean, structured Markdown invoice. Include placeholders for Company, Client, Itemized List, and Totals."
          : "You are a Professional Career Coach. Generate a high-impact, ATS-optimized Resume in Markdown based on the user's provided details. Use professional tone.";

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: [{ parts: [{ text: `Generate ${slug} for: ${inputText}. Options: ${JSON.stringify(options)}` }] }],
          config: { systemInstruction }
        });

        setResult(response.text || "");
        onSuccess("Intelligence Dispatched Successfully!");
      }
    } catch (e: any) {
      onError("AI Engine synchronization error.");
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
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Data Workspace</label>
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder={
              slug === 'invoice-generator' ? "Details: Sold 5 chairs to X Inc for $50 each..." :
              slug === 'resume-builder' ? "Experience: Sr Developer at Meta, 2 years. Skills: React, TS..." :
              "Paste your content here..."
            }
            className="w-full h-44 p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] outline-none font-sans text-lg font-bold text-slate-700 shadow-inner resize-none focus:ring-8 focus:ring-indigo-500/5 transition-all"
          />
        </div>
      }
      options={activeConfig.options?.length > 0 ? <OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, val) => setOptions(p => ({ ...p, [id]: val }))} /> : undefined}
      actions={<button onClick={handleRun} disabled={loading} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95`}>{loading ? "Synchronizing Logic..." : `Run ${activeConfig.title}`}</button>}
      result={result && (
        <div className="animate-in zoom-in-95">
           {typeof result === 'string' ? (
             <div className="space-y-6">
                <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-slate-100 shadow-inner prose prose-slate max-w-none font-medium leading-relaxed whitespace-pre-wrap">
                   {result}
                </div>
                <button 
                  onClick={() => { navigator.clipboard.writeText(result); onSuccess("Copied!"); }}
                  className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl"
                >
                  Copy Document to Clipboard
                </button>
             </div>
           ) : (
             <div className="grid grid-cols-1 gap-4">
                {Object.entries(result).map(([k, v]) => (
                  <div key={k} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{k}</span>
                     <span className="text-sm font-black text-indigo-600">
                       {Array.isArray(v) ? (
                           <ul className="list-disc pl-4 text-left">
                             {v.map((item, i) => <li key={i}>{item}</li>)}
                           </ul>
                       ) : (v as string)}
                     </span>
                  </div>
                ))}
             </div>
           )}
        </div>
      )}
    />
  );
};

export default OfficeTools;
