export type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

export type CellType = TetrominoType | null;

export type BoardType = CellType[][];

export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  score: number;
  level: number;
  lines: number;
  isGameOver: boolean;
  isPaused: boolean;
}