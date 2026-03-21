/** Downsample absolute amplitude to per-bucket maxima (same strategy as the waveform view). */
export const computePeaks = (channel: Float32Array, buckets: number) => {
  const peaks = new Float32Array(buckets);
  const step = Math.max(1, Math.floor(channel.length / buckets));
  for (let i = 0; i < buckets; i += 1) {
    const start = i * step;
    const end = Math.min(channel.length, start + step);
    let max = 0;
    for (let j = start; j < end; j += 1) {
      const v = Math.abs(channel[j]);
      if (v > max) max = v;
    }
    peaks[i] = max;
  }
  return peaks;
};
