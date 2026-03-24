import { useState, useCallback, useReducer } from 'react';
import { CanvasState, CanvasAction } from '../types/canvas.types';
import { canvasReducer } from '../store/canvasReducer';
import { SKIP_HISTORY_ACTIONS } from '../constants/canvas.constants';

export interface UseUndoRedoReturn {
  state: CanvasState;
  dispatch: (action: CanvasAction) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

// ─── Custom hook: encapsulates undo/redo logic (SRP) ──────────────────────────
export function useUndoRedo(initial: CanvasState): UseUndoRedoReturn {
  const [past, setPast] = useState<CanvasState[]>([]);
  const [present, dispatchCore] = useReducer(canvasReducer, initial);
  const [future, setFuture] = useState<CanvasState[]>([]);

  const dispatch = useCallback(
    (action: CanvasAction) => {
      const shouldSkip = SKIP_HISTORY_ACTIONS.includes(action.type as typeof SKIP_HISTORY_ACTIONS[number]);
      if (!shouldSkip) {
        setPast((p) => [...p, present]);
        setFuture([]);
      }
      dispatchCore(action);
    },
    [present]
  );

  const undo = useCallback(() => {
    if (!past.length) return;
    const prev = past[past.length - 1];
    setPast((p) => p.slice(0, -1));
    setFuture((f) => [present, ...f]);
    dispatchCore({ type: 'SET_STATE', payload: prev });
  }, [past, present]);

  const redo = useCallback(() => {
    if (!future.length) return;
    const next = future[0];
    setFuture((f) => f.slice(1));
    setPast((p) => [...p, present]);
    dispatchCore({ type: 'SET_STATE', payload: next });
  }, [future, present]);

  return {
    state: present,
    dispatch,
    undo,
    redo,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
  };
}
