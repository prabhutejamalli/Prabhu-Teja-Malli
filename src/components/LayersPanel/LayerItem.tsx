import React, { CSSProperties } from 'react';
import { CanvasElementData, CanvasDispatch } from '../../types/canvas.types';

interface LayerItemProps {
  el: CanvasElementData;
  isSelected: boolean;
  dispatch: CanvasDispatch;
}

const ICON: Record<CanvasElementData['kind'], string> = {
  text: 'T',
  rect: '▭',
  circle: '◯',
};

const getLabel = (el: CanvasElementData): string => {
  if (el.kind === 'text') return (el.content || 'Text').slice(0, 10);
  return el.kind;
};

// ─── Single layer row (SRP) ───────────────────────────────────────────────────
export const LayerItem: React.FC<LayerItemProps> = ({ el, isSelected, dispatch }) => {
  const style: CSSProperties = {
    padding: '6px 10px',
    fontSize: 11,
    cursor: 'pointer',
    borderBottom: '1px solid #f0f0f0',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    background: isSelected ? '#e8f0ff' : 'transparent',
    color: isSelected ? '#3a7bd5' : '#333',
  };

  return (
    <div style={style} onClick={() => dispatch({ type: 'SELECT', id: el.id })}>
      <span>{ICON[el.kind]}</span>
      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {getLabel(el)}
      </span>
      <span
        style={{ cursor: 'pointer', color: '#e05a5a', fontSize: 10 }}
        onClick={(e) => { e.stopPropagation(); dispatch({ type: 'DELETE_ELEMENT', id: el.id }); }}
      >
        ✕
      </span>
    </div>
  );
};
