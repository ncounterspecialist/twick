import { CANVAS_OPERATIONS, useTwickCanvas } from "@twick/canvas";
import {
  ElementDeserializer,
  getCurrentElements,
  TIMELINE_ACTION,
  useTimelineContext,
} from "@twick/timeline";
import { useEffect, useState } from "react";

/**
 * Custom hook to manage player state and canvas interactions.
 * Handles player data updates, canvas operations, and timeline synchronization
 * for the video editor component.
 *
 * @param videoProps - Object containing video dimensions
 * @returns Object containing player management functions and state
 * 
 * @example
 * ```js
 * const { twickCanvas, projectData, updateCanvas } = usePlayerManager({
 *   videoProps: { width: 1920, height: 1080 }
 * });
 * ```
 */
export const usePlayerManager = ({
  videoProps,
}: {
  videoProps: { width: number; height: number };
}) => {
  const [projectData, setProjectData] = useState<any>(null);
  const { timelineAction, setTimelineAction, setSelectedItem, editor } =
    useTimelineContext();

  const [playerUpdating, setPlayerUpdating] = useState(false);


  /**
   * Handles canvas ready event and logs canvas initialization.
   * Called when the Fabric.js canvas is fully initialized and ready for use.
   *
   * @param canvas - The initialized canvas instance
   * 
   * @example
   * ```js
   * handleCanvasReady(canvasInstance);
   * // Logs canvas ready status
   * ```
   */
  const handleCanvasReady = (canvas: any) => {
    console.log("canvas ready", canvas);
  };

  /**
   * Handles canvas operations like item selection and updates.
   * Processes canvas events and synchronizes them with the timeline editor
   * for element selection and modification tracking.
   *
   * @param operation - The type of canvas operation performed
   * @param data - The data associated with the operation
   * 
   * @example
   * ```js
   * handleCanvasOperation("ITEM_SELECTED", elementData);
   * // Updates selected item in timeline context
   * ```
   */
  const handleCanvasOperation = (operation: string, data: any) => {
    const element = ElementDeserializer.fromJSON(data);
    switch (operation) {
      case CANVAS_OPERATIONS.ITEM_SELECTED:
        setSelectedItem(element);
        break;
      case CANVAS_OPERATIONS.ITEM_UPDATED:
        if (element) {
          const updatedElement = editor.updateElement(element);
          setSelectedItem(updatedElement)      
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

  /**
   * Updates the canvas with elements active at the specified time.
   * Retrieves current elements from the timeline and renders them
   * on the canvas at the given seek time.
   *
   * @param seekTime - The time in seconds to display on the canvas
   * 
   * @example
   * ```js
   * updateCanvas(5.5);
   * // Updates canvas to show elements active at 5.5 seconds
   * ```
   */
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

  /**
   * Handles player update events from the live player.
   * Processes player status updates and synchronizes them with
   * the timeline editor state.
   *
   * @param event - Custom event containing player update information
   * 
   * @example
   * ```js
   * onPlayerUpdate(customEvent);
   * // Updates timeline action based on player status
   * ```
   */
  const onPlayerUpdate = (event: CustomEvent) => {
    if(event?.detail?.status === 'ready') {
      setPlayerUpdating(false);
      setTimelineAction(TIMELINE_ACTION.ON_PLAYER_UPDATED, null); 
    } 
  }

  useEffect(() => {
    switch (timelineAction.type) {
      case TIMELINE_ACTION.UPDATE_PLAYER_DATA:
        if (videoProps) {
          if (timelineAction.payload?.forceUpdate || editor.getLatestVersion() !== projectData?.input?.version) {
            setPlayerUpdating(true);
            const _latestProjectData = {
              input: {
                properties: videoProps,
                tracks: timelineAction.payload?.tracks ?? [],
                version: timelineAction.payload?.version ?? 0,
              },
            };
            setProjectData(_latestProjectData);
          }  else {
            setTimelineAction(TIMELINE_ACTION.ON_PLAYER_UPDATED, null); 
          }
        }
        break;
    }
  }, [timelineAction]);

  return {
    twickCanvas,
    projectData,
    updateCanvas,
    buildCanvas,
    onPlayerUpdate,
    playerUpdating,
  };
};
