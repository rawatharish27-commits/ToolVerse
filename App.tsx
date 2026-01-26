
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
    // Robust path detection for deep links on refresh
    const path = window.location.pathname;
    trackPageView(path);

    startTransition(() => {
      if (path === '/' || path === '' || path.includes('index.html')) {
        setNav({ page: 'home' });
      } else if (path === '/about') {
        setNav({ page: 'about' });
      } else if (path === '/privacy') {
        setNav({ page: 'privacy' });
      } else if (path === '/terms') {
        setNav({ page: 'terms' });
      } else if (path === '/contact') {
        setNav({ page: 'contact' });
      } else if (path.includes('/category/')) {
        const parts = path.split('/');
        const id = parts[parts.indexOf('category') + 1] as CategorySlug;
        setNav({ page: 'category', params: { id } });
      } else if (path.includes('/tools/')) {
        const parts = path.split('/');
        const slug = parts[parts.indexOf('tools') + 1];
        setNav({ page: 'tool', params: { slug } });
      } else {
        // Safe fallback to home if path is unrecognized
        setNav({ page: 'home' });
      }
    });
  };

  useEffect(() => {
    window.addEventListener('popstate', handlePathChange);
    handlePathChange();

    // Check for first-time user tour
    const hasSeenTour = localStorage.getItem('tv_tour_completed');
    if (!hasSeenTour) {
      setTimeout(() => setShowTour(true), 1500);
    }

    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);

  const navigate = (page: string, params?: any) => {
    let newPath = '/';
    if (page === 'category') newPath = `/category/${params.id}`;
    else if (page === 'tool') newPath = `/tools/${params.slug}`;
    else if (['about', 'privacy', 'terms', 'contact'].includes(page)) newPath = `/${page}`;
    else if (page === 'home') newPath = `/`;

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
      case 'home':
        return <Home onNavigate={navigate} searchQuery={searchQuery} favorites={favorites} onToggleFavorite={toggleFavorite} recent={[]} />;
      case 'category':
        return <CategoryPage categoryId={nav.params.id} onNavigate={navigate} favorites={favorites} onToggleFavorite={toggleFavorite} />;
      case 'tool':
        return <ToolPage slug={nav.params.slug} onNavigate={navigate} favorites={favorites} onToggleFavorite={toggleFavorite} />;
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
      {showTour && <TourOverlay onClose={() => setShowTour(false)} />}
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        {renderContent()}
      </Suspense>
    </Layout>
  );
};

export default App;
