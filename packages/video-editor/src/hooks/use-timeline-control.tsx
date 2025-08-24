import {
  TrackElement,
  Track,
  useTimelineContext,
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
  const { editor } = useTimelineContext();

  /**
   * Deletes a track or element from the timeline.
   * Determines the type of item and calls the appropriate
   * editor method for removal.
   *
   * @param item - The track or element to delete
   * 
   * @example
   * ```js
   * deleteItem(track);
   * // Removes the track from the timeline
   * 
   * deleteItem(element);
   * // Removes the element from its track
   * ```
   */
  const deleteItem = (item: Track | TrackElement) => {
    if(item instanceof Track) {
      editor.removeTrack(item);
    } else if(item instanceof TrackElement) {
      editor.removeElement(item);
    }
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
   * 
   * @example
   * ```js
   * handleRedo();
   * // Reapplies the last undone timeline action
   * ```
   */
  const handleRedo = () => {
    editor.redo();
  }

  return {
    splitElement,
    deleteItem,
    handleUndo,
    handleRedo,
  };
};

export default useTimelineControl;
