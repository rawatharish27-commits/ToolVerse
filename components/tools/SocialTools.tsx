
import React, { useState, useEffect, useMemo } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { TOOLS } from '../../data/tools';
import { 
  reelHookGeneratorConfig, youtubeIdeaGeneratorConfig, 
  youtubeTitleGeneratorConfig, youtubeDescriptionGeneratorConfig,
  instagramCaptionGeneratorConfig, commentReplyGeneratorConfig,
  generalHashtagGeneratorConfig, socialBioFormatterConfig,
  viralCaptionFormatterConfig
} from '../../config/socialTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const SocialTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const toolNode = useMemo(() => TOOLS.find(t => t.slug === slug), [slug]);
  const activeConfig = useMemo(() => [
    reelHookGeneratorConfig, youtubeIdeaGeneratorConfig, youtubeTitleGeneratorConfig,
    youtubeDescriptionGeneratorConfig, instagramCaptionGeneratorConfig,
    commentReplyGeneratorConfig, generalHashtagGeneratorConfig,
    socialBioFormatterConfig, viralCaptionFormatterConfig
  ].find(c => c.slug === slug) || youtubeTitleGeneratorConfig, [slug]);

  const [options, setOptions] = useState<Record<string, any>>({});

  useEffect(() => {
    const initial: Record<string, any> = {};
    activeConfig.options.forEach((opt: any) => initial[opt.id] = opt.default);
    setOptions(initial);
    setInput("");
    setResult(null);
  }, [slug, activeConfig]);

  const handleRun = async () => {
    if (!toolNode?.execute) { onError("Execution node not found."); return; }
    if (!input.trim() && !['youtube-video-idea-generator'].includes(slug)) {
      onError("Please provide context for the AI Strategist.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const output = await toolNode.execute(input, options);
      setResult(output);
      onSuccess("Viral Strategy Orchestrated!");
    } catch (err: any) {
      console.error(err);
      onError("Intelligence node is at capacity. Retrying...");
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
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Creative Context Workspace</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Describe your content topic, keywords, or raw script ideas..."
            className="w-full h-44 p-6 bg-slate-50 border border-slate-200 rounded-[2.5rem] focus:ring-8 focus:ring-indigo-500/5 outline-none font-sans text-lg font-bold text-slate-700 shadow-inner resize-none transition-all"
          />
        </div>
      }
      options={activeConfig.options?.length > 0 ? <OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, val) => setOptions(p => ({ ...p, [id]: val }))} /> : undefined}
      actions={
        <button 
          onClick={handleRun} 
          disabled={loading}
          className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all transform active:scale-95 disabled:opacity-50`}
        >
          {loading ? "Architecting Engagement..." : "Generate Master Output"}
        </button>
      }
      result={result && (
        <div className="space-y-8 animate-in fade-in slide-in-from-top-4">
           <div className="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <div className="text-8xl font-black italic">CONTENT</div>
              </div>
              <div className="relative z-10 prose prose-invert max-w-none">
                 <div className="text-emerald-400 font-medium whitespace-pre-wrap leading-relaxed">
                   {result}
                 </div>
              </div>
           </div>
           <button 
            onClick={() => { navigator.clipboard.writeText(result); onSuccess("Strategy Copied!"); }}
            className="w-full py-5 bg-white text-slate-900 border border-slate-100 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-50"
          >
            Copy Strategy to Clipboard
          </button>
        </div>
      )}
    />
  );
};

export default SocialTools;
