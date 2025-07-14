import { useEffect, useRef, useState } from "react";
import {
  CaptionProps,
  Timeline,
  TimelineData,
  TimelineElement,
} from "../types";
import {
  PLAYER_STATE,
  TIMELINE_ACTION,
  TIMELINE_OPERATION,
} from "../helpers/constants";
import {
  getDecimalNumber,
} from "../helpers/timeline.utils";
import { useTimelineContext } from "../context/timeline-context";
import timelineService from "../services/timeline-service";

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
    setLatestProjectVersion,
  } = useTimelineContext();
  const [duration, setDuration] = useState(0);
  const [timelineData, setTimelineData] = useState<TimelineData | null>(null);
  const elementKeyMap = useRef<Record<string, any>>({});
  const timelinePropsMap = useRef<Record<string, any>>({});

  const latestTimelineData = useRef<TimelineData | null>(null);

  const pauseVideo = () => {
    setTimelineAction(TIMELINE_ACTION.SET_PLAYER_STATE, PLAYER_STATE.PAUSED);
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
      }
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

  useEffect(() => {
    switch (timelineOperation?.type) {
      case TIMELINE_OPERATION.LOAD_PROJECT:
        {
          timelineService.setTimeline(
            timelineOperation?.payload?.timeline || [],
            timelineOperation?.payload?.version || 0
          );
          setTimelineAction(
            TIMELINE_ACTION.SET_PROJECT_DATA,
            latestTimelineData.current
          );
        }
        break;
      case TIMELINE_OPERATION.SET_TIMELINE:
        {
          timelineService.setTimeline(timelineOperation?.payload?.timeline, timelineOperation?.payload?.version);
        }
        break;
      case TIMELINE_OPERATION.ADD_NEW_TIMELINE:
        {
          pauseVideo();
          const data = timelineService.addNewTimeline(timelineOperation?.payload);
          setSelectedItem(data?.timeline);
        }
        break;
      case TIMELINE_OPERATION.UPDATE_CAPTION_TIMELINE:
        {
          pauseVideo();
          timelineService.updateCaptionTimeline(timelineOperation?.payload);
          setSelectedItem(null);
        }
        break;
      case TIMELINE_OPERATION.DELETE_ITEM:
        {
          pauseVideo();
          const { timelineId, id } = timelineOperation?.payload;
          if ((id || "").startsWith("e-")) {
            timelineService.deleteElement(
              timelineId,
              id
            );
            setSelectedItem(null);
          } else if ((id || "").startsWith("t-")) {
            timelineService.deleteTimeline(id);
            setSelectedItem(null);
          }
        }
        break;
      case TIMELINE_OPERATION.ADD_ELEMENT:
        {
          pauseVideo();
          const { element, timelineId } = timelineOperation?.payload;
          if (timelineId) {
            const selectedTimeline = timelineData?.timeline?.find(
              (timeline) => timeline.id === timelineId
            );
            let s = 0;
            if (selectedTimeline && selectedTimeline.elements.length) {
              s =
                selectedTimeline.elements[selectedTimeline.elements.length - 1]
                  .e;
            }
            timelineService
              .addElement({
                timelineId,
                type: element.type,
                props: element.props,
                timing: { s, e: element.e },
                name: element.name,
              })
              .then((data: any) => {
                if (data?.element) {
                  setTimeout(() => {
                    setSelectedItem(data?.element);
                  }, 1000);
                }
              });
          }
        }
        break;
      case TIMELINE_OPERATION.UPDATE_ELEMENT:
        {
          pauseVideo();
          const { elementId, timelineId, updates } =
            timelineOperation?.payload;
          timelineService.editElement({ timelineId, elementId, updates, noSelection: false });
        }
        break;
      case TIMELINE_OPERATION.UPDATE_CAPTION_PROPS:
        {
          pauseVideo();
          const { elementId, timelineId, updates } =
            timelineOperation?.payload || {};
          const { element, updatedCaptionProps } =
            timelineService.editCaptionProps({
              timelineId,
              elementId,
              updates,
              captionProps,
              applyPropsToAllSubtitle,
            });
          if (element) {
            setSelectedItem(element);
          }
          if (applyPropsToAllSubtitle) {
            setTimelineAction(
              TIMELINE_ACTION.SET_CAPTION_PROPS,
              updatedCaptionProps
            );
          }
        }
        setTimelineAction(TIMELINE_ACTION.NONE, null);
        break;
      case TIMELINE_OPERATION.SET_PROJECT_SCRIPT:
        {
          const timeline = timelineOperation?.payload?.input?.timeline;
          elementKeyMap.current = {};
          timelinePropsMap.current = timeline.reduce(
            (acc: Record<string, any>, timeline: Timeline) => {
              acc[timeline.id] = timeline.props;
              timeline.elements.forEach((element) => {
                elementKeyMap.current[element.id] = element;
              });
              return acc;
            },
            {}
          );
          setTimelineAction(TIMELINE_ACTION.RESET_HISTORY, null);
          timelineService.setTimeline(timeline, 0);
        }
        break;
      case TIMELINE_OPERATION.SET_ELEMENT_ANIMATION:
        {
          timelineService.setElementAnimation(timelineOperation?.payload);
        }
        break;
      case TIMELINE_OPERATION.SET_TEXT_EFFECT:
        {
          timelineService.setTextEffect(timelineOperation?.payload);
        }
        break;
      case TIMELINE_OPERATION.SPLIT_ELEMENT:
        {
          const { element: elementToSplit, currentTime } =
            timelineOperation?.payload;
          if (elementToSplit?.id.startsWith("e-")) {
            pauseVideo();
            timelineService.splitElement(
              elementToSplit.timelineId,
              elementToSplit.id,
              getDecimalNumber(currentTime)
            );
          }
        }
        setSelectedItem(null);
        break;
      case TIMELINE_OPERATION.ADD_SOLO_ELEMENT:
        {
          timelineService.addSoloElement(timelineOperation?.payload).then((data: any) => {
            if (data?.element) {
              setSelectedItem(data?.element);
            }
          });
        }
        break;
    }
  }, [timelineOperation]);

  return {
    timelineData,
    duration
  };
};

export default useTimeline;
