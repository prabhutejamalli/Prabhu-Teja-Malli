import { useRef } from 'react';

// ─── Stable ID generator per app instance (SRP) ───────────────────────────────
export function useCanvasId(seed = 1) {
  const counter = useRef(seed);
  const genId = () => `el_${counter.current++}`;
  const syncFrom = (ids: string[]) => {
    ids.forEach((id) => {
      const n = parseInt(id.replace('el_', ''), 10);
      if (!isNaN(n)) counter.current = Math.max(counter.current, n + 1);
    });
  };
  return { genId, syncFrom };
}
