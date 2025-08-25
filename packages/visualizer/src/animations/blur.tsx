import { waitFor } from "@twick/core";
import { AnimationParams } from "../helpers/types";

/**
 * @group BlurAnimation
 * BlurAnimation applies a blur effect to an element or its container during enter,
 * exit, or both animations. Creates smooth blur transitions for professional
 * visual effects that can focus attention or create depth.
 *
 * Available animation modes:
 * - "enter": Starts blurred and gradually becomes clear
 * - "exit": Starts clear and gradually becomes blurred
 * - "both": Blurs in, clears, then blurs out
 *
 * @param elementRef - Reference to the main element to animate
 * @param containerRef - Optional reference to a container element
 * @param interval - Duration of blur transitions in seconds
 * @param duration - Total duration of the animation in seconds
 * @param intensity - Maximum blur strength (default: 25)
 * @param animate - Animation phase ("enter" | "exit" | "both")
 *
 * @example
 * ```js
 * // Basic blur-in animation
 * animation: {
 *   name: "blur",
 *   animate: "enter",
 *   duration: 2,
 *   intensity: 15
 * }
 *
 * // Blur out effect
 * animation: {
 *   name: "blur",
 *   animate: "exit",
 *   duration: 1.5,
 *   intensity: 30
 * }
 * ```
 */
export const BlurAnimation = {
  name: "blur",

  /**
   * Generator function controlling the blur animation.
   * Handles blur transitions based on the specified animation mode and intensity.
   *
   * @param params - Animation parameters including element references and timing
   * @returns Generator that controls the blur animation timeline
   *
   * @example
   * ```js
   * yield* BlurAnimation.run({
   *   elementRef: myElement,
   *   interval: 0.5,
   *   duration: 2,
   *   intensity: 25,
   *   animate: "enter"
   * });
   * ```
   */
  *run({
    elementRef,
    containerRef,
    interval,
    duration,
    intensity = 25,
    animate,
  }: AnimationParams) {
    // Choose containerRef if provided; otherwise, fallback to elementRef
    const ref = containerRef ?? elementRef;

    let animationInterval = Math.min(interval, duration);
    if (animate === "enter") {
      // Start fully blurred
      ref().filters.blur(intensity);
      // Animate to no blur over 'interval'
      yield* ref().filters.blur(0, animationInterval);
    } else if (animate === "exit") {
      // Wait for the time before exit animation starts
      yield* waitFor(duration - animationInterval);
      // Animate from no blur to full blur over 'interval'
      yield* ref().filters.blur(intensity, animationInterval);
    } else if (animate === "both") {
      animationInterval = Math.min(interval, duration/2);
      // Start fully blurred
      ref().filters.blur(intensity);
      // Animate to no blur
      yield* ref().filters.blur(0, animationInterval);
      // Wait until exit animation
      yield* waitFor(duration - animationInterval);
      // Animate to full blur again
      yield* ref().filters.blur(intensity, animationInterval);
    }
  },
};
