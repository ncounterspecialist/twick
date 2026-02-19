import React, { useState, useCallback, useEffect } from "react";
import { Size, TrackElement } from "@twick/timeline";
import { ImageElement, VideoElement } from "@twick/timeline";
import { useLivePlayerContext } from "@twick/live-player";
import type { StudioConfig } from "../../types";
import {
  FAL_IMAGE_ENDPOINTS,
  FAL_VIDEO_ENDPOINTS,
  type ModelInfo,
} from "@twick/ai-models";

const DEFAULT_IMAGE_DURATION = 5;

interface GenerateMediaPanelContainerProps {
  videoResolution: Size;
  selectedElement: TrackElement | null;
  addElement: (element: TrackElement) => void;
  updateElement: (element: TrackElement) => void;
  studioConfig?: StudioConfig;
}

export function GenerateMediaPanelContainer({
  videoResolution,
  addElement,
  studioConfig,
}: GenerateMediaPanelContainerProps): React.ReactElement {
  const { getCurrentTime } = useLivePlayerContext();
  const [tab, setTab] = useState<"image" | "video">("image");
  const [prompt, setPrompt] = useState("");
  const [selectedEndpointId, setSelectedEndpointId] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const imageService = studioConfig?.imageGenerationService;
  const videoService = studioConfig?.videoGenerationService;
  const hasAnyService = !!imageService || !!videoService;

  const endpoints = tab === "image" ? FAL_IMAGE_ENDPOINTS : FAL_VIDEO_ENDPOINTS;
  const defaultEndpointId = endpoints[0]?.endpointId ?? "";

  useEffect(() => {
    if (!selectedEndpointId && defaultEndpointId) {
      setSelectedEndpointId(defaultEndpointId);
    }
  }, [tab, defaultEndpointId, selectedEndpointId]);

  const pollStatus = useCallback(
    async (requestId: string) => {
      const service = tab === "image" ? imageService : videoService;
      if (!service) return;

      const interval = setInterval(async () => {
        try {
          const result = await service.getRequestStatus(requestId);
          if (result.status === "completed" && result.url) {
            clearInterval(interval);
            setIsGenerating(false);
            setStatus(null);
            setError(null);
            const currentTime = getCurrentTime();
            const duration = result.duration ?? DEFAULT_IMAGE_DURATION;

            if (tab === "image") {
              const element = new ImageElement(result.url, videoResolution);
              element.setStart(currentTime);
              element.setEnd(currentTime + duration);
              addElement(element);
            } else {
              const element = new VideoElement(result.url, videoResolution);
              element.setStart(currentTime);
              element.setEnd(currentTime + duration);
              addElement(element);
            }
          } else if (result.status === "failed") {
            clearInterval(interval);
            setIsGenerating(false);
            setStatus(null);
            setError(result.error ?? "Generation failed");
          }
        } catch {
          // Keep polling
        }
      }, 3000);

      return () => clearInterval(interval);
    },
    [tab, imageService, videoService, getCurrentTime, videoResolution, addElement]
  );

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError("Enter a prompt");
      return;
    }

    if (tab === "image" && !imageService) {
      setError("Image generation not configured");
      return;
    }
    if (tab === "video" && !videoService) {
      setError("Video generation not configured");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setStatus("Starting...");

    try {
      const endpointId = selectedEndpointId || defaultEndpointId;
      if (tab === "image" && imageService) {
        const requestId = await imageService.generateImage({
          provider: "fal",
          endpointId,
          prompt: prompt.trim(),
        });
        if (requestId) {
          setStatus("Generating image...");
          pollStatus(requestId);
        }
      } else if (tab === "video" && videoService) {
        const requestId = await videoService.generateVideo({
          provider: "fal",
          endpointId,
          prompt: prompt.trim(),
        });
        if (requestId) {
          setStatus("Generating video (this may take several minutes)...");
          pollStatus(requestId);
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Generation failed";
      setError(msg);
      setIsGenerating(false);
      setStatus(null);
    }
  }, [
    tab,
    prompt,
    selectedEndpointId,
    defaultEndpointId,
    imageService,
    videoService,
    pollStatus,
  ]);

  if (!hasAnyService) {
    return (
      <div className="panel-container">
        <p className="empty-state-text">
          Image and video generation require configuration. Add imageGenerationService
          and videoGenerationService to StudioConfig.
        </p>
      </div>
    );
  }

  return (
    <div className="panel-container">
      <div className="panel-section">
        <div className="flex gap-2 mb-2">
          <button
            type="button"
            className={`btn-ghost ${tab === "image" ? "active" : ""}`}
            onClick={() => setTab("image")}
            disabled={!imageService}
          >
            Image
          </button>
          <button
            type="button"
            className={`btn-ghost ${tab === "video" ? "active" : ""}`}
            onClick={() => setTab("video")}
            disabled={!videoService}
          >
            Video
          </button>
        </div>

        <div className="mb-2">
          <label className="block text-sm mb-1">Model</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedEndpointId}
            onChange={(e) => setSelectedEndpointId(e.target.value)}
            disabled={isGenerating}
          >
            {endpoints.map((ep: ModelInfo) => (
              <option key={ep.endpointId} value={ep.endpointId}>
                {ep.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label className="block text-sm mb-1">Prompt</label>
          <textarea
            className="w-full p-2 border rounded min-h-[80px]"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image or video you want..."
            disabled={isGenerating}
          />
        </div>

        {error && (
          <div className="mb-2 text-red-600 text-sm">{error}</div>
        )}

        {status && (
          <div className="mb-2 text-sm text-gray-600">{status}</div>
        )}

        <button
          type="button"
          className="btn-primary w-full"
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
        >
          {isGenerating ? "Generating..." : `Generate ${tab}`}
        </button>
      </div>
    </div>
  );
}
