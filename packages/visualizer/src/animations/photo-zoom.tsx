import { Vector2 } from "@revideo/core";
import { AnimationParams } from "../helpers/types";

/**
 * PhotoZoomAnimation applies a smooth zoom-in or zoom-out effect
 * on a photo element.
 *
 * Available animation modes:
 * - "in": Starts zoomed in and smoothly scales back to the original size.
 * - "out": Starts at normal size and smoothly scales up to the target zoom level.
 *
 * @param elementRef - Reference to the photo element to animate.
 * @param containerRef - Optional reference to a container element (required for this animation).
 * @param mode - Animation phase ("in" | "out").
 * @param duration - Duration of the zoom animation.
 * @param intensity - Zoom scale multiplier (default: 1.5).
 */
export const PhotoZoomAnimation = {
  name: "photo-zoom",

  /**
   * Generator function controlling the photo zoom animation.
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
