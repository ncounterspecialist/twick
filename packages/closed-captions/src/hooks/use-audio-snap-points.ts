import { useEffect, useState } from 'react';
import { computePauseSnapPointsMs } from '../utils/audio/pause-boundaries';
import { loadMonoFromMediaUrl } from '../utils/audio/load-mono-from-media-url';

/**
 * Derives acoustic pause boundaries from decoded media audio for timeline snapping.
 */
export function useAudioSnapPoints(mediaUrl: string | null | undefined) {
  const [snapPointsMs, setSnapPointsMs] = useState<number[]>([]);

  useEffect(() => {
    if (!mediaUrl) {
      setSnapPointsMs([]);
      return;
    }
    let cancelled = false;
    loadMonoFromMediaUrl(mediaUrl).then((loaded) => {
      if (cancelled) return;
      if (!loaded) {
        setSnapPointsMs([]);
        return;
      }
      const pts = computePauseSnapPointsMs(loaded.samples, loaded.sampleRate);
      setSnapPointsMs(pts);
    });
    return () => {
      cancelled = true;
    };
  }, [mediaUrl]);

  return snapPointsMs;
}
