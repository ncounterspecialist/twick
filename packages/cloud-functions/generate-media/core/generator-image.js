/**
 * @twick/cloud-generate-media - Image generation
 * Calls FAL or Runware API for image generation.
 * Env: FAL_KEY, RUNWARE_KEY (optional)
 */
import { createFalClient } from "@fal-ai/client";
import { validateImageParams } from "./validate.js";

function getFalClient() {
  const key = process.env.FAL_KEY;
  if (!key) {
    throw new Error("FAL_KEY environment variable is required");
  }
  return createFalClient({ credentials: () => key });
}

/**
 * Generate image via FAL or Runware.
 * @param {Object} params
 * @param {string} params.provider - "fal" | "runware"
 * @param {string} params.endpointId - e.g. "fal-ai/flux/dev"
 * @param {string} params.prompt
 * @param {string} [params.image_url] - for image-to-image
 * @param {number} [params.width]
 * @param {number} [params.height]
 * @param {number} [params.steps]
 * @param {number} [params.guidance_scale]
 * @param {string} [params.negative_prompt]
 * @returns {Promise<{url?: string, error?: string}>}
 */
export async function generateImage(params) {
  const validation = validateImageParams(params);
  if (!validation.valid) {
    return { error: validation.error };
  }

  const { image_url, width, height, steps, guidance_scale, negative_prompt, prompt } = params;

  try {
    const fal = getFalClient();
    const input = { prompt };
    if (image_url) input.image_url = image_url;
    if (width) input.width = width;
    if (height) input.height = height;
    if (steps) input.num_inference_steps = steps;
    if (guidance_scale != null) input.guidance_scale = guidance_scale;
    if (negative_prompt) input.negative_prompt = negative_prompt;

    const result = await fal.subscribe(endpointId, { input });
    const data = result?.data ?? result;
    const url = data?.images?.[0]?.url ?? data?.image?.url ?? data?.url ?? result?.url;
    if (!url) {
      return { error: "No image URL in FAL response" };
    }
    return { url };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("generateImage error:", msg);
    return { error: msg };
  }
}
