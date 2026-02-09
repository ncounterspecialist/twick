/**
 * Time formatting utilities for timeline display.
 * Pure functions, suitable for unit testing.
 *
 * @module time-format
 */

/**
 * Formats time in seconds to MM:SS.FF (minutes:seconds.frames).
 * Frame count is zero-padded to 2 digits for standard frame rates.
 *
 * @param timeSeconds - Time in seconds (can be fractional)
 * @param fps - Frames per second (default: 30)
 * @returns Formatted string e.g. "01:23.15" for 1m 23.5s at 30fps
 *
 * @example
 * ```ts
 * formatTimeWithFrames(0, 30)      // "00:00.00"
 * formatTimeWithFrames(65.5, 30)   // "01:05.15"
 * formatTimeWithFrames(90, 24)     // "01:30.00"
 * ```
 */
export function formatTimeWithFrames(
  timeSeconds: number,
  fps: number = 30
): string {
  const totalSeconds = Math.max(0, timeSeconds);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const frames = Math.floor((totalSeconds % 1) * fps);

  const mm = minutes.toString().padStart(2, "0");
  const ss = seconds.toString().padStart(2, "0");
  const ff = frames.toString().padStart(2, "0");

  return `${mm}:${ss}.${ff}`;
}

/**
 * Formats time in seconds to MM:SS (minutes:seconds, no frames).
 *
 * @param timeSeconds - Time in seconds
 * @returns Formatted string e.g. "01:23"
 *
 * @example
 * ```ts
 * formatTimeSimple(65.5)  // "01:05"
 * ```
 */
export function formatTimeSimple(timeSeconds: number): string {
  const totalSeconds = Math.max(0, timeSeconds);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const mm = minutes.toString().padStart(2, "0");
  const ss = seconds.toString().padStart(2, "0");

  return `${mm}:${ss}`;
}
