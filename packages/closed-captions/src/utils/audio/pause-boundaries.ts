import { computePeaks } from './compute-peaks';

export type PauseBoundaryOptions = {
  /** Minimum contiguous low-energy region to treat as a pause (ms). */
  minSilenceMs?: number;
  /** Peak threshold as a fraction of the max peak (0..1). */
  speechThresholdRatio?: number;
  /** Target number of analysis buckets (clamped internally). */
  bucketCount?: number;
};

/**
 * Returns timestamps (ms) at speech/silence edges where silence is long enough to be a "pause".
 * Useful for snapping caption start/end and block moves to acoustic boundaries.
 */
export function computePauseSnapPointsMs(
  samples: Float32Array,
  sampleRate: number,
  opts?: PauseBoundaryOptions
): number[] {
  const durationMs = (samples.length / sampleRate) * 1000;
  if (durationMs <= 0 || samples.length === 0) return [];

  const minSilenceMs = opts?.minSilenceMs ?? 90;
  const speechThreshRatio = opts?.speechThresholdRatio ?? 0.12;
  const bucketCount = Math.min(
    8000,
    Math.max(400, opts?.bucketCount ?? Math.floor(samples.length / 400))
  );

  const peaks = computePeaks(samples, bucketCount);
  let maxP = 0.001;
  for (let i = 0; i < peaks.length; i += 1) {
    maxP = Math.max(maxP, peaks[i]);
  }
  const thresh = Math.max(0.0001, maxP * speechThreshRatio);
  const isSpeech = (i: number) => peaks[i] >= thresh;

  const bucketMs = durationMs / bucketCount;
  const minSilenceBuckets = Math.max(1, Math.ceil(minSilenceMs / Math.max(0.001, bucketMs)));

  const boundaries: number[] = [];

  let i = 0;
  while (i < bucketCount) {
    if (isSpeech(i)) {
      i += 1;
      continue;
    }
    const start = i;
    while (i < bucketCount && !isSpeech(i)) i += 1;
    const runLen = i - start;
    if (runLen < minSilenceBuckets) continue;

    const tLeft = (start / bucketCount) * durationMs;
    const tRight = (i / bucketCount) * durationMs;

    if (start > 0 && isSpeech(start - 1)) {
      boundaries.push(tLeft);
    }
    if (i < bucketCount && isSpeech(i)) {
      boundaries.push(tRight);
    }
  }

  boundaries.sort((a, b) => a - b);
  const deduped: number[] = [];
  const eps = 1;
  for (const t of boundaries) {
    if (deduped.length === 0 || Math.abs(t - deduped[deduped.length - 1]) > eps) {
      deduped.push(Math.round(t));
    }
  }
  return deduped;
}
