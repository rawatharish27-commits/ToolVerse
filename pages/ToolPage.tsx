
import React, { useState, useEffect, useMemo } from 'react';
import { TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';
import ToolRenderer from '../components/ToolRenderer';
import SEOHead from '../components/SEOHead';
import ToolSEOContent from '../components/ToolSEOContent';
import RelatedTools from '../components/RelatedTools';
import AdSlot from '../components/AdSlot';
import PostTaskOrchestrator from '../components/PostTaskOrchestrator';
import UniversalSEOLayer from '../components/UniversalSEOLayer';
import { AD_CONFIG } from '../config/ads';
import { getHighCTRTitle, getBreadcrumbSchema, getAutoFaqSchema } from '../utils/seo';

interface ToolPageProps {
  slug: string;
  onNavigate: (page: string, params?: any) => void;
  favorites: string[];
  onToggleFavorite: (slug: string) => void;
}

const ToolPage: React.FC<ToolPageProps> = ({ slug, onNavigate, favorites, onToggleFavorite }) => {
  const tool = TOOLS.find(t => t.slug === slug);
  const category = CATEGORIES.find(c => c.id === tool?.category);

  const [success, setSuccess] = useState<string | null>(null);
  const [showPostTask, setShowPostTask] = useState(false);

  useEffect(() => {
    if (tool) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setShowPostTask(false);
    }
  }, [tool]);

  const seoData = useMemo(() => {
    if (!tool || !category) return null;
    return {
      title: getHighCTRTitle(tool),
      breadcrumb: getBreadcrumbSchema(category, tool),
      faq: getAutoFaqSchema(tool),
      url: `https://toolverse-4gr.pages.dev/tools/${tool.slug}`
    };
  }, [tool, category]);

  if (!tool || !category || !seoData) return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
       <div className="text-6xl">🔍</div>
       <p className="font-black text-slate-400 uppercase tracking-widest">Logic Node Not Found</p>
       <button onClick={() => onNavigate('home')} className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Back to Master Hub</button>
    </div>
  );

  const handleSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => {
      setSuccess(null);
      setShowPostTask(true);
    }, 2000);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-12">
      <SEOHead title={seoData.title} description={tool.description} url={seoData.url} type="article" schemas={[seoData.breadcrumb, seoData.faq]} />
      
      {/* LAYER 1: STATIC SEO (GOOGLE BOT) - 800+ Words Invisible Ghost Layer */}
      <UniversalSEOLayer tool={tool} category={category} />

      {/* LAYER 2: DYNAMIC UI (USER) */}
      {showPostTask && <PostTaskOrchestrator tool={tool} onNavigate={onNavigate} onClose={() => setShowPostTask(false)} />}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
         <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('home')} className="w-12 h-12 flex items-center justify-center bg-slate-100 hover:bg-slate-900 hover:text-white rounded-2xl transition-all shadow-sm group">
               <span className="font-black text-xl group-hover:-translate-x-1 transition-transform">←</span>
            </button>
            <nav className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
               <span onClick={() => onNavigate('home')} className="hover:text-indigo-600 cursor-pointer">HOME</span>
               <span className="opacity-20">/</span>
               <span onClick={() => onNavigate('category', { id: category.id })} className="hover:text-indigo-600 cursor-pointer">{category.name}</span>
               <span className="opacity-20">/</span>
               <span className="text-indigo-600 underline underline-offset-4 decoration-2">{tool.title}</span>
            </nav>
         </div>
         <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase border border-emerald-100">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block mr-2 animate-pulse"></span>
            NODE: OPERATIONAL
         </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-20">
        <div className="flex-grow w-full max-w-5xl">
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-12 tracking-tighter leading-[0.9]">
            {tool.title}
          </h1>

          {/* ADSENSE TOP SLOT */}
          <AdSlot id={AD_CONFIG.slots.header} className="mb-16" />

          <div className="bg-white rounded-[4rem] p-8 md:p-20 shadow-2xl border border-slate-100 min-h-[600px] relative overflow-hidden">
            <ToolRenderer slug={tool.slug} onSuccess={handleSuccess} onError={() => {}} />
          </div>

          {/* ADSENSE MID SLOT - POST RESULT TRIGGER */}
          <AdSlot id={AD_CONFIG.slots.mid_content} variant="result-based" className="my-24" />

          {/* AUTHORITY DOCUMENTATION (USER FACING) */}
          <ToolSEOContent tool={tool} />

          {/* ADSENSE FOOTER SLOT */}
          <AdSlot id={AD_CONFIG.slots.footer} className="my-24" />

          {/* SEMANTIC INTERNAL LINKING */}
          <RelatedTools currentSlug={tool.slug} category={tool.category} onNavigate={onNavigate} />
        </div>
        
        <aside className="w-full lg:w-96 flex-shrink-0">
           <div className="lg:sticky lg:top-32 space-y-10">
              <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
                 <div className="relative z-10 space-y-10">
                    <div className="space-y-4">
                      <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Hardware Status</div>
                      <div className="text-xl font-black text-white tracking-tight flex items-center gap-3">
                         <span className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"></span>
                         CLUSTER: ONLINE
                      </div>
                    </div>
                    <button onClick={() => onToggleFavorite(tool.slug)} className={`w-full py-6 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${favorites.includes(tool.slug) ? 'bg-white text-slate-900 shadow-xl' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}>
                      {favorites.includes(tool.slug) ? '★ IN VAULT' : '☆ ADD TO VAULT'}
                    </button>
                 </div>
              </div>
              
              {/* SIDEBAR AD SLOT */}
              <AdSlot id={AD_CONFIG.slots.sidebar} className="min-h-[600px]" />
           </div>
        </aside>
      </div>
      {success && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[200] bg-emerald-600 text-white px-12 py-6 rounded-full shadow-2xl font-black text-base animate-in slide-in-from-bottom-10">
          ✅ {success}
        </div>
      )}
    </div>
  );
};

export default ToolPage;
