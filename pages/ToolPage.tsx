
import React, { Suspense, useMemo } from 'react';
import { TOOLS } from '../data/tools';
import AdSenseManager from '../components/AdSenseManager';
import SEOManager from '../components/SEOManager';
import ToolLoader from '../components/ToolLoader';
import UniversalSEOLayer from '../components/UniversalSEOLayer';
import GenericToolView from '../components/GenericToolView';
import RightSideMenu from '../components/RightSideMenu';

interface Props {
  slug: string;
  onNavigate: (page: string, params?: any) => void;
}

const ToolPage: React.FC<Props> = ({ slug, onNavigate }) => {
  const tool = useMemo(() => TOOLS.find(t => t.slug === slug), [slug]);

  if (!tool) {
    return <div className="p-40 text-center font-black text-slate-300">404: LOGIC NODE NOT RESOLVED</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <SEOManager tool={tool} />
      <UniversalSEOLayer tool={tool} />
      
      <div className="max-w-[1600px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <main className="lg:col-span-8">
            <div className="bg-white rounded-[4rem] p-10 md:p-20 shadow-3xl border border-slate-50 mb-12 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600 opacity-20 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <Suspense fallback={<ToolLoader message="Orchestrating Logic Isolate..." />}>
                <GenericToolView 
                  slug={tool.slug} 
                  title={tool.title} 
                  description={tool.description} 
                  category={tool.category} 
                  icon={tool.icon || '🛠️'} 
                />
              </Suspense>
            </div>

            <AdSenseManager slotId={`TOOL_${tool.slug.toUpperCase()}`} type="mid" />
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
