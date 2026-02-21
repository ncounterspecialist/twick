import { useState, useCallback } from "react";
import { ImageElement, Size } from "@twick/timeline";
import { useEditorManager } from "@twick/video-editor";
import type { StudioConfig, GenerateImageParams } from "../types";

export const useGenerateImage = (studioConfig?: StudioConfig) => {
  const { addElement } = useEditorManager();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = useCallback(
    async (params: GenerateImageParams) => {
      const service = studioConfig?.imageGenerationService;
      if (!service) {
        setError("Image generation service not configured");
        return null;
      }

      setIsGenerating(true);
      setError(null);
      try {
        const requestId = await service.generateImage(params);
        return requestId;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to start image generation";
        setError(msg);
        return null;
      } finally {
        setIsGenerating(false);
      }
    },
    [studioConfig?.imageGenerationService]
  );

  const addImageToTimeline = useCallback(
    (url: string, videoResolution: Size, startTime: number, duration: number) => {
      const element = new ImageElement(url, videoResolution);
      element.setStart(startTime);
      element.setEnd(startTime + duration);
      void addElement(element);
    },
    [addElement]
  );

  return {
    generateImage,
    addImageToTimeline,
    isGenerating,
    error,
    hasService: !!studioConfig?.imageGenerationService,
  };
};
