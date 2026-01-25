import React, { useState, useEffect, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { getToolConfig } from '../../utils/configRegistry';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const NetworkTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

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

  const handleMasking = () => {
    let res = input;
    if (options.maskEmails) res = res.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[EMAIL_MASKED]");
    if (options.maskIps) res = res.replace(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g, "[IP_MASKED]");
    if (options.maskCc) res = res.replace(/\b(?:\d[ -]*?){13,16}\b/g, "[CC_MASKED]");
    setResult(res);
    onSuccess("PII Obfuscated!");
  };

  const handleRun = async () => {
    if (!input.trim()) return onError("Input data required.");
    
    if (slug === 'data-masking-tool') {
      handleMasking();
      return;
    }

    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Tool: ${slug}. Payload: "${input}". Provide technical analysis report.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { systemInstruction: "Network & Security Intel Node. Markdown Table focused.", temperature: 0.1 }
      });
      setResult(response.text || "");
      onSuccess("Report Dispatched!");
    } catch (err) {
      onError("Gateway timeout.");
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
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={slug.includes('mask') ? "Paste sensitive data here..." : "Paste raw email headers or target IP..."}
          className="w-full h-64 p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] outline-none font-mono text-sm text-slate-700 shadow-inner"
        />
      }
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} />}
      actions={<button onClick={handleRun} disabled={loading} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl`}>Dispatch Node</button>}
      result={result && <div className="p-10 bg-slate-950 text-emerald-400 font-mono text-xs shadow-2xl rounded-[3rem] whitespace-pre-wrap">{result}</div>}
    />
  );
};

export default NetworkTools;