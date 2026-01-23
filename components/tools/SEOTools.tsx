import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { TOOLS } from '../../data/tools';
import { CATEGORIES } from '../../data/categories';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { 
  metaTagGeneratorConfig, 
  keywordDensityCheckerConfig, 
  robotsTxtGeneratorConfig, 
  sitemapGeneratorConfig, 
  schemaGeneratorConfig,
  serpPreviewToolConfig,
  headingStructureCheckerConfig,
  canonicalTagCheckerConfig,
  seoScoreAnalyzerConfig,
  aiSeoAnalyzerConfig
} from '../../config/seoTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const SEO_ORCHESTRATOR_ROLE = `
You are ToolVerse AI Orchestrator.
You act as an expert Technical SEO Specialist, Sitemap Architect, and Metadata Optimization consultant.
You are not a chatbot. You are the internal brain of ToolVerse platform.

Follow this 9-step output structure strictly:
1. Understanding of User Goal: Summarize intent (Audits, Metadata, Density, SERP, Heading, Sitemap, Robots, Canonical, or SEO Score).
2. Best Tool Category: SEO Tools.
3. Best Tool Name: The specific utility used.
4. Required Inputs: What parameters were analyzed.
5. Recommended Settings: Selection logic for optimization parameters.
6. Processing Steps: Logic used for content analysis, crawl safety, weighted scoring, XML structuring, or heading hierarchy mapping.
7. Expected Result: Deep SEO insights, master reports, or the master output (like HTML Meta Tags, valid Robots.txt, or SEO Health Score).
8. Optimization Tips: Advanced refinements (e.g., self-canonicalization advice, specific score boosts, or URL splitting).
9. Next Action Suggestion: Technical follow-up steps.
`;

const SEOTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const isAIAnalyzer = slug === 'ai-seo-analyzer';
  const isMetaGen = slug === 'meta-tag-generator';
  const isDensityExpert = slug === 'keyword-density-checker';
  const isSerpPreview = slug === 'serp-preview-tool';
  const isHeadingChecker = slug === 'heading-structure-checker';
  const isSitemap = slug === 'xml-sitemap-generator';
  const isRobots = slug === 'robots-txt-generator';
  const isCanonical = slug === 'canonical-tag-checker';
  const isScoreCalc = slug === 'seo-score-analyzer';
  const isOrchestrated = isAIAnalyzer || isMetaGen || isDensityExpert || isSerpPreview || isHeadingChecker || isSitemap || isRobots || isCanonical || isScoreCalc;
  
  const [baseUrl, setBaseUrl] = useState('https://toolverse-4gr.pages.dev');
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultVal, setResultVal] = useState('');
  const [orchestrationData, setOrchestrationData] = useState<string | null>(null);

  const [metaData, setMetaData] = useState({
    title: 'ToolVerse | Professional Online Tools Platform',
    description: 'Access 500+ high-traffic free online tools for PDF, images, video, and SEO directly in your browser.',
    keywords: 'seo, tools, free, productivity',
    url: 'https://toolverse-4gr.pages.dev',
    image: 'https://toolverse-4gr.pages.dev/og-image.png',
  });

  const [topic, setTopic] = useState('');
  const [brand, setBrand] = useState('ToolVerse');
  const [secondaryKeywords, setSecondaryKeywords] = useState('');
  const [siteType, setSiteType] = useState('Blog');
  const [allowPaths, setAllowPaths] = useState('');
  const [disallowPaths, setDisallowPaths] = useState('');
  const [sitemapUrl, setSitemapUrl] = useState('https://example.com/sitemap.xml');
  const [expectedCanonical, setExpectedCanonical] = useState('');
  const [sitemapPaths, setSitemapPaths] = useState('/\n/about\n/contact\n/blog');

  const configs = [
    aiSeoAnalyzerConfig, metaTagGeneratorConfig, keywordDensityCheckerConfig, serpPreviewToolConfig,
    headingStructureCheckerConfig, sitemapGeneratorConfig, robotsTxtGeneratorConfig,
    canonicalTagCheckerConfig, seoScoreAnalyzerConfig, schemaGeneratorConfig
  ];
  const targetConfig = configs.find(c => c.slug === slug) || aiSeoAnalyzerConfig;

  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    if (targetConfig.options) {
      targetConfig.options.forEach(opt => initial[opt.id] = (opt as any).default);
    }
    return initial;
  });

  // Reset state on tool change
  useEffect(() => {
    const initial: Record<string, any> = {};
    if (targetConfig.options) {
      targetConfig.options.forEach(opt => initial[opt.id] = (opt as any).default);
    }
    setOptions(initial);
    setInputText("");
    setOrchestrationData(null);
    setResultVal("");
    setLoading(false);
  }, [slug]);

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
  };

  const handleRunAIOrchestrator = async () => {
    if ((isAIAnalyzer || isDensityExpert || isHeadingChecker || isCanonical || isScoreCalc) && !inputText.trim()) {
      onError("Content or HTML snippet is required for analysis.");
      return;
    }
    if (isSitemap && !sitemapPaths.trim()) {
      onError("URL list is required for sitemap generation.");
      return;
    }
    if (isMetaGen && !topic.trim()) {
      onError("Page topic is required for metadata generation.");
      return;
    }
    if (isSerpPreview && !metaData.title.trim()) {
      onError("SEO Title is required for preview.");
      return;
    }

    setLoading(true);
    setOrchestrationData(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      
      let userTask = "";
      if (isAIAnalyzer) {
        userTask = `User Request: Deep Content SEO Audit. Content: "${inputText}". Topic: "${topic}".`;
      } else if (isMetaGen) {
        userTask = `User Request: Click-Optimized Meta Tags. Topic: "${topic}". Brand: "${brand}".`;
      } else if (isDensityExpert) {
        userTask = `User Request: Keyword Density Analysis. Content: "${inputText}". Topic: "${topic}".`;
      } else if (isSerpPreview) {
        userTask = `User Request: SERP Preview Audit. Title: "${metaData.title}". Desc: "${metaData.description}".`;
      } else if (isHeadingChecker) {
        userTask = `User Request: Heading Structure Audit. Content: "${inputText}".`;
      } else if (isSitemap) {
        userTask = `User Request: XML Sitemap Creation. Paths: "${sitemapPaths}".`;
      } else if (isRobots) {
        userTask = `User Request: Robots.txt Generation. Site: "${siteType}". Sitemap: "${sitemapUrl}".`;
      } else if (isCanonical) {
        userTask = `User Request: Canonical Audit. HTML: "${inputText}". URL: "${metaData.url}".`;
      } else if (isScoreCalc) {
        userTask = `User Request: Master SEO Score. Content: "${inputText}". Title: "${metaData.title}".`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: userTask,
        config: {
          systemInstruction: SEO_ORCHESTRATOR_ROLE,
          temperature: 0.75,
        }
      });

      setOrchestrationData(response.text || "Failed to generate orchestration.");
      onSuccess("SEO Core Analysis Ready!");
    } catch (err: any) {
      if (err.message?.includes("Requested entity was not found")) {
         if (window.aistudio?.openSelectKey) window.aistudio.openSelectKey();
      } else {
         onError("AI SEO Core is busy. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const generateOutput = () => {
    if (isOrchestrated) {
      handleRunAIOrchestrator();
      return;
    }

    setLoading(true);
    setResultVal('');

    setTimeout(() => {
      try {
        switch (slug) {
          case 'json-ld-schema-pro': {
            const schema = { "@context": "https://schema.org", "@type": "WebSite", "name": brand, "url": baseUrl };
            setResultVal(JSON.stringify(schema, null, 2));
            onSuccess("Schema Generated!");
            break;
          }
        }
      } catch (err) {
        onError("Generation failed.");
      }
      setLoading(false);
    }, 400);
  };

  const inputSlot = (
    <div className="space-y-6 py-2">
      {isMetaGen ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Page Topic / Main Idea</label>
              <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Benefits of Mediterranean Diet" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none font-bold text-slate-700" />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Primary Keyword</label>
              <input type="text" value={secondaryKeywords.split(',')[0] || ''} onChange={e => setSecondaryKeywords(e.target.value + (secondaryKeywords.includes(',') ? ',' + secondaryKeywords.split(',').slice(1).join(',') : ''))} placeholder="e.g. mediterranian diet" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none font-bold text-slate-700" />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Brand Name (Optional)</label>
              <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g. HealthHub" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none font-bold text-slate-700" />
           </div>
        </div>
      ) : isSerpPreview ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">SEO Title</label>
              <input type="text" value={metaData.title} onChange={e => setMetaData({...metaData, title: e.target.value})} placeholder="e.g. 10 Best Productivity Tools for 2026" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 outline-none font-bold text-slate-700" />
           </div>
           <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Meta Description</label>
              <textarea rows={3} value={metaData.description} onChange={e => setMetaData({...metaData, description: e.target.value})} placeholder="e.g. Discover the most powerful tools to boost your workflow..." className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 outline-none font-bold text-slate-700 resize-none" />
           </div>
        </div>
      ) : isScoreCalc ? (
        <div className="space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Paste Full Page Content</label>
              <textarea rows={6} value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Paste the text of your article..." className="w-full p-6 bg-slate-50 border border-slate-200 rounded-3xl outline-none font-medium text-slate-700 shadow-inner resize-none transition-all" />
           </div>
        </div>
      ) : isSitemap ? (
        <div className="space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Page URLs (one per line)</label>
              <textarea rows={10} value={sitemapPaths} onChange={e => setSitemapPaths(e.target.value)} placeholder="https://example.com/..." className="w-full p-6 bg-slate-50 border border-slate-200 rounded-[2rem] outline-none font-mono text-sm shadow-inner transition-all" />
           </div>
        </div>
      ) : (
        <div className="space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Paste Content for Analysis</label>
              <textarea rows={8} value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Paste page text or HTML snippet here..." className="w-full p-6 bg-slate-50 border border-slate-200 rounded-3xl outline-none font-medium text-slate-700 shadow-inner resize-none transition-all" />
           </div>
        </div>
      )}
    </div>
  );

  const resultSlot = (resultVal || orchestrationData) && (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-700">
      {isSerpPreview && (
        <div className="bg-slate-50 p-12 rounded-[3.5rem] border border-slate-200 mb-12 shadow-inner">
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 text-center px-1">High-Fidelity Google {options.device} Simulation</div>
           <div className="flex justify-center">
              {options.device === 'Desktop' ? (
                <div className="bg-white p-10 rounded-xl shadow-sm border border-slate-200 max-w-2xl w-full text-left">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 mb-1">
                       <div className="text-sm font-medium text-slate-500 truncate">{metaData.url.replace(/^https?:\/\//, '')}</div>
                    </div>
                    <h3 className="text-xl font-medium text-[#1a0dab] hover:underline cursor-pointer leading-tight mb-1 truncate">
                      {metaData.title || 'Your Page Title'}
                    </h3>
                    <div className="text-sm text-[#4d5156] leading-relaxed line-clamp-2">
                      {metaData.description || 'Provide a description for your SEO snippet.'}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 w-full max-w-[360px] text-left">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-medium text-[#1a0dab] leading-tight">
                      {metaData.title || 'Your Page Title'}
                    </h3>
                    <div className="text-sm text-[#4d5156] leading-relaxed line-clamp-3">
                      {metaData.description || 'Provide a description for your SEO snippet.'}
                    </div>
                  </div>
                </div>
              )}
           </div>
        </div>
      )}

      {orchestrationData ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {orchestrationData.split('\n\n').slice(0, 6).map((step, idx) => {
              if (!step.includes(':')) return null;
              const [title, val] = step.split(':');
              return (
                <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <span className="text-[8px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-1 block">{title.trim()}</span>
                  <span className="text-[11px] font-bold text-slate-600 line-clamp-2">{val.trim()}</span>
                </div>
              );
            })}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                7. Master AI Output
              </span>
            </div>
            <div className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group border border-slate-800">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/50"></div>
              <div className="text-emerald-400 font-mono text-sm leading-relaxed italic whitespace-pre-wrap">
                {orchestrationData.split('7. Expected Result:')[1]?.split('8. Optimization Tips:')[0]?.trim() || orchestrationData}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-950 p-8 rounded-[2rem] border border-slate-800 relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-50"></div>
          <pre className="text-emerald-400 font-mono text-xs overflow-x-auto whitespace-pre leading-relaxed">
            {resultVal}
          </pre>
        </div>
      )}
    </div>
  );

  return (
    <ToolLayout
      title={targetConfig.title}
      description={targetConfig.description}
      icon={targetConfig.icon}
      colorClass={targetConfig.colorClass}
      input={inputSlot}
      options={targetConfig.options && targetConfig.options.length > 0 ? <OptionsPanel options={targetConfig.options as any} values={options} onChange={handleOptionChange} /> : undefined}
      actions={
        <button 
          onClick={isOrchestrated ? handleRunAIOrchestrator : generateOutput} 
          disabled={loading}
          className={`w-full py-5 ${targetConfig.colorClass} text-white rounded-2xl font-black text-lg shadow-xl transition-all active:scale-95 disabled:opacity-50 hover:brightness-110`}
        >
          {loading ? "Engaging AI SEO Engine..." : "Run Analysis"}
        </button>
      }
      result={resultSlot}
    />
  );
};

export default SEOTools;