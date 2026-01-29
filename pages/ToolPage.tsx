
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { TOOLS } from '../data/tools';
import SEOManager from '../components/SEOManager';

interface Props {
  slug: string;
  onNavigate: (page: string, params?: any) => void;
}

const ToolPage: React.FC<Props> = ({ slug, onNavigate }) => {
  const tool = TOOLS.find(t => t.slug === slug);
  const [metadata, setMetadata] = useState<any>(null);
  const [ToolComponent, setToolComponent] = useState<any>(null);

  useEffect(() => {
    if (tool) {
      // 1. Load standard metadata for SEO
      import(`../tools/${tool.slug}/metadata.json`).then(m => setMetadata(m.default));
      // 2. Load the tool entry UI
      setToolComponent(lazy(() => import(`../tools/${tool.slug}/index`)));
    }
  }, [slug]);

  if (!tool) return <div className="p-40 text-center font-black">NODE_NOT_RESOLVED</div>;

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-20">
      <SEOManager tool={tool} metadata={metadata} />
      
      <div className="flex flex-col lg:flex-row gap-16">
        <main className="flex-grow space-y-12">
           <header className="space-y-4">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
                Logic Node v4.2.1
              </div>
              <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">{tool.title}</h1>
              <p className="text-xl text-slate-500 font-medium max-w-2xl">" {tool.description} "</p>
           </header>

           <section className="bg-white rounded-[4rem] p-10 md:p-20 shadow-3xl border border-slate-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none">
                <div className="text-[12rem] font-black italic">ISOLATE</div>
             </div>
             
             <Suspense fallback={<div className="h-96 flex flex-col items-center justify-center gap-6"><div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div><p className="font-black uppercase text-[10px] text-slate-300 tracking-[0.4em]">Initializing WASM Core...</p></div>}>
               {ToolComponent && <ToolComponent />}
             </Suspense>
           </section>

           {/* Problem Explanation & SEO Authority Content */}
           {metadata && (
             <article className="prose prose-slate max-w-none border-t border-slate-100 pt-20">
               <h2 className="text-4xl font-black text-slate-900 tracking-tight">Understanding the Barrier</h2>
               <p className="text-lg text-slate-600 font-medium leading-relaxed">{metadata.problemStatement}</p>
               
               <h3 className="text-2xl font-black mt-12 mb-6">Technical Standard Compliance</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {metadata.features.map((f: string, i: number) => (
                   <div key={i} className="p-6 bg-slate-50 rounded-3xl flex items-center gap-4 group hover:bg-indigo-50 transition-colors">
                      <span className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
                      <span className="font-bold text-slate-700">{f}</span>
                   </div>
                 ))}
               </div>
             </article>
           )}
        </main>

        <aside className="lg:w-80 flex-shrink-0 space-y-12">
           <div className="sticky top-32 space-y-12">
              <div className="bg-slate-900 rounded-[3rem] p-8 text-white relative overflow-hidden group">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-6">Related Logic</h4>
                <div className="space-y-4 relative z-10">
                   {metadata?.relatedTools.map((s: string) => (
                     <button key={s} onClick={() => onNavigate('tool', { slug: s })} className="block w-full text-left text-xs font-bold text-slate-400 hover:text-white transition-colors truncate">
                       → {s.replace(/-/g, ' ')}
                     </button>
                   ))}
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000">⚙️</div>
              </div>

              <div className="p-8 bg-indigo-600 rounded-[3rem] text-white">
                 <h4 className="text-sm font-black mb-2">Zero-Upload Privacy</h4>
                 <p className="text-xs text-indigo-100 leading-relaxed font-medium">All processing occurs locally in your browser memory. We never see your data.</p>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default ToolPage;
