
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { MASTER_REGISTRY } from '../data/tools';
import SEOManager from '../components/SEOManager';
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
      import(`../tools/${tool.slug}/metadata.json`).then(m => setMetadata(m.default));
      // 2. Lazy load the tool logic isolate
      setToolComponent(lazy(() => import(`../tools/${tool.slug}/index`)));
    }
  }, [slug]);

  if (!tool || !metadata) return <div className="p-40 text-center font-black animate-pulse">Initializing Logic Hub...</div>;

  return (
    <div className="min-h-screen bg-white">
      <SEOManager tool={tool} metadata={metadata} />
      
      <div className="max-w-[1600px] mx-auto px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-16">
          
          <main className="lg:flex-grow">
            {/* Tool Execution Isolate */}
            <div className="bg-white rounded-[4rem] p-10 md:p-20 shadow-3xl border border-slate-100 mb-12">
               <Suspense fallback={<div className="h-96 flex items-center justify-center font-black text-slate-300 uppercase tracking-widest">Mounting WASM Core...</div>}>
                  {ToolComponent && <ToolComponent />}
               </Suspense>
            </div>

            {/* MANDATORY CONTENT BLOCK (AdSense Safe) */}
            <div className="space-y-20 mt-32 border-t border-slate-100 pt-20">
               <section className="max-w-4xl">
                  <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Understanding the Barrier</h2>
                  <div className="prose prose-slate prose-lg text-slate-600 font-medium leading-relaxed">
                     <p>{metadata.problemStatement}</p>
                     <p>This utility provides a stateless diagnostic audit of your input data. Unlike cloud-based tools that store your sensitive information, our engine executes logic entirely within your browser's private memory isolate.</p>
                  </div>
               </section>

               <section className="bg-rose-50 p-10 md:p-16 rounded-[3.5rem] border border-rose-100">
                  <h3 className="text-xl font-black text-rose-900 uppercase tracking-widest mb-8 flex items-center gap-4">
                     <span>⚠️</span> Common User Mistakes
                  </h3>
                  <ul className="space-y-4">
                     {metadata.whatUsersUsuallyDoWrong.map((m: string, i: number) => (
                       <li key={i} className="flex items-start gap-4 text-rose-800 font-bold italic">
                          <span className="text-rose-400">•</span> {m}
                       </li>
                     ))}
                  </ul>
               </section>

               <section>
                  <h3 className="text-2xl font-black text-slate-900 mb-10">Verification Protocol (Phase U)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest block mb-4">Accuracy Limit</span>
                        <p className="text-sm text-slate-500 font-medium">Result is derived from browser-standard heuristic matching. Real portal behavior may vary based on server-side updates.</p>
                     </div>
                     <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest block mb-4">Data Residency</span>
                        <p className="text-sm text-slate-500 font-medium">100% Private. No transmission to external networks detected during logic execution.</p>
                     </div>
                  </div>
               </section>

               {/* Result before Ads enforcement */}
               <AdSenseManager slotId="MID_TOOL_PAGE" type="mid" />
            </div>
          </main>

          <aside className="lg:w-80 flex-shrink-0">
             <div className="sticky top-32 space-y-10">
                <AdSenseManager slotId="SIDEBAR_TOOL_PAGE" type="sidebar" />
                <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
                   <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Related Intelligence</h4>
                   <div className="space-y-3">
                      {metadata.relatedTools.map((s: string) => (
                        <button key={s} onClick={() => onNavigate('tool', { slug: s })} className="block w-full text-left text-[11px] font-bold text-slate-400 hover:text-indigo-400 transition-colors truncate">
                          → {s.replace(/-/g, ' ')}
                        </button>
                      ))}
                   </div>
                </div>
             </div>
          </aside>

        </div>
      </div>

      <footer className="bg-slate-50 py-12 border-t border-slate-100">
         <AdSenseManager slotId="FOOTER_TOOL_PAGE" type="bottom" />
      </footer>
    </div>
  );
};

export default ToolPage;
