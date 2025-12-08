import { CAPTION_STYLE, ProjectJSON, VideoElement } from "@twick/timeline";
import {
  ISubtitleGenerationPollingResponse,
  ISubtitleGenerationService,
  SubtitleEntry,
} from "../types";
import { CAPTION_PROPS } from "./constant";
import { hasAudio } from "@twick/media-utils";

class GenerateSubtitlesService implements ISubtitleGenerationService {
  videoElement: VideoElement | null;
  projectJSON: ProjectJSON | null;
  generateSubtiltesApi: (videoUrl: string) => Promise<string>;
  requestStatusApi: (reqId: string) => Promise<ISubtitleGenerationPollingResponse>;

  constructor({
    generateSubtiltesApi,
    requestStatusApi,
  }: {
    generateSubtiltesApi: (videoUrl: string) => Promise<string>;
    requestStatusApi: (reqId: string) => Promise<ISubtitleGenerationPollingResponse>;
  }) {
    this.videoElement = null;
    this.projectJSON = null;
    this.generateSubtiltesApi = generateSubtiltesApi;
    this.requestStatusApi = requestStatusApi;
  }

  async generateSubtitles(
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
      console.error("Error generating subtitles:", error);
      throw error;
    }
  }

  async getRequestStatus(
    reqId: string
  ): Promise<ISubtitleGenerationPollingResponse> {
    return await this.requestStatusApi(reqId);
  }

  updateProjectWithSubtitles(
    subtitles: SubtitleEntry[]
  ): ProjectJSON {
    if (!this.projectJSON) {
      throw new Error("Project not set");
    }
    if (!this.videoElement) {
      throw new Error("Video element not set");
    }
    const startTime = this.videoElement.getStart();
    const endTime = this.videoElement.getEnd();
    let subtitlesTrack = this.projectJSON.tracks.find(
      (track) => track.type === "caption"
    );
    if (subtitlesTrack) {
      // Filter out existing overlapping subtitle elements
      subtitlesTrack.elements = subtitlesTrack.elements.filter((el) => {
        // Keep only non-caption OR captions completely outside the new range
        if (el.type !== "caption") return true;
        return el.e <= startTime || el.s >= endTime;
      });

      // Add new subtitles
      const newSubtitleElements = subtitles.map((subtitle, index) => ({
        id: `subtitles-${index}`, // ensure unique ID
        type: "caption",
        s: startTime + subtitle.s,
        e: startTime + subtitle.e,
        t: subtitle.t,
      }));

      subtitlesTrack.elements.push(...newSubtitleElements);

      subtitlesTrack.elements = subtitlesTrack.elements
        .sort((a, b) => a.s - b.s)
        .map((el, index) => {
          return {
            ...el,
            id: `subtitles-${index}`,
          };
        });
    } else {
      subtitlesTrack = {
        id: "subtitles",
        name: "Subtitles",
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
      subtitlesTrack.elements = subtitles.map((subtitle, index) => {
        return {
          id: `subtitles-${index}`,
          type: "caption",
          s: startTime + subtitle.s,
          e: startTime + subtitle.e,
          t: subtitle.t,
        };
      });
      this.projectJSON.tracks.push(subtitlesTrack);
    }
    this.projectJSON.version++;
    return this.projectJSON as ProjectJSON;
  }

  async generateSubtitleVideo(
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

    const reqId = await this.generateSubtitles(videoElement, this.projectJSON);
    return reqId;
  }
}

export default GenerateSubtitlesService;
