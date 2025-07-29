import { createContext, useContext, useState, useEffect, useMemo, useRef } from "react";
import { TIMELINE_ACTION } from "../utils/constants";
import { UndoRedoProvider, useUndoRedo } from "./undo-redo-context";
import { Track } from "../core/track/track";
import { TrackElement } from "../core/elements/base.element";
import { ProjectJSON, TrackJSON } from "../types";
import { TimelineEditor } from "../core/editor/timeline.editor";
import { editorRegistry } from "../utils/register-editor";

export type TimelineContextType = {
  contextId: string;
  editor: TimelineEditor;
  selectedItem: Track | TrackElement | null;
  latestProjectVersion: number;
  timelineAction: {
    type: string;
    payload: any;
  };
  totalDuration: number;
  present: ProjectJSON | null;
  canUndo: boolean;
  canRedo: boolean;
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

  const [selectedItem, setSelectedItem] = useState<Track | TrackElement | null>(
    null
  );

  const [totalDuration, setTotalDuration] = useState(0);

  const [latestProjectVersion, setLatestProjectVersion] = useState(0);

  const undoRedoContext = useUndoRedo();

  const dataInitialized = useRef(false);

  // Create a single editor instance that's shared across all components
  const editor = useMemo(() => {
    const newEditor = new TimelineEditor({
      contextId,
      setTotalDuration,
      setPresent: undoRedoContext.setPresent,
      handleUndo: undoRedoContext.undo,
      handleRedo: undoRedoContext.redo,
      handleResetHistory: undoRedoContext.resetHistory,
      setLatestProjectVersion,
      setTimelineAction: (action: string, payload?: unknown) => {
        setTimelineActionState({ type: action, payload });
      },
    });
    
    // Register the editor instance in the global registry
    editorRegistry.set(contextId, newEditor);
    
    return newEditor;
  }, [
    contextId,
    undoRedoContext.setPresent,
    undoRedoContext.undo,
    undoRedoContext.redo,
    undoRedoContext.resetHistory,
  ]);

  // Cleanup: Remove editor from registry when context is unmounted
  useEffect(() => {
    return () => {
      editorRegistry.delete(contextId);
    };
  }, [contextId]);

  const setTimelineAction = (type: string, payload: any) => {
    setTimelineActionState({ type, payload });
  };

  const initialize = (data: ProjectJSON) => {
    const lastPersistedState = undoRedoContext.getLastPersistedState();
    if (lastPersistedState) {
      editor.loadProject(lastPersistedState);
      return;
    } else {
      editor.loadProject(data);
    }
    
  };

  // Initialize timeline data if provided
  useEffect(() => {
    if (initialData && !dataInitialized.current) {
      initialize(initialData);
      dataInitialized.current = true;
    }
  }, [initialData]);

  const contextValue: TimelineContextType = {
    contextId,
    selectedItem,
    timelineAction,
    totalDuration,
    latestProjectVersion,
    present: undoRedoContext.present,
    canUndo: undoRedoContext.canUndo,
    canRedo: undoRedoContext.canRedo,
    setSelectedItem,
    setTimelineAction,
    editor, // Include the editor instance
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
