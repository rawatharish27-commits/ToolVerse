
import React, { useState, useEffect, Suspense, startTransition, useMemo } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ToolPage from './pages/ToolPage';
import Directory from './pages/Directory';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import About from './pages/About';
import { CategorySlug } from './types';
import AddonLayer from './components/AddonLayer';

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
      } else if (path === '/directory') {
        setNav({ page: 'directory' });
      } else if (path === '/privacy') {
        setNav({ page: 'privacy' });
      } else if (path === '/terms') {
        setNav({ page: 'terms' });
      } else if (path === '/contact') {
        setNav({ page: 'contact' });
      } else if (path === '/about') {
        setNav({ page: 'about' });
      } else {
        setNav({ page: 'home' });
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    else if (page === 'directory') newPath = `/directory`;
    else if (page === 'privacy') newPath = `/privacy`;
    else if (page === 'terms') newPath = `/terms`;
    else if (page === 'contact') newPath = `/contact`;
    else if (page === 'about') newPath = `/about`;

    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
      handlePathChange();
    }
  };

  const activeView = useMemo(() => {
    switch (nav.page) {
      case 'home': return <Home onNavigate={navigate} searchQuery={searchQuery} favorites={[]} onToggleFavorite={()=>{}} recent={[]} />;
      case 'category': return <CategoryPage categoryId={nav.params.id} onNavigate={navigate} favorites={[]} onToggleFavorite={()=>{}} />;
      case 'tool': return <ToolPage slug={nav.params.slug} onNavigate={navigate} />;
      case 'directory': return <Directory onNavigate={navigate} favorites={[]} onToggleFavorite={()=>{}} />;
      case 'privacy': return <PrivacyPolicy />;
      case 'terms': return <Terms />;
      case 'contact': return <Contact />;
      case 'about': return <About />;
      default: return <Home onNavigate={navigate} searchQuery="" favorites={[]} onToggleFavorite={()=>{}} recent={[]} />;
    }
  }, [nav, searchQuery]);

  return (
    <Layout 
      searchQuery={searchQuery}
      onNavigate={navigate} 
      onSearch={setSearchQuery}
    >
      <AddonLayer />
      {activeView}
    </Layout>
  );
};

export default App;
