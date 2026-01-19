
import React from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import { CategorySlug } from '../types';
import ToolCard from '../components/ToolCard';
import AdPlaceholder from '../components/AdPlaceholder';

interface CategoryPageProps {
  categoryId: CategorySlug;
  onNavigate: (page: string, params?: any) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ categoryId, onNavigate }) => {
  const category = CATEGORIES.find(c => c.id === categoryId);
  const categoryTools = TOOLS.filter(t => t.category === categoryId);

  if (!category) return <div>Category not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-8 text-sm font-medium">
        <button onClick={() => onNavigate('home')} className="text-slate-400 hover:text-indigo-600">Home</button>
        <span className="mx-2 text-slate-300">/</span>
        <span className="text-slate-900">{category.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:flex-grow">
          <div className="flex items-center space-x-6 mb-12">
            <div className={`w-20 h-20 ${category.color} text-white rounded-3xl flex items-center justify-center text-4xl shadow-xl`}>
              {category.icon}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">{category.name}</h1>
              <p className="text-lg text-slate-500">{category.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {categoryTools.length > 0 ? (
              categoryTools.map(tool => (
                <ToolCard 
                  key={tool.slug} 
                  tool={tool} 
                  onClick={() => onNavigate('tool', { slug: tool.slug })} 
                />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-400">
                More tools for this category are being added daily. Check back soon!
              </div>
            )}
          </div>
          
          <AdPlaceholder type="inline" />
        </div>

        {/* Sidebar Ads/Featured */}
        <aside className="lg:w-80 flex-shrink-0 space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Other Categories</h3>
            <div className="space-y-2">
              {CATEGORIES.filter(c => c.id !== categoryId).slice(0, 5).map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => onNavigate('category', { id: cat.id })}
                  className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors"
                >
                  <span className="mr-3">{cat.icon}</span>
                  <span className="text-sm font-medium">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
          <AdPlaceholder type="sidebar" />
        </aside>
      </div>
    </div>
  );
};

export default CategoryPage;
