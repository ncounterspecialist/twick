import { waitFor } from "@revideo/core";
import { AnimationParams } from "../helpers/types";

/**
 * FadeAnimation applies a simple fade-in and fade-out effect
 * by adjusting opacity.
 *
 * Available animation modes:
 * - "enter": Starts transparent and fades in to fully opaque.
 * - "exit": Waits, then fades out to transparent.
 * - "both": Fades in, waits, then fades out.
 *
 * @param elementRef - Reference to the main element to animate.
 * @param containerRef - Optional reference to a container element.
 * @param interval - Duration of the fade transition (in frames or ms).
 * @param duration - Total duration of the animation.
 * @param animate - Animation phase ("enter" | "exit" | "both").
 */
export const FadeAnimation = {
  name: "fade",

  /**
   * Generator function controlling the fade animation.
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

    let animationInterval = Math.min(interval, duration);
    if (animate === "enter") {
      // Start fully transparent
      ref().opacity(0);
      // Fade in to full opacity over 'interval'
      yield* ref().opacity(1, animationInterval);

    } else if (animate === "exit") {
      // Wait until it's time to start fading out
      yield* waitFor(duration - animationInterval);
      // Fade out to transparent over 'interval'
      yield* ref().opacity(0, animationInterval);

    } else if (animate === "both") {
      animationInterval = Math.min(interval, duration/2);
      // Start fully transparent
      ref().opacity(0);
      // Fade in to full opacity
      yield* ref().opacity(1, animationInterval);
      // Wait for the remaining duration before fade-out
      yield* waitFor(duration - animationInterval);
      // Fade out to transparent
      yield* ref().opacity(0, animationInterval);
    }
  },
};
