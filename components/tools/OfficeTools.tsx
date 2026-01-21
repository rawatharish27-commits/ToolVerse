import React, { useState, useEffect, useCallback, useRef } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { wordCounterConfig, ttsConfig, textCompareConfig } from '../../config/officeTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

interface DiffResult {
  type: 'added' | 'removed' | 'equal';
  value: string;
}

const OfficeTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [inputText, setInputText] = useState('');
  const [secondaryText, setSecondaryText] = useState('');
  const [diffResults, setDiffResults] = useState<DiffResult[]>([]);
  const [stats, setStats] = useState<any>({
    words: 0,
    chars: 0,
    sentences: 0,
    paragraphs: 0,
    readTime: 0,
    additions: 0,
    deletions: 0
  });

  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    const configs = [wordCounterConfig, ttsConfig, textCompareConfig];
    const target = configs.find(c => c.slug === slug);
    if (target) {
      target.options.forEach(opt => initial[opt.id] = (opt as any).default);
    }
    return initial;
  });

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
  };

  const analyzeText = useCallback((text: string) => {
    let cleanText = text;
    if (options.ignoreNumbers) cleanText = cleanText.replace(/[0-9]/g, '');
    if (options.ignorePunctuation) cleanText = cleanText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');

    const words = cleanText.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const charCount = text.length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;

    setStats(prev => ({
      ...prev,
      words: wordCount,
      chars: charCount,
      sentences: sentences,
      paragraphs: paragraphs,
      readTime: Math.ceil(wordCount / 225)
    }));
  }, [options]);

  // Visual Diff Algorithm (Simplified LCS-based implementation)
  const computeDiff = useCallback(() => {
    const text1 = options.ignoreWhitespace ? inputText.trim() : inputText;
    const text2 = options.ignoreWhitespace ? secondaryText.trim() : secondaryText;

    // Split by line or character based on complexity
    // For visual tools, line-by-line is often preferred
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');

    const results: DiffResult[] = [];
    let i = 0, j = 0;
    let adds = 0, dels = 0;

    // Simple line-level comparison for speed and clarity
    while (i < lines1.length || j < lines2.length) {
      const line1 = options.caseSensitive ? lines1[i] : lines1[i]?.toLowerCase();
      const line2 = options.caseSensitive ? lines2[j] : lines2[j]?.toLowerCase();

      if (i < lines1.length && j < lines2.length && line1 === line2) {
        results.push({ type: 'equal', value: lines1[i] });
        i++; j++;
      } else if (j < lines2.length && (i >= lines1.length || !lines1.slice(i).some(l => (options.caseSensitive ? l : l.toLowerCase()) === line2))) {
        results.push({ type: 'added', value: lines2[j] });
        j++; adds++;
      } else if (i < lines1.length) {
        results.push({ type: 'removed', value: lines1[i] });
        i++; dels++;
      }
    }

    setDiffResults(results);
    setStats(prev => ({ ...prev, additions: adds, deletions: dels }));
    onSuccess("Comparison Complete");
  }, [inputText, secondaryText, options]);

  useEffect(() => {
    if (slug === 'word-counter') {
      analyzeText(inputText);
    }
  }, [inputText, slug, analyzeText]);

  const transformText = (mode: 'upper' | 'lower' | 'title' | 'sentence' | 'clean') => {
    let newText = inputText;
    switch (mode) {
      case 'upper': newText = inputText.toUpperCase(); break;
      case 'lower': newText = inputText.toLowerCase(); break;
      case 'title': 
        newText = inputText.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '); 
        break;
      case 'sentence':
        newText = inputText.toLowerCase().replace(/(^\w|\.\s*\w)/g, m => m.toUpperCase());
        break;
      case 'clean':
        newText = inputText.replace(/\s\s+/g, ' ').trim();
        break;
    }
    setInputText(newText);
    onSuccess("Text Transformed");
  };

  const handleSpeak = () => {
    if (!inputText) {
      onError("Please enter text to read.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(inputText);
    utterance.rate = options.rate || 1;
    utterance.pitch = options.pitch || 1;
    window.speechSynthesis.speak(utterance);
    onSuccess("Speaking text...");
  };

  const currentConfig = slug === 'word-counter' ? wordCounterConfig : 
                       slug === 'text-to-speech-reader' ? ttsConfig : 
                       textCompareConfig;

  const inputSlot = (
    <div className="space-y-6">
      {slug === 'text-compare' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
           <div className="flex flex-col space-y-2 h-full">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Original Text</label>
              <textarea
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Paste original version..."
                className="flex-grow p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-indigo-100 outline-none font-mono text-sm resize-none"
              />
           </div>
           <div className="flex flex-col space-y-2 h-full">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Modified Text</label>
              <textarea
                value={secondaryText}
                onChange={e => setSecondaryText(e.target.value)}
                placeholder="Paste modified version..."
                className="flex-grow p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-indigo-100 outline-none font-mono text-sm resize-none"
              />
           </div>
        </div>
      ) : (
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste your content here for analysis..."
          className="w-full h-64 md:h-80 p-0 bg-transparent text-slate-700 font-sans text-lg border-none outline-none resize-none placeholder:text-slate-300 scrollbar-thin scrollbar-thumb-slate-100"
        />
      )}
      
      {slug === 'word-counter' && inputText && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
           {['upper', 'lower', 'title', 'sentence', 'clean'].map(mode => (
             <button 
              key={mode} 
              onClick={() => transformText(mode as any)} 
              className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase hover:bg-indigo-50 hover:text-indigo-600 transition-all"
             >
               {mode.replace('clean', 'Clean Extra Spaces')}
             </button>
           ))}
        </div>
      )}
    </div>
  );

  const resultSlot = (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4">
      {slug === 'text-compare' && diffResults.length > 0 && (
        <div className="space-y-6">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 text-center">
                 <div className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1">Additions</div>
                 <div className="text-2xl font-black text-emerald-600">+{stats.additions}</div>
              </div>
              <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 text-center">
                 <div className="text-[9px] font-black text-rose-400 uppercase tracking-widest mb-1">Deletions</div>
                 <div className="text-2xl font-black text-rose-600">-{stats.deletions}</div>
              </div>
           </div>
           <div className="bg-slate-950 rounded-[2.5rem] p-8 md:p-10 font-mono text-xs border border-slate-800 shadow-2xl">
              <div className="space-y-1">
                 {diffResults.map((res, i) => (
                   <div 
                    key={i} 
                    className={`px-3 py-1 rounded-md flex items-start gap-4 ${res.type === 'added' ? 'bg-emerald-500/20 text-emerald-400' : res.type === 'removed' ? 'bg-rose-500/20 text-rose-400 border-l-2 border-rose-500' : 'text-slate-400 opacity-60'}`}
                   >
                     <span className="w-4 select-none opacity-40 text-center font-bold">{res.type === 'added' ? '+' : res.type === 'removed' ? '-' : ' '}</span>
                     <span className="whitespace-pre-wrap break-all">{res.value || ' '}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {slug === 'word-counter' && inputText && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Words', val: stats.words },
            { label: 'Characters', val: stats.chars },
            { label: 'Sentences', val: stats.sentences },
            { label: 'Paragraphs', val: stats.paragraphs }
          ].map((item, i) => (
            <div key={i} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 text-center shadow-sm">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</div>
              <div className="text-3xl font-black text-indigo-600">{item.val.toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center">
        <button onClick={() => { navigator.clipboard.writeText(inputText); onSuccess("Copied!"); }} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl">
           Copy Buffer Data
        </button>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title={currentConfig.title}
      description={currentConfig.description}
      icon={currentConfig.icon}
      colorClass={currentConfig.colorClass}
      input={inputSlot}
      options={<OptionsPanel options={currentConfig.options as any} values={options} onChange={handleOptionChange} />}
      actions={
        slug === 'text-to-speech-reader' ? (
          <button onClick={handleSpeak} className="w-full py-7 bg-indigo-600 text-white rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-indigo-700 transition-all active:scale-95">🔊 Read Aloud</button>
        ) : slug === 'text-compare' ? (
          <button onClick={computeDiff} className="w-full py-7 bg-indigo-700 text-white rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-indigo-800 transition-all active:scale-95">Compare Versions</button>
        ) : undefined
      }
      result={(inputText || secondaryText) ? resultSlot : undefined}
    />
  );
};

export default OfficeTools;