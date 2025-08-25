import { all, delay, Vector2, waitFor } from "@twick/core";
import { AnimationParams } from "../helpers/types";

/**
 * @group SuccessionAnimation
 * SuccessionAnimation combines scaling and opacity transitions to create an appearing
 * and disappearing zoom effect. Creates dynamic zoom animations that draw attention
 * to content with smooth scaling and fade transitions.
 *
 * Available animation modes:
 * - "enter": Starts scaled down and transparent, then scales up while fading in
 * - "exit": Waits, then scales down while fading out
 * - "both": Scales up and fades in, waits, then scales down and fades out
 *
 * @param elementRef - Reference to the main element to animate
 * @param containerRef - Optional reference to a container element
 * @param interval - Duration of scaling and opacity transitions in seconds
 * @param duration - Total duration of the animation in seconds
 * @param animate - Animation phase ("enter" | "exit" | "both")
 *
 * @example
 * ```js
 * // Zoom in effect
 * animation: {
 *   name: "succession",
 *   animate: "enter",
 *   duration: 2,
 *   interval: 0.5
 * }
 *
 * // Zoom out effect
 * animation: {
 *   name: "succession",
 *   animate: "exit",
 *   duration: 1.5,
 *   interval: 0.3
 * }
 * ```
 */
export const SuccessionAnimation = {
  name: "succession",

  /**
   * Generator function controlling the succession animation.
   * Handles scaling and opacity transitions to create zoom effects.
   *
   * @param params - Animation parameters including element references and timing
   * @returns Generator that controls the succession animation timeline
   *
   * @example
   * ```js
   * yield* SuccessionAnimation.run({
   *   elementRef: myElement,
   *   interval: 0.5,
   *   duration: 2,
   *   animate: "enter"
   * });
   * ```
   */
  *run({
    elementRef,
    containerRef,
    interval,
    duration,
    animate,
  }: AnimationParams) {
    // Use containerRef if provided, otherwise fallback to elementRef
    const ref = containerRef ?? elementRef;

    // Capture the element's original scale
    const scale = ref().scale();

    let animationInterval = Math.min(interval, duration);
    if (animate === "enter") {
      // Start fully transparent and scaled down to 50%
      ref().opacity(0);
      ref().scale(new Vector2(scale.x / 2, scale.y / 2));
      // Animate scaling up to original size and fading in
      yield* all(
        ref().scale(scale, animationInterval),
        ref().opacity(1, animationInterval / 2)
      );

    } else if (animate === "exit") {
      // Wait until exit animation should start
      yield* waitFor(duration - animationInterval);
      // Animate scaling down to 50% and fading out (opacity starts after half the interval)
      yield* all(
        ref().scale(new Vector2(scale.x / 2, scale.y / 2), animationInterval),
        delay(animationInterval / 2, ref().opacity(0, animationInterval / 2))
      );

    } else if (animate === "both") {
      animationInterval = Math.min(interval, duration/2);
      // Start fully transparent and scaled down to 50%
      ref().opacity(0);
      ref().scale(new Vector2(scale.x / 2, scale.y / 2));
      // Animate scaling up and fading in
      yield* all(
        ref().scale(scale, animationInterval),
        ref().opacity(1, animationInterval / 2)
      );
      // Wait for the remaining duration
      yield* waitFor(duration - animationInterval);
      // Animate scaling down and fading out
      yield* all(
        ref().scale(new Vector2(scale.x / 2, scale.y / 2), animationInterval),
        delay(animationInterval / 2, ref().opacity(0, animationInterval / 2))
      );
    }
  },
};
