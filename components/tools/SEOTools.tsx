
import React, { useState, useEffect, useMemo } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { TOOLS } from '../../data/tools';
import { getToolConfig } from '../../utils/configRegistry';

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
  const activeConfig = useMemo(() => getToolConfig(slug), [slug]);
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
    if (!toolNode?.execute && slug !== 'serp-snippet-preview-tool') return onError("SEO Node Missing.");
    
    setLoading(true);
    try {
      if (slug === 'serp-snippet-preview-tool') {
        setResult({ title: input, desc: options.description, url: options.url });
      } else if (toolNode?.execute) {
        const output = await toolNode.execute(input, options);
        setResult(output);
      }
      onSuccess("Parameters Analyzed!");
    } catch (err: any) {
      onError("SEO Engine Fault.");
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
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Analysis Workspace</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={slug.includes('title') ? "Enter your Page Title..." : "Enter Keywords or Target Content..."}
            className="w-full h-44 p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] focus:ring-8 focus:ring-indigo-500/5 outline-none font-bold text-slate-700 shadow-inner resize-none transition-all"
          />
        </div>
      }
      options={activeConfig.options?.length > 0 ? <OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} /> : undefined}
      actions={<button onClick={handleRun} disabled={loading} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95`}>{loading ? "Crawling Data..." : "Execute Analysis"}</button>}
      result={result && (
        <div className="animate-in zoom-in-95">
           {slug === 'serp-snippet-preview-tool' ? (
             <div className="max-w-2xl bg-white p-8 rounded-3xl border border-slate-100 shadow-xl font-sans">
                <div className="text-[14px] text-[#202124] mb-1 truncate">{result.url || 'https://example.com'}</div>
                <div className="text-[20px] text-[#1a0dab] hover:underline cursor-pointer leading-tight mb-1 truncate">{result.title || 'Your Page Title Preview'}</div>
                <div className="text-[14px] text-[#4d5156] line-clamp-2">{result.desc || 'Provide a meta description on the right to see how it looks in real Google search results.'}</div>
             </div>
           ) : Array.isArray(result) ? (
             <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {result.map(([k, v]: any) => (
                  <div key={k} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase">{k}</span>
                    <span className="text-lg font-black text-indigo-600">{v}</span>
                  </div>
                ))}
             </div>
           ) : (
             <div className="relative group">
                <div className="absolute top-4 right-6 text-[8px] font-black text-slate-500 uppercase tracking-widest z-10">Logic Buffer</div>
                <textarea readOnly value={typeof result === 'string' ? result : JSON.stringify(result, null, 2)} className="w-full min-h-[300px] p-10 bg-slate-950 text-cyan-400 font-mono text-xs rounded-[3rem] border-none outline-none resize-none shadow-2xl" />
                <button onClick={() => { navigator.clipboard.writeText(typeof result === 'string' ? result : JSON.stringify(result)); onSuccess("Copied!"); }} className="absolute bottom-8 right-10 px-8 py-3 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl">Copy Output</button>
             </div>
           )}
        </div>
      )}
    />
  );
};

export default SEOTools;
