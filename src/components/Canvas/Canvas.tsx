import React, { useRef, CSSProperties } from 'react';
import { CanvasElementData, CanvasDispatch } from '../../types/canvas.types';
import { CANVAS_W, CANVAS_H } from '../../constants/canvas.constants';
import { CanvasElement } from './CanvasElement';

interface CanvasProps {
  elements: CanvasElementData[];
  selectedId: string | null;
  dispatch: CanvasDispatch;
}

const s: Record<string, CSSProperties> = {
  area: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#e8e8e8',
    overflow: 'hidden',
  },
  canvas: {
    position: 'relative',
    background: '#fff',
    boxShadow: '0 2px 20px rgba(0,0,0,0.15)',
    width: CANVAS_W,
    height: CANVAS_H,
  },
};

// ─── Canvas: renders all elements and handles deselect (SRP) ──────────────────
export const Canvas: React.FC<CanvasProps> = ({ elements, selectedId, dispatch }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div style={s.area}>
      <div
        ref={canvasRef}
        style={s.canvas}
        onClick={(e) => {
          if (e.target === canvasRef.current) dispatch({ type: 'DESELECT' });
        }}
      >
        {elements.map((el, idx) => (
          <CanvasElement
            key={el.id}
            el={{ ...el, zIndex: idx + 1 }}
            isSelected={el.id === selectedId}
            dispatch={dispatch}
          />
        ))}
      </div>
    </div>
  );
};
