import { useEffect, useRef, useState } from "react";
import {
  CaptionProps,
  ImageProps,
  Timeline,
  TimelineData,
  TimelineElement,
  VideoProps,
} from "../types";
import {
  PLAYER_STATE,
  TIMELINE_ACTION,
  TIMELINE_ELEMENT_TYPE,
  TIMELINE_OPERATION,
} from "../helpers/constants";
import {
  getTotalDuration,
  getDecimalNumber,
  generateShortUuid,
} from "../helpers/timeline.utils";
import { useTimelineContext } from "../context/timeline-context";
import { createImageElement, createVideoElement } from "../helpers/element.utils";

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
  const { timelineOperation, setTimelineAction, setSelectedItem } =
    useTimelineContext();
  const [duration, setDuration] = useState(0);
  const [timelineData, setTimelineData] = useState<TimelineData | null>(null);
  const elementKeyMap = useRef<Record<string, any>>({});
  const timelinePropsMap = useRef<Record<string, any>>({});

  const latestTimelineData = useRef<TimelineData | null>(null);

  const setTimeline = (timeline: Timeline[], version?: number) => {
    const updatedVersion = version ?? (timelineData?.version || 0) + 1;
    const updatedTimelineData = {
      timeline: timeline,
      version: updatedVersion,
    };

    setTimelineData(updatedTimelineData);
    latestTimelineData.current = updatedTimelineData;
    // Update the timeline props and element key map
    timelinePropsMap.current = {};
    elementKeyMap.current = {};
    timeline.forEach((timeline) => {
      timelinePropsMap.current[timeline.id] = timeline.props;
      timeline.elements.forEach((element) => {
        elementKeyMap.current[element.id] = element;
      });
    });
    console.log("timelineData", timelineData);
    setTimelineAction(TIMELINE_ACTION.SET_PRESENT, updatedTimelineData);
    return updatedVersion;
  };

  // Create a new timeline
  const addTimeline = (timeline: Timeline) => {
    const updatedTimelines = [...(timelineData?.timeline || []), timeline];
    const version = setTimeline(updatedTimelines);
    return { timeline, version };
  };

  // Delete a timeline
  const deleteTimeline = (timelineId: string) => {
    timelineData?.timeline
      ?.find((timeline) => timeline.id === timelineId)
      ?.elements.forEach((element) => {
        delete elementKeyMap.current[element.id];
      });
    const updatedTimelines =
      timelineData?.timeline?.filter(
        (timeline) => timeline.id !== timelineId
      ) || [];
    delete timelinePropsMap.current[timelineId];
    const version = setTimeline(updatedTimelines);
    return { timelineId: timelineId, version };
  };

  // Edit a timeline
  const editTimeline = (timelineId: string, updates: Partial<Timeline>) => {
    const updatedTimelines =
      timelineData?.timeline?.map((timeline) => {
        if (timeline.id === timelineId) {
          const updatedTimeline = { ...timeline, ...updates };
          timelinePropsMap.current[timelineId] = updatedTimeline.props;
          return updatedTimeline;
        }
        return timeline;
      }) || [];
    const version = setTimeline(updatedTimelines);
    return {
      timelineId: timelineId,
      updates,
      version,
    };
  };

  // Add an element to a timeline
  const addElement = async (
    timelineId: string,
    element: Omit<TimelineElement, "id" | "timelineId">
  ) => {
    let newElement: TimelineElement;

    if (element.type === TIMELINE_ELEMENT_TYPE.IMAGE) {
      const imageElement = await createImageElement({
        props: element.props as ImageProps,
        timing: { s: element.s , e: element.e},
        videoSize,
        timelineId,
        id: `e-${generateShortUuid()}`,
      });
      newElement = {
        ...element,
        ...imageElement,
      };
    } else if (element.type === TIMELINE_ELEMENT_TYPE.VIDEO) {
      const videoElement = await createVideoElement({
        props: element.props as VideoProps,
        timing: { s: element.s, e: element.e },
        videoSize,
        timelineId,
        id: `e-${generateShortUuid()}`,
      });
      newElement = {
        ...element,
        ...videoElement,
      };
    } else {
      newElement = {
        ...element,
        id: `e-${generateShortUuid()}`,
        timelineId: timelineId,
      };
     }

    elementKeyMap.current[newElement.id] = newElement;

    const updatedTimelines =
      timelineData?.timeline?.map((timeline) =>
        timeline.id === timelineId
          ? { ...timeline, elements: [...timeline.elements, newElement] }
          : timeline
      ) || [];

    const version = setTimeline(updatedTimelines);
    return {
      timelineId,
      element: newElement,
      version,
    };
  };

  // Delete an element from a timeline
  const deleteElement = (timelineId: string, elementId: string) => {
    const updatedTimelines =
      timelineData?.timeline?.map((timeline) =>
        timeline.id === timelineId
          ? {
              ...timeline,
              elements: timeline.elements.filter((el) => el.id !== elementId),
            }
          : timeline
      ) || [];

    delete elementKeyMap.current[elementId];
    const version = setTimeline(updatedTimelines);

    return { timelineId, elementId, version };
  };

  const editCaptionProps = (
    timelineId: string,
    elementId: string,
    updates: Partial<TimelineElement>
  ) => {
    let updatedElement;
    const element = elementKeyMap.current[elementId];
    if (!element) {
      return;
    }

    const finalPropUpdates: Record<string, any> = {};
    const finalCaptionProps = { ...(captionProps as Record<string, any>) };

    if (updates.props) {
      Object.keys(updates.props).forEach((prop) => {
        if (Object.prototype.hasOwnProperty.call(finalCaptionProps, prop)) {
          switch (prop) {
            case "pos":
              if (
                finalCaptionProps.pos?.x !== (updates.props as any)?.pos?.x ||
                finalCaptionProps.pos?.y !== (updates.props as any)?.pos?.y
              ) {
                if (applyPropsToAllSubtitle) {
                  finalCaptionProps.pos = (updates.props as any).pos;
                } else {
                  finalPropUpdates.pos = (updates.props as any).pos;
                }
              }
              break;
            case "font":
              {
                if (
                  finalCaptionProps.font?.size !==
                    (updates.props as any)?.font?.size ||
                  finalCaptionProps.font?.family !==
                    (updates.props as any)?.font?.family
                ) {
                  if (applyPropsToAllSubtitle) {
                    finalCaptionProps.font = {
                      ...finalCaptionProps.font,
                      ...(updates.props as any).font,
                    };
                  } else {
                    finalPropUpdates.font = (updates.props as any).font;
                  }
                }
              }
              break;
            case "colors":
              {
                if (
                  finalCaptionProps.colors?.text !==
                    (updates.props as any)?.colors?.text ||
                  finalCaptionProps.colors?.highlight !==
                    (updates.props as any)?.colors?.highlight ||
                  finalCaptionProps.colors?.bgColor !==
                    (updates.props as any)?.colors?.bgColor
                ) {
                  if (applyPropsToAllSubtitle) {
                    finalCaptionProps.colors = {
                      ...finalCaptionProps.colors,
                      ...(updates.props as any).colors,
                    };
                  } else {
                    finalPropUpdates.colors = (updates.props as any).colors;
                  }
                }
              }
              break;
            case "capStyle": {
              if (
                finalCaptionProps.capStyle !== (updates.props as any)?.capStyle
              ) {
                if (applyPropsToAllSubtitle) {
                  finalCaptionProps.capStyle = (updates.props as any).capStyle;
                } else {
                  finalPropUpdates.capStyle = (updates.props as any).capStyle;
                }
              }
            }
          }
        } else {
          finalPropUpdates[prop] = (updates.props as any)[prop];
        }
      });
    }

    const updatedTimelines =
      timelineData?.timeline?.map((timeline) =>
        timeline.id === timelineId
          ? {
              ...timeline,
              props: finalCaptionProps,
              elements: timeline.elements.map((el) => {
                let changedElement;
                if (el.id === elementId) {
                  changedElement = {
                    ...el,
                    ...updates,
                    props: finalPropUpdates,
                  };
                  updatedElement = changedElement;
                  elementKeyMap.current[el.id] = changedElement;
                } else {
                  if (applyPropsToAllSubtitle) {
                    changedElement = { ...el, props: finalPropUpdates };
                    elementKeyMap.current[el.id] = changedElement;
                  } else {
                    changedElement = el;
                  }
                }
                return changedElement;
              }),
            }
          : timeline
      ) || [];

    const version = setTimeline(updatedTimelines);
    if (updatedElement) {
      setSelectedItem(updatedElement);
    }
    if (applyPropsToAllSubtitle) {
      setTimelineAction(TIMELINE_ACTION.SET_CAPTION_PROPS, finalCaptionProps);
    }
    return {
      timelineId,
      elementId,
      updates,
      version,
    };
  };

  // Edit an element in a timeline
  const editElement = ({
    timelineId,
    elementId,
    updates,
    noSelection,
  }: {
    timelineId: string;
    elementId: string;
    updates: Partial<TimelineElement>;
    noSelection?: boolean;
  }) => {
    let updatedElement;
    const element = elementKeyMap.current[elementId];
    if (!element) {
      return;
    }
    const updatedTimelines =
      timelineData?.timeline?.map((timeline) =>
        timeline.id === timelineId
          ? {
              ...timeline,
              elements: timeline.elements.map((el) => {
                if (el.id === elementId) {
                  updatedElement = {
                    ...el,
                    ...updates,
                    props: {
                      ...(element.props || {}),
                      ...(updates.props || {}),
                    },
                  };
                  return updatedElement;
                }
                return el;
              }),
            }
          : timeline
      ) || [];

    const version = setTimeline(updatedTimelines);

    if (updatedElement) {
      elementKeyMap.current[elementId] = updatedElement;
      if (noSelection) {
        // do nothing
      } else {
        setSelectedItem(updatedElement);
      }
    }
    return {
      timelineId,
      elementId,
      updates,
      version,
    };
  };

  // Edit an element in a timeline
  const splitElement = (
    timelineId: string,
    elementId: string,
    splitTime: number
  ) => {
    const element = elementKeyMap.current[elementId];
    if (!element || element.s > splitTime || element.e < splitTime) {
      return;
    }

    let split1;
    let split2;
    switch (element.type) {
      case TIMELINE_ELEMENT_TYPE.VIDEO:
        split1 = {
          ...element,
          id: `e-${generateShortUuid()}`,
          s: element.s,
          e: splitTime,
        };
        split2 = {
          ...element,
          id: `e-${generateShortUuid()}`,
          s: splitTime,
          e: element.e,
          props: {
            ...(element.props || {}),
            time: (element.props?.time || 0) + (splitTime - element.s),
          },
        };
        break;
      case TIMELINE_ELEMENT_TYPE.CAPTION:
        const originalText = element.name || "";
        const originalTextArray = originalText.split(" ");
        if (originalTextArray?.length < 2) {
          return;
        }
        const percentage = (splitTime - element.s) / (element.e - element.s);
        split1 = {
          ...element,
          id: `e-${generateShortUuid()}`,
          s: element.S,
          e: splitTime,
          name: originalTextArray
            .slice(0, Math.floor(originalTextArray.length * percentage))
            .join(" "),
        };
        split2 = {
          ...element,
          id: `e-${generateShortUuid()}`,
          s: splitTime,
          e: element.e,
          name: originalTextArray
            .slice(
              Math.floor(originalTextArray.length * percentage),
              originalTextArray.length
            )
            .join(" "),
        };
        break;
    }
    if (!split1 || !split2) {
      return;
    }
    const updatedTimelines =
      timelineData?.timeline?.map((timeline) =>
        timeline.id === timelineId
          ? {
              ...timeline,
              elements: timeline.elements
                .map((el) => {
                  if (el.id === element.id) {
                    return [split1, split2];
                  }
                  return el;
                })
                .flat(),
            }
          : timeline
      ) || [];
    delete elementKeyMap.current[element.id];
    elementKeyMap.current[split1.id] = split1;
    elementKeyMap.current[split2.id] = split2;
    const version = setTimeline(updatedTimelines);
    return version;
  };

  const addNewTimeline = (timelineData: Timeline | undefined) => {
    const newTimelineId = `t-${generateShortUuid()}`;
    const newTimeline: Timeline = {
      id: newTimelineId,
      type: "element",
      name: "element",
      ...timelineData,
      elements: timelineData?.elements?.length
        ? timelineData.elements.map((element) => {
            const newElement = {
              ...element,
              id: element.id || `e-${generateShortUuid()}`,
              timelineId: newTimelineId,
            };
            elementKeyMap.current[newElement.id] = newElement;
            return newElement;
          })
        : [],
    };
    return addTimeline(newTimeline);
  };

  const updateCaptionTimeline = (captionData: any) => {
    const existingTimeline = (timelineData?.timeline || []).find(
      ({ type }) => type == "caption"
    );
    let timelineId;
    if (existingTimeline) {
      for (const element of existingTimeline.elements) {
        delete elementKeyMap.current[element.id];
      }
      timelineId = existingTimeline.id;
    } else {
      timelineId = `t-${generateShortUuid()}`;
    }

    const captionTimeline = {
      id: timelineId,
      type: "caption",
      name: "caption",
      props: captionData.props,
      elements: (captionData.captions || []).map((caption: any) => {
        const phraseElement = {
          id: caption.id || `e-${generateShortUuid()}`,
          type: "caption",
          s: caption.s,
          e: caption.e,
          timelineId: timelineId,
          name: caption.t,
          props: caption.props ? caption.props : undefined,
        };
        elementKeyMap.current[phraseElement.id] = phraseElement;
        return phraseElement;
      }),
    };
    if (existingTimeline) {
      return editTimeline(timelineId, captionTimeline);
    } else {
      return addTimeline(captionTimeline);
    }
  };

  useEffect(() => {
    const totalDuration = timelineData?.timeline
      ? getTotalDuration(timelineData?.timeline)
      : 0;
    setDuration(totalDuration);
    setTimelineAction(TIMELINE_ACTION.SET_DURATION, totalDuration);
  }, [timelineData]);

  const pauseVideo = () => {
    setTimelineAction(TIMELINE_ACTION.SET_PLAYER_STATE, PLAYER_STATE.PAUSED);
  };

  const addSoloElement = async ({
    currentTime,
    timelineId,
    element,
  }: {
    currentTime: number;
    timelineId: string;
    element: TimelineElement;
  }) => {
    const soloElement: TimelineElement = {
      id: `e-${generateShortUuid()}`,
      type: element.type,
      name: element.name,
      s: currentTime,
      e: currentTime + 1,
      timelineId: element.timelineId,
      props: element.props,
    };

    let elementTimelineId = timelineId;
    if (elementTimelineId) {
      const selectedTimeline = timelineData?.timeline?.find(
        (timeline) => timeline.id === timelineId
      );
      if (selectedTimeline?.type === TIMELINE_ELEMENT_TYPE.VIDEO) {
        soloElement.timelineId = elementTimelineId;

        elementKeyMap.current[soloElement.id] = soloElement;
        return await addElement(elementTimelineId, soloElement);
      }
    }
    elementTimelineId = `t-${generateShortUuid()}`;
    soloElement.timelineId = elementTimelineId;
    const newTimeline: Timeline = {
      id: elementTimelineId,
      type: "element",
      name: "element",
      elements: [soloElement],
    };
    elementKeyMap.current[soloElement.id] = soloElement;
    const data = addTimeline(newTimeline);
    return {
      timelineId: elementTimelineId,
      element: soloElement,
      version: data.version,
    };
  };

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
    switch (timelineOperation?.operation) {
      case TIMELINE_OPERATION.LOAD_PROJECT:
        {
          setTimeline(
            timelineOperation?.data?.timeline || [],
            timelineOperation?.data?.version || 0
          );
          setTimelineAction(
            TIMELINE_ACTION.UPDATE_PROJECT_DATA,
            latestTimelineData.current
          );
        }
        break;
      case TIMELINE_OPERATION.ADD_NEW_TIMELINE:
        {
          pauseVideo();
          const data = addNewTimeline(timelineOperation?.data);
          setSelectedItem(data?.timeline);
          setTimelineAction(
            TIMELINE_ACTION.UPDATE_PROJECT_DATA,
            latestTimelineData.current
          );
        }
        break;
      case TIMELINE_OPERATION.UPDATE_CAPTION_TIMELINE:
        {
          pauseVideo();
          updateCaptionTimeline(timelineOperation?.data);
          setSelectedItem(null);
          setTimelineAction(
            TIMELINE_ACTION.UPDATE_PROJECT_DATA,
            latestTimelineData.current
          );
        }
        break;
      case TIMELINE_OPERATION.DELETE_ITEM:
        {
          pauseVideo();
          if ((timelineOperation?.data?.id || "").startsWith("e-")) {
            deleteElement(
              timelineOperation?.data?.timelineId,
              timelineOperation?.data?.id
            );
            setSelectedItem(null);
            setTimelineAction(
              TIMELINE_ACTION.UPDATE_PROJECT_DATA,
              latestTimelineData.current
            );
          } else if ((timelineOperation?.data?.id || "").startsWith("t-")) {
            deleteTimeline(timelineOperation?.data?.id);
            setSelectedItem(null);
            setTimelineAction(
              TIMELINE_ACTION.UPDATE_PROJECT_DATA,
              latestTimelineData.current
            );
          }
        }
        break;
      case TIMELINE_OPERATION.ADD_ELEMENT:
        {
          pauseVideo();
          const { element, timelineId } = timelineOperation?.data;
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
            addElement(timelineId, { ...element, s }).then(
              (data: any) => {
                setTimelineAction(
                  TIMELINE_ACTION.UPDATE_PROJECT_DATA,
                  latestTimelineData.current
                );
                if (data?.element) {
                  setTimeout(() => {
                    setSelectedItem(data?.element);
                  }, 1000);
                }
              }
            );
          }
        }
        break;
      case TIMELINE_OPERATION.UPDATE_ELEMENT:
        {
          pauseVideo();
          const { elementId, timelineId, updates, forceUpdate } =
            timelineOperation?.data;
          editElement({ timelineId, elementId, updates, noSelection: false });
          if (forceUpdate) {
            setTimelineAction(
              TIMELINE_ACTION.UPDATE_PROJECT_DATA,
              latestTimelineData.current
            );
          }
        }
        break;
      case TIMELINE_OPERATION.UPDATE_CAPTION_PROPS:
        {
          pauseVideo();
          const { elementId, timelineId, updates } =
            timelineOperation?.data || {};
          editCaptionProps(timelineId, elementId, updates);
        }
        setTimelineAction(TIMELINE_ACTION.NONE, null);
        break;
      case TIMELINE_OPERATION.SET_PROJECT_SCRIPT:
        {
          const timeline = timelineOperation.data?.input?.timeline;
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
          setTimeline(timeline, 0);
          setTimelineAction(
            TIMELINE_ACTION.UPDATE_PROJECT_DATA,
            latestTimelineData.current
          );
        }
        break;
      case TIMELINE_OPERATION.SPLIT_ELEMENT:
        {
          const { element: elementToSplit, currentTime } =
            timelineOperation?.data;
          if (elementToSplit?.id.startsWith("e-")) {
            pauseVideo();
            splitElement(
              elementToSplit.timelineId,
              elementToSplit.id,
              getDecimalNumber(currentTime)
            );
          }
        }
        setSelectedItem(null);
        setTimelineAction(
          TIMELINE_ACTION.UPDATE_PROJECT_DATA,
          latestTimelineData.current
        );
        break;
      case TIMELINE_OPERATION.ADD_SOLO_ELEMENT:
        {
          addSoloElement(timelineOperation?.data).then((data: any) => {
            if (data?.element) {
              setSelectedItem(data?.element);
            }
            setTimelineAction(
              TIMELINE_ACTION.UPDATE_PROJECT_DATA,
              latestTimelineData.current
            );
          });
        }
        break;
      case TIMELINE_OPERATION.FETCH_LATEST_PROJECT_DATA:
        {
          setTimelineAction(
            TIMELINE_ACTION.UPDATE_PROJECT_DATA,
            latestTimelineData.current
          );
        }
        break;
    }
  }, [timelineOperation]);

  return {
    timelineData,
    duration,
    setTimeline: (timeline: Timeline[], version?: number) => {
      setTimeline(timeline, version);
      setTimelineAction(
        TIMELINE_ACTION.UPDATE_PROJECT_DATA,
        latestTimelineData.current
      );
    },
    addTimeline,
    deleteTimeline,
    editTimeline,
    addElement,
    deleteElement,
    editElement,
  };
};

export default useTimeline;
