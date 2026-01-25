import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { GoogleGenAI } from "@google/genai";
import { getToolConfig } from '../../utils/configRegistry';
import { internetSlowAnalyzer, otpNotComingAnalyzer, emailBounceDecoder } from '../../tools/executors/dailyLifeCluster';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const UtilityTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const activeConfig = useMemo(() => getToolConfig(slug), [slug]);
  const [options, setOptions] = useState<Record<string, any>>({});

  useEffect(() => {
    const initial: Record<string, any> = {};
    if (activeConfig.options) {
      activeConfig.options.forEach((opt: any) => initial[opt.id] = opt.default);
    }
    setOptions(initial);
    setInput("");
    setOutput(null);
  }, [slug, activeConfig]);

  const processLogic = useCallback(async () => {
    setLoading(true);
    try {
      if (slug === 'internet-slow-analyzer') {
        setOutput(internetSlowAnalyzer({ ...options }));
        onSuccess("Diagnostics Ready!");
      } else if (slug === 'otp-not-coming-analyzer') {
        setOutput(otpNotComingAnalyzer());
        onSuccess("Trace Complete!");
      } else if (slug === 'email-bounce-decoder') {
        setOutput(emailBounceDecoder(input));
        onSuccess("Decode Complete!");
      } else {
        // AI Orchestrator for Daily-Life queries
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Tool: ${slug}. Input: ${input}. Options: ${JSON.stringify(options)}`,
          config: { systemInstruction: "Daily Life Problem Solver Node. Concise Markdown Table/Bullet output." }
        });
        setOutput({ "Solution": response.text || "No result." });
        onSuccess("Intelligence Dispatched!");
      }
    } catch (err: any) {
      onError("Logic failure.");
    } finally {
      setLoading(false);
    }
  }, [slug, input, options, onSuccess, onError]);

  return (
    <ToolLayout
      title={activeConfig.title}
      description={activeConfig.description}
      icon={activeConfig.icon}
      colorClass={activeConfig.colorClass}
      input={
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Diagnostic Data Workspace</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="..."
            className="w-full h-44 p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] outline-none font-sans text-lg font-bold text-slate-700 shadow-inner resize-none transition-all"
          />
        </div>
      }
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} />}
      actions={<button onClick={processLogic} disabled={loading} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all`}>Run Logic Core</button>}
      result={output && (
        <div className="grid grid-cols-1 gap-4 animate-in zoom-in-95">
           {Object.entries(output).map(([k, v]) => (
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
    />
  );
};

export default UtilityTools;