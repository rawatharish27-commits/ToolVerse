import React from 'react';
import SEOHead from '../components/SEOHead';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-32 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <SEOHead 
        title="Privacy & Security Center" 
        description="ToolVerse is a privacy-first platform. Our zero-upload policy means your data never leaves your device. Learn about our client-side processing." 
        url="https://toolverse-4gr.pages.dev/privacy" 
      />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            <span className="mr-2">🛡️</span> Secure & Anonymous
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 tracking-tight leading-none">
            Privacy is <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">The Core Engine.</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium">Last Updated: October 2025 • Guaranteed Zero-Storage</p>
        </div>

        <div className="space-y-12">
          {/* Section: Local Processing */}
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">💻</div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">1. Client-Side WASM Execution</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  At ToolVerse, we believe your data belongs to you. Unlike traditional cloud tools, we utilize <strong>WebAssembly (WASM)</strong> to bring professional-grade processing power directly into your browser. 
                </p>
                <div className="mt-6 flex items-center text-emerald-600 font-bold text-sm bg-emerald-50 px-5 py-3 rounded-2xl inline-flex border border-emerald-100">
                  <span className="mr-3">✓</span> All files stay in your device RAM. No uploads. No servers.
                </div>
              </div>
            </div>
          </div>

          {/* Section: No Accounts */}
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">🚫</div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">2. Zero Registration Requirement</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  We don't want your email. We don't want your name. We don't track your identity. ToolVerse is designed to be a "hit-and-run" utility platform. Use what you need and leave without a digital footprint.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Cookies */}
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">🍪</div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">3. Responsible Analytics</h2>
                <p className="text-slate-600 leading-relaxed text-lg mb-4">
                  We use browser <strong>Local Storage</strong> to save your 'Favorites' list locally. This never touches our database—it exists only on your device.
                </p>
                <p className="text-slate-600 leading-relaxed text-lg">
                  We use anonymized Google Analytics (GA4) with IP masking to understand which tools are popular. This helps us decide which new utilities to build next.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Advertising */}
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">📢</div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">4. Non-Intrusive Advertising</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Displaying ads is the only way we can offer 500+ premium tools for free. Our partners, including Google AdSense, may use cookies to serve personalized ads based on your generic browsing history.
                </p>
              </div>
            </div>
          </div>

          <section className="pt-12">
            <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Technical Security Audit</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'WASM Sandbox', icon: '📦', desc: 'Tools run in an isolated browser sandbox.' },
                { title: 'SSL/TLS 1.3', icon: '🔑', desc: 'Military-grade transport encryption.' },
                { title: 'ISO Compliant', icon: '🌐', desc: 'Built following global safety standards.' }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white transition-colors">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate-900 rounded-[3rem] p-12 text-center text-white mt-12 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-black mb-4 tracking-tight">Any Questions?</h2>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto font-medium leading-relaxed">
                We are open about our code. If you have security concerns or suggestions for our WASM implementation, reach out to our team.
              </p>
              <a href="mailto:security@toolverse.com" className="inline-block px-12 py-6 bg-white text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-emerald-50 transition-all transform hover:-translate-y-1">
                Contact Security Officer
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;