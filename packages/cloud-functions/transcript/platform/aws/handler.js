import { transcribe } from '../../core/workflow.js';

const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  },
  body: JSON.stringify(body),
});

/**
 * AWS Lambda handler for generating captions using Google Cloud Speech-to-Text.
 *
 * Expected JSON payload (e.g. via AppSync / Lambda resolver):
 * {
 *   "videoUrl": "https://example.com/video.mp4",   // for video input
 *   "audioUrl": "https://example.com/audio.mp3",   // OR for audio input
 *   "videoSize": { "width": 720, "height": 1280 }, // optional
 *   "language": "english",                         // optional
 *   "languageFont": "english"                      // optional
 * }
 *
 * Environment variables:
 * - GOOGLE_CLOUD_PROJECT: Explicit Google Cloud project id.
 * - GOOGLE_CLOUD_LOCATION (optional): Location of the Google Cloud project.
 * - GOOGLE_VERTEX_MODEL (optional): Model to use for transcription.
 *
 * Returns: JSON payload with captions, duration, and project metadata.
 */
export const handler = async (event) => {
  console.log('Transcript function invoked');
  console.log('Event:', JSON.stringify(event));

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  try {
    const argumentsPayload =
      event?.arguments ||
      (event?.body ? JSON.parse(event.body) : {}) ||
      {};

    const { videoUrl, audioUrl, videoSize, language, languageFont } =
      argumentsPayload;

    if (!videoUrl && !audioUrl) {
      return jsonResponse(400, {
        error: 'Missing required field: provide either videoUrl or audioUrl',
        expectedFormat: {
          videoUrl: 'Publicly reachable video URL (e.g. https://...)',
          audioUrl: 'Publicly reachable audio URL (e.g. https://... or gs://...)',
          videoSize: 'Optional { width, height }',
          language: 'Optional (e.g. "english", "hindi")',
          languageFont: 'Optional font/script (e.g. "english")',
        },
      });
    }

    const result = await transcribe({
      videoUrl: videoUrl || undefined,
      audioUrl: audioUrl || undefined,
      videoSize,
      language,
      languageFont,
    });

    console.log('Transcription completed successfully');

    return jsonResponse(200, {
      ...result,
    });
  } catch (error) {
    console.error('Error generating transcript:', error);

    return jsonResponse(500, {
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};


