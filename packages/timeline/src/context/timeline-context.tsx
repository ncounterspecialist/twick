import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { TIMELINE_ACTION, TIMELINE_OPERATION } from "../utils/constants";
import { Timeline, TimelineData, TimelineElement } from "../types";
import { ServiceResult } from "../types/result.types";
import { UndoRedoProvider, useUndoRedo } from "./undo-redo-context";
import timelineService from "../services/timeline/timeline.service";

type TimelineContextType = {
  selectedItem: TimelineElement | Timeline | null;
  latestProjectVersion: number;
  timelineAction: {
    type: string;
    payload: any;
  };
  timelineOperation: {
    type: string;
    payload: any;
  };
  timelineOperationResult: ServiceResult<any> | null,
  enableUndoRedo: boolean;
  // Undo/Redo functionality
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  resetHistory: () => void;
  setLatestProjectVersion: (version: number) => void;
  setSelectedItem: (item: TimelineElement | Timeline | null) => void;
  setTimelineAction: (type: string, payload: any) => void;
  setTimelineOperation: (type: string, payload: any) => void;
  setTimelineOperationResult: (result: ServiceResult<any> | null) => void;
};

const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

export interface TimelineProviderProps {
  children: React.ReactNode;
  initialData?: {
    timeline: Timeline[];
    version: number;
  };
  enableUndoRedo?: boolean;
  undoRedoPersistenceKey?: string;
  maxHistorySize?: number;
}

// Inner component that uses the UndoRedo context
const TimelineProviderInner = ({ 
  children, 
  initialData, 
  enableUndoRedo = true,
}: TimelineProviderProps) => {
  const [timelineAction, setTimelineActionState] = useState<{ type: string; payload: any }>({
    type: TIMELINE_ACTION.NONE,
    payload: null,
  });

  const [timelineOperation, setTimelineOperationState] = useState<{ type: string; payload: any }>({
    type: TIMELINE_OPERATION.NONE,
    payload: null,
  });

  const [timelineOperationResult, setTimelineOperationResult] = useState<ServiceResult<any> | null>(null);

  const [selectedItem, setSelectedItem] = useState<TimelineElement | Timeline | null>(null);

  const [latestProjectVersion, setLatestProjectVersion] = useState(0);

  // Track if we're currently performing an undo/redo operation to prevent loops
  const isUndoRedoOperation = useRef<boolean>(false);

  // Get undo/redo context if enabled
  let undoRedoContext: ReturnType<typeof useUndoRedo> | null = null;
  if (enableUndoRedo) {
    try {
      undoRedoContext = useUndoRedo();
    } catch (error) {
      console.warn('UndoRedoProvider not found. Undo-redo functionality disabled.');
    }
  }

  // Centralized undo/redo handlers that integrate with timeline service
  const handleUndo = useCallback(() => {
    if (enableUndoRedo && undoRedoContext?.canUndo) {
      isUndoRedoOperation.current = true;
      const result = undoRedoContext.undo();
      if (result) {
        timelineService.setTimeline(result.timeline, result.version);
        setTimelineAction(TIMELINE_ACTION.UNDO, result);
      }
      isUndoRedoOperation.current = false;
    }
  }, [enableUndoRedo, undoRedoContext]);

  const handleRedo = useCallback(() => {
    if (enableUndoRedo && undoRedoContext?.canRedo) {
      isUndoRedoOperation.current = true;
      const result = undoRedoContext.redo();
      if (result) {
        timelineService.setTimeline(result.timeline, result.version);
        setTimelineAction(TIMELINE_ACTION.REDO, result);
      }
      isUndoRedoOperation.current = false;
    }
  }, [enableUndoRedo, undoRedoContext]);

  const handleResetHistory = useCallback(() => {
    if (enableUndoRedo && undoRedoContext) {
      undoRedoContext.resetHistory();
      setTimelineAction(TIMELINE_ACTION.RESET_HISTORY, null);
    }
  }, [enableUndoRedo, undoRedoContext]);

  const setTimelineAction = (type: string, payload: any) => {
    setTimelineActionState({ type, payload });
    
    // Handle undo/redo state changes - only if not already in an undo/redo operation
    if (enableUndoRedo && undoRedoContext && type === TIMELINE_ACTION.SET_PRESENT && !isUndoRedoOperation.current) {
      undoRedoContext.setPresent(payload);
    }
  };

  const setTimelineOperation = (type: string, payload: any) => {
    setTimelineOperationState({ type, payload });
  };

  const initialize = (data: TimelineData) => {
    if(enableUndoRedo && undoRedoContext) {
      const lastPersistedState = undoRedoContext.getLastPersistedState();
      if(lastPersistedState) {
        isUndoRedoOperation.current = true;
        timelineService.setTimeline(lastPersistedState.timeline, lastPersistedState.version);
        isUndoRedoOperation.current = false;
        return;
      }
    }
    setTimelineOperation(TIMELINE_OPERATION.LOAD_PROJECT, data);
  }

  // Initialize timeline data if provided
  useEffect(() => {
    if (initialData) {
      initialize(initialData);
    }
  }, [initialData]);

  const contextValue: TimelineContextType = {
    selectedItem,
    timelineAction,
    timelineOperation,
    latestProjectVersion,
    timelineOperationResult,
    enableUndoRedo,
    // Undo/Redo functionality - now handled centrally
    canUndo: undoRedoContext?.canUndo ?? false,
    canRedo: undoRedoContext?.canRedo ?? false,
    undo: handleUndo,
    redo: handleRedo,
    resetHistory: handleResetHistory,
    setLatestProjectVersion,
    setSelectedItem,
    setTimelineAction,
    setTimelineOperation,
    setTimelineOperationResult,
  };

  return (
    <TimelineContext.Provider value={contextValue}>
      {children}
    </TimelineContext.Provider>
  );
};

export const TimelineProvider = ({ 
  children, 
  initialData, 
  enableUndoRedo = true,
  undoRedoPersistenceKey,
  maxHistorySize,
}: TimelineProviderProps) => {
  // If undo/redo is enabled, wrap with UndoRedoProvider
  if (enableUndoRedo) {
    return (
      <UndoRedoProvider 
        persistenceKey={undoRedoPersistenceKey}
        maxHistorySize={maxHistorySize}
      >
        <TimelineProviderInner 
          initialData={initialData}
          enableUndoRedo={enableUndoRedo}
          undoRedoPersistenceKey={undoRedoPersistenceKey}
          maxHistorySize={maxHistorySize}
        >
          {children}
        </TimelineProviderInner>
      </UndoRedoProvider>
    );
  }

  // Otherwise, render without UndoRedoProvider
  return (
    <TimelineProviderInner 
      initialData={initialData}
      enableUndoRedo={enableUndoRedo}
      undoRedoPersistenceKey={undoRedoPersistenceKey}
      maxHistorySize={maxHistorySize}
    >
      {children}
    </TimelineProviderInner>
  );
};

export const useTimelineContext = () => {
  const context = useContext(TimelineContext);
  if (context === undefined) {
    throw new Error("useTimelineContext must be used within a TimelineProvider");
  }
  return context;
};
