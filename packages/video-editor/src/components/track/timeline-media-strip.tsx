import { useEffect, useMemo, useState } from "react";
import { getThumbnailCached } from "@twick/media-utils";

const MAX_THUMBNAILS_PER_CLIP = 24;
const MIN_THUMBNAIL_WIDTH = 40;
const MAX_THUMBNAIL_WIDTH = 96;

const videoThumbCache = new Map<string, string>();
const inFlightVideoThumbs = new Map<string, Promise<string>>();

const getThumbCacheKey = (src: string, seekTime: number) =>
  `${src}:${Math.round(seekTime * 100) / 100}`;

const getCachedVideoThumbnail = async (src: string, seekTime: number) => {
  const key = getThumbCacheKey(src, seekTime);
  const cached = videoThumbCache.get(key);
  if (cached) {
    return cached;
  }

  const inFlight = inFlightVideoThumbs.get(key);
  if (inFlight) {
    return inFlight;
  }

  const request = getThumbnailCached(src, seekTime).then((thumb: string) => {
    videoThumbCache.set(key, thumb);
    inFlightVideoThumbs.delete(key);
    return thumb;
  }).catch(() => {
    inFlightVideoThumbs.delete(key);
    throw new Error("Thumbnail extraction failed");
  });

  inFlightVideoThumbs.set(key, request);
  return request;
};

const runWithConcurrencyLimit = async (
  tasks: Array<() => Promise<void>>,
  concurrency: number
) => {
  const active = new Set<Promise<void>>();
  for (const task of tasks) {
    const promise = task();
    active.add(promise);
    promise.finally(() => active.delete(promise));
    if (active.size >= concurrency) {
      await Promise.race(active);
    }
  }
  await Promise.all(active);
};

const getThumbnailCount = (widthPx: number, heightPx: number) => {
  const targetThumbWidth = Math.max(
    MIN_THUMBNAIL_WIDTH,
    Math.min(MAX_THUMBNAIL_WIDTH, Math.round(heightPx * 1.5))
  );
  return Math.max(
    1,
    Math.min(MAX_THUMBNAILS_PER_CLIP, Math.ceil(widthPx / targetThumbWidth))
  );
};

export const ImageTimelineStrip: React.FC<{
  src: string;
  widthPx: number;
  heightPx: number;
}> = ({ src, widthPx, heightPx }) => {
  const count = useMemo(() => getThumbnailCount(widthPx, heightPx), [widthPx, heightPx]);

  return (
    <div className="twick-media-strip twick-media-strip-image" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <img
          key={`${src}-${index}`}
          src={src}
          className="twick-media-strip-thumb"
          alt=""
          draggable={false}
        />
      ))}
    </div>
  );
};

export const VideoTimelineStrip: React.FC<{
  src: string;
  widthPx: number;
  heightPx: number;
  durationSec: number;
  mediaOffsetSec?: number;
  playbackRate?: number;
  mediaDurationSec?: number;
}> = ({
  src,
  widthPx,
  heightPx,
  durationSec,
  mediaOffsetSec = 0,
  playbackRate = 1,
  mediaDurationSec,
}) => {
  const count = useMemo(() => getThumbnailCount(widthPx, heightPx), [widthPx, heightPx]);
  const [thumbs, setThumbs] = useState<Record<number, string>>({});

  const slots = useMemo(() => {
    const timelineDuration = Math.max(0.001, durationSec);
    return Array.from({ length: count }, (_, index) => {
      const progress = count === 1 ? 0 : index / (count - 1);
      const timelineTime = progress * timelineDuration;
      let mediaTime = Math.max(0, mediaOffsetSec + timelineTime * playbackRate);
      if (typeof mediaDurationSec === "number" && mediaDurationSec > 0) {
        mediaTime = Math.min(mediaTime, Math.max(0, mediaDurationSec - 0.05));
      }
      return mediaTime;
    });
  }, [count, durationSec, mediaOffsetSec, playbackRate, mediaDurationSec]);

  useEffect(() => {
    let cancelled = false;

    const loadThumbs = async () => {
      const nextThumbs: Record<number, string> = {};
      const tasks = slots.map((seekTime, index) => async () => {
        try {
          const thumb = await getCachedVideoThumbnail(src, seekTime);
          nextThumbs[index] = thumb;
        } catch {
          // Skip failed thumbs; fallback styling remains visible.
        }
      });

      await runWithConcurrencyLimit(tasks, 3);
      if (!cancelled) {
        setThumbs(nextThumbs);
      }
    };

    loadThumbs();
    return () => {
      cancelled = true;
    };
  }, [src, slots]);

  return (
    <div className="twick-media-strip twick-media-strip-video" aria-hidden="true">
      {slots.map((_, index) => (
        <img
          key={`${src}-${index}`}
          src={thumbs[index]}
          className="twick-media-strip-thumb"
          alt=""
          draggable={false}
        />
      ))}
    </div>
  );
};
