
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import Directory from './pages/Directory';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import AddonLayer from './components/AddonLayer';
import { ToolRegistry } from './core/toolRegistry';

const ToolRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = ToolRegistry.getToolBySlug(slug || '');
  
  if (!tool) return <Navigate to="/directory" replace />;
  
  const ToolComponent = tool.component;
  
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-black text-[10px] text-slate-400 uppercase tracking-widest">Mounting Logic Node...</p>
      </div>
    }>
      <ToolComponent />
    </Suspense>
  );
};

// Fix: Explicitly defined NavigationWrapperProps and switched to a 'render' prop pattern to resolve the 'children missing' JSX type error
interface NavigationWrapperProps {
  render: (onNavigate: (page: string, params?: any) => void) => React.ReactNode;
}

const NavigationWrapper: React.FC<NavigationWrapperProps> = ({ render }) => {
  const navigate = useNavigate();
  const onNavigate = (page: string, params?: any) => {
    if (page === 'home') navigate('/');
    else if (page === 'tool') navigate(`/tool/${params.slug}`);
    else if (page === 'category') navigate(`/category/${params.id}`);
    else navigate(`/${page}`);
  };
  return <>{render(onNavigate)}</>;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* Fix: NavigationWrapper now uses a render prop to avoid common TypeScript JSX function-as-child type mismatches */}
      <NavigationWrapper render={(onNavigate) => (
        <Layout onNavigate={onNavigate}>
          <AddonLayer />
          <Routes>
            <Route path="/" element={<Home onNavigate={onNavigate} favorites={[]} onToggleFavorite={() => {}} recent={[]} />} />
            <Route path="/tool/:slug" element={<ToolRoute />} />
            <Route path="/category/:id" element={<CategoryPage onNavigate={onNavigate} />} />
            <Route path="/directory" element={<Directory onNavigate={onNavigate} favorites={[]} onToggleFavorite={() => {}} />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      )} />
    </BrowserRouter>
  );
};

export default App;
