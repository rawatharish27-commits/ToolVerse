
import React, { useState, useEffect, Suspense, startTransition } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ToolPage from './pages/ToolPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { CategorySlug } from './types';
import { trackPageView } from './utils/analytics';

interface NavigationState {
  page: 'home' | 'category' | 'tool' | 'privacy';
  params?: any;
}

const App: React.FC = () => {
  const [nav, setNav] = useState<NavigationState>({ page: 'home' });
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('tv_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [recent, setRecent] = useState<string[]>(() => {
    const saved = localStorage.getItem('tv_recent');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tv_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('tv_recent', JSON.stringify(recent));
  }, [recent]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      trackPageView(hash ? `/${hash}` : '/');

      // Use startTransition to prevent Error #525 during lazy-load suspension
      startTransition(() => {
        if (!hash || hash === '' || hash === '/') {
          setNav({ page: 'home' });
          return;
        }
        if (hash === 'privacy') {
          setNav({ page: 'privacy' });
        } else if (hash.startsWith('category/')) {
          const id = hash.split('/')[1] as CategorySlug;
          setNav({ page: 'category', params: { id } });
        } else if (hash.startsWith('tool/')) {
          const slug = hash.split('/')[1];
          setNav({ page: 'tool', params: { slug } });
        } else {
          setNav({ page: 'home' });
        }
      });
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: string, params?: any) => {
    if (page === 'home') {
      window.location.hash = '';
      setSearchQuery('');
    }
    else if (page === 'privacy') window.location.hash = 'privacy';
    else if (page === 'category') window.location.hash = `category/${params.id}`;
    else if (page === 'tool') window.location.hash = `tool/${params.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      case 'privacy':
        return <PrivacyPolicy />;
      default:
        return <Home onNavigate={navigate} searchQuery={searchQuery} favorites={[]} recent={[]} onToggleFavorite={()=>{}} />;
    }
  };

  return (
    <Layout onNavigate={navigate} onSearch={(q) => {
      setSearchQuery(q);
      // If we're not on home, searching should navigate home to show results
      if (window.location.hash !== '' && window.location.hash !== '#') {
        window.location.hash = ''; 
      }
    }}>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <div className="text-center">
              <p className="text-slate-900 font-black uppercase tracking-widest text-sm">Synchronizing Engines</p>
              <p className="text-slate-400 text-xs mt-1 font-medium tracking-tight">Accessing ToolVerse Core...</p>
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
