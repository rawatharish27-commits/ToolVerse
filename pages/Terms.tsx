import React from 'react';
import SEOHead from '../components/SEOHead';

const Terms: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-32 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <SEOHead 
        title="Terms of Service - Professional Usage Agreement" 
        description="Read the ToolVerse Terms of Service. Clear, transparent, and fair usage policies for our 500+ free online professional utilities." 
        url="https://toolverse.com/#terms" 
      />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            <span className="mr-2">📜</span> Fair & Transparent
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 tracking-tight leading-none">
            Terms of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-slate-600">Service.</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium">Effective Date: October 2025 • Version 1.4</p>
        </div>

        <div className="space-y-12">
          {/* Section 1: Agreement */}
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">🤝</div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">1. Acceptance of Terms</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  By accessing or using the ToolVerse platform, you agree to be bound by these terms. If you do not agree with any part of these terms, you must immediately discontinue use of all services and tools provided by ToolVerse.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Pro Use */}
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">🚀</div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">2. Commercial & Personal Use</h2>
                <p className="text-slate-600 leading-relaxed text-lg mb-4">
                  ToolVerse grants you a free, non-exclusive, non-transferable license to use our tools for both personal and professional commercial purposes. 
                </p>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-sm font-medium text-slate-500">
                  <span className="font-black text-slate-900 uppercase tracking-tighter mr-2">Prohibit:</span> 
                  You may not "scrape", redistribute, or wrap our tools in a paid service without explicit written permission from our engineering team.
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Liability */}
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">⚠️</div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">3. Limitation of Liability</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  ToolVerse provides all tools "as is" and "as available". While our engines (WASM, JS, AI) are production-grade, we do not guarantee 100% uptime or error-free results. We are not liable for any data loss, loss of profits, or business interruption resulting from the use of our platform.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: AI Usage */}
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">🤖</div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">4. AI-Generated Content</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Content generated via our AI Hub (powered by Gemini) is yours to use. However, you are responsible for fact-checking and ensuring that AI-generated content adheres to your local legal and ethical standards.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Modifications */}
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">🔄</div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">5. Policy Modifications</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  We reserve the right to modify these terms at any time. Significant changes will be announced via our "Site Status" bar. Continued use of the platform after changes constitutes acceptance.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Summary Grid */}
          <section className="pt-12">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'Free Forever', value: '100%' },
                  { title: 'Commercial Use', value: 'ALLOWED' },
                  { title: 'No Registration', value: 'REQUIRED' },
                  { title: 'Data Privacy', value: 'ENFORCED' }
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-900 p-8 rounded-3xl text-center shadow-lg">
                     <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                     <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.title}</div>
                  </div>
                ))}
             </div>
          </section>

          {/* Contact Section */}
          <section className="bg-indigo-600 rounded-[3rem] p-12 text-center text-white mt-12 overflow-hidden relative shadow-2xl shadow-indigo-600/30">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-black mb-4 tracking-tight">Legal Inquiries?</h2>
              <p className="text-indigo-100 mb-8 max-w-lg mx-auto font-medium leading-relaxed opacity-90">
                Our legal department is available for licensing discussions or clarification on professional usage rights.
              </p>
              <a href="mailto:legal@toolverse.com" className="inline-block px-12 py-6 bg-white text-indigo-600 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-slate-50 transition-all transform hover:-translate-y-1">
                Contact Legal Hub
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
