
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { socialCaptionGeneratorConfig, socialHashtagGeneratorConfig, socialBioGeneratorConfig, socialReelIdeaGeneratorConfig, socialCommentGeneratorConfig, socialPostSchedulerConfig, socialThumbnailPreviewerConfig, socialImageRatioConfig, socialEmojiPickerConfig, socialPollCreatorConfig } from '../../config/socialTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const SocialTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const activeConfig = [
    socialCaptionGeneratorConfig, socialHashtagGeneratorConfig, socialBioGeneratorConfig, 
    socialReelIdeaGeneratorConfig, socialCommentGeneratorConfig, socialPostSchedulerConfig, 
    socialThumbnailPreviewerConfig, socialImageRatioConfig, socialEmojiPickerConfig, socialPollCreatorConfig
  ].find(c => c.slug === slug) || socialCaptionGeneratorConfig;

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
      onError("Please provide context for the AI.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Task: ${slug}. Input: "${input}". Options: ${JSON.stringify(options)}. Return the social media content ready to use.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          systemInstruction: "You are a world-class Social Media Strategist. Output only the final results like captions, tags, or bios. Use appropriate formatting and emojis.",
          temperature: 0.8,
        }
      });

      setResult(response.text || "Failed.");
      onSuccess("Social Strategy Generated!");
    } catch (err: any) {
      onError("AI Engine snag. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  const inputSlot = (
    <div className="space-y-4">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Post Description / Niche / Idea</label>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="e.g. A new video about healthy smoothies for gym goers..."
        className="w-full h-32 p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-8 focus:ring-cyan-500/5 outline-none font-sans text-lg font-bold text-slate-700 shadow-inner resize-none transition-all"
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
          className="w-full py-7 bg-cyan-600 text-white rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-cyan-700 transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? "Generating Strategy..." : "Generate Social Content"}
        </button>
      }
      result={result && (
        <div className="space-y-6">
           <div className="bg-slate-900 p-10 rounded-[3rem] text-emerald-400 font-medium whitespace-pre-wrap leading-relaxed shadow-inner">
              {result}
           </div>
           <button onClick={() => { navigator.clipboard.writeText(result); onSuccess("Copied!"); }} className="w-full py-5 bg-slate-100 text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white transition-all border border-slate-200">Copy to Clipboard</button>
        </div>
      )}
    />
  );
};

export default SocialTools;
