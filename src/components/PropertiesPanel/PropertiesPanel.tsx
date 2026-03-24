import React, { CSSProperties } from 'react';
import { CanvasElementData, CanvasDispatch } from '../../types/canvas.types';
import { TextProperties } from './TextProperties';
import { ShapeProperties } from './ShapeProperties';

interface PropertiesPanelProps {
  selected: CanvasElementData | undefined;
  selectedId: string | null;
  dispatch: CanvasDispatch;
}

const s: Record<string, CSSProperties> = {
  panel: {
    width: 180,
    background: '#fafafa',
    borderLeft: '1px solid #ddd',
    padding: 12,
    overflowY: 'auto',
    fontSize: 12,
  },
  empty: { color: '#bbb', fontSize: 11, textAlign: 'center', marginTop: 20 },
  sectionTitle: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#999',
    marginBottom: 8,
    marginTop: 12,
  },
  row: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 },
  label: { width: 36, fontSize: 11, color: '#888', flexShrink: 0 },
  input: {
    flex: 1,
    padding: '3px 6px',
    border: '1px solid #ccc',
    borderRadius: 3,
    fontSize: 11,
    fontFamily: 'monospace',
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
    width: '100%',
  },
};

type PositionKey = 'x' | 'y' | 'w' | 'h';
const POSITION_FIELDS: [string, PositionKey][] = [['X', 'x'], ['Y', 'y'], ['W', 'w'], ['H', 'h']];

// ─── Properties panel: context-sensitive editor (SRP + OCP) ──────────────────
// Open for extension: add new element kinds without modifying this component.
export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ selected, selectedId, dispatch }) => {
  if (!selected) {
    return (
      <div style={s.panel}>
        <div style={s.empty}>Select an element</div>
      </div>
    );
  }

  const updateProp = (key: keyof CanvasElementData, val: unknown) => {
    if (selectedId) dispatch({ type: 'UPDATE_ELEMENT', id: selectedId, payload: { [key]: val } });
  };

  return (
    <div style={s.panel}>
      <div style={s.sectionTitle}>Position &amp; Size</div>
      {POSITION_FIELDS.map(([label, key]) => (
        <div key={key} style={s.row}>
          <span style={s.label}>{label}</span>
          <input
            style={s.input}
            type="number"
            value={Math.round(selected[key] as number)}
            onChange={(e) =>
              updateProp(key, key === 'w' || key === 'h' ? Math.max(20, +e.target.value) : +e.target.value)
            }
          />
        </div>
      ))}

      {selected.kind === 'text' && (
        <TextProperties el={selected} dispatch={dispatch} />
      )}

      {(selected.kind === 'rect' || selected.kind === 'circle') && (
        <ShapeProperties el={selected} dispatch={dispatch} />
      )}

      <div style={s.sectionTitle}>Layer</div>
      <div style={{ display: 'flex', gap: 4 }}>
        <button style={{ ...s.btn, flex: 1 }} onClick={() => selectedId && dispatch({ type: 'BRING_FRONT', id: selectedId })}>⬆ Front</button>
        <button style={{ ...s.btn, flex: 1 }} onClick={() => selectedId && dispatch({ type: 'SEND_BACK', id: selectedId })}>⬇ Back</button>
      </div>

      <div style={{ marginTop: 12 }}>
        <button
          style={s.btnDanger}
          onClick={() => selectedId && dispatch({ type: 'DELETE_ELEMENT', id: selectedId })}
        >
          ✕ Delete
        </button>
      </div>
    </div>
  );
};
