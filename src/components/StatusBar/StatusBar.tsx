import React, { CSSProperties } from 'react';
import { CanvasElementData } from '../../types/canvas.types';
import { CANVAS_W, CANVAS_H } from '../../constants/canvas.constants';

interface StatusBarProps {
  elements: CanvasElementData[];
  selected: CanvasElementData | undefined;
}

const s: CSSProperties = {
  padding: '4px 12px',
  background: '#fff',
  borderTop: '1px solid #ddd',
  fontSize: 10,
  color: '#999',
  display: 'flex',
  gap: 16,
};

// ─── Status bar: read-only info display (SRP) ─────────────────────────────────
export const StatusBar: React.FC<StatusBarProps> = ({ elements, selected }) => (
  <div style={s}>
    <span>Elements: {elements.length}</span>
    <span>{selected ? `Selected: ${selected.id} (${selected.kind})` : 'No selection'}</span>
    <span>Canvas: {CANVAS_W}×{CANVAS_H}</span>
    <span style={{ marginLeft: 'auto' }}>Auto-saved · Ctrl+Z/Y · Del</span>
  </div>
);
