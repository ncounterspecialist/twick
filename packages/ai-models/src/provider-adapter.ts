import type { AIModelProvider } from "./types";
import type {
  ProviderConfig,
  ProviderJobStatusResponse,
  ProviderStartJobRequest,
  ProviderStartJobResponse,
  GenerationType,
} from "./orchestration-types";

export interface ProviderAdapter {
  readonly provider: AIModelProvider;
  readonly supportedTypes: readonly GenerationType[];
  startJob(
    request: ProviderStartJobRequest,
    config: ProviderConfig
  ): Promise<ProviderStartJobResponse>;
  getJobStatus(
    providerJobId: string,
    config: ProviderConfig
  ): Promise<ProviderJobStatusResponse>;
  cancelJob?(
    providerJobId: string,
    config: ProviderConfig
  ): Promise<void>;
}

export class AdapterNotFoundError extends Error {
  constructor(provider: AIModelProvider) {
    super(`No adapter registered for provider: ${provider}`);
    this.name = "AdapterNotFoundError";
  }
}

export class UnsupportedGenerationTypeError extends Error {
  constructor(provider: AIModelProvider, type: GenerationType) {
    super(`Provider ${provider} does not support generation type: ${type}`);
    this.name = "UnsupportedGenerationTypeError";
  }
}
