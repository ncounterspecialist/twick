import { waitFor } from "@twick/core";
import { TextEffectParams } from "../helpers/types";

/**
 * @group EraseEffect
 * EraseEffect animates text disappearing letter by letter, simulating an "erasing"
 * or backspace effect. Creates engaging text removal animations that mimic
 * real-world erasing or typing corrections.
 *
 * Behavior:
 * - Optionally waits for a delay before starting
 * - Preserves the original element size
 * - Animates removing one character at a time from the end
 *
 * @param elementRef - Reference to the text element to animate
 * @param duration - Total duration of the erasing animation in seconds
 * @param delay - Optional delay before starting in seconds
 * @param bufferTime - Time reserved at the end of animation in seconds (default: 0.1)
 *
 * @example
 * ```js
 * // Basic erase effect
 * textEffect: {
 *   name: "erase",
 *   duration: 3,
 *   delay: 1
 * }
 *
 * // Quick erase with buffer time
 * textEffect: {
 *   name: "erase",
 *   duration: 2,
 *   bufferTime: 0.5
 * }
 * ```
 */
export const EraseEffect = {
  name: "erase",

  /**
   * Generator function controlling the erase text effect.
   * Handles character-by-character text removal animations.
   *
   * @param params - Text effect parameters including element reference and timing
   * @returns Generator that controls the erase animation timeline
   *
   * @example
   * ```js
   * yield* EraseEffect.run({
   *   elementRef: textElement,
   *   duration: 3,
   *   delay: 1,
   *   bufferTime: 0.1
   * });
   * ```
   */
  *run({
    elementRef,
    duration,
    delay,
    bufferTime = 0.1,
  }: TextEffectParams) {
    // Get the full original text
    const fullText = elementRef().text();

    // Store the original size to avoid resizing during animation
    const size = elementRef().size();

    // Initialize element: clear text, set fixed size, align left
    elementRef().setText("");
    elementRef().size(size);
    elementRef().textAlign("left");

    // Wait for the optional initial delay
    if (delay) {
      yield* waitFor(delay);
    }

    // Compute the time interval between each character removal
    let timeInterval = (duration - bufferTime) / fullText.length;

    // Optionally wait a bit before starting erasing
    yield* waitFor(timeInterval);

    // Loop backwards through the text and erase one character at a time
    for (let i = fullText.length; i >= 0; i--) {
      yield* waitFor(timeInterval);
      elementRef().setText(fullText.substring(0, i));
    }
  },
};
