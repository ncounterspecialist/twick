/**
 * @twick/ai-models
 * Model catalog, provider adapters, and orchestration primitives.
 */
export type {
  ModelInfo,
  ModelDimension,
  AIModelCategory,
  AIModelProvider,
  IGenerationPollingResponse,
} from "./types";

export {
  FAL_ENDPOINTS,
  FAL_IMAGE_ENDPOINTS,
  FAL_VIDEO_ENDPOINTS,
  RUNWARE_ENDPOINTS,
  RUNWARE_IMAGE_ENDPOINTS,
  RUNWARE_VIDEO_ENDPOINTS,
  ALL_MODELS,
} from "./catalog";

export type {
  GenerationType,
  JobStatus,
  TimedTextSegment,
  CaptionGenerationInput,
  TranslationGenerationInput,
  ImageGenerationInput,
  VideoGenerationInput,
  ScriptToTimelineGenerationInput,
  ProjectSection,
  TimelinePlacementHint,
  OverlayAnnotation,
  PersonalizationVariableSet,
  MediaAssetResult,
  LocalizedTrackResult,
  ProjectAssemblyPatch,
  TimelineCaptionPatch,
  TimelineMediaPatch,
  TimelineBrollPatch,
  TimelineOverlayPatch,
  TimelineLocalizationPatch,
  TimelineAutoEditPatch,
  TimelineVariantPatch,
  TimelineEnhancementPatch,
  TimelinePdfToVideoPatch,
  GenerationInput,
  VoiceGenerationInput,
  AvatarGenerationInput,
  VoiceSegment,
  ProviderGenerationOutput,
  ProviderStartJobRequest,
  ProviderStartJobResponse,
  ProviderJobStatusResponse,
  ProviderConfig,
  GenerationJob,
  CreateJobInput,
  WaitForCompletionOptions,
  TimelinePatch,
  TimelineVoicePatch,
  TimelineAvatarPatch,
} from "./orchestration-types";

export { ProviderRegistry } from "./provider-registry";
export type { ProviderAdapter } from "./provider-adapter";
export {
  AdapterNotFoundError,
  UnsupportedGenerationTypeError,
} from "./provider-adapter";

export type { JobStore } from "./job-store";
export { InMemoryJobStore } from "./job-store";
export { GenerationOrchestrator } from "./orchestrator";
export { toTimelinePatch } from "./timeline-injection";
export type { LegacyCaptionEntry } from "./caption-normalizer";
export { normalizeCaptionEntries } from "./caption-normalizer";
