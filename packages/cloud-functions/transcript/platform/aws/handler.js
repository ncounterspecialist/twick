import { transcribeVideoUrl } from '../../core/transcriber.js';

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
 *   "videoUrl": "https://example.com/audio.mp3", // or "gs://bucket/object"
 *   "languageCode": "en-US", // optional, defaults to "en-US"
 *   "encoding": "MP3",        // optional
 *   "sampleRateHertz": 16000  // optional
 * }
 *
 * Environment variables:
 * - GOOGLE_CLOUD_PROJECT: Explicit Google Cloud project id.
 * - GOOGLE_CLOUD_LOCATION (optional): Location of the Google Cloud project.  
 * - GOOGLE_VERTEX_MODEL (optional): Model to use for transcription.
 *
 * Returns: JSON payload containing transcript text, caption segments, and word-level timings.
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

    const { videoUrl, language,languageFont } =
      argumentsPayload;

    if (!videoUrl) {
      return jsonResponse(400, {
        error: 'Missing required field: videoUrl',
        expectedFormat: {
          videoUrl:
            'Publicly reachable audio URL or "gs://bucket/object" for GCS',
          language: 'Optional language (e.g., "english", "hindi")',
          languageFont: 'Optional font/script for captions (e.g., "english")',
        },
      });
    }

    const result = await transcribeVideoUrl({
      videoUrl,
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


