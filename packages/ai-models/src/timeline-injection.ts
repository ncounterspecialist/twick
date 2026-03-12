import type {
  CaptionGenerationInput,
  GenerationJob,
  TimelineAvatarPatch,
  TimelineCaptionPatch,
  TimelineMediaPatch,
  TimelinePatch,
  TimelineVoicePatch,
  TimedTextSegment,
} from "./orchestration-types";
import { getDefaultFontForLanguage } from "./language-font-map";

function buildFallbackSegments(job: GenerationJob): TimedTextSegment[] {
  if (job.type !== "voice") {
    return [];
  }

  const input = job.input as { text?: string };
  const text = input.text ?? "";
  const durationMs = job.output?.durationMs ?? 3000;
  return [{ text, startMs: 0, endMs: durationMs }];
}

export function toTimelinePatch(job: GenerationJob): TimelinePatch {
  if (job.status !== "completed" || !job.output) {
    throw new Error(`Job ${job.id} is not completed with output`);
  }

  if (job.type === "voice") {
    if (!job.output.mediaUrl) {
      throw new Error(`Job ${job.id} missing mediaUrl for voice patch`);
    }
    const voicePatch: TimelineVoicePatch = {
      type: "voice",
      mediaUrl: job.output.mediaUrl,
      durationMs: job.output.durationMs,
      captions: job.output.segments ?? buildFallbackSegments(job),
    };
    return voicePatch;
  }

  if (job.type === "caption") {
    const captionInput = job.input as CaptionGenerationInput;
    const language = captionInput.language;
    const languageFont =
      captionInput.languageFont ?? getDefaultFontForLanguage(language);
    const captionPatch: TimelineCaptionPatch = {
      type: "caption",
      captions: job.output.captions ?? job.output.segments ?? [],
      language,
      languageFont,
    };
    return captionPatch;
  }

  if (job.type === "image" || job.type === "video" || job.type === "imageToVideo") {
    const mediaEntries = job.output.media ?? (job.output.mediaUrl ? [
      {
        mediaUrl: job.output.mediaUrl,
        thumbnailUrl: job.output.thumbnailUrl,
        durationMs: job.output.durationMs,
      },
    ] : []);

    const mediaPatch: TimelineMediaPatch = {
      type: "media",
      media: mediaEntries,
    };
    return mediaPatch;
  }

  if (!job.output.mediaUrl) {
    throw new Error(`Job ${job.id} missing mediaUrl for avatar patch`);
  }
  const avatarPatch: TimelineAvatarPatch = {
    type: "avatar",
    mediaUrl: job.output.mediaUrl,
    durationMs: job.output.durationMs,
    thumbnailUrl: job.output.thumbnailUrl,
  };

  return avatarPatch;
}
