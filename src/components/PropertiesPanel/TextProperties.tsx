import React, { CSSProperties } from 'react';
import { CanvasElementData, CanvasDispatch } from '../../types/canvas.types';

interface TextPropertiesProps {
  el: CanvasElementData;
  dispatch: CanvasDispatch;
}

const s: Record<string, CSSProperties> = {
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
  btnActive: {
    padding: '5px 12px',
    background: '#3a7bd5',
    border: '1px solid #3a7bd5',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 12,
    color: '#fff',
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
};

// ─── Text-specific property controls (SRP + ISP) ──────────────────────────────
export const TextProperties: React.FC<TextPropertiesProps> = ({ el, dispatch }) => {
  const update = (key: keyof CanvasElementData, val: unknown) =>
    dispatch({ type: 'UPDATE_ELEMENT', id: el.id, payload: { [key]: val } });

  return (
    <>
      <div style={s.sectionTitle}>Text</div>
      <div style={s.row}>
        <span style={s.label}>Size</span>
        <input
          style={s.input}
          type="number"
          value={el.fontSize}
          onChange={(e) => update('fontSize', +e.target.value)}
        />
      </div>
      <div style={s.row}>
        <span style={s.label}>Color</span>
        <input type="color" value={el.color} onChange={(e) => update('color', e.target.value)} />
      </div>
      <div style={s.row}>
        <span style={s.label}>Bold</span>
        <button style={el.bold ? s.btnActive : s.btn} onClick={() => update('bold', !el.bold)}>B</button>
      </div>
    </>
  );
};
