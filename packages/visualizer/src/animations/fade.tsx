import { waitFor } from "@twick/core";
import { AnimationParams } from "../helpers/types";

/**
 * @group FadeAnimation
 * @description Simple fade-in and fade-out effects for smooth element transitions
 * 
 * FadeAnimation applies a simple fade-in and fade-out effect by adjusting opacity.
 * Creates smooth opacity transitions for elements entering or exiting the scene.
 * Perfect for subtle, professional animations that don't distract from content.
 * 
 * ## 🎬 Animation Modes
 * 
 * - **"enter"**: Starts transparent and fades in to fully opaque
 * - **"exit"**: Waits, then fades out to transparent  
 * - **"both"**: Fades in, waits, then fades out
 * 
 * ## 🎯 Use Cases
 * 
 * - **Text overlays**: Smooth introduction of captions and titles
 * - **Background elements**: Subtle scene transitions
 * - **UI components**: Professional interface animations
 * - **Content reveals**: Gentle disclosure of information
 * 
 * ## 🔧 Best Practices
 * 
 * - **Duration**: 1-3 seconds for most use cases
 * - **Timing**: Use "enter" for introductions, "exit" for conclusions
 * - **Combination**: Pair with other animations for complex effects
 * - **Performance**: Lightweight and efficient for multiple elements
 * 
 * ## 📚 Integration Examples
 * 
 * ### Basic Text Fade
 * ```js
 * {
 *   id: "welcome-text",
 *   type: "text",
 *   s: 0, e: 5,
 *   t: "Welcome!",
 *   animation: {
 *     name: "fade",
 *     animate: "enter",
 *     duration: 2
 *   }
 * }
 * ```
 * 
 * ### Video with Fade Transition
 * ```js
 * {
 *   id: "intro-video",
 *   type: "video",
 *   s: 0, e: 10,
 *   props: { src: "intro.mp4" },
 *   animation: {
 *     name: "fade",
 *     animate: "both",
 *     duration: 3,
 *     interval: 1
 *   }
 * }
 * ```
 * 
 * ### Multi-Element Fade Sequence
 * ```js
 * // Fade in multiple elements with staggered timing
 * const elements = [
 *   {
 *     id: "title",
 *     type: "text",
 *     s: 0, e: 8,
 *     t: "Main Title",
 *     animation: { name: "fade", animate: "enter", duration: 2 }
 *   },
 *   {
 *     id: "subtitle", 
 *     type: "text",
 *     s: 1, e: 8,
 *     t: "Subtitle",
 *     animation: { name: "fade", animate: "enter", duration: 2 }
 *   },
 *   {
 *     id: "background",
 *     type: "rect",
 *     s: 0, e: 10,
 *     props: { fill: "#000000", opacity: 0.5 },
 *     animation: { name: "fade", animate: "enter", duration: 1.5 }
 *   }
 * ];
 * ```
 * 
 * @param elementRef - Reference to the main element to animate
 * @param containerRef - Optional reference to a container element
 * @param duration - Duration of the fade transition in seconds
 * @param totalDuration - Total duration of the animation in seconds
 * @param animate - Animation phase ("enter" | "exit" | "both")
 * 
 * @example
 * ```js
 * // Basic fade-in animation
 * animation: {
 *   name: "fade",
 *   animate: "enter",
 *   duration: 2,
 *   direction: "center"
 * }
 * 
 * // Fade in and out
 * animation: {
 *   name: "fade",
 *   animate: "both",
 *   duration: 3,
 *   interval: 1
 * }
 * ```
 */
export const FadeAnimation = {
  name: "fade",

  /**
   * Generator function controlling the fade animation.
   * Handles opacity transitions based on the specified animation mode.
   *
   * @param params - Animation parameters including element references and timing
   * @returns Generator that controls the fade animation timeline
   * 
   * @example
   * ```js
   * yield* FadeAnimation.run({
   *   elementRef: myElement,
   *   interval: 1,
   *   duration: 3,
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
