
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ToolPage from './pages/ToolPage';
import { CategorySlug } from './types';

interface NavigationState {
  page: 'home' | 'category' | 'tool';
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

  // Persist Workspace
  useEffect(() => {
    localStorage.setItem('tv_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('tv_recent', JSON.stringify(recent));
  }, [recent]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
          console.debug('ServiceWorker registration skipped (dev env).');
        });
      });
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) {
        setNav({ page: 'home' });
        return;
      }
      if (hash.startsWith('category/')) {
        const id = hash.split('/')[1] as CategorySlug;
        setNav({ page: 'category', params: { id } });
      } else if (hash.startsWith('tool/')) {
        const slug = hash.split('/')[1];
        setNav({ page: 'tool', params: { slug } });
      } else {
        setNav({ page: 'home' });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: string, params?: any) => {
    setSearchQuery(''); 
    if (page === 'home') window.location.hash = '';
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
      default:
        return <Home onNavigate={navigate} searchQuery={searchQuery} favorites={[]} recent={[]} onToggleFavorite={()=>{}} />;
    }
  };

  return (
    <Layout onNavigate={navigate} onSearch={(q) => {
      setSearchQuery(q);
      if (nav.page !== 'home') navigate('home');
    }}>
      {renderContent()}
    </Layout>
  );
};

export default App;
