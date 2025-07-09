import { createContext, useContext, useState, useEffect } from "react";
import { TIMELINE_ACTION, TIMELINE_OPERATION } from "../helpers/constants";
import { Timeline, TimelineElement } from "../types";

type TimelineContextType = {
  selectedItem: TimelineElement | Timeline | null;
  latestProjectVersion: number;
  timelineAction: {
    action: string;
    data: any;
  };
  timelineOperation: {
    operation: string;
    data: any;
  };
  setLatestProjectVersion: (version: number) => void;
  setSelectedItem: (item: TimelineElement | Timeline | null) => void;
  setTimelineAction: (action: string, data: any) => void;
  setTimelineOperation: (action: string, data: any) => void;
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
  const [timelineAction, setTimelineActionState] = useState<{ action: string; data: any }>({
    action: TIMELINE_ACTION.NONE,
    data: null,
  });

  const [timelineOperation, setTimelineOperationState] = useState<{ operation: string; data: any }>({
    operation: TIMELINE_OPERATION.NONE,
    data: null,
  });

  const [selectedItem, setSelectedItem] = useState<TimelineElement | Timeline | null>(null);

  const [latestProjectVersion, setLatestProjectVersion] = useState(0);

  const setTimelineAction = (action: string, data: any) => {
    setTimelineActionState({ action, data });
  };

  const setTimelineOperation = (operation: string, data: any) => {
    setTimelineOperationState({ operation, data });
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
