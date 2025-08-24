import { useLivePlayerContext } from "@twick/live-player";
import {
  TrackElement,
  Track,
  useTimelineContext,
  VideoElement,
  AudioElement,
} from "@twick/timeline";
import { useMemo } from "react";
import { DRAG_TYPE } from "../helpers/constants";

/**
 * Custom hook to manage timeline operations and state.
 * Provides functions for handling element dragging, track reordering,
 * seeking, and selection changes in the video editor.
 *
 * @returns Object containing timeline management functions and state
 * 
 * @example
 * ```js
 * const { timelineData, onElementDrag, onSeek, onSelectionChange } = useTimelineManager();
 * 
 * // Handle element dragging
 * onElementDrag({ element, dragType: "START", updates: { start: 5, end: 10 } });
 * 
 * // Seek to specific time
 * onSeek(15.5);
 * ```
 */
export const useTimelineManager = () => {
  const {
    selectedItem,
    changeLog,
    setSelectedItem,
    totalDuration,
    editor,
  } = useTimelineContext();
  /**
   * Handles element dragging operations on the timeline.
   * Updates element start/end times and handles special cases
   * for video and audio elements with playback rate adjustments.
   *
   * @param element - The element being dragged
   * @param dragType - The type of drag operation
   * @param updates - Object containing new start and end times
   * 
   * @example
   * ```js
   * onElementDrag({
   *   element: videoElement,
   *   dragType: "START",
   *   updates: { start: 5.0, end: 15.0 }
   * });
   * ```
   */
  const onElementDrag = ({
    element,
    dragType,
    updates,
  }: {
    updates: { start: number; end: number };
    element: TrackElement;
    dragType: string;
  }) => {
    if (dragType === DRAG_TYPE.START) {
      if (element instanceof VideoElement || element instanceof AudioElement) {
        const elementProps = element.getProps();
        const delta =
          updates.start -
          element.getStart() * (elementProps?.playbackRate || 1);

        if (element instanceof AudioElement) {
          (element as AudioElement).setStartAt(element.getStartAt() + delta);
        } else {
          (element as VideoElement).setStartAt(element.getStartAt() + delta);
        }
      }
    }
    element.setStart(updates.start);
    element.setEnd(updates.end);
    editor.updateElement(element);
  };

  // Get timeline data from editor
  const timelineData = useMemo(() => {
      const timelineDataFromEditor = editor.getTimelineData();
      // console.log(changeLog, timelineDataFromEditor);
      return timelineDataFromEditor;
  }, [changeLog]);

  const { setSeekTime, setCurrentTime } = useLivePlayerContext();

  /**
   * Handles track reordering in the timeline.
   * Updates the track order in the editor based on the
   * new arrangement of tracks.
   *
   * @param reorderedItems - Array of tracks in their new order
   * 
   * @example
   * ```js
   * onReorder([track1, track2, track3]);
   * // Reorders tracks in the specified sequence
   * ```
   */
  const onReorder = (reorderedItems: Track[]) => {
    editor.reorderTracks(reorderedItems);
  };

  /**
   * Handles seeking to a specific time in the timeline.
   * Updates both the current time and seek time in the player.
   *
   * @param time - The time in seconds to seek to
   * 
   * @example
   * ```js
   * onSeek(30.5);
   * // Seeks to 30.5 seconds in the timeline
   * ```
   */
  const onSeek = (time: number) => {
    setCurrentTime(time);
    setSeekTime(time);
  };

  /**
   * Handles selection changes in the timeline.
   * Updates the selected item in the timeline context.
   *
   * @param selectedItem - The newly selected track or element
   * 
   * @example
   * ```js
   * onSelectionChange(videoElement);
   * // Selects the specified video element
   * 
   * onSelectionChange(null);
   * // Clears the current selection
   * ```
   */
  const onSelectionChange = (selectedItem: TrackElement | Track | null) => {
    setSelectedItem(selectedItem);
  };

  return {
    timelineData,
    onElementDrag,
    onReorder,
    onSeek,
    onSelectionChange,
    selectedItem,
    totalDuration,
  };
};
