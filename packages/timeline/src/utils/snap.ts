/**
 * Snapping utilities for timeline alignment.
 * Pure functions, suitable for unit testing.
 *
 * @module snap
 */

export interface SnapResult {
  /** The snapped time (or original if no snap) */
  time: number;
  /** Whether snapping occurred */
  didSnap: boolean;
  /** The target time we snapped to (undefined if no snap) */
  snapTarget?: number;
}

/**
 * Snaps a time value to the nearest target within the threshold.
 * Returns the snapped time and whether snapping occurred.
 *
 * @param time - The candidate time in seconds
 * @param targets - Array of snap target times in seconds
 * @param thresholdSec - Maximum distance (in seconds) to snap. Default 0.1.
 * @returns SnapResult with time, didSnap, and optional snapTarget
 *
 * @example
 * ```ts
 * snapTime(5.07, [0, 5, 10], 0.1)  // { time: 5, didSnap: true, snapTarget: 5 }
 * snapTime(5.5, [0, 5, 10], 0.1)   // { time: 5.5, didSnap: false }
 * snapTime(9.95, [0, 5, 10], 0.1)  // { time: 10, didSnap: true, snapTarget: 10 }
 * ```
 */
export function snapTime(
  time: number,
  targets: number[],
  thresholdSec: number = 0.1
): SnapResult {
  if (targets.length === 0 || thresholdSec <= 0) {
    return { time, didSnap: false };
  }

  let nearestTarget: number | undefined;
  let minDist = thresholdSec;

  for (const target of targets) {
    const dist = Math.abs(time - target);
    if (dist < minDist) {
      minDist = dist;
      nearestTarget = target;
    }
  }

  if (nearestTarget !== undefined) {
    return { time: nearestTarget, didSnap: true, snapTarget: nearestTarget };
  }

  return { time, didSnap: false };
}

/**
 * Converts a snap threshold from pixels to seconds.
 *
 * @param thresholdPx - Distance in pixels
 * @param pixelsPerSecond - Timeline zoom (px per second)
 * @returns Threshold in seconds
 */
export function pxToSecThreshold(
  thresholdPx: number,
  pixelsPerSecond: number
): number {
  if (pixelsPerSecond <= 0) return Infinity;
  return thresholdPx / pixelsPerSecond;
}
