/**
 * Volume conversion between linear (0-1) and dB scale.
 * Used for PlaybackPropsPanel to match professional audio tools (e.g. -60 dB to +6 dB).
 *
 * Formula: dB = 20 * log10(linear)
 * - 0 dB = 1.0 linear (full volume)
 * - -60 dB ≈ 0.001 linear (effectively mute)
 * - +6 dB ≈ 2.0 linear (amplification)
 */

const MIN_DB = -60;
const MAX_DB = 6;

/**
 * Convert linear volume (0 to ~2) to dB.
 * Returns MIN_DB for linear <= 0 to avoid -Infinity.
 */
export function linearToDb(linear: number): number {
  if (linear <= 0) return MIN_DB;
  const db = 20 * Math.log10(linear);
  return Math.max(MIN_DB, Math.min(MAX_DB, db));
}

/**
 * Convert dB to linear volume.
 * Returns 0 for dB <= MIN_DB (mute).
 */
export function dbToLinear(db: number): number {
  if (db <= MIN_DB) return 0;
  const linear = Math.pow(10, db / 20);
  return Math.min(linear, Math.pow(10, MAX_DB / 20));
}

export { MIN_DB, MAX_DB };
