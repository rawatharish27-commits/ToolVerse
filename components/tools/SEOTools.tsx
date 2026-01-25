
import React, { useState, useEffect, useMemo } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { getToolConfig } from '../../utils/configRegistry';
import { 
  generateXmlSitemap, 
  generateBreadcrumbSchema, 
  calculateKeywordDifficulty, 
  suggestInternalLinks 
} from '../../tools/executors/seoCluster';

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
      let output: any = null;

      switch (slug) {
        case 'seo-title-length-checker':
        case 'meta-description-length-checker':
          const len = input.length;
          const limit = slug.includes('title') ? 60 : 160;
          const status = len === 0 ? 'empty' : len > limit ? 'too-long' : len < (limit / 2) ? 'too-short' : 'perfect';
          output = { length: len, limit, status };
          break;

        case 'keyword-density-checker':
          const words = input.toLowerCase().match(/\w+/g) || [];
          const filtered = options.ignoreCommon ? words.filter(w => !SEO_COMMON_STOPWORDS.includes(w)) : words;
          const freq: Record<string, number> = {};
          filtered.forEach(w => freq[w] = (freq[w] || 0) + 1);
          const sorted = Object.entries(freq)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([word, count]) => ({ word, count, density: ((count / words.length) * 100).toFixed(2) + '%' }));
          output = { stats: sorted, total: words.length };
          break;

        case 'robots-txt-generator':
          output = `User-agent: ${options.allowAll ? '*' : 'Googlebot'}\nDisallow: /admin/\nDisallow: /config/\nSitemap: ${options.sitemapUrl || 'https://yoursite.com/sitemap.xml'}`;
          break;

        case 'xml-sitemap-generator':
          const urls = input.split('\n');
          output = generateXmlSitemap(urls, options.priority, options.changefreq);
          break;

        case 'faq-schema-generator':
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
          output = JSON.stringify(schema, null, 2);
          break;

        case 'breadcrumb-schema-generator':
          output = generateBreadcrumbSchema(input);
          break;

        case 'keyword-difficulty-checker':
          output = calculateKeywordDifficulty(input);
          break;

        case 'internal-link-generator':
          output = suggestInternalLinks(input, secondaryInput);
          break;

        case 'serp-snippet-preview-tool':
          output = { title: input, desc: options.description || secondaryInput, url: options.url || "https://example.com/page" };
          break;

        default:
          output = "Logic Node Active. Result synced.";
      }

      setResult(output);
      onSuccess("Task Execution Complete!");
    } catch (err: any) {
      console.error(err);
      onError("Engine synchronization error.");
    } finally {
      setLoading(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;

    if (slug.includes('length-checker')) {
      const perc = Math.min(100, (result.length / result.limit) * 100);
      return (
        <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-200">
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Character Count</span>
              <div className="text-6xl font-black text-slate-900">{result.length}</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Safe Limit</span>
              <div className="text-xl font-bold text-slate-700">{result.limit}</div>
            </div>
          </div>
          <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className={`h-full transition-all duration-500 ${result.status === 'perfect' ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${perc}%` }} />
          </div>
        </div>
      );
    }

    if (slug === 'serp-snippet-preview-tool') {
      return (
        <div className="space-y-6">
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Live Google Desktop Simulation</div>
           <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 max-w-2xl font-sans">
              <div className="text-[#1a0dab] text-xl hover:underline cursor-pointer font-medium mb-1 line-clamp-1">{result.title || 'Page Title'}</div>
              <div className="text-[#006621] text-sm mb-1 truncate">{result.url}</div>
              <div className="text-[#4d5156] text-sm leading-relaxed line-clamp-2">{result.desc || 'Provide a meta description to see the snippet preview updated here...'}</div>
           </div>
        </div>
      );
    }

    const isCode = typeof result === 'string' && (result.includes('<?xml') || result.includes('{') || result.includes('User-agent'));

    return (
      <div className="space-y-6 animate-in zoom-in-95">
         <div className="relative group">
            <div className="absolute top-4 right-6 text-[8px] font-black text-slate-500 uppercase tracking-widest z-10">Output Buffer</div>
            <textarea 
              readOnly 
              value={typeof result === 'string' ? result : JSON.stringify(result, null, 2)} 
              className={`w-full min-h-[300px] p-10 bg-slate-950 ${isCode ? 'text-cyan-400 font-mono text-xs' : 'text-emerald-400 font-sans font-bold'} rounded-[3rem] border-none outline-none resize-none shadow-2xl`} 
            />
            <button 
              onClick={() => { navigator.clipboard.writeText(typeof result === 'string' ? result : JSON.stringify(result)); onSuccess("Copied!"); }}
              className="absolute bottom-8 right-10 px-8 py-3 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
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
                slug === 'xml-sitemap-generator' ? "Enter URLs (one per line)..." :
                slug === 'breadcrumb-schema-generator' ? "e.g. Home > Products > Gadgets" :
                "Enter content or target keywords here..."
              }
              className="w-full h-44 p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] outline-none font-sans text-xl font-bold text-slate-700 shadow-inner resize-none focus:ring-8 focus:ring-indigo-500/5 transition-all"
            />
          </div>
          {(slug === 'internal-link-generator' || slug === 'serp-snippet-preview-tool') && (
            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Secondary Context</label>
               <input 
                type="text" 
                value={secondaryInput}
                onChange={e => setSecondaryInput(e.target.value)}
                placeholder={slug.includes('serp') ? "Target URL (https://...)" : "Additional parameters..."}
                className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-600"
               />
            </div>
          )}
        </div>
      }
      options={activeConfig.options?.length > 0 ? <OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} /> : undefined}
      actions={<button onClick={handleRun} disabled={loading} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95`}>{loading ? "Synchronizing..." : `Run ${activeConfig.title}`}</button>}
      result={renderResult()}
    />
  );
};

export default SEOTools;
