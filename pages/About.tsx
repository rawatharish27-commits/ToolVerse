import React from 'react';
import SEOHead from '../components/SEOHead';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-32 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <SEOHead 
        title="About ToolVerse - Our Mission & Privacy Standards" 
        description="Learn about ToolVerse, the world's largest free online tools platform. Privacy-first, ultra-fast, and 100% browser-native utilities." 
        url="https://toolverse-4gr.pages.dev/about" 
      />

      <div className="max-w-4xl">
        <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-12 tracking-tight leading-none">
          Our mission is <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Pure Utility.</span>
        </h1>

        <div className="space-y-16 text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
          <section className="space-y-6">
            <p>
              ToolVerse was born out of a simple frustration: the web is full of "free" tools that are slow, 
              cluttered with intrusive ads, and—most importantly—require you to upload your sensitive data to mysterious servers.
            </p>
            <p>
              We decided to build something different. A production-ready ecosystem of over 500 professional 
              utilities that run entirely within your browser.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
            <div className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
               <div className="text-4xl mb-6">🔒</div>
               <h3 className="text-2xl font-black text-indigo-900 mb-4">Privacy First</h3>
               <p className="text-base text-indigo-700 leading-relaxed">
                 We utilize WebAssembly (WASM) and modern JavaScript engines to process your files locally. 
                 Your PDFs, images, and videos never leave your device.
               </p>
            </div>
            <div className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100">
               <div className="text-4xl mb-6">⚡</div>
               <h3 className="text-2xl font-black text-emerald-900 mb-4">Zero Latency</h3>
               <p className="text-base text-emerald-700 leading-relaxed">
                 By removing the "upload-process-download" cycle, our tools work at the speed of your processor. 
                 Instant results, every single time.
               </p>
            </div>
          </div>

          <section className="space-y-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">How we keep it free</h2>
            <p>
              ToolVerse is supported by non-intrusive, privacy-respecting advertisements. This allows us 
              to maintain our infrastructure and continue developing new tools without ever charging 
              our users a single cent.
            </p>
            <p>
              We are constantly expanding our library. Whether you're a developer needing a JSON formatter, 
              a student converting a PDF, or a content creator generating AI articles, ToolVerse is 
              your permanent workspace.
            </p>
          </section>

          <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">TV</div>
              <div>
                <div className="text-slate-900 font-black text-sm uppercase tracking-widest">ToolVerse Core Team</div>
                <div className="text-slate-400 text-xs font-bold uppercase tracking-tighter">Engineering the Future of Utility</div>
              </div>
            </div>
            <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-indigo-600 transition-all transform hover:-translate-y-1">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;