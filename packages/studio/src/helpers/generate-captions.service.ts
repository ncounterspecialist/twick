import { CAPTION_STYLE, generateShortUuid, ProjectJSON, VideoElement } from "@twick/timeline";
import {
  ICaptionGenerationPollingResponse,
  ICaptionGenerationService,
  CaptionEntry,
} from "../types";
import { CAPTION_PROPS } from "./constant";
import { hasAudio } from "@twick/media-utils";

class GenerateCaptionsService implements ICaptionGenerationService {
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
    let captionsTrack = this.projectJSON.tracks.find(
      (track) => track.type === "caption"
    );
    if (captionsTrack) {
      // Filter out existing overlapping caption elements
      captionsTrack.elements = captionsTrack.elements.filter((el) => {
        // Keep only non-caption OR captions completely outside the new range
        if (el.type !== "caption") return true;
        return el.e <= startTime || el.s >= endTime;
      });

      // Add new captions
      const newCaptionElements = captions.map((caption, index) => ({
        id: `captions-${index}`, // ensure unique ID
        type: "caption",
        trackId: captionsTrack?.id,
        s: startTime + caption.s,
        e: startTime + caption.e,
        t: caption.t,
      }));

      captionsTrack.elements.push(...newCaptionElements);

      captionsTrack.elements = captionsTrack.elements
        .sort((a, b) => a.s - b.s)
        .map((el, index) => {
          return {
            ...el,
            id: `captions-${index}`,
          };
        });
    } else {
      const captionTrackId = `t-${generateShortUuid()}`;
      captionsTrack = {
        id: captionTrackId,
        name: "Caption",
        elements: [],
        type: "caption",
        props: {
          capStyle: CAPTION_STYLE.WORD_BG_HIGHLIGHT,
          ...CAPTION_PROPS[CAPTION_STYLE.WORD_BG_HIGHLIGHT],
          x: 0,
          y: 200,
          applyToAll: true,
        },
      };
      captionsTrack.elements = captions.map((caption, index) => {
        return {
          id: `captions-${index}`,
          type: "caption",
          trackId: captionTrackId,
          s: startTime + caption.s,
          e: startTime + caption.e,
          t: caption.t,
        };
      });
      this.projectJSON.tracks.push(captionsTrack);
    }
    this.projectJSON.version++;
    return this.projectJSON as ProjectJSON;
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
    this.projectJSON = {
      tracks: [
        {
          type: "video",
          id: "video",
          name: "Video",
          elements: [
            {
              id: "video",
              type: "video",
              src: videoUrl,
              s: 0,
              e: duration,
              props: {
                src: videoUrl,
                playbackRate: 1,
                width: videoSize?.width || 720,
                height: videoSize?.height || 1280,
                time: 0,
                mediaFilter: "none",
                volume: 1,
              },
            },
          ],
        },
      ],
      version: 1,
    };

    const reqId = await this.generateCaptions(videoElement, this.projectJSON);
    return reqId;
  }
}

export default GenerateCaptionsService;
