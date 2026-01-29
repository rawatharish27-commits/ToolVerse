
import React from 'react';

interface OutputControllerProps {
  type: 'image' | 'text' | 'pdf' | 'data';
  data: any; // Blob or string
  fileName?: string;
  onSuccess: (m: string) => void;
  previewUrl?: string;
}

const OutputController: React.FC<OutputControllerProps> = ({ type, data, fileName, onSuccess, previewUrl }) => {
  const download = () => {
    const url = type === 'image' || type === 'pdf' ? previewUrl || URL.createObjectURL(data) : URL.createObjectURL(new Blob([typeof data === 'string' ? data : JSON.stringify(data, null, 2)], { type: 'text/plain' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || `toolverse_output_${Date.now()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    onSuccess("Download Dispatched");
  };

  const share = async () => {
    const shareData = {
      title: 'ToolVerse Intelligence Output',
      text: 'Check out this result from ToolVerse!',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (e) {
        copyLink();
      }
    } else {
      copyLink();
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    onSuccess("Link Copied to Clipboard");
  };

  const copyResult = () => {
    const text = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(text);
    onSuccess("Result Copied to Clipboard");
  };

  const openPreview = () => {
    if (previewUrl) window.open(previewUrl, '_blank');
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. PREVIEW ZONE */}
      <div className="bg-slate-900 rounded-[3rem] p-6 md:p-10 shadow-3xl border-4 border-white overflow-hidden relative group">
        {type === 'image' && previewUrl && (
          <img src={previewUrl} className="max-h-[500px] mx-auto rounded-2xl group-hover:scale-[1.01] transition-transform duration-700" alt="Output Preview" />
        )}
        {(type === 'text' || type === 'data') && (
          <div className="relative">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-white/5 rounded-bl-2xl text-[8px] font-black text-slate-500 uppercase tracking-widest">Read-Only Buffer</div>
            <textarea 
              readOnly 
              value={typeof data === 'string' ? data : JSON.stringify(data, null, 2)} 
              className="w-full min-h-[300px] bg-transparent text-emerald-400 font-mono text-sm outline-none resize-none scrollbar-thin scrollbar-thumb-white/10 p-4"
            />
          </div>
        )}
        {type === 'pdf' && (
          <div className="py-20 text-center space-y-6">
             <div className="text-8xl">📄</div>
             <p className="text-white font-black text-xl uppercase tracking-tighter">PDF Container Ready</p>
             <button onClick={openPreview} className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">Open Internal Viewer</button>
          </div>
        )}
      </div>

      {/* 2. ACTION BAR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={download}
          className="flex items-center justify-center gap-4 py-6 bg-emerald-600 text-white rounded-[2rem] font-black text-lg shadow-2xl hover:bg-emerald-700 hover:-translate-y-1 transition-all active:scale-95"
        >
          <span>💾</span> Download File
        </button>

        {(type === 'text' || type === 'data') ? (
          <button 
            onClick={copyResult}
            className="flex items-center justify-center gap-4 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-lg shadow-2xl hover:bg-slate-800 hover:-translate-y-1 transition-all active:scale-95"
          >
            <span>📋</span> Copy Output
          </button>
        ) : (
           <button 
            onClick={openPreview}
            className="flex items-center justify-center gap-4 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-lg shadow-2xl hover:bg-slate-800 hover:-translate-y-1 transition-all active:scale-95"
          >
            <span>👁️</span> Full Preview
          </button>
        )}

        <button 
          onClick={share}
          className="flex items-center justify-center gap-4 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-lg shadow-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95"
        >
          <span>🔗</span> Share Tool
        </button>
      </div>

      <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
        Output Verified by ToolVerse Edge Logic • Timestamp: {new Date().toLocaleTimeString()}
      </p>
    </div>
  );
};

export default OutputController;
