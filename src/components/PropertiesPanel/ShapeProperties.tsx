import React, { CSSProperties } from 'react';
import { CanvasElementData, CanvasDispatch } from '../../types/canvas.types';

interface ShapePropertiesProps {
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
};

// ─── Shape-specific property controls (SRP + ISP) ────────────────────────────
export const ShapeProperties: React.FC<ShapePropertiesProps> = ({ el, dispatch }) => {
  const update = (key: keyof CanvasElementData, val: unknown) =>
    dispatch({ type: 'UPDATE_ELEMENT', id: el.id, payload: { [key]: val } });

  return (
    <>
      <div style={s.sectionTitle}>Shape</div>
      <div style={s.row}>
        <span style={s.label}>Fill</span>
        <input type="color" value={el.fill} onChange={(e) => update('fill', e.target.value)} />
      </div>
      <div style={s.row}>
        <span style={s.label}>Stroke</span>
        <input type="color" value={el.stroke} onChange={(e) => update('stroke', e.target.value)} />
      </div>
    </>
  );
};
