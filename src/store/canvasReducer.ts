import { CanvasState, CanvasAction } from '../types/canvas.types';

export const initialState: CanvasState = {
  elements: [],
  selectedId: null,
};

// ─── Pure reducer — no side effects (SRP) ─────────────────────────────────────
export function canvasReducer(state: CanvasState, action: CanvasAction): CanvasState {
  switch (action.type) {
    case 'ADD_ELEMENT':
      return {
        ...state,
        elements: [...state.elements, action.payload],
        selectedId: action.payload.id,
      };

    case 'UPDATE_ELEMENT':
      return {
        ...state,
        elements: state.elements.map((el) =>
          el.id === action.id ? { ...el, ...action.payload } : el
        ),
      };

    case 'DELETE_ELEMENT':
      return {
        ...state,
        elements: state.elements.filter((el) => el.id !== action.id),
        selectedId: state.selectedId === action.id ? null : state.selectedId,
      };

    case 'SELECT':
      return { ...state, selectedId: action.id };

    case 'DESELECT':
      return { ...state, selectedId: null };

    case 'BRING_FRONT': {
      const el = state.elements.find((e) => e.id === action.id);
      if (!el) return state;
      return {
        ...state,
        elements: [...state.elements.filter((e) => e.id !== action.id), el],
      };
    }

    case 'SEND_BACK': {
      const el = state.elements.find((e) => e.id === action.id);
      if (!el) return state;
      return {
        ...state,
        elements: [el, ...state.elements.filter((e) => e.id !== action.id)],
      };
    }

    case 'SET_STATE':
      return action.payload;

    default:
      return state;
  }
}
