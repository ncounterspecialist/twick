import { useState, useCallback, useRef, useEffect } from 'react';
import type { MediaItem } from '@twick/video-editor';

export interface AudioPreviewState {
  playingAudio: string | null; // ID of currently playing audio
  audioElement: HTMLAudioElement | null;
}

export interface AudioPreviewActions {
  togglePlayPause: (item: MediaItem) => void;
  stopPlayback: () => void;
}

export const useAudioPreview = (): AudioPreviewState & AudioPreviewActions => {
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Cleanup audio element on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const stopPlayback = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlayingAudio(null);
  }, []);

  const togglePlayPause = useCallback((item: MediaItem) => {
    // If we're already playing this audio, stop it
    if (playingAudio === item.id) {
      stopPlayback();
      return;
    }

    // Stop any currently playing audio
    stopPlayback();

    // Start playing the new audio
    const audio = new Audio(item.url);
    audio.addEventListener('ended', stopPlayback);
    audio.play();
    audioRef.current = audio;
    setPlayingAudio(item.id);
  }, [playingAudio, stopPlayback]);

  return {
    playingAudio,
    audioElement: audioRef.current,
    togglePlayPause,
    stopPlayback,
  };
};
