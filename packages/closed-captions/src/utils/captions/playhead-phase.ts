export type PlayheadPhase = 'past' | 'active' | 'future';

/** Classify a segment relative to the playhead (video current time). */
export function getPlayheadPhase(startMs: number, endMs: number, playheadMs: number): PlayheadPhase {
  if (playheadMs >= startMs && playheadMs < endMs) return 'active';
  if (endMs <= playheadMs) return 'past';
  return 'future';
}
