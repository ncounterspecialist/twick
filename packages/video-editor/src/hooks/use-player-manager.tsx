import { CANVAS_OPERATIONS, CanvasElement, useTwickCanvas } from "@twick/canvas";
import {
  CaptionElement,
  ElementDeserializer,
  getCurrentElements,
  TIMELINE_ACTION,
  useTimelineContext,
} from "@twick/timeline";
import { useLivePlayerContext } from "@twick/live-player";
import { useCallback, useEffect, useRef, useState } from "react";
import { createElementFromDrop } from "./use-timeline-drop";
import type { CanvasDropPayload } from "./use-canvas-drop";
import type { CanvasConfig } from "../helpers/types";

/**
 * Custom hook to manage player state and canvas interactions.
 * Handles player data updates, canvas operations, and timeline synchronization
 * for the video editor component.
 *
 * @param videoProps - Object containing video dimensions
 * @param canvasConfig - Canvas behavior options (e.g. enableShiftAxisLock) from editorConfig / studioConfig
 * @returns Object containing player management functions and state
 *
 * @example
 * ```js
 * const { twickCanvas, projectData, updateCanvas } = usePlayerManager({
 *   videoProps: { width: 1920, height: 1080 },
 *   canvasConfig: { enableShiftAxisLock: true }
 * });
 * ```
 */
export const usePlayerManager = ({
  videoProps,
  canvasConfig,
}: {
  videoProps: { width: number; height: number };
  canvasConfig?: CanvasConfig;
}) => {
  const [projectData, setProjectData] = useState<any>(null);
  const {
    timelineAction,
    setTimelineAction,
    setSelectedItem,
    editor,
    changeLog,
    videoResolution,
  } = useTimelineContext();
  const { getCurrentTime } = useLivePlayerContext();

  const currentChangeLog = useRef(changeLog);
  const prevSeekTime = useRef(0);
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
  const handleCanvasReady = (_canvas: any) => {};

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
    if (operation === CANVAS_OPERATIONS.ADDED_NEW_ELEMENT) {
      if (data?.element) {
        setSelectedItem(data.element);
      }
      return;
    }
    if (operation === CANVAS_OPERATIONS.CAPTION_PROPS_UPDATED) {
      const subtitlesTrack = editor.getSubtitlesTrack();
      subtitlesTrack?.setProps(data.props);
      setSelectedItem(data.element);
      editor.refresh();
    } else if (operation === CANVAS_OPERATIONS.WATERMARK_UPDATED) {
      const w = editor.getWatermark();
      if (w && data) {
        if (data.position) w.setPosition(data.position);
        if (data.rotation != null) w.setRotation(data.rotation);
        if (data.opacity != null) w.setOpacity(data.opacity);
        if (data.props) w.setProps(data.props);
        editor.setWatermark(w);
        currentChangeLog.current = currentChangeLog.current + 1;
      }
    } else {
      const element = ElementDeserializer.fromJSON(data);
      switch (operation) {
        case CANVAS_OPERATIONS.ITEM_SELECTED:
          setSelectedItem(element);
          break;
        case CANVAS_OPERATIONS.ITEM_UPDATED:
          if (element) {
            const updatedElement = editor.updateElement(element);
            currentChangeLog.current = currentChangeLog.current + 1;
            setSelectedItem(updatedElement);
          }
          break;
        default:
          break;
      }
    }
  };

  const handleDropOnCanvas = useCallback(
    async (payload: CanvasDropPayload) => {
      const { type, url, canvasX, canvasY } = payload;
      const element = createElementFromDrop(type, url, videoResolution);
      const currentTime = getCurrentTime();
      element.setStart(currentTime);

      const newTrack = editor.addTrack(`Track_${Date.now()}`);
      const result = await editor.addElementToTrack(newTrack, element);
      if (result) {
        setSelectedItem(element);
        currentChangeLog.current = currentChangeLog.current + 1;
        editor.refresh();
        handleCanvasOperation(CANVAS_OPERATIONS.ADDED_NEW_ELEMENT, {
          element,
          canvasPosition: canvasX != null && canvasY != null ? { x: canvasX, y: canvasY } : undefined,
        });
      }
    },
    [editor, videoResolution, getCurrentTime, setSelectedItem]
  );

  const { twickCanvas, buildCanvas, setCanvasElements } = useTwickCanvas({
    onCanvasReady: handleCanvasReady,
    onCanvasOperation: handleCanvasOperation,
    enableShiftAxisLock: canvasConfig?.enableShiftAxisLock ?? false,
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
    if (
      changeLog === currentChangeLog.current &&
      seekTime === prevSeekTime.current
    ) {
      return;
    }
    prevSeekTime.current = seekTime;
    const elements = getCurrentElements(
      seekTime,
      editor.getTimelineData()?.tracks ?? []
    );
    let captionProps = {};
    (elements || []).forEach((element) => {
      if (element instanceof CaptionElement) {
        const track = editor.getTrackById(element.getTrackId());
        captionProps = track?.getProps() ?? {};
      }
    });
    const watermark = editor.getWatermark();
    let watermarkElement: CanvasElement | undefined;
    if (watermark) {
      const position = watermark.getPosition();
      watermarkElement = {
        id: watermark.getId(),
        type: watermark.getType(),
        props: {
          ...(watermark.getProps() || {}),
          x: position?.x ?? 0,
          y: position?.y ?? 0,
          rotation: watermark.getRotation() ?? 0,
          opacity: watermark.getOpacity() ?? 1,
        },
      };
    }
    setCanvasElements({
      elements,
      watermark: watermarkElement,
      seekTime,
      captionProps,
      cleanAndAdd: true,
    });
    currentChangeLog.current = changeLog;
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
    if (event?.detail?.status === "ready") {
      setPlayerUpdating(false);
      setTimelineAction(TIMELINE_ACTION.ON_PLAYER_UPDATED, null);
    }
  };

  useEffect(() => {
    switch (timelineAction.type) {
      case TIMELINE_ACTION.UPDATE_PLAYER_DATA:
        if (videoProps) {
          if (
            timelineAction.payload?.forceUpdate ||
            editor.getLatestVersion() !== projectData?.input?.version
          ) {
            setPlayerUpdating(true);
            const _latestProjectData = {
              input: {
                properties: videoProps,
                tracks: timelineAction.payload?.tracks ?? [],
                version: timelineAction.payload?.version ?? 0,
              },
            };
            setProjectData(_latestProjectData);
            if (timelineAction.payload?.version === 1) {
              setTimeout(() => {
                setPlayerUpdating(false);
              });
            }
          } else {
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
    handleDropOnCanvas,
  };
};
