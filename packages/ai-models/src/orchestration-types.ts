import type { AIModelProvider } from "./types";

export type GenerationType =
  | "caption"
  | "translation"
  | "voice"
  | "avatar"
  | "image"
  | "video"
  | "imageToVideo"
  | "scriptToTimeline"
  | "videoEnhancement"
  | "assetSelection"
  | "pdfToVideo"
  | "overlayGeneration"
  | "personalization"
  | "autoEdit"
  | "brollSuggestion"
  | "sceneAssembly";

export type JobStatus =
  | "queued"
  | "processing"
  | "completed"
  | "failed"
  | "cancelled";

export interface VoiceGenerationInput {
  text: string;
  language?: string;
  voiceId?: string;
  speed?: number;
  pitch?: number;
  style?: string;
}

export interface AvatarGenerationInput {
  script: string;
  avatarId: string;
  language?: string;
  sceneDurationMs?: number;
  backgroundUrl?: string;
}

export interface TimedTextSegment {
  text: string;
  startMs: number;
  endMs: number;
  wordStartMs?: number[];
  metadata?: Record<string, unknown>;
}

/**
 * Backward compatible alias for existing voice-oriented naming.
 */
export type VoiceSegment = TimedTextSegment;

export interface CaptionGenerationInput {
  videoUrl?: string;
  audioUrl?: string;
  language?: string;
  languageFont?: string;
}

export interface TranslationGenerationInput {
  sourceLanguage: string;
  targetLanguage: string;
  captions: TimedTextSegment[];
}

export interface ImageGenerationInput {
  prompt: string;
  imageUrl?: string;
  width?: number;
  height?: number;
  steps?: number;
  guidanceScale?: number;
  negativePrompt?: string;
}

export interface VideoGenerationInput {
  prompt: string;
  imageUrl?: string;
  durationMs?: number;
  fps?: number;
  width?: number;
  height?: number;
  steps?: number;
  guidanceScale?: number;
  negativePrompt?: string;
}

export interface ProjectSection {
  id: string;
  label?: string;
  startMs?: number;
  endMs?: number;
  intent?: string;
  summary?: string;
  assets?: Array<{
    type: "image" | "video" | "audio";
    url: string;
    label?: string;
  }>;
}

export interface ScriptToTimelineGenerationInput {
  prompt: string;
  context?: Record<string, unknown>;
  sections?: ProjectSection[];
}

export interface TimelinePlacementHint {
  targetTrack?: "video" | "audio" | "caption" | "element" | string;
  insertionMode?:
    | "appendTrack"
    | "newTrack"
    | "overlayTrack"
    | "replaceWithinRange"
    | "replaceElement"
    | "forkVariant";
  relativeToElementId?: string;
  relativeToTrackId?: string;
  zIndexHint?: number;
  preferredStartMs?: number;
  preferredEndMs?: number;
}

export interface OverlayAnnotation {
  type: "text" | "shape" | "icon" | string;
  text?: string;
  startMs: number;
  endMs: number;
  positionHint?: "top" | "middle" | "bottom" | "custom";
  emphasis?: "low" | "medium" | "high";
  providerMeta?: Record<string, unknown>;
}

export interface PersonalizationVariableSet {
  variantId: string;
  variables: Record<string, string>;
  locale?: string;
  audienceSegment?: string;
}

export interface MediaAssetResult {
  mediaUrl: string;
  thumbnailUrl?: string;
  durationMs?: number;
  width?: number;
  height?: number;
  providerMeta?: Record<string, unknown>;
}

export interface LocalizedTrackResult {
  sourceLanguage: string;
  targetLanguage: string;
  segments: TimedTextSegment[];
}

export interface ProjectAssemblyPatch {
  sections?: ProjectSection[];
  metadata?: Record<string, unknown>;
}

export interface TimelineOverlayPatch {
  type: "overlay";
  overlays: OverlayAnnotation[];
  placement?: TimelinePlacementHint;
}

export interface TimelineLocalizationPatch {
  type: "localization";
  sourceLanguage: string;
  targetLanguage: string;
  captions: TimedTextSegment[];
}

export interface TimelineAutoEditPatch {
  type: "autoEdit";
  keepRanges: Array<{ startMs: number; endMs: number }>;
  placement?: TimelinePlacementHint;
}

export interface TimelineVariantPatch {
  type: "variant";
  variables?: Record<string, string>;
  metadata?: Record<string, unknown>;
}

export interface TimelineEnhancementPatch {
  type: "videoEnhancement";
  sourceUrl: string;
  enhancedUrl: string;
  durationMs?: number;
}

export interface TimelinePdfToVideoPatch {
  type: "pdfToVideo";
  media: MediaAssetResult[];
}

export interface TimelineMediaPatch {
  type: "media";
  media: MediaAssetResult[];
  placement?: TimelinePlacementHint;
}

export interface TimelineBrollPatch {
  type: "broll";
  media: MediaAssetResult[];
  placement?: TimelinePlacementHint;
}

export interface TimelineCaptionPatch {
  type: "caption";
  captions: TimedTextSegment[];
  language?: string;
  languageFont?: string;
}

export interface ProviderGenerationOutput {
  mediaUrl?: string;
  thumbnailUrl?: string;
  durationMs?: number;
  segments?: TimedTextSegment[];
  captions?: TimedTextSegment[];
  media?: MediaAssetResult[];
  localizedTrack?: LocalizedTrackResult;
  projectPatch?: ProjectAssemblyPatch;
  overlayPatch?: TimelineOverlayPatch;
  variantPatch?: TimelineVariantPatch;
  providerMeta?: Record<string, unknown>;
}

export type GenerationInput =
  | VoiceGenerationInput
  | AvatarGenerationInput
  | CaptionGenerationInput
  | TranslationGenerationInput
  | ImageGenerationInput
  | VideoGenerationInput
  | ScriptToTimelineGenerationInput
  | Record<string, unknown>;

export interface ProviderStartJobRequest {
  type: GenerationType;
  input: GenerationInput;
  modelId?: string;
  requestId?: string;
}

export interface ProviderStartJobResponse {
  providerJobId: string;
  status: "pending" | "running" | "completed" | "failed";
  output?: ProviderGenerationOutput;
  error?: string;
}

export interface ProviderJobStatusResponse {
  status: "pending" | "running" | "completed" | "failed";
  output?: ProviderGenerationOutput;
  error?: string;
}

export interface ProviderConfig {
  provider: AIModelProvider;
  apiKey?: string;
  endpoint?: string;
  region?: string;
  modelMap?: Record<string, string>;
  timeoutMs?: number;
  extra?: Record<string, string>;
}

export interface GenerationJob {
  id: string;
  type: GenerationType;
  status: JobStatus;
  provider: AIModelProvider;
  fallbackProviders: AIModelProvider[];
  providerJobId?: string;
  input: GenerationInput;
  output?: ProviderGenerationOutput;
  modelId?: string;
  requestId?: string;
  error?: string;
  attempts: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface CreateJobInput {
  type: GenerationType;
  input: GenerationInput;
  provider: AIModelProvider;
  fallbackProviders?: AIModelProvider[];
  modelId?: string;
  requestId?: string;
}

export interface WaitForCompletionOptions {
  pollIntervalMs?: number;
  timeoutMs?: number;
}

export interface TimelineVoicePatch {
  type: "voice";
  mediaUrl: string;
  durationMs?: number;
  captions: TimedTextSegment[];
}

export interface TimelineAvatarPatch {
  type: "avatar";
  mediaUrl: string;
  durationMs?: number;
  thumbnailUrl?: string;
}

export type TimelinePatch =
  | TimelineVoicePatch
  | TimelineAvatarPatch
  | TimelineCaptionPatch
  | TimelineMediaPatch
  | TimelineBrollPatch
  | TimelineOverlayPatch
  | TimelineLocalizationPatch
  | TimelineAutoEditPatch
  | TimelineVariantPatch
  | TimelineEnhancementPatch
  | TimelinePdfToVideoPatch;
