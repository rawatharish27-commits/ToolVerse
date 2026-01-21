import React, { useState } from 'react';
import { TOOLS } from '../../data/tools';
import { CATEGORIES } from '../../data/categories';
import ToolLayout from '../ToolLayout';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const SEOTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [inputText, setInputText] = useState('');
  const [baseUrl, setBaseUrl] = useState('https://toolverse-4gr.pages.dev');
  const [loading, setLoading] = useState(false);
  const [resultVal, setResultVal] = useState('');

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

            sitemap += `  <url>\n    <loc>${baseUrl}/</loc>\n    <lastmod>${today}</lastmod>\n    <priority>1.0</priority>\n  </url>\n`;
            
            CATEGORIES.forEach(cat => {
              sitemap += `  <url>\n    <loc>${baseUrl}/category/${cat.id}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>0.8</priority>\n  </url>\n`;
            });

            TOOLS.forEach(tool => {
              sitemap += `  <url>\n    <loc>${baseUrl}/tool/${tool.slug}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>0.7</priority>\n    <changefreq>monthly</changefreq>\n  </url>\n`;
            });

            sitemap += '</urlset>';
            setResultVal(sitemap);
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
            setResultVal(JSON.stringify(schema, null, 2));
            onSuccess("JSON-LD Schema Generated!");
            break;
          }

          case 'canonical-tag-generator': {
            const tag = `<link rel="canonical" href="${baseUrl}${inputText.startsWith('/') ? '' : '/'}${inputText}" />`;
            setResultVal(tag);
            onSuccess("Canonical Tag Created!");
            break;
          }

          case 'index-now-ping': {
            setResultVal(`POST https://bing.com/indexnow\nContent-Type: application/json\n\n{\n  "host": "${baseUrl.replace('https://', '').replace('http://', '')}",\n  "key": "TOOLVERSE_SECRET_KEY_PRO",\n  "keyLocation": "${baseUrl}/key.txt",\n  "urlList": [\n    "${baseUrl}/tool/${inputText}"\n  ]\n}`);
            onSuccess("IndexNow Configuration Ready!");
            break;
          }

          case 'robots-generator': {
            const robots = `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: ${baseUrl}/sitemap.xml`;
            setResultVal(robots);
            onSuccess("Robots.txt Generated!");
            break;
          }

          default:
            setResultVal(`Auto-SEO logic is processing your request for ${slug}...`);
        }
      } catch (err) {
        onError("SEO engine encountered a data error.");
      }
      setLoading(false);
    }, 600);
  };

  const downloadFile = () => {
    const isXml = resultVal.includes('<?xml');
    const blob = new Blob([resultVal], { type: isXml ? 'application/xml' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = slug + (isXml ? '.xml' : '.txt');
    a.click();
  };

  const inputSlot = (
    <div className="space-y-8 py-4">
      <div className="space-y-3">
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Domain Context (e.g. https://yourdomain.com)</label>
        <input 
          type="text" 
          value={baseUrl} 
          onChange={e => setBaseUrl(e.target.value)} 
          className="w-full p-5 border rounded-2xl bg-slate-50 focus:ring-8 focus:ring-slate-900/5 outline-none transition-all font-bold text-slate-800" 
        />
      </div>

      {(slug.includes('canonical') || slug.includes('index-now')) && (
        <div className="space-y-3 animate-in fade-in duration-300">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Sub-path Slug (e.g. blog/post-name)</label>
          <input 
            type="text" 
            value={inputText} 
            onChange={e => setInputText(e.target.value)} 
            placeholder="tool/slug-name"
            className="w-full p-5 border rounded-2xl bg-slate-50 focus:ring-8 focus:ring-slate-900/5 outline-none transition-all font-bold text-slate-800" 
          />
        </div>
      )}
    </div>
  );

  const actionsSlot = (
    <button 
      onClick={handleGenerate} 
      disabled={loading}
      className="w-full py-6 bg-slate-900 text-white rounded-[1.5rem] font-black text-xl shadow-2xl hover:bg-indigo-600 transition-all active:scale-95 disabled:opacity-50"
    >
      {loading ? "Running Optimization..." : "Execute Master Generation"}
    </button>
  );

  const resultSlot = resultVal ? (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Code Verification Ready</span>
         <div className="flex gap-4">
            <button onClick={downloadFile} className="text-[10px] font-black text-indigo-600 hover:underline uppercase tracking-widest">Download Asset</button>
            <button onClick={() => { navigator.clipboard.writeText(resultVal); onSuccess("Copied!"); }} className="text-[10px] font-black text-emerald-600 hover:underline uppercase tracking-widest">Copy to Clipboard</button>
         </div>
      </div>
      <div className="bg-slate-950 text-emerald-400 p-8 md:p-12 rounded-[2.5rem] font-mono text-sm overflow-x-auto whitespace-pre leading-relaxed shadow-2xl border border-slate-800 scrollbar-thin scrollbar-thumb-slate-700">
        {resultVal}
      </div>
    </div>
  ) : undefined;

  return (
    <ToolLayout
      title="SEO Hub Pro"
      description="Advanced SEO meta-data engine. Powered by high-efficiency local scripts for maximum indexability."
      icon="⚙️"
      colorClass="bg-slate-800"
      input={inputSlot}
      actions={actionsSlot}
      result={resultSlot}
    />
  );
};

export default SEOTools;