import { createCaptionProject, exportProject } from '@twick/cloud-caption-video';

/**
 * Creates a standardized JSON HTTP response with CORS headers.
 * 
 * @param {number} statusCode - HTTP status code
 * @param {Object} body - Response body object (will be JSON stringified)
 * @returns {Object} Lambda response object with statusCode, headers, and body
 */
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
 * AWS Lambda handler for creating caption video projects.
 * 
 * Processes video URLs, transcribes audio using Google Speech-to-Text,
 * and optionally exports projects to Google Cloud Storage.
 * 
 * @param {Object} event - Lambda event object
 * @param {string} [event.httpMethod] - HTTP method (for API Gateway integration)
 * @param {Object|string} [event.arguments] - AppSync arguments object
 * @param {string} [event.body] - JSON string body (for API Gateway)
 * @param {string} [event.body.videoUrl] - Required: Publicly accessible video URL
 * @param {Object} [event.body.videoSize] - Optional: Video dimensions {width, height}
 * @param {string} [event.body.language] - Optional: Transcription language (default: "english")
 * @param {string} [event.body.languageFont] - Optional: Font/script for captions
 * @param {boolean} [event.body.shouldExport] - Optional: If true, exports project to GCS
 * @returns {Promise<Object>} Lambda response object with statusCode, headers, and body
 */
export const handler = async (event) => {
  console.log('Caption video function invoked');
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

    const { videoUrl, videoSize, language, languageFont, shouldExport } =
      argumentsPayload;

    if (!videoUrl) {
      return jsonResponse(400, {
        error: 'Missing required field: videoUrl',
        expectedFormat: {
          videoUrl:
            'Publicly reachable video URL or "gs://bucket/object" for GCS',
          videoSize: 'Optional video size (e.g., { "width": 1920, "height": 1080 })',
          language: 'Optional language (e.g., "english", "hindi")',
          languageFont: 'Optional font/script for captions (e.g., "english")',
        },
      });
    }

    const result = await createCaptionProject({
      videoUrl,
      videoSize,
      language,
      languageFont,
    });

    console.log('Caption video project created successfully');

    if (shouldExport) {
      const project = await exportProject(result);
      return jsonResponse(200, {
        url: project,
      });
    } else {
      return jsonResponse(200, {
        project: result,
      });
    }
  } catch (error) {
    console.error('Error creating caption video project:', error);

    return jsonResponse(500, {
      error: 'Error creating caption video project',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};


