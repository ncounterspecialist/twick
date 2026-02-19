/**
 * Model catalog types for Twick generative AI integration.
 * Aligned with videosos-main ApiInfo structure.
 */

export type AIModelCategory = "image" | "video" | "music" | "voiceover";
export type AIModelProvider = "fal" | "runware";

export interface ModelDimension {
  width: number;
  height: number;
  label: string;
  preset?: string;
}

export interface ModelInfo {
  provider: AIModelProvider;
  endpointId: string;
  label: string;
  description?: string;
  popularity: number;
  category: AIModelCategory;
  architecture?: string;
  modelType?: string;
  prompt?: boolean;

  availableDurations?: number[];
  availableDimensions?: ModelDimension[];
  availableFps?: number[];
  defaultDuration?: number;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultFps?: number;

  availableSteps?: number[];
  minSteps?: number;
  maxSteps?: number;
  defaultSteps?: number;

  minGuidanceScale?: number;
  maxGuidanceScale?: number;
  defaultGuidanceScale?: number;

  minStrength?: number;
  maxStrength?: number;
  defaultStrength?: number;

  hasSeed?: boolean;
  hasNegativePrompt?: boolean;
  hasSafetyChecker?: boolean;

  availableSchedulers?: string[];
  defaultScheduler?: string;
  inputAsset?: Array<string | { type: string; key: string }>;
  initialInput?: Record<string, unknown>;
  inputMap?: Record<string, string>;
}

/** Response from polling getRequestStatus for generation jobs */
export interface IGenerationPollingResponse {
  status: "pending" | "completed" | "failed";
  url?: string;
  duration?: number;
  width?: number;
  height?: number;
  error?: string;
}
