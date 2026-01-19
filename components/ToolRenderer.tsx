
import React, { useState } from 'react';

interface ToolRendererProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const ToolRenderer: React.FC<ToolRendererProps> = ({ slug, onSuccess, onError }) => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const copy = (txt: string) => {
    navigator.clipboard.writeText(txt);
    onSuccess("Copied to clipboard!");
  };

  // --- Tool Implementations ---

  // Word Counter
  if (slug === 'word-counter') {
    const stats = {
      words: inputText.trim() ? inputText.trim().split(/\s+/).length : 0,
      chars: inputText.length,
      sentences: inputText.split(/[.!?]+/).filter(Boolean).length
    };
    return (
      <div className="space-y-6">
        <textarea 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste your text here..."
          className="w-full h-64 p-6 rounded-3xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none font-sans text-lg"
        />
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-50 p-6 rounded-2xl text-center">
            <div className="text-3xl font-black text-indigo-600">{stats.words}</div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Words</div>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl text-center">
            <div className="text-3xl font-black text-indigo-600">{stats.chars}</div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Chars</div>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl text-center">
            <div className="text-3xl font-black text-indigo-600">{stats.sentences}</div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Sentences</div>
          </div>
        </div>
      </div>
    );
  }

  // Lorem Ipsum
  if (slug === 'lorem-ipsum') {
    const generate = (paras: number) => {
      const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ";
      setOutputText(Array(paras).fill(text).join("\n\n"));
    };
    return (
      <div className="space-y-6">
        <div className="flex gap-4">
          <button onClick={() => generate(3)} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold">3 Paragraphs</button>
          <button onClick={() => generate(5)} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold">5 Paragraphs</button>
        </div>
        {outputText && (
          <div className="relative">
            <textarea readOnly value={outputText} className="w-full h-64 p-6 bg-slate-50 border rounded-3xl font-serif" />
            <button onClick={() => copy(outputText)} className="absolute top-4 right-4 px-3 py-1 bg-white border rounded shadow-sm text-xs font-bold">Copy</button>
          </div>
        )}
      </div>
    );
  }

  // Meta Tag Generator
  if (slug === 'meta-tag-generator') {
    const [meta, setMeta] = useState({ title: '', desc: '', keys: '' });
    const code = `<title>${meta.title}</title>\n<meta name="description" content="${meta.desc}">\n<meta name="keywords" content="${meta.keys}">`;
    return (
      <div className="space-y-6">
        <input placeholder="Site Title" className="w-full p-4 border rounded-xl" onChange={e => setMeta({...meta, title: e.target.value})} />
        <textarea placeholder="Description" className="w-full p-4 border rounded-xl" onChange={e => setMeta({...meta, desc: e.target.value})} />
        <input placeholder="Keywords (comma separated)" className="w-full p-4 border rounded-xl" onChange={e => setMeta({...meta, keys: e.target.value})} />
        <div className="p-6 bg-slate-900 rounded-2xl">
           <pre className="text-emerald-400 text-xs overflow-x-auto"><code>{code}</code></pre>
           <button onClick={() => copy(code)} className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg text-xs font-bold">Copy HTML</button>
        </div>
      </div>
    );
  }

  // Robots.txt
  if (slug === 'robots-txt-generator') {
    return (
      <div className="space-y-6">
        <p className="text-sm text-slate-500">Standard secure robots.txt for SEO indexing.</p>
        <div className="p-6 bg-slate-900 rounded-2xl">
           <pre className="text-indigo-300 font-mono text-sm">User-agent: *<br/>Allow: /<br/><br/>Sitemap: https://yourdomain.com/sitemap.xml</pre>
        </div>
        <button onClick={() => copy("User-agent: *\nAllow: /\n\nSitemap: https://yourdomain.com/sitemap.xml")} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold">Copy Standard Config</button>
      </div>
    );
  }

  // Color Picker
  if (slug === 'color-picker') {
    const [color, setColor] = useState('#6366f1');
    return (
      <div className="flex flex-col items-center gap-8 py-10">
        <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-40 h-40 rounded-full cursor-pointer border-8 border-white shadow-2xl" />
        <div className="flex gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border text-center min-w-[120px]">
            <div className="text-xs font-bold text-slate-400 mb-1">HEX</div>
            <div className="font-mono font-bold uppercase">{color}</div>
          </div>
          <button onClick={() => copy(color)} className="px-6 py-4 bg-slate-900 text-white rounded-2xl font-bold">Copy HEX</button>
        </div>
      </div>
    );
  }

  // Default Fallback for many tools sharing a text-to-text interface (Case, Base64, etc.)
  return (
    <div className="space-y-6">
      <textarea 
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Input content..."
        className="w-full h-48 p-6 rounded-3xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm"
      />
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setOutputText(inputText.toUpperCase())} className="px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold">Uppercase</button>
        <button onClick={() => setOutputText(inputText.toLowerCase())} className="px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold">Lowercase</button>
        <button onClick={() => setOutputText(btoa(inputText))} className="px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold">Base64 Encode</button>
      </div>
      {outputText && (
        <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 relative">
          <p className="font-mono text-sm text-indigo-900 pr-12">{outputText}</p>
          <button onClick={() => copy(outputText)} className="absolute top-4 right-4 text-indigo-600 hover:text-indigo-800">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ToolRenderer;
