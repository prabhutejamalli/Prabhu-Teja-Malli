import React, { CSSProperties } from 'react';
import { CanvasElementData, CanvasDispatch } from '../../types/canvas.types';
import { LayerItem } from './LayerItem';

interface LayersPanelProps {
  elements: CanvasElementData[];
  selectedId: string | null;
  dispatch: CanvasDispatch;
}

const s: Record<string, CSSProperties> = {
  panel: {
    width: 160,
    background: '#fafafa',
    borderRight: '1px solid #ddd',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    padding: '8px 10px',
    fontSize: 11,
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
    color: '#666',
  },
  list: { flex: 1, overflowY: 'auto' },
};

// ─── Layers panel: shows element hierarchy (SRP) ──────────────────────────────
export const LayersPanel: React.FC<LayersPanelProps> = ({ elements, selectedId, dispatch }) => (
  <div style={s.panel}>
    <div style={s.header}>Layers ({elements.length})</div>
    <div style={s.list}>
      {[...elements].reverse().map((el) => (
        <LayerItem
          key={el.id}
          el={el}
          isSelected={el.id === selectedId}
          dispatch={dispatch}
        />
      ))}
    </div>
  </div>
);
