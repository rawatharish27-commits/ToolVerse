import React, { useState, useEffect, Suspense, startTransition } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ToolPage from './pages/ToolPage';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import AddonLayer from './components/AddonLayer';
import { CategorySlug } from './types';
import { trackPageView } from './utils/analytics';

interface NavigationState {
  page: 'home' | 'category' | 'tool' | 'about' | 'privacy' | 'terms' | 'contact';
  params?: any;
}

const App: React.FC = () => {
  const [nav, setNav] = useState<NavigationState>({ page: 'home' });
  const [searchQuery, setSearchQuery] = useState('');
  const [hasKey, setHasKey] = useState<boolean>(true); // Assume key exists initially
  
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('tv_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [recent, setRecent] = useState<string[]>(() => {
    const saved = localStorage.getItem('tv_recent');
    return saved ? JSON.parse(saved) : [];
  });

  // Check for API key selection on mount for AI features
  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio?.hasSelectedApiKey) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
    };
    checkKey();
  }, []);

  useEffect(() => {
    localStorage.setItem('tv_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('tv_recent', JSON.stringify(recent));
  }, [recent]);

  const handlePathChange = () => {
    const path = window.location.pathname;
    trackPageView(path);

    startTransition(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });

      if (path === '/' || path === '') {
        setNav({ page: 'home' });
      } else if (path === '/about') {
        setNav({ page: 'about' });
      } else if (path === '/privacy') {
        setNav({ page: 'privacy' });
      } else if (path === '/terms') {
        setNav({ page: 'terms' });
      } else if (path === '/contact') {
        setNav({ page: 'contact' });
      } else if (path.startsWith('/category/')) {
        const id = path.split('/')[2] as CategorySlug;
        setNav({ page: 'category', params: { id } });
        setSearchQuery(''); 
      } else if (path.startsWith('/tools/')) {
        const slug = path.split('/')[2];
        setNav({ page: 'tool', params: { slug } });
        setSearchQuery(''); 
      } else {
        setNav({ page: 'home' });
      }
    });
  };

  useEffect(() => {
    window.addEventListener('popstate', handlePathChange);
    handlePathChange(); // Run once on load
    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);

  const navigate = (page: string, params?: any) => {
    let newPath = '/';
    if (page === 'category') newPath = `/category/${params.id}`;
    else if (page === 'tool') newPath = `/tools/${params.slug}`;
    else if (['about', 'privacy', 'terms', 'contact'].includes(page)) newPath = `/${page}`;

    window.history.pushState({}, '', newPath);
    handlePathChange();
  };

  const handleSelectKey = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      setHasKey(true); // Assume successful selection to proceed
    }
  };

  const toggleFavorite = (slug: string) => {
    setFavorites(prev => 
      prev.includes(slug) ? prev.filter(s => s !== slug) : [slug, ...prev].slice(0, 12)
    );
  };

  const addRecent = (slug: string) => {
    setRecent(prev => {
      const filtered = prev.filter(s => s !== slug);
      return [slug, ...filtered].slice(0, 8);
    });
  };

  const handleGlobalSearch = (q: string) => {
    setSearchQuery(q);
    if (q && window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
      handlePathChange();
    }
  };

  const renderContent = () => {
    switch (nav.page) {
      case 'home':
        return (
          <Home 
            onNavigate={navigate} 
            searchQuery={searchQuery} 
            favorites={favorites} 
            recent={recent}
            onToggleFavorite={toggleFavorite}
          />
        );
      case 'category':
        return (
          <CategoryPage 
            categoryId={nav.params.id} 
            onNavigate={navigate} 
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        );
      case 'tool':
        return (
          <ToolPage 
            slug={nav.params.slug} 
            onNavigate={navigate} 
            onToolUsed={addRecent}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        );
      case 'about': return <About />;
      case 'privacy': return <PrivacyPolicy />;
      case 'terms': return <Terms />;
      case 'contact': return <Contact />;
      default: return <Home onNavigate={navigate} favorites={[]} recent={[]} onToggleFavorite={()=>{}} />;
    }
  };

  return (
    <Layout 
      searchQuery={searchQuery}
      onNavigate={navigate} 
      onSearch={handleGlobalSearch}
    >
      <AddonLayer />
      {!hasKey && (
        <div className="bg-indigo-900 text-white py-4 px-6 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
           <p className="text-xs font-black uppercase tracking-widest">
             <span className="mr-2">⚡</span> AI Engine Status: Key Required for Professional Services
           </p>
           <button 
            onClick={handleSelectKey}
            className="px-6 py-2 bg-white text-indigo-900 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-xl"
           >
             Select API Key
           </button>
           <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-[10px] font-bold text-indigo-300 underline">View Billing Docs</a>
        </div>
      )}
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[70vh] bg-slate-50/50 backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-8 p-12 bg-white rounded-[3rem] shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-300">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-[6px] border-indigo-50 rounded-full"></div>
              <div className="absolute inset-0 border-[6px] border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-4 bg-indigo-500/10 rounded-full flex items-center justify-center">
                 <span className="text-indigo-600 font-black text-xl">TV</span>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-slate-900 font-black uppercase tracking-[0.3em] text-sm mb-2">Syncing Resources</h2>
              <p className="text-slate-400 text-xs font-bold tracking-tight animate-pulse">ToolVerse Core v2.5 Clean URLs Active...</p>
            </div>
          </div>
        </div>
      }>
        {renderContent()}
      </Suspense>
    </Layout>
  );
};

export default App;