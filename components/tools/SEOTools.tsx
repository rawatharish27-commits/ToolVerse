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
  
  // Common SEO States
  const [baseUrl, setBaseUrl] = useState('https://toolverse-4gr.pages.dev');
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultVal, setResultVal] = useState('');
  const [orchestrationData, setOrchestrationData] = useState<string | null>(null);

  // Meta States
  const [metaData, setMetaData] = useState({
    title: 'ToolVerse | Professional Online Tools Platform',
    description: 'Access 500+ high-traffic free online tools for PDF, images, video, and SEO directly in your browser.',
    keywords: 'seo, tools, free, productivity',
    url: 'https://toolverse-4gr.pages.dev',
    image: 'https://toolverse-4gr.pages.dev/og-image.png',
  });

  // Generator & Audit States
  const [topic, setTopic] = useState('');
  const [brand, setBrand] = useState('ToolVerse');
  const [secondaryKeywords, setSecondaryKeywords] = useState('');
  const [siteType, setSiteType] = useState('Blog');
  const [allowPaths, setAllowPaths] = useState('');
  const [disallowPaths, setDisallowPaths] = useState('');
  const [sitemapUrl, setSitemapUrl] = useState('https://example.com/sitemap.xml');
  const [expectedCanonical, setExpectedCanonical] = useState('');

  // Local States for Robots/Sitemap (Manual)
  const [sitemapPaths, setSitemapPaths] = useState('/\n/about\n/contact\n/blog');

  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    const configs = [
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
    ];
    const target = configs.find(c => c.slug === slug);
    if (target) {
      target.options?.forEach(opt => initial[opt.id] = (opt as any).default);
    }
    return initial;
  });

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
        userTask = `
          User Request: Deep Content SEO Audit
          - Content Snapshot: "${inputText}"
          - Primary Keyword: "${topic}"
          - Secondary Keywords: "${secondaryKeywords}"
          - Options: ${JSON.stringify(options)}
        `;
      } else if (isMetaGen) {
        userTask = `
          User Request: Click-Optimized Meta Tags (HTML Output)
          - Page Topic: "${topic}"
          - Primary Keyword: "${secondaryKeywords.split(',')[0] || topic}"
          - Secondary Keywords: "${secondaryKeywords}"
          - Page Type: "${options.pageType}"
          - Search Intent: "${options.intent}"
          - Brand Name: "${brand}"
          - Desired Tone: "${options.tone}"
          - Include Social (OG/Twitter): "${options.social}"
          
          Generate: SEO Title, Meta Description, and relevant Social Tags. Return clean HTML snippet.
        `;
      } else if (isDensityExpert) {
        userTask = `
          User Request: Advanced Keyword Density & Optimization Analysis
          - Content to Analyze: "${inputText}"
          - Primary Keyword: "${topic}"
          - Secondary Keywords: "${secondaryKeywords}"
          - Match Type: "${options.matchType}"
          - Analysis Scope: "${options.scope}"
          - Options: ${JSON.stringify(options)}
        `;
      } else if (isSerpPreview) {
        userTask = `
          User Request: AI SERP Preview & CTR Analysis
          - SEO Title: "${metaData.title}"
          - Meta Description: "${metaData.description}"
          - URL: "${metaData.url}"
          - Brand: "${brand}"
          - Device: "${options.device}"
          - Search Intent: "${options.intent}"
          - Target Region: "${options.region}"
          - Emoji Usage: "${options.emoji}"
          - Date Inclusion: "${options.date}"
          
          Analyze truncation based on the device width. Evaluate CTR potential. Show simulated char boundaries.
        `;
      } else if (isHeadingChecker) {
        userTask = `
          User Request: Deep Heading Structure (H1–H6) Audit
          - Content Source (HTML/Text): "${inputText}"
          - Primary Keyword: "${topic}"
          - Secondary Keywords: "${secondaryKeywords}"
          - Content Type: "${options.contentType}"
          - Search Intent: "${options.intent}"
          - Audit Depth: "${options.depth}"
          - Readability Goal: "${options.readability}"
          - Duplicate H1 Logic: "${options.dupH1}"
          
          Analyze the hierarchy. Identify skipped levels, missing H1s, or over-stuffed keywords. Provide an optimized heading outline for the user.
        `;
      } else if (isSitemap) {
        userTask = `
          User Request: AI XML Sitemap Architecture
          - URLs to include: "${sitemapPaths}"
          - Change Frequency: "${options.changefreq}"
          - Default Priority: "${options.priority}"
          - Include Images: "${options.includeImages}"
          - Include Videos: "${options.includeVideos}"
          - Canonical Strategy: "${options.canonicalOnly}"
          - Trailing Slash Logic: "${options.trailingSlash}"
          - Forced Protocol: "${options.protocol}"
          - Output Format: "${options.outputFormat}"
          
          Generate a valid, SEO-optimized XML sitemap. Normalize all URLs. Return raw XML code.
        `;
      } else if (isRobots) {
        userTask = `
          User Request: AI Robots.txt Crawl Architect
          - Site Type: "${siteType}"
          - Allow Paths: "${allowPaths}"
          - Disallow Paths: "${disallowPaths}"
          - Block Admin: ${options.blockAdmin}
          - Block Search: ${options.blockSearch}
          - Block Cart: ${options.blockCart}
          - Allow Images: ${options.allowImages}
          - Allow CSS/JS: ${options.allowCSSJS}
          - Sitemap URL: "${sitemapUrl}"
          - Bot Scope: "${options.botScope}"
          
          Generate a technical SEO-compliant robots.txt. Ensure sitemaps are referenced. Return robots.txt content only.
        `;
      } else if (isCanonical) {
        userTask = `
          User Request: AI Canonical Tag Strategy & Audit
          - HTML/Head Content: "${inputText}"
          - Current Page URL: "${metaData.url}"
          - Expected Canonical URL: "${expectedCanonical}"
          - Page Type: "${options.pageType}"
          - Duplicate Content Risk: "${options.dupRisk}"
          - Parameter Handling: "${options.paramHandling}"
          - Trailing Slash Rule: "${options.slashRule}"
          - Protocol Pref: "${options.protocol}"
          - Indexing Intent: "${options.indexing}"
          - Audit Scope: "${options.scope}"
          
          Audit the provided HTML for canonical tags. Detect errors, missing tags, or protocol/slash mismatches. Suggest the absolute best canonical strategy for this page.
        `;
      } else if (isScoreCalc) {
        userTask = `
          User Request: Master SEO Score Calculation
          - Content to Analyze: "${inputText}"
          - Primary Keyword: "${topic}"
          - SEO Title: "${metaData.title}"
          - Meta Description: "${metaData.description}"
          - Content Type: "${options.contentType}"
          - Search Intent: "${options.intent}"
          - Readability Level: "${options.readability}"
          - Heading Optimization: "${options.headings}"
          - Internal Links: "${options.internalLinks}"
          - Image SEO: "${options.images}"
          
          Calculate a weighted SEO score out of 100 based on keyword usage (25%), title/meta (20%), headings (15%), quality/intent (25%), and UX signals (15%). Provide a breakdown and exact priority fixes to improve the score.
        `;
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
      onSuccess(isScoreCalc ? "SEO Health Audit Ready!" : isCanonical ? "Canonical Audit Complete!" : "SEO Core Ready!");
    } catch (err: any) {
      console.error(err);
      onError("SEO AI Core is busy. Try again in a moment.");
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

  const currentConfig = slug === 'ai-seo-analyzer' ? aiSeoAnalyzerConfig :
                       slug === 'meta-tag-generator' ? metaTagGeneratorConfig : 
                       slug === 'keyword-density-checker' ? keywordDensityCheckerConfig :
                       slug === 'serp-preview-tool' ? serpPreviewToolConfig :
                       slug === 'heading-structure-checker' ? headingStructureCheckerConfig :
                       slug === 'xml-sitemap-generator' ? sitemapGeneratorConfig :
                       slug === 'robots-txt-generator' ? robotsTxtGeneratorConfig :
                       slug === 'canonical-tag-checker' ? canonicalTagCheckerConfig :
                       slug === 'seo-score-analyzer' ? seoScoreAnalyzerConfig :
                       schemaGeneratorConfig;

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
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Page URL</label>
              <input type="text" value={metaData.url} onChange={e => setMetaData({...metaData, url: e.target.value})} placeholder="https://example.com/page" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 outline-none font-medium text-slate-600" />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Brand Name</label>
              <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="ToolVerse" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 outline-none font-bold text-slate-700" />
           </div>
        </div>
      ) : isScoreCalc ? (
        <div className="space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Paste Full Page Content</label>
              <textarea rows={6} value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Paste the text of your article or landing page..." className="w-full p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-8 focus:ring-indigo-500/5 outline-none font-medium text-slate-700 shadow-inner resize-none transition-all" />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Target Primary Keyword</label>
                <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. SEO Best Practices" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-700" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">SEO Title</label>
                <input type="text" value={metaData.title} onChange={e => setMetaData({...metaData, title: e.target.value})} placeholder="Article Title" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Meta Description</label>
                <textarea rows={2} value={metaData.description} onChange={e => setMetaData({...metaData, description: e.target.value})} placeholder="Search result snippet..." className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 resize-none" />
              </div>
           </div>
        </div>
      ) : isRobots ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Site Type</label>
              <input type="text" value={siteType} onChange={e => setSiteType(e.target.value)} placeholder="e.g. Blog, E-commerce, SaaS" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-700 shadow-inner" />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Sitemap URL</label>
              <input type="text" value={sitemapUrl} onChange={e => setSitemapUrl(e.target.value)} placeholder="https://example.com/sitemap.xml" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Allow Paths (CSV)</label>
              <input type="text" value={allowPaths} onChange={e => setAllowPaths(e.target.value)} placeholder="/assets/, /public/" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Disallow Paths (CSV)</label>
              <input type="text" value={disallowPaths} onChange={e => setDisallowPaths(e.target.value)} placeholder="/temp/, /private/" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600 shadow-inner" />
           </div>
        </div>
      ) : isSitemap ? (
        <div className="space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Page URLs (one per line)</label>
              <textarea rows={10} value={sitemapPaths} onChange={e => setSitemapPaths(e.target.value)} placeholder="https://example.com/&#10;https://example.com/about&#10;https://example.com/services" className="w-full p-6 bg-slate-50 border border-slate-200 rounded-[2rem] focus:ring-8 focus:ring-slate-500/5 outline-none font-mono text-sm shadow-inner transition-all" />
           </div>
        </div>
      ) : isCanonical ? (
        <div className="space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Paste HTML / Head Section</label>
              <textarea rows={8} value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Paste your <head> tag or HTML source here..." className="w-full p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-8 focus:ring-blue-500/5 outline-none font-mono text-xs text-slate-700 shadow-inner resize-none transition-all" />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Current Page URL</label>
                <input type="text" value={metaData.url} onChange={e => setMetaData({...metaData, url: e.target.value})} placeholder="https://example.com/current" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Expected Canonical URL</label>
                <input type="text" value={expectedCanonical} onChange={e => setExpectedCanonical(e.target.value)} placeholder="https://example.com/preferred" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600" />
              </div>
           </div>
        </div>
      ) : (isAIAnalyzer || isDensityExpert || isHeadingChecker) ? (
        <div className="space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Paste Content for Analysis</label>
              <textarea rows={8} value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Paste the page text or HTML snippet here..." className="w-full p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-8 focus:ring-indigo-500/5 outline-none font-medium text-slate-700 shadow-inner resize-none transition-all" />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Primary Keyword</label>
                <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Best Pizza New York" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none font-bold text-slate-700" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Secondary Keywords</label>
                <input type="text" value={secondaryKeywords} onChange={e => setSecondaryKeywords(e.target.value)} placeholder="e.g. fast delivery, gluten free" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none font-bold text-slate-700" />
              </div>
           </div>
        </div>
      ) : (
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Base Domain URL</label>
          <input type="text" value={baseUrl} onChange={e => setBaseUrl(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none font-bold text-slate-700" />
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
                <div className="bg-white p-10 rounded-xl shadow-sm border border-slate-200 max-w-2xl w-full">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 mb-1">
                       <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[10px]">🌐</div>
                       <div className="text-sm font-medium text-slate-500 truncate max-w-[400px]">{metaData.url.replace(/^https?:\/\//, '')}</div>
                    </div>
                    <h3 className="text-xl font-medium text-[#1a0dab] hover:underline cursor-pointer leading-tight mb-1 truncate">
                      {metaData.title || 'Your Page Title'}
                    </h3>
                    <div className="text-sm text-[#4d5156] leading-relaxed line-clamp-2 max-w-[600px]">
                      {options.date !== 'None' && <span className="text-slate-400 mr-1">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} — </span>}
                      {metaData.description || 'Provide a compelling description to improve your organic click-through rate (CTR).'}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 w-full max-w-[360px]">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-sm">🌐</div>
                       <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-900 leading-none mb-1">Site Identity</span>
                          <span className="text-[10px] text-slate-500 leading-none">{metaData.url.replace(/^https?:\/\//, '')}</span>
                       </div>
                    </div>
                    <h3 className="text-lg font-medium text-[#1a0dab] leading-tight mt-1">
                      {metaData.title || 'Your Page Title'}
                    </h3>
                    <div className="text-sm text-[#4d5156] leading-relaxed line-clamp-3">
                      {options.date !== 'None' && <span className="text-slate-400 mr-1">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} — </span>}
                      {metaData.description || 'Provide a compelling description to improve your organic click-through rate (CTR).'}
                    </div>
                  </div>
                </div>
              )}
           </div>
           <div className="mt-8 flex justify-center gap-8">
              <div className="text-center">
                 <div className={`text-2xl font-black ${metaData.title.length > 60 ? 'text-rose-500' : 'text-emerald-500'}`}>{metaData.title.length}</div>
                 <div className="text-[9px] font-black text-slate-400 uppercase">Title Chars</div>
              </div>
              <div className="text-center">
                 <div className={`text-2xl font-black ${metaData.description.length > 160 ? 'text-rose-500' : 'text-emerald-500'}`}>{metaData.description.length}</div>
                 <div className="text-[9px] font-black text-slate-400 uppercase">Desc Chars</div>
              </div>
           </div>
        </div>
      )}

      {isOrchestrated && orchestrationData ? (
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
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    const sections = orchestrationData.split('7. Expected Result:');
                    const final = sections.length > 1 ? sections[1].split('8. Optimization Tips:')[0].trim() : orchestrationData;
                    navigator.clipboard.writeText(final);
                    onSuccess("Copied!");
                  }} 
                  className="text-[10px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest"
                >
                  Copy Result
                </button>
                {(isSitemap || isRobots) && (
                  <button 
                    onClick={() => {
                      const sections = orchestrationData.split('7. Expected Result:');
                      const final = sections.length > 1 ? sections[1].split('8. Optimization Tips:')[0].trim() : orchestrationData;
                      const blob = new Blob([final], { type: isSitemap ? 'application/xml' : 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = isSitemap ? 'sitemap.xml' : 'robots.txt';
                      a.click();
                      onSuccess("Download started!");
                    }} 
                    className="text-[10px] font-black text-indigo-500 hover:text-indigo-700 uppercase tracking-widest"
                  >
                    Download .{isSitemap ? 'xml' : 'txt'}
                  </button>
                )}
              </div>
            </div>
            <div className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group border border-slate-800">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/50"></div>
              {isScoreCalc && (
                 <div className="mb-8 flex justify-center">
                    <div className="relative w-32 h-32 md:w-40 md:h-40">
                       <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle className="text-slate-800 stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent" />
                          <circle className="text-emerald-500 stroke-current" strokeWidth="8" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * (parseInt(orchestrationData.match(/\d+/)?.[0] || "75") / 100))} />
                       </svg>
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-4xl md:text-5xl font-black text-white">{orchestrationData.match(/\d+/)?.[0] || "--"}</span>
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Score</span>
                       </div>
                    </div>
                 </div>
              )}
              <div className="text-emerald-400 font-mono text-sm leading-relaxed italic whitespace-pre-wrap">
                {orchestrationData.split('7. Expected Result:')[1]?.split('8. Optimization Tips:')[0]?.trim() || orchestrationData}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
            <div className="space-y-4">
                <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">8. Expert SEO Refinements</span>
                <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100 text-xs font-bold text-amber-900 leading-relaxed">
                  {orchestrationData.split('8. Optimization Tips:')[1]?.split('9. Next Action Suggestion:')[0]?.trim() || "Consider technical audit follow-up."}
                </div>
            </div>
            <div className="space-y-4">
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">9. Recommended Next Steps</span>
                <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100 text-xs font-black text-indigo-900 flex items-center gap-4">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm shadow-lg animate-bounce">➔</div>
                  {orchestrationData.split('9. Next Action Suggestion:')[1]?.trim() || "Analyze keyword density."}
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
      title={currentConfig.title}
      description={currentConfig.description}
      icon={currentConfig.icon}
      colorClass={currentConfig.colorClass}
      input={inputSlot}
      options={currentConfig.options && currentConfig.options.length > 0 ? <OptionsPanel options={currentConfig.options as any} values={options} onChange={handleOptionChange} /> : undefined}
      actions={
        <button 
          onClick={isOrchestrated ? handleRunAIOrchestrator : generateOutput} 
          disabled={loading}
          className={`w-full py-5 ${currentConfig.colorClass} text-white rounded-2xl font-black text-lg shadow-xl transition-all active:scale-95 disabled:opacity-50 hover:brightness-110`}
        >
          {loading ? "Engaging AI SEO Engine..." : isScoreCalc ? "Calculate SEO Score" : isCanonical ? "Check Canonical Implementation" : isRobots ? "Architect Robots.txt" : isSitemap ? "Architect XML Sitemap" : isHeadingChecker ? "Audit Heading Structure" : isSerpPreview ? "Preview & Analyze SERP" : isMetaGen ? "Generate Meta Tags" : isAIAnalyzer ? "Generate SEO Audit" : isDensityExpert ? "Run Density Analysis" : "Build Output"}
        </button>
      }
      result={resultSlot}
    />
  );
};

export default SEOTools;