/**
 * @twick/ai-models
 * Provider adapters and orchestration primitives for Twick generative AI.
 */
export type {
  ModelInfo,
  ModelDimension,
  AIModelCategory,
  AIModelProvider,
  IGenerationPollingResponse,
} from "./types";

export type {
  GenerationType,
  JobStatus,
  TimedTextSegment,
  CaptionPhraseLength,
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
