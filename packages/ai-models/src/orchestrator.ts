import type { AIModelProvider } from "./types";
import type {
  CreateJobInput,
  GenerationJob,
  ProviderJobStatusResponse,
  ProviderStartJobRequest,
  WaitForCompletionOptions,
} from "./orchestration-types";
import { ProviderRegistry } from "./provider-registry";
import type { JobStore } from "./job-store";
import { InMemoryJobStore } from "./job-store";
import { UnsupportedGenerationTypeError } from "./provider-adapter";

interface OrchestratorOptions {
  now?: () => Date;
  generateId?: () => string;
}

const DEFAULT_POLL_INTERVAL_MS = 1500;
const DEFAULT_TIMEOUT_MS = 120000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class GenerationOrchestrator {
  private readonly now: () => Date;
  private readonly generateId: () => string;

  constructor(
    private readonly registry: ProviderRegistry,
    private readonly jobStore: JobStore = new InMemoryJobStore(),
    options: OrchestratorOptions = {}
  ) {
    this.now = options.now ?? (() => new Date());
    this.generateId =
      options.generateId ??
      (() => `job_${Math.random().toString(36).slice(2, 10)}`);
  }

  async createJob(input: CreateJobInput): Promise<GenerationJob> {
    const createdAt = this.now().toISOString();
    const job: GenerationJob = {
      id: this.generateId(),
      type: input.type,
      status: "queued",
      provider: input.provider,
      fallbackProviders: input.fallbackProviders ?? [],
      input: input.input,
      modelId: input.modelId,
      requestId: input.requestId,
      attempts: 0,
      createdAt,
      updatedAt: createdAt,
    };

    await this.jobStore.create(job);
    return job;
  }

  async dispatch(jobId: string): Promise<GenerationJob> {
    const job = await this.requireJob(jobId);
    const providers = [job.provider, ...job.fallbackProviders];

    let lastError: string | undefined;

    for (const provider of providers) {
      try {
        const started = await this.startOnProvider(job, provider);
        if (started.status === "completed") {
          return started;
        }

        const completed = await this.waitForCompletion(job.id);
        if (completed.status === "completed") {
          return completed;
        }

        lastError = completed.error ?? "Job did not complete";
      } catch (error) {
        lastError = error instanceof Error ? error.message : String(error);
      }
    }

    const failed = await this.updateJob(job.id, {
      status: "failed",
      error: lastError ?? "All providers failed",
      completedAt: this.now().toISOString(),
    });

    return failed;
  }

  async waitForCompletion(
    jobId: string,
    options: WaitForCompletionOptions = {}
  ): Promise<GenerationJob> {
    const pollIntervalMs = options.pollIntervalMs ?? DEFAULT_POLL_INTERVAL_MS;
    const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    const startedAt = this.now().getTime();

    while (true) {
      const job = await this.requireJob(jobId);

      if (job.status === "completed" || job.status === "failed") {
        return job;
      }

      if (!job.providerJobId) {
        throw new Error(`Job ${jobId} does not have providerJobId`);
      }

      const adapter = this.registry.getAdapter(job.provider);
      const config = this.registry.getProviderConfig(job.provider);
      const status = await adapter.getJobStatus(job.providerJobId, config);

      const updated = await this.applyStatus(job.id, status);
      if (updated.status === "completed" || updated.status === "failed") {
        return updated;
      }

      if (this.now().getTime() - startedAt > timeoutMs) {
        return this.updateJob(job.id, {
          status: "failed",
          error: `Timed out after ${timeoutMs}ms`,
          completedAt: this.now().toISOString(),
        });
      }

      await sleep(pollIntervalMs);
    }
  }

  async getJob(jobId: string): Promise<GenerationJob | null> {
    return this.jobStore.get(jobId);
  }

  private async startOnProvider(
    job: GenerationJob,
    provider: AIModelProvider
  ): Promise<GenerationJob> {
    const adapter = this.registry.getAdapter(provider);
    if (!adapter.supportedTypes.includes(job.type)) {
      throw new UnsupportedGenerationTypeError(provider, job.type);
    }

    const config = this.registry.getProviderConfig(provider);
    const request: ProviderStartJobRequest = {
      type: job.type,
      input: job.input,
      modelId: job.modelId,
      requestId: job.requestId,
    };

    const processing = await this.updateJob(job.id, {
      status: "processing",
      provider,
      attempts: job.attempts + 1,
      error: undefined,
    });

    const response = await adapter.startJob(request, config);

    return this.updateJob(processing.id, {
      providerJobId: response.providerJobId,
      status: this.mapProviderStatus(response.status),
      output: response.output,
      error: response.error,
      completedAt:
        response.status === "completed" || response.status === "failed"
          ? this.now().toISOString()
          : undefined,
    });
  }

  private async applyStatus(
    jobId: string,
    status: ProviderJobStatusResponse
  ): Promise<GenerationJob> {
    const mappedStatus = this.mapProviderStatus(status.status);

    return this.updateJob(jobId, {
      status: mappedStatus,
      output: status.output,
      error: status.error,
      completedAt:
        mappedStatus === "completed" || mappedStatus === "failed"
          ? this.now().toISOString()
          : undefined,
    });
  }

  private mapProviderStatus(
    status: "pending" | "running" | "completed" | "failed"
  ): GenerationJob["status"] {
    switch (status) {
      case "pending":
      case "running":
        return "processing";
      case "completed":
        return "completed";
      case "failed":
        return "failed";
      default:
        return "failed";
    }
  }

  private async requireJob(jobId: string): Promise<GenerationJob> {
    const job = await this.jobStore.get(jobId);
    if (!job) {
      throw new Error(`Job not found: ${jobId}`);
    }
    return job;
  }

  private async updateJob(
    jobId: string,
    patch: Partial<GenerationJob>
  ): Promise<GenerationJob> {
    const current = await this.requireJob(jobId);
    const updated: GenerationJob = {
      ...current,
      ...patch,
      updatedAt: this.now().toISOString(),
    };
    await this.jobStore.update(updated);
    return updated;
  }
}
