import React, { useState, useEffect } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { getToolConfig } from '../../utils/configRegistry';
import { GoogleGenAI } from "@google/genai";
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { resumeRejectionAnalyzer } from '../../tools/executors/resumeRejectionAnalyzer';
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
    setLoading(true);
    try {
      if (slug === 'resume-rejection-analyzer') {
        setResult(resumeRejectionAnalyzer({ ...options }));
        onSuccess("Audit Report Generated!");
      } else if (slug === 'ats-keyword-gap-finder') {
        setResult(atsKeywordGapFinder(inputText, secondaryText));
        onSuccess("Gap Analysis Complete!");
      } else if (slug === 'resume-format-checker') {
        setResult(resumeFormatChecker({ ...options }));
        onSuccess("Format Diagnostic Ready!");
      } else if (slug === 'resume-filename-checker') {
        setResult(resumeFileNameChecker(inputText));
        onSuccess("Filename Audit Ready!");
      } else {
        // AI Fallback Orchestrator
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Task: ${slug}. Content: ${inputText}. JD: ${secondaryText}. Options: ${JSON.stringify(options)}`,
          config: { systemInstruction: "Professional Recruiter/Office Node. Direct output." }
        });
        setResult(response.text || "");
        onSuccess("Task Complete!");
      }
    } catch (e) {
      onError("Logic failure.");
    } finally {
      setLoading(false);
    }
  };

  const isComparisonTool = slug === 'ats-keyword-gap-finder' || slug === 'resume-match-percentage';

  return (
    <ToolLayout
      title={activeConfig.title}
      description={activeConfig.description}
      icon={activeConfig.icon}
      colorClass={activeConfig.colorClass}
      input={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
              {isComparisonTool ? "Resume Text Content" : slug === 'resume-filename-checker' ? "Current Filename (e.g. MyResume.pdf)" : "Primary Document Buffer"}
            </label>
            <textarea
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="..."
              className="w-full h-44 p-6 bg-slate-50 border border-slate-200 rounded-[2rem] outline-none font-sans text-sm text-slate-700 shadow-inner resize-none focus:ring-8 focus:ring-indigo-500/5 transition-all"
            />
          </div>
          {isComparisonTool && (
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Job Description (JD) Content</label>
              <textarea
                value={secondaryText}
                onChange={e => setSecondaryText(e.target.value)}
                placeholder="Paste the target Job Description here..."
                className="w-full h-44 p-6 bg-slate-50 border border-slate-200 rounded-[2rem] outline-none font-sans text-sm text-slate-700 shadow-inner resize-none focus:ring-8 focus:ring-indigo-500/5 transition-all"
              />
            </div>
          )}
        </div>
      }
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, val) => setOptions(p => ({ ...p, [id]: val }))} />}
      actions={<button onClick={handleRun} disabled={loading} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all`}>{loading ? "Synchronizing..." : "Execute Logic Node"}</button>}
      result={result && (
        <div className="animate-in zoom-in-95">
           {typeof result === 'string' ? (
             <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-inner prose prose-slate max-w-none whitespace-pre-wrap">{result}</div>
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