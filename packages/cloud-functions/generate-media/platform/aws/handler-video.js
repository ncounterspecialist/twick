/**
 * AWS Lambda handler for video generation.
 * Invoked asynchronously by execute-job; updates request-log on completion.
 */
import { generateVideo } from "../../core/generator-video.js";

const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  },
  body: JSON.stringify(body),
});

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: { "Access-Control-Allow-Origin": "*" }, body: "" };
  }

  try {
    const payload = event?.arguments ?? (event?.body ? JSON.parse(event.body) : {}) ?? {};
    const result = await generateVideo(payload);

    if (result.error) {
      return jsonResponse(400, { error: result.error });
    }

    return jsonResponse(200, { url: result.url, duration: result.duration });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return jsonResponse(500, { error: msg });
  }
};
