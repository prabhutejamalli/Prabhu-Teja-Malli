import React, { CSSProperties } from 'react';
import { CanvasDispatch } from '../../types/canvas.types';

interface ToolbarProps {
  dispatch: CanvasDispatch;
  selectedId: string | null;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onAddText: () => void;
  onAddRect: () => void;
  onAddCircle: () => void;
}

const s: Record<string, CSSProperties> = {
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 12px',
    background: '#fff',
    borderBottom: '1px solid #ddd',
    flexWrap: 'wrap',
  },
  btn: {
    padding: '5px 12px',
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  btnDanger: {
    padding: '5px 12px',
    background: '#fff',
    border: '1px solid #e05a5a',
    color: '#e05a5a',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  sep: { color: '#ccc' },
};

// ─── Toolbar: add elements, undo/redo, layer order, delete, clear (SRP) ───────
export const Toolbar: React.FC<ToolbarProps> = ({
  dispatch,
  selectedId,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onAddText,
  onAddRect,
  onAddCircle,
}) => {
  const handleDelete = () => {
    if (selectedId) dispatch({ type: 'DELETE_ELEMENT', id: selectedId });
  };

  const handleClear = () => {
    if (window.confirm('Clear all?')) {
      dispatch({ type: 'SET_STATE', payload: { elements: [], selectedId: null } });
    }
  };

  return (
    <div style={s.toolbar}>
      <button style={s.btn} onClick={onAddText}>T&nbsp; Text</button>
      <button style={s.btn} onClick={onAddRect}>▭&nbsp; Rect</button>
      <button style={s.btn} onClick={onAddCircle}>◯&nbsp; Circle</button>

      <span style={s.sep}>|</span>

      <button style={s.btn} onClick={onUndo} disabled={!canUndo}>↩ Undo</button>
      <button style={s.btn} onClick={onRedo} disabled={!canRedo}>↪ Redo</button>

      <span style={s.sep}>|</span>

      <button
        style={s.btn}
        disabled={!selectedId}
        onClick={() => selectedId && dispatch({ type: 'BRING_FRONT', id: selectedId })}
      >
        ⬆ Front
      </button>
      <button
        style={s.btn}
        disabled={!selectedId}
        onClick={() => selectedId && dispatch({ type: 'SEND_BACK', id: selectedId })}
      >
        ⬇ Back
      </button>

      <span style={s.sep}>|</span>

      <button style={s.btnDanger} disabled={!selectedId} onClick={handleDelete}>✕ Delete</button>
      <button style={{ ...s.btn, marginLeft: 'auto' }} onClick={handleClear}>⊘ Clear</button>
    </div>
  );
};
