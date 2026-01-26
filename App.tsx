
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
    // RESOLUTION: Deep-path detection for refresh stability
    const path = window.location.pathname;
    trackPageView(path);

    startTransition(() => {
      // 1. Master Route Map
      if (path === '/' || path === '' || path.endsWith('index.html')) {
        setNav({ page: 'home' });
      } else if (path.match(/^\/category\/[a-z-]+/)) {
        const id = path.split('/').pop() as CategorySlug;
        setNav({ page: 'category', params: { id } });
      } else if (path.match(/^\/tools\/[a-z-]+/)) {
        const slug = path.split('/').pop() || '';
        setNav({ page: 'tool', params: { slug } });
      } else if (path === '/about') {
        setNav({ page: 'about' });
      } else if (path === '/privacy') {
        setNav({ page: 'privacy' });
      } else if (path === '/terms') {
        setNav({ page: 'terms' });
      } else if (path === '/contact') {
        setNav({ page: 'contact' });
      } else {
        // Fallback for unrecognized paths
        setNav({ page: 'home' });
      }
    });
  };

  useEffect(() => {
    window.addEventListener('popstate', handlePathChange);
    handlePathChange();

    const hasSeenTour = localStorage.getItem('tv_tour_v3_completed');
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

  const renderContent = () => {
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
  };

  return (
    <Layout 
      searchQuery={searchQuery}
      onNavigate={navigate} 
      onSearch={setSearchQuery}
    >
      <AddonLayer />
      {showTour && <TourOverlay onClose={() => { setShowTour(false); localStorage.setItem('tv_tour_v3_completed', 'true'); }} />}
      
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        {renderContent()}
      </Suspense>
    </Layout>
  );
};

export default App;
