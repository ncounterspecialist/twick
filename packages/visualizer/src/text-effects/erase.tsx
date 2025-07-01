import { waitFor } from "@revideo/core";
import { TextEffectParams } from "../helpers/types";

/**
 * EraseEffect animates text disappearing letter by letter,
 * simulating an "erasing" or backspace effect.
 *
 * Behavior:
 * - Optionally waits for a delay before starting.
 * - Preserves the original element size.
 * - Animates removing one character at a time from the end.
 *
 * @param elementRef - Reference to the text element to animate.
 * @param interval - Time between removing each character. If not provided, calculated from duration.
 * @param duration - Total duration of the erasing animation.
 * @param delay - Optional delay before starting.
 * @param bufferTime - Time reserved at the end of animation (default: 0.1).
 */
export const EraseEffect = {
  name: "erase",

  /**
   * Generator function controlling the erase text effect.
   */
  *run({
    elementRef,
    interval,
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
    let timeInterval = interval ?? (duration - bufferTime) / fullText.length;

    // Optionally wait a bit before starting erasing
    yield* waitFor(timeInterval);

    // Loop backwards through the text and erase one character at a time
    for (let i = fullText.length; i >= 0; i--) {
      yield* waitFor(timeInterval);
      elementRef().setText(fullText.substring(0, i));
    }
  },
};
