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
  const [baseUrl, setBaseUrl] = useState('https://toolverse-4gr.pages.dev');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        switch (slug) {
          case 'xml-sitemap-generator':
          case 'sitemap-generator': {
            let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
            sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
            
            const today = new Date().toISOString().split('T')[0];

            // Root
            sitemap += `  <url>\n    <loc>${baseUrl}/</loc>\n    <lastmod>${today}</lastmod>\n    <priority>1.0</priority>\n  </url>\n`;
            
            // Categories (Clean URLs)
            CATEGORIES.forEach(cat => {
              sitemap += `  <url>\n    <loc>${baseUrl}/category/${cat.id}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>0.8</priority>\n  </url>\n`;
            });

            // 300+ Tools Batch Processing (Clean URLs)
            TOOLS.forEach(tool => {
              sitemap += `  <url>\n    <loc>${baseUrl}/tool/${tool.slug}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>0.7</priority>\n    <changefreq>monthly</changefreq>\n  </url>\n`;
            });

            sitemap += '</urlset>';
            setResult(sitemap);
            onSuccess("Complete XML Sitemap Ready!");
            break;
          }

          case 'json-ld-schema-pro':
          case 'schema-generator': {
            const schema = {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "ToolVerse Professional Suite",
              "url": baseUrl,
              "description": "Access 500+ free online tools for PDF, Images, Video, and Development.",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "ToolVerse Team"
              }
            };
            setResult(JSON.stringify(schema, null, 2));
            onSuccess("JSON-LD Schema Generated!");
            break;
          }

          case 'canonical-tag-generator': {
            const tag = `<link rel="canonical" href="${baseUrl}${inputText.startsWith('/') ? '' : '/'}${inputText}" />`;
            setResult(tag);
            onSuccess("Canonical Tag Created!");
            break;
          }

          case 'index-now-ping': {
            setResult(`POST https://bing.com/indexnow\nContent-Type: application/json\n\n{\n  "host": "${baseUrl.replace('https://', '').replace('http://', '')}",\n  "key": "TOOLVERSE_SECRET_KEY_PRO",\n  "keyLocation": "${baseUrl}/key.txt",\n  "urlList": [\n    "${baseUrl}/tool/${inputText}"\n  ]\n}`);
            onSuccess("IndexNow Configuration Ready!");
            break;
          }

          case 'robots-generator': {
            const robots = `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: ${baseUrl}/sitemap.xml`;
            setResult(robots);
            onSuccess("Robots.txt Generated!");
            break;
          }

          default:
            setResult(`Auto-SEO logic is processing your request for ${slug}...`);
        }
      } catch (err) {
        onError("SEO engine encountered a data error.");
      }
      setLoading(false);
    }, 600);
  };

  const downloadFile = () => {
    const isXml = result.includes('<?xml');
    const blob = new Blob([result], { type: isXml ? 'application/xml' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = slug + (isXml ? '.xml' : '.txt');
    a.click();
  };

  return (
    <div className="py-8 text-left space-y-8 max-w-2xl mx-auto">
      <div className="text-center">
        <div className="text-6xl mb-4">⚙️</div>
        <h2 className="text-2xl font-black text-slate-900">SEO Automation Suite</h2>
        <p className="text-slate-400 text-sm mt-1">Generate production-grade meta-assets instantly.</p>
      </div>

      <div className="space-y-4">
        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Base Domain URL</label>
        <input 
          type="text" 
          value={baseUrl} 
          onChange={e => setBaseUrl(e.target.value)} 
          className="w-full p-4 border rounded-2xl bg-white shadow-sm focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all" 
        />
      </div>

      {(slug.includes('canonical') || slug.includes('index-now')) && (
        <div className="space-y-4">
          <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Target Path (e.g. tool/pdf-merge)</label>
          <input 
            type="text" 
            value={inputText} 
            onChange={e => setInputText(e.target.value)} 
            placeholder="tool/slug-name"
            className="w-full p-4 border rounded-2xl bg-white shadow-sm focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all" 
          />
        </div>
      )}

      <button 
        onClick={handleGenerate} 
        disabled={loading}
        className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xl shadow-xl hover:bg-indigo-600 transition-all active:scale-95 disabled:opacity-50"
      >
        {loading ? "Optimizing Assets..." : "Generate Master Output"}
      </button>

      {result && (
        <div className="space-y-4 animate-in slide-in-from-top duration-300">
          <div className="flex justify-between items-center px-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Final Code Block</span>
            <div className="flex gap-4">
               <button onClick={downloadFile} className="text-xs font-bold text-indigo-600 hover:underline">Download</button>
               <button onClick={() => { navigator.clipboard.writeText(result); onSuccess("Copied!"); }} className="text-xs font-bold text-emerald-600 hover:underline">Copy Code</button>
            </div>
          </div>
          <div className="bg-slate-900 text-emerald-400 p-8 rounded-[2rem] font-mono text-[11px] overflow-x-auto whitespace-pre leading-relaxed shadow-2xl border border-slate-800 scrollbar-thin scrollbar-thumb-slate-700">
            {result}
          </div>
        </div>
      )}
    </div>
  );
};

export default SEOTools;