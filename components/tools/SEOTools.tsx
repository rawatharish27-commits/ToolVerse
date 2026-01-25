import React, { useState, useEffect, useMemo } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { getToolConfig } from '../../utils/configRegistry';
import { GoogleGenAI } from "@google/genai";

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const SEO_COMMON_STOPWORDS = ["the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "with", "is", "are", "was", "were", "it", "they"];

const SEOTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [input, setInput] = useState("");
  const [secondaryInput, setSecondaryInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [options, setOptions] = useState<Record<string, any>>({});

  const activeConfig = useMemo(() => getToolConfig(slug), [slug]);

  useEffect(() => {
    const initial: Record<string, any> = {};
    if (activeConfig.options) {
      activeConfig.options.forEach((opt: any) => initial[opt.id] = opt.default);
    }
    setOptions(initial);
    setInput("");
    setSecondaryInput("");
    setResult(null);
  }, [slug, activeConfig]);

  const handleRun = async () => {
    if (!input.trim() && !['xml-sitemap-generator', 'robots-txt-generator'].includes(slug)) {
      onError("Please provide content to analyze.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // 1. Handle Local Logic Tools
      if (slug === 'seo-title-length-checker' || slug === 'meta-description-length-checker') {
        const len = input.length;
        const limit = slug.includes('title') ? 60 : 160;
        const status = len === 0 ? 'empty' : len > limit ? 'too-long' : len < (limit / 2) ? 'too-short' : 'perfect';
        setResult({ length: len, limit, status });
        onSuccess("Check Complete!");
      } 
      
      else if (slug === 'keyword-density-checker') {
        const words = input.toLowerCase().match(/\w+/g) || [];
        const filtered = options.ignoreCommon ? words.filter(w => !SEO_COMMON_STOPWORDS.includes(w)) : words;
        const freq: Record<string, number> = {};
        filtered.forEach(w => freq[w] = (freq[w] || 0) + 1);
        const sorted = Object.entries(freq)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([word, count]) => ({ word, count, density: ((count / words.length) * 100).toFixed(2) + '%' }));
        setResult({ stats: sorted, total: words.length });
        onSuccess("Density Analyzed!");
      }

      else if (slug === 'robots-txt-generator') {
        const content = `User-agent: ${options.allowAll ? '*' : 'Googlebot'}\nDisallow: /admin/\nDisallow: /config/\nSitemap: ${options.sitemapUrl || 'https://yoursite.com/sitemap.xml'}`;
        setResult(content);
        onSuccess("Robots.txt Generated!");
      }

      else if (slug === 'faq-schema-generator') {
        // Simple heuristic: split lines into Q&A if possible, or just template
        const questions = input.split('\n').filter(l => l.includes('?'));
        const schema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": questions.map(q => ({
            "@type": "Question",
            "name": q.trim(),
            "acceptedAnswer": { "@type": "Answer", "text": "Generated answer placeholder. Update this content." }
          }))
        };
        setResult(JSON.stringify(schema, null, 2));
        onSuccess("Schema Ready!");
      }

      // 2. Handle AI Orchestration for Complex Tools
      else {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Tool: ${slug}. Input: "${input}". Options: ${JSON.stringify(options)}. Secondary: "${secondaryInput}". Generate a professional SEO report or code snippet.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          config: {
            systemInstruction: "You are an Elite SEO Strategist. Return strictly the result in Markdown or Code block. No conversational filler.",
            temperature: 0.7,
          }
        });

        setResult(response.text || "No result generated.");
        onSuccess("SEO Strategy Orchestrated!");
      }
    } catch (err: any) {
      console.error(err);
      onError("SEO Engine is currently busy.");
    } finally {
      setLoading(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;

    if (slug.includes('length-checker')) {
      const perc = Math.min(100, (result.length / result.limit) * 100);
      return (
        <div className="space-y-8 animate-in fade-in slide-in-from-top-4">
           <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-200">
              <div className="flex justify-between items-end mb-4">
                 <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Character Count</span>
                    <div className="text-6xl font-black text-slate-900">{result.length}</div>
                 </div>
                 <div className="text-right">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Range</span>
                    <div className="text-xl font-bold text-slate-700">0 - {result.limit}</div>
                 </div>
              </div>
              <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden">
                 <div 
                   className={`h-full transition-all duration-500 ${result.status === 'perfect' ? 'bg-emerald-500' : result.status === 'too-long' ? 'bg-rose-500' : 'bg-amber-500'}`} 
                   style={{ width: `${perc}%` }}
                 />
              </div>
              <div className={`mt-6 inline-flex px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
                result.status === 'perfect' ? 'bg-emerald-100 text-emerald-700' : 
                result.status === 'too-long' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
              }`}>
                Status: {result.status.replace('-', ' ')}
              </div>
           </div>
        </div>
      );
    }

    if (slug === 'keyword-density-checker') {
      return (
        <div className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {result.stats.map((s: any, i: number) => (
               <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
                  <div>
                    <span className="text-sm font-bold text-slate-700">{s.word}</span>
                    <span className="ml-3 text-[10px] font-black text-slate-300 uppercase">x{s.count}</span>
                  </div>
                  <div className="text-indigo-600 font-black text-xs">{s.density}</div>
               </div>
             ))}
           </div>
        </div>
      );
    }

    const isCode = typeof result === 'string' && (result.includes('{') || result.includes('User-agent'));

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-top-4">
         <div className="relative group">
            <div className="absolute top-4 right-6 text-[8px] font-black text-slate-500 uppercase tracking-widest z-10">Output Buffer</div>
            <textarea 
              readOnly 
              value={typeof result === 'string' ? result : JSON.stringify(result, null, 2)} 
              className={`w-full min-h-[300px] p-10 bg-slate-950 ${isCode ? 'text-cyan-400 font-mono' : 'text-slate-200 font-sans'} text-sm border-none outline-none resize-none rounded-[3rem] shadow-2xl`} 
            />
            <button 
              onClick={() => { navigator.clipboard.writeText(typeof result === 'string' ? result : JSON.stringify(result)); onSuccess("Copied!"); }}
              className="absolute bottom-6 right-8 px-6 py-2 bg-white/10 text-white text-[9px] font-black rounded-xl hover:bg-white hover:text-slate-900 uppercase transition-all"
            >
              Copy Result
            </button>
         </div>
      </div>
    );
  };

  return (
    <ToolLayout
      title={activeConfig.title}
      description={activeConfig.description}
      icon={activeConfig.icon}
      colorClass={activeConfig.colorClass}
      input={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Data Workspace</label>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={
                slug.includes('title') ? "Paste your SEO Title here..." :
                slug.includes('meta') ? "Paste your Meta Description here..." :
                slug.includes('robots') ? "The generator uses your options below..." :
                "Enter content or list of items for SEO processing..."
              }
              className="w-full h-40 p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] outline-none font-sans text-xl font-bold text-slate-700 shadow-inner resize-none focus:ring-8 focus:ring-blue-500/5 transition-all"
            />
          </div>
          {slug === 'serp-snippet-preview-tool' && (
            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Target URL</label>
               <input 
                type="text" 
                value={secondaryInput}
                onChange={e => setSecondaryInput(e.target.value)}
                placeholder="https://yoursite.com/page-url"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-600"
               />
            </div>
          )}
        </div>
      }
      options={activeConfig.options?.length > 0 ? (
        <OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, val) => setOptions(p => ({ ...p, [id]: val }))} />
      ) : undefined}
      actions={
        <button 
          onClick={handleRun} 
          disabled={loading}
          className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl hover:brightness-110 active:scale-95 disabled:opacity-50`}
        >
          {loading ? "Running Intelligence Core..." : `Execute ${activeConfig.title}`}
        </button>
      }
      result={renderResult()}
      comparison={slug === 'serp-snippet-preview-tool' && input && (
        <div className="space-y-6">
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Live Google SERP Simulation</div>
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-2xl">
              <div className="flex items-center gap-2 mb-1">
                 <span className="text-xs text-slate-700 font-medium truncate">{secondaryInput || 'https://example.com'}</span>
                 <span className="text-[8px] text-slate-400">▼</span>
              </div>
              <div className="text-xl text-[#1a0dab] hover:underline cursor-pointer font-medium mb-1 line-clamp-1">
                 {input || 'Your Page Title Goes Here'}
              </div>
              <div className="text-sm text-[#4d5156] leading-relaxed line-clamp-2">
                 {options.description || 'Provide a meta description in the workspace above to see it appear in this preview snippet simulation.'}
              </div>
           </div>
        </div>
      )}
    />
  );
};

export default SEOTools;