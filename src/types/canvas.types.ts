import { CSSProperties, Dispatch } from 'react';

// ─── Element Types ─────────────────────────────────────────────────────────────
export type ElementKind = 'text' | 'rect' | 'circle';

export interface CanvasElementData {
  id: string;
  kind: ElementKind;
  x: number;
  y: number;
  w: number;
  h: number;
  zIndex?: number;
  // Text-specific
  content?: string;
  fontSize?: number;
  color?: string;
  bold?: boolean;
  // Shape-specific
  fill?: string;
  stroke?: string;
}

// ─── State & Actions ──────────────────────────────────────────────────────────
export interface CanvasState {
  elements: CanvasElementData[];
  selectedId: string | null;
}

export type CanvasAction =
  | { type: 'ADD_ELEMENT'; payload: CanvasElementData }
  | { type: 'UPDATE_ELEMENT'; id: string; payload: Partial<CanvasElementData> }
  | { type: 'DELETE_ELEMENT'; id: string }
  | { type: 'SELECT'; id: string }
  | { type: 'DESELECT' }
  | { type: 'BRING_FRONT'; id: string }
  | { type: 'SEND_BACK'; id: string }
  | { type: 'SET_STATE'; payload: CanvasState };

export type CanvasDispatch = Dispatch<CanvasAction>;

// ─── Shared Component Props ───────────────────────────────────────────────────
export interface WithDispatch {
  dispatch: CanvasDispatch;
}

// Re-export for convenience
export type { CSSProperties };
