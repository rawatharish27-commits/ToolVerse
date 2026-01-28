import React, { useState, useEffect, Suspense, startTransition, useMemo, lazy } from 'react';
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

// Lazy load the mega directory
const Directory = lazy(() => import('./pages/Directory'));

interface NavigationState {
  page: 'home' | 'category' | 'tool' | 'about' | 'privacy' | 'terms' | 'contact' | 'directory';
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
      if (path === '/' || path === '' || path.endsWith('index.html')) {
        setNav({ page: 'home' });
      } else if (path === '/directory') {
        setNav({ page: 'directory' });
      } else if (path.startsWith('/category/')) {
        const id = path.split('/')[2] as CategorySlug;
        setNav({ page: 'category', params: { id } });
      } else if (path.startsWith('/tools/')) {
        const slug = path.split('/')[2] || '';
        setNav({ page: 'tool', params: { slug } });
      } else if (['/about', '/privacy', '/terms', '/contact'].includes(path)) {
        const page = path.substring(1) as any;
        setNav({ page });
      } else {
        setNav({ page: 'home' });
      }
    });
  };

  useEffect(() => {
    window.addEventListener('popstate', handlePathChange);
    handlePathChange();
    const hasSeenTour = localStorage.getItem('tv_onboarding_v7');
    if (!hasSeenTour) {
      const timer = setTimeout(() => setShowTour(true), 2000);
      return () => clearTimeout(timer);
    }
    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);

  const navigate = (page: string, params?: any) => {
    let newPath = '/';
    if (page === 'category') newPath = `/category/${params.id}`;
    else if (page === 'tool') newPath = `/tools/${params.slug}`;
    else if (page === 'directory') newPath = '/directory';
    else if (['about', 'privacy', 'terms', 'contact'].includes(page)) newPath = `/${page}`;

    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
      handlePathChange();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFavorite = (slug: string) => {
    setFavorites(prev => {
      const next = prev.includes(slug) ? prev.filter(s => s !== slug) : [slug, ...prev].slice(0, 12);
      localStorage.setItem('tv_favorites', JSON.stringify(next));
      return next;
    });
  };

  const activeView = useMemo(() => {
    switch (nav.page) {
      case 'home': return <Home onNavigate={navigate} searchQuery={searchQuery} favorites={favorites} onToggleFavorite={toggleFavorite} recent={[]} />;
      case 'directory': return <Directory onNavigate={navigate} favorites={favorites} onToggleFavorite={toggleFavorite} />;
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
      {showTour && <TourOverlay onClose={() => { setShowTour(false); localStorage.setItem('tv_onboarding_v7', 'true'); }} />}
      
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Warping to Node...</p>
        </div>
      }>
        {activeView}
      </Suspense>
    </Layout>
  );
};

export default App;
