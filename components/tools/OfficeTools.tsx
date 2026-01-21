import React, { useState, useEffect, useCallback } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { wordCounterConfig, ttsConfig } from '../../config/officeTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const OfficeTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [inputText, setInputText] = useState('');
  const [stats, setStats] = useState({
    words: 0,
    chars: 0,
    charsNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    avgWordLength: 0,
    readTime: 0,
    speakTime: 0
  });

  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    const configs = [wordCounterConfig, ttsConfig];
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
    const charNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;
    const avgLen = wordCount > 0 ? (charNoSpaces / wordCount).toFixed(1) : 0;

    setStats({
      words: wordCount,
      chars: charCount,
      charsNoSpaces: charNoSpaces,
      sentences: sentences,
      paragraphs: paragraphs,
      avgWordLength: Number(avgLen),
      readTime: Math.ceil(wordCount / 225), // Average 225 wpm
      speakTime: Math.ceil(wordCount / 130) // Average 130 wpm
    });
  }, [options]);

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

  const currentConfig = slug === 'word-counter' ? wordCounterConfig : ttsConfig;

  const inputSlot = (
    <div className="space-y-6">
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste your content here for analysis..."
        className="w-full h-64 md:h-80 p-0 bg-transparent text-slate-700 font-sans text-lg border-none outline-none resize-none placeholder:text-slate-300 scrollbar-thin scrollbar-thumb-slate-100"
      />
      
      {slug === 'word-counter' && inputText && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
           <button onClick={() => transformText('upper')} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase hover:bg-indigo-50 hover:text-indigo-600 transition-all">Upper Case</button>
           <button onClick={() => transformText('lower')} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase hover:bg-indigo-50 hover:text-indigo-600 transition-all">Lower Case</button>
           <button onClick={() => transformText('title')} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase hover:bg-indigo-50 hover:text-indigo-600 transition-all">Title Case</button>
           <button onClick={() => transformText('sentence')} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase hover:bg-indigo-50 hover:text-indigo-600 transition-all">Sentence Case</button>
           <button onClick={() => transformText('clean')} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase hover:bg-indigo-50 hover:text-indigo-600 transition-all">Clean Extra Spaces</button>
        </div>
      )}
    </div>
  );

  const resultSlot = (slug === 'word-counter' && inputText) && (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Words', val: stats.words },
          { label: 'Characters', val: stats.chars },
          { label: 'Sentences', val: stats.sentences },
          { label: 'Paragraphs', val: stats.paragraphs }
        ].map((item, i) => (
          <div key={i} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 text-center">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</div>
            <div className="text-3xl font-black text-blue-600">{item.val.toLocaleString()}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm">⏱️</div>
            <div>
               <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Reading Time</div>
               <div className="text-xl font-black text-indigo-900">{stats.readTime} min</div>
            </div>
         </div>
         <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm">🎙️</div>
            <div>
               <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Speaking Time</div>
               <div className="text-xl font-black text-emerald-900">{stats.speakTime} min</div>
            </div>
         </div>
         <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm">📏</div>
            <div>
               <div className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Avg Word Length</div>
               <div className="text-xl font-black text-amber-900">{stats.avgWordLength} chars</div>
            </div>
         </div>
      </div>
      
      <div className="flex justify-center">
        <button onClick={() => { navigator.clipboard.writeText(inputText); onSuccess("Copied!"); }} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl">
           Copy Cleaned Text
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
          <button 
            onClick={handleSpeak} 
            className="w-full py-7 bg-indigo-600 text-white rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-indigo-700 transition-all active:scale-95"
          >
            🔊 Read Aloud
          </button>
        ) : undefined
      }
      result={resultSlot}
    />
  );
};

export default OfficeTools;