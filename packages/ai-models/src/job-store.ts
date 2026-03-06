import type { GenerationJob, JobStatus } from "./orchestration-types";

export interface JobStore {
  create(job: GenerationJob): Promise<void>;
  update(job: GenerationJob): Promise<void>;
  get(jobId: string): Promise<GenerationJob | null>;
  listByStatus(status: JobStatus): Promise<GenerationJob[]>;
}

export class InMemoryJobStore implements JobStore {
  private readonly jobs = new Map<string, GenerationJob>();

  async create(job: GenerationJob): Promise<void> {
    this.jobs.set(job.id, job);
  }

  async update(job: GenerationJob): Promise<void> {
    this.jobs.set(job.id, job);
  }

  async get(jobId: string): Promise<GenerationJob | null> {
    return this.jobs.get(jobId) ?? null;
  }

  async listByStatus(status: JobStatus): Promise<GenerationJob[]> {
    return Array.from(this.jobs.values()).filter((job) => job.status === status);
  }
}
