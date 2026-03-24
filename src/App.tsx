import { useCallback, CSSProperties } from 'react';
import { useUndoRedo } from './hooks/useUndoRedo';
import { useCanvasId } from './hooks/useCanvasId';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useLocalStorage } from './hooks/useLocalStorage';
import { initialState } from './store/canvasReducer';
import { DEFAULT_TEXT, DEFAULT_RECT, DEFAULT_CIRCLE } from './constants/canvas.constants';
import { Toolbar } from './components/Toolbar/Toolbar';
import { LayersPanel } from './components/LayersPanel/LayersPanel';
import { Canvas } from './components/Canvas/Canvas';
import { PropertiesPanel } from './components/PropertiesPanel/PropertiesPanel';
import { StatusBar } from './components/StatusBar/StatusBar';

const s: Record<string, CSSProperties> = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    fontFamily: 'monospace',
    background: '#f5f5f5',
  },
  workspace: { flex: 1, display: 'flex', overflow: 'hidden' },
};

// ─── App: thin orchestration layer — wires hooks and components (SRP + DIP) ──
export default function App() {
  const { state, dispatch, undo, redo, canUndo, canRedo } = useUndoRedo(initialState);
  const { elements, selectedId } = state;
  const selected = elements.find((e) => e.id === selectedId);
  const { genId, syncFrom } = useCanvasId();

  useLocalStorage({ elements, dispatch, syncIds: syncFrom });

  const handleDelete = useCallback(
    (id: string) => dispatch({ type: 'DELETE_ELEMENT', id }),
    [dispatch]
  );

  useKeyboardShortcuts({ selectedId, undo, redo, onDelete: handleDelete });

  const onAddText = () =>
    dispatch({ type: 'ADD_ELEMENT', payload: { id: genId(), kind: 'text', ...DEFAULT_TEXT } });

  const onAddRect = () =>
    dispatch({ type: 'ADD_ELEMENT', payload: { id: genId(), kind: 'rect', ...DEFAULT_RECT } });

  const onAddCircle = () =>
    dispatch({ type: 'ADD_ELEMENT', payload: { id: genId(), kind: 'circle', ...DEFAULT_CIRCLE } });

  return (
    <div style={s.app}>
      <Toolbar
        dispatch={dispatch}
        selectedId={selectedId}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
        onAddText={onAddText}
        onAddRect={onAddRect}
        onAddCircle={onAddCircle}
      />

      <div style={s.workspace}>
        <LayersPanel elements={elements} selectedId={selectedId} dispatch={dispatch} />
        <Canvas elements={elements} selectedId={selectedId} dispatch={dispatch} />
        <PropertiesPanel selected={selected} selectedId={selectedId} dispatch={dispatch} />
      </div>

      <StatusBar elements={elements} selected={selected} />
    </div>
  );
}
