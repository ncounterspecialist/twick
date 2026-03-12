import { CAPTION_STYLE, ProjectJSON, VideoElement } from "@twick/timeline";
import {
  applyCaptionsToProject as applyCaptionsToWorkflowProject,
  buildCaptionProject,
} from "@twick/workflow";
import {
  ICaptionGenerationPollingResponse,
  ICaptionGenerationService,
  CaptionEntry,
} from "../types";
import { CAPTION_PROPS } from "./constant";
import { hasAudio } from "@twick/media-utils";

class GenerateCaptionsService implements ICaptionGenerationService {
  /**
   * Compatibility wrapper for legacy Studio caption service flow.
   * New AI workflows should prefer @twick/workflow directly.
   */
  videoElement: VideoElement | null;
  projectJSON: ProjectJSON | null;
  generateSubtiltesApi: (videoUrl: string) => Promise<string>;
  requestStatusApi: (reqId: string) => Promise<ICaptionGenerationPollingResponse>;

  constructor({
    generateSubtiltesApi,
    requestStatusApi,
  }: {
    generateSubtiltesApi: (videoUrl: string) => Promise<string>;
    requestStatusApi: (reqId: string) => Promise<ICaptionGenerationPollingResponse>;
  }) {
    this.videoElement = null;
    this.projectJSON = null;
    this.generateSubtiltesApi = generateSubtiltesApi;
    this.requestStatusApi = requestStatusApi;
  }

  async generateCaptions(
    videoElement: VideoElement,
    projectJSON: ProjectJSON
  ): Promise<string> {
    if (!videoElement || !projectJSON) {
      throw new Error("Video element or project not set");
    }

    this.videoElement = videoElement;
    this.projectJSON = projectJSON;

    try {
      return await this.generateSubtiltesApi(videoElement.getSrc());
    } catch (error) {
      console.error("Error generating captions:", error);
      throw error;
    }
  }

  async getRequestStatus(
    reqId: string
  ): Promise<ICaptionGenerationPollingResponse> {
    return await this.requestStatusApi(reqId);
  }

  updateProjectWithCaptions(
    captions: CaptionEntry[]
  ): ProjectJSON {
    if (!this.projectJSON) {
      throw new Error("Project not set");
    }
    if (!this.videoElement) {
      throw new Error("Video element not set");
    }
    const startTime = this.videoElement.getStart();
    const endTime = this.videoElement.getEnd();
    const workflowCaptions = captions.map((caption) => ({
      t: caption.t,
      s: Math.max(0, caption.s * 1000),
      e: Math.max(0, caption.e * 1000),
      ...(Array.isArray(caption.w) && caption.w.length
        ? {
            w: caption.w.map((sec) => Math.max(0, sec * 1000)),
          }
        : {}),
    }));

    const updated = applyCaptionsToWorkflowProject(this.projectJSON, {
      captions: workflowCaptions,
      insertionStartSec: startTime,
      insertionEndSec: endTime,
      captionTrackStyle: {
        capStyle: CAPTION_STYLE.WORD_BG_HIGHLIGHT,
        ...CAPTION_PROPS[CAPTION_STYLE.WORD_BG_HIGHLIGHT],
        x: 0,
        y: 200,
        applyToAll: true,
      },
      // For now, rely on auto-detected language in the backend; language
      // wiring is handled when applying patches at the workflow level.
    });
    this.projectJSON = updated;
    return updated;
  }

  async generateCaptionVideo(
    videoUrl: string,
    videoSize?: { width: number; height: number }
  ): Promise<string> {
    const videoElement = new VideoElement(videoUrl, {
      width: videoSize?.width || 720,
      height: videoSize?.height || 1280,
    });
    await videoElement.updateVideoMeta();
    const duration = videoElement.getMediaDuration();
    if (!duration) {
      throw new Error("Video duration not available");
    }
    const videoHasAudio = await hasAudio(videoUrl);
    if (!videoHasAudio) {
      throw new Error("Video has no audio");
    }
    this.projectJSON = buildCaptionProject({
      captions: [],
      videoUrl,
      durationSec: duration,
      videoSize,
    }) as ProjectJSON;

    const reqId = await this.generateCaptions(videoElement, this.projectJSON);
    return reqId;
  }
}

export default GenerateCaptionsService;
