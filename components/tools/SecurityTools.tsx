import React, { useState, useEffect, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { getToolConfig } from '../../utils/configRegistry';
import SparkMD5 from 'spark-md5';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const SecurityTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

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
    if (!input.trim()) {
      onError("Please provide a string or hash to analyze.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      if (slug === 'hash-generator') {
        const text = input;
        const algo = options.algorithm;
        let hashed = "";

        if (algo === 'MD5') {
          hashed = SparkMD5.hash(text);
        } else {
          const encoder = new TextEncoder();
          const data = encoder.encode(text);
          const hashBuffer = await crypto.subtle.digest(algo.replace('SHA-512', 'SHA-512').replace('SHA-256', 'SHA-256').replace('SHA-1', 'SHA-1'), data);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          hashed = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }

        if (options.uppercase) hashed = hashed.toUpperCase();
        setResult(hashed);
        onSuccess("Hash Generated!");
      } else {
        // AI Orchestrated Identification or Strength Check
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Tool: ${slug}. Input: "${input}". Options: ${JSON.stringify(options)}. Provide a technical security report.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          config: {
            systemInstruction: "You are the ToolVerse Security Core. Return strictly Markdown technical reports. For hash identification, list potential algorithms by probability.",
            temperature: 0.1,
          }
        });

        setResult(response.text || "");
        onSuccess("Security Analysis Complete!");
      }
    } catch (err: any) {
      console.error(err);
      onError("Security Engine error.");
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
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Security Workspace</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={slug.includes('hash') ? "Paste hash or text here..." : "Paste data for analysis..."}
            className="w-full h-40 p-6 bg-slate-50 border border-slate-200 rounded-[2rem] focus:ring-8 focus:ring-indigo-500/5 outline-none font-mono text-lg font-bold text-slate-700 shadow-inner resize-none transition-all"
          />
        </div>
      }
      options={activeConfig.options?.length > 0 ? (
        <OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, val) => setOptions(p => ({ ...p, [id]: val }))} />
      ) : undefined}
      actions={
        <button 
          onClick={handleRun} 
          disabled={loading}
          className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl hover:brightness-110 active:scale-95 disabled:opacity-50`}
        >
          {loading ? "Decrypting Signals..." : `Run ${activeConfig.title}`}
        </button>
      }
      result={result && (
        <div className="space-y-8 animate-in fade-in slide-in-from-top-4">
           <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <div className="text-8xl font-black italic">VAULT</div>
              </div>
              <div className="relative z-10 prose prose-invert max-w-none">
                 <div className="text-emerald-400 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                   {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
                 </div>
              </div>
           </div>
           <button 
              onClick={() => { navigator.clipboard.writeText(typeof result === 'string' ? result : JSON.stringify(result)); onSuccess("Copied!"); }}
              className="w-full py-5 bg-slate-100 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all border border-slate-200"
            >
              Copy Result
            </button>
        </div>
      )}
    />
  );
};

export default SecurityTools;