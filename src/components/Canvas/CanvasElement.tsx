import React, { useRef, useState, useEffect, CSSProperties } from 'react';
import { CanvasElementData, CanvasDispatch } from '../../types/canvas.types';
import { CANVAS_W, CANVAS_H, MIN_ELEMENT_SIZE, RESIZE_HANDLES, ResizeHandle } from '../../constants/canvas.constants';

interface CanvasElementProps {
  el: CanvasElementData;
  isSelected: boolean;
  dispatch: CanvasDispatch;
}

// ─── Resize handle position map ───────────────────────────────────────────────
const HANDLE_POS: Record<ResizeHandle, CSSProperties> = {
  nw: { top: -4, left: -4, cursor: 'nw-resize' },
  n:  { top: -4, left: 'calc(50% - 4px)', cursor: 'n-resize' },
  ne: { top: -4, right: -4, cursor: 'ne-resize' },
  e:  { right: -4, top: 'calc(50% - 4px)', cursor: 'e-resize' },
  se: { bottom: -4, right: -4, cursor: 'se-resize' },
  s:  { bottom: -4, left: 'calc(50% - 4px)', cursor: 's-resize' },
  sw: { bottom: -4, left: -4, cursor: 'sw-resize' },
  w:  { left: -4, top: 'calc(50% - 4px)', cursor: 'w-resize' },
};

const HANDLE_BASE: CSSProperties = {
  position: 'absolute',
  width: 8,
  height: 8,
  background: '#3a7bd5',
  border: '1px solid #fff',
  borderRadius: 1,
  zIndex: 10,
};

// ─── Single draggable/resizable canvas element (SRP) ─────────────────────────
export const CanvasElement: React.FC<CanvasElementProps> = ({ el, isSelected, dispatch }) => {
  const dragRef = useRef<{ startX: number; startY: number } | null>(null);
  const [editing, setEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [editing]);

  const onMouseDownDrag = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('resize-handle')) return;
    if (editing) return;
    e.stopPropagation();
    dispatch({ type: 'SELECT', id: el.id });
    dragRef.current = { startX: e.clientX - el.x, startY: e.clientY - el.y };

    const onMove = (me: MouseEvent) => {
      if (!dragRef.current) return;
      const nx = Math.max(0, Math.min(CANVAS_W - el.w, me.clientX - dragRef.current.startX));
      const ny = Math.max(0, Math.min(CANVAS_H - el.h, me.clientY - dragRef.current.startY));
      dispatch({ type: 'UPDATE_ELEMENT', id: el.id, payload: { x: nx, y: ny } });
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const onMouseDownResize = (e: React.MouseEvent, dir: ResizeHandle) => {
    e.stopPropagation();
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startEl = { ...el };

    const onMove = (me: MouseEvent) => {
      const dx = me.clientX - startX;
      const dy = me.clientY - startY;
      let { x, y, w, h } = startEl;
      if (dir.includes('e')) w = Math.max(MIN_ELEMENT_SIZE, startEl.w + dx);
      if (dir.includes('s')) h = Math.max(MIN_ELEMENT_SIZE, startEl.h + dy);
      if (dir.includes('w')) { w = Math.max(MIN_ELEMENT_SIZE, startEl.w - dx); x = startEl.x + startEl.w - w; }
      if (dir.includes('n')) { h = Math.max(MIN_ELEMENT_SIZE, startEl.h - dy); y = startEl.y + startEl.h - h; }
      dispatch({ type: 'UPDATE_ELEMENT', id: el.id, payload: { x, y, w, h } });
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  return (
    <div
      onMouseDown={onMouseDownDrag}
      onDoubleClick={(e) => {
        if (el.kind === 'text') { e.stopPropagation(); setEditing(true); }
      }}
      style={{
        position: 'absolute',
        left: el.x,
        top: el.y,
        width: el.w,
        height: el.h,
        zIndex: el.zIndex ?? 1,
        cursor: 'move',
        userSelect: 'none',
        outline: isSelected ? '2px solid #3a7bd5' : 'none',
        outlineOffset: 1,
      }}
    >
      {/* Shape renderers */}
      {el.kind === 'rect' && (
        <div style={{ width: '100%', height: '100%', background: el.fill, border: `2px solid ${el.stroke}`, borderRadius: 3 }} />
      )}
      {el.kind === 'circle' && (
        <div style={{ width: '100%', height: '100%', background: el.fill, border: `2px solid ${el.stroke}`, borderRadius: '50%' }} />
      )}
      {el.kind === 'text' && (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {editing ? (
            <textarea
              ref={textareaRef}
              value={el.content}
              onChange={(e) => dispatch({ type: 'UPDATE_ELEMENT', id: el.id, payload: { content: e.target.value } })}
              onBlur={() => setEditing(false)}
              onMouseDown={(e) => e.stopPropagation()}
              style={{
                width: '100%', height: '100%', resize: 'none', border: 'none',
                background: 'transparent', outline: 'none', textAlign: 'center',
                fontSize: el.fontSize, color: el.color,
                fontWeight: el.bold ? 'bold' : 'normal',
                fontFamily: 'inherit',
              }}
            />
          ) : (
            <div style={{
              width: '100%', textAlign: 'center', padding: '4px 6px',
              fontSize: el.fontSize, color: el.color,
              fontWeight: el.bold ? 'bold' : 'normal',
              whiteSpace: 'pre-wrap', wordBreak: 'break-word',
            }}>
              {el.content || 'Double-click to edit'}
            </div>
          )}
        </div>
      )}

      {/* Resize handles */}
      {isSelected && RESIZE_HANDLES.map((h) => (
        <div
          key={h}
          className="resize-handle"
          style={{ ...HANDLE_BASE, ...HANDLE_POS[h] }}
          onMouseDown={(e) => onMouseDownResize(e, h)}
        />
      ))}
    </div>
  );
};
