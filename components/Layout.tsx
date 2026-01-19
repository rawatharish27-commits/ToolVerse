
import React, { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string, params?: any) => void;
  onSearch?: (query: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate, onSearch }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchVal(val);
    if (onSearch) onSearch(val);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 glass bg-white/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center cursor-pointer group"
              onClick={() => onNavigate('home')}
            >
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-3 group-hover:scale-110 transition-transform">
                TV
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                Tool<span className="text-indigo-600">Verse</span>
              </span>
            </div>

            <nav className="hidden lg:flex space-x-8">
              <button onClick={() => onNavigate('home')} className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Home</button>
              <div className="relative group">
                <button className="text-slate-600 group-hover:text-indigo-600 font-medium flex items-center transition-colors">
                  Categories
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className="absolute left-0 mt-2 w-56 glass bg-white rounded-xl shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => onNavigate('category', { id: cat.id })}
                        className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        {cat.icon} {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Premium</button>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex relative">
                <input 
                  type="text" 
                  value={searchVal}
                  onChange={handleSearchChange}
                  placeholder="Search 500+ tools..." 
                  className="w-64 pl-10 pr-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <button className="lg:hidden p-2 text-slate-600" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-white font-bold mb-4">Explore</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => onNavigate('home')} className="hover:text-white">Trending Tools</button></li>
                <li><button className="hover:text-white">Latest Tools</button></li>
                <li><button className="hover:text-white">API Docs</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Categories</h3>
              <ul className="space-y-2 text-sm">
                {CATEGORIES.slice(0, 4).map(cat => (
                  <li key={cat.id}><button onClick={() => onNavigate('category', { id: cat.id })} className="hover:text-white">{cat.name}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Policy</h3>
              <ul className="space-y-2 text-sm">
                <li><button className="hover:text-white">Privacy</button></li>
                <li><button className="hover:text-white">Terms</button></li>
                <li><button className="hover:text-white">Cookies</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Follow Us</h3>
              <p className="text-xs mb-4">Stay updated with our newest free tool releases!</p>
              <div className="flex justify-center sm:justify-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-indigo-600 transition-colors cursor-pointer" />
                <div className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-indigo-600 transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
            <p>&copy; 2024 ToolVerse. World's Largest Free Online Tools Platform.</p>
            <p className="mt-4 md:mt-0 font-bold text-indigo-500">Fast. Secure. 100% Client-Side.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
