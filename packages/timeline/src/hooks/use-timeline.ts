import { useEffect, useRef, useState, useCallback } from "react";
import {
  CaptionProps,
  Timeline,
  TimelineData,
  TimelineElement,
} from "../types";
import { PLAYER_STATE, TIMELINE_ACTION } from "../utils/constants";

import { useTimelineContext } from "../context/timeline-context";
import timelineService from "../services/timeline/timeline.service";
import {
  executeTimelineOperation,
  TimelineOperationContext,
} from "./timeline-operations";

export const useTimeline = ({
  selectedItem,
  captionProps,
  videoSize,
  applyPropsToAllSubtitle,
}: {
  selectedItem: TimelineElement | Timeline | null;
  videoSize: {
    width: number;
    height: number;
  };
  captionProps: CaptionProps;
  applyPropsToAllSubtitle: boolean;
}) => {
  const {
    timelineOperation,
    setTimelineAction,
    setSelectedItem,
    setTimelineOperationResult,
    setLatestProjectVersion,
  } = useTimelineContext();
  const [duration, setDuration] = useState(0);
  const [timelineData, setTimelineData] = useState<TimelineData | null>(null);
  const timelinePropsMap = useRef<Record<string, any>>({});

  const latestTimelineData = useRef<TimelineData | null>(null);

  const pauseVideo = useCallback(() => {
    setTimelineAction(TIMELINE_ACTION.SET_PLAYER_STATE, PLAYER_STATE.PAUSED);
  }, [setTimelineAction]);

  // Create stable operation context using useRef
  const operationContextRef = useRef<TimelineOperationContext>({
    timelineData: null,
    captionProps,
    applyPropsToAllSubtitle,
    setSelectedItem,
    setTimelineAction,
    setTimelineOperationResult,
    setLatestProjectVersion,
    pauseVideo,
  });

  // Update context when dependencies change
  operationContextRef.current = {
    timelineData,
    captionProps,
    applyPropsToAllSubtitle,
    setSelectedItem,
    setTimelineAction,
    setTimelineOperationResult,
    setLatestProjectVersion,
    pauseVideo,
  };

  useEffect(() => {
    timelineService.initialize({
      videoSize,
      onTimelineUpdate: (timelineData: TimelineData) => {
        setTimelineData(timelineData);
        setLatestProjectVersion(timelineData.version);
        latestTimelineData.current = timelineData;
        setTimelineAction(TIMELINE_ACTION.SET_PRESENT, timelineData);
      },
      onSelectionChange: (item: TimelineElement | Timeline | null) => {
        setSelectedItem(item);
      },
    });
  }, [videoSize]);

  useEffect(() => {
    const totalDuration = timelineService.getTotalDuration();
    setDuration(totalDuration);
    setTimelineAction(TIMELINE_ACTION.SET_DURATION, totalDuration);
  }, [timelineData]);

  useEffect(() => {
    if (selectedItem?.id) {
      if (selectedItem.id.startsWith("e-")) {
        setTimelineAction(
          TIMELINE_ACTION.SET_CURRENT_TIMELINE_PROPS,
          timelinePropsMap.current[(selectedItem as TimelineElement).timelineId]
        );
      } else if (selectedItem.id.startsWith("t-")) {
        setTimelineAction(
          TIMELINE_ACTION.SET_CURRENT_TIMELINE_PROPS,
          timelinePropsMap.current[selectedItem.id]
        );
      }
    } else {
      setTimelineAction(TIMELINE_ACTION.SET_CURRENT_TIMELINE_PROPS, null);
    }
  }, [selectedItem]);

  // Handle timeline operations using the new operation handler system
  useEffect(() => {
    if (timelineOperation) {
      executeTimelineOperation(timelineOperation, operationContextRef.current);
    }
  }, [timelineOperation]);

  return {
    timelineData,
    duration,
  };
};

export default useTimeline;
