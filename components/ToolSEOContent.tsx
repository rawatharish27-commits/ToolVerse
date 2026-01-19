
import React, { useEffect } from 'react';
import { Tool } from '../types';

interface ToolSEOContentProps {
  tool: Tool;
}

const ToolSEOContent: React.FC<ToolSEOContentProps> = ({ tool }) => {
  // Programmatic FAQ Generation
  const faqs = tool.faqs || [
    { 
      q: `Is ${tool.title} really free to use?`, 
      a: `Yes, ToolVerse provides ${tool.title} as a completely free utility. There are no hidden fees, subscriptions, or account requirements.` 
    },
    { 
      q: `Is my data safe when using ${tool.title}?`, 
      a: `Privacy is our priority. Since this is a browser-based tool, your files are processed locally. No data is ever uploaded to our servers.` 
    },
    { 
      q: `Does this ${tool.category} tool work on mobile?`, 
      a: `Yes! Our platform is fully responsive and works perfectly on iPhone, Android, and tablets without any installation.` 
    }
  ];

  // Programmatic How-To Steps
  const howToSteps = tool.howTo || [
    `Navigate to the ${tool.title} page on the ToolVerse portal.`,
    `Input your data or upload your ${tool.category}-related file.`,
    `Adjust the settings to match your specific requirements.`,
    `Click the "Generate" or "Process" button to start the utility.`,
    `Instantly download or copy the processed result to your device.`
  ];

  // Programmatic Feature List
  const features = tool.features || [
    `High-Speed Processing: Powered by modern browser WASM/JS engines.`,
    `Zero Data Collection: We never store your inputs or files.`,
    `No Registration: Start using our 500+ tools immediately.`,
    `Professional Grade: High accuracy results for ${tool.category} tasks.`
  ];

  // Inject FAQ Schema for Google Rich Snippets
  useEffect(() => {
    const existingSchema = document.getElementById('faq-schema');
    if (existingSchema) existingSchema.remove();

    const script = document.createElement('script');
    script.id = 'faq-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    });
    document.head.appendChild(script);
  }, [tool, faqs]);

  return (
    <div className="space-y-16 mt-16 pb-16">
      {/* Dynamic Intro Section */}
      <section className="prose prose-slate lg:prose-lg max-w-none">
        <h2 className="text-3xl font-black text-slate-900 border-l-4 border-indigo-600 pl-4 mb-6">
          About {tool.title}
        </h2>
        <p className="text-slate-600 leading-relaxed text-lg italic">
          {tool.longDescription || `${tool.title} is part of the world's largest free online tools ecosystem. It offers a specialized interface for handling ${tool.category} workflows directly in your browser. Whether you are a professional developer, a student, or a business user, this utility provides the speed and reliability you need for daily digital tasks.`}
        </p>
      </section>

      {/* Use Cases Section (Programmatic) */}
      {tool.useCases && tool.useCases.length > 0 && (
        <section className="bg-indigo-50/30 rounded-[2.5rem] p-8 border border-indigo-100">
           <h3 className="text-xl font-bold text-indigo-900 mb-6 flex items-center">
             <span className="mr-3">💡</span> Common Use Cases
           </h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tool.useCases.map((uc, i) => (
                <div key={i} className="flex items-center text-indigo-700 bg-white px-4 py-3 rounded-xl shadow-sm border border-indigo-50">
                   <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                   <span className="text-sm font-medium">{uc}</span>
                </div>
              ))}
           </div>
        </section>
      )}

      {/* Steps & Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section>
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mr-3 text-sm font-black">1</span>
            Simple 5-Step Guide
          </h3>
          <ul className="space-y-4">
            {howToSteps.map((step, i) => (
              <li key={i} className="flex items-start text-slate-600 text-sm">
                <span className="text-indigo-600 font-black mr-3 mt-0.5">→</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mr-3 text-sm font-black">2</span>
            Utility Benefits
          </h3>
          <ul className="space-y-4">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start text-slate-600 text-sm">
                <svg className="w-4 h-4 text-emerald-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* FAQ Accordion Grid */}
      <section className="bg-slate-50 rounded-[3rem] p-8 md:p-12 border border-slate-100">
        <h2 className="text-2xl font-black text-slate-900 mb-10 text-center uppercase tracking-widest">Questions & Answers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 group hover:border-indigo-200 transition-all">
              <h4 className="font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{faq.q}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <div className="flex flex-wrap justify-center gap-6 py-8 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
        <div className="flex items-center text-xs font-black uppercase tracking-widest"><span className="text-2xl mr-2">🔒</span> SSL Secure</div>
        <div className="flex items-center text-xs font-black uppercase tracking-widest"><span className="text-2xl mr-2">🛡️</span> Malware Free</div>
        <div className="flex items-center text-xs font-black uppercase tracking-widest"><span className="text-2xl mr-2">⚡</span> Fast CDN</div>
      </div>
    </div>
  );
};

export default ToolSEOContent;
