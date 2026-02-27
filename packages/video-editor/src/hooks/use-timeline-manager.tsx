import { useLivePlayerContext } from "@twick/live-player";
import {
  TrackElement,
  Track,
  ProjectMetadata,
  useTimelineContext,
  VideoElement,
  AudioElement,
  resolveIds,
  TRACK_TYPES,
} from "@twick/timeline";
import { useMemo } from "react";
import { DRAG_TYPE } from "../helpers/constants";
import type { DropTarget } from "../utils/drop-target";

export interface ElementDropParams {
  element: TrackElement;
  dragType: string;
  updates: { start: number; end: number };
  dropTarget: DropTarget | null;
}

interface TimelineManagerReturn {
  timelineData: { tracks: Track[]; version: number; metadata?: ProjectMetadata } | null;
  onAddTrack: () => void;
  onElementDrag: (params: {
    element: TrackElement;
    dragType: string;
    updates: { start: number; end: number };
  }) => void;
  onElementDrop: (params: ElementDropParams) => Promise<void>;
  onReorder: (reorderedItems: Track[]) => void;
  onSeek: (time: number) => void;
  onSelectionChange: (selectedItem: TrackElement | Track | null) => void;
  selectedItem: Track | TrackElement | null;
  totalDuration: number;
}
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
export const useTimelineManager = (): TimelineManagerReturn => {
  const { selectedItem, changeLog, setSelectedItem, totalDuration, editor, selectedIds } =
    useTimelineContext();
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
    const tracks = editor.getTimelineData()?.tracks ?? [];
    const duration = totalDuration;

    if (dragType === DRAG_TYPE.MOVE && selectedIds.has(element.getId()) && selectedIds.size > 1) {
      const resolved = resolveIds(selectedIds, tracks);
      const elements = resolved.filter((item): item is TrackElement => item instanceof TrackElement);
      if (elements.length > 1) {
      const minStart = Math.min(...elements.map((el) => el.getStart()));
      const maxEnd = Math.max(...elements.map((el) => el.getEnd()));
      const delta = updates.start - element.getStart();
      const deltaMin = -minStart;
      const deltaMax = duration - maxEnd;
      const clampedDelta = Math.max(deltaMin, Math.min(deltaMax, delta));

      for (const el of elements) {
        const newStart = el.getStart() + clampedDelta;
        const newEnd = el.getEnd() + clampedDelta;
        el.setStart(newStart);
        el.setEnd(newEnd);
        editor.updateElement(el);
      }
      setSelectedItem(element);
      editor.refresh();
      return;
      }
    }

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
    const updatedElement = editor.updateElement(element);
    setSelectedItem(updatedElement);
    editor.refresh();
  };

  /** Cross-track drop is only allowed when track type is element (not video/audio). */
  const isElementTrackType = (track: Track): boolean =>
    track.getType() === TRACK_TYPES.ELEMENT;

  /** Only allow separator drop when the new track would be element type (text, caption, shapes, etc.). */
  const wouldBeElementTrack = (el: TrackElement): boolean => {
    const elType = el.getType().toLowerCase();
    return elType !== "video" && elType !== "image" && elType !== "audio";
  };

  const onElementDrop = async (params: ElementDropParams): Promise<void> => {
    const { element, dragType, updates, dropTarget } = params;
    const tracks = editor.getTimelineData()?.tracks ?? [];

    if (!dropTarget) {
      return;
    }

    if (dropTarget.type === "separator") {
      if (!wouldBeElementTrack(element)) {
        return;
      }
      await editor.moveElementToNewTrackAt(
        element,
        dropTarget.separatorIndex,
        updates.start
      );
      setSelectedItem(element);
      editor.refresh();
      return;
    }

    const targetTrack = tracks[dropTarget.trackIndex];
    if (!targetTrack) {
      return;
    }

    if (!isElementTrackType(targetTrack)) {
      return;
    }

    const start = updates.start;
    const end = updates.end;
    const elementId = element.getId();
    const currentTrackId = element.getTrackId();

    let hasOverlap = false;
    const others = targetTrack.getElements().filter((el) => el.getId() !== elementId);
    for (const other of others) {
      const oStart = other.getStart();
      const oEnd = other.getEnd();
      if (start < oEnd && end > oStart) {
        hasOverlap = true;
        break;
      }
    }

    if (hasOverlap) {
      await editor.moveElementToNewTrackAt(
        element,
        dropTarget.trackIndex + 1,
        updates.start
      );
      setSelectedItem(element);
      editor.refresh();
      return;
    }

    if (currentTrackId === targetTrack.getId()) {
      onElementDrag({ element, dragType, updates });
      return;
    }

    editor.removeElement(element);
    element.setStart(updates.start);
    element.setEnd(updates.end);
    const added = await editor.addElementToTrack(targetTrack, element);
    if (added) {
      setSelectedItem(element);
      editor.refresh();
    }
  };

  // Get timeline data from editor
  const timelineData = useMemo(() => editor.getTimelineData(), [changeLog]);

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
    editor.refresh();
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

  const onAddTrack = () => {
    const tracks = editor.getTimelineData()?.tracks || [];
    editor.addTrack(`Track_${tracks.length + 1}`);
  };

  return {
    timelineData,
    onAddTrack,
    onElementDrag,
    onElementDrop,
    onReorder,
    onSeek,
    onSelectionChange,
    selectedItem,
    totalDuration,
  };
};
