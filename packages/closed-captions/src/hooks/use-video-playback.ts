import { useEffect, useState, useCallback } from 'react';

type UseVideoPlaybackOptions = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onTimeUpdate?: (currentTimeMs: number) => void;
  onDurationChange?: (durationMs: number) => void;
};

export function useVideoPlayback({ videoRef }: UseVideoPlaybackOptions) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeMs, setCurrentTimeMs] = useState(0);
  const [videoDurationMs, setVideoDurationMs] = useState<number>(120_000);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const onEnded = () => setIsPlaying(false);
    const onPause = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);
    const onTimeUpdate = () => setCurrentTimeMs(Math.round(el.currentTime * 1000));
    const onLoaded = () => {
      const d = Number.isFinite(el.duration) ? el.duration : 0;
      setVideoDurationMs(Math.max(1, Math.round(d * 1000)));
    };
    el.addEventListener('ended', onEnded);
    el.addEventListener('pause', onPause);
    el.addEventListener('play', onPlay);
    el.addEventListener('timeupdate', onTimeUpdate);
    el.addEventListener('loadedmetadata', onLoaded);
    return () => {
      el.removeEventListener('ended', onEnded);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('play', onPlay);
      el.removeEventListener('timeupdate', onTimeUpdate);
      el.removeEventListener('loadedmetadata', onLoaded);
    };
  }, [videoRef]);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = playbackRate;
  }, [playbackRate, videoRef]);

  const togglePlay = useCallback(async () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      return;
    }
    await videoRef.current.play();
    setIsPlaying(true);
  }, [isPlaying, videoRef]);

  const handleStop = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setCurrentTimeMs(0);
    setIsPlaying(false);
  }, [videoRef]);

  const handleScrub = useCallback(
    (nextMs: number) => {
      if (!videoRef.current) return;
      const clamped = Math.max(0, Math.min(nextMs, videoDurationMs));
      videoRef.current.currentTime = clamped / 1000;
      setCurrentTimeMs(clamped);
    },
    [videoDurationMs, videoRef]
  );

  return {
    isPlaying,
    currentTimeMs,
    setCurrentTimeMs,
    videoDurationMs,
    playbackRate,
    setPlaybackRate,
    togglePlay,
    handleStop,
    handleScrub,
  };
}
