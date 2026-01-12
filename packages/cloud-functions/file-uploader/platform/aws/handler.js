import { generatePresignedUploadUrl, buildObjectKey, getContentTypeFromFilename } from '@twick/cloud-file-uploader';

const normalizePrefix = (prefix = '') => {
  if (!prefix) {
    return '';
  }
  return prefix.endsWith('/') ? prefix : `${prefix}/`;
};

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
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  },
  body: JSON.stringify(body),
});

/**
 * AWS Lambda handler for generating pre-signed S3 upload URLs.
 * 
 * Generates pre-signed URLs that allow clients to upload files directly to S3
 * without going through the Lambda function, reducing server load and costs.
 * 
 * Environment variables:
 * - FILE_UPLOADER_S3_BUCKET (required): Destination S3 bucket for uploaded files
 * - FILE_UPLOADER_S3_PREFIX (optional): Key prefix to prepend before the generated object key
 * - FILE_UPLOADER_S3_REGION (optional): Region for the S3 client (defaults to AWS_REGION or ap-south-1)
 * - FILE_UPLOADER_DEFAULT_EXPIRES_IN (optional): Default expiration time in seconds (default: 3600)
 * 
 * @param {Object} event - Lambda event object
 * @param {string} [event.httpMethod] - HTTP method (for API Gateway integration)
 * @param {Object|string} [event.arguments] - AppSync arguments object
 * @param {string} [event.body] - JSON string body (for API Gateway)
 * @param {string} [event.body.filename] - Required: Filename for the upload
 * @param {string} [event.body.contentType] - Optional: MIME type (auto-detected from filename if not provided)
 * @param {string} [event.body.key] - Optional: Custom S3 object key (overrides filename-based key)
 * @param {number} [event.body.expiresIn] - Optional: URL expiration time in seconds (default: 3600)
 * @returns {Promise<Object>} Lambda response object with statusCode, headers, and body
 */
export const handler = async (event) => {
  console.log('file-uploader function invoked');
  console.log('Event:', JSON.stringify(event));

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  try {
    // Parse request payload
    const argumentsPayload =
      event?.arguments?.input ||
      event?.arguments ||
      (event?.body ? JSON.parse(event.body) : {}) ||
      {};

    const {
      filename,
      contentType: providedContentType,
      key: providedKey,
      expiresIn,
    } = argumentsPayload;

    // Validate required fields
    if (!filename && !providedKey) {
      return jsonResponse(400, {
        error: 'Missing required field: filename or key',
        expectedFormat: {
          filename: 'Filename for the upload (required if key not provided)',
          contentType: 'Optional MIME type (auto-detected from filename if not provided)',
          key: 'Optional custom S3 object key (overrides filename-based key)',
          expiresIn: 'Optional URL expiration time in seconds (default: 3600)',
        },
      });
    }

    // Get S3 configuration from environment variables
    const prefix = normalizePrefix(process.env.FILE_UPLOADER_S3_PREFIX || '');
    const region = process.env.FILE_UPLOADER_S3_REGION || process.env.AWS_REGION || 'ap-south-1';
    const defaultExpiresIn = parseInt(
      process.env.FILE_UPLOADER_DEFAULT_EXPIRES_IN || '3600',
      10
    );

    // Determine S3 object key
    const key = providedKey || buildObjectKey(filename, prefix);

    // Determine content type
    const contentType =
      providedContentType ||
      (filename ? getContentTypeFromFilename(filename) : 'application/octet-stream');

    // Use provided expiresIn or default
    const urlExpiresIn = expiresIn || defaultExpiresIn;

    // Get bucket from environment for logging
    const bucket = process.env.FILE_UPLOADER_S3_BUCKET;

    console.log('Generating pre-signed URL...', {
      bucket,
      key,
      contentType,
      expiresIn: urlExpiresIn,
      region,
    });

    // Generate pre-signed URL (bucket is read from env inside the function)
    const result = await generatePresignedUploadUrl({
      key,
      contentType,
      expiresIn: urlExpiresIn,
      region,
    });

    console.log('Pre-signed URL generated successfully');

    // Return the pre-signed URL and metadata
    return jsonResponse(200, {
      uploadUrl: result.uploadUrl,
      key: result.key,
      bucket: result.bucket,
      contentType: result.contentType,
      expiresIn: result.expiresIn,
      // Additional helper information
      instructions: {
        method: 'PUT',
        headers: {
          'Content-Type': result.contentType,
        },
        note: 'Upload the file using PUT request to the uploadUrl with Content-Type header',
      },
    });
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);

    // Provide helpful error messages
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    // Check for missing environment variable
    if (errorMessage.includes('Missing required environment variable')) {
      return jsonResponse(500, {
        error: 'Server configuration error',
        message: errorMessage,
        hint: 'Please configure the required environment variables for the Lambda function',
      });
    }

    return jsonResponse(500, {
      error: 'Error generating pre-signed URL',
      message: errorMessage,
      originalError: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
    });
  }
};
