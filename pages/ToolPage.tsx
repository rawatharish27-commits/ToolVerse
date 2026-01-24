import React, { useState, useEffect } from 'react';
import { TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';
import ToolRenderer from '../components/ToolRenderer';
import SEOHead from '../components/SEOHead';
import ToolSEOContent from '../components/ToolSEOContent';
import RelatedTools from '../components/RelatedTools';
import AdSlot from '../components/AdSlot';
import { isAdSlotEnabled } from '../utils/adPolicy';
import { trackEvent } from '../utils/analytics';
import { AD_CONFIG } from '../config/ads';

interface ToolPageProps {
  slug: string;
  onNavigate: (page: string, params?: any) => void;
  onToolUsed?: (slug: string) => void;
  favorites: string[];
  onToggleFavorite: (slug: string) => void;
}

const ToolPage: React.FC<ToolPageProps> = ({ slug, onNavigate, onToolUsed, favorites, onToggleFavorite }) => {
  const tool = TOOLS.find(t => t.slug === slug);
  const category = CATEGORIES.find(c => c.id === tool?.category);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (tool) {
      trackEvent('tool_view', tool.slug);
      window.scrollTo(0, 0);
    }
  }, [tool]);

  if (!tool) return <div className="p-20 text-center font-bold text-slate-400 text-2xl">Tool not found.</div>;

  const handleSuccess = (msg: string) => {
    setSuccess(msg);
    onToolUsed?.(tool.slug);
    trackEvent('tool_executed', tool.slug);
    setTimeout(() => setSuccess(null), 3000);
  };

  const adSlots = tool.category ? {
    header: isAdSlotEnabled(tool.category, 'header'),
    mid: isAdSlotEnabled(tool.category, 'mid_content'),
    sidebar: isAdSlotEnabled(tool.category, 'sidebar'),
    footer: isAdSlotEnabled(tool.category, 'footer')
  } : { header: true, mid: false, sidebar: false, footer: true };

  const routeKey = window.location.pathname || slug;

  // 🧠 CTR-BOOSTING TITLE FORMULAS
  const metaTitle = `Free ${tool.title} Online (${currentYear}) - No Signup Required`;
  const metaDesc = `Use our professional ${tool.title} tool for free. Secure, fast, and browser-native processing. ${tool.description}`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-20 sm:px-6 lg:px-8">
      <SEOHead 
        title={metaTitle}
        description={metaDesc}
        url={`https://toolverse-4gr.pages.dev/tools/${tool.slug}`}
        type="article"
      />

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-grow w-full">
          
          {/* 🔹 H1 & INTRO (BLUEPRINT SECTION) */}
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-none">
              {tool.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-4xl">
              {tool.description}. Use this professional tool to process your data instantly in the browser. 100% free and secure.
            </p>
          </div>

          {/* 🔥 AD SLOT #1 (TOP – RESPONSIVE) */}
          {adSlots.header && <AdSlot key={`${routeKey}-header`} id={AD_CONFIG.slots.header} className="mb-12" />}

          {/* 🔹 TOOL UI WORKSPACE */}
          <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-16 shadow-[0_50px_100px_-20px_rgba(79,70,229,0.08)] border border-slate-100 min-h-[500px]">
            <ToolRenderer slug={tool.slug} onSuccess={handleSuccess} onError={setError} />
          </div>

          {/* 🔥 AD SLOT #2 (RESULT NICHE / HIGHEST RPM) */}
          {adSlots.mid && <AdSlot key={`${routeKey}-mid`} id={AD_CONFIG.slots.mid_content} variant="result-based" className="my-16" />}

          {/* 🔹 EDITORIAL SEO CONTENT (H2s + FAQs) */}
          <ToolSEOContent tool={tool} />
          
          {/* 🔥 AD SLOT #3 (FOOTER / NATIVE) */}
          {adSlots.footer && <AdSlot key={`${routeKey}-footer`} id={AD_CONFIG.slots.footer} className="my-16" />}

          {/* 🔹 RELATED TOOLS (INTERNAL LINKING) */}
          <RelatedTools currentSlug={tool.slug} category={tool.category} onNavigate={onNavigate} />
        </div>

        {/* 🔹 SIDEBAR (DESKTOP ONLY) */}
        <aside className="w-full lg:w-80 flex-shrink-0 space-y-8">
          <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200 lg:sticky lg:top-24">
             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-2">System Status</div>
             <div className="flex items-center space-x-3 mb-8 px-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">WASM-Engine Active</span>
             </div>
             
             <div className="space-y-4">
               <button 
                 onClick={() => onToggleFavorite(tool.slug)}
                 className={`w-full py-5 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center transition-all ${favorites.includes(tool.slug) ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-400 hover:text-indigo-600'}`}
               >
                 {favorites.includes(tool.slug) ? '★ Saved to Workspace' : '☆ Save for Later'}
               </button>
               <button 
                 onClick={() => navigator.share?.({ title: tool.title, url: window.location.href })}
                 className="w-full py-5 rounded-2xl text-xs font-black uppercase tracking-widest bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center"
               >
                 Share this Utility
               </button>
             </div>

             {/* SIDEBAR AD SLOT */}
             {adSlots.sidebar && (
               <div className="mt-12">
                 <AdSlot key={`${routeKey}-sidebar`} id={AD_CONFIG.slots.sidebar} className="min-h-[250px]" />
               </div>
             )}
          </div>
        </aside>
      </div>

      {/* OVERLAY NOTIFICATIONS */}
      {success && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-emerald-600 text-white px-10 py-5 rounded-[2rem] shadow-2xl font-black text-sm animate-in slide-in-from-bottom-5">
          {success}
        </div>
      )}
      {error && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-red-600 text-white px-10 py-5 rounded-[2rem] shadow-2xl font-black text-sm animate-in slide-in-from-bottom-5">
          {error}
        </div>
      )}
    </div>
  );
};

export default ToolPage;