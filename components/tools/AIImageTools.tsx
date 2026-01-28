import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { aiImageGeneratorConfig, aiBackgroundRemoverConfig, aiImageEnhancerConfig, aiImageUpscalerConfig, aiImageRecolorConfig, aiFaceRetouchConfig, aiImageStyleTransferConfig, aiThumbnailGeneratorConfig, aiImageCaptionConfig, aiMemeGeneratorConfig } from '../../config/aiImageTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const AIImageTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [subject, setSubject] = useState("");
  const [style, setSubjectStyle] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [aiTextResponse, setAiTextResponse] = useState<string | null>(null);

  const activeConfig = [
    aiImageGeneratorConfig, aiBackgroundRemoverConfig, aiImageEnhancerConfig, 
    aiImageUpscalerConfig, aiImageRecolorConfig, aiFaceRetouchConfig, 
    aiImageStyleTransferConfig, aiThumbnailGeneratorConfig, aiImageCaptionConfig, 
    aiMemeGeneratorConfig
  ].find(c => c.slug === slug) || aiImageGeneratorConfig;

  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    activeConfig.options.forEach(opt => initial[opt.id] = (opt as any).default);
    return initial;
  });

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
  };

  const handleGenerate = async () => {
    if (!subject.trim()) {
      onError("Please describe what you want to generate.");
      return;
    }

    setLoading(true);
    setGeneratedImageUrl(null);
    setAiTextResponse(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Determine if it's a text-based task or image-based task
      const isPureImageGen = ['ai-image-generator', 'ai-thumbnail-generator', 'ai-meme-generator'].includes(slug);

      if (isPureImageGen) {
        const fullPrompt = `Subject: ${subject}. Style: ${style || options.engine || 'High quality cinematic'}. Aspect Ratio: ${options.ar || '1:1'}. ${options.quality || ''}`;
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [{ text: fullPrompt }] },
          config: {
            imageConfig: {
              aspectRatio: (options.ar as any) || "1:1",
            }
          }
        });

        // Extract Image from parts
        let foundImage = false;
        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            const base64 = part.inlineData.data;
            setGeneratedImageUrl(`data:image/png;base64,${base64}`);
            foundImage = true;
            onSuccess("AI Image Generated Successfully!");
            break;
          }
        }
        if (!foundImage) throw new Error("AI did not return an image part.");
      } else {
        // For analysis tools (Caption, Bio, etc.)
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: { parts: [{ text: `Task: ${slug}. Content: ${subject}. Options: ${JSON.stringify(options)}` }] },
          config: {
            systemInstruction: "You are an elite Visual Strategist. Return only the final output (captions, instructions, or labels). Be concise.",
          }
        });
        setAiTextResponse(response.text || "No response.");
        onSuccess("Analysis Complete!");
      }
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Requested entity was not found")) {
         if (window.aistudio?.openSelectKey) window.aistudio.openSelectKey();
      } else {
         onError("AI Engine is busy. Please try again in 10 seconds.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputSlot = (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
          {['ai-image-caption-generator', 'ai-meme-generator'].includes(slug) ? 'Content Context' : 'Subject Description'}
        </label>
        <textarea
          value={subject}
          onChange={e => setSubject(e.target.value)}
          placeholder="e.g. A futuristic city with neon lights, raining, cyberpunk style..."
          className="w-full h-32 p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-8 focus:ring-indigo-500/5 outline-none font-sans text-lg font-bold text-slate-700 shadow-inner resize-none transition-all"
        />
      </div>
      {!['ai-image-caption-generator'].includes(slug) && (
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Additional Style Details (Optional)</label>
          <input 
            type="text" 
            value={style} 
            onChange={e => setSubjectStyle(e.target.value)}
            placeholder="e.g. 8k, photorealistic, van gogh style..."
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner"
          />
        </div>
      )}
    </div>
  );

  const resultSlot = (generatedImageUrl || aiTextResponse) && (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5">
      {generatedImageUrl ? (
        <div className="flex flex-col items-center">
          <div className="bg-slate-900 p-4 rounded-[3rem] shadow-2xl border-4 border-white overflow-hidden max-w-2xl w-full">
            <img src={generatedImageUrl} alt="AI Result" className="w-full h-auto rounded-[2rem]" />
          </div>
          <div className="mt-8 flex gap-4">
            <a 
              href={generatedImageUrl} 
              download={`toolverse_ai_${Date.now()}.png`} 
              className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl flex items-center gap-3"
            >
              <span>💾</span> Download Image
            </a>
            <button 
              onClick={() => { setGeneratedImageUrl(null); setSubject(""); }}
              className="px-10 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all"
            >
              Clear
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-950 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl relative">
          <div className="flex justify-between items-center mb-6">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">AI Output Engine</span>
             <button onClick={() => { navigator.clipboard.writeText(aiTextResponse || ""); onSuccess("Copied!"); }} className="text-indigo-400 text-[10px] font-black uppercase hover:underline">Copy All</button>
          </div>
          <div className="text-emerald-400 font-mono text-sm whitespace-pre-wrap leading-relaxed">
            {aiTextResponse}
          </div>
        </div>
      )}
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
          onClick={handleGenerate} 
          disabled={loading}
          className="w-full py-7 bg-indigo-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl hover:bg-indigo-700 transition-all transform active:scale-95 disabled:opacity-50"
        >
          {loading ? "Engaging Neural Core..." : generatedImageUrl ? "Regenerate Masterpiece" : "Start Generation"}
        </button>
      }
      result={resultSlot}
    />
  );
};

export default AIImageTools;
