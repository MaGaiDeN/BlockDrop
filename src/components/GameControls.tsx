import { Play, Pause, RotateCw, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface GameControlsProps {
  isPaused: boolean;
  isGameOver: boolean;
  onPause: () => void;
  onStart: () => void;
  onRestart: () => void;
}

const GameControls = ({ isPaused, isGameOver, onPause, onStart, onRestart }: GameControlsProps) => {
  return (
    <div className="flex flex-col gap-6 bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-white/5">
      <div className="flex justify-center">
        {isGameOver ? (
          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg 
              font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 
              shadow-lg shadow-green-500/25 flex items-center justify-center gap-2"
          >
            <RotateCw size={20} /> New Game
          </button>
        ) : (
          <button
            onClick={isPaused ? onStart : onPause}
            className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 
              shadow-lg flex items-center justify-center gap-2
              ${isPaused 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-blue-500/25' 
                : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-orange-500/25'
              }`}
          >
            {isPaused ? <Play size={20} /> : <Pause size={20} />}
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        )}
      </div>
      
      <div className="text-gray-400">
        <p className="text-center mb-3 text-sm font-medium">Controls</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 text-sm">
            <ArrowLeft size={16} className="text-gray-500" /> Move Left
          </div>
          <div className="flex items-center gap-3 text-sm">
            <ArrowRight size={16} className="text-gray-500" /> Move Right
          </div>
          <div className="flex items-center gap-3 text-sm">
            <ArrowDown size={16} className="text-gray-500" /> Move Down
          </div>
          <div className="flex items-center gap-3 text-sm">
            <RotateCw size={16} className="text-gray-500" /> Rotate
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameControls;