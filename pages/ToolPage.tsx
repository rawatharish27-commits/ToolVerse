
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
      // TRACKING: Record tool visit
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
    // TRACKING: Record tool successful usage
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
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <SEOHead 
        title={tool.seoTitle || `${tool.title} Online – Free Browser Tool`}
        description={tool.seoDescription || `${tool.description}. Safe, fast, and 100% free professional utility.`}
        url={`https://toolverse.com/#tool/${tool.slug}`}
        type="article"
      />

      <nav className="flex mb-8 text-sm font-medium">
        <button onClick={() => onNavigate('home')} className="text-slate-400 hover:text-indigo-600 transition-colors">Home</button>
        <span className="mx-2 text-slate-300">/</span>
        <button onClick={() => onNavigate('category', { id: tool.category })} className="text-slate-400 hover:text-indigo-600 transition-colors">{category?.name}</button>
        <span className="mx-2 text-slate-300">/</span>
        <span className="text-slate-900 font-bold">{tool.title}</span>
      </nav>

      {/* REVENUE SLOT: TOP BANNER */}
      {adSlots.header && <AdSlot id={AD_CONFIG.slots.header} />}

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:flex-grow">
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">{tool.title}</h1>
            <p className="text-slate-500 text-lg">{tool.description}</p>
          </div>

          <div className="my-8 bg-white rounded-[2.5rem] p-6 md:p-12 shadow-2xl shadow-indigo-100 border border-slate-100 min-h-[500px]">
            <ToolRenderer slug={tool.slug} onSuccess={handleSuccess} onError={setError} />
          </div>

          {/* REVENUE SLOT: MID CONTENT */}
          {adSlots.mid && <AdSlot id={AD_CONFIG.slots.mid_content} />}

          <ToolSEOContent tool={tool} />
          <RelatedTools currentSlug={tool.slug} category={tool.category} onNavigate={onNavigate} />
          
          {adSlots.footer && <AdSlot id={AD_CONFIG.slots.footer} />}
        </div>

        <aside className="lg:w-80 flex-shrink-0 space-y-8">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm sticky top-24">
            <h3 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Options</h3>
            <button 
              onClick={() => onToggleFavorite(tool.slug)}
              className={`w-full py-4 rounded-2xl text-xs font-bold transition-all mb-4 ${favorites.includes(tool.slug) ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
            >
              {favorites.includes(tool.slug) ? '★ Favorited' : '☆ Save for Later'}
            </button>

            {/* REVENUE SLOT: SIDEBAR */}
            {adSlots.sidebar && (
              <div className="mt-8">
                 <AdSlot id={AD_CONFIG.slots.sidebar} className="min-h-[600px]" />
              </div>
            )}
          </div>
        </aside>
      </div>

      {success && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl font-bold animate-bounce flex items-center">
          {success}
        </div>
      )}
      {error && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-red-600 text-white px-8 py-4 rounded-2xl shadow-2xl font-bold flex items-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default ToolPage;
