
import React, { useEffect } from 'react';
import { Tool } from '../types';

interface ToolSEOContentProps {
  tool: Tool;
}

const ToolSEOContent: React.FC<ToolSEOContentProps> = ({ tool }) => {
  const faqs = tool.faqs || [
    { 
      q: `Is ${tool.title} completely free for commercial use?`, 
      a: `Yes, ${tool.title} is part of the ToolVerse ecosystem, which provides professional-grade utilities at zero cost. You can use the results for personal projects, business workflows, or client work without any attribution required.` 
    },
    { 
      q: `How does ToolVerse handle my data privacy?`, 
      a: `ToolVerse is built on a "Privacy-First" architecture. Your inputs are processed directly in your browser using local logic engines. We never upload, store, or see your private data.` 
    },
    { 
      q: `Do I need to install any software to use this ${tool.category} tool?`, 
      a: `No installation is needed. Our platform works instantly in any modern web browser on Desktop, Tablet, or Mobile (iOS & Android).` 
    }
  ];

  const howToSteps = tool.howTo || [
    `Open the ${tool.title} interface on ToolVerse.`,
    `Enter your source data or content in the primary workspace.`,
    `Select your desired parameters from the 'Tool Parameters' sidebar.`,
    `Click the 'Process' or 'Generate' button to engage the local engine.`,
    `Copy or download the high-fidelity result instantly.`
  ];

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
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    });
    document.head.appendChild(script);
  }, [tool, faqs]);

  return (
    <div className="space-y-20 mt-20 pb-20 border-t border-slate-100 pt-20">
      {/* 1. EDITORIAL INTRO (SEO GOLD) */}
      <article className="prose prose-slate lg:prose-xl max-w-none">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-8">
          The Professional Guide to <span className="text-indigo-600">{tool.title}</span>
        </h2>
        <p className="text-slate-600 leading-relaxed">
          {tool.longDescription || `Master your ${tool.category} workflows with ${tool.title}, the industry-standard browser utility designed for speed and precision. In today's digital environment, efficiency is paramount. ToolVerse provides the infrastructure to handle complex tasks locally, ensuring 100% data privacy while delivering professional results in milliseconds.`}
        </p>
      </article>

      {/* 2. HOW-TO & USE CASES (SEARCH INTENT) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
          <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center">
            <span className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center mr-4 text-sm shadow-lg">01</span>
            Step-by-Step Tutorial
          </h3>
          <ul className="space-y-6">
            {howToSteps.map((step, i) => (
              <li key={i} className="flex items-start">
                <span className="text-indigo-600 font-black mr-4 text-lg">✓</span>
                <span className="text-slate-600 text-sm font-medium leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="p-10">
           <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center">
            <span className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center mr-4 text-sm shadow-lg">02</span>
            Key Utility Benefits
          </h3>
          <div className="space-y-4">
             {[
               { t: 'Local Processing', d: 'Zero data ever leaves your device.' },
               { t: 'High Precision', d: 'Engineered for professional accuracy.' },
               { t: 'Zero Wait-Time', d: 'Bypass cloud latency with Edge logic.' }
             ].map((f, i) => (
               <div key={i} className="group">
                  <div className="text-sm font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{f.t}</div>
                  <div className="text-xs text-slate-500 font-medium">{f.d}</div>
               </div>
             ))}
          </div>
        </section>
      </div>

      {/* 3. PRO-TIP ALERT (CTR BOOSTER) */}
      <section className="bg-indigo-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl font-black italic">PRO</div>
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="text-5xl">💡</div>
            <div>
               <h4 className="text-xl font-black mb-2">ToolVerse Expert Strategy</h4>
               <p className="text-indigo-100 text-sm font-medium leading-relaxed opacity-90">
                 For the best results with ${tool.title}, we recommend clearing your browser cache if you are processing high-volume datasets. Combine this with our other SEO and Data tools for a complete end-to-end professional workflow.
               </p>
            </div>
         </div>
      </section>

      {/* 4. FAQ GRID (FEATURED SNIPPETS) */}
      <section className="space-y-12">
        <h2 className="text-2xl font-black text-slate-900 text-center uppercase tracking-widest">Common Inquiries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, i) => (
            <div key={i} className="p-8 bg-white rounded-3xl border border-slate-100 hover:border-indigo-200 hover:shadow-xl transition-all cursor-default">
              <h4 className="font-black text-slate-900 mb-4 text-sm leading-snug">{faq.q}</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ToolSEOContent;
