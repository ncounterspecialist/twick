import { ProjectJSON, useTimelineContext, VideoElement } from "@twick/timeline";
import {
  ISubtitleGenerationPollingResponse,
  StudioConfig,
  SubtitleEntry,
} from "../types";

const useGenerateSubtitles = (studioConfig?: StudioConfig) => {
  const { editor, present } = useTimelineContext();
  /**
   * Generates subtitles using the new polling-based service
   * Returns a function that can be called to start the generation process
   */
  const onGenerateSubtitles = async (videoElement: VideoElement) => {
    // Use new polling-based service if available
    if (studioConfig?.subtitleGenerationService) {
      const service = studioConfig.subtitleGenerationService;
      const reqId = await service.generateSubtitles(
        videoElement,
        present as ProjectJSON
      );
      return reqId;
    }
    alert("Generate subtitles not supported in demo mode");
    return null;
  };

  const addSubtitlesToTimeline = (subtitles: SubtitleEntry[]) => {
    const updatedProjectJSON =
      studioConfig?.subtitleGenerationService?.updateProjectWithSubtitles(
        subtitles
      );
    if (updatedProjectJSON) {
      editor.loadProject(updatedProjectJSON);
    }
  };

  const getSubtitleStatus = async (reqId: string) => {
    if (studioConfig?.subtitleGenerationService) {
      const service = studioConfig.subtitleGenerationService;
      return await service.getRequestStatus(reqId);
    }
    return {
      status: "failed",
      error: "Subtitle generation service not found",
    } as ISubtitleGenerationPollingResponse;
  };

  return {
    onGenerateSubtitles,
    addSubtitlesToTimeline,
    getSubtitleStatus,
  };
};

export default useGenerateSubtitles;
