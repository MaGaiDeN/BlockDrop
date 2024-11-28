import { useState, useEffect, useCallback } from 'react';
import { BoardType, TetrominoType, Position, GameState } from '../types/types';
import { BOARD_WIDTH, BOARD_HEIGHT, TETROMINOS, INITIAL_SPEED } from '../constants/tetrominos';

const createEmptyBoard = (): BoardType =>
  Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null));

const randomTetromino = (): TetrominoType => {
  const pieces: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  return pieces[Math.floor(Math.random() * pieces.length)];
};

export const useTetris = () => {
  const [board, setBoard] = useState<BoardType>(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState<TetrominoType>(randomTetromino());
  const [nextPiece, setNextPiece] = useState<TetrominoType>(randomTetromino());
  const [currentPosition, setCurrentPosition] = useState<Position>({ x: 4, y: 0 });
  const [clearingLines, setClearingLines] = useState<number[]>([]);
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    lines: 0,
    isGameOver: false,
    isPaused: true
  });

  const checkCollision = useCallback((piece: TetrominoType, position: Position, shape?: number[][]): boolean => {
    const pieceShape = shape || TETROMINOS[piece];
    for (let y = 0; y < pieceShape.length; y++) {
      for (let x = 0; x < pieceShape[y].length; x++) {
        if (pieceShape[y][x]) {
          const newX = position.x + x;
          const newY = position.y + y;
          if (
            newX < 0 ||
            newX >= BOARD_WIDTH ||
            newY >= BOARD_HEIGHT ||
            (newY >= 0 && board[newY][newX])
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }, [board]);

  const mergePieceToBoard = useCallback(() => {
    const newBoard = board.map(row => [...row]);
    const shape = TETROMINOS[currentPiece];
    
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const boardY = currentPosition.y + y;
          const boardX = currentPosition.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = currentPiece;
          }
        }
      }
    }
    
    return newBoard;
  }, [board, currentPiece, currentPosition]);

  const clearLines = useCallback((boardToCheck: BoardType): [BoardType, number] => {
    const linesToClear: number[] = [];
    
    boardToCheck.forEach((row, index) => {
      if (row.every(cell => cell !== null)) {
        linesToClear.push(index);
      }
    });

    if (linesToClear.length > 0) {
      setClearingLines(linesToClear);
      
      // Set a timeout to actually clear the lines
      setTimeout(() => {
        setClearingLines([]);
      }, 200);
    }

    const newBoard = boardToCheck.filter((_, index) => !linesToClear.includes(index));
    const clearedLines = linesToClear.length;
    const topLines = Array(clearedLines)
      .fill(null)
      .map(() => Array(BOARD_WIDTH).fill(null));
    
    return [topLines.concat(newBoard), clearedLines];
  }, []);

  const moveDown = useCallback(() => {
    if (gameState.isPaused || gameState.isGameOver) return false;
    
    const newPosition = { ...currentPosition, y: currentPosition.y + 1 };
    
    if (!checkCollision(currentPiece, newPosition)) {
      setCurrentPosition(newPosition);
      return true;
    }
    
    const newBoard = mergePieceToBoard();
    const [clearedBoard, numCleared] = clearLines(newBoard);
    
    setBoard(clearedBoard);
    setGameState(prev => ({
      ...prev,
      score: prev.score + (numCleared * 100 * prev.level),
      lines: prev.lines + numCleared,
      level: Math.floor((prev.lines + numCleared) / 10) + 1
    }));
    
    setCurrentPiece(nextPiece);
    setNextPiece(randomTetromino());
    const spawnPosition = { x: 4, y: 0 };
    
    if (checkCollision(nextPiece, spawnPosition)) {
      setGameState(prev => ({ ...prev, isGameOver: true }));
      return false;
    }
    
    setCurrentPosition(spawnPosition);
    return false;
  }, [currentPiece, nextPiece, currentPosition, gameState.isPaused, gameState.isGameOver, checkCollision, mergePieceToBoard, clearLines]);

  const moveHorizontal = useCallback((direction: number) => {
    if (gameState.isPaused || gameState.isGameOver) return;
    
    const newPosition = {
      ...currentPosition,
      x: currentPosition.x + direction
    };
    
    if (!checkCollision(currentPiece, newPosition)) {
      setCurrentPosition(newPosition);
    }
  }, [currentPiece, currentPosition, gameState.isPaused, gameState.isGameOver, checkCollision]);

  const moveLeft = useCallback(() => moveHorizontal(-1), [moveHorizontal]);
  const moveRight = useCallback(() => moveHorizontal(1), [moveHorizontal]);

  const rotate = useCallback(() => {
    if (gameState.isPaused || gameState.isGameOver) return;

    const currentShape = TETROMINOS[currentPiece];
    const rotatedShape = currentShape[0].map((_, index) =>
      currentShape.map(row => row[index]).reverse()
    );
    
    if (!checkCollision(currentPiece, currentPosition, rotatedShape)) {
      TETROMINOS[currentPiece] = rotatedShape;
      setCurrentPiece(prev => prev);
    }
  }, [currentPiece, currentPosition, gameState.isPaused, gameState.isGameOver, checkCollision]);

  useEffect(() => {
    if (gameState.isGameOver || gameState.isPaused) return;

    const interval = setInterval(() => {
      moveDown();
    }, INITIAL_SPEED / gameState.level);

    return () => clearInterval(interval);
  }, [gameState.isGameOver, gameState.isPaused, gameState.level, moveDown]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameState.isGameOver || gameState.isPaused) return;

      switch (event.key) {
        case 'ArrowLeft':
          moveLeft();
          break;
        case 'ArrowRight':
          moveRight();
          break;
        case 'ArrowDown':
          moveDown();
          break;
        case 'ArrowUp':
          rotate();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [gameState.isGameOver, gameState.isPaused, moveLeft, moveRight, moveDown, rotate]);

  const renderBoard = useCallback(() => {
    const displayBoard = board.map(row => [...row]);
    const shape = TETROMINOS[currentPiece];
    
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const boardY = currentPosition.y + y;
          const boardX = currentPosition.x + x;
          if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
            displayBoard[boardY][boardX] = currentPiece;
          }
        }
      }
    }
    
    return displayBoard;
  }, [board, currentPiece, currentPosition]);

  const startGame = () => {
    setGameState(prev => ({ ...prev, isPaused: false }));
  };

  const pauseGame = () => {
    setGameState(prev => ({ ...prev, isPaused: true }));
  };

  const restartGame = () => {
    setBoard(createEmptyBoard());
    setCurrentPiece(randomTetromino());
    setNextPiece(randomTetromino());
    setCurrentPosition({ x: 4, y: 0 });
    setClearingLines([]);
    setGameState({
      score: 0,
      level: 1,
      lines: 0,
      isGameOver: false,
      isPaused: false
    });
  };

  return {
    board: renderBoard(),
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
  };
};