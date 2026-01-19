
import React, { useState, useEffect } from 'react';
import { TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';
import AdPlaceholder from '../components/AdPlaceholder';
import ToolRenderer from '../components/ToolRenderer';

interface ToolPageProps {
  slug: string;
  onNavigate: (page: string, params?: any) => void;
}

const ToolPage: React.FC<ToolPageProps> = ({ slug, onNavigate }) => {
  const tool = TOOLS.find(t => t.slug === slug);
  const category = CATEGORIES.find(c => c.id === tool?.category);

  // --- Common States ---
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (tool) document.title = `${tool.title} | ToolVerse Free Online Tools`;
  }, [tool]);

  if (!tool) return <div className="p-20 text-center font-bold text-slate-400 text-2xl">Tool not found.</div>;

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  };

  const showError = (msg: string) => {
    setError(msg);
    setTimeout(() => setError(null), 5000);
  };

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

      {/* Breadcrumbs */}
      <nav className="flex mb-8 text-sm font-medium">
        <button onClick={() => onNavigate('home')} className="text-slate-400 hover:text-indigo-600 transition-colors">Home</button>
        <span className="mx-2 text-slate-300">/</span>
        <button onClick={() => onNavigate('category', { id: tool.category })} className="text-slate-400 hover:text-indigo-600 transition-colors">{category?.name}</button>
        <span className="mx-2 text-slate-300">/</span>
        <span className="text-slate-900 font-bold">{tool.title}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:flex-grow">
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">{tool.title}</h1>
            <p className="text-slate-500 text-lg">{tool.description}</p>
          </div>

          <div className="my-8 bg-white rounded-[2.5rem] p-6 md:p-12 shadow-2xl shadow-indigo-100 border border-slate-100 min-h-[500px] relative overflow-hidden">
            {/* Visual Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-[100px] -mr-32 -mt-32 opacity-50 pointer-events-none"></div>
            
            <div className="relative z-10">
              <ToolRenderer 
                slug={tool.slug} 
                onSuccess={showSuccess} 
                onError={showError} 
              />
            </div>
          </div>

          <AdPlaceholder type="inline" />

          {/* Dynamic Guide Section */}
          <div className="mt-12 bg-white rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-sm prose prose-indigo max-w-none">
             <h2 className="text-3xl font-bold text-slate-900 mb-6">User Guide for {tool.title}</h2>
             <p className="text-slate-600 text-lg leading-relaxed mb-10">
               {tool.longDescription || `Welcome to our professional ${tool.title}. This utility is designed to handle high-traffic data processing locally in your browser, ensuring maximum privacy and blazing fast performance.`}
             </p>
             
             <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-slate-50 p-8 rounded-3xl">
                   <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                     <span className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center mr-3 text-sm">1</span>
                     Quick Instructions
                   </h3>
                   <ul className="space-y-4 text-slate-600 text-sm list-none p-0">
                      {tool.howTo?.map((step, i) => (
                        <li key={i} className="flex items-center">
                          <svg className="w-4 h-4 text-indigo-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                          {step}
                        </li>
                      )) || (
                        <>
                          <li className="flex items-center"><svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg> Upload or paste your content.</li>
                          <li className="flex items-center"><svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg> Adjust settings if necessary.</li>
                          <li className="flex items-center"><svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg> Click process and download the result.</li>
                        </>
                      )}
                   </ul>
                </div>
                <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-100">
                   <h3 className="text-xl font-bold mb-4 flex items-center">
                     <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3 text-sm">2</span>
                     Frequently Asked Questions
                   </h3>
                   <div className="space-y-6">
                      {tool.faqs?.map((f, i) => (
                        <div key={i}>
                           <div className="font-bold text-indigo-100 text-sm mb-1 uppercase tracking-tighter">Q: {f.q}</div>
                           <p className="text-indigo-50 text-xs opacity-90 leading-relaxed">{f.a}</p>
                        </div>
                      )) || (
                        <div>
                          <div className="font-bold text-indigo-100 text-sm mb-1 uppercase tracking-tighter">Q: Is it secure?</div>
                          <p className="text-indigo-50 text-xs opacity-90">A: Yes, all processing happens locally in your browser. No data is sent to our servers.</p>
                        </div>
                      )}
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:w-80 flex-shrink-0 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm sticky top-24">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center">
              <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3 animate-pulse"></span>
              Related Tools
            </h3>
            <div className="space-y-6">
              {TOOLS.filter(t => t.category === tool.category && t.slug !== tool.slug).slice(0, 5).map(rel => (
                <button key={rel.slug} onClick={() => onNavigate('tool', { slug: rel.slug })} className="group flex flex-col w-full text-left p-3 -m-3 rounded-2xl hover:bg-slate-50 transition-all">
                  <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 line-clamp-1 transition-colors">{rel.title}</span>
                  <span className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{rel.description}</span>
                </button>
              ))}
            </div>
            <button 
              onClick={() => onNavigate('home')} 
              className="w-full mt-10 py-4 bg-slate-900 text-white rounded-2xl text-xs font-bold hover:bg-indigo-600 transition-all active:scale-95 shadow-lg"
            >
              Back to Home
            </button>
          </div>
          <AdPlaceholder type="sidebar" />
        </aside>
      </div>
    </div>
  );
};

export default ToolPage;
