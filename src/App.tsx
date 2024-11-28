import './index.css';
import { useTetris } from './hooks/useTetris';
import Board from './components/Board';
import GameStats from './components/GameStats';
import GameControls from './components/GameControls';
import TouchControls from './components/TouchControls';
import NextPiece from './components/NextPiece';

function App() {
  const {
    board,
    nextPiece,
    gameState,
    clearingLines,
    startGame,
    pauseGame,
    restartGame,
    moveLeft,
    moveRight,
    moveDown,
    rotate
  } = useTetris();

  const handleMove = (direction: 'left' | 'right' | 'down') => {
    switch (direction) {
      case 'left':
        moveLeft();
        break;
      case 'right':
        moveRight();
        break;
      case 'down':
        moveDown();
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')] opacity-20"></div>
      <div id="game-area" className="relative flex flex-col items-center gap-8 max-w-4xl w-full mx-auto">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-glow">
          BlockDrop
        </h1>
        
        <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25"></div>
            <div className="relative">
              <Board board={board} clearingLines={clearingLines} />
            </div>
          </div>
          
          <div className="flex flex-col gap-8">
            <NextPiece piece={nextPiece} />
            <GameStats
              score={gameState.score}
              level={gameState.level}
              lines={gameState.lines}
            />
            <GameControls
              isPaused={gameState.isPaused}
              isGameOver={gameState.isGameOver}
              onPause={pauseGame}
              onStart={startGame}
              onRestart={restartGame}
            />
          </div>
        </div>

        {gameState.isGameOver && (
          <div className="text-3xl font-bold text-red-400 animate-pulse drop-shadow-glow">
            Game Over!
          </div>
        )}

        <TouchControls
          onMove={handleMove}
          onRotate={rotate}
          enabled={!gameState.isGameOver && !gameState.isPaused}
        />
      </div>
    </div>
  );
}

export default App;