/**
 * Service interfaces for generative AI image and video.
 * Uses types from @twick/ai-models for ModelInfo and polling response.
 */
import type {
  IGenerationPollingResponse,
  ModelInfo,
} from "@twick/ai-models";

/** Parameters for image generation */
export interface GenerateImageParams {
  provider: "fal" | "runware";
  endpointId: string;
  prompt: string;
  image_url?: string;
  width?: number;
  height?: number;
  steps?: number;
  guidance_scale?: number;
  negative_prompt?: string;
}

/** Parameters for video generation */
export interface GenerateVideoParams {
  provider: "fal" | "runware";
  endpointId: string;
  prompt: string;
  image_url?: string;
  duration?: number;
  fps?: number;
  width?: number;
  height?: number;
  steps?: number;
  guidance_scale?: number;
  negative_prompt?: string;
}

export interface IImageGenerationService {
  /** Submit image generation job; returns requestId for polling */
  generateImage: (params: GenerateImageParams) => Promise<string>;
  /** Poll status of generation job */
  getRequestStatus: (reqId: string) => Promise<IGenerationPollingResponse>;
  /** Available image models */
  getAvailableModels?: () => ModelInfo[];
}

export interface IVideoGenerationService {
  /** Submit video generation job; returns requestId for polling */
  generateVideo: (params: GenerateVideoParams) => Promise<string>;
  /** Poll status of generation job */
  getRequestStatus: (reqId: string) => Promise<IGenerationPollingResponse>;
  /** Available video models */
  getAvailableModels?: () => ModelInfo[];
}
