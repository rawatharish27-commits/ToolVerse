import React, { useState } from 'react';
import { TOOLS } from '../../data/tools';
import { CATEGORIES } from '../../data/categories';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const SEOTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [inputText, setInputText] = useState('');
  const [baseUrl, setBaseUrl] = useState('https://toolverse.com');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        switch (slug) {
          case 'xml-sitemap-generator': {
            let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
            sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
            
            // Add Home
            sitemap += `  <url>\n    <loc>${baseUrl}/</loc>\n    <priority>1.0</priority>\n  </url>\n`;
            
            // Add Categories
            CATEGORIES.forEach(cat => {
              sitemap += `  <url>\n    <loc>${baseUrl}/#category/${cat.id}</loc>\n    <priority>0.8</priority>\n  </url>\n`;
            });

            // Add Tools
            TOOLS.forEach(tool => {
              sitemap += `  <url>\n    <loc>${baseUrl}/#tool/${tool.slug}</loc>\n    <priority>0.6</priority>\n  </url>\n`;
            });

            sitemap += '</urlset>';
            setResult(sitemap);
            onSuccess("Sitemap Generated!");
            break;
          }

          case 'json-ld-schema-pro': {
            const schema = {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "ToolVerse Professional Suite",
              "url": baseUrl,
              "description": "The world's largest free online tools platform for developers and designers.",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            };
            setResult(JSON.stringify(schema, null, 2));
            onSuccess("Schema Generated!");
            break;
          }

          case 'canonical-tag-generator': {
            const tag = `<link rel="canonical" href="${baseUrl}${inputText}" />`;
            setResult(tag);
            onSuccess("Canonical Tag Created!");
            break;
          }

          case 'index-now-ping': {
            setResult(`POST https://bing.com/indexnow\nContent-Type: application/json\n\n{\n  "host": "${baseUrl.replace('https://', '')}",\n  "key": "TOOLVERSE_SECRET_KEY",\n  "urlList": ["${baseUrl}/#tool/${inputText}"]\n}`);
            onSuccess("Ping Simulation Ready!");
            break;
          }

          default:
            setResult(`Auto-SEO Logic for ${slug} is processing...`);
        }
      } catch (err) {
        onError("SEO engine error.");
      }
      setLoading(false);
    }, 800);
  };

  const downloadFile = () => {
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = slug + (slug.includes('xml') ? '.xml' : '.txt');
    a.click();
  };

  return (
    <div className="py-8 text-left space-y-8 max-w-2xl mx-auto">
      <div className="text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-slate-900">Professional SEO Automation</h2>
      </div>

      <div className="space-y-4">
        <label className="block text-xs font-bold text-slate-500 uppercase">Base Website URL</label>
        <input 
          type="text" 
          value={baseUrl} 
          onChange={e => setBaseUrl(e.target.value)} 
          className="w-full p-4 border rounded-2xl bg-white shadow-sm focus:ring-2 focus:ring-indigo-500" 
        />
      </div>

      {(slug === 'canonical-tag-generator' || slug === 'index-now-ping') && (
        <div className="space-y-4">
          <label className="block text-xs font-bold text-slate-500 uppercase">Page Path (e.g. /tool/pdf-merge)</label>
          <input 
            type="text" 
            value={inputText} 
            onChange={e => setInputText(e.target.value)} 
            className="w-full p-4 border rounded-2xl bg-white shadow-sm focus:ring-2 focus:ring-indigo-500" 
          />
        </div>
      )}

      <button 
        onClick={handleGenerate} 
        disabled={loading}
        className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
      >
        {loading ? "Optimizing SEO..." : "Generate SEO Assets"}
      </button>

      {result && (
        <div className="space-y-4 animate-in fade-in zoom-in duration-300">
          <div className="flex justify-between items-center px-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SEO Snippet Ready</span>
            <div className="flex gap-2">
               <button onClick={downloadFile} className="text-[10px] font-bold text-indigo-600 hover:underline">Download</button>
               <button onClick={() => { navigator.clipboard.writeText(result); onSuccess("Copied!"); }} className="text-[10px] font-bold text-emerald-600 hover:underline">Copy</button>
            </div>
          </div>
          <div className="bg-slate-900 text-emerald-400 p-6 rounded-3xl font-mono text-xs overflow-x-auto whitespace-pre leading-relaxed shadow-2xl border border-slate-800">
            {result}
          </div>
        </div>
      )}
    </div>
  );
};

export default SEOTools;