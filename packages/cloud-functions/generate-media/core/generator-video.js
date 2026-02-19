/**
 * @twick/cloud-generate-media - Video generation
 * Calls FAL or Runware API for video generation.
 * Env: FAL_KEY, RUNWARE_KEY (optional), GRAPHQL_API_URL, GRAPHQL_API_KEY (for request-log update)
 */
import { createFalClient } from "@fal-ai/client";
import { validateVideoParams } from "./validate.js";

function getFalClient() {
  const key = process.env.FAL_KEY;
  if (!key) {
    throw new Error("FAL_KEY environment variable is required");
  }
  return createFalClient({ credentials: () => key });
}

/**
 * Update request-log with status and response.
 * Used by video Lambda on completion (async flow).
 */
export async function updateRequestLog(requestId, status, responseData) {
  const apiUrl = process.env.GRAPHQL_API_URL;
  const apiKey = process.env.GRAPHQL_API_KEY;
  if (!apiUrl || !apiKey) {
    console.warn("GRAPHQL_API_URL or GRAPHQL_API_KEY not set; skipping request-log update");
    return;
  }

  const mutation = `
    mutation CreateTwickRequestLog($input: CreateTwickRequestLogInput!) {
      createTwickRequestLog(input: $input) {
        requestId
        createdAt
        status
      }
    }
  `;

  const input = {
    requestId,
    createdAt: new Date().toISOString(),
    jobType: "generate-video",
    status,
    request: JSON.stringify({ requestId }),
    response: JSON.stringify({ payload: responseData }),
  };

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ query: mutation, variables: { input } }),
    });
    if (!res.ok) {
      console.warn("Request-log update failed:", res.status, await res.text());
    }
  } catch (err) {
    console.warn("Request-log update error:", err);
  }
}

/**
 * Generate video via FAL or Runware.
 * @param {Object} params
 * @param {string} params.requestId - for async request-log update
 * @param {string} params.provider - "fal" | "runware"
 * @param {string} params.endpointId - e.g. "fal-ai/veo3"
 * @param {string} params.prompt
 * @param {string} [params.image_url] - for image-to-video
 * @param {number} [params.duration]
 * @param {number} [params.fps]
 * @param {number} [params.width]
 * @param {number} [params.height]
 * @param {number} [params.steps]
 * @param {number} [params.guidance_scale]
 * @param {string} [params.negative_prompt]
 * @returns {Promise<{url?: string, duration?: number, error?: string}>}
 */
export async function generateVideo(params) {
  const {
    requestId,
    provider,
    endpointId,
    prompt,
    image_url,
    duration,
    fps,
    width,
    height,
    steps,
    guidance_scale,
    negative_prompt,
  } = params;

  const validation = validateVideoParams(params);
  if (!validation.valid) {
    return { error: validation.error };
  }

  try {
    const fal = getFalClient();
    const input = { prompt };
    if (image_url) input.image_url = image_url;
    if (duration) input.duration = duration;
    if (fps) input.fps = fps;
    if (width) input.width = width;
    if (height) input.height = height;
    if (steps) input.num_inference_steps = steps;
    if (guidance_scale != null) input.guidance_scale = guidance_scale;
    if (negative_prompt) input.negative_prompt = negative_prompt;

    const result = await fal.subscribe(endpointId, { input });
    const url = result?.video?.url ?? result?.video_url ?? result?.url;
    if (!url) {
      const err = "No video URL in FAL response";
      if (requestId) await updateRequestLog(requestId, "failed", { error: err });
      return { error: err };
    }

    const durationSec = result?.video?.duration ?? result?.duration;
    if (requestId) {
      await updateRequestLog(requestId, "completed", { url, duration: durationSec });
    }
    return { url, duration: durationSec };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("generateVideo error:", msg);
    if (requestId) await updateRequestLog(requestId, "failed", { error: msg });
    return { error: msg };
  }
}
