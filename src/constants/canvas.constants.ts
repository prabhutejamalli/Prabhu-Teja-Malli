// ─── Canvas Dimensions ────────────────────────────────────────────────────────
export const CANVAS_W = 800;
export const CANVAS_H = 540;

// ─── Storage ──────────────────────────────────────────────────────────────────
export const STORAGE_KEY = 'mini_editor';

// ─── Element Constraints ──────────────────────────────────────────────────────
export const MIN_ELEMENT_SIZE = 20;

// ─── Resize Handle Directions ─────────────────────────────────────────────────
export const RESIZE_HANDLES = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'] as const;
export type ResizeHandle = typeof RESIZE_HANDLES[number];

// ─── Default Element Values ───────────────────────────────────────────────────
export const DEFAULT_TEXT = { x: 80, y: 80, w: 160, h: 50, content: 'Text', fontSize: 16, color: '#000000', bold: false } as const;
export const DEFAULT_RECT = { x: 120, y: 120, w: 120, h: 80, fill: '#3a7bd5', stroke: '#1a4ba5' } as const;
export const DEFAULT_CIRCLE = { x: 200, y: 160, w: 90, h: 90, fill: '#e05a5a', stroke: '#a03030' } as const;

// ─── Actions that do NOT affect undo history ─────────────────────────────────
export const SKIP_HISTORY_ACTIONS = ['SELECT', 'DESELECT'] as const;
