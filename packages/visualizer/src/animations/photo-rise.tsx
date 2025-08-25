import { AnimationParams } from "../helpers/types";

/**
 * @group PhotoRiseAnimation
 * PhotoRiseAnimation applies a smooth directional movement to a photo element.
 * Creates elegant slide-in animations that bring photos into view from any direction.
 * Perfect for photo galleries, presentations, and content reveals.
 *
 * Behavior:
 * - Starts offset in a given direction (up, down, left, or right)
 * - Animates back to the original position over the specified duration
 *
 * Available directions:
 * - "up": Starts below and moves upward
 * - "down": Starts above and moves downward
 * - "left": Starts to the right and moves leftward
 * - "right": Starts to the left and moves rightward
 *
 * @param elementRef - Reference to the photo element to animate
 * @param containerRef - Optional reference to a container element (required for this animation)
 * @param direction - Direction of the movement ("up" | "down" | "left" | "right")
 * @param duration - Duration of the movement animation in seconds
 * @param intensity - Offset distance in pixels (default: 200)
 * 
 * @example
 * ```js
 * // Slide in from bottom
 * animation: {
 *   name: "photo-rise",
 *   direction: "up",
 *   duration: 1.5,
 *   intensity: 300
 * }
 * 
 * // Slide in from left
 * animation: {
 *   name: "photo-rise",
 *   direction: "left",
 *   duration: 2,
 *   intensity: 400
 * }
 * ```
 */
export const PhotoRiseAnimation = {
  name: "photo-rise",

  /**
   * Generator function controlling the photo rise animation.
   * Handles directional movement animations for photo elements.
   *
   * @param params - Animation parameters including element references and direction
   * @returns Generator that controls the photo rise animation timeline
   * 
   * @example
   * ```js
   * yield* PhotoRiseAnimation.run({
   *   elementRef: photoElement,
   *   containerRef: container,
   *   direction: "up",
   *   duration: 1.5,
   *   intensity: 200
   * });
   * ```
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

      if (direction === "up") {
        // Start offset below
        elementRef().y(pos.y + intensity);
        // Animate moving upward to the original position
        yield* elementRef().y(pos.y, duration);

      } else if (direction === "down") {
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
