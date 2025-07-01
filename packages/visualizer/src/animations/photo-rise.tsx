import { AnimationParams } from "../helpers/types";

/**
 * PhotoRiseAnimation applies a smooth directional movement to a photo element.
 *
 * Behavior:
 * - Starts offset in a given direction (top, bottom, left, or right).
 * - Animates back to the original position over the specified duration.
 *
 * Available directions:
 * - "top": Starts below and moves upward.
 * - "bottom": Starts above and moves downward.
 * - "left": Starts to the right and moves leftward.
 * - "right": Starts to the left and moves rightward.
 *
 * @param elementRef - Reference to the photo element to animate.
 * @param containerRef - Optional reference to a container element (required for this animation).
 * @param direction - Direction of the movement ("top" | "bottom" | "left" | "right").
 * @param duration - Duration of the movement animation.
 * @param intensity - Offset distance in pixels (default: 200).
 */
export const PhotoRiseAnimation = {
  name: "photo-rise",

  /**
   * Generator function controlling the photo rise animation.
   */
  *run({
    elementRef,
    containerRef,
    direction,
    duration,
    intensity = 200,
  }: AnimationParams) {
    // Only run if a containerRef is provided
    if (containerRef) {
      // Get the element's current position
      const pos = elementRef().position();

      if (direction === "top") {
        // Start offset below
        elementRef().y(pos.y + intensity);
        // Animate moving upward to the original position
        yield* elementRef().y(pos.y, duration);

      } else if (direction === "bottom") {
        // Start offset above
        elementRef().y(pos.y - intensity);
        // Animate moving downward to the original position
        yield* elementRef().y(pos.y, duration);

      } else if (direction === "left") {
        // Start offset to the right
        elementRef().x(pos.x + intensity);
        // Animate moving left to the original position
        yield* elementRef().x(pos.x, duration);

      } else if (direction === "right") {
        // Start offset to the left
        elementRef().x(pos.x - intensity);
        // Animate moving right to the original position
        yield* elementRef().x(pos.x, duration);
      }
    }
  },
};
