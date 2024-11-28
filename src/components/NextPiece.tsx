import { TetrominoType } from '../types/types';
import { TETROMINOS, TETROMINO_COLORS } from '../constants/tetrominos';

interface NextPieceProps {
  piece: TetrominoType;
}

const NextPiece = ({ piece }: NextPieceProps) => {
  const shape = TETROMINOS[piece];
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-white/5">
      <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-4">Next Piece</h3>
      <div className="grid gap-[1px] justify-center">
        {shape.map((row, i) => (
          <div key={i} className="flex">
            {row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`w-6 h-6 rounded-sm
                  ${cell 
                    ? `${TETROMINO_COLORS[piece]} shadow-glow border border-white/20` 
                    : 'bg-transparent'}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextPiece;