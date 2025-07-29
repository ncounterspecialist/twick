import { CANVAS_OPERATIONS, useTwickCanvas } from "@twick/canvas";
import {
  ElementDeserializer,
  getCurrentElements,
  TIMELINE_ACTION,
  useTimelineContext,
} from "@twick/timeline";
import { useEffect, useState } from "react";

export const usePlayerManager = ({
  videoProps,
}: {
  videoProps: { width: number; height: number };
}) => {
  const [projectData, setProjectData] = useState<any>(null);
  const { timelineAction, setTimelineAction, setSelectedItem, editor } =
    useTimelineContext();

  const handleCanvasReady = (canvas: any) => {
    console.log("canvas ready", canvas);
  };

  const handleCanvasOperation = (operation: string, data: any) => {
    const element = ElementDeserializer.fromJSON(data);
    switch (operation) {
      case CANVAS_OPERATIONS.ITEM_SELECTED:
        setSelectedItem(element);
        break;
      case CANVAS_OPERATIONS.ITEM_UPDATED:
        if (element) {
          editor.updateElementInTrack(element.getTrackId(), element);
        }
        break;
      default:
        break;
    }
  };

  const { twickCanvas, buildCanvas, setCanvasElements } =
    useTwickCanvas({
      onCanvasReady: handleCanvasReady,
      onCanvasOperation: handleCanvasOperation,
    });

  const updateCanvas = (seekTime: number) => {
    const elements = getCurrentElements(
      seekTime,
      editor.getTimelineData()?.tracks ?? []
    );
    setCanvasElements({
      elements,
      seekTime,
      captionProps: {},
      cleanAndAdd: true,
    });
  };

  useEffect(() => {
    switch (timelineAction.type) {
      case TIMELINE_ACTION.UPDATE_PLAYER_DATA:
        if (videoProps) {
          if (timelineAction.payload?.forceUpdate || editor.getLatestVersion() !== projectData?.input?.version) {
            const _latestProjectData = {
              input: {
                properties: videoProps,
                tracks: timelineAction.payload?.tracks ?? [],
                version: timelineAction.payload?.version ?? 0,
              },
            };
            setProjectData(_latestProjectData);
          }
        }
        setTimelineAction(TIMELINE_ACTION.ON_PLAYER_UPDATED, null);
        break;
    }
  }, [timelineAction]);

  return {
    twickCanvas,
    projectData,
    updateCanvas,
    buildCanvas,
  };
};
