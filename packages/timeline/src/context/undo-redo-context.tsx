import { createContext, useContext, useState } from "react";
import { TimelineData } from "../types";

const MAX_HISTORY = 20;

// Helper function for deep cloning
const deepClone = <T,>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

interface UndoRedoState {
  past: TimelineData[];
  present: TimelineData | null;
  future: TimelineData[];
}

interface UndoRedoContextType {
  // State
  canUndo: boolean;
  canRedo: boolean;

  // Actions
  setPresent: (timelineData: TimelineData) => void;
  undo: () => TimelineData | null;
  redo: () => TimelineData | null;
  resetHistory: () => void;
  getLastPersistedState: () => TimelineData | null;
  // Configuration
  disablePersistence: () => void;
}

const UndoRedoContext = createContext<UndoRedoContextType | undefined>(
  undefined
);

// Local storage utilities
const STORAGE_KEY_PREFIX = "twick_undo_redo_";

const saveToStorage = (key: string, state: UndoRedoState): void => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (error) {
    console.warn("Failed to save undo-redo state to localStorage:", error);
  }
};

const loadFromStorage = (key: string): UndoRedoState | null => {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch (error) {
    console.warn("Failed to load undo-redo state from localStorage:", error);
    return null;
  }
};

export interface UndoRedoProviderProps {
  children: React.ReactNode;
  persistenceKey?: string;
  maxHistorySize?: number;
}

export const UndoRedoProvider: React.FC<UndoRedoProviderProps> = ({
  children,
  persistenceKey,
  maxHistorySize = MAX_HISTORY,
}) => {
  const [state, setState] = useState<UndoRedoState>(() => {
    // Load from storage if persistence is enabled
    if (persistenceKey) {
      const stored = loadFromStorage(STORAGE_KEY_PREFIX + persistenceKey);
      if (stored) {
        return {
          past: stored.past,
          present: stored.present,
          future: stored.future,
        };
      }
    }

    return {
      past: [],
      present: null,
      future: [],
    };
  });

  // Save to storage whenever state changes (if persistence enabled)
  const saveState = (newState: UndoRedoState) => {
    if (persistenceKey) {
      saveToStorage(STORAGE_KEY_PREFIX + persistenceKey, newState);
    }
  };

  // When user makes a new change
  const setPresent = (timelineData: TimelineData) => {
    setState((prevState) => {
      let newPast = [...prevState.past];
      if (prevState.present) {
        newPast.push(deepClone(prevState.present));
      }

      const newState: UndoRedoState = {
        past: newPast,
        present: deepClone(timelineData),
        future: [], // Clear future because it's a new change
      };

      // Limit history size
      if (newState.past.length > maxHistorySize) {
        newState.past.shift(); // Remove oldest
      }

      saveState(newState);
      return newState;
    });
  };

  const undo = (): TimelineData | null => {
    let undoResult: TimelineData | null = null;

    setState((prevState) => {
      if (prevState.past.length === 0) return prevState;

      const previous = prevState.past[prevState.past.length - 1];
      const newState: UndoRedoState = {
        past: prevState.past.slice(0, -1), // Remove last item
        present: previous,
        future: prevState.present
          ? [deepClone(prevState.present), ...prevState.future]
          : prevState.future,
      };

      undoResult = previous;
      saveState(newState);
      return newState;
    });

    return undoResult;
  };

  const redo = (): TimelineData | null => {
    let redoResult: TimelineData | null = null;

    setState((prevState) => {
      if (prevState.future.length === 0) return prevState;

      const next = prevState.future[0];
      const newState: UndoRedoState = {
        past: prevState.present
          ? [...prevState.past, deepClone(prevState.present)]
          : prevState.past,
        present: next,
        future: prevState.future.slice(1), // Remove first item
      };

      // Limit history size
      if (newState.past.length > maxHistorySize) {
        newState.past.shift();
      }

      redoResult = next;
      saveState(newState);
      return newState;
    });

    return redoResult;
  };

  const getLastPersistedState = () => {
    if (persistenceKey) {
      const stored = loadFromStorage(STORAGE_KEY_PREFIX + persistenceKey);
      return stored?.present || null;
    }
    return null;
  };

  // Reset all history
  const resetHistory = () => {
    const newState: UndoRedoState = {
      past: [],
      present: null,
      future: [],
    };

    setState(newState);

    // Clear from storage too
    if (persistenceKey) {
      localStorage.removeItem(STORAGE_KEY_PREFIX + persistenceKey);
    }
  };

  const disablePersistence = () => {
    if (persistenceKey) {
      localStorage.removeItem(STORAGE_KEY_PREFIX + persistenceKey);
    }
  };

  const contextValue: UndoRedoContextType = {
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    setPresent,
    undo,
    redo,
    resetHistory,
    getLastPersistedState,
    disablePersistence,
  };

  return (
    <UndoRedoContext.Provider value={contextValue}>
      {children}
    </UndoRedoContext.Provider>
  );
};

export const useUndoRedo = (): UndoRedoContextType => {
  const context = useContext(UndoRedoContext);
  if (context === undefined) {
    throw new Error("useUndoRedo must be used within an UndoRedoProvider");
  }
  return context;
};
