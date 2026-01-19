import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

interface ToolRendererProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const ToolRenderer: React.FC<ToolRendererProps> = ({ slug, onSuccess, onError }) => {
  // --- Shared States ---
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  
  // Custom States
  const [password, setPassword] = useState('');
  const [targetWidth, setTargetWidth] = useState(1920);
  const [targetHeight, setTargetHeight] = useState(1080);
  const [topText, setTopText] = useState('Top Text');
  const [bottomText, setBottomText] = useState('Bottom Text');

  // SEO States
  const [keyword, setKeyword] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('cpc');
  const [ogImage, setOgImage] = useState('');

  // Finance States
  const [principal, setPrincipal] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [tenure, setTenure] = useState<number>(0);
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(0);
  const [years, setYears] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [taxIncome, setTaxIncome] = useState<number>(0);
  const [roiInitial, setRoiInitial] = useState<number>(0);
  const [roiFinal, setRoiFinal] = useState<number>(0);

  // Recording States
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const copy = (txt: string) => {
    navigator.clipboard.writeText(txt);
    onSuccess("Copied to clipboard!");
  };

  // --- PHASE-1: FINANCE & CALCULATOR TOOLS (Batch-6) ---

  if (slug === "emi-calculator" || slug === "home-loan-calculator" || slug === "personal-loan-calculator") {
    const isHome = slug === "home-loan-calculator";
    const isPersonal = slug === "personal-loan-calculator";
    const r = rate / (12 * 100);
    const n = tenure * (isHome || isPersonal ? 12 : 1); // Home/Personal usually in years, generic EMI can be months
    const emi = n && r ? (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : 0;
    const totalPayment = emi * n;
    const totalInterest = totalPayment - principal;

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Loan Amount (₹)</label>
            <input type="number" value={principal || ''} onChange={e => setPrincipal(+e.target.value)} className="w-full p-4 border rounded-2xl focus:ring-2 focus:ring-indigo-500" placeholder="e.g. 500000" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Interest Rate (% p.a.)</label>
            <input type="number" value={rate || ''} onChange={e => setRate(+e.target.value)} className="w-full p-4 border rounded-2xl focus:ring-2 focus:ring-indigo-500" placeholder="e.g. 8.5" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">{isHome || isPersonal ? 'Tenure (Years)' : 'Tenure (Months)'}</label>
            <input type="number" value={tenure || ''} onChange={e => setTenure(+e.target.value)} className="w-full p-4 border rounded-2xl focus:ring-2 focus:ring-indigo-500" placeholder={isHome || isPersonal ? 'e.g. 20' : 'e.g. 12'} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
          <div className="bg-indigo-600 rounded-[2rem] p-8 text-white text-center shadow-xl">
            <div className="text-xs font-bold uppercase opacity-80 mb-2">Monthly EMI</div>
            <div className="text-4xl font-black">₹{Math.round(emi).toLocaleString()}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-6 rounded-[1.5rem] text-center border border-slate-100">
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Interest</div>
              <div className="text-lg font-bold text-slate-900">₹{Math.round(totalInterest > 0 ? totalInterest : 0).toLocaleString()}</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-[1.5rem] text-center border border-slate-100">
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Payment</div>
              <div className="text-lg font-bold text-slate-900">₹{Math.round(totalPayment > 0 ? totalPayment : 0).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "sip-calculator") {
    const r = rate / (12 * 100);
    const n = years * 12;
    const fv = monthlyInvestment && r && n ? monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r) : 0;
    const invested = monthlyInvestment * n;
    const gains = fv - invested;

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Monthly Investment (₹)</label>
            <input type="number" value={monthlyInvestment || ''} onChange={e => setMonthlyInvestment(+e.target.value)} className="w-full p-4 border rounded-2xl" placeholder="e.g. 5000" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Expected Return (% p.a.)</label>
            <input type="number" value={rate || ''} onChange={e => setRate(+e.target.value)} className="w-full p-4 border rounded-2xl" placeholder="e.g. 12" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Time Period (Years)</label>
            <input type="number" value={years || ''} onChange={e => setYears(+e.target.value)} className="w-full p-4 border rounded-2xl" placeholder="e.g. 10" />
          </div>
        </div>
        <div className="bg-emerald-500 rounded-[2.5rem] p-10 text-white text-center shadow-2xl">
          <div className="text-xs font-bold uppercase opacity-80 mb-2">Estimated Future Wealth</div>
          <div className="text-5xl font-black">₹{Math.round(fv).toLocaleString()}</div>
          <div className="flex justify-center gap-8 mt-6 pt-6 border-t border-white/20">
            <div>
              <div className="text-[10px] uppercase font-bold opacity-70">Invested</div>
              <div className="text-xl font-bold">₹{invested.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold opacity-70">Gains</div>
              <div className="text-xl font-bold">₹{Math.round(gains).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "gst-calculator") {
    const [gstRate, setGstRate] = useState(18);
    const gstAmount = (amount * gstRate) / 100;
    const total = amount + gstAmount;

    return (
      <div className="space-y-8 max-w-lg mx-auto">
        <div className="text-center">
          <div className="text-8xl mb-4">💰</div>
          <h3 className="text-xl font-bold text-slate-900 mb-6">Calculate GST (Goods & Services Tax)</h3>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Net Amount (₹)</label>
            <input type="number" value={amount || ''} onChange={e => setAmount(+e.target.value)} className="w-full p-5 border rounded-3xl text-xl font-bold" placeholder="0.00" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[5, 12, 18, 28].map(r => (
              <button key={r} onClick={() => setGstRate(r)} className={`p-4 rounded-2xl font-bold transition-all ${gstRate === r ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                {r}%
              </button>
            ))}
          </div>
        </div>
        <div className="bg-slate-900 rounded-[2rem] p-8 text-white space-y-4">
          <div className="flex justify-between items-center text-slate-400">
            <span>GST ({gstRate}%)</span>
            <span className="font-bold text-white">₹{gstAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-xl font-black pt-4 border-t border-white/10">
            <span>Gross Amount</span>
            <span className="text-indigo-400">₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "income-tax-calculator") {
    // Basic India Income Tax Slab (Simplified for tool)
    const tax = taxIncome > 1500000 ? (taxIncome - 1500000) * 0.3 + 187500 : 
               taxIncome > 1200000 ? (taxIncome - 1200000) * 0.2 + 127500 :
               taxIncome > 900000 ? (taxIncome - 900000) * 0.15 + 82500 :
               taxIncome > 600000 ? (taxIncome - 600000) * 0.1 + 52500 :
               taxIncome > 300000 ? (taxIncome - 300000) * 0.05 : 0;
    
    return (
      <div className="space-y-8 max-w-lg mx-auto">
        <div className="text-center space-y-2">
          <div className="text-8xl">🏢</div>
          <h3 className="text-xl font-bold">Annual Income Tax Estimator</h3>
          <p className="text-xs text-slate-400 font-medium">Based on basic tax slabs (New Regime simulation)</p>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Gross Annual Income (₹)</label>
          <input type="number" value={taxIncome || ''} onChange={e => setTaxIncome(+e.target.value)} className="w-full p-6 border rounded-3xl text-2xl font-black text-center" placeholder="e.g. 1000000" />
        </div>
        <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8 text-center">
          <div className="text-xs font-bold text-indigo-400 uppercase mb-2 tracking-widest">Estimated Tax Liability</div>
          <div className="text-5xl font-black text-indigo-900">₹{Math.round(tax).toLocaleString()}</div>
          <p className="text-[10px] text-indigo-400 mt-4 leading-relaxed">Note: This is an estimation. Actual tax depends on deductions, investments, and regime choices.</p>
        </div>
      </div>
    );
  }

  if (slug === "roi-calculator" || slug === "fd-calculator" || slug === "cagr-calculator") {
    if (slug === "roi-calculator") {
      const roi = roiInitial ? ((roiFinal - roiInitial) / roiInitial) * 100 : 0;
      return (
        <div className="space-y-8 max-w-md mx-auto">
          <div className="grid gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Amount Invested (₹)</label>
              <input type="number" value={roiInitial || ''} onChange={e => setRoiInitial(+e.target.value)} className="w-full p-4 border rounded-2xl" placeholder="Initial value" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Amount Returned (₹)</label>
              <input type="number" value={roiFinal || ''} onChange={e => setRoiFinal(+e.target.value)} className="w-full p-4 border rounded-2xl" placeholder="Final value" />
            </div>
          </div>
          <div className="bg-slate-900 rounded-3xl p-10 text-center">
            <div className="text-xs font-bold text-indigo-400 uppercase mb-2">Total ROI</div>
            <div className="text-5xl font-black text-white">{roi.toFixed(2)}%</div>
          </div>
        </div>
      );
    }
    if (slug === "fd-calculator") {
      const m = principal * Math.pow(1 + (rate / 100), tenure);
      const interest = m - principal;
      return (
        <div className="space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input type="number" value={principal || ''} onChange={e => setPrincipal(+e.target.value)} className="p-4 border rounded-2xl" placeholder="Principal (₹)" />
            <input type="number" value={rate || ''} onChange={e => setRate(+e.target.value)} className="p-4 border rounded-2xl" placeholder="Rate (%)" />
            <input type="number" value={tenure || ''} onChange={e => setTenure(+e.target.value)} className="p-4 border rounded-2xl" placeholder="Years" />
          </div>
          <div className="bg-indigo-600 rounded-[2rem] p-10 text-white text-center">
            <div className="text-xs opacity-70 font-bold uppercase mb-2">Maturity Amount</div>
            <div className="text-4xl font-black">₹{Math.round(m).toLocaleString()}</div>
            <div className="text-sm mt-4 opacity-80 font-bold">Total Interest: ₹{Math.round(interest).toLocaleString()}</div>
          </div>
        </div>
      );
    }
    if (slug === "cagr-calculator") {
      const cagr = (roiInitial && roiFinal && years) ? (Math.pow(roiFinal / roiInitial, 1 / years) - 1) * 100 : 0;
      return (
        <div className="space-y-8 max-w-md mx-auto">
          <div className="grid gap-4">
            <input type="number" value={roiInitial || ''} onChange={e => setRoiInitial(+e.target.value)} className="p-4 border rounded-2xl" placeholder="Beginning Value (₹)" />
            <input type="number" value={roiFinal || ''} onChange={e => setRoiFinal(+e.target.value)} className="p-4 border rounded-2xl" placeholder="Ending Value (₹)" />
            <input type="number" value={years || ''} onChange={e => setYears(+e.target.value)} className="p-4 border rounded-2xl" placeholder="Duration (Years)" />
          </div>
          <div className="bg-purple-600 rounded-3xl p-10 text-center text-white">
            <div className="text-xs font-bold uppercase mb-2 opacity-70">CAGR Rate</div>
            <div className="text-5xl font-black">{cagr.toFixed(2)}%</div>
          </div>
        </div>
      );
    }
  }

  if (slug === "currency-converter") {
    return (
      <div className="space-y-8 max-w-lg mx-auto text-center">
        <div className="text-8xl">💱</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Amount (USD)</label>
            <input type="number" value={amount || ''} onChange={e => setAmount(+e.target.value)} className="w-full p-4 border rounded-2xl text-center font-bold" placeholder="1.00" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Rate (to INR)</label>
            <input type="number" value={rate || 83.25} onChange={e => setRate(+e.target.value)} className="w-full p-4 border rounded-2xl text-center font-bold" />
          </div>
        </div>
        <div className="p-10 bg-indigo-50 border border-indigo-200 rounded-[3rem]">
          <div className="text-xs font-bold text-indigo-400 uppercase mb-2 tracking-widest">Converted Value</div>
          <div className="text-5xl font-black text-indigo-900">₹{(amount * (rate || 83.25)).toFixed(2)}</div>
        </div>
      </div>
    );
  }

  // --- PHASE-1: SEO & MARKETING TOOLS (Batch-5) ---

  if (slug === "keyword-density") {
    const words = inputText.trim() ? inputText.toLowerCase().split(/\s+/) : [];
    const count = words.filter(w => keyword && w.includes(keyword.toLowerCase())).length;
    const density = words.length > 0 ? ((count / words.length) * 100).toFixed(2) : 0;
    return (
      <div className="space-y-6">
        <textarea value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Paste your article content here..." className="w-full h-48 p-4 border rounded-2xl" />
        <div className="flex gap-4">
          <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Target Keyword" className="flex-grow p-4 border rounded-2xl" />
          <div className="bg-indigo-600 text-white p-4 rounded-2xl text-center min-w-[120px]">
            <div className="text-xs opacity-80 uppercase font-bold">Density</div>
            <div className="text-xl font-black">{density}%</div>
          </div>
        </div>
        <p className="text-sm text-slate-500">Keyword "{keyword}" appears <strong>{count}</strong> times out of {words.length} words.</p>
      </div>
    );
  }

  if (slug === "meta-generator") {
    const code = `<title>${metaTitle || 'Page Title'}</title>\n<meta name="description" content="${metaDesc || 'Page description goes here...'}" />\n<meta name="keywords" content="${keyword || 'seo, tools, free'}" />`;
    return (
      <div className="space-y-6">
        <div className="grid gap-4">
          <input value={metaTitle} onChange={e => setMetaTitle(e.target.value)} placeholder="Site Title" className="p-4 border rounded-2xl" />
          <textarea value={metaDesc} onChange={e => setMetaDesc(e.target.value)} placeholder="Meta Description" className="p-4 border rounded-2xl h-24" />
          <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Keywords (comma separated)" className="p-4 border rounded-2xl" />
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl relative">
          <pre className="text-indigo-400 text-xs overflow-x-auto">{code}</pre>
          <button onClick={() => copy(code)} className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors">Copy</button>
        </div>
      </div>
    );
  }

  if (slug === "robots-generator") {
    const code = `User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: ${websiteUrl || 'https://example.com'}/sitemap.xml`;
    return (
      <div className="space-y-6">
        <input value={websiteUrl} onChange={e => setWebsiteUrl(e.target.value)} placeholder="Website URL (e.g. https://domain.com)" className="w-full p-4 border rounded-2xl" />
        <div className="bg-slate-900 p-6 rounded-2xl relative">
          <pre className="text-emerald-400 text-sm">{code}</pre>
          <button onClick={() => copy(code)} className="absolute top-4 right-4 bg-white/10 text-white p-2 rounded-lg">Copy</button>
        </div>
      </div>
    );
  }

  if (slug === "sitemap-generator") {
    const code = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${websiteUrl || 'https://example.com/'}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <priority>1.0</priority>\n  </url>\n</urlset>`;
    return (
      <div className="space-y-6 text-center">
        <input value={websiteUrl} onChange={e => setWebsiteUrl(e.target.value)} placeholder="Enter Page URL" className="w-full p-4 border rounded-2xl" />
        <div className="bg-slate-900 p-6 rounded-2xl text-left relative">
          <pre className="text-blue-400 text-xs overflow-x-auto">{code}</pre>
          <button onClick={() => copy(code)} className="absolute top-4 right-4 bg-white/10 text-white p-2 rounded-lg">Copy</button>
        </div>
      </div>
    );
  }

  if (slug === "utm-builder") {
    const fullUrl = `${websiteUrl || 'https://example.com'}?utm_source=${utmSource || 'google'}&utm_medium=${utmMedium}&utm_campaign=toolverse_launch`;
    return (
      <div className="space-y-6">
        <div className="grid gap-4">
          <input value={websiteUrl} onChange={e => setWebsiteUrl(e.target.value)} placeholder="Landing Page URL" className="p-4 border rounded-2xl" />
          <div className="flex gap-4">
            <input value={utmSource} onChange={e => setUtmSource(e.target.value)} placeholder="Campaign Source" className="flex-grow p-4 border rounded-2xl" />
            <select value={utmMedium} onChange={e => setUtmMedium(e.target.value)} className="p-4 border rounded-2xl bg-white">
              <option value="cpc">CPC</option>
              <option value="email">Email</option>
              <option value="social">Social</option>
              <option value="referral">Referral</option>
            </select>
          </div>
        </div>
        <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl break-all">
          <p className="text-xs font-bold text-indigo-400 uppercase mb-2">Generated UTM Link</p>
          <p className="text-sm font-mono text-indigo-900">{fullUrl}</p>
          <button onClick={() => copy(fullUrl)} className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold">Copy Link</button>
        </div>
      </div>
    );
  }

  if (slug === "serp-preview") {
    return (
      <div className="space-y-8">
        <div className="grid gap-4">
          <input value={metaTitle} onChange={e => setMetaTitle(e.target.value)} placeholder="SEO Title" className="p-4 border rounded-2xl" />
          <textarea value={metaDesc} onChange={e => setMetaDesc(e.target.value)} placeholder="Meta Description" className="p-4 border rounded-2xl" />
        </div>
        <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm max-w-xl mx-auto">
          <p className="text-sm text-slate-500 mb-1 flex items-center">www.example.com <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg></p>
          <h3 className="text-xl text-blue-800 hover:underline cursor-pointer font-medium mb-1 truncate">{metaTitle || 'Your SEO Title Appears Here'}</h3>
          <p className="text-sm text-slate-700 line-clamp-2">{metaDesc || 'This is where your meta description will appear in search results. Make it catchy and relevant!'}</p>
        </div>
      </div>
    );
  }

  if (slug === "speed-test" || slug === "broken-link") {
    const isSpeed = slug === "speed-test";
    return (
      <div className="py-12 text-center space-y-6">
        <div className="text-8xl">{isSpeed ? '🚀' : '🔗'}</div>
        <h3 className="text-2xl font-bold">{isSpeed ? 'Google PageSpeed Insights' : 'Dead Link Checker'}</h3>
        <p className="text-slate-500 max-w-xs mx-auto">For accurate {isSpeed ? 'performance' : 'link'} audits, we recommend using enterprise-grade diagnostic tools.</p>
        <div className="flex flex-col gap-4">
          <input value={websiteUrl} onChange={e => setWebsiteUrl(e.target.value)} placeholder="https://yourwebsite.com" className="p-4 border rounded-2xl text-center" />
          <a 
            href={isSpeed ? `https://pagespeed.web.dev/report?url=${websiteUrl}` : `https://www.deadlinkchecker.com/website-dead-link-checker.asp?url=${websiteUrl}`} 
            target="_blank" 
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl"
          >
            Run Diagnostic Test
          </a>
        </div>
      </div>
    );
  }

  if (slug === "schema-generator") {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": metaTitle || "My Website",
      "url": websiteUrl || "https://example.com"
    };
    return (
      <div className="space-y-6">
        <div className="grid gap-4">
          <input value={metaTitle} onChange={e => setMetaTitle(e.target.value)} placeholder="Site Name" className="p-4 border rounded-2xl" />
          <input value={websiteUrl} onChange={e => setWebsiteUrl(e.target.value)} placeholder="URL" className="p-4 border rounded-2xl" />
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl relative">
          <pre className="text-pink-400 text-xs overflow-x-auto">{JSON.stringify(jsonLd, null, 2)}</pre>
          <button onClick={() => copy(JSON.stringify(jsonLd))} className="absolute top-4 right-4 bg-white/10 text-white p-2 rounded-lg">Copy JSON</button>
        </div>
      </div>
    );
  }

  if (slug === "og-generator") {
    const code = `<meta property="og:title" content="${metaTitle || 'Social Preview Title'}" />\n<meta property="og:description" content="${metaDesc || 'Description for social feeds'}" />\n<meta property="og:image" content="${ogImage || 'https://example.com/image.jpg'}" />`;
    return (
      <div className="space-y-8">
        <div className="grid gap-4">
          <input value={metaTitle} onChange={e => setMetaTitle(e.target.value)} placeholder="OG Title" className="p-4 border rounded-2xl" />
          <input value={ogImage} onChange={e => setOgImage(e.target.value)} placeholder="Image URL" className="p-4 border rounded-2xl" />
        </div>
        <div className="p-6 bg-slate-100 rounded-3xl border border-slate-200">
          <div className="w-full aspect-video bg-slate-200 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
            {ogImage ? <img src={ogImage} className="w-full h-full object-cover" /> : <div className="text-slate-400 font-bold">Image Preview</div>}
          </div>
          <h4 className="font-bold text-slate-900 text-lg mb-1">{metaTitle || 'Shared Post Title'}</h4>
          <p className="text-xs text-slate-500 uppercase tracking-widest">EXAMPLE.COM</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl relative">
          <pre className="text-cyan-400 text-xs overflow-x-auto">{code}</pre>
          <button onClick={() => copy(code)} className="absolute top-4 right-4 bg-white/10 text-white p-2 rounded-lg">Copy Tags</button>
        </div>
      </div>
    );
  }

  // --- PREVIOUS VIDEO/IMAGE TOOLS ---

  if (slug === "video-compressor") {
    const handleCompress = async () => {
      if (!file) return;
      try {
        setLoading(true);
        const { FFmpeg } = await import("@ffmpeg/ffmpeg");
        const { fetchFile } = await import("@ffmpeg/util");
        const ff = new FFmpeg();
        await ff.load({ coreURL: "https://unpkg.com/@ffmpeg/core@0.12.6/dist/ffmpeg-core.js" });
        await ff.writeFile("in.mp4", await fetchFile(file));
        await ff.exec(["-i", "in.mp4", "-b:v", "500k", "out.mp4"]);
        const data = await ff.readFile("out.mp4");
        const blob = new Blob([data as any], { type: "video/mp4" });
        setOutputUrl(URL.createObjectURL(blob));
        onSuccess("Video compressed successfully!");
        setLoading(false);
      } catch (err) {
        onError("Compression failed.");
        setLoading(false);
      }
    };
    return (
      <div className="py-12 text-center space-y-10 max-w-md mx-auto">
        <div className="text-8xl">📉</div>
        <input type="file" accept="video/*" onChange={e => setFile(e.target.files?.[0] || null)} className="mx-auto block" />
        <button disabled={loading || !file} onClick={handleCompress} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl">
          {loading ? "Processing..." : "Compress Video"}
        </button>
        {outputUrl && <a href={outputUrl} download="compressed.mp4" className="inline-block px-10 py-4 bg-emerald-600 text-white rounded-2xl font-bold">Download</a>}
      </div>
    );
  }

  // --- DEFAULT FALLBACK ---
  return (
    <div className="space-y-6">
      <textarea 
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Input content for processing..."
        className="w-full h-48 p-6 rounded-3xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm"
      />
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setInputText(inputText.toUpperCase())} className="px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold hover:bg-slate-200">Uppercase</button>
        <button onClick={() => setInputText(inputText.toLowerCase())} className="px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold hover:bg-slate-200">Lowercase</button>
        <button onClick={() => setInputText(btoa(inputText))} className="px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold hover:bg-slate-200">Base64 Encode</button>
      </div>
    </div>
  );
};

export default ToolRenderer;