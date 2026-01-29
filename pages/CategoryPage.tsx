
import React from 'react';
import { MASTER_REGISTRY, getAutoCategories } from '../data/tools';
import ToolCard from '../components/ToolCard';
import AdSenseManager from '../components/AdSenseManager';

interface Props {
  categoryId: string;
  onNavigate: (page: string, params?: any) => void;
}

const CategoryPage: React.FC<Props> = ({ categoryId, onNavigate }) => {
  const category = getAutoCategories().find(c => c.id === categoryId);
  const tools = MASTER_REGISTRY.filter(t => t.category === categoryId).sort((a, b) => a.title.localeCompare(b.title));

  if (!category) return <div className="p-40 text-center font-black">CATEGORY NOT RESOLVED IN MASTER REGISTRY</div>;

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-slate-950 py-24 text-center">
         <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6">{category.name}</h1>
            <p className="text-xl text-slate-400 font-medium italic">"Every node in this hub is verified for zero-upload privacy."</p>
         </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-8 py-20">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {tools.map(tool => (
              <ToolCard key={tool.slug} tool={tool} onClick={() => onNavigate('tool', { slug: tool.slug })} />
            ))}
         </div>
         
         {/* AdSense below results enforcement */}
         <div className="mt-20">
            <AdSenseManager slotId="CATEGORY_PAGE_BOTTOM" type="mid" />
         </div>
      </div>
    </div>
  );
};

export default CategoryPage;
