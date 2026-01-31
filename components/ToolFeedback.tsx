
import React, { useState } from 'react';

interface Props {
  toolSlug: string;
}

const ToolFeedback: React.FC<Props> = ({ toolSlug }) => {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRate = (val: number) => {
    setRating(val);
    setSubmitted(true);
    // Simple persistence for "Reward Hub" logic
    const feedback = JSON.parse(localStorage.getItem('tv_feedback') || '{}');
    feedback[toolSlug] = val;
    localStorage.setItem('tv_feedback', JSON.stringify(feedback));
  };

  return (
    <div className="pt-10 border-t border-slate-100 text-center">
      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Rate this Logic Node</h4>
      {!submitted ? (
        <div className="flex justify-center gap-4">
          {[1, 2, 3, 4, 5].map(star => (
            <button 
              key={star}
              onClick={() => handleRate(star)}
              className="text-4xl text-slate-100 hover:text-yellow-400 hover:scale-125 transition-all transform"
            >
              ★
            </button>
          ))}
        </div>
      ) : (
        <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center">
          <div className="text-emerald-500 font-black text-sm uppercase tracking-widest">Feedback Transmitted ✓</div>
          <p className="text-slate-400 text-xs mt-2">Your contribution improves the ToolVerse global index.</p>
        </div>
      )}
    </div>
  );
};

export default ToolFeedback;
