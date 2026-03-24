import { useEffect } from 'react';

interface UseKeyboardShortcutsProps {
  selectedId: string | null;
  undo: () => void;
  redo: () => void;
  onDelete: (id: string) => void;
}

// ─── Keyboard shortcut handler (SRP) ─────────────────────────────────────────
export function useKeyboardShortcuts({ selectedId, undo, redo, onDelete }: UseKeyboardShortcutsProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT') return;

      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault();
        e.shiftKey ? redo() : undo();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'y') {
        e.preventDefault();
        redo();
      }
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
        onDelete(selectedId);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedId, undo, redo, onDelete]);
}
