import { createContext, useContext, useState, useEffect } from "react";
import { TIMELINE_ACTION } from "../utils/constants";
import { Timeline, TimelineData, TimelineElement } from "../types";
import { UndoRedoProvider, useUndoRedo } from "./undo-redo-context";

type TimelineContextType = {
  contextId: string;
  selectedItem: TimelineElement | Timeline | null;
  latestProjectVersion: number;
  timelineAction: {
    type: string;
    payload: any;
  };
  canUndo: boolean;
  canRedo: boolean;
  handleUndo: () => void;
  handleRedo: () => void;
  handleResetHistory: () => void;
  setLatestProjectVersion: (version: number) => void;
  setSelectedItem: (item: TimelineElement | Timeline | null) => void;
  setTimelineAction: (type: string, payload: any) => void;
};

const TimelineContext = createContext<TimelineContextType | undefined>(
  undefined
);

export interface TimelineProviderProps {
  children: React.ReactNode;
  contextId: string;
  initialData?: {
    timeline: Timeline[];
    version: number;
  };
  undoRedoPersistenceKey?: string;
  maxHistorySize?: number;
}

// Inner component that uses the UndoRedo context
const TimelineProviderInner = ({
  contextId,
  children,
  initialData,
}: TimelineProviderProps) => {
  const [timelineAction, setTimelineActionState] = useState<{
    type: string;
    payload: any;
  }>({
    type: TIMELINE_ACTION.NONE,
    payload: null,
  });

  const [selectedItem, setSelectedItem] = useState<
    TimelineElement | Timeline | null
  >(null);

  const [latestProjectVersion, setLatestProjectVersion] = useState(0);

  const undoRedoContext = useUndoRedo();

  const setTimelineAction = (type: string, payload: any) => {
    setTimelineActionState({ type, payload });
  };

  const initialize = (data: TimelineData) => {
    const lastPersistedState = undoRedoContext.getLastPersistedState();
    if (lastPersistedState) {
      setTimelineAction(TIMELINE_ACTION.SET_PROJECT_DATA, lastPersistedState);
      return;
    }
    setTimelineAction(TIMELINE_ACTION.SET_PROJECT_DATA, data);
  };

  // Initialize timeline data if provided
  useEffect(() => {
    if (initialData) {
      initialize(initialData);
    }
  }, [initialData]);

  const contextValue: TimelineContextType = {
    contextId,
    selectedItem,
    timelineAction,
    latestProjectVersion,
    canUndo: undoRedoContext.canUndo,
    canRedo: undoRedoContext.canRedo,
    handleUndo: undoRedoContext.undo,
    handleRedo: undoRedoContext.redo,
    handleResetHistory: undoRedoContext.resetHistory,
    setLatestProjectVersion,
    setSelectedItem,
    setTimelineAction,
  };

  return (
    <TimelineContext.Provider value={contextValue}>
      {children}
    </TimelineContext.Provider>
  );
};

export const TimelineProvider = ({
  contextId,
  children,
  initialData,
  undoRedoPersistenceKey,
  maxHistorySize,
}: TimelineProviderProps) => {
  // If undo/redo is enabled, wrap with UndoRedoProvider
  return (
    <UndoRedoProvider
      persistenceKey={undoRedoPersistenceKey}
      maxHistorySize={maxHistorySize}
    >
      <TimelineProviderInner
        initialData={initialData}
        contextId={contextId}
        undoRedoPersistenceKey={undoRedoPersistenceKey}
        maxHistorySize={maxHistorySize}
      >
        {children}
      </TimelineProviderInner>
    </UndoRedoProvider>
  );
};

export const useTimelineContext = () => {
  const context = useContext(TimelineContext);
  if (context === undefined) {
    throw new Error(
      "useTimelineContext must be used within a TimelineProvider"
    );
  }
  return context;
};
