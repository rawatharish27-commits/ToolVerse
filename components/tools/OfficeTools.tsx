import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { wordCounterConfig, characterCounterConfig, textCleanerConfig, caseConverterConfig, ttsConfig, textCompareConfig, findReplaceConfig, duplicateRemoverConfig } from '../../config/officeTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

interface DiffResult {
  type: 'added' | 'removed' | 'equal';
  value: string;
}

const SOCIAL_LIMITS = [
  { name: 'Twitter', limit: 280 },
  { name: 'SMS', limit: 160 },
  { name: 'Instagram Caption', limit: 2200 }
];

const OfficeTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [inputText, setInputText] = useState('');
  const [secondaryText, setSecondaryText] = useState('');
  const [cleanedOutput, setCleanedOutput] = useState('');
  const [diffResults, setDiffResults] = useState<DiffResult[]>([]);
  const [matchCount, setMatchCount] = useState(0);
  const [removedCount, setRemovedCount] = useState(0);
  
  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    const configs = [wordCounterConfig, characterCounterConfig, textCleanerConfig, caseConverterConfig, ttsConfig, textCompareConfig, findReplaceConfig, duplicateRemoverConfig];
    const target = configs.find(c => c.slug === slug);
    if (target) {
      target.options.forEach(opt => initial[opt.id] = (opt as any).default);
    }
    return initial;
  });

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
  };

  const stats = useMemo(() => {
    const text = inputText || "";
    const words = text.trim() ? text.trim().split(/\s+/).filter(w => w.length > 0).length : 0;
    const charsWithSpaces = text.length;
    const charsWithoutSpaces = text.replace(/\s/g, "").length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;
    const lines = text.split(/\r?\n/).length;

    return {
      words,
      chars: charsWithSpaces,
      charsNoSpaces: charsWithoutSpaces,
      sentences,
      paragraphs,
      lines,
      readTime: Math.ceil(words / 225),
      speakTime: Math.ceil(words / 130)
    };
  }, [inputText]);

  const computeDiff = useCallback(() => {
    const text1 = options.ignoreWhitespace ? inputText.trim() : inputText;
    const text2 = options.ignoreWhitespace ? secondaryText.trim() : secondaryText;
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const results: DiffResult[] = [];
    let i = 0, j = 0;

    while (i < lines1.length || j < lines2.length) {
      const line1 = options.caseSensitive ? lines1[i] : lines1[i]?.toLowerCase();
      const line2 = options.caseSensitive ? lines2[j] : lines2[j]?.toLowerCase();

      if (i < lines1.length && j < lines2.length && line1 === line2) {
        results.push({ type: 'equal', value: lines1[i] });
        i++; j++;
      } else if (j < lines2.length && (i >= lines1.length || !lines1.slice(i).some(l => (options.caseSensitive ? l : l.toLowerCase()) === line2))) {
        results.push({ type: 'added', value: lines2[j] });
        j++;
      } else if (i < lines1.length) {
        results.push({ type: 'removed', value: lines1[i] });
        i++;
      }
    }

    setDiffResults(results);
    onSuccess("Comparison Complete");
  }, [inputText, secondaryText, options, onSuccess]);

  const handleFindReplace = useCallback(() => {
    if (!inputText || !options.find) return;
    try {
      let result = inputText;
      const findText = options.find;
      const replaceText = options.replace || "";
      
      let pattern = findText;
      if (!options.useRegex) {
        pattern = findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }

      if (options.wholeWord) {
        pattern = `\\b${pattern}\\b`;
      }

      const flags = options.caseSensitive ? 'g' : 'gi';
      const regex = new RegExp(pattern, flags);
      const matches = inputText.match(regex);
      result = inputText.replace(regex, replaceText);
      
      setMatchCount(matches ? matches.length : 0);
      setInputText(result);
      onSuccess("Search & Replace Finished!");
    } catch (err) {
      onError("Invalid Find pattern.");
    }
  }, [inputText, options.find, options.replace, options.useRegex, options.caseSensitive, options.wholeWord, onSuccess, onError]);

  const removeDuplicates = useCallback(() => {
    if (!inputText) return;
    let lines = inputText.split(/\r?\n/);
    if (options.trimLines) lines = lines.map(l => l.trim());
    if (options.removeEmpty) lines = lines.filter(l => l.length > 0);
    
    const seen = new Set();
    const resultLines: string[] = [];
    
    lines.forEach(line => {
      const key = options.caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        resultLines.push(line);
      }
    });

    if (options.sortOutput) {
      resultLines.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: options.caseSensitive ? 'case' : 'base' }));
    }

    const result = resultLines.join('\n');
    setRemovedCount(lines.length - resultLines.length);
    setInputText(result);
    onSuccess(`Removed ${lines.length - resultLines.length} duplicates.`);
  }, [inputText, options.caseSensitive, options.trimLines, options.sortOutput, options.removeEmpty, onSuccess]);

  const runCleaner = useCallback(() => {
    if (!inputText) return;
    let result = inputText;

    if (options.normalizeQuotes) {
      result = result
        .replace(/[“”]/g, '"')
        .replace(/[‘’]/g, "'");
    }

    if (options.removePunctuation) {
      result = result.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
    }

    if (options.stripHtml) {
      result = result.replace(/<[^>]*>/g, '');
    }

    if (options.removeEmptyLines) {
      result = result.split(/\r?\n/).filter(line => line.trim().length > 0).join('\n');
    }

    if (options.collapseSpaces) {
      result = result.replace(/\s+/g, ' ');
    }

    if (options.removeLines) {
      result = result.replace(/[\r\n]+/g, ' ');
    }

    result = result.trim();
    setCleanedOutput(result);
    onSuccess("Text Cleaned!");
  }, [inputText, options, onSuccess]);

  const downloadTxt = () => {
    const content = slug === 'text-cleaner' ? cleanedOutput : inputText;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `toolverse_${slug.replace(/-/g, '_')}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    onSuccess("File downloaded");
  };

  const transformText = useCallback((mode: string) => {
    let newText = inputText;
    switch (mode) {
      case 'UPPERCASE':
      case 'upper': 
        newText = inputText.toUpperCase(); break;
      case 'lowercase':
      case 'lower': 
        newText = inputText.toLowerCase(); break;
      case 'Title Case':
      case 'title': 
        newText = inputText.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
        break;
      case 'Sentence case':
      case 'sentence':
        newText = inputText.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
        break;
      case 'Toggle Case':
        newText = inputText.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
        break;
      case 'clean':
        newText = inputText.replace(/\s\s+/g, ' ').replace(/\n\n+/g, '\n').trim();
        break;
      case 'trim':
        newText = inputText.split('\n').map(line => line.trim()).join('\n').trim();
        break;
      case 'no-spaces':
        newText = inputText.replace(/\s/g, '');
        break;
    }
    setInputText(newText);
    if (options.autoCopy) {
      navigator.clipboard.writeText(newText);
      onSuccess("Converted & Copied!");
    } else {
      onSuccess("Text Transformed");
    }
  }, [inputText, options.autoCopy, onSuccess]);

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

  const copyStatsSummary = () => {
    const summary = `
Characters (with spaces): ${stats.chars}
Characters (without spaces): ${stats.charsNoSpaces}
Words: ${stats.words}
Twitter limit: ${stats.chars}/${SOCIAL_LIMITS[0].limit}
SMS limit: ${stats.chars}/${SOCIAL_LIMITS[1].limit}
Instagram limit: ${stats.chars}/${SOCIAL_LIMITS[2].limit}
    `.trim();
    navigator.clipboard.writeText(summary);
    onSuccess("Character statistics copied");
  };

  const currentConfig = slug === 'word-counter' ? wordCounterConfig : 
                       slug === 'character-counter' ? characterCounterConfig :
                       slug === 'text-cleaner' ? textCleanerConfig :
                       slug === 'case-converter' ? caseConverterConfig :
                       slug === 'find-and-replace' ? findReplaceConfig :
                       slug === 'duplicate-line-remover' ? duplicateRemoverConfig :
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
          placeholder={
            slug === 'character-counter' ? "Type or paste text to count characters..." : 
            slug === 'text-cleaner' ? "Paste messy content here to sanitize..." :
            slug === 'case-converter' ? "Paste text here to change case..." :
            slug === 'find-and-replace' ? "Paste content for global search and replace..." :
            slug === 'duplicate-line-remover' ? "Paste list to deduplicate..." :
            "Paste your content here for analysis..."
          }
          className="w-full h-64 md:h-80 p-0 bg-transparent text-slate-700 font-sans text-lg border-none outline-none resize-none placeholder:text-slate-300 scrollbar-thin scrollbar-thumb-slate-100"
        />
      )}
      
      {(slug === 'word-counter' || slug === 'character-counter' || slug === 'case-converter') && inputText && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
           {['upper', 'lower', 'title', 'sentence', 'clean', 'trim', 'no-spaces'].map(mode => {
             if (slug === 'word-counter' && (mode === 'trim' || mode === 'no-spaces')) return null;
             if (slug === 'case-converter' && (mode === 'clean' || mode === 'trim' || mode === 'no-spaces')) return null;
             return (
               <button 
                key={mode} 
                onClick={() => transformText(mode)} 
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase hover:bg-indigo-50 hover:text-indigo-600 transition-all"
               >
                 {mode === 'upper' ? 'UPPERCASE' : mode === 'lower' ? 'lowercase' : mode === 'title' ? 'Title Case' : mode === 'sentence' ? 'Sentence case' : mode.replace('clean', 'Normalize').replace('trim', 'Trim Lines').replace('no-spaces', 'Strip Spaces')}
               </button>
             );
           })}
        </div>
      )}
    </div>
  );

  const resultSlot = (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4">
      {slug === 'find-and-replace' && matchCount > 0 && (
        <div className="bg-blue-50 px-6 py-3 rounded-2xl border border-blue-100 inline-flex items-center text-blue-700 font-black text-xs uppercase tracking-widest">
           ✨ Matches found & replaced: {matchCount}
        </div>
      )}

      {slug === 'duplicate-line-remover' && removedCount > 0 && (
        <div className="bg-indigo-50 px-6 py-3 rounded-2xl border border-indigo-100 inline-flex items-center text-indigo-700 font-black text-xs uppercase tracking-widest">
           👯 Duplicate lines removed: {removedCount}
        </div>
      )}

      {slug === 'text-compare' && diffResults.length > 0 && (
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
      )}

      {slug === 'text-cleaner' && cleanedOutput && (
         <div className="space-y-6">
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200">
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-1">Cleaned Result</div>
               <textarea
                 readOnly
                 value={cleanedOutput}
                 className="w-full h-64 p-0 bg-transparent text-slate-700 font-mono text-base border-none outline-none resize-none scrollbar-thin scrollbar-thumb-slate-200"
               />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 flex justify-between items-center">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Final Characters</span>
                  <span className="text-2xl font-black text-indigo-600">{cleanedOutput.length.toLocaleString()}</span>
               </div>
               <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex justify-between items-center">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Characters Saved</span>
                  <span className="text-2xl font-black text-emerald-600">-{Math.max(0, inputText.length - cleanedOutput.length).toLocaleString()}</span>
               </div>
            </div>
         </div>
      )}

      {inputText && (slug === 'case-converter' || slug === 'find-and-replace' || slug === 'duplicate-line-remover') && (
         <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-1">Processed Result</div>
            <textarea
              readOnly
              value={inputText}
              className="w-full h-64 p-0 bg-transparent text-slate-700 font-mono text-base border-none outline-none resize-none scrollbar-thin scrollbar-thumb-slate-200"
            />
         </div>
      )}

      {(slug === 'word-counter' || slug === 'character-counter') && inputText && (
        <>
          {slug === 'character-counter' && options.showSocial && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {SOCIAL_LIMITS.map(social => {
                  const count = stats.chars;
                  const percentage = Math.min((count / social.limit) * 100, 100);
                  const isOver = count > social.limit;
                  return (
                    <div key={social.name} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all hover:border-indigo-100">
                       <div className="flex justify-between items-center mb-4">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{social.name} Limit</span>
                          <span className={`text-[10px] font-black ${isOver ? 'text-rose-500' : 'text-indigo-500'}`}>
                            {count}/{social.limit}
                          </span>
                       </div>
                       <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-700 ${isOver ? 'bg-rose-500 animate-pulse' : percentage > 90 ? 'bg-amber-500' : 'bg-indigo-500'}`}
                            style={{ width: `${percentage}%` }}
                          />
                       </div>
                       {isOver && (
                         <div className="mt-2 text-[9px] font-black text-rose-400 uppercase tracking-tighter">
                           Over by {count - social.limit} characters
                         </div>
                       )}
                    </div>
                  );
               })}
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Words', val: stats.words },
              { label: 'Characters', val: options.countSpaces ? stats.chars : stats.charsNoSpaces },
              { label: 'Sentences', val: stats.sentences },
              { label: 'Paragraphs', val: stats.paragraphs }
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 text-center shadow-sm">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</div>
                <div className="text-3xl font-black text-indigo-600">{item.val.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {inputText && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {['word-counter', 'character-counter'].includes(slug) && (
            <button onClick={copyStatsSummary} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl">
               Copy Stats Summary
            </button>
          )}
          <button 
            onClick={() => { 
              navigator.clipboard.writeText(slug === 'text-cleaner' ? cleanedOutput : inputText); 
              onSuccess("Copied!"); 
            }} 
            className="px-10 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
          >
             Copy {slug === 'case-converter' ? 'Converted' : slug === 'text-cleaner' ? 'Cleaned' : 'Processed'} Text
          </button>
          <button 
            onClick={downloadTxt}
            className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl"
          >
            Download .txt
          </button>
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
      options={<OptionsPanel options={currentConfig.options as any} values={options} onChange={handleOptionChange} />}
      actions={
        slug === 'text-to-speech-reader' ? (
          <button onClick={handleSpeak} className="w-full py-7 bg-indigo-600 text-white rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-indigo-700 transition-all active:scale-95">🔊 Read Aloud</button>
        ) : slug === 'text-compare' ? (
          <button onClick={computeDiff} className="w-full py-7 bg-indigo-700 text-white rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-indigo-800 transition-all active:scale-95">Compare Versions</button>
        ) : slug === 'case-converter' ? (
          <button onClick={() => transformText(options.mode)} className="w-full py-7 bg-violet-600 text-white rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-violet-700 transition-all active:scale-95">✨ Transform Case</button>
        ) : slug === 'text-cleaner' ? (
          <button onClick={runCleaner} className="w-full py-7 bg-cyan-600 text-white rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-cyan-700 transition-all active:scale-95">🧹 Scrub Text</button>
        ) : slug === 'find-and-replace' ? (
          <button onClick={handleFindReplace} className="w-full py-7 bg-blue-700 text-white rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-blue-800 transition-all active:scale-95">🔍 Replace All</button>
        ) : slug === 'duplicate-line-remover' ? (
          <button onClick={removeDuplicates} className="w-full py-7 bg-indigo-600 text-white rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-indigo-700 transition-all active:scale-95">👯 Remove Duplicates</button>
        ) : undefined
      }
      result={(inputText || (slug === 'text-compare' && secondaryText)) ? resultSlot : undefined}
    />
  );
};

export default OfficeTools;