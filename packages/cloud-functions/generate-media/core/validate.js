/**
 * Shared validation for image and video generation params.
 * No external API dependencies - safe for unit tests.
 */

/**
 * Validate image generation params.
 * @param {Object} params
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateImageParams(params) {
  const { provider, endpointId, prompt } = params ?? {};
  if (!provider || !endpointId || !prompt) {
    return { valid: false, error: "provider, endpointId, and prompt are required" };
  }
  if (provider === "runware") {
    return { valid: false, error: "Runware provider not yet implemented in cloud-generate-media. Use FAL for now." };
  }
  if (provider !== "fal") {
    return { valid: false, error: "Unsupported provider. Use fal or runware." };
  }
  return { valid: true };
}

/**
 * Validate video generation params.
 * @param {Object} params
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateVideoParams(params) {
  const { provider, endpointId, prompt } = params ?? {};
  if (!provider || !endpointId || !prompt) {
    return { valid: false, error: "provider, endpointId, and prompt are required" };
  }
  if (provider === "runware") {
    return { valid: false, error: "Runware provider not yet implemented in cloud-generate-media. Use FAL for now." };
  }
  if (provider !== "fal") {
    return { valid: false, error: "Unsupported provider. Use fal or runware." };
  }
  return { valid: true };
}
