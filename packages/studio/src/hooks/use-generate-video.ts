import { useState, useCallback } from "react";
import { VideoElement, Size } from "@twick/timeline";
import { useEditorManager } from "@twick/video-editor";
import type { StudioConfig, GenerateVideoParams } from "../types";

export const useGenerateVideo = (studioConfig?: StudioConfig) => {
  const { addElement } = useEditorManager();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateVideo = useCallback(
    async (params: GenerateVideoParams) => {
      const service = studioConfig?.videoGenerationService;
      if (!service) {
        setError("Video generation service not configured");
        return null;
      }

      setIsGenerating(true);
      setError(null);
      try {
        const requestId = await service.generateVideo(params);
        return requestId;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to start video generation";
        setError(msg);
        return null;
      } finally {
        setIsGenerating(false);
      }
    },
    [studioConfig?.videoGenerationService]
  );

  const addVideoToTimeline = useCallback(
    (url: string, videoResolution: Size, startTime: number, duration: number) => {
      const element = new VideoElement(url, videoResolution);
      element.setStart(startTime);
      element.setEnd(startTime + duration);
      void addElement(element);
    },
    [addElement]
  );

  return {
    generateVideo,
    addVideoToTimeline,
    isGenerating,
    error,
    hasService: !!studioConfig?.videoGenerationService,
  };
};
