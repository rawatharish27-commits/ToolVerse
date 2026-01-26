
import React, { useState, useEffect, Suspense, startTransition, useMemo } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ToolPage from './pages/ToolPage';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import AddonLayer from './components/AddonLayer';
import TourOverlay from './components/TourOverlay';
import { CategorySlug } from './types';
import { trackPageView } from './utils/analytics';

interface NavigationState {
  page: 'home' | 'category' | 'tool' | 'about' | 'privacy' | 'terms' | 'contact';
  params?: any;
}

const App: React.FC = () => {
  const [nav, setNav] = useState<NavigationState>({ page: 'home' });
  const [searchQuery, setSearchQuery] = useState('');
  const [showTour, setShowTour] = useState(false);
  
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('tv_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const handlePathChange = () => {
    const path = window.location.pathname;
    trackPageView(path);

    startTransition(() => {
      // Robust Regex-based Route Matching for Refresh Persistence
      if (path === '/' || path === '' || path.endsWith('index.html')) {
        setNav({ page: 'home' });
      } else if (path.match(/^\/category\/([a-z-]+)/)) {
        const id = path.split('/').filter(Boolean).pop() as CategorySlug;
        setNav({ page: 'category', params: { id } });
      } else if (path.match(/^\/tools\/([a-z-]+)/)) {
        const slug = path.split('/').filter(Boolean).pop() || '';
        setNav({ page: 'tool', params: { slug } });
      } else if (['/about', '/privacy', '/terms', '/contact'].includes(path)) {
        const page = path.substring(1) as any;
        setNav({ page });
      } else {
        // Safe 404 Fallback
        setNav({ page: 'home' });
        if (path !== '/') window.history.replaceState({}, '', '/');
      }
    });
  };

  useEffect(() => {
    window.addEventListener('popstate', handlePathChange);
    handlePathChange();

    const hasSeenTour = localStorage.getItem('tv_onboarding_v5');
    if (!hasSeenTour) {
      const timer = setTimeout(() => setShowTour(true), 1200);
      return () => clearTimeout(timer);
    }

    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);

  const navigate = (page: string, params?: any) => {
    let newPath = '/';
    if (page === 'category') newPath = `/category/${params.id}`;
    else if (page === 'tool') newPath = `/tools/${params.slug}`;
    else if (['about', 'privacy', 'terms', 'contact'].includes(page)) newPath = `/${page}`;

    window.history.pushState({}, '', newPath);
    handlePathChange();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFavorite = (slug: string) => {
    setFavorites(prev => {
      const next = prev.includes(slug) ? prev.filter(s => s !== slug) : [slug, ...prev].slice(0, 12);
      localStorage.setItem('tv_favorites', JSON.stringify(next));
      return next;
    });
  };

  const activeContent = useMemo(() => {
    switch (nav.page) {
      case 'home': return <Home onNavigate={navigate} searchQuery={searchQuery} favorites={favorites} onToggleFavorite={toggleFavorite} recent={[]} />;
      case 'category': return <CategoryPage categoryId={nav.params.id} onNavigate={navigate} favorites={favorites} onToggleFavorite={toggleFavorite} />;
      case 'tool': return <ToolPage slug={nav.params.slug} onNavigate={navigate} favorites={favorites} onToggleFavorite={toggleFavorite} />;
      case 'about': return <About />;
      case 'privacy': return <PrivacyPolicy />;
      case 'terms': return <Terms />;
      case 'contact': return <Contact />;
      default: return <Home onNavigate={navigate} searchQuery="" favorites={[]} onToggleFavorite={()=>{}} recent={[]} />;
    }
  }, [nav, searchQuery, favorites]);

  return (
    <Layout 
      searchQuery={searchQuery}
      onNavigate={navigate} 
      onSearch={setSearchQuery}
    >
      <AddonLayer />
      {showTour && <TourOverlay onClose={() => { setShowTour(false); localStorage.setItem('tv_onboarding_v5', 'true'); }} />}
      
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Warping to Node...</p>
        </div>
      }>
        {activeContent}
      </Suspense>
    </Layout>
  );
};

export default App;
