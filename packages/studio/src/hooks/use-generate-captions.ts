import { ProjectJSON, useTimelineContext, VideoElement } from "@twick/timeline";
import {
  ICaptionGenerationPollingResponse,
  StudioConfig,
  CaptionEntry,
} from "../types";

const useGenerateCaptions = (studioConfig?: StudioConfig) => {
  const { editor, present } = useTimelineContext();
  /**
   * Generates captions using the new polling-based service
   * Returns a function that can be called to start the generation process
   */
  const onGenerateCaptions = async (videoElement: VideoElement) => {
    // Use new polling-based service if available
    if (studioConfig?.captionGenerationService) {
      const service = studioConfig.captionGenerationService;
      const reqId = await service.generateCaptions(
        videoElement,
        present as ProjectJSON
      );
      return reqId;
    }
    alert("Generate captions not supported in demo mode");
    return null;
  };

  const addCaptionsToTimeline = (captions: CaptionEntry[]) => {
    const updatedProjectJSON =
      studioConfig?.captionGenerationService?.updateProjectWithCaptions(
        captions
      );
    if (updatedProjectJSON) {
      editor.loadProject(updatedProjectJSON);
    }
  };

  const getCaptionstatus = async (reqId: string) => {
    if (studioConfig?.captionGenerationService) {
      const service = studioConfig.captionGenerationService;
      return await service.getRequestStatus(reqId);
    }
    return {
      status: "failed",
      error: "Caption generation service not found",
    } as ICaptionGenerationPollingResponse;
  };

  return {
    onGenerateCaptions,
    addCaptionsToTimeline,
    getCaptionstatus,
  };
};

export default useGenerateCaptions;
