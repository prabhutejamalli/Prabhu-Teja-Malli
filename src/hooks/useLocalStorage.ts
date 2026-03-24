import { useEffect } from 'react';
import { CanvasElementData, CanvasDispatch } from '../types/canvas.types';
import { STORAGE_KEY } from '../constants/canvas.constants';

interface UseLocalStorageProps {
  elements: CanvasElementData[];
  dispatch: CanvasDispatch;
  syncIds: (ids: string[]) => void;
}

// ─── Persistence hook (SRP) ───────────────────────────────────────────────────
export function useLocalStorage({ elements, dispatch, syncIds }: UseLocalStorageProps) {
  // Load on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { elements: els } = JSON.parse(saved) as { elements: CanvasElementData[] };
        syncIds(els.map((el) => el.id));
        dispatch({ type: 'SET_STATE', payload: { elements: els, selectedId: null } });
      }
    } catch {
      // corrupt storage — ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ elements }));
    } catch {
      // storage full — ignore
    }
  }, [elements]);
}
