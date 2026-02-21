/**
 * Model catalog for FAL and Runware providers.
 * Subset of videosos-main AVAILABLE_ENDPOINTS and RUNWARE_ENDPOINTS.
 * Use sync scripts to keep in sync with provider APIs.
 */
import type { ModelInfo } from "./types";

export const FAL_IMAGE_ENDPOINTS: ModelInfo[] = [
  {
    provider: "fal",
    endpointId: "fal-ai/flux-pro/kontext",
    label: "FLUX.1 Kontext [pro]",
    description: "Professional image generation with context-aware editing",
    popularity: 5,
    category: "image",
    inputAsset: ["image"],
    availableDimensions: [
      { width: 1024, height: 1024, label: "1024x1024 (1:1)" },
      { width: 1024, height: 576, label: "1024x576 (16:9)" },
      { width: 576, height: 1024, label: "576x1024 (9:16)" },
    ],
  },
  {
    provider: "fal",
    endpointId: "fal-ai/flux/dev",
    label: "FLUX.1 [dev]",
    description: "High-quality image generation",
    popularity: 5,
    category: "image",
    minSteps: 1,
    maxSteps: 50,
    defaultSteps: 28,
    minGuidanceScale: 1,
    maxGuidanceScale: 20,
    defaultGuidanceScale: 3.5,
    hasSeed: true,
  },
  {
    provider: "fal",
    endpointId: "fal-ai/flux/schnell",
    label: "FLUX.1 [schnell]",
    description: "Ultra-fast image generation",
    popularity: 4,
    category: "image",
    defaultSteps: 4,
    availableDimensions: [
      { width: 1024, height: 1024, label: "1024x1024 (1:1)" },
      { width: 1024, height: 576, label: "1024x576 (16:9)" },
      { width: 576, height: 1024, label: "576x1024 (9:16)" },
    ],
  },
  {
    provider: "fal",
    endpointId: "fal-ai/gemini-25-flash-image",
    label: "Gemini 2.5 Flash Image",
    description: "Rapid text-to-image generation",
    popularity: 5,
    category: "image",
    availableDimensions: [
      { width: 1024, height: 1024, label: "1024x1024 (1:1)" },
      { width: 1024, height: 768, label: "1024x768 (4:3)" },
      { width: 768, height: 1024, label: "768x1024 (3:4)" },
      { width: 1024, height: 576, label: "1024x576 (16:9)" },
      { width: 576, height: 1024, label: "576x1024 (9:16)" },
    ],
  },
  {
    provider: "fal",
    endpointId: "fal-ai/ideogram/v3",
    label: "Ideogram V3",
    description: "Advanced text-to-image with superior text rendering",
    popularity: 5,
    category: "image",
    hasSeed: true,
    hasNegativePrompt: true,
  },
];

export const FAL_VIDEO_ENDPOINTS: ModelInfo[] = [
  {
    provider: "fal",
    endpointId: "fal-ai/veo3",
    label: "Veo 3",
    description: "Google Veo 3 text-to-video",
    popularity: 5,
    category: "video",
    availableDurations: [4, 6, 8],
    defaultDuration: 8,
    availableDimensions: [
      { width: 576, height: 1024, label: "576x1024 (9:16)" },
      { width: 1024, height: 576, label: "1024x576 (16:9)" },
      { width: 1024, height: 1024, label: "1024x1024 (1:1)" },
    ],
  },
  {
    provider: "fal",
    endpointId: "fal-ai/veo3/fast",
    label: "Veo 3 Fast",
    description: "Accelerated Veo 3 text-to-video",
    popularity: 5,
    category: "video",
    availableDurations: [4, 6, 8],
    defaultDuration: 8,
    availableDimensions: [
      { width: 576, height: 1024, label: "576x1024 (9:16)" },
      { width: 1024, height: 576, label: "1024x576 (16:9)" },
      { width: 1024, height: 1024, label: "1024x1024 (1:1)" },
    ],
  },
  {
    provider: "fal",
    endpointId: "fal-ai/veo3/image-to-video",
    label: "Veo 3 Image-to-Video",
    description: "Animate images with Veo 3",
    popularity: 5,
    category: "video",
    inputAsset: ["image"],
    availableDurations: [8],
    defaultDuration: 8,
  },
  {
    provider: "fal",
    endpointId: "fal-ai/kling-video/v2.5-turbo/pro/text-to-video",
    label: "Kling 2.5 Turbo Pro",
    description: "Text-to-video with fluid motion",
    popularity: 5,
    category: "video",
    availableDurations: [5, 10],
    defaultDuration: 5,
    availableDimensions: [
      { width: 1024, height: 576, label: "1024x576 (16:9)" },
      { width: 576, height: 1024, label: "576x1024 (9:16)" },
      { width: 1024, height: 1024, label: "1024x1024 (1:1)" },
    ],
  },
];

export const RUNWARE_IMAGE_ENDPOINTS: ModelInfo[] = [
  {
    provider: "runware",
    endpointId: "runware:101@1",
    label: "FLUX.1 [dev]",
    category: "image",
    popularity: 5,
    description: "12B text-to-image model",
    defaultSteps: 28,
    defaultGuidanceScale: 3.5,
    hasNegativePrompt: true,
  },
  {
    provider: "runware",
    endpointId: "bfl:1@1",
    label: "FLUX.1 [pro]",
    category: "image",
    popularity: 5,
    description: "Flagship FLUX pro model",
    defaultSteps: 20,
    defaultGuidanceScale: 2.5,
    hasNegativePrompt: true,
  },
  {
    provider: "runware",
    endpointId: "runware:100@1",
    label: "FLUX.1 [schnell]",
    category: "image",
    popularity: 5,
    description: "Ultra-fast 4-step generation",
    defaultSteps: 4,
  },
];

export const RUNWARE_VIDEO_ENDPOINTS: ModelInfo[] = [
  {
    provider: "runware",
    endpointId: "google:5@1",
    label: "Veo 3 (Runware)",
    category: "video",
    popularity: 5,
    description: "Google Veo 3 via Runware",
  },
];

export const FAL_ENDPOINTS: ModelInfo[] = [
  ...FAL_IMAGE_ENDPOINTS,
  ...FAL_VIDEO_ENDPOINTS,
];

export const RUNWARE_ENDPOINTS: ModelInfo[] = [
  ...RUNWARE_IMAGE_ENDPOINTS,
  ...RUNWARE_VIDEO_ENDPOINTS,
];

export const ALL_MODELS: ModelInfo[] = [...FAL_ENDPOINTS, ...RUNWARE_ENDPOINTS];
