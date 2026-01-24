
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { 
  aiArticleGeneratorConfig, 
  aiRewriterConfig, 
  aiGrammarConfig, 
  aiToneConverterConfig, 
  aiSeoOptimizerConfig, 
  aiEmailGeneratorConfig, 
  aiResumeWriterConfig, 
  aiStoryGeneratorConfig, 
  aiYoutubeScriptConfig, 
  aiProductDescConfig 
} from '../../config/aiTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const AITextTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [inputText, setInputText] = useState("");
  const [secondaryText, setSecondaryText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const configs = [
    aiArticleGeneratorConfig, aiRewriterConfig, aiGrammarConfig, aiToneConverterConfig, 
    aiSeoOptimizerConfig, aiEmailGeneratorConfig, aiResumeWriterConfig, 
    aiStoryGeneratorConfig, aiYoutubeScriptConfig, aiProductDescConfig
  ];
  const activeConfig = configs.find(c => c.slug === slug) || aiArticleGeneratorConfig;

  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    activeConfig.options.forEach(opt => initial[opt.id] = (opt as any).default);
    return initial;
  });

  useEffect(() => {
    setResult(null);
    setInputText("");
    setSecondaryText("");
  }, [slug]);

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
  };

  const handleProcess = async () => {
    if (!inputText.trim()) {
      onError("Please provide the primary input.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = ['ai-article-generator', 'ai-resume-writer', 'ai-youtube-script'].includes(slug) 
        ? 'gemini-3-pro-preview' 
        : 'gemini-3-flash-preview';

      const prompt = `
        Tool: ${slug}
        Input: "${inputText}"
        Details: "${secondaryText}"
        Config: ${JSON.stringify(options)}

        Instructions: Return the final output only. If it's an article, use markdown. If it's code, use code blocks. If it's a resume, use professional bullet points. DO NOT explain what you did.
      `;

      const response = await ai.models.generateContent({
        model: model,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          systemInstruction: "You are ToolVerse AI Content Engine. You produce ready-to-use, professional content based on user inputs. Never talk to the user, only produce the content.",
          temperature: 0.7,
        }
      });

      setResult(response.text || "Empty result.");
      onSuccess("AI Content Generated!");
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Requested entity was not found")) {
         if (window.aistudio?.openSelectKey) window.aistudio.openSelectKey();
      } else {
         onError("Network busy. Retry in 5s.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputSlot = (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Main Topic / Source Text</label>
        <textarea
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Describe what you want the AI to create or process..."
          className="w-full h-40 p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-8 focus:ring-indigo-500/5 outline-none font-sans text-lg font-bold text-slate-700 shadow-inner resize-none transition-all"
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Supporting Context (Optional)</label>
        <input 
          type="text" 
          value={secondaryText} 
          onChange={e => setSecondaryText(e.target.value)}
          placeholder="Keywords, specific names, or rules..."
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner"
        />
      </div>
    </div>
  );

  const resultSlot = result && (
    <div className="space-y-6 animate-in fade-in slide-in-from-top-4">
      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border-2 border-indigo-50 shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500/20"></div>
         <div className="prose prose-slate max-w-none font-medium text-slate-700 leading-relaxed whitespace-pre-wrap">
            {result}
         </div>
      </div>
      <div className="flex justify-center gap-4">
         <button 
          onClick={() => { navigator.clipboard.writeText(result); onSuccess("Copied!"); }}
          className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl"
         >
           Copy Content
         </button>
         <button 
          onClick={() => {
            const blob = new Blob([result], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `toolverse_${slug}_${Date.now()}.txt`;
            a.click();
          }}
          className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl"
         >
           Download .txt
         </button>
      </div>
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
          onClick={handleProcess} 
          disabled={loading}
          className="w-full py-7 bg-indigo-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? "AI Orchestrator Working..." : result ? "Refine & Regenerate" : "Produce Final Content"}
        </button>
      }
      result={resultSlot}
    />
  );
};

export default AITextTools;
