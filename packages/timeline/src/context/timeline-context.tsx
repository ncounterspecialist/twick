import { createContext, useContext, useState, useEffect } from "react";
import { TIMELINE_ACTION } from "../utils/constants";
import { UndoRedoProvider, useUndoRedo } from "./undo-redo-context";
import { Track } from "../core/track/track";
import { TrackElement } from "../core/elements/base.element";
import { ProjectJSON, TrackJSON } from "../types";

type TimelineContextType = {
  contextId: string;
  selectedItem: Track | TrackElement | null;
  latestProjectVersion: number;
  timelineAction: {
    type: string;
    payload: any;
  };
  totalDuration: number;
  present: ProjectJSON | null;
  setPresent: (data: ProjectJSON) => void;
  canUndo: boolean;
  canRedo: boolean;
  handleUndo: () => void;
  handleRedo: () => void;
  handleResetHistory: () => void;
  setTotalDuration: (duration: number) => void;
  setLatestProjectVersion: (version: number) => void;
  setSelectedItem: (item: Track | TrackElement | null) => void;
  setTimelineAction: (type: string, payload: any) => void;
};

const TimelineContext = createContext<TimelineContextType | undefined>(
  undefined
);

export interface TimelineProviderProps {
  children: React.ReactNode;
  contextId: string;
  initialData?: {
    tracks: TrackJSON[];
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
    Track | TrackElement | null
  >(null);

  const [totalDuration, setTotalDuration] = useState(0);

  const [latestProjectVersion, setLatestProjectVersion] = useState(0);

  const undoRedoContext = useUndoRedo();

  const setTimelineAction = (type: string, payload: any) => {
    setTimelineActionState({ type, payload });
  };

  const initialize = (data: ProjectJSON) => {
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
    totalDuration,
    latestProjectVersion,
    present: undoRedoContext.present,
    setPresent: undoRedoContext.setPresent,
    canUndo: undoRedoContext.canUndo,
    canRedo: undoRedoContext.canRedo,
    handleUndo: undoRedoContext.undo,
    handleRedo: undoRedoContext.redo,
    handleResetHistory: undoRedoContext.resetHistory,
    setLatestProjectVersion,
    setTotalDuration,
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
