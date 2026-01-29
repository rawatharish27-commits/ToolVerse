
import React, { useState, useEffect, Suspense, startTransition, useMemo } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ToolPage from './pages/ToolPage';
import { CategorySlug } from './types';

interface NavigationState {
  page: 'home' | 'category' | 'tool' | 'about' | 'privacy' | 'terms' | 'contact' | 'directory';
  params?: any;
}

const App: React.FC = () => {
  const [nav, setNav] = useState<NavigationState>({ page: 'home' });
  const [searchQuery, setSearchQuery] = useState('');
  
  const handlePathChange = () => {
    const path = window.location.pathname;
    startTransition(() => {
      if (path === '/' || path === '' || path.endsWith('index.html')) {
        setNav({ page: 'home' });
      } else if (path.startsWith('/category/')) {
        const id = path.split('/')[2] as CategorySlug;
        setNav({ page: 'category', params: { id } });
      } else if (path.startsWith('/tools/')) {
        const slug = path.split('/')[2] || '';
        setNav({ page: 'tool', params: { slug } });
      } else {
        setNav({ page: 'home' });
      }
    });
  };

  useEffect(() => {
    window.addEventListener('popstate', handlePathChange);
    handlePathChange();
    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);

  const navigate = (page: string, params?: any) => {
    let newPath = '/';
    if (page === 'category') newPath = `/category/${params.id}`;
    else if (page === 'tool') newPath = `/tools/${params.slug}`;

    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
      handlePathChange();
    }
  };

  const activeView = useMemo(() => {
    switch (nav.page) {
      case 'home': return <Home onNavigate={navigate} searchQuery={searchQuery} favorites={[]} onToggleFavorite={()=>{}} recent={[]} />;
      case 'category': return <CategoryPage categoryId={nav.params.id} onNavigate={navigate} favorites={[]} onToggleFavorite={()=>{}} />;
      case 'tool': return <ToolPage slug={nav.params.slug} />;
      default: return <Home onNavigate={navigate} searchQuery="" favorites={[]} onToggleFavorite={()=>{}} recent={[]} />;
    }
  }, [nav, searchQuery]);

  return (
    <Layout 
      searchQuery={searchQuery}
      onNavigate={navigate} 
      onSearch={setSearchQuery}
    >
      {activeView}
    </Layout>
  );
};

export default App;
