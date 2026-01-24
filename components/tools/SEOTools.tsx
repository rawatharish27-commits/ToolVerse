
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { 
  metaTagGeneratorConfig, aiSeoAnalyzerConfig, keywordDensityCheckerConfig, 
  sitemapGeneratorConfig, robotsTxtGeneratorConfig, serpPreviewToolConfig 
} from '../../config/seoTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const SEOTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const activeConfig = [
    metaTagGeneratorConfig, aiSeoAnalyzerConfig, keywordDensityCheckerConfig, 
    sitemapGeneratorConfig, robotsTxtGeneratorConfig, serpPreviewToolConfig
  ].find(c => c.slug === slug) || aiSeoAnalyzerConfig;

  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    activeConfig.options.forEach(opt => initial[opt.id] = (opt as any).default);
    return initial;
  });

  useEffect(() => {
    setResult(null);
    setInput("");
  }, [slug]);

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
  };

  const handleRun = async () => {
    if (!input.trim()) {
      onError("Primary site context or URL is required.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Task: ${slug}. Context/URL: "${input}". Options: ${JSON.stringify(options)}. Return the final technical output (meta tags, valid XML, or audit report).`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          systemInstruction: "You are an expert SEO Architect. Return the technical output only. Use markdown code blocks for meta tags or XML. Never explain your steps.",
          temperature: 0.5,
        }
      });

      setResult(response.text || "Failed.");
      onSuccess("SEO Core Orchestrated!");
    } catch (err: any) {
      onError("SEO Core is at capacity. Retry soon.");
    } finally {
      setLoading(false);
    }
  };

  const inputSlot = (
    <div className="space-y-4">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Site URL / Page Content / Topic</label>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter details for the SEO audit or generator..."
        className="w-full h-32 p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-8 focus:ring-blue-500/5 outline-none font-mono text-sm text-slate-700 shadow-inner resize-none transition-all"
      />
    </div>
  );

  return (
    <ToolLayout
      title={activeConfig.title}
      description={activeConfig.description}
      icon={activeConfig.icon}
      colorClass={activeConfig.colorClass}
      input={inputSlot}
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={handleOptionChange} />}
      actions={
        <button 
          onClick={handleRun} 
          disabled={loading}
          className="w-full py-7 bg-blue-700 text-white rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-blue-800 transition-all transform active:scale-95 disabled:opacity-50"
        >
          {loading ? "Running Audit..." : "Generate SEO Strategy"}
        </button>
      }
      result={result && (
        <div className="space-y-6">
           <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl">
              <pre className="text-emerald-400 font-mono text-xs whitespace-pre-wrap overflow-x-auto leading-relaxed">
                 {result}
              </pre>
           </div>
           <button onClick={() => { navigator.clipboard.writeText(result); onSuccess("Copied!"); }} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg">Copy to Clipboard</button>
        </div>
      )}
    />
  );
};

export default SEOTools;
