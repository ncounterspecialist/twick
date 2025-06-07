import { createContext, useContext, useState } from "react";
import { TIMELINE_ACTION, TIMELINE_OPERATION } from "../helpers/constants";

type TimelineContextType = {
  timelineAction: {
    action: string;
    data: any;
  };
  timelineOperation: {
    operation: string;
    data: any;
  };
  setTimelineAction: (action: string, data: any) => void;
  setTimelineOperation: (action: string, data: any) => void;
};

const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

export const TimelineProvider = ({ children }: { children: React.ReactNode }) => {
  const [timelineAction, setTimelineActionState] = useState<{ action: string; data: any }>({
    action: TIMELINE_ACTION.NONE,
    data: null,
  });

  const [timelineOperation, setTimelineOperationState] = useState<{ operation: string; data: any }>({
    operation: TIMELINE_OPERATION.NONE,
    data: null,
  });

  const setTimelineAction = (action: string, data: any) => {
    setTimelineActionState({ action, data });
  };

  const setTimelineOperation = (operation: string, data: any) => {
    setTimelineOperationState({ operation, data });
  };

  return (
    <TimelineContext.Provider
      value={{
        timelineAction,
        timelineOperation,
        setTimelineAction,
        setTimelineOperation,
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimelineContext = () => {
  const context = useContext(TimelineContext);
  if (context === undefined) {
    throw new Error("useTimeline must be used within a TimelineProvider");
  }
  return context;
};
