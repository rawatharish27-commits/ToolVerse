
import React, { useState, useEffect, useMemo } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { TOOLS } from '../../data/tools';
import { 
  seoTitleCheckerConfig, seoMetaCheckerConfig, serpPreviewToolConfig,
  internalLinkGeneratorConfig, keywordDifficultyConfig, keywordDensityConfig,
  robotsTxtConfig, xmlSitemapConfig, faqSchemaConfig, breadcrumbSchemaConfig
} from '../../config/seoTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const SEOTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const toolNode = useMemo(() => TOOLS.find(t => t.slug === slug), [slug]);
  const activeConfig = useMemo(() => [
    seoTitleCheckerConfig, seoMetaCheckerConfig, serpPreviewToolConfig,
    internalLinkGeneratorConfig, keywordDifficultyConfig, keywordDensityConfig,
    robotsTxtConfig, xmlSitemapConfig, faqSchemaConfig, breadcrumbSchemaConfig
  ].find(c => c.slug === slug) || seoTitleCheckerConfig, [slug]);

  const [options, setOptions] = useState<Record<string, any>>({});

  useEffect(() => {
    const initial: Record<string, any> = {};
    if (activeConfig.options) {
      activeConfig.options.forEach((opt: any) => initial[opt.id] = opt.default);
    }
    setOptions(initial);
    setInput("");
    setResult(null);
  }, [slug, activeConfig]);

  const handleRun = async () => {
    if (!toolNode?.execute) { onError("SEO Logic Core missing."); return; }
    if (!input.trim() && !['robots-txt-generator'].includes(slug)) {
      onError("Please provide target URLs or keywords.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const output = await toolNode.execute(input || options);
      setResult(output);
      onSuccess("SEO Parameters Processed!");
    } catch (err: any) {
      onError("Engine error: Check connectivity.");
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
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Data Workspace</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={slug === 'xml-sitemap-generator' ? "Enter full URLs (one per line)..." : "Paste your keywords or page content here..."}
            className="w-full h-44 p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] focus:ring-8 focus:ring-indigo-500/5 outline-none font-mono text-xs font-bold text-slate-700 shadow-inner resize-none transition-all"
          />
        </div>
      }
      options={activeConfig.options?.length > 0 ? <OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} /> : undefined}
      actions={<button onClick={handleRun} disabled={loading} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95`}>{loading ? "Synchronizing Crawl Data..." : "Generate SEO Architecture"}</button>}
      result={result && (
        <div className="animate-in zoom-in-95">
           <div className="relative group">
              <div className="absolute top-4 right-6 text-[8px] font-black text-slate-500 uppercase tracking-widest z-10">Output Buffer</div>
              <textarea 
                readOnly 
                value={typeof result === 'string' ? result : JSON.stringify(result, null, 2)} 
                className="w-full min-h-[300px] p-10 bg-slate-950 text-cyan-400 font-mono text-xs rounded-[3rem] border-none outline-none resize-none shadow-2xl" 
              />
              <button 
                onClick={() => { navigator.clipboard.writeText(typeof result === 'string' ? result : JSON.stringify(result)); onSuccess("Copied!"); }}
                className="absolute bottom-8 right-10 px-8 py-3 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
              >
                Copy Buffer
              </button>
           </div>
        </div>
      )}
    />
  );
};

export default SEOTools;
