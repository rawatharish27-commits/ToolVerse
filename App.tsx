
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
    setSearchQuery(''); // Reset search on explicit navigation
    if (page === 'home') window.location.hash = '';
    else if (page === 'category') window.location.hash = `category/${params.id}`;
    else if (page === 'tool') window.location.hash = `tool/${params.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (nav.page) {
      case 'home':
        return <Home onNavigate={navigate} searchQuery={searchQuery} />;
      case 'category':
        return <CategoryPage categoryId={nav.params.id} onNavigate={navigate} />;
      case 'tool':
        return <ToolPage slug={nav.params.slug} onNavigate={navigate} />;
      default:
        return <Home onNavigate={navigate} searchQuery={searchQuery} />;
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
