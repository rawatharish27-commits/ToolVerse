
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

  useEffect(() => {
    if (tool) {
      trackEvent('tool_view', tool.slug);
      if (tool.category) {
        trackEvent('category_view', tool.category);
      }

      const existingScript = document.getElementById('tool-schema');
      if (existingScript) existingScript.remove();

      const script = document.createElement('script');
      script.id = 'tool-schema';
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": tool.title,
        "description": tool.description,
        "applicationCategory": tool.category + " Tool",
        "url": window.location.href,
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      });
      document.head.appendChild(script);
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-12 sm:px-6 lg:px-8 overflow-x-hidden">
      <SEOHead 
        title={tool.seoTitle || `${tool.title} Online – Free Browser Tool`}
        description={tool.seoDescription || `${tool.description}. Safe, fast, and 100% free professional utility.`}
        url={`https://toolverse.com/#tool/${tool.slug}`}
        type="article"
      />

      <nav className="flex mb-6 md:mb-10 text-[10px] md:text-sm font-medium overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
        <button onClick={() => onNavigate('home')} className="text-slate-400 hover:text-indigo-600 transition-colors">Home</button>
        <span className="mx-2 text-slate-300">/</span>
        <button onClick={() => onNavigate('category', { id: tool.category })} className="text-slate-400 hover:text-indigo-600 transition-colors">{category?.name}</button>
        <span className="mx-2 text-slate-300">/</span>
        <span className="text-slate-900 font-bold">{tool.title}</span>
      </nav>

      {/* REVENUE SLOT: TOP BANNER */}
      {adSlots.header && <AdSlot id={AD_CONFIG.slots.header} className="mb-8" />}

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="flex-grow w-full lg:max-w-[calc(100%-22rem)]">
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">{tool.title}</h1>
            <p className="text-slate-500 text-base md:text-xl font-medium leading-relaxed">{tool.description}</p>
          </div>

          <div className="mb-12 bg-white rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-16 shadow-2xl shadow-indigo-100/50 border border-slate-100 min-h-[400px]">
            <ToolRenderer slug={tool.slug} onSuccess={handleSuccess} onError={setError} />
          </div>

          {/* REVENUE SLOT: MID CONTENT */}
          {adSlots.mid && <AdSlot id={AD_CONFIG.slots.mid_content} />}

          <ToolSEOContent tool={tool} />
          <RelatedTools currentSlug={tool.slug} category={tool.category} onNavigate={onNavigate} />
          
          {adSlots.footer && <AdSlot id={AD_CONFIG.slots.footer} className="mt-12" />}
        </div>

        <aside className="w-full lg:w-80 flex-shrink-0 space-y-8">
          <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm lg:sticky lg:top-24">
            <h3 className="font-black text-slate-900 mb-6 uppercase text-[10px] tracking-[0.3em]">Options</h3>
            <div className="space-y-3">
              <button 
                onClick={() => onToggleFavorite(tool.slug)}
                className={`w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${favorites.includes(tool.slug) ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
              >
                {favorites.includes(tool.slug) ? '★ Favorited' : '☆ Save Tool'}
              </button>
              <button 
                onClick={() => {
                  navigator.share?.({ title: tool.title, url: window.location.href });
                }}
                className="w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all"
              >
                📤 Share Tool
              </button>
            </div>

            {/* REVENUE SLOT: SIDEBAR */}
            {adSlots.sidebar && (
              <div className="mt-8 hidden lg:block">
                 <AdSlot id={AD_CONFIG.slots.sidebar} className="min-h-[600px]" />
              </div>
            )}
          </div>
        </aside>
      </div>

      {success && (
        <div className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-emerald-600 text-white px-6 md:px-10 py-4 rounded-2xl shadow-2xl font-black text-sm animate-in slide-in-from-bottom-5">
          {success}
        </div>
      )}
      {error && (
        <div className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-red-600 text-white px-6 md:px-10 py-4 rounded-2xl shadow-2xl font-black text-sm animate-in slide-in-from-bottom-5">
          {error}
        </div>
      )}
    </div>
  );
};

export default ToolPage;
