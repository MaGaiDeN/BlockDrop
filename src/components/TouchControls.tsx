import { RotateCw, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useRef, TouchEvent } from 'react';

interface TouchControlsProps {
  onMove: (direction: 'left' | 'right' | 'down') => void;
  onRotate: () => void;
  enabled: boolean;
}

const TouchControls = ({ onMove, onRotate, enabled }: TouchControlsProps) => {
  const touchRef = useRef({ startX: 0, startY: 0 });
  const SWIPE_THRESHOLD = 50;

  const handleTouchStart = (e: TouchEvent) => {
    if (!enabled) return;
    touchRef.current = {
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY
    };
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!enabled) return;
    const deltaX = e.changedTouches[0].clientX - touchRef.current.startX;
    const deltaY = e.changedTouches[0].clientY - touchRef.current.startY;

    if (Math.abs(deltaX) > SWIPE_THRESHOLD || Math.abs(deltaY) > SWIPE_THRESHOLD) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          onMove('right');
        } else {
          onMove('left');
        }
      } else {
        if (deltaY > 0) {
          onMove('down');
        } else {
          onRotate();
        }
      }
    }
  };

  useEffect(() => {
    const element = document.getElementById('game-area');
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart as any);
    element.addEventListener('touchend', handleTouchEnd as any);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart as any);
      element.removeEventListener('touchend', handleTouchEnd as any);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center items-center gap-4 touch-none">
      <div className="flex gap-4 bg-gray-800/80 p-4 rounded-2xl backdrop-blur-md border border-white/10 shadow-xl">
        <button
          className="w-14 h-14 bg-gray-700 rounded-xl flex items-center justify-center active:bg-gray-600
            hover:bg-gray-600 transition-colors duration-200 shadow-lg shadow-black/25"
          onClick={() => onMove('left')}
        >
          <ArrowLeft size={28} />
        </button>
        <button
          className="w-14 h-14 bg-gray-700 rounded-xl flex items-center justify-center active:bg-gray-600
            hover:bg-gray-600 transition-colors duration-200 shadow-lg shadow-black/25"
          onClick={() => onMove('down')}
        >
          <ArrowDown size={28} />
        </button>
        <button
          className="w-14 h-14 bg-gray-700 rounded-xl flex items-center justify-center active:bg-gray-600
            hover:bg-gray-600 transition-colors duration-200 shadow-lg shadow-black/25"
          onClick={() => onMove('right')}
        >
          <ArrowRight size={28} />
        </button>
        <button
          className="w-14 h-14 bg-gray-700 rounded-xl flex items-center justify-center active:bg-gray-600
            hover:bg-gray-600 transition-colors duration-200 shadow-lg shadow-black/25"
          onClick={onRotate}
        >
          <RotateCw size={28} />
        </button>
      </div>
    </div>
  );
};

export default TouchControls;