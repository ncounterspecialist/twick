import { createProject } from '../../core/create-project.js';

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
 * AWS Lambda handler for generating subtitle video from audio using Google Cloud Speech-to-Text.
 *
 * Expected JSON payload (e.g. via AppSync / Lambda resolver):
 * {
 *   "videoUrl": "https://example.com/video.mp4", // or "gs://bucket/object"
 *   "videoSize": { "width": 1920, "height": 1080 }, // optional, defaults to 720x1280
 *   "language": "english", // optional, defaults to "english"
 *   "languageFont": "english" // optional, defaults to "english"
 * }
 *
 * Environment variables:
 * - GOOGLE_CLOUD_PROJECT: Explicit Google Cloud project id.
 * - GOOGLE_CLOUD_LOCATION (optional): Location of the Google Cloud project.
 * - GOOGLE_VERTEX_MODEL (optional): Model to use for transcription.
 *
 * Returns: JSON payload containing subtitle video project.
 */
export const handler = async (event) => {
  console.log('Subtitle video function invoked');
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

    const { videoUrl, videoSize, language, languageFont, exportProject } =
      argumentsPayload;

    if (!videoUrl) {
      return jsonResponse(400, {
        error: 'Missing required field: videoUrl',
        expectedFormat: {
          videoUrl:
            'Publicly reachable video URL or "gs://bucket/object" for GCS',
          videoSize: 'Optional video size (e.g., { "width": 1920, "height": 1080 })',
          language: 'Optional language (e.g., "english", "hindi")',
          languageFont: 'Optional font/script for subtitles (e.g., "english")',
        },
      });
    }

    const result = await createProject({
      videoUrl,
      videoSize,
      language,
      languageFont,
    });

    console.log('Subtitle video project created successfully');

    if (exportProject) {
      const project = await exportProject(result);
      return project;
    } else {
      return jsonResponse(200, {
        ...result,
      });
    }
  } catch (error) {
    console.error('Error creating subtitle video project:', error);

    return jsonResponse(500, {
      error: 'Error creating subtitle video project',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};


