
import React, { useEffect } from 'react';
import { Tool } from '../types';

interface ToolSEOContentProps {
  tool: Tool;
}

const ToolSEOContent: React.FC<ToolSEOContentProps> = ({ tool }) => {
  // 🧩 AUTO FAQ GENERATOR (Unique per tool)
  const faqs = tool.faqs || [
    { 
      q: `Is this ${tool.title} tool safe to use?`, 
      a: `Yes, safety is our priority. Our ${tool.title} runs entirely in your browser. This means your data is never uploaded to our servers, keeping your information 100% private and secure.` 
    },
    { 
      q: `Can I use ${tool.title} for free without an account?`, 
      a: `Absolutely. You can use our ${tool.title} and all other 500+ utilities on ToolVerse for free, with no signup, no registration, and no daily limits.` 
    },
    { 
      q: `Does the ${tool.title} work on mobile devices?`, 
      a: `Yes, ToolVerse is fully responsive. You can access the ${tool.title} on any smartphone, tablet, or desktop browser instantly.` 
    }
  ];

  const useCases = tool.useCases || [
    `Streamlining professional digital workflows.`,
    `Quick utility processing for students and academics.`,
    `Secure data handling for privacy-conscious users.`,
    `Fast content generation for social media managers.`
  ];

  const howToSteps = tool.howTo || [
    `Open the ${tool.title} page on ToolVerse.`,
    `Enter or upload your data into the input field provided.`,
    `Configure any optional settings to customize your result.`,
    `Click the primary action button to process your request.`,
    `Copy or download your final generated result instantly.`
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
    <div className="space-y-20 mt-16 pb-10 border-t border-slate-100 pt-20">
      {/* 1. HOW TO USE (H2) */}
      <section className="prose prose-slate max-w-none">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 flex items-center gap-4">
           <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-xs">1</span>
           How to Use {tool.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ol className="space-y-4 list-decimal pl-5">
            {howToSteps.map((step, i) => (
              <li key={i} className="text-slate-600 font-medium leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
          <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 flex flex-col justify-center">
             <div className="text-indigo-600 font-black text-sm uppercase tracking-widest mb-2">Pro Tip</div>
             <p className="text-indigo-800 text-sm font-medium italic">"Combine this with our other developer tools for a full production-ready pipeline."</p>
          </div>
        </div>
      </section>

      {/* 2. WHY USE THIS TOOL (H2) */}
      <section className="prose prose-slate max-w-none bg-slate-950 p-10 md:p-16 rounded-[3rem] text-white">
        <h2 className="text-2xl md:text-3xl font-black text-white mb-8">
           Why choose ToolVerse {tool.title}?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
             { t: "100% Free", d: "No hidden costs or credits." },
             { t: "Zero Wait", d: "Sub-second local processing." },
             { t: "Privacy-Safe", d: "Data never leaves your browser." },
             { t: "Verified", d: "Production-grade accuracy." }
           ].map((f, i) => (
             <div key={i} className="space-y-2">
               <div className="text-emerald-400 font-black text-xs uppercase tracking-widest">{f.t}</div>
               <div className="text-slate-400 text-xs font-medium leading-relaxed">{f.d}</div>
             </div>
           ))}
        </div>
      </section>

      {/* 3. USE CASES (H2) */}
      <section className="prose prose-slate max-w-none">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8">
           Professional Use Cases
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
          {useCases.map((use, i) => (
            <li key={i} className="text-slate-600 text-sm font-medium leading-relaxed flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full flex-shrink-0"></div>
              {use}
            </li>
          ))}
        </ul>
      </section>

      {/* 4. FAQs (H2) - SEO GOLD */}
      <section className="space-y-12">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-500 text-sm font-medium">Common questions about our {tool.title} answered by our engineering team.</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group p-6 bg-white rounded-3xl border border-slate-100 hover:border-indigo-200 transition-all cursor-pointer">
              <summary className="flex justify-between items-center list-none font-black text-slate-900 text-sm">
                {faq.q}
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <p className="mt-4 text-xs text-slate-500 leading-relaxed font-medium pt-4 border-t border-slate-50">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ToolSEOContent;
