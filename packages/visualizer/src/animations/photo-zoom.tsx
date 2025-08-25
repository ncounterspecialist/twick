import { Vector2 } from "@twick/core";
import { AnimationParams } from "../helpers/types";

/**
 * @group PhotoZoomAnimation
 * PhotoZoomAnimation applies a smooth zoom-in or zoom-out effect on a photo element.
 * Creates dynamic zoom effects that add depth and focus to photo content.
 * Perfect for highlighting details or creating cinematic photo presentations.
 *
 * Available animation modes:
 * - "in": Starts zoomed in and smoothly scales back to the original size
 * - "out": Starts at normal size and smoothly scales up to the target zoom level
 *
 * @param elementRef - Reference to the photo element to animate
 * @param containerRef - Optional reference to a container element (required for this animation)
 * @param mode - Animation phase ("in" | "out")
 * @param duration - Duration of the zoom animation in seconds
 * @param intensity - Zoom scale multiplier (default: 1.5)
 * 
 * @example
 * ```js
 * // Zoom in effect
 * animation: {
 *   name: "photo-zoom",
 *   mode: "in",
 *   duration: 2,
 *   intensity: 1.8
 * }
 * 
 * // Zoom out effect
 * animation: {
 *   name: "photo-zoom",
 *   mode: "out",
 *   duration: 1.5,
 *   intensity: 2.0
 * }
 * ```
 */
export const PhotoZoomAnimation = {
  name: "photo-zoom",

  /**
   * Generator function controlling the photo zoom animation.
   * Handles smooth scaling transitions for zoom effects on photo elements.
   *
   * @param params - Animation parameters including element references and zoom settings
   * @returns Generator that controls the photo zoom animation timeline
   * 
   * @example
   * ```js
   * yield* PhotoZoomAnimation.run({
   *   elementRef: photoElement,
   *   containerRef: container,
   *   mode: "in",
   *   duration: 2,
   *   intensity: 1.5
   * });
   * ```
   */
  *run({
    elementRef,
    containerRef,
    mode,
    duration,
    intensity = 1.5,
  }: AnimationParams) {
    // Only run if a containerRef is provided
    if (containerRef) {
      // Get the element's current scale
      const elementScale = elementRef().scale();

      if (mode === "in") {
        // Instantly set to zoomed-in scale
        yield elementRef().scale(
          new Vector2(
            elementScale.x * intensity,
            elementScale.y * intensity
          )
        );
        // Smoothly scale back to original size over 'duration'
        yield* elementRef().scale(
          new Vector2(
            elementScale.x,
            elementScale.y
          ),
          duration
        );
      }

      if (mode === "out") {
        // Start at original scale
        elementRef().scale(
          new Vector2(
            elementScale.x,
            elementScale.y
          )
        );
        // Smoothly scale up to zoomed-in scale over 'duration'
        yield* elementRef().scale(
          new Vector2(
            elementScale.x * intensity,
            elementScale.y * intensity
          ),
          duration
        );
      }
    }
  },
};
