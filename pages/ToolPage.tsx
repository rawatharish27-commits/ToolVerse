
import React, { useMemo } from 'react';
import { ToolRegistry } from '../core/toolRegistry';
import AdSenseManager from '../components/AdSenseManager';
import SEOHead from '../components/SEOHead';
import UniversalSEOLayer from '../components/UniversalSEOLayer';
import GenericToolView from '../components/GenericToolView';
import RightSideMenu from '../components/RightSideMenu';

interface Props {
  slug: string;
  onNavigate: (page: string, params?: any) => void;
}

const ToolPage: React.FC<Props> = ({ slug, onNavigate }) => {
  const tool = useMemo(() => ToolRegistry.getToolBySlug(slug), [slug]);

  if (!tool) {
    return (
      <div className="p-40 text-center space-y-8">
        <div className="text-9xl opacity-10">404</div>
        <h2 className="text-2xl font-black text-slate-300 uppercase tracking-widest">Logic Node Not Found</h2>
        <button onClick={() => onNavigate('home')} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest">Back to Origin</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SEOHead tool={tool} />
      <UniversalSEOLayer tool={tool} />
      
      <div className="max-w-[1600px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <main className="lg:col-span-8">
            <GenericToolView 
              slug={tool.slug} 
              title={tool.title} 
              description={tool.description} 
              category={tool.category} 
              icon={tool.icon || '🛠️'} 
            />
            <AdSenseManager slotId={`TOOL_${tool.slug.toUpperCase()}`} type="INLINE" className="mt-12" />
          </main>

          <aside className="lg:col-span-4">
             <RightSideMenu onNavigate={onNavigate} />
          </aside>

        </div>
      </div>
    </div>
  );
};

export default ToolPage;
