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

const IMAGE_ORCHESTRATOR_ROLE = `
You are ToolVerse AI Orchestrator.
You act as a Creative Director and expert AI Image Technician.
You are not a chatbot. You are the internal brain of ToolVerse platform.

Follow this 9-step output structure strictly:
1. Understanding of User Goal: Summarize intent.
2. Best Tool Category: AI Image Tools.
3. Best Tool Name: The specific utility used.
4. Required Inputs: What visual parameters were analyzed.
5. Recommended Settings: Explain selection logic.
6. Processing Steps: Logic used for generation/restoration/upscaling/recoloring/retouching/style transfer/layout/copywriting/humor engineering.
7. Expected Result: A detailed prompt, step-by-step instruction, high-quality captions, or meme idea (text + scene) based on the tool.
8. Optimization Tips: Variations or technical refinements.
9. Next Action Suggestion: Technical follow-up steps.
`;

const AIImageTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const isBgRemover = slug === 'ai-background-remover';
  const isEnhancer = slug === 'ai-image-enhancer';
  const isUpscaler = slug === 'ai-image-upscaler';
  const isRecolor = slug === 'ai-image-recolor';
  const isFaceRetouch = slug === 'ai-face-retouch';
  const isStyleTransfer = slug === 'ai-image-style-transfer';
  const isThumbnailGen = slug === 'ai-thumbnail-generator';
  const isCaptionGen = slug === 'ai-image-caption-generator';
  const isMemeGen = slug === 'ai-meme-generator';
  
  const [formData, setFormData] = useState({
    subject: "",
    style: "",
    mood: "",
    colors: "",
    lighting: "",
    camera: "",
    background: "",
    imageType: "",
    edgeType: "",
    originalBg: "",
    newBg: "",
    issues: "",
    sharpness: "",
    texture: "",
    resolution: "",
    currentRes: "",
    noise: "",
    detail: "",
    targetArea: "",
    currentColor: "",
    newColor: "",
    colorStyle: "",
    shadowHandling: "",
    ageRange: "",
    skinIssue: "",
    eyeFix: "",
    teeth: "",
    hair: "",
    expression: "",
    contentType: "",
    styleName: "",
    artistRef: "",
    brushTexture: "",
    topic: "",
    niche: "",
    emotion: "",
    thumbnailText: "",
    faceReq: "",
    brandNotes: "",
    imageDesc: "",
    tone: "",
    audience: "",
    goal: "",
    cta: "",
    hashtagReq: "",
    memeTopic: "",
    memeTemplate: "",
    memeLanguage: "",
    memeRelatability: "",
    memeTextStyle: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [orchestrationData, setOrchestrationData] = useState<string | null>(null);

  const activeConfig = isBgRemover ? aiBackgroundRemoverConfig : 
                       isEnhancer ? aiImageEnhancerConfig : 
                       isUpscaler ? aiImageUpscalerConfig : 
                       isRecolor ? aiImageRecolorConfig :
                       isFaceRetouch ? aiFaceRetouchConfig :
                       isStyleTransfer ? aiImageStyleTransferConfig :
                       isThumbnailGen ? aiThumbnailGeneratorConfig :
                       isCaptionGen ? aiImageCaptionConfig :
                       isMemeGen ? aiMemeGeneratorConfig :
                       aiImageGeneratorConfig;

  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    activeConfig.options.forEach(opt => initial[opt.id] = (opt as any).default);
    return initial;
  });

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
  };

  const handleRunOrchestrator = async () => {
    if (!formData.subject.trim() && !formData.topic.trim() && !formData.imageDesc.trim() && !formData.memeTopic.trim()) {
      onError("Primary input is required.");
      return;
    }

    setLoading(true);
    setOrchestrationData(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let userTask = `
        Tool Slug: ${slug}
        Contextual Data: ${JSON.stringify(formData)}
        Orchestration Options: ${JSON.stringify(options)}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: userTask,
        config: {
          systemInstruction: IMAGE_ORCHESTRATOR_ROLE,
          temperature: 0.8,
        }
      });

      setOrchestrationData(response.text || "Failed to generate plan.");
      onSuccess("Visual Strategy Orchestrated!");
    } catch (err: any) {
      console.error(err);
      onError("AI Studio is busy. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const inputSlot = (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
            {isThumbnailGen ? 'Video Topic / Hook' : isCaptionGen ? 'Image Description' : isMemeGen ? 'Meme Topic / Situation' : 'Main Subject'}
          </label>
          {isCaptionGen ? (
            <textarea
              value={formData.imageDesc}
              onChange={e => setFormData({...formData, imageDesc: e.target.value})}
              placeholder="Describe the image content for the AI caption engine..."
              className="w-full h-32 p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-8 focus:ring-indigo-500/5 outline-none font-bold text-slate-700 shadow-inner resize-none transition-all"
            />
          ) : (
            <input 
              type="text" 
              value={isThumbnailGen ? formData.topic : isMemeGen ? formData.memeTopic : formData.subject}
              onChange={e => setFormData(isThumbnailGen ? {...formData, topic: e.target.value} : isMemeGen ? {...formData, memeTopic: e.target.value} : {...formData, subject: e.target.value})}
              placeholder="What are we working on?"
              className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-8 focus:ring-indigo-500/5 outline-none font-bold text-slate-700 shadow-inner"
            />
          )}
        </div>

        {isBgRemover && (
          <>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Image Type</label>
              <input type="text" value={formData.imageType} onChange={e => setFormData({...formData, imageType: e.target.value})} placeholder="e.g. Studio Portrait" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Edge Complexity</label>
              <input type="text" value={formData.edgeType} onChange={e => setFormData({...formData, edgeType: e.target.value})} placeholder="e.g. Frizzy hair, Fur" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
          </>
        )}

        {isEnhancer && (
          <>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Current Issues</label>
              <input type="text" value={formData.issues} onChange={e => setFormData({...formData, issues: e.target.value})} placeholder="e.g. Motion blur, Grain" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Lighting Goal</label>
              <input type="text" value={formData.lighting} onChange={e => setFormData({...formData, lighting: e.target.value})} placeholder="e.g. Golden hour glow" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
          </>
        )}

        {isUpscaler && (
          <>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Noise Level</label>
              <input type="text" value={formData.noise} onChange={e => setFormData({...formData, noise: e.target.value})} placeholder="e.g. Highly compressed JPEG" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Detail Priority</label>
              <input type="text" value={formData.detail} onChange={e => setFormData({...formData, detail: e.target.value})} placeholder="e.g. Skin pores, textiles" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
          </>
        )}

        {isRecolor && (
          <>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Target Area</label>
              <input type="text" value={formData.targetArea} onChange={e => setFormData({...formData, targetArea: e.target.value})} placeholder="e.g. Leather jacket" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">New Target Color</label>
              <input type="text" value={formData.newColor} onChange={e => setFormData({...formData, newColor: e.target.value})} placeholder="e.g. Deep Emerald" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
          </>
        )}

        {isFaceRetouch && (
          <>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Skin Issues</label>
              <input type="text" value={formData.skinIssue} onChange={e => setFormData({...formData, skinIssue: e.target.value})} placeholder="e.g. Blemishes, redness" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Eye Fix</label>
              <input type="text" value={formData.eyeFix} onChange={e => setFormData({...formData, eyeFix: e.target.value})} placeholder="e.g. Sharpen pupils" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
          </>
        )}

        {isStyleTransfer && (
          <>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Style Name</label>
              <input type="text" value={formData.styleName} onChange={e => setFormData({...formData, styleName: e.target.value})} placeholder="e.g. Cyberpunk Neon" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Artist Ref</label>
              <input type="text" value={formData.artistRef} onChange={e => setFormData({...formData, artistRef: e.target.value})} placeholder="e.g. Van Gogh" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
          </>
        )}

        {isThumbnailGen && (
          <>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Thumbnail Text</label>
              <input type="text" value={formData.thumbnailText} onChange={e => setFormData({...formData, thumbnailText: e.target.value})} placeholder="e.g. DONT IGNORE THIS!" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-red-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Primary Emotion</label>
              <input type="text" value={formData.emotion} onChange={e => setFormData({...formData, emotion: e.target.value})} placeholder="e.g. Shocked face" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
          </>
        )}

        {isMemeGen && (
          <>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Relatability</label>
              <input type="text" value={formData.memeRelatability} onChange={e => setFormData({...formData, memeRelatability: e.target.value})} placeholder="e.g. For junior devs" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Text Style</label>
              <input type="text" value={formData.memeTextStyle} onChange={e => setFormData({...formData, memeTextStyle: e.target.value})} placeholder="e.g. IMPACT font, top/bottom" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
          </>
        )}

        {!isBgRemover && !isEnhancer && !isUpscaler && !isRecolor && !isFaceRetouch && !isStyleTransfer && !isThumbnailGen && !isCaptionGen && !isMemeGen && (
          <>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Style</label>
              <input type="text" value={formData.style} onChange={e => setFormData({...formData, style: e.target.value})} placeholder="e.g. Cinematic, 3D Render" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Mood</label>
              <input type="text" value={formData.mood} onChange={e => setFormData({...formData, mood: e.target.value})} placeholder="e.g. Dark, Ethereal" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
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
              <span className="text-[8px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-1 block">{title.trim()}</span>
              <span className="text-[11px] font-bold text-slate-600 line-clamp-2">{val.trim()}</span>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
            7. Visual Core Output
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
        <div className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group border border-slate-800">
           <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/50"></div>
           <div className="text-emerald-400 font-mono text-sm leading-relaxed italic whitespace-pre-wrap">
              {orchestrationData.split('7. Expected Result:')[1]?.split('8. Optimization Tips:')[0]?.trim() || orchestrationData}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
         <div className="space-y-4">
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">8. Expert Optimization</span>
            <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100 text-xs font-bold text-amber-900 leading-relaxed">
              {orchestrationData.split('8. Optimization Tips:')[1]?.split('9. Next Action Suggestion:')[0]?.trim() || "Consider lighting refinements."}
            </div>
         </div>
         <div className="space-y-4">
            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">9. Recommended Next Action</span>
            <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100 text-xs font-black text-indigo-900 flex items-center gap-4">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm shadow-lg animate-bounce">➔</div>
              {orchestrationData.split('9. Next Action Suggestion:')[1]?.trim() || "Refine the prompt for better detail."}
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
          {loading ? "Engaging AI Studio Engine..." : "Orchestrate Visuals"}
        </button>
      }
      result={resultSlot}
    />
  );
};

export default AIImageTools;