
import React, { useState, useRef } from 'react';

interface Prize {
  id: number;
  label: string;
  sublabel: string;
  color: string;
  icon: string;
  value: string;
}

const PRIZES: Prize[] = [
  { id: 1, label: 'LIFETIME PRO', sublabel: 'Total Tool Access', color: '#6366f1', icon: '💎', value: 'LIFETIME' },
  { id: 2, label: '$50 CLOUD CREDIT', sublabel: 'Gemini 3.0 Pro Bonus', color: '#10b981', icon: '💰', value: 'CREDIT_50' },
  { id: 3, label: 'BETA ACCESS', sublabel: 'Try New Tools First', color: '#f59e0b', icon: '🚀', value: 'BETA' },
  { id: 4, label: 'NO ADS (30D)', sublabel: 'Clean Workflow', color: '#ec4899', icon: '🛡️', value: 'NO_ADS_30' },
  { id: 5, label: 'VIP SUPPORT', sublabel: 'Priority Help Desk', color: '#8b5cf6', icon: '🌟', value: 'VIP' },
  { id: 6, label: 'SECRET BADGE', sublabel: 'Community Profile', color: '#475569', icon: '🏅', value: 'BADGE' },
];

const SpinWheel: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const [confetti, setConfetti] = useState<boolean>(false);
  const [hasSpun, setHasSpun] = useState(() => localStorage.getItem('tv_spun_today') === new Date().toDateString());
  
  const handleSpin = () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    const extraDegrees = Math.floor(Math.random() * 360) + 2880; 
    const newRotation = rotation + extraDegrees;
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const actualRotation = newRotation % 360;
      const prizeIndex = Math.floor(((360 - actualRotation) % 360) / (360 / PRIZES.length));
      const prize = PRIZES[prizeIndex];
      
      setWonPrize(prize);
      setConfetti(true);
      setTimeout(() => setShowModal(true), 500);
      setHasSpun(true);
      localStorage.setItem('tv_spun_today', new Date().toDateString());
    }, 4500); 
  };

  const renderConfetti = () => {
    if (!confetti) return null;
    return Array.from({ length: 40 }).map((_, i) => (
      <div 
        key={i} 
        className="confetti" 
        style={{
          left: `${Math.random() * 100}vw`,
          backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#fff'][Math.floor(Math.random() * 5)],
          animationDelay: `${Math.random() * 2}s`,
          width: `${Math.random() * 10 + 5}px`,
          height: `${Math.random() * 10 + 5}px`,
        }}
      />
    ));
  };

  return (
    <div className="relative py-16 md:py-28 overflow-hidden bg-slate-950">
      {renderConfetti()}

      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-full md:w-[800px] h-full md:h-[800px] bg-indigo-600 rounded-full blur-[100px] md:blur-[180px] animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10">
        <div className="text-center lg:text-left lg:max-w-xl">
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            <span className="relative flex h-2 w-2 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Daily Exclusive Rewards
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-tight">
            Win a <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-emerald-400">Lifetime Pass.</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed mb-8 md:mb-10 max-w-lg mx-auto lg:mx-0">
            Spin the wheel once per day to unlock premium credits and professional features for free.
          </p>
          
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {PRIZES.slice(0, 4).map(p => (
              <div key={p.id} className="flex items-center space-x-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                <span className="text-2xl">{p.icon}</span>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col items-center w-full max-w-[320px] md:max-w-[500px]">
          <div className="relative p-3 md:p-4 rounded-full bg-gradient-to-br from-white/10 to-white/5 shadow-2xl backdrop-blur-xl border border-white/10 w-full aspect-square">
            
            <div className={`absolute -inset-2 md:-inset-4 rounded-full border border-white/5 opacity-50 ${isSpinning ? 'animate-spin-slow' : ''}`}></div>

            <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 z-[40] drop-shadow-xl">
              <div className="w-8 h-10 md:w-10 md:h-14 bg-white flex items-center justify-center rounded-b-xl md:rounded-b-2xl shadow-2xl">
                <div className="w-0 h-0 border-l-[10px] md:border-l-[12px] border-l-transparent border-r-[10px] md:border-r-[12px] border-r-transparent border-t-[16px] md:border-t-[20px] border-t-indigo-600"></div>
              </div>
            </div>

            <div 
              className={`w-full h-full rounded-full border-[6px] md:border-[12px] border-slate-900 relative overflow-hidden transition-transform duration-[4500ms] cubic-bezier(0.15, 0, 0, 1) ${confetti ? 'glow-active' : ''}`}
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {PRIZES.map((prize, i) => (
                <div 
                  key={prize.id}
                  className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left flex items-start justify-center pt-8 md:pt-16"
                  style={{ 
                    backgroundColor: prize.color,
                    transform: `rotate(${i * (360 / PRIZES.length)}deg)`,
                    clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                  }}
                >
                  <div className="flex flex-col items-center -rotate-45 transform origin-center translate-x-5 translate-y-5 md:translate-x-10 md:translate-y-10">
                    <span className="text-xl md:text-4xl mb-1 md:mb-2">{prize.icon}</span>
                    <span className="text-white font-black text-[8px] md:text-xs uppercase tracking-widest whitespace-nowrap text-center">
                      {prize.label}
                    </span>
                  </div>
                </div>
              ))}
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-28 md:h-28 bg-white rounded-full shadow-2xl flex items-center justify-center z-30 border-[4px] md:border-[8px] border-slate-900">
                <div className="w-8 h-8 md:w-16 md:h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white font-black text-[10px] md:text-2xl shadow-inner">TV</div>
              </div>
            </div>
          </div>

          <button 
            onClick={handleSpin}
            disabled={isSpinning || hasSpun}
            className={`mt-10 md:mt-16 w-full max-w-[280px] py-5 md:py-7 rounded-[2rem] font-black text-lg md:text-2xl tracking-tighter transition-all shadow-2xl transform active:scale-95 flex items-center justify-center gap-3 ${
              hasSpun 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50' 
              : 'bg-white text-indigo-900 hover:bg-indigo-50 hover:-translate-y-1'
            }`}
          >
            {isSpinning ? 'SPINNING...' : hasSpun ? 'SPUN TODAY' : 'SPIN TO WIN'}
          </button>
          
          <p className="mt-4 md:mt-6 text-slate-500 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em]">One Daily Attempt</p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-500 overflow-y-auto">
          <div className="relative bg-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 max-w-lg w-full text-center shadow-2xl animate-in zoom-in-90 duration-500 my-auto">
            <div className="text-6xl md:text-8xl mb-6 md:mb-10 drop-shadow-2xl">{wonPrize?.icon}</div>
            <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-4">You Won!</h3>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-2 leading-tight">{wonPrize?.label}</h2>
            <p className="text-slate-400 font-bold mb-8 uppercase text-[9px] tracking-widest">{wonPrize?.sublabel}</p>
            
            <div className="bg-slate-50 p-6 md:p-8 rounded-[2rem] border border-slate-100 mb-8 md:mb-10">
              <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-3">Your Activation Key</div>
              <code className="text-base md:text-xl font-black text-slate-900 break-all">TV-{wonPrize?.value}-{Math.random().toString(36).slice(-6).toUpperCase()}</code>
            </div>
            
            <button 
              onClick={() => {
                navigator.clipboard.writeText(`TV-${wonPrize?.value}`);
                setShowModal(false);
              }}
              className="w-full py-5 md:py-6 bg-indigo-600 text-white rounded-[1.5rem] md:rounded-[2rem] font-black text-base md:text-lg shadow-xl"
            >
              Claim & Copy Key
            </button>
            <button 
              onClick={() => setShowModal(false)}
              className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
