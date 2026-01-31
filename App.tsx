import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ToolPage from './pages/ToolPage';
import Directory from './pages/Directory';
import CategoryPage from './pages/CategoryPage';
import GuidedFlowPage from './pages/GuidedFlowPage';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import AddonLayer from './components/AddonLayer';

// Navigation Adapter for standard React Router usage
const NavigationWrapper: React.FC<{ children: (navigate: any) => React.ReactNode }> = ({ children }) => {
  const navigate = (page: string, params?: any) => {
    let url = '/';
    if (page === 'tool') url = `/tools/${params.slug}`;
    if (page === 'category') url = `/category/${params.id}`;
    if (page === 'directory') url = '/directory';
    if (page === 'flow') url = `/flow/${params.hubId}`;
    if (page === 'home') url = '/';
    if (page === 'about') url = '/about';
    
    window.location.href = url; // Standard navigation
  };
  return <>{children(navigate)}</>;
};

const ToolRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  return (
    <NavigationWrapper>
      {(navigate) => <ToolPage slug={slug || ''} onNavigate={navigate} />}
    </NavigationWrapper>
  );
};

const CategoryRoute = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <NavigationWrapper>
      {(navigate) => <CategoryPage categoryId={id || ''} onNavigate={navigate} />}
    </NavigationWrapper>
  );
};

const FlowRoute = () => {
  const { hubId } = useParams<{ hubId: string }>();
  return (
    <NavigationWrapper>
      {(navigate) => <GuidedFlowPage hubId={hubId || ''} onNavigate={navigate} />}
    </NavigationWrapper>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout onNavigate={(page, params) => {
          let url = '/';
          if (page === 'tool') url = `/tools/${params.slug}`;
          if (page === 'category') url = `/category/${params.id}`;
          if (page === 'directory') url = '/directory';
          if (page === 'home') url = '/';
          window.location.href = url;
      }}>
        <AddonLayer />
        <Routes>
          <Route path="/" element={<Home onNavigate={(p, pr) => {
              if (p === 'tool') window.location.href = `/tools/${pr.slug}`;
              if (p === 'directory') window.location.href = '/directory';
              if (p === 'flow') window.location.href = `/flow/${pr.hubId}`;
          }} favorites={[]} onToggleFavorite={() => {}} recent={[]} />} />
          
          <Route path="/tools/:slug" element={<ToolRoute />} />
          <Route path="/category/:id" element={<CategoryRoute />} />
          <Route path="/flow/:hubId" element={<FlowRoute />} />
          <Route path="/directory" element={<Directory onNavigate={(p, pr) => window.location.href = `/tools/${pr.slug}`} favorites={[]} onToggleFavorite={() => {}} />} />
          
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;