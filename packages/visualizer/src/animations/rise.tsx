import { all, delay, waitFor } from "@twick/core";
import { AnimationParams } from "../helpers/types";

/**
 * @group RiseAnimation
 * RiseAnimation combines vertical motion and opacity transitions to create a "rising"
 * (or "falling") appearance/disappearance effect. Moves elements vertically with
 * optional scaling effects for dynamic visual impact.
 *
 * Available animation modes:
 * - "enter": Starts offset and transparent, moves into position while fading in
 * - "exit": Waits, then moves out of position while fading out
 * - "both": Enters, waits, and exits in a continuous sequence
 *
 * @param elementRef - Reference to the main element to animate
 * @param containerRef - Optional reference to a container element
 * @param interval - Duration of movement and opacity transitions in seconds
 * @param duration - Total duration of the animation in seconds
 * @param animate - Animation phase ("enter" | "exit" | "both")
 * @param direction - Direction to animate ("up" or "down")
 * @param intensity - Number of units to offset position vertically
 *
 * @example
 * ```js
 * // Rise up animation
 * animation: {
 *   name: "rise",
 *   animate: "enter",
 *   duration: 1.5,
 *   direction: "up",
 *   intensity: 0.8
 * }
 *
 * // Fall down animation
 * animation: {
 *   name: "rise",
 *   animate: "exit",
 *   duration: 2,
 *   direction: "down",
 *   intensity: 300
 * }
 * ```
 */
export const RiseAnimation = {
  name: "rise",

  /**
   * Generator function controlling the rise/fall animation.
   * Handles vertical movement and opacity transitions based on direction and intensity.
   *
   * @param params - Animation parameters including element references, timing, and direction
   * @returns Generator that controls the rise animation timeline
   *
   * @example
   * ```js
   * yield* RiseAnimation.run({
   *   elementRef: myElement,
   *   interval: 0.25,
   *   duration: 1.5,
   *   animate: "enter",
   *   direction: "up",
   *   intensity: 200
   * });
   * ```
   */
  *run({
    elementRef,
    containerRef,
    interval = 0.25,
    duration,
    animate,
    direction,
    intensity = 200,
  }: AnimationParams) {
    // Use containerRef if provided, otherwise fallback to elementRef
    const ref = containerRef ?? elementRef;

    // Get the element's current position
    const pos = ref().position();

    let animationInterval = Math.min(interval, duration);

    if (animate === "enter") {
      // Start fully transparent
      ref().opacity(0);

      if (direction === "up") {
        // Offset element below final position
        ref().y(pos.y + intensity);
        // Animate moving up while fading in
        yield* all(
          ref().opacity(1, animationInterval / 4),
          ref().y(pos.y, animationInterval)
        );
      } else if (direction === "down") {
        // Offset element above final position
        ref().y(pos.y - intensity);
        // Animate moving down while fading in
        yield* all(
          ref().opacity(1, animationInterval / 4),
          ref().y(pos.y, animationInterval)
        );
      }
    } else if (animate === "exit") {
      // Wait until exit animation starts
      yield* waitFor(duration - animationInterval);

      if (direction === "up") {
        // Animate moving up while fading out (opacity fades slightly after motion starts)
        yield* all(
          delay((3 * animationInterval) / 4, ref().opacity(0, animationInterval / 4)),
          ref().y(pos.y - intensity, animationInterval)
        );
      } else if (direction === "down") {
        // Animate moving down while fading out
        yield* all(
          delay((3 * animationInterval) / 4, ref().opacity(0, animationInterval / 4)),
          ref().y(pos.y + intensity, animationInterval)
        );
      }
    } else if (animate === "both") {
      animationInterval = Math.min(interval, duration/2);
      // Start fully transparent
      ref().opacity(0);

      if (direction === "up") {
        // Enter animation: move up while fading in
        ref().y(pos.y + intensity);
        yield* all(
          ref().opacity(1, animationInterval / 4),
          ref().y(pos.y, animationInterval)
        );
        // Wait for the remaining duration
        yield* waitFor(duration - animationInterval);
        // Exit animation: move up further while fading out
        yield* all(
          delay((3 * animationInterval) / 4, ref().opacity(0, animationInterval / 4)),
          ref().y(pos.y - intensity, animationInterval)
        );
      } else if (direction === "down") {
        // Enter animation: move down while fading in
        ref().y(pos.y - intensity);
        yield* all(
          ref().opacity(1, animationInterval / 4),
          ref().y(pos.y, animationInterval)
        );
        // Wait for the remaining duration
        yield* waitFor(duration - animationInterval);
        // Exit animation: move down further while fading out
        yield* all(
          delay((3 * animationInterval) / 4, ref().opacity(0, animationInterval / 4)),
          ref().y(pos.y + intensity, animationInterval)
        );
      }
    }
  },
};
