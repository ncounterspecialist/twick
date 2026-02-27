import { useRef, useState } from "react";

type RecorderState = "idle" | "recording" | "stopped" | "error";

interface UseScreenRecorderReturn {
  state: RecorderState;
  mediaUrl: string | null;
  error: string | null;
  startRecording: (withMic: boolean) => Promise<void>;
  stopRecording: () => void;
  clearRecording: () => void;
}

export const useScreenRecorder = (): UseScreenRecorderReturn => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const [state, setState] = useState<RecorderState>("idle");
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cleanupStream = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  const startRecording = async (withMic: boolean) => {
    try {
      setError(null);
      if (mediaUrl) {
        URL.revokeObjectURL(mediaUrl);
        setMediaUrl(null);
      }

      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      let mixedStream = displayStream;
      if (withMic) {
        const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mixedStream = new MediaStream([
          ...displayStream.getVideoTracks(),
          ...displayStream.getAudioTracks(),
          ...micStream.getAudioTracks(),
        ]);
      }

      streamRef.current = mixedStream;
      chunksRef.current = [];
      const recorder = new MediaRecorder(mixedStream, {
        mimeType: "video/webm",
      });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onerror = () => {
        setState("error");
        setError("Recording failed");
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setMediaUrl(url);
        setState("stopped");
        cleanupStream();
      };

      recorder.start();
      setState("recording");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Unable to start recording");
      cleanupStream();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

  const clearRecording = () => {
    if (mediaUrl) {
      URL.revokeObjectURL(mediaUrl);
    }
    cleanupStream();
    setMediaUrl(null);
    setError(null);
    setState("idle");
  };

  return {
    state,
    mediaUrl,
    error,
    startRecording,
    stopRecording,
    clearRecording,
  };
};
