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

const SOCIAL_SYSTEM_INSTRUCTION = `
You are the ToolVerse Social AI Architect. 
You act as a viral growth hacker and creator consultant.
Follow these rules:
1. Provide highly engaging, "Ready-to-Post" content.
2. If the user asks for titles/ideas/hooks, provide EXACTLY 5 variations.
3. Use relevant emojis and platform-specific formatting (like line breaks for Instagram).
4. For hashtags, categorize them into 'Reach', 'Niche', and 'Trending'.
5. Strictly Markdown output. No conversational filler.
`;

const SocialTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
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

  const handleRun = async () => {
    if (!input.trim() && !['youtube-video-idea-generator', 'instagram-hashtag-analyzer'].includes(slug)) {
      onError("Please provide a topic or context.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Tool: ${slug}. Context: "${input || options.niche || 'General Trending'}". Parameters: ${JSON.stringify(options)}. Generate the social media master output.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          systemInstruction: SOCIAL_SYSTEM_INSTRUCTION,
          temperature: 0.8,
        }
      });

      const text = response.text || "";
      setResult(text);
      onSuccess("Viral Strategy Generated!");
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Requested entity was not found")) {
        if (window.aistudio?.openSelectKey) window.aistudio.openSelectKey();
      } else {
        onError("Social Engine is busy. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const placeholder = useMemo(() => {
    if (slug.includes('hook')) return "What is your video about? (e.g., '3 ways to save money')";
    if (slug.includes('title')) return "What is your video topic?";
    if (slug.includes('bio')) return "Tell us about yourself/business...";
    if (slug.includes('comment')) return "Paste the comment you want to reply to...";
    return "Describe your content or topic...";
  }, [slug]);

  return (
    <ToolLayout
      title={activeConfig.title}
      description={activeConfig.description}
      icon={activeConfig.icon}
      colorClass={activeConfig.colorClass}
      input={
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Creative Workspace</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={placeholder}
            className="w-full h-40 p-6 bg-slate-50 border border-slate-200 rounded-[2rem] focus:ring-8 focus:ring-cyan-500/5 outline-none font-sans text-lg font-bold text-slate-700 shadow-inner resize-none transition-all"
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
          {loading ? "Architecting Engagement..." : "Generate Viral Content"}
        </button>
      }
      result={result && (
        <div className="space-y-8 animate-in fade-in slide-in-from-top-4">
           <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <div className="text-8xl font-black italic">SOCIAL</div>
              </div>
              <div className="relative z-10 prose prose-invert max-w-none">
                 <div className="text-emerald-400 font-medium whitespace-pre-wrap leading-relaxed">
                   {result}
                 </div>
              </div>
           </div>
           <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => { navigator.clipboard.writeText(result); onSuccess("Strategy Copied!"); }}
                className="flex-grow py-5 bg-slate-100 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all border border-slate-200"
              >
                Copy to Clipboard
              </button>
              <button 
                onClick={() => { setInput(""); setResult(null); }}
                className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all"
              >
                Start New Idea
              </button>
           </div>
        </div>
      )}
    />
  );
};

export default SocialTools;