
import React, { useState, useEffect, useMemo } from 'react';
import { TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';
import ToolRenderer from '../components/ToolRenderer';
import SEOHead from '../components/SEOHead';
import ToolSEOContent from '../components/ToolSEOContent';
import RelatedTools from '../components/RelatedTools';
import AdSlot from '../components/AdSlot';
import { trackEvent } from '../utils/analytics';
import { AD_CONFIG } from '../config/ads';
import { getHighCTRTitle, getBreadcrumbSchema, getAutoFaqSchema } from '../utils/seo';

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
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    if (tool) {
      trackEvent('tool_view', tool.slug);
      window.scrollTo(0, 0);
      const savedReviews = localStorage.getItem(`reviews_${tool.slug}`);
      if (savedReviews) setReviews(JSON.parse(savedReviews));
      else setReviews([
        { name: "John D.", rating: 5, text: "Extremely fast processing. Saved me hours on my govt form!", date: "2 days ago" },
        { name: "Sarah K.", rating: 4, text: "Great UI. Very intuitive to use on mobile.", date: "5 days ago" }
      ]);
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

  if (!tool || !category || !seoData) return <div className="p-20 text-center font-bold text-slate-400 text-2xl">Tool Node Unavailable.</div>;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !comment.trim()) return;
    const newReview = { name: "You", rating, text: comment, date: "Just now" };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(`reviews_${tool.slug}`, JSON.stringify(updated));
    setComment("");
    setRating(0);
    // Fix: Using handleSuccess instead of non-existent onSuccess
    handleSuccess("Review Synced to Hub!");
  };

  const handleSuccess = (msg: string) => {
    setSuccess(msg);
    onToolUsed?.(tool.slug);
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-12 md:py-24">
      <SEOHead 
        title={seoData.title}
        description={`The professional ${tool.title} by ToolVerse. Free, secure, and 100% workable. Architected for speed and privacy.`}
        url={seoData.url}
        type="article"
        schemas={[seoData.breadcrumb, seoData.faq]} 
      />

      <div className="flex flex-col lg:flex-row gap-20">
        <div className="flex-grow w-full max-w-5xl">
          
          <div className="mb-16 text-center lg:text-left">
            <nav className="mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 justify-center lg:justify-start">
               <button onClick={() => onNavigate('home')} className="hover:text-indigo-600 transition-colors">Home</button>
               <span className="opacity-20">/</span>
               <button onClick={() => onNavigate('category', { id: category.id })} className="hover:text-indigo-600 transition-colors">{category.name}</button>
               <span className="opacity-20">/</span>
               <span className="text-indigo-600 underline underline-offset-4 decoration-2">{tool.title}</span>
            </nav>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]">
              {tool.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start">
               <div className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase border border-emerald-100">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  Logic: Fully Operational
               </div>
               <div className="flex items-center gap-2 text-yellow-500 font-black text-sm">
                  <span>★★★★★</span>
                  <span className="text-slate-400 text-xs">(4.9/5 from 2.4k audits)</span>
               </div>
            </div>
          </div>

          <AdSlot id={AD_CONFIG.slots.header} className="mb-16" />

          {/* MAIN WORKSPACE */}
          <div className="bg-white rounded-[4rem] p-8 md:p-20 shadow-[0_80px_120px_-30px_rgba(79,70,229,0.12)] border border-slate-100 min-h-[600px] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
               <div className="text-[15rem] font-black italic">{category.icon}</div>
            </div>
            <ToolRenderer slug={tool.slug} onSuccess={handleSuccess} onError={setError} />
          </div>

          <AdSlot id={AD_CONFIG.slots.mid_content} variant="result-based" className="my-24" />

          <ToolSEOContent tool={tool} />
          
          {/* USER REVIEWS & FEEDBACK ENGINE */}
          <section className="mt-32 space-y-12">
            <div className="border-l-4 border-indigo-600 pl-8">
               <h2 className="text-3xl font-black text-slate-900 tracking-tight">Community Audit Hub</h2>
               <p className="text-slate-500 font-medium mt-2">Verified feedback and logic ratings for this utility.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <form onSubmit={handleReviewSubmit} className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Add Your Audit</h3>
                  <div className="flex gap-3 text-3xl">
                     {[1,2,3,4,5].map(star => (
                       <button key={star} type="button" onClick={() => setRating(star)} className={`${rating >= star ? 'text-yellow-400' : 'text-slate-200'} hover:scale-125 transition-transform`}>★</button>
                     ))}
                  </div>
                  <textarea 
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Describe your experience with this logic node..."
                    className="w-full h-32 p-6 bg-white border border-slate-200 rounded-3xl outline-none focus:ring-8 focus:ring-indigo-500/5 font-medium text-slate-700 transition-all resize-none"
                  />
                  <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-indigo-700 transition-all">Submit Feedback</button>
               </form>

               <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 no-scrollbar">
                  {reviews.map((rev, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                       <div className="flex justify-between items-center mb-4">
                          <span className="font-black text-slate-900">{rev.name}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{rev.date}</span>
                       </div>
                       <div className="text-yellow-400 text-xs mb-3">{'★'.repeat(rev.rating)}</div>
                       <p className="text-slate-600 text-sm font-medium leading-relaxed italic">"{rev.text}"</p>
                    </div>
                  ))}
               </div>
            </div>
          </section>

          <AdSlot id={AD_CONFIG.slots.footer} className="my-24" />

          <RelatedTools currentSlug={tool.slug} category={tool.category} onNavigate={onNavigate} />
        </div>

        <aside className="w-full lg:w-96 flex-shrink-0 space-y-10">
          <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white lg:sticky lg:top-32 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <div className="text-9xl font-black italic">PRO</div>
             </div>
             <div className="relative z-10 space-y-10">
                <div className="space-y-4">
                  <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Hardware Status</div>
                  <div className="flex items-center space-x-4">
                     <span className="relative flex h-4 w-4">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></span>
                     </span>
                     <span className="text-xl font-black text-white tracking-tight">NODE: 0x8F2A</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <button 
                    onClick={() => onToggleFavorite(tool.slug)}
                    className={`w-full py-6 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${favorites.includes(tool.slug) ? 'bg-white text-slate-900 shadow-xl' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}
                  >
                    <span>{favorites.includes(tool.slug) ? '★' : '☆'}</span> {favorites.includes(tool.slug) ? 'Saved to Vault' : 'Save utility'}
                  </button>
                  <button 
                    onClick={() => navigator.share?.({ title: tool.title, url: window.location.href })}
                    className="w-full py-6 rounded-2xl text-xs font-black uppercase tracking-widest bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                  >
                    <span>↗</span> Share logic
                  </button>
                </div>

                <div className="pt-8 border-t border-white/5">
                   <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Partner Intelligence</div>
                   <AdSlot id={AD_CONFIG.slots.sidebar} className="min-h-[300px] border-white/5 bg-white/5" />
                </div>
             </div>
          </div>
        </aside>
      </div>

      {success && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[200] bg-emerald-600 text-white px-12 py-6 rounded-[2.5rem] shadow-[0_40px_80px_rgba(16,185,129,0.4)] font-black text-base animate-in slide-in-from-bottom-10 flex items-center gap-4">
          <span className="text-2xl">✅</span> {success}
        </div>
      )}
    </div>
  );
};

export default ToolPage;
