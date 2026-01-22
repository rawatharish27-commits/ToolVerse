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
You act as a Creative Director and expert AI Image Technician (Generation, Restoration, Color Grading, Portrait Retouching, Style Transfer, CTR Optimization, Social Media Copywriting, and Meme Strategy).
You are not a chatbot. You are the internal brain of ToolVerse platform.

Follow this 9-step output structure strictly:
1. Understanding of User Goal: Summarize intent.
2. Best Tool Category: AI Image Tools.
3. Best Tool Name: The specific utility used.
4. Required Inputs: What visual parameters were analyzed.
5. Recommended Settings: Explain selection logic.
6. Processing Steps: Logic used for generation/restoration/upscaling/recoloring/retouching/style transfer/layout/copywriting/humor engineering.
7. Expected Result: A detailed prompt, step-by-step instruction, high-quality captions, or meme idea (text + scene) based on the tool.
8. Optimization Tips: Variations or technical refinements (e.g., negative prompts, tiling, mask instructions, A/B testing ideas, hashtag strategy, timing).
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

  const handleRunOrchestrator = async () => {
    if (!formData.subject.trim() && !formData.topic.trim() && !formData.imageDesc.trim() && !formData.memeTopic.trim()) {
      onError("Primary input (subject, topic, description, or meme situation) is required.");
      return;
    }

    setLoading(true);
    setOrchestrationData(null);

    try {
      // Fix: Use process.env.API_KEY directly as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let userTask = "";
      if (isBgRemover) {
        userTask = `
          User Request: Background Removal Instructions
          - Subject: ${formData.subject}
          - Image Type: ${formData.imageType}
          - Edge Complexity: ${formData.edgeType}
          - Original Background: ${formData.originalBg}
          - Target New Background: ${formData.newBg}
          - Options: ${JSON.stringify(options)}
        `;
      } else if (isEnhancer) {
        userTask = `
          User Request: Image Enhancement Architecture
          - Subject: ${formData.subject}
          - Image Type: ${formData.imageType}
          - Current Issues: ${formData.issues}
          - Sharpness Goal: ${formData.sharpness}
          - Lighting Fix: ${formData.lighting}
          - Color Treatment: ${formData.colors}
          - Texture Focus: ${formData.texture}
          - Target Resolution: ${formData.resolution}
          - Options: ${JSON.stringify(options)}
        `;
      } else if (isUpscaler) {
        userTask = `
          User Request: Image Upscaling Architecture (Super-Resolution)
          - Subject: ${formData.subject}
          - Image Type: ${formData.imageType}
          - Current Resolution: ${formData.currentRes}
          - Target Scale: ${options.scale}
          - Detail Preservation: ${formData.detail}
          - Noise Handling: ${formData.noise}
          - Edge Handling: ${formData.sharpness}
          - Texture Focus: ${formData.texture}
          - Artifact preference: ${options.artifact}
          - Target Platform: ${options.platform}
          - Options: ${JSON.stringify(options)}
        `;
      } else if (isRecolor) {
        userTask = `
          User Request: Professional Image Recoloring Strategy
          - Subject: ${formData.subject}
          - Image Type: ${formData.imageType}
          - Target Area to Recolor: ${formData.targetArea}
          - Current Color: ${formData.currentColor}
          - New Target Color: ${formData.newColor}
          - Color Style/Finish: ${formData.colorStyle}
          - Lighting Condition: ${formData.lighting}
          - Shadow Handling: ${formData.shadowHandling}
          - Texture Preservation: ${formData.texture}
          - Accuracy Level: ${options.accuracy}
          - Target Platform: ${options.platform}
          - Options: ${JSON.stringify(options)}
        `;
      } else if (isFaceRetouch) {
        userTask = `
          User Request: Professional AI Portrait Retouching Plan
          - Subject: ${formData.subject}
          - Age Range: ${formData.ageRange}
          - Skin Issues: ${formData.skinIssue}
          - Eye Adjustments: ${formData.eyeFix}
          - Teeth Whitening: ${formData.teeth}
          - Hair Fix: ${formData.hair}
          - Lighting Correction: ${formData.lighting}
          - Expression: ${formData.expression}
          - Retouch Level: ${options.retouchLevel}
          - Target Platform: ${options.platform}
          - Options: ${JSON.stringify(options)}
          Focus on realism and texture preservation.
        `;
      } else if (isStyleTransfer) {
        userTask = `
          User Request: Professional AI Style Transfer Architecture
          - Subject: ${formData.subject}
          - Content Type: ${formData.contentType}
          - Target Style: ${formData.styleName}
          - Artist Reference: ${formData.artistRef}
          - Color Mood: ${formData.mood}
          - Texture preference: ${formData.brushTexture}
          - Detail level: ${options.detailLevel}
          - Background handling: ${formData.background}
          - Style strength: ${options.strength}
          - Target Platform: ${options.platform}
          - Options: ${JSON.stringify(options)}
          Focus on artistic fidelity while keeping original subject structure.
        `;
      } else if (isThumbnailGen) {
        userTask = `
          User Request: High-CTR Thumbnail Strategy & Prompt Builder
          - Video Topic/Hook: ${formData.topic}
          - Niche: ${formData.niche}
          - Primary Emotion: ${formData.emotion || options.emotionPreset}
          - Thumbnail Text (2-5 words): ${formData.thumbnailText}
          - Primary Colors: ${formData.colors}
          - Face Requirement & Expression: ${formData.faceReq}
          - Background Style: ${formData.background}
          - Branding (logo/font): ${formData.brandNotes}
          - Contrast level: ${options.contrast}
          - Target Platform: ${options.platform}
          - Options: ${JSON.stringify(options)}
          Focus on psychological triggers, visibility in feed, and professional layout direction.
        `;
      } else if (isCaptionGen) {
        userTask = `
          User Request: Multi-Variant High-Engagement Image Captions
          - Image Description: ${formData.imageDesc}
          - Platform: ${options.platform}
          - Desired Tone: ${formData.tone}
          - Target Audience: ${formData.audience}
          - Marketing/Content Goal: ${formData.goal}
          - Emoji Preference: ${options.emojiUsage}
          - Call to Action (CTA): ${formData.cta}
          - Hashtag Requirement: ${formData.hashtagReq}
          - Caption Length: ${options.length}
          - Options: ${JSON.stringify(options)}
          Provide 3-5 distinct platform-optimized variants.
        `;
      } else if (isMemeGen) {
        userTask = `
          User Request: Viral Meme Concept & Punchline Architecture
          - Meme Situation/Topic: ${formData.memeTopic}
          - Template Style: ${formData.memeTemplate}
          - Tone: ${formData.tone}
          - Target Audience: ${formData.audience}
          - Target Platform: ${formData.mood}
          - Language: ${formData.memeLanguage}
          - Relatability Level: ${formData.memeRelatability}
          - Text Style: ${formData.memeTextStyle}
          - Meme Format: ${options.format}
          - Virality Risk: ${options.virality}
          - Options: ${JSON.stringify(options)}
          Provide meme text (clear placement), scene description, and layout guidance.
        `;
      } else {
        userTask = `
          User Visual Intent: 
          - Subject: ${formData.subject}
          - Style: ${formData.style}
          - Mood: ${formData.mood}
          - Colors: ${formData.colors}
          - Lighting: ${formData.lighting}
          - Camera: ${formData.camera}
          - Background: ${formData.background}
          - Options: ${JSON.stringify(options)}
        `;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: userTask,
        config: {
          systemInstruction: IMAGE_ORCHESTRATOR_ROLE,
          temperature: 0.8,
        }
      });

      setOrchestrationData(response.text || "Failed to generate plan.");
      onSuccess(isMemeGen ? "Meme Concept Ready!" : isCaptionGen ? "Captions Mastered!" : isThumbnailGen ? "Thumbnail Strategy Ready!" : isBgRemover ? "Removal Architecture Ready!" : isEnhancer ? "Enhancement Strategy Created!" : isUpscaler ? "Upscaling Plan Ready!" : isRecolor ? "Recolor Instructions Ready!" : isFaceRetouch ? "Portrait Plan Ready!" : isStyleTransfer ? "Style Transfer Plan Ready!" : "Prompt Mastery Achieved!");
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
              placeholder="e.g. A high-angle shot of a coffee cup with steam, marble table background, laptop on the side"
              className="w-full h-32 p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-8 focus:ring-indigo-500/5 outline-none font-bold text-slate-700 shadow-inner resize-none"
            />
          ) : (
            <input 
              type="text" 
              value={isThumbnailGen ? formData.topic : isMemeGen ? formData.memeTopic : formData.subject}
              onChange={e => setFormData(isThumbnailGen ? {...formData, topic: e.target.value} : isMemeGen ? {...formData, memeTopic: e.target.value} : {...formData, subject: e.target.value})}
              placeholder={isMemeGen ? "e.g. When you finally fix a bug but create 10 more" : isThumbnailGen ? "e.g. How I made $10,000 in 30 days" : isBgRemover ? "e.g. A woman with curly hair" : isEnhancer ? "e.g. Landscape of Tokyo" : isUpscaler ? "e.g. A vintage portrait of a man" : isRecolor ? "e.g. A luxury sports car" : isFaceRetouch ? "e.g. Male business portrait" : isStyleTransfer ? "e.g. A cat sitting on a fence" : "e.g. A futuristic robot holding a white lotus"}
              className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-8 focus:ring-indigo-500/5 outline-none font-bold text-slate-700 shadow-inner"
            />
          )}
        </div>

        {isBgRemover ? (
          <>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Image Type</label>
              <input type="text" value={formData.imageType} onChange={e => setFormData({...formData, imageType: e.target.value})} placeholder="e.g. Studio Portrait, Outdoor Product" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Original Background</label>
              <input type="text" value={formData.originalBg} onChange={e => setFormData({...formData, originalBg: e.target.value})} placeholder="e.g. Crowded street, plain wall" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">New Background Goal</label>
              <input type="text" value={formData.newBg} onChange={e => setFormData({...formData, newBg: e.target.value})} placeholder="e.g. Transparent, Solid White, Mars" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Edge Complexity</label>
              <input type="text" value={formData.edgeType} onChange={e => setFormData({...formData, edgeType: e.target.value})} placeholder="e.g. Frizzy hair, Glass, Fur" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
          </>
        ) : isEnhancer ? (
          <>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Image Type</label>
              <input type="text" value={formData.imageType} onChange={e => setFormData({...formData, imageType: e.target.value})} placeholder="e.g. Portrait, Scenery" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Visual Issues</label>
              <input type="text" value={formData.issues} onChange={e => setFormData({...formData, issues: e.target.value})} placeholder="e.g. Blur, Noise, Low Light" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Sharpness Preference</label>
              <input type="text" value={formData.sharpness} onChange={e => setFormData({...formData, sharpness: e.target.value})} placeholder="e.g. High detail, Natural" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Lighting & Colors</label>
              <input type="text" value={formData.colors} onChange={e => setFormData({...formData, colors: e.target.value})} placeholder="e.g. Vibrant, Brighten shadows" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Texture Detail</label>
              <input type="text" value={formData.texture} onChange={e => setFormData({...formData, texture: e.target.value})} placeholder="e.g. Skin pores, fabric weave" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Target Resolution</label>
              <input type="text" value={formData.resolution} onChange={e => setFormData({...formData, resolution: e.target.value})} placeholder="e.g. HD, 4K, 8K" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
          </>
        ) : isUpscaler ? (
          <>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Image Type</label>
              <input type="text" value={formData.imageType} onChange={e => setFormData({...formData, imageType: e.target.value})} placeholder="e.g. Portrait, Artwork" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Current Resolution</label>
              <input type="text" value={formData.currentRes} onChange={e => setFormData({...formData, currentRes: e.target.value})} placeholder="e.g. 512x512, 1MP" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Detail Preservation</label>
              <input type="text" value={formData.detail} onChange={e => setFormData({...formData, detail: e.target.value})} placeholder="e.g. Keep fine wrinkles, Enhance jewelry" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Noise Handling</label>
              <input type="text" value={formData.noise} onChange={e => setFormData({...formData, noise: e.target.value})} placeholder="e.g. High compression, Grainy" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Edge Sharpness</label>
              <input type="text" value={formData.sharpness} onChange={e => setFormData({...formData, sharpness: e.target.value})} placeholder="e.g. Sharp, Soft/Natural" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Texture Focus</label>
              <input type="text" value={formData.texture} onChange={e => setFormData({...formData, texture: e.target.value})} placeholder="e.g. Skin, Fabric, Metal" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
          </>
        ) : isRecolor ? (
          <>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Target Area</label>
              <input type="text" value={formData.targetArea} onChange={e => setFormData({...formData, targetArea: e.target.value})} placeholder="e.g. Dress, Car body, Eyes" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Current Color</label>
              <input type="text" value={formData.currentColor} onChange={e => setFormData({...formData, currentColor: e.target.value})} placeholder="e.g. Bright Red" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">New Target Color</label>
              <input type="text" value={formData.newColor} onChange={e => setFormData({...formData, newColor: e.target.value})} placeholder="e.g. Matte Emerald Green" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Finish/Style</label>
              <input type="text" value={formData.colorStyle} onChange={e => setFormData({...formData, colorStyle: e.target.value})} placeholder="e.g. Glossy, Metallic, Satin" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Lighting Condition</label>
              <input type="text" value={formData.lighting} onChange={e => setFormData({...formData, lighting: e.target.value})} placeholder="e.g. Direct sunlight, Studio soft" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Texture Preservation</label>
              <input type="text" value={formData.texture} onChange={e => setFormData({...formData, texture: e.target.value})} placeholder="e.g. Fabric weave, Leather grain" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
          </>
        ) : isFaceRetouch ? (
          <>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Approx Age Range</label>
              <input type="text" value={formData.ageRange} onChange={e => setFormData({...formData, ageRange: e.target.value})} placeholder="e.g. 20–30" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Skin Issues</label>
              <input type="text" value={formData.skinIssue} onChange={e => setFormData({...formData, skinIssue: e.target.value})} placeholder="e.g. Acne, wrinkles, blemishes" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Eye & Teeth Fix</label>
              <input type="text" value={formData.eyeFix} onChange={e => setFormData({...formData, eyeFix: e.target.value})} placeholder="e.g. Brighten eyes, Whiten teeth" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Hair Adjustments</label>
              <input type="text" value={formData.hair} onChange={e => setFormData({...formData, hair: e.target.value})} placeholder="e.g. Remove flyaways, add volume" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Lighting & Focus</label>
              <input type="text" value={formData.lighting} onChange={e => setFormData({...formData, lighting: e.target.value})} placeholder="e.g. Soften shadows, bokeh" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Expression Handling</label>
              <input type="text" value={formData.expression} onChange={e => setFormData({...formData, expression: e.target.value})} placeholder="e.g. Keep natural, subtle smile" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
            </div>
          </>
        ) : isStyleTransfer ? (
          <>
