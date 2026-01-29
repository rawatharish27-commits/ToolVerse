
import React, { useState, useEffect, Suspense, lazy, useMemo } from 'react';
import { MASTER_REGISTRY } from '../data/tools';
import SEOHead from '../components/SEOHead';
import AdSenseManager from '../components/AdSenseManager';

interface Props {
  slug: string;
  onNavigate: (page: string, params?: any) => void;
}

const ToolPage: React.FC<Props> = ({ slug, onNavigate }) => {
  const tool = MASTER_REGISTRY.find(t => t.slug === slug);
  const [metadata, setMetadata] = useState<any>(null);
  const [ToolComponent, setToolComponent] = useState<any>(null);

  useEffect(() => {
    if (tool) {
      // 1. Fetch mandatory tool metadata
      import(`../tools/${tool.slug}/metadata.json`).catch(() => ({ default: {} })).then(m => setMetadata(m.default));
      // 2. Lazy load the tool logic isolate
      setToolComponent(lazy(() => import(`../tools/${tool.slug}/index`).catch(() => ({ default: () => <div className="p-20 text-center font-black opacity-20">NODE OFFLINE</div> }))));
    }
  }, [slug, tool]);

  if (!tool) return <div className="p-40 text-center font-black">NODE NOT FOUND IN REGISTRY</div>;

  const toolUrl = `https://toolverse-4gr.pages.dev/tools/${tool.slug}`;

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title={metadata?.problemStatement || tool.title} 
        description={`${tool.description} - Resolving common digital barriers with stateless browser-native logic.`} 
        url={toolUrl} 
      />
      
      <div className="max-w-[1600px] mx-auto px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-16">
          
          <main className="lg:flex-grow">
            {/* EXECUTION LAYER: Result ALWAYS comes first for AdSense policy */}
            <div className="bg-white rounded-[4rem] p-10 md:p-20 shadow-3xl border border-slate-100 mb-12 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600 opacity-20 group-hover:opacity-100 transition-opacity duration-700"></div>
               <div className="mb-12">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl">🛠️</span>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">{tool.title}</h1>
                  </div>
                  <p className="text-xl text-slate-500 font-medium italic max-w-3xl">" {tool.description} "</p>
               </div>

               <Suspense fallback={<div className="h-96 flex flex-col items-center justify-center gap-6"><div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div><p className="font-black text-[10px] text-slate-300 uppercase tracking-[0.4em]">Synchronizing Isolate...</p></div>}>
                  {ToolComponent && <ToolComponent />}
               </Suspense>
            </div>

            {/* AD PLACEMENT: Below fold / Result-First enforcement */}
            <AdSenseManager slotId="MID_TOOL_PAGE" type="mid" />

            {/* CONTENT LAYER: Mandatory 150+ Words for SEO Authority */}
            <div className="space-y-20 mt-32 border-t border-slate-100 pt-20">
               <section className="max-w-4xl">
                  <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Technical Root Analysis</h2>
                  <div className="prose prose-slate prose-lg text-slate-600 font-medium leading-relaxed">
                     <p>{metadata?.problemStatement || "This tool provides a deterministic diagnostic audit of your digital assets."}</p>
                     <p>Most digital rejections in government and corporate portals occur due to strict binary header validation. Unlike humans, automated bots check 'Magic Numbers' inside your files rather than just the extension. This node executes a byte-stream audit within your browser's private memory isolate to identify these hidden mismatches without risking your data privacy.</p>
                  </div>
               </section>

               <section className="bg-rose-50 p-10 md:p-16 rounded-[3.5rem] border border-rose-100">
                  <h3 className="text-xl font-black text-rose-900 uppercase tracking-widest mb-8 flex items-center gap-4">
                     <span>⚠️</span> Common User Pitfalls
                  </h3>
                  <ul className="space-y-4">
                     {(metadata?.whatUsersUsuallyDoWrong || ["Rename file extensions manually", "Ignore DPI requirements", "Use outdated browser versions"]).map((m: string, i: number) => (
                       <li key={i} className="flex items-start gap-4 text-rose-800 font-bold italic">
                          <span className="text-rose-400">•</span> {m}
                       </li>
                     ))}
                  </ul>
               </section>

               <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100">
                     <h4 className="text-sm font-black text-indigo-600 uppercase tracking-widest mb-4">Standard Operating Procedure</h4>
                     <ol className="text-sm text-slate-500 space-y-3 font-medium list-decimal pl-5">
                        <li>Stage the problematic raw asset in the buffer.</li>
                        <li>Calibrate logic parameters on the right panel.</li>
                        <li>Execute neural/algorithmic trace.</li>
                        <li>Audit the high-fidelity results.</li>
                     </ol>
                  </div>
                  <div className="p-10 bg-slate-900 rounded-[3rem] text-white">
                     <h4 className="text-sm font-black text-indigo-400 uppercase tracking-widest mb-4">Phase U: Limitations</h4>
                     <p className="text-xs text-slate-400 leading-relaxed font-medium">
                        Result accuracy depends on the fidelity of the provided input. 100% Privacy is guaranteed via zero-upload architecture. Execution timeout is capped at 30 seconds per isolate.
                     </p>
                  </div>
               </section>
            </div>
          </main>

          <aside className="lg:w-80 flex-shrink-0">
             <div className="sticky top-32 space-y-10">
                <AdSenseManager slotId="SIDEBAR_TOOL_PAGE" type="sidebar" />
                <div className="bg-slate-950 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                   <div className="absolute -bottom-4 -right-4 text-8xl opacity-5 group-hover:rotate-12 transition-transform duration-700">🚀</div>
                   <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4 relative z-10">Node Intelligence</h4>
                   <div className="space-y-3 relative z-10">
                      {metadata?.relatedTools?.map((s: string) => (
                        <button key={s} onClick={() => onNavigate('tool', { slug: s })} className="block w-full text-left text-[11px] font-bold text-slate-400 hover:text-white transition-colors truncate">
                          → {s.replace(/-/g, ' ')}
                        </button>
                      )) || <p className="text-[10px] text-slate-500">Related nodes are being synchronized...</p>}
                   </div>
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ToolPage;
