import { TetrominoType } from '../types/types';

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const INITIAL_SPEED = 1000;

export const TETROMINOS: Record<TetrominoType, number[][]> = {
  'I': [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  'O': [
    [1, 1],
    [1, 1]
  ],
  'T': [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  'S': [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
  ],
  'Z': [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
  ],
  'J': [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  'L': [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]
  ]
};

export const TETROMINO_COLORS: Record<TetrominoType, string> = {
  'I': 'bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600',
  'O': 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600',
  'T': 'bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600',
  'S': 'bg-gradient-to-br from-green-400 via-green-500 to-green-600',
  'Z': 'bg-gradient-to-br from-red-400 via-red-500 to-red-600',
  'J': 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600',
  'L': 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600'
};