import { createContext, useContext, useState, useEffect } from "react";
import { TIMELINE_ACTION, TIMELINE_OPERATION } from "../utils/constants";
import { Timeline, TimelineElement } from "../types";

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
  operationError: any,
  setLatestProjectVersion: (version: number) => void;
  setSelectedItem: (item: TimelineElement | Timeline | null) => void;
  setTimelineAction: (type: string, payload: any) => void;
  setTimelineOperation: (type: string, payload: any) => void;
  setOperationError: (error: any) => void;
};

const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

export interface TimelineProviderProps {
  children: React.ReactNode;
  initialData?: {
    timeline: Timeline[];
    version: number;
  };
}

export const TimelineProvider = ({ children, initialData }: TimelineProviderProps) => {
  const [timelineAction, setTimelineActionState] = useState<{ type: string; payload: any }>({
    type: TIMELINE_ACTION.NONE,
    payload: null,
  });

  const [timelineOperation, setTimelineOperationState] = useState<{ type: string; payload: any }>({
    type: TIMELINE_OPERATION.NONE,
    payload: null,
  });

  const [operationError, setOperationError] = useState<any>(null);

  const [selectedItem, setSelectedItem] = useState<TimelineElement | Timeline | null>(null);

  const [latestProjectVersion, setLatestProjectVersion] = useState(0);

  const setTimelineAction = (type: string, payload: any) => {
    setTimelineActionState({ type, payload });
  };

  const setTimelineOperation = (type: string, payload: any) => {
    setTimelineOperationState({ type, payload });
  };

  // Initialize timeline data if provided
  useEffect(() => {
    if (initialData) {
      setTimelineAction(TIMELINE_ACTION.UPDATE_PLAYER_DATA, initialData);
    }
  }, [initialData]);

  return (
    <TimelineContext.Provider
      value={{
        selectedItem,
        timelineAction,
        timelineOperation,
        latestProjectVersion,
        operationError,
        setOperationError,
        setLatestProjectVersion,
        setTimelineAction,
        setTimelineOperation,
        setSelectedItem,
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimelineContext = () => {
  const context = useContext(TimelineContext);
  if (context === undefined) {
    throw new Error("useTimelineContext must be used within a TimelineProvider");
  }
  return context;
};
