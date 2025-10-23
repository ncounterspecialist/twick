import { useLivePlayerContext } from "@twick/live-player";
import {
  Track,
  TrackElement,
  useTimelineContext,
  VALIDATION_ERROR_CODE,
  ValidationError,
} from "@twick/timeline";

/**
 * Custom hook for managing video editor operations.
 * Provides functionality to add and update timeline elements with automatic
 * collision detection and error handling. Integrates with live player context
 * to position elements at the current playback time.
 *
 * @returns Object containing editor management functions
 * @property {Function} addElement - Add a new element to the timeline
 * @property {Function} updateElement - Update an existing timeline element
 * 
 * @example
 * ```tsx
 * const { addElement, updateElement } = useEditorManager();
 * 
 * // Add a new element at current playback time
 * await addElement(newElement);
 * 
 * // Update an existing element
 * updateElement(modifiedElement);
 * ```
 */
export const useEditorManager = () => {
  const { editor, selectedItem, setSelectedItem } = useTimelineContext();
  const { getCurrentTime } = useLivePlayerContext();

  /**
   * Adds a new element to the timeline at the current playback time.
   * Automatically handles track selection, collision detection, and error recovery.
   * Creates a new track if no track is selected or if collision errors occur.
   *
   * @param element - The track element to add to the timeline
   * @returns Promise that resolves when element is successfully added
   * 
   * @example
   * ```tsx
   * const newElement = new TrackElement();
   * await addElement(newElement);
   * // Element is added at current playback time
   * ```
   */
  const addElement = async (element: TrackElement) => {
    const currentTime = getCurrentTime();
    element.setStart(currentTime);
    try {
      if (selectedItem instanceof Track) {
        const result = await editor.addElementToTrack(selectedItem, element);
        if (result) {
          setSelectedItem(element);
        }
      } else {
        const newTrack = editor.addTrack(`Track_${Date.now()}`);
        const result = await editor.addElementToTrack(newTrack, element);
        if (result) {
          setSelectedItem(element);
        }
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        if (error.errors.includes(VALIDATION_ERROR_CODE.COLLISION_ERROR)) {
          try {
            const newTrack = editor.addTrack(`Track_${Date.now()}`);
            const result = await editor.addElementToTrack(newTrack, element);
            if (result) {
              setSelectedItem(element);
            }
          } catch (error) {}
        } else {
          console.log("TIMELINE ERROR: ", error.errors);
        }
      } else {
        console.log("TIMELINE ERROR: ", error);
      }
    }
  };

  /**
   * Updates an existing timeline element and refreshes the editor.
   * Automatically updates the selected item to the modified element.
   *
   * @param element - The track element to update
   * @returns The updated element instance
   * 
   * @example
   * ```tsx
   * element.setDuration(10);
   * const updatedElement = updateElement(element);
   * // Element is updated and editor is refreshed
   * ```
   */
  const updateElement = (element: TrackElement) => {
    const updatedElement = editor.updateElement(element);
    editor.refresh();
    setSelectedItem(updatedElement);
  };

  return {
    addElement,
    updateElement,
  };
};
