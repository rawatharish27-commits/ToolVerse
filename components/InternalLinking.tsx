
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';

interface InternalLinkingProps {
  onNavigate: (page: string, params?: any) => void;
}

const InternalLinking: React.FC<InternalLinkingProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // OPTIMIZATION: Defer rendering until component is near viewport
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: '200px' });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // OPTIMIZATION: Move filtering logic to a single memoized pre-pass
  const categoryMap = useMemo(() => {
    if (!isVisible) return new Map();
    const map = new Map();
    CATEGORIES.forEach(cat => {
      const catTools = TOOLS
        .filter(t => t.category === cat.id)
        .sort((a, b) => (b.priority || 0) - (a.priority || 0))
        .slice(0, 5);
      if (catTools.length > 0) map.set(cat.id, catTools);
    });
    return map;
  }, [isVisible]);

  if (!isVisible) return <div ref={containerRef} className="min-h-[400px] bg-white" />;

  return (
    <section className="bg-white border-t border-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-10 text-center">
          Explore Our Tool Clusters
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-16">
          {CATEGORIES.map(cat => {
            const catTools = categoryMap.get(cat.id);
            if (!catTools) return null;

            return (
              <div key={cat.id} className="space-y-4">
                <h3 
                  onClick={() => onNavigate('category', { id: cat.id })}
                  className="text-sm font-black text-slate-900 cursor-pointer hover:text-indigo-600 flex items-center"
                >
                  <span className="mr-2 opacity-50">{cat.icon}</span>
                  {cat.name}
                </h3>
                <ul className="space-y-2">
                  {catTools.map((tool: any) => (
                    <li key={tool.slug}>
                      <button 
                        onClick={() => onNavigate('tool', { slug: tool.slug })}
                        className="text-xs text-slate-500 hover:text-indigo-500 hover:underline text-left transition-all"
                      >
                        {tool.title}
                        {tool.priority && tool.priority >= 90 && <span className="ml-1 text-[8px] bg-indigo-50 text-indigo-500 px-1 rounded">HOT</span>}
                      </button>
                    </li>
                  ))}
                  <li>
                     <button 
                      onClick={() => onNavigate('category', { id: cat.id })}
                      className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-600"
                    >
                      View All {cat.name} →
                    </button>
                  </li>
                </ul>
              </div>
            );
          })}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-900 flex items-center">
              <span className="mr-2 opacity-50">📑</span>
              Platform
            </h3>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('about')} className="text-xs text-slate-500 hover:text-indigo-500 hover:underline transition-all">About Our Mission</button></li>
              <li><button onClick={() => onNavigate('contact')} className="text-xs text-slate-500 hover:text-indigo-500 hover:underline transition-all">Contact Support</button></li>
              <li><button onClick={() => onNavigate('privacy')} className="text-xs text-slate-500 hover:text-indigo-500 hover:underline transition-all">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('terms')} className="text-xs text-slate-500 hover:text-indigo-500 hover:underline transition-all">Terms of Service</button></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternalLinking;
