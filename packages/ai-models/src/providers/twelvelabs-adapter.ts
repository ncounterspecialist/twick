import type { ProviderAdapter } from "../provider-adapter";
import type {
  CaptionGenerationInput,
  GenerationType,
  ProviderConfig,
  ProviderJobStatusResponse,
  ProviderStartJobRequest,
  ProviderStartJobResponse,
  TimedTextSegment,
} from "../orchestration-types";

const DEFAULT_ENDPOINT = "https://api.twelvelabs.io/v1.3";
const DEFAULT_MODEL = "pegasus1.5";
const DEFAULT_SEGMENT_ID = "caption";

/**
 * Shape of a single segment returned by Pegasus when `analysis_mode` is
 * `time_based_metadata`. Times are in seconds.
 */
interface TwelveLabsSegment {
  start_time: number;
  end_time: number;
  metadata?: Record<string, unknown>;
}

interface CreateTaskResponse {
  _id?: string;
  task_id?: string;
  status?: string;
}

interface RetrieveTaskResponse {
  status?: string;
  result?: { data?: string };
  error?: { message?: string } | string;
  message?: string;
}

/**
 * Maps a TwelveLabs analyze-task status onto the orchestrator's status enum.
 * TwelveLabs reports `pending` / `processing` / `ready` / `failed`.
 */
const mapStatus = (
  status: string | undefined
): ProviderJobStatusResponse["status"] => {
  switch (status) {
    case "ready":
      return "completed";
    case "failed":
      return "failed";
    case "processing":
      return "running";
    default:
      return "pending";
  }
};

/**
 * Reads the caption text from a Pegasus segment's metadata. The adapter asks
 * Pegasus for a `text` field per segment, but falls back to any string field so
 * a slightly different prompt still yields usable captions.
 */
const extractText = (segment: TwelveLabsSegment): string => {
  const meta = segment.metadata ?? {};
  if (typeof meta.text === "string") {
    return meta.text;
  }
  const firstString = Object.values(meta).find((v) => typeof v === "string");
  return typeof firstString === "string" ? firstString : "";
};

/**
 * Converts the raw Pegasus `result.data` payload (a JSON-encoded string keyed
 * by segment definition id) into Twick `TimedTextSegment`s. Exported for unit
 * testing the parsing logic without a network call.
 */
export const parseCaptionData = (data: string): TimedTextSegment[] => {
  let parsed: Record<string, TwelveLabsSegment[]>;
  try {
    parsed = JSON.parse(data) as Record<string, TwelveLabsSegment[]>;
  } catch {
    return [];
  }

  const segments = Object.values(parsed).flat();
  return segments
    .filter((s): s is TwelveLabsSegment => s != null && typeof s === "object")
    .map((s) => ({
      text: extractText(s),
      startMs: Math.max(0, Math.round((s.start_time ?? 0) * 1000)),
      endMs: Math.round((s.end_time ?? s.start_time ?? 0) * 1000),
    }))
    .filter((s) => s.text.length > 0)
    .sort((a, b) => a.startMs - b.startMs);
};

/**
 * Opt-in provider adapter that uses TwelveLabs Pegasus video understanding to
 * generate time-aligned captions directly from a video URL — no separate
 * transcription step required.
 *
 * Register it the same way as any other provider:
 *
 * ```ts
 * const registry = new ProviderRegistry();
 * registry.registerAdapter(new TwelveLabsAdapter());
 * registry.setProviderConfig({
 *   provider: "twelvelabs",
 *   apiKey: process.env.TWELVELABS_API_KEY,
 * });
 * ```
 *
 * Captions are produced asynchronously: `startJob` creates a Pegasus analyze
 * task and returns its id; the orchestrator polls `getJobStatus` until the task
 * is `ready`.
 */
export class TwelveLabsAdapter implements ProviderAdapter {
  readonly provider = "twelvelabs" as const;
  readonly supportedTypes: readonly GenerationType[] = ["caption"];

  async startJob(
    request: ProviderStartJobRequest,
    config: ProviderConfig
  ): Promise<ProviderStartJobResponse> {
    const input = request.input as CaptionGenerationInput;
    if (!input?.videoUrl) {
      throw new Error("TwelveLabs caption generation requires input.videoUrl");
    }

    const promptHint = input.language
      ? ` Write the caption text in ${input.language}.`
      : "";

    const body = {
      model_name: config.modelMap?.[request.type] ?? DEFAULT_MODEL,
      video: { type: "url", url: input.videoUrl },
      analysis_mode: "time_based_metadata",
      response_format: {
        type: "segment_definitions",
        segment_definitions: [
          {
            id: DEFAULT_SEGMENT_ID,
            description:
              "Spoken-line and on-screen-action captions for subtitles.",
            fields: [
              {
                name: "text",
                type: "string",
                description:
                  "A short caption describing what is said or happening." +
                  promptHint,
              },
            ],
          },
        ],
      },
    };

    const response = await this.fetchJson<CreateTaskResponse>(
      `${this.baseUrl(config)}/analyze/tasks`,
      config,
      { method: "POST", body: JSON.stringify(body) }
    );

    const providerJobId = response.task_id ?? response._id;
    if (!providerJobId) {
      throw new Error("TwelveLabs did not return a task id");
    }

    return { providerJobId, status: mapStatus(response.status) };
  }

  async getJobStatus(
    providerJobId: string,
    config: ProviderConfig
  ): Promise<ProviderJobStatusResponse> {
    const response = await this.fetchJson<RetrieveTaskResponse>(
      `${this.baseUrl(config)}/analyze/tasks/${encodeURIComponent(
        providerJobId
      )}`,
      config,
      { method: "GET" }
    );

    const status = mapStatus(response.status);
    if (status === "completed") {
      const captions = parseCaptionData(response.result?.data ?? "");
      return { status, output: { captions } };
    }
    if (status === "failed") {
      const error =
        typeof response.error === "string"
          ? response.error
          : response.error?.message ?? response.message ?? "Analysis failed";
      return { status, error };
    }
    return { status };
  }

  private baseUrl(config: ProviderConfig): string {
    return (config.endpoint ?? DEFAULT_ENDPOINT).replace(/\/+$/, "");
  }

  private async fetchJson<T>(
    url: string,
    config: ProviderConfig,
    init: RequestInit
  ): Promise<T> {
    const apiKey = config.apiKey;
    if (!apiKey) {
      throw new Error("TwelveLabs provider config requires an apiKey");
    }

    const controller =
      config.timeoutMs != null ? new AbortController() : undefined;
    const timer = controller
      ? setTimeout(() => controller.abort(), config.timeoutMs)
      : undefined;

    try {
      const response = await fetch(url, {
        ...init,
        signal: controller?.signal,
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      });

      const text = await response.text();
      const json = text ? (JSON.parse(text) as T) : ({} as T);

      if (!response.ok) {
        const message =
          (json as { message?: string }).message ??
          `TwelveLabs request failed with ${response.status}`;
        throw new Error(message);
      }

      return json;
    } finally {
      if (timer) {
        clearTimeout(timer);
      }
    }
  }
}
