import { useState, useCallback, useRef, useEffect } from 'react';
import type { MediaItem } from '@twick/video-editor';

export interface VideoPreviewState {
  playingVideo: string | null; // ID of currently playing video
  videoElement: HTMLVideoElement | null;
}

export interface VideoPreviewActions {
  togglePlayPause: (item: MediaItem, videoElement: HTMLVideoElement) => void;
  stopPlayback: () => void;
}

export const useVideoPreview = (): VideoPreviewState & VideoPreviewActions => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Cleanup video element on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current = null;
      }
    };
  }, []);

  const stopPlayback = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current = null;
    }
    setPlayingVideo(null);
  }, []);

  const togglePlayPause = useCallback((item: MediaItem, videoElement: HTMLVideoElement) => {
    // If we're already playing this video, pause it
    if (playingVideo === item.id) {
      videoElement.pause();
      stopPlayback();
      return;
    }

    // Stop any currently playing video
    stopPlayback();

    // Start playing the new video
    videoElement.currentTime = 0; // Reset to start
    videoElement.play();
    videoRef.current = videoElement;
    setPlayingVideo(item.id);

    // Add ended event listener
    videoElement.addEventListener('ended', stopPlayback, { once: true });
  }, [playingVideo, stopPlayback]);

  return {
    playingVideo,
    videoElement: videoRef.current,
    togglePlayPause,
    stopPlayback,
  };
};