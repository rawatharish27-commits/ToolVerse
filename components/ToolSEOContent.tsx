import React, { useMemo } from 'react';
import { Tool } from '../types';

interface ToolSEOContentProps {
  tool: Tool;
}

/**
 * ToolVerse Content Display v5.0
 * Purely visual display of FAQs and User Guides.
 */
const ToolSEOContent: React.FC<ToolSEOContentProps> = ({ tool }) => {
  const faqs = useMemo(() => tool.faqs || [
    { 
      q: `Is this ${tool.title} tool safe to use?`, 
      a: `Yes, safety is our priority. Our ${tool.title} runs entirely in your browser using local logic. This means your data is never uploaded to our servers, keeping your information 100% private and secure.` 
    },
    { 
      q: `Can I use ${tool.title} for free?`, 
      a: `Absolutely. You can use our ${tool.title} and all other utilities on ToolVerse for free, with no signup and no hidden daily limits.` 
    },
    { 
      q: `Does ${tool.title} work on mobile?`, 
      a: `Yes, ToolVerse is engineered to be fully responsive. You can access the ${tool.title} on any smartphone or tablet instantly.` 
    }
  ], [tool]);

  const howToSteps = useMemo(() => tool.howTo || [
    `Open the ${tool.title} on ToolVerse.`,
    `Enter or paste your data into the input field.`,
    `Configure any optional settings in the parameters panel.`,
    `Click the primary action button to process.`,
    `Copy or download your result instantly.`
  ], [tool]);

  return (
    <div className="space-y-20 mt-16 pb-10 border-t border-slate-100 pt-20">
      {/* User Guide */}
      <section className="prose prose-slate max-w-none">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 flex items-center gap-4">
           <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-xs">1</span>
           Quick Guide: {tool.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ol className="space-y-4 list-decimal pl-5">
            {howToSteps.map((step, i) => (
              <li key={i} className="text-slate-600 font-medium leading-relaxed">{step}</li>
            ))}
          </ol>
          <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 flex flex-col justify-center">
             <div className="text-indigo-600 font-black text-sm uppercase tracking-widest mb-2">Pro Tip</div>
             <p className="text-indigo-800 text-sm font-medium italic">"Combine this tool with our AI SEO Auditor to maximize your digital workflow efficiency."</p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="bg-slate-950 p-10 md:p-16 rounded-[3rem] text-white shadow-2xl">
        <h2 className="text-2xl md:text-3xl font-black text-white mb-10">Standard Security Features</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
           {[
             { t: "Browser-Native", d: "Zero cloud latency. All processing happens in your browser." },
             { t: "Anonymous", d: "No account required. Your identity is always protected." },
             { t: "High-Speed", d: "Optimized WebAssembly cores ensure instant results." },
             { t: "Verified", d: "Logic nodes are regularly audited for accuracy and safety." }
           ].map((f, i) => (
             <div key={i} className="space-y-2 border-l border-white/10 pl-6">
               <div className="text-emerald-400 font-black text-[10px] uppercase tracking-widest">{f.t}</div>
               <p className="text-slate-400 text-xs font-medium leading-relaxed">{f.d}</p>
             </div>
           ))}
        </div>
      </section>

      {/* FAQ Display */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-500 text-sm font-medium">Clear answers regarding the {tool.title} and our platform security.</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group p-6 bg-white rounded-3xl border border-slate-100 hover:border-indigo-200 transition-all cursor-pointer shadow-sm">
              <summary className="flex justify-between items-center list-none font-black text-slate-900 text-sm">
                {faq.q}
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <div className="mt-4 text-xs text-slate-500 leading-relaxed font-medium pt-4 border-t border-slate-50">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ToolSEOContent;