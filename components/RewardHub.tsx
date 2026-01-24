
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

  const games = [
    { id: 'spin', name: 'Spin Wheel', icon: '🎁', color: 'bg-indigo-500' },
    { id: 'scratch', name: 'Scratch Card', icon: '🎫', color: 'bg-emerald-500' },
    { id: 'dice', name: 'Dice Roll', icon: '🎲', color: 'bg-amber-500' },
    { id: 'lucky', name: 'Lucky Draw', icon: '🔢', color: 'bg-rose-500' },
    { id: 'slot', name: 'Slots', icon: '🎰', color: 'bg-purple-500' },
    { id: 'flip', name: 'Flip Card', icon: '🃏', color: 'bg-blue-500' },
    { id: 'toss', name: 'Coin Toss', icon: '🪙', color: 'bg-yellow-500' }
  ];

  return (
    <section className="py-24 bg-slate-900 rounded-[4rem] mx-4 my-20 overflow-hidden relative shadow-2xl">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-500 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Dopamine Station
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">Win Daily <span className="text-indigo-400">Rewards.</span></h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto font-medium">Unlock pro features, cloud credits, and secret badges by mastering our interactive arcade.</p>
        </div>

        {!activeGame ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {games.map(game => (
              <button
                key={game.id}
                onClick={() => setActiveGame(game.id)}
                className="flex flex-col items-center gap-4 p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 hover:scale-105 transition-all group"
              >
                <div className={`w-16 h-16 ${game.color} rounded-2xl flex items-center justify-center text-3xl shadow-xl group-hover:rotate-12 transition-transform`}>
                  {game.icon}
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{game.name}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] p-4 md:p-12 relative shadow-inner">
            <button 
              onClick={() => setActiveGame(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-900 font-black hover:bg-indigo-600 hover:text-white transition-all z-50"
            >
              ✕
            </button>
            <Suspense fallback={
              <div className="h-96 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 font-black uppercase text-[10px] text-slate-400 tracking-widest">Loading Arcade Engine...</p>
              </div>
            }>
              {activeGame === 'spin' && <GameSpinWheel />}
              {activeGame === 'scratch' && <GameScratchCard />}
              {activeGame === 'dice' && <GameDiceRoll />}
              {activeGame === 'lucky' && <GameLuckyNumber />}
              {activeGame === 'slot' && <GameSlotMachine />}
              {activeGame === 'flip' && <GameFlipCard />}
              {activeGame === 'toss' && <GameCoinToss />}
            </Suspense>
          </div>
        )}
      </div>
    </section>
  );
};

export default RewardHub;
