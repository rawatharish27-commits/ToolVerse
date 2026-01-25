
import React, { useState, Suspense, lazy } from 'react';

const GameSpinWheel = lazy(() => import('./GameSpinWheel'));
const GameScratchCard = lazy(() => import('./GameScratchCard'));
const GameDiceRoll = lazy(() => import('./GameDiceRoll'));
const GameLuckyNumber = lazy(() => import('./GameLuckyNumber'));
const GameSlotMachine = lazy(() => import('./GameSlotMachine'));
const GameFlipCard = lazy(() => import('./GameFlipCard'));
const GameTreasureBox = lazy(() => import('./GameTreasureBox'));
const GameBalloonPop = lazy(() => import('./GameBalloonPop'));
const GameGuessNumber = lazy(() => import('./GameGuessNumber'));
const GameCoinToss = lazy(() => import('./GameCoinToss'));

const RewardHub: React.FC = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  // Complete List of 10 Master Games
  const games = [
    { id: 'spin', name: 'Spin Wheel', icon: '🎁', color: 'bg-indigo-500', desc: 'Win Lifetime Pro Access' },
    { id: 'slot', name: 'Mega Slots', icon: '🎰', color: 'bg-purple-500', desc: 'Sync 3 Icons to Win' },
    { id: 'scratch', name: 'Scratch Card', icon: '🎫', color: 'bg-emerald-500', desc: 'Reveal Hidden Credits' },
    { id: 'treasure', name: 'Treasure Box', icon: '🧰', color: 'bg-amber-600', desc: 'Choose the Right Vault' },
    { id: 'dice', name: 'Dice Master', icon: '🎲', color: 'bg-amber-500', desc: 'Roll High for Bonuses' },
    { id: 'lucky', name: 'Lucky Draw', icon: '🔢', color: 'bg-rose-500', desc: 'Predict the Number' },
    { id: 'balloon', name: 'Balloon Pop', icon: '🎈', color: 'bg-rose-400', desc: 'Instant Dopamine Wins' },
    { id: 'flip', name: 'Card Duel', icon: '🃏', color: 'bg-blue-500', desc: 'Test Your Probability' },
    { id: 'guess', name: 'Mind Guess', icon: '🔮', color: 'bg-indigo-700', desc: 'Match the Magic Frequency' },
    { id: 'toss', name: 'Coin Toss', icon: '🪙', color: 'bg-yellow-500', desc: 'Standard 50/50 Duel' }
  ];

  return (
    <section className="py-24 bg-slate-950 rounded-[4rem] mx-4 my-20 overflow-hidden relative shadow-2xl border border-white/5">
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600 rounded-full blur-[120px] animate-pulse"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Cloud Arcade • Edge Authenticated
          </div>
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-none">
            Win Daily <span className="text-indigo-500">Logic Warrants.</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto font-medium">Decided at the Edge. Executed in the Browser.</p>
        </div>

        {!activeGame ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {games.map(game => (
              <button
                key={game.id}
                onClick={() => setActiveGame(game.id)}
                className="flex flex-col items-center gap-4 p-10 bg-white/5 border border-white/10 rounded-[3rem] hover:bg-white/10 hover:-translate-y-2 transition-all group shadow-xl"
              >
                <div className={`w-20 h-20 ${game.color} rounded-[1.5rem] flex items-center justify-center text-4xl shadow-2xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-500`}>
                  {game.icon}
                </div>
                <div className="text-center">
                   <span className="text-xs font-black text-white uppercase tracking-widest block mb-1">{game.name}</span>
                   <span className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">{game.desc}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[4rem] p-4 md:p-16 relative shadow-2xl animate-in zoom-in-95 duration-500">
            <button 
              onClick={() => setActiveGame(null)}
              className="absolute top-8 right-8 w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900 font-black hover:bg-rose-500 hover:text-white transition-all z-50 group"
            >
              <span className="group-hover:rotate-90 transition-transform">✕</span>
            </button>
            
            <Suspense fallback={
              <div className="h-96 flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="font-black uppercase text-[10px] text-slate-400 tracking-widest">Warping to Arcade Node...</p>
              </div>
            }>
              <div className="min-h-[500px]">
                {activeGame === 'spin' && <GameSpinWheel />}
                {activeGame === 'scratch' && <GameScratchCard />}
                {activeGame === 'dice' && <GameDiceRoll />}
                {activeGame === 'lucky' && <GameLuckyNumber />}
                {activeGame === 'slot' && <GameSlotMachine />}
                {activeGame === 'flip' && <GameFlipCard />}
                {activeGame === 'treasure' && <GameTreasureBox />}
                {activeGame === 'balloon' && <GameBalloonPop />}
                {activeGame === 'guess' && <GameGuessNumber />}
                {activeGame === 'toss' && <GameCoinToss />}
              </div>
            </Suspense>
          </div>
        )}
      </div>
    </section>
  );
};

export default RewardHub;
