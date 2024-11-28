import { CellType } from '../types/types';
import { TETROMINO_COLORS } from '../constants/tetrominos';

interface BoardProps {
  board: CellType[][];
  clearingLines: number[];
}

const Board = ({ board, clearingLines }: BoardProps) => {
  return (
    <div className="grid gap-[1px] bg-gray-800/50 p-2 rounded-lg backdrop-blur-sm">
      {board.map((row, i) => (
        <div 
          key={i} 
          className={`flex ${
            clearingLines.includes(i) 
              ? 'animate-flash bg-white/30'
              : ''
          }`}
        >
          {row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`w-7 h-7 rounded-sm transition-all duration-100
                ${cell 
                  ? `${TETROMINO_COLORS[cell]} shadow-glow border border-white/20` 
                  : 'bg-gray-900/80 border border-white/5'}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;