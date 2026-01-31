
import React from 'react';

const ToolLoader: React.FC<{ message?: string }> = ({ message = "Synchronizing Logic..." }) => (
  <div className="flex flex-col items-center justify-center p-20 gap-6">
    <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    <p className="font-black text-[10px] text-slate-400 uppercase tracking-widest">{message}</p>
  </div>
);

export default ToolLoader;
