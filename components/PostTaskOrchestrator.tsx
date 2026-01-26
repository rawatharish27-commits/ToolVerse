
import React, { useState } from 'react';
import { Tool } from '../types';
import { getSmartSuggestions } from '../utils/suggestionEngine';

interface PostTaskOrchestratorProps {
  tool: Tool;
  onNavigate: (page: string, params?: any) => void;
  onClose: () => void;
}

const PostTaskOrchestrator: React.FC<PostTaskOrchestratorProps> = ({ tool, onNavigate, onClose }) => {
  const [view, setView] = useState<'suggestions' | 'feedback'>('suggestions');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const suggestions = getSmartSuggestions(tool.slug, tool.category);

  const handleFeedbackSubmit = () => {
    const existing = JSON.parse(localStorage.getItem('tv_global_feedback') || '[]');
    existing.push({ rating, comment, date: new Date().toISOString(), tool: tool.slug });
    localStorage.setItem('tv_global_feedback', JSON.stringify(existing));
    
    // Update global average simulation
    const totalStars = existing.reduce((acc: number, curr: any) => acc + curr.rating, 0);
    const avg = (totalStars / existing.length).toFixed(1);
    localStorage.setItem('tv_global_rating_avg', avg);
    
    window.dispatchEvent(new Event('feedback_updated'));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[3.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative">
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-300 hover:text-rose-500 font-black z-10">✕</button>
        
        {view === 'suggestions' ? (
          <div className="flex flex-col h-full">
            <div className="p-12 pb-6">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-6">
                Step 1: Next Logical Nodes
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-4">Task Resolved. <span className="text-indigo-600">Continue the Chain?</span></h2>
              <p className="text-slate-500 font-medium max-w-xl">Based on your use of <span className="font-bold text-slate-700">{tool.title}</span>, our engine recommends these 5 critical follow-ups:</p>
            </div>

            <div className="flex-grow overflow-y-auto px-12 py-6 space-y-4 no-scrollbar">
              {suggestions.map((s, idx) => (
                <div 
                  key={s.slug}
                  onClick={() => { onNavigate('tool', { slug: s.slug }); onClose(); }}
                  className="group flex items-center gap-6 p-6 bg-slate-50 border border-slate-100 rounded-3xl cursor-pointer hover:bg-indigo-600 hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:rotate-6 transition-transform">
                    {idx + 1}
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-white mb-1 uppercase tracking-tight">{s.title}</h4>
                    <p className="text-xs text-slate-400 group-hover:text-indigo-100 font-medium line-clamp-1">{s.description}</p>
                  </div>
                  <div className="text-indigo-600 group-hover:text-white font-black text-xl">→</div>
                </div>
              ))}
            </div>

            <div className="p-12 pt-6 border-t border-slate-50 bg-slate-50/50 flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select a node or provide feedback</span>
              <button 
                onClick={() => setView('feedback')}
                className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all"
              >
                Finished? Rate Tool
              </button>
            </div>
          </div>
        ) : (
          <div className="p-12 md:p-20 text-center animate-in slide-in-from-right-10 duration-500">
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-5xl mx-auto mb-10">⭐</div>
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Rate this Intelligence Node</h2>
            <p className="text-slate-500 mb-12 font-medium">Your feedback powers the global logic index.</p>

            <div className="flex justify-center gap-4 mb-12">
              {[1, 2, 3, 4, 5].map(star => (
                <button 
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-6xl transition-all hover:scale-125 ${rating >= star ? 'text-yellow-400 drop-shadow-lg' : 'text-slate-100'}`}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea 
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Any technical feedback or suggestions? (Optional)"
              className="w-full h-32 p-6 bg-slate-50 border border-slate-100 rounded-3xl mb-12 outline-none focus:ring-8 focus:ring-indigo-500/5 font-medium text-slate-700 shadow-inner resize-none transition-all"
            />

            <div className="flex gap-4">
               <button onClick={() => setView('suggestions')} className="flex-1 py-6 bg-slate-50 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest">Back</button>
               <button onClick={handleFeedbackSubmit} className="flex-[3] py-6 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Complete Deployment</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostTaskOrchestrator;
