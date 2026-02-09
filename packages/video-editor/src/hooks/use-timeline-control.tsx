import {
  TrackElement,
  Track,
  useTimelineContext,
  resolveIds,
} from "@twick/timeline";

/**
 * Custom hook to manage timeline control operations.
 * Provides functions for deleting items, splitting elements,
 * and handling undo/redo operations in the video editor.
 *
 * @returns Object containing timeline control functions
 * 
 * @example
 * ```js
 * const { deleteItem, splitElement, handleUndo, handleRedo } = useTimelineControl();
 * 
 * // Delete a track or element
 * deleteItem(trackOrElement);
 * 
 * // Split an element at current time
 * splitElement(element, 5.5);
 * ```
 */
const useTimelineControl = () => {
  const { editor, setSelectedItem, selectedIds } = useTimelineContext();

  /**
   * Deletes selected item(s) from the timeline.
   * When multiple items are selected, deletes all of them.
   *
   * @param item - The track or element to delete (optional; uses selection when not provided)
   */
  const deleteItem = (item?: Track | TrackElement) => {
    const tracks = editor.getTimelineData()?.tracks ?? [];
    const toDelete =
      item !== undefined
        ? [item]
        : resolveIds(selectedIds, tracks);

    for (const el of toDelete) {
      if (el instanceof Track) {
        editor.removeTrack(el);
      } else if (el instanceof TrackElement) {
        editor.removeElement(el);
      }
    }
    setSelectedItem(null);
  };
  
  /**
   * Splits an element at the specified time.
   * Creates two separate elements from the original element
   * at the given time point.
   *
   * @param element - The element to split
   * @param currentTime - The time at which to split the element
   * 
   * @example
   * ```js
   * splitElement(videoElement, 10.5);
   * // Splits the video element at 10.5 seconds
   * ```
   */
  const splitElement = (element: TrackElement, currentTime: number) => {
    editor.splitElement(element, currentTime);
  };

  /**
   * Handles undo operation for timeline changes.
   * Reverts the last action performed on the timeline.
   * 
   * @example
   * ```js
   * handleUndo();
   * // Reverts the last timeline action
   * ```
   */
  const handleUndo = () => {
    editor.undo();
  }

  /**
   * Handles redo operation for timeline changes.
   * Reapplies the last undone action on the timeline.
   */
  const handleRedo = () => {
    editor.redo();
  };

  return {
    splitElement,
    deleteItem,
    handleUndo,
    handleRedo,
  };
};

export default useTimelineControl;
