import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { socialCaptionGeneratorConfig, socialHashtagGeneratorConfig, socialBioGeneratorConfig, socialReelIdeaGeneratorConfig, socialCommentGeneratorConfig, socialPostSchedulerConfig, socialThumbnailPreviewerConfig, socialImageRatioConfig, socialEmojiPickerConfig, socialPollCreatorConfig } from '../../config/socialTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const SOCIAL_ORCHESTRATOR_ROLE = `
You are ToolVerse AI Orchestrator.
You act as a world-class Social Media Strategist, Visual QA Analyst, and Engagement Psychologist.
You are not a chatbot. You are the internal brain of ToolVerse platform.

Follow this 9-step output structure strictly:
1. Understanding of User Goal: Summarize intent (Captions, Hashtags, Bio, Reel, Comment, Scheduling, Thumbnail QA, Image Ratio, Emoji Strategy, or Poll Creation).
2. Best Tool Category: Social Media Tools.
3. Best Tool Name: The specific social utility used.
4. Required Inputs: What parameters (tone, platform, niche, name, USP, current size, orientation, device, text sentiment, poll topic, audience, etc.) were analyzed.
5. Recommended Settings: Explain why specific mixes or styles were selected for this platform.
6. Processing Steps: Logic used for hook creation, retention mapping, CTR optimization, aspect ratio calculation, emoji psychology, or poll engagement mechanics.
7. Expected Result: The master social output (Captions, Hashtags, Bios, Reel Ideas, comments, Schedule, CTR Analysis, Resolution Specs, Contextual Emojis, or Engagement-Optimized Poll).
8. Optimization Tips: Technical advice (rotation, timing, color contrast, emoji density, padding vs crop, reply velocity, batching content, follow-up strategies).
9. Next Action Suggestion: Strategic next step.
`;

const SocialTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const isCaption = slug === 'social-caption-generator';
  const isHashtag = slug === 'social-hashtag-generator';
  const isBio = slug === 'social-bio-generator';
  const isReel = slug === 'social-reel-idea-generator';
  const isComment = slug === 'social-comment-generator';
  const isScheduler = slug === 'social-post-scheduler';
  const isThumbnail = slug === 'social-thumbnail-previewer';
  const isRatio = slug === 'social-image-ratio-tool';
  const isEmoji = slug === 'social-emoji-picker';
  const isPoll = slug === 'social-poll-creator';
  
  const [inputText, setInputText] = useState("");
  const [tone, setTone] = useState("Professional");
  const [niche, setNiche] = useState("");
  const [audience, setAudience] = useState("");
  const [goal, setGoal] = useState("Engagement");
  const [cta, setCta] = useState("");
  const [brandName, setBrandName] = useState("");
  const [language, setLanguage] = useState("English");
  const [postingFreq, setPostingFreq] = useState("3x/week");
  
  // Bio specific fields
  const [bioName, setBioName] = useState("");
  const [bioRole, setBioRole] = useState("");
  const [bioUSP, setBioUSP] = useState("");

  // Thumbnail specific fields
  const [tpTitle, setTpTitle] = useState("");
  const [tpTopic, setTpTopic] = useState("");
  const [tpColors, setTpColors] = useState("");
  const [tpFontStyle, setTpFontStyle] = useState("");

  // Image Ratio specific fields
  const [irCurrentSize, setIrCurrentSize] = useState("");

  // Poll specific fields
  const [plTopic, setPlTopic] = useState("");
  const [plAudience, setPlAudience] = useState("");

  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [orchestrationData, setOrchestrationData] = useState<string | null>(null);

  const activeConfig = isHashtag ? socialHashtagGeneratorConfig : 
                       isBio ? socialBioGeneratorConfig : 
                       isReel ? socialReelIdeaGeneratorConfig :
                       isComment ? socialCommentGeneratorConfig :
                       isScheduler ? socialPostSchedulerConfig :
                       isThumbnail ? socialThumbnailPreviewerConfig :
                       isRatio ? socialImageRatioConfig :
                       isEmoji ? socialEmojiPickerConfig :
                       isPoll ? socialPollCreatorConfig :
                       socialCaptionGeneratorConfig;

  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    activeConfig.options.forEach(opt => initial[opt.id] = (opt as any).default);
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
            systemInstruction: SOCIAL_ORCHESTRATOR_ROLE,
            temperature: 0.85,
          }
        });
        return response.text || "";
      } catch (err: any) {
        if (i === attempts - 1) throw err;
        setRetryCount(i + 1);
        await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
      }
    }
    return "";
  };

  const handleRunOrchestrator = async () => {
    if (!inputText.trim() && !isBio && !isReel && !niche.trim() && !isComment && !isScheduler && !tpTitle.trim() && !isRatio && !isEmoji && !plTopic.trim()) {
      onError("Primary context or inputs are required.");
      return;
    }

    setLoading(true);
    setOrchestrationData(null);
    setRetryCount(0);

    try {
      // Social tasks are mostly basic text tasks, use Flash unless it's a very complex scheduler/reel architect
      const model = (isScheduler || isReel) ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
      
      let userTask = "";
      if (isCaption) {
        userTask = `Task: Social Captions. Context: "${inputText}". Tone: "${tone}". Platform: "${options.platform}".`;
      } else if (isHashtag) {
        userTask = `Task: Hashtags. Topic: "${inputText}". Niche: "${niche}". Platform: "${options.platform}".`;
      } else if (isBio) {
        userTask = `Task: Social Bio. Name: "${bioName}". Role: "${bioRole}". USP: "${bioUSP}". Platform: "${options.platform}".`;
      } else if (isReel) {
        userTask = `Task: Viral Reel Idea. Niche: "${niche}". Goal: "${options.goal}". Platform: "${options.platform}".`;
      } else if (isComment) {
        userTask = `Task: Social Comment. Context: "${inputText}". Strategy: "${options.commentType}". Platform: "${options.platform}".`;
      } else if (isScheduler) {
        userTask = `Task: Content Schedule. Niche: "${niche}". Goal: "${options.goal}". Duration: "${options.duration}".`;
      } else if (isThumbnail) {
        userTask = `Task: Thumbnail QA. Title: "${tpTitle}". Topic: "${tpTopic}". Platform: "${options.platform}".`;
      } else if (isRatio) {
        userTask = `Task: Image Ratio. Platform: "${options.platform}". Orientation: "${options.orientation}".`;
      } else if (isEmoji) {
        userTask = `Task: Emoji Picker. Content: "${inputText}". Tone: "${options.tone}". Purpose: "${options.purpose}".`;
      } else if (isPoll) {
        userTask = `Task: Engagement Poll. Topic: "${plTopic}". Audience: "${plAudience}". Platform: "${options.platform}".`;
      }

      const result = await callAIWithRetry(userTask, model);
      setOrchestrationData(result);
      onSuccess("Social Strategy Orchestrated!");
    } catch (err: any) {
      console.error(err);
      onError("Core busy. Trying to stabilize connection... Please retry.");
    } finally {
      setLoading(false);
      setRetryCount(0);
    }
  };

  const inputSlot = (
    <div className="space-y-6">
      {(!isBio && !isReel && !isScheduler && !isThumbnail && !isRatio && !isEmoji && !isPoll) && (
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
            {isHashtag ? 'Post Topic / Description' : isComment ? 'Post Context / Caption' : isEmoji ? 'Caption / Bio / Comment Text' : 'Describe your post (Context)'}
          </label>
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder={isHashtag ? "e.g. A digital painting of a cyberpunk city..." : isComment ? "Paste the caption or describe the post..." : isEmoji ? "Paste your social media copy here..." : "e.g. A photo of my new home office setup..."}
            className="w-full h-32 p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-8 focus:ring-cyan-500/5 outline-none font-bold text-slate-700 shadow-inner resize-none transition-all"
          />
        </div>
      )}

      {(isReel || isScheduler) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Niche / Industry</label>
            <input type="text" value={niche} onChange={e => setNiche(e.target.value)} placeholder="e.g. Personal Finance" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-700 shadow-inner" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Target Audience</label>
            <input type="text" value={audience} onChange={e => setAudience(e.target.value)} placeholder="e.g. Students" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
          </div>
        </div>
      )}

      {isBio && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Name / Brand Name</label>
            <input type="text" value={bioName} onChange={e => setBioName(e.target.value)} placeholder="e.g. ToolVerse" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-700 shadow-inner" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Role / Identity</label>
              <input type="text" value={bioRole} onChange={e => setBioRole(e.target.value)} placeholder="e.g. SaaS Founder" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Unique Value (USP)</label>
              <input type="text" value={bioUSP} onChange={e => setBioUSP(e.target.value)} placeholder="e.g. Building tools for 10M+ users" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
          </div>
        </div>
      )}

      {isThumbnail && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Main Thumbnail Text</label>
            <input type="text" value={tpTitle} onChange={e => setTpTitle(e.target.value)} placeholder="e.g. I LOST EVERYTHING!" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-700 shadow-inner" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Video Topic Context</label>
            <input type="text" value={tpTopic} onChange={e => setTpTopic(e.target.value)} placeholder="e.g. Investing mistake" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Primary Colors</label>
            <input type="text" value={tpColors} onChange={e => setTpColors(e.target.value)} placeholder="e.g. Bright yellow" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
          </div>
        </div>
      )}

      {isRatio && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Current Dimensions</label>
            <input type="text" value={irCurrentSize} onChange={e => setIrCurrentSize(e.target.value)} placeholder="e.g. 1920x1080" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-700 shadow-inner" />
          </div>
          <div className="p-8 bg-slate-100 rounded-3xl border border-slate-200 text-center">
             <div className="text-4xl mb-3">📏</div>
             <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Ratio Analysis Core Active</p>
          </div>
        </div>
      )}

      {isPoll && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Poll Topic</label>
            <input type="text" value={plTopic} onChange={e => setPlTopic(e.target.value)} placeholder="e.g. Coffee vs Tea" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-700 shadow-inner" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Target Audience</label>
            <input type="text" value={plAudience} onChange={e => setPlAudience(e.target.value)} placeholder="e.g. Designers" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {!isBio && !isReel && !isScheduler && !isThumbnail && !isRatio && !isEmoji && !isPoll && (
          <>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Desired Tone</label>
              <input type="text" value={tone} onChange={e => setTone(e.target.value)} placeholder="e.g. Witty" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Primary Goal</label>
              <input type="text" value={goal} onChange={e => setGoal(e.target.value)} placeholder="e.g. Trigger Replies" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
          </>
        )}
      </div>
    </div>
  );

  const resultSlot = orchestrationData && (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {orchestrationData.split('\n\n').slice(0, 6).map((step, idx) => {
          if (!step.includes(':')) return null;
          const [title, val] = step.split(':');
          return (
            <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <span className="text-[8px] font-black text-cyan-500 uppercase tracking-[0.2em] mb-1 block">{title.trim()}</span>
              <span className="text-[11px] font-bold text-slate-600 line-clamp-2">{val.trim()}</span>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
            7. Master Social Output
          </span>
          <button 
            onClick={() => {
              const sections = orchestrationData.split('7. Expected Result:');
              const final = sections.length > 1 ? sections[1].split('8. Optimization Tips:')[0].trim() : orchestrationData;
              navigator.clipboard.writeText(final);
              onSuccess("Copied!");
            }} 
            className="text-[10px] font-black text-slate-400 hover:text-cyan-600 uppercase tracking-widest"
          >
            Copy Result
          </button>
        </div>
        <div className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group border border-slate-800">
           <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50"></div>
           <div className="text-emerald-400 font-mono text-sm leading-relaxed italic whitespace-pre-wrap">
              {orchestrationData.split('7. Expected Result:')[1]?.split('8. Optimization Tips:')[0]?.trim() || orchestrationData}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
         <div className="space-y-4">
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">8. Expert Strategy</span>
            <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100 text-xs font-bold text-amber-900 leading-relaxed">
              {orchestrationData.split('8. Optimization Tips:')[1]?.split('9. Next Action Suggestion:')[0]?.trim() || "Analyze for higher engagement."}
            </div>
         </div>
         <div className="space-y-4">
            <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">9. Recommended Next Action</span>
            <div className="bg-cyan-50/50 p-6 rounded-3xl border border-cyan-100 text-xs font-black text-cyan-900 flex items-center gap-4">
              <div className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm shadow-lg animate-bounce">➔</div>
              {orchestrationData.split('9. Next Action Suggestion:')[1]?.trim() || "Plan next post."}
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
          className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl hover:brightness-110 transition-all transform active:scale-95 disabled:opacity-50`}
        >
          {loading ? (retryCount > 0 ? `Retrying AI (${retryCount})...` : "Engaging AI Social Engine...") : "Generate Strategy"}
        </button>
      }
      result={resultSlot}
    />
  );
};

export default SocialTools;