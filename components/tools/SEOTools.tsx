import React, { useState, useEffect } from 'react';
import { TOOLS } from '../../data/tools';
import { CATEGORIES } from '../../data/categories';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { 
  metaTagGeneratorConfig, 
  keywordDensityCheckerConfig, 
  robotsTxtGeneratorConfig, 
  sitemapGeneratorConfig, 
  schemaGeneratorConfig,
  serpPreviewToolConfig,
  metaTitleGeneratorConfig,
  metaDescriptionGeneratorConfig,
  seoScoreAnalyzerConfig
} from '../../config/seoTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const STOP_WORDS = new Set([
  "the","is","in","at","of","on","and","a","to","for","with","as","by","an","be","this","that","it","from","or","are","was","were",
  "about", "above", "after", "again", "against", "all", "am", "any", "are", "aren't", "as", "at", "be", "because", "been", "before", 
  "being", "below", "between", "both", "but", "by", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", 
  "doing", "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", 
  "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", 
  "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", 
  "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", 
  "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such", "than", "that", 
  "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", 
  "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", 
  "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", 
  "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"
]);

interface SEOIssue {
  type: 'success' | 'warning' | 'error';
  message: string;
  fix: string;
}

const SEOTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  // Common SEO States
  const [baseUrl, setBaseUrl] = useState('https://toolverse-4gr.pages.dev');
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultVal, setResultVal] = useState('');

  // Meta Tag State
  const [metaData, setMetaData] = useState({
    title: 'ToolVerse | Professional Online Tools Platform',
    description: 'Access 500+ high-traffic free online tools for PDF, images, video, and SEO directly in your browser.',
    keywords: 'seo, tools, free, productivity',
    url: 'https://toolverse-4gr.pages.dev',
    image: 'https://toolverse-4gr.pages.dev/og-image.png',
  });

  // Meta Title/Description States
  const [topic, setTopic] = useState('');
  const [brand, setBrand] = useState('ToolVerse');
  const [secondaryKeywords, setSecondaryKeywords] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // SEO Score Analyzer Specific States
  const [analyzerScore, setAnalyzerScore] = useState(0);
  const [analyzerIssues, setAnalyzerIssues] = useState<SEOIssue[]>([]);

  // Keyword Density State
  const [targetKeywords, setTargetKeywords] = useState('');
  const [densityResults, setDensityResults] = useState<any[]>([]);
  const [totalWordCount, setTotalWordCount] = useState(0);

  // Robots State
  const [robotsData, setRobotsData] = useState({
    allow: '/',
    disallow: '/admin',
    sitemap: 'https://example.com/sitemap.xml'
  });

  // Sitemap State
  const [sitemapPaths, setSitemapPaths] = useState('/\n/about\n/contact\n/blog');

  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    const configs = [
      metaTagGeneratorConfig, 
      keywordDensityCheckerConfig, 
      robotsTxtGeneratorConfig, 
      sitemapGeneratorConfig, 
      schemaGeneratorConfig,
      serpPreviewToolConfig,
      metaTitleGeneratorConfig,
      metaDescriptionGeneratorConfig,
      seoScoreAnalyzerConfig
    ];
    const target = configs.find(c => c.slug === slug);
    if (target) {
      target.options?.forEach(opt => initial[opt.id] = (opt as any).default);
    }
    return initial;
  });

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
  };

  const generateOutput = () => {
    setLoading(true);
    setResultVal('');

    setTimeout(() => {
      try {
        switch (slug) {
          case 'seo-score-analyzer': {
            if (!metaData.title.trim()) { onError("Title is required for analysis."); break; }
            if (!topic.trim()) { onError("Focus keyword is required for analysis."); break; }

            const issues: SEOIssue[] = [];
            let score = 0;
            const keyword = topic.toLowerCase().trim();
            const title = metaData.title.toLowerCase();
            const desc = metaData.description.toLowerCase();
            const content = inputText.toLowerCase();
            const words = inputText.split(/\s+/).filter(Boolean);

            // 1. Title Checks
            if (title.length >= 50 && title.length <= 60) {
              score += 20;
              issues.push({ type: 'success', message: 'Title length is perfect (50-60 chars).', fix: '' });
            } else {
              issues.push({ type: 'warning', message: `Title length (${title.length}) is sub-optimal.`, fix: 'Aim for 50-60 characters for best SERP appearance.' });
            }

            if (title.includes(keyword)) {
              score += 15;
              issues.push({ type: 'success', message: 'Focus keyword present in title.', fix: '' });
              if (title.startsWith(keyword)) score += 5;
            } else {
              issues.push({ type: 'error', message: 'Focus keyword missing from title.', fix: 'Include your focus keyword naturally near the start of the title.' });
            }

            // 2. Description Checks
            if (desc.length >= 140 && desc.length <= 160) {
              score += 15;
              issues.push({ type: 'success', message: 'Meta description length is ideal.', fix: '' });
            } else {
              issues.push({ type: 'warning', message: 'Meta description length sub-optimal.', fix: 'Try to keep it between 140-160 characters.' });
            }

            if (desc.includes(keyword)) {
              score += 10;
              issues.push({ type: 'success', message: 'Focus keyword found in description.', fix: '' });
            } else {
              issues.push({ type: 'warning', message: 'Focus keyword missing from description.', fix: 'Adding the keyword to the snippet can improve CTR.' });
            }

            // 3. Content Checks
            if (words.length >= 300) {
              score += 20;
              issues.push({ type: 'success', message: `Strong content length (${words.length} words).`, fix: '' });
            } else {
              issues.push({ type: 'error', message: 'Content is too thin.', fix: 'Aim for at least 300 words to provide value to readers.' });
            }

            const kwCount = content.split(keyword).length - 1;
            const density = words.length > 0 ? (kwCount / words.length) * 100 : 0;

            if (density >= 0.5 && density <= 2.5) {
              score += 15;
              issues.push({ type: 'success', message: `Optimal keyword density (${density.toFixed(2)}%).`, fix: '' });
            } else if (density > 2.5) {
              issues.push({ type: 'error', message: `Keyword stuffing detected (${density.toFixed(2)}%).`, fix: 'Reduce usage of focus keyword to avoid penalties.' });
            } else {
              issues.push({ type: 'warning', message: 'Low keyword presence in content.', fix: 'Use your focus keyword more frequently in the first few paragraphs.' });
            }

            setAnalyzerScore(Math.min(score, 100));
            setAnalyzerIssues(issues.sort((a, b) => {
               const order = { error: 0, warning: 1, success: 2 };
               return order[a.type] - order[b.type];
            }));
            setResultVal('Analysis Complete');
            onSuccess("SEO Audit Finished!");
            break;
          }

          case 'meta-description-generator': {
            if (!topic.trim()) {
              onError("Topic or Focus Keyword is required.");
              break;
            }
            const brandSuffix = brand.trim() ? ` by ${brand.trim()}` : "";
            const secondary = secondaryKeywords.trim() ? ` including ${secondaryKeywords.trim()}` : "";
            
            const list = [
              `Discover the best ${topic.trim()}${secondary}. Our professional guide covers everything you need to know for maximum results${brandSuffix}.`,
              `Learn how to master ${topic.trim()}${secondary} with expert tips, real-world examples, and proven strategies to grow your presence${brandSuffix}.`,
              `Looking for reliable ${topic.trim()}? Explore our complete breakdown of ${topic.trim()} features, benefits, and practical use cases${brandSuffix}.`,
              `${topic.trim()} explained: A simple yet comprehensive look at ${topic.trim()}${secondary} for both beginners and advanced users${brandSuffix}.`,
              `Improve your workflow with ${topic.trim()}. Read our latest insights on ${topic.trim()} best practices, trends, and top tools for 2026${brandSuffix}.`
            ];
            
            setSuggestions(list);
            setResultVal('Descriptions generated');
            onSuccess("Meta Descriptions Ready!");
            break;
          }

          case 'meta-title-generator': {
            if (!topic.trim()) {
              onError("Topic or Keyword is required.");
              break;
            }
            const sep = ` ${options.separator} `;
            const brandSuffix = brand.trim() ? `${sep}${brand.trim()}` : "";
            
            const list = [
              `${topic.trim()}${brandSuffix}`,
              `${topic.trim()} - Complete Guide 2026${brandSuffix}`,
              `Best ${topic.trim()} Tips & Examples${brandSuffix}`,
              `Why ${topic.trim()} is Important for SEO${brandSuffix}`,
              `How to Master ${topic.trim()} in 5 Steps${brandSuffix}`,
              `Professional ${topic.trim()} Tool Online${brandSuffix}`,
              `${topic.trim()}: The Ultimate Beginner's Manual${brandSuffix}`,
            ];
            
            setSuggestions(list);
            setResultVal('Titles generated');
            onSuccess("SEO Title Variants Ready!");
            break;
          }

          case 'serp-preview-tool': {
            setResultVal('Live Preview Active');
            onSuccess("Preview Updated!");
            break;
          }

          case 'xml-sitemap-generator': {
            if (!baseUrl.trim()) {
              onError("Base URL is required.");
              break;
            }
            const base = baseUrl.replace(/\/$/, "");
            const paths = sitemapPaths.split('\n').map(p => p.trim()).filter(Boolean);
            const lastMod = new Date().toISOString().split('T')[0];

            let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
            xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
            
            paths.forEach(path => {
              const fullUrl = `${base}${path.startsWith('/') ? path : `/${path}`}`;
              xml += '  <url>\n';
              xml += `    <loc>${fullUrl}</loc>\n`;
              if (options.includeLastMod) xml += `    <lastmod>${lastMod}</lastmod>\n`;
              xml += `    <changefreq>${options.changefreq}</changefreq>\n`;
              xml += `    <priority>${options.priority}</priority>\n`;
              xml += '  </url>\n';
            });
            
            xml += '</urlset>';
            setResultVal(xml);
            onSuccess("Custom XML Sitemap Generated!");
            break;
          }

          case 'robots-txt-generator': {
            let robots = `User-agent: ${options.userAgent || '*'}\n`;
            if (robotsData.allow) robots += `Allow: ${robotsData.allow}\n`;
            if (robotsData.disallow) robots += `Disallow: ${robotsData.disallow}\n`;
            if (options.crawlDelay && options.crawlDelay !== 'None') robots += `Crawl-delay: ${options.crawlDelay}\n`;
            if (robotsData.sitemap) robots += `\nSitemap: ${robotsData.sitemap}`;
            setResultVal(robots.trim());
            onSuccess("robots.txt Generated!");
            break;
          }

          case 'keyword-density-checker': {
            if (!inputText.trim()) {
              onError("Please enter content to analyze.");
              break;
            }
            const rawWords = inputText.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);
            const totalCount = rawWords.length;
            setTotalWordCount(totalCount);
            const filteredWords = rawWords.filter(w => {
              if (options.filterStopWords && STOP_WORDS.has(w)) return false;
              if (w.length < options.minWordLength) return false;
              return true;
            });
            const freq: Record<string, number> = {};
            filteredWords.forEach(w => freq[w] = (freq[w] || 0) + 1);
            let keys = Object.keys(freq);
            if (targetKeywords.trim()) {
              const targets = targetKeywords.toLowerCase().split(',').map(k => k.trim()).filter(Boolean);
              if (targets.length > 0) keys = targets;
            }
            const results = keys.map(key => ({
              word: key,
              count: freq[key] || 0,
              density: totalCount > 0 ? ((freq[key] || 0) / totalCount * 100).toFixed(2) : "0.00"
            }))
            .filter(r => r.count > 0)
            .sort((a, b) => parseFloat(b.density) - parseFloat(a.density));
            setDensityResults(results);
            setResultVal("Density analysis complete.");
            onSuccess("Keyword Density Calculated!");
            break;
          }

          case 'meta-tag-generator': {
            const tags = [
              '<!-- Primary Meta Tags -->',
              `<title>${metaData.title}</title>`,
              `<meta name="title" content="${metaData.title}">`,
              `<meta name="description" content="${metaData.description}">`,
              `<meta name="keywords" content="${metaData.keywords}">`,
              `<meta name="author" content="${options.author}">`,
              `<meta name="robots" content="${options.robots}">`,
              `<link rel="canonical" href="${metaData.url}" />`,
              '',
              '<!-- Open Graph / Facebook -->',
              '<meta property="og:type" content="website">',
              `<meta property="og:url" content="${metaData.url}">`,
              `<meta property="og:title" content="${metaData.title}">`,
              `<meta property="og:description" content="${metaData.description}">`,
              `<meta property="og:image" content="${metaData.image}">`,
              '',
              '<!-- Twitter -->',
              '<meta property="twitter:card" content="summary_large_image">',
              `<meta property="twitter:url" content="${metaData.url}">`,
              `<meta property="twitter:title" content="${metaData.title}">`,
              `<meta property="twitter:description" content="${metaData.description}">`,
              `<meta property="twitter:image" content="${metaData.image}">`
            ].join('\n');
            setResultVal(tags);
            onSuccess("SEO Meta Block Generated!");
            break;
          }

          case 'json-ld-schema-pro': {
            const schema = {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "ToolVerse Professional Suite",
              "url": baseUrl,
              "description": "Access 500+ free online tools for PDF, Images, Video, and Development.",
              "applicationCategory": "BusinessApplication",
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
            };
            setResultVal(JSON.stringify(schema, null, 2));
            onSuccess("JSON-LD Script Generated!");
            break;
          }

          default:
            setResultVal("Processing complete.");
        }
      } catch (err) {
        onError("Generation failed.");
      }
      setLoading(false);
    }, 400);
  };

  const downloadFile = () => {
    const isXml = resultVal.includes('<?xml');
    const isHtml = slug === 'meta-tag-generator';
    const isRobots = slug === 'robots-txt-generator';
    const blob = new Blob([resultVal], { type: isXml ? 'application/xml' : isHtml ? 'text/html' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = isRobots ? 'robots.txt' : slug + (isXml ? '.xml' : isHtml ? '.html' : '.txt');
    a.click();
  };

  const currentConfig = slug === 'meta-tag-generator' ? metaTagGeneratorConfig : 
                       slug === 'keyword-density-checker' ? keywordDensityCheckerConfig :
                       slug === 'robots-txt-generator' ? robotsTxtGeneratorConfig :
                       slug === 'xml-sitemap-generator' ? sitemapGeneratorConfig :
                       slug === 'serp-preview-tool' ? serpPreviewToolConfig :
                       slug === 'meta-title-generator' ? metaTitleGeneratorConfig :
                       slug === 'meta-description-generator' ? metaDescriptionGeneratorConfig :
                       slug === 'seo-score-analyzer' ? seoScoreAnalyzerConfig :
                       schemaGeneratorConfig;

  // Real-time SERP Length Indicators
  const titleColor = metaData.title.length > 60 ? 'text-rose-500' : metaData.title.length > 50 ? 'text-emerald-500' : 'text-amber-500';
  const descColor = metaData.description.length > 160 ? 'text-rose-500' : metaData.description.length > 140 ? 'text-emerald-500' : 'text-amber-500';

  const inputSlot = (
    <div className="space-y-6 py-2">
      {slug === 'meta-title-generator' || slug === 'meta-description-generator' || slug === 'seo-score-analyzer' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Page Topic / Focus Keyword</label>
              <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Best Pizza in New York" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none font-bold text-slate-700" />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{slug === 'seo-score-analyzer' ? 'Page Title' : 'Brand Name (Optional)'}</label>
              {slug === 'seo-score-analyzer' ? (
                <input type="text" value={metaData.title} onChange={e => setMetaData({...metaData, title: e.target.value})} placeholder="My Awesome Website" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none font-bold text-slate-700" />
              ) : (
                <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g. FoodHub" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none font-bold text-slate-700" />
              )}
           </div>
           {slug === 'meta-description-generator' && (
             <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Secondary Keywords (Optional, comma separated)</label>
                <input type="text" value={secondaryKeywords} onChange={e => setSecondaryKeywords(e.target.value)} placeholder="e.g. fast delivery, organic ingredients, wood fired" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none font-bold text-slate-700" />
             </div>
           )}
           {slug === 'seo-score-analyzer' && (
             <>
               <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Meta Description</label>
                  <textarea rows={3} value={metaData.description} onChange={e => setMetaData({...metaData, description: e.target.value})} placeholder="Snippet for search results..." className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none font-bold text-slate-700 resize-none" />
               </div>
               <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Article Content</label>
                  <textarea rows={8} value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Paste your page content here for density and length analysis..." className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none font-medium text-slate-700 shadow-inner" />
               </div>
             </>
           )}
        </div>
      ) : slug === 'meta-tag-generator' || slug === 'serp-preview-tool' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Page Title</label>
                <span className={`text-[9px] font-black uppercase tracking-tighter ${titleColor}`}>{metaData.title.length}/60 chars</span>
              </div>
              <input type="text" value={metaData.title} onChange={e => setMetaData({...metaData, title: e.target.value})} placeholder="My Awesome Website" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none font-bold text-slate-700" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Canonical URL</label>
              <input type="text" value={metaData.url} onChange={e => setMetaData({...metaData, url: e.target.value})} placeholder="https://example.com/page" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none font-bold text-slate-700" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Meta Description</label>
                <span className={`text-[9px] font-black uppercase tracking-tighter ${descColor}`}>{metaData.description.length}/160 chars</span>
              </div>
              <textarea rows={4} value={metaData.description} onChange={e => setMetaData({...metaData, description: e.target.value})} placeholder="Describe your page for search results..." className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none font-bold text-slate-700 resize-none leading-relaxed" />
            </div>
          </div>
          {slug === 'meta-tag-generator' && (
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Keywords & OG Image URL</label>
              <div className="flex flex-col sm:flex-row gap-4">
                <input type="text" value={metaData.keywords} onChange={e => setMetaData({...metaData, keywords: e.target.value})} placeholder="seo, free tools, platform" className="flex-grow p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none font-bold text-slate-700" />
                <input type="text" value={metaData.image} onChange={e => setMetaData({...metaData, image: e.target.value})} placeholder="Image URL" className="flex-grow p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none font-bold text-slate-700" />
              </div>
            </div>
          )}
        </div>
      ) : slug === 'keyword-density-checker' ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Article Content</label>
            <textarea rows={8} value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Paste your article text here..." className="w-full p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-8 focus:ring-indigo-500/5 outline-none font-medium text-slate-700 shadow-inner" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Target Keywords (Optional)</label>
            <input type="text" value={targetKeywords} onChange={e => setTargetKeywords(e.target.value)} placeholder="e.g. seo, tools" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none font-bold text-slate-700" />
          </div>
        </div>
      ) : slug === 'robots-txt-generator' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Allow Path</label>
              <input type="text" value={robotsData.allow} onChange={e => setRobotsData({...robotsData, allow: e.target.value})} placeholder="/" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-100 outline-none font-mono text-sm" />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Disallow Path</label>
              <input type="text" value={robotsData.disallow} onChange={e => setRobotsData({...robotsData, disallow: e.target.value})} placeholder="/admin" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-100 outline-none font-mono text-sm" />
           </div>
           <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Sitemap URL</label>
              <input type="text" value={robotsData.sitemap} onChange={e => setRobotsData({...robotsData, sitemap: e.target.value})} placeholder="https://example.com/sitemap.xml" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-100 outline-none font-mono text-sm" />
           </div>
        </div>
      ) : slug === 'xml-sitemap-generator' ? (
        <div className="space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Website Base URL</label>
              <input type="text" value={baseUrl} onChange={e => setBaseUrl(e.target.value)} placeholder="https://example.com" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-100 outline-none font-bold text-slate-700" />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Page Paths (One per line)</label>
              <textarea rows={6} value={sitemapPaths} onChange={e => setSitemapPaths(e.target.value)} placeholder="/home&#10;/services&#10;/about-us" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-100 outline-none font-mono text-sm shadow-inner" />
           </div>
        </div>
      ) : (
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Base Domain URL</label>
          <input type="text" value={baseUrl} onChange={e => setBaseUrl(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none font-bold text-slate-700" />
        </div>
      )}
    </div>
  );

  const actionsSlot = (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <button 
        onClick={generateOutput} 
        disabled={loading}
        className={`flex-grow py-5 ${currentConfig.colorClass} text-white rounded-2xl font-black text-lg shadow-xl transition-all active:scale-95 disabled:opacity-50 hover:brightness-110`}
      >
        {loading ? "Processing..." : slug === 'seo-score-analyzer' ? "Perform SEO Audit" : slug === 'meta-title-generator' || slug === 'meta-description-generator' ? "Generate Suggestions" : slug === 'keyword-density-checker' ? "Analyze Density" : slug === 'robots-txt-generator' ? "Build robots.txt" : slug === 'xml-sitemap-generator' ? "Build XML Sitemap" : slug === 'serp-preview-tool' ? "Refresh Preview" : "Generate SEO Block"}
      </button>
      {resultVal && !['keyword-density-checker', 'serp-preview-tool', 'meta-title-generator', 'meta-description-generator', 'seo-score-analyzer'].includes(slug) && (
        <button onClick={() => { navigator.clipboard.writeText(resultVal); onSuccess("Copied!"); }} className="py-5 px-10 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-slate-800 transition-all">
          Copy Result
        </button>
      )}
    </div>
  );

  const resultSlot = resultVal && (
    <div className="space-y-8">
      {slug === 'seo-score-analyzer' ? (
        <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-500">
           <div className="flex flex-col items-center justify-center py-12 bg-slate-50 rounded-[4rem] border border-slate-100">
              <div className="relative w-48 h-48 mb-8">
                 <svg className="w-full h-full transform -rotate-90">
                    <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-slate-200" />
                    <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="16" fill="transparent" strokeDasharray={552.92} strokeDashoffset={552.92 - (552.92 * analyzerScore) / 100} className={`transition-all duration-1000 ease-out ${analyzerScore >= 80 ? 'text-emerald-500' : analyzerScore >= 50 ? 'text-amber-500' : 'text-rose-500'}`} />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black text-slate-900 tracking-tighter">{analyzerScore}</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Score</span>
                 </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                {analyzerScore >= 80 ? 'Excellent Optimization!' : analyzerScore >= 50 ? 'Needs Improvement' : 'Critically Unoptimized'}
              </h3>
              <p className="text-slate-500 font-medium text-center px-8">Your page is {analyzerScore}% compliant with modern SEO standards.</p>
           </div>

           <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Audit Breakdown & Recommendations</h4>
              <div className="grid grid-cols-1 gap-4">
                 {analyzerIssues.map((issue, idx) => (
                   <div key={idx} className={`p-6 rounded-3xl border ${issue.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-900' : issue.type === 'warning' ? 'bg-amber-50 border-amber-100 text-amber-900' : 'bg-rose-50 border-rose-100 text-rose-900'} flex items-start gap-4`}>
                      <div className="text-2xl pt-0.5">{issue.type === 'success' ? '✅' : issue.type === 'warning' ? '⚠️' : '❌'}</div>
                      <div className="flex-grow">
                         <div className="font-black text-sm mb-1">{issue.message}</div>
                         {issue.fix && <div className="text-xs font-medium opacity-70">Fix: {issue.fix}</div>}
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      ) : slug === 'meta-title-generator' || slug === 'meta-description-generator' ? (
        <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
           {suggestions.map((t, i) => {
             const isTitle = slug === 'meta-title-generator';
             const isGoodLength = isTitle ? (t.length >= 50 && t.length <= 60) : (t.length >= 140 && t.length <= 160);
             const isTooLong = isTitle ? (t.length > 60) : (t.length > 160);
             
             return (
               <div key={i} className={`group bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:bg-white transition-all shadow-sm ${isGoodLength ? 'hover:border-emerald-200' : isTooLong ? 'hover:border-rose-200' : 'hover:border-indigo-200'}`}>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                     <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${isGoodLength ? 'bg-emerald-100 text-emerald-600' : isTooLong ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                          {isTooLong ? 'Too Long' : isGoodLength ? 'SEO Perfect' : 'Sub-optimal'}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">{t.length} Characters</span>
                     </div>
                     <button 
                      onClick={() => { navigator.clipboard.writeText(t); onSuccess("Copied!"); }}
                      className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md group-hover:scale-105 text-white ${currentConfig.colorClass}`}
                     >
                       Copy {isTitle ? 'Title' : 'Snippet'}
                     </button>
                  </div>
                  <p className={`${isTitle ? 'text-lg' : 'text-sm font-medium'} font-black text-slate-800 leading-tight`}>{t}</p>
               </div>
             );
           })}
        </div>
      ) : slug === 'serp-preview-tool' ? (
        <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-500">
           <div className="flex justify-between items-end px-1 border-b border-slate-100 pb-6">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                 <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Google {options.viewMode} Preview</span>
              </div>
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Live from Google Snippet Engine</div>
           </div>

           <div className="flex justify-center bg-slate-50 py-16 px-4 rounded-[3rem] border border-slate-100">
              {options.viewMode === 'Desktop' ? (
                <div className="bg-white p-10 rounded-xl shadow-sm border border-slate-200 max-w-2xl w-full">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 mb-1">
                       <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[10px]">🌐</div>
                       <div className="text-sm font-medium text-slate-500 truncate max-w-[400px]">{metaData.url.replace(/^https?:\/\//, '')}</div>
                    </div>
                    <h3 className="text-xl font-medium text-[#1a0dab] hover:underline cursor-pointer leading-tight mb-1 truncate">
                      {metaData.title || 'Your Page Title'}
                    </h3>
                    <div className="text-sm text-[#4d5156] leading-relaxed line-clamp-2 max-w-[600px]">
                      {metaData.description || 'Provide a compelling description to improve your click-through rate (CTR) in organic search results.'}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 w-full max-w-[360px]">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-sm">🌐</div>
                       <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-900 leading-none mb-1">Site Identity</span>
                          <span className="text-[10px] text-slate-500 leading-none">{metaData.url.replace(/^https?:\/\//, '')}</span>
                       </div>
                    </div>
                    <h3 className="text-lg font-medium text-[#1a0dab] leading-tight mt-1">
                      {metaData.title || 'Your Page Title'}
                    </h3>
                    <div className="text-sm text-[#4d5156] leading-relaxed line-clamp-3">
                      {metaData.description || 'Provide a compelling description to improve your click-through rate (CTR) in organic search results.'}
                    </div>
                  </div>
                </div>
              )}
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center gap-6">
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl text-white ${metaData.title.length <= 60 ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                    {metaData.title.length}
                 </div>
                 <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Title Length</div>
                    <p className="text-sm font-bold text-slate-700">
                      {metaData.title.length <= 60 ? "Perfect! Well within the recommended 60-character limit." : "Too long! Google will likely truncate this title."}
                    </p>
                 </div>
              </div>
              <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center gap-6">
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl text-white ${metaData.description.length <= 160 ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                    {metaData.description.length}
                 </div>
                 <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Description Length</div>
                    <p className="text-sm font-bold text-slate-700">
                      {metaData.description.length <= 160 ? "Great! This should display fully in search results." : "Description is lengthy. Snippets usually cut off at 160."}
                    </p>
                 </div>
              </div>
           </div>
        </div>
      ) : slug === 'keyword-density-checker' ? (
        <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex flex-col md:flex-row gap-6">
             <div className="flex-grow bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 text-center">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Words</div>
                <div className="text-5xl font-black text-slate-900">{totalWordCount.toLocaleString()}</div>
             </div>
             <div className="flex-grow bg-indigo-50 p-8 rounded-[2.5rem] border border-indigo-100 text-center">
                <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Unique Keywords</div>
                <div className="text-5xl font-black text-indigo-600">{densityResults.length.toLocaleString()}</div>
             </div>
          </div>
          <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                         <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Keyword</th>
                         <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Count</th>
                         <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Density (%)</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {densityResults.map((r, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                           <td className="px-8 py-5"><span className="text-sm font-black text-slate-700 group-hover:text-indigo-600">{r.word}</span></td>
                           <td className="px-8 py-5 text-center"><span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">{r.count}</span></td>
                           <td className="px-8 py-5 text-right"><span className="text-sm font-black text-indigo-600">{r.density}%</span></td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center px-2">
             <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Optimized Output</span>
             <button onClick={downloadFile} className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">Download Output File</button>
          </div>
          <div className="bg-slate-950 p-8 rounded-[2rem] border border-slate-800 relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-50"></div>
            <pre className="text-emerald-400 font-mono text-xs overflow-x-auto whitespace-pre leading-relaxed scrollbar-thin scrollbar-thumb-slate-800">
              {resultVal}
            </pre>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <ToolLayout
      title={currentConfig.title}
      description={currentConfig.description}
      icon={currentConfig.icon}
      colorClass={currentConfig.colorClass}
      input={inputSlot}
      options={currentConfig.options && currentConfig.options.length > 0 ? <OptionsPanel options={currentConfig.options as any} values={options} onChange={handleOptionChange} /> : undefined}
      actions={actionsSlot}
      result={resultSlot}
    />
  );
};

export default SEOTools;