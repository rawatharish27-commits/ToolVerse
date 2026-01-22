import React, { useState } from 'react';
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

const ORCHESTRATOR_SYSTEM_ROLE = `
You are ToolVerse AI Orchestrator.
You act as planner, decision-maker, and optimizer.
You are not a chatbot. You are the internal brain of ToolVerse platform.

Follow this 9-step output structure strictly:
1. Understanding of User Goal: Briefly summarize the intent.
2. Best Tool Category: The category chosen.
3. Best Tool Name: The specific utility used.
4. Required Inputs: What parameters were analyzed.
5. Recommended Settings: Why these specific AI parameters were used.
6. Processing Steps: Logical steps taken to produce the result.
7. Expected Result: A high-quality generation based on the inputs.
8. Optimization Tips: 2-3 tips to further improve this specific output.
9. Next Action Suggestion: What the user should do next (e.g., Run SEO check, Convert to PDF).
`;

const AITextTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [inputText, setInputText] = useState("");
  const [secondaryText, setSecondaryText] = useState("");
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [orchestrationData, setOrchestrationData] = useState<string | null>(null);

  // Define activeConfig once in component scope
  const configs = [
    aiArticleGeneratorConfig, aiRewriterConfig, aiGrammarConfig, aiToneConverterConfig, 
    aiSeoOptimizerConfig, aiEmailGeneratorConfig, aiResumeWriterConfig, 
    aiStoryGeneratorConfig, aiYoutubeScriptConfig, aiProductDescConfig
  ];
  const activeConfig = configs.find(c => c.slug === slug) || aiArticleGeneratorConfig;

  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    // Use the defined activeConfig for initialization
    if (activeConfig) {
      activeConfig.options.forEach(opt => initial[opt.id] = (opt as any).default);
    }
    return initial;
  });

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
  };

  const callAIWithRetry = async (prompt: string, modelName: string, attempts = 3): Promise<string> => {
    // Fix: Use process.env.API_KEY directly as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    for (let i = 0; i < attempts; i++) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            systemInstruction: ORCHESTRATOR_SYSTEM_ROLE,
            temperature: 0.7,
          }
        });
        return response.text || "";
      } catch (err: any) {
        if (i === attempts - 1) throw err;
        setRetryCount(i + 1);
        await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1))); // Exponential backoff
      }
    }
    return "";
  };

  const handleRunOrchestrator = async () => {
    if (!inputText.trim()) {
      onError("Primary input is required.");
      return;
    }

    setLoading(true);
    setOrchestrationData(null);
    setRetryCount(0);

    try {
      // Logic for choosing model: Simple tasks use Flash, Complex ones use Pro
      const isComplex = ['ai-article-generator', 'ai-resume-writer', 'ai-youtube-script', 'ai-story-generator'].includes(slug);
      const model = isComplex ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';

      const userTask = `
        User Task Type: ${slug.replace('ai-', '').replace('-', ' ')}
        Primary Input Content: "${inputText}"
        Supporting Details: "${secondaryText}"
        Config Options: ${JSON.stringify(options)}
      `;

      const result = await callAIWithRetry(userTask, model);
      setOrchestrationData(result);
      onSuccess("ToolVerse Orchestration Complete!");
    } catch (err: any) {
      console.error(err);
      const isQuota = err.message?.includes('429') || err.message?.includes('quota');
      onError(isQuota ? "Traffic is high. Engine is cooling down, please wait 15s." : "AI engine encountered a snag. Please check your connection.");
    } finally {
      setLoading(false);
      setRetryCount(0);
    }
  };

  const inputSlot = (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
          {slug.includes('article') || slug.includes('story') || slug.includes('youtube') ? 'Topic / Main Idea' : 
           slug.includes('email') ? 'Email Goal' : 
           slug.includes('resume') ? 'Job Role' : 
           slug.includes('product') ? 'Product Name' : 'Text to Process'}
        </label>
        <textarea
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Describe exactly what you want..."
          className="w-full h-32 p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-8 focus:ring-indigo-500/5 outline-none font-sans text-lg font-bold text-slate-700 shadow-inner resize-none transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
          {slug.includes('article') || slug.includes('seo') ? 'SEO Keywords (comma separated)' : 
           slug.includes('product') ? 'Key Features / Specs' : 
           slug.includes('rewriter') || slug.includes('grammar') || slug.includes('tone') ? 'Context (Optional)' : 'Additional Details'}
        </label>
        <textarea
          value={secondaryText}
          onChange={e => setSecondaryText(e.target.value)}
          placeholder="Add keywords, features, or context to improve results..."
          className="w-full h-24 p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-8 focus:ring-indigo-500/5 outline-none font-sans text-sm font-medium text-slate-500 shadow-inner resize-none transition-all"
        />
      </div>
    </div>
  );

  const resultSlot = orchestrationData && (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orchestrationData.split('\n\n').slice(0, 6).map((step, idx) => {
          if (!step.includes(':')) return null;
          const [title, val] = step.split(':');
          return (
            <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-center">
              <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1">{title.trim()}</span>
              <span className="text-xs font-bold text-slate-600 line-clamp-2">{val.trim()}</span>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
            7. Final Optimized Result
          </span>
          <button 
            onClick={() => {
              const sections = orchestrationData.split('7. Expected Result:');
              const final = sections.length > 1 ? sections[1].split('8. Optimization Tips:')[0].trim() : orchestrationData;
              navigator.clipboard.writeText(final);
              onSuccess("Copied!");
            }} 
            className="text-[10px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest"
          >
            Copy Generation
          </button>
        </div>
        <div className="bg-white rounded-[2.5rem] p-10 border-2 border-indigo-50 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500/20"></div>
           <div className="prose prose-slate max-w-none font-medium text-slate-700 leading-relaxed whitespace-pre-wrap">
              {orchestrationData.split('7. Expected Result:')[1]?.split('8. Optimization Tips:')[0]?.trim() || orchestrationData}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
         <div className="space-y-4">
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">8. Performance Optimization</span>
            <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100 text-xs font-bold text-amber-900 leading-relaxed italic">
              {orchestrationData.split('8. Optimization Tips:')[1]?.split('9. Next Action Suggestion:')[0]?.trim() || "Analyze the context for better results."}
            </div>
         </div>
         <div className="space-y-4">
            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">9. Recommended Next Action</span>
            <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100 text-xs font-black text-indigo-900 flex items-center gap-4">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm shadow-lg animate-bounce">➔</div>
              {orchestrationData.split('9. Next Action Suggestion:')[1]?.trim() || "Try another tool."}
            </div>
         </div>
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
          onClick={handleRunOrchestrator} 
          disabled={loading}
          className="w-full py-7 bg-indigo-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl hover:bg-indigo-700 transition-all transform active:scale-95 disabled:opacity-50"
        >
          {loading ? (retryCount > 0 ? `Retrying Engine (${retryCount})...` : "Engaging ToolVerse Orchestrator...") : "Generate Mastery"}
        </button>
      }
      result={resultSlot}
    />
  );
};

export default AITextTools;