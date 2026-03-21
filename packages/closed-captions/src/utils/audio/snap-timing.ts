const clampRange = (
  startMs: number,
  endMs: number,
  durationMs: number,
  minDurationMs: number
): { startMs: number; endMs: number } => {
  let s = Math.max(0, startMs);
  let e = Math.min(durationMs, endMs);
  if (e - s < minDurationMs) {
    e = Math.min(durationMs, s + minDurationMs);
    s = Math.max(0, e - minDurationMs);
  }
  return { startMs: s, endMs: e };
};

/**
 * Snaps caption timing to the nearest pause boundary when within tolerance.
 */
export function snapSegmentTiming(
  startMs: number,
  endMs: number,
  dragType: 'move' | 'start' | 'end',
  snapPointsMs: number[],
  toleranceMs: number,
  durationMs: number,
  minDurationMs: number
): { startMs: number; endMs: number } {
  if (snapPointsMs.length === 0 || toleranceMs <= 0) {
    return clampRange(startMs, endMs, durationMs, minDurationMs);
  }

  const nearest = (t: number) => {
    let best = t;
    let bestDist = toleranceMs + 1;
    for (const p of snapPointsMs) {
      const d = Math.abs(p - t);
      if (d < bestDist && d <= toleranceMs) {
        bestDist = d;
        best = p;
      }
    }
    return best;
  };

  if (dragType === 'move') {
    const span = endMs - startMs;
    const snappedStart = nearest(startMs);
    return clampRange(snappedStart, snappedStart + span, durationMs, minDurationMs);
  }
  if (dragType === 'start') {
    const snappedStart = nearest(startMs);
    return clampRange(snappedStart, endMs, durationMs, minDurationMs);
  }
  const snappedEnd = nearest(endMs);
  return clampRange(startMs, snappedEnd, durationMs, minDurationMs);
}

/**
 * Snaps both start and end independently to the nearest pause boundary (bulk align).
 */
export function snapStartEndBoundsToNearest(
  startMs: number,
  endMs: number,
  snapPointsMs: number[],
  toleranceMs: number,
  durationMs: number,
  minDurationMs: number
): { startMs: number; endMs: number } {
  if (snapPointsMs.length === 0 || toleranceMs <= 0) {
    return clampRange(startMs, endMs, durationMs, minDurationMs);
  }
  const nearest = (t: number) => {
    let best = t;
    let bestDist = toleranceMs + 1;
    for (const p of snapPointsMs) {
      const d = Math.abs(p - t);
      if (d < bestDist && d <= toleranceMs) {
        bestDist = d;
        best = p;
      }
    }
    return best;
  };
  return clampRange(nearest(startMs), nearest(endMs), durationMs, minDurationMs);
}
