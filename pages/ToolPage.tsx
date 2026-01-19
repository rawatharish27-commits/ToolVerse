
import React, { useState, useEffect } from 'react';
import { TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';
import AdPlaceholder from '../components/AdPlaceholder';
import ToolRenderer from '../components/ToolRenderer';

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
  const [showChaining, setShowChaining] = useState(false);

  useEffect(() => {
    if (tool) {
      document.title = `${tool.title} - Free Online Tool | ToolVerse`;
      
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
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      });
      document.head.appendChild(script);

      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', `${tool.title}: ${tool.description}. Safe, fast, and 100% free online utility on ToolVerse.`);
      
      setShowChaining(false);
    }
  }, [tool]);

  if (!tool) return <div className="p-20 text-center font-bold text-slate-400 text-2xl">Tool not found.</div>;

  const handleSuccess = (msg: string) => {
    setSuccess(msg);
    onToolUsed?.(tool.slug);
    setShowChaining(true);
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleError = (msg: string) => {
    setError(msg);
    setTimeout(() => setError(null), 5000);
  };

  // Tool Chaining Mapping Logic
  const getSuggestedNextStep = () => {
    if (tool.category === 'image') return TOOLS.find(t => t.slug === 'image-compressor');
    if (tool.category === 'pdf') return TOOLS.find(t => t.slug === 'pdf-compressor');
    if (tool.category === 'office') return TOOLS.find(t => t.slug === 'excel-to-pdf');
    if (tool.category === 'video') return TOOLS.find(t => t.slug === 'video-compressor');
    return TOOLS.find(t => t.category === tool.category && t.slug !== tool.slug);
  };

  const nextStep = getSuggestedNextStep();

  const relatedTools = TOOLS
    .filter(t => t.category === tool.category && t.slug !== tool.slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {success && (
        <div className="fixed top-20 right-4 z-[100] bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-2xl font-bold animate-bounce flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
          {success}
        </div>
      )}

      {error && (
        <div className="fixed top-20 right-4 z-[100] bg-red-600 text-white px-6 py-3 rounded-xl shadow-2xl font-bold animate-pulse flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {error}
        </div>
      )}

      <nav className="flex mb-8 text-sm font-medium items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => onNavigate('home')} className="text-slate-400 hover:text-indigo-600 transition-colors">Home</button>
          <span className="mx-2 text-slate-300">/</span>
          <button onClick={() => onNavigate('category', { id: tool.category })} className="text-slate-400 hover:text-indigo-600 transition-colors">{category?.name}</button>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-slate-900 font-bold">{tool.title}</span>
        </div>
        <button 
          onClick={() => onToggleFavorite(tool.slug)}
          className={`flex items-center px-4 py-2 rounded-xl text-xs font-bold transition-all ${favorites.includes(tool.slug) ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
        >
          {favorites.includes(tool.slug) ? '★ Favorited' : '☆ Add to Workspace'}
        </button>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:flex-grow">
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">{tool.title}</h1>
            <p className="text-slate-500 text-lg">{tool.description}</p>
          </div>

          <div className="my-8 bg-white rounded-[2.5rem] p-6 md:p-12 shadow-2xl shadow-indigo-100 border border-slate-100 min-h-[500px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-[100px] -mr-32 -mt-32 opacity-50 pointer-events-none"></div>
            
            <div className="relative z-10">
              <ToolRenderer 
                slug={tool.slug} 
                onSuccess={handleSuccess} 
                onError={handleError} 
              />
            </div>

            {/* PHASE-3 Tool Chaining Banner */}
            {showChaining && nextStep && (
              <div className="mt-12 animate-in slide-in-from-top duration-500">
                 <div className="p-8 bg-indigo-600 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-indigo-200">
                    <div>
                       <div className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Recommended Next Step</div>
                       <h4 className="text-xl font-bold">Want to {nextStep.title.toLowerCase()} now?</h4>
                       <p className="text-sm opacity-70">Combine your workflow for maximum efficiency.</p>
                    </div>
                    <button 
                      onClick={() => onNavigate('tool', { slug: nextStep.slug })}
                      className="px-8 py-4 bg-white text-indigo-600 font-black rounded-2xl shadow-lg hover:scale-105 transition-all whitespace-nowrap"
                    >
                      Start Next Tool ➔
                    </button>
                 </div>
              </div>
            )}
          </div>

          <AdPlaceholder type="inline" />

          {/* Guide section (existing) */}
          <div className="mt-12 bg-white rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-sm prose prose-indigo max-w-none">
             <h2 className="text-3xl font-bold text-slate-900 mb-6">User Guide for {tool.title}</h2>
             <p className="text-slate-600 text-lg leading-relaxed mb-10">
               {tool.longDescription || `Welcome to our professional ${tool.title}. This utility is designed to handle high-traffic data processing locally in your browser, ensuring maximum privacy and blazing fast performance.`}
             </p>
          </div>
        </div>

        <aside className="lg:w-80 flex-shrink-0 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm sticky top-24">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center text-sm uppercase tracking-widest">
              <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3 animate-pulse"></span>
              Category: {category?.name}
            </h3>
            <div className="space-y-6">
              {relatedTools.map(rel => (
                <button key={rel.slug} onClick={() => onNavigate('tool', { slug: rel.slug })} className="group flex flex-col w-full text-left p-3 -m-3 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                  <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 line-clamp-1 transition-colors">{rel.title}</span>
                  <span className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{rel.description}</span>
                </button>
              ))}
            </div>
            <button 
              onClick={() => onNavigate('home')} 
              className="w-full mt-10 py-4 bg-slate-900 text-white rounded-2xl text-xs font-bold hover:bg-indigo-600 transition-all active:scale-95 shadow-lg"
            >
              Back to Marketplace
            </button>
          </div>
          <AdPlaceholder type="sidebar" />
        </aside>
      </div>
    </div>
  );
};

export default ToolPage;
