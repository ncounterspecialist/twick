import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { downloadVideo } from '@twick/cloud-yt-downloader';
import { readFileSync, unlinkSync, existsSync } from 'fs';

const s3Client = new S3Client({
  region: process.env.YT_DOWNLOADER_S3_REGION || process.env.AWS_REGION || 'us-east-1',
  endpoint: process.env.YT_DOWNLOADER_S3_ENDPOINT || undefined,
  forcePathStyle: process.env.YT_DOWNLOADER_S3_FORCE_PATH_STYLE === 'true',
});

const ensureEnvVar = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const normalizePrefix = (prefix = '') => {
  if (!prefix) {
    return '';
  }
  return prefix.endsWith('/') ? prefix : `${prefix}/`;
};

const sanitizeFilename = (title, url) => {
  if (title) {
    return String(title)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-_]+/g, '-')
      .replace(/-{2,}/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 100) || 'video';
  }
  // Fallback: extract video ID from URL or use timestamp
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|vimeo\.com\/)([a-zA-Z0-9_-]+)/);
  return match ? match[1] : `video-${Date.now()}`;
};

const buildObjectKey = (title, url, uniqueSuffix) => {
  const baseName = sanitizeFilename(title, url);
  return `${baseName}-${uniqueSuffix}.mp4`;
};

const encodeS3Key = (key) =>
  key
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');

const buildPublicUrl = ({ bucket, key, region, baseUrl }) => {
  if (baseUrl) {
    const trimmedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    return `${trimmedBase}/${encodeS3Key(key)}`;
  }

  const encodedKey = encodeS3Key(key);

  if (!region || region === 'us-east-1') {
    return `https://${bucket}.s3.amazonaws.com/${encodedKey}`;
  }

  return `https://${bucket}.s3.${region}.amazonaws.com/${encodedKey}`;
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
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  },
  body: JSON.stringify(body),
});

/**
 * AWS Lambda handler for downloading videos using yt-dlp.
 * 
 * Downloads videos from YouTube and other supported platforms,
 * optionally merging video and audio streams with ffmpeg, and uploads to S3.
 * 
 * Environment variables:
 * - YT_DOWNLOADER_S3_BUCKET (required): Destination S3 bucket for downloaded videos
 * - YT_DOWNLOADER_S3_PREFIX (optional): Key prefix to prepend before the generated object key
 * - YT_DOWNLOADER_S3_REGION (optional): Region for the S3 client (defaults to AWS_REGION or us-east-1)
 * - YT_DOWNLOADER_PUBLIC_BASE_URL (optional): Custom base URL for returned video links
 * - YT_DOWNLOADER_S3_ENDPOINT (optional): Custom endpoint for S3-compatible storage
 * - YT_DOWNLOADER_S3_FORCE_PATH_STYLE (optional): Set to "true" to force path-style URLs
 * 
 * @param {Object} event - Lambda event object
 * @param {string} [event.httpMethod] - HTTP method (for API Gateway integration)
 * @param {Object|string} [event.arguments] - AppSync arguments object
 * @param {string} [event.body] - JSON string body (for API Gateway)
 * @param {string} [event.body.url] - Required: Video URL to download
 * @param {string} [event.body.format] - Optional: Video format preference (default: "bestvideo+bestaudio/best")
 * @param {boolean} [event.body.mergeVideoAudio] - Optional: Merge video/audio with ffmpeg (default: true)
 * @param {Object} [event.body.ytdlpOptions] - Optional: Additional yt-dlp options
 * @returns {Promise<Object>} Lambda response object with statusCode, headers, and body
 */
export const handler = async (event) => {
  console.log('yt-downloader function invoked');
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

  let downloadedVideoPath = null;

  try {
    const argumentsPayload =
      event?.arguments?.input ||
      event?.arguments ||
      (event?.body ? JSON.parse(event.body) : {}) ||
      {};

    const { url, format, mergeVideoAudio, ytdlpOptions } = argumentsPayload;

    if (!url) {
      return jsonResponse(400, {
        error: 'Missing required field: url',
        expectedFormat: {
          url: 'Video URL (YouTube, Vimeo, etc.)',
          format: 'Optional format preference (e.g., "bestvideo+bestaudio/best")',
          mergeVideoAudio: 'Optional: merge video/audio streams (default: true)',
          ytdlpOptions: 'Optional: additional yt-dlp options',
        },
      });
    }

    console.log(`Downloading video from: ${url}`);

    // Download the video
    const result = await downloadVideo({
      url,
      format,
      mergeVideoAudio: mergeVideoAudio !== false, // default to true
      ytdlpOptions,
    });

    downloadedVideoPath = result.filePath;
    console.log('Video downloaded successfully:', downloadedVideoPath);

    // Verify the file exists
    if (!existsSync(downloadedVideoPath)) {
      throw new Error(`Downloaded video file not found: ${downloadedVideoPath}`);
    }

    // Read the video file
    const videoBuffer = readFileSync(downloadedVideoPath);
    console.log('Video file read, size:', videoBuffer.length, 'bytes');

    // Get S3 configuration
    const bucket = ensureEnvVar('YT_DOWNLOADER_S3_BUCKET');
    const prefix = normalizePrefix(process.env.YT_DOWNLOADER_S3_PREFIX || '');
    const region = process.env.YT_DOWNLOADER_S3_REGION || process.env.AWS_REGION || 'us-east-1';
    const baseUrl = process.env.YT_DOWNLOADER_PUBLIC_BASE_URL;
    const uniqueSuffix = Date.now();
    const objectKey = `${prefix}${buildObjectKey(result.title, url, uniqueSuffix)}`;

    console.log('Uploading video to S3...', {
      bucket,
      key: objectKey,
      region,
      size: videoBuffer.length,
      baseUrl: baseUrl ? '[redacted]' : undefined,
    });

    // Upload to S3
    try {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: objectKey,
          Body: videoBuffer,
          ContentType: 'video/mp4',
          ContentLength: videoBuffer.length,
          Metadata: {
            'video-url': url,
            'video-title': result.title || '',
            'video-uploader': result.uploader || '',
            'video-duration': String(result.duration || ''),
            'downloaded-at': new Date().toISOString(),
          },
        })
      );
      console.log('Video uploaded to S3 successfully');
    } catch (uploadError) {
      console.error('Video upload failed:', uploadError);
      throw new Error(`Failed to upload video to S3: ${uploadError.message || uploadError}`);
    }

    // Clean up temporary file
    try {
      if (downloadedVideoPath && existsSync(downloadedVideoPath)) {
        unlinkSync(downloadedVideoPath);
        console.log('Temporary video file cleaned up');
      }
    } catch (cleanupError) {
      console.warn('Failed to clean up temporary file:', cleanupError);
    }

    const videoUrl = buildPublicUrl({ bucket, key: objectKey, region, baseUrl });
    console.log('Video available at URL:', videoUrl);

    // Return the video URL and metadata
    return jsonResponse(200, {
      url: videoUrl,
      bucket,
      key: objectKey,
      size: videoBuffer.length,
      contentType: 'video/mp4',
      metadata: {
        title: result.title,
        uploader: result.uploader,
        duration: result.duration,
        width: result.width,
        height: result.height,
        fps: result.fps,
        format: result.format,
      },
    });
  } catch (error) {
    console.error('Error downloading video:', error);

    // Clean up temporary file on error
    try {
      if (downloadedVideoPath && existsSync(downloadedVideoPath)) {
        unlinkSync(downloadedVideoPath);
        console.log('Temporary video file cleaned up after error');
      }
    } catch (cleanupError) {
      console.warn('Failed to clean up temporary file after error:', cleanupError);
    }

    // Provide more helpful error messages
    const errorMessage = error instanceof Error ? error.message : String(error);
    let userFriendlyError = errorMessage;
    
    if (errorMessage.includes('bot') || errorMessage.includes('cookies') || errorMessage.includes('authentication')) {
      userFriendlyError = 
        'YouTube is requiring authentication for this video. To download protected videos, you need to provide cookies. ' +
        'You can do this by: 1) Exporting cookies from your browser, 2) Uploading them to S3, 3) Passing the S3 path via ' +
        'the cookiesFile option in ytdlpOptions. See yt-dlp documentation for cookie export instructions.';
    }
    
    return jsonResponse(500, {
      error: 'Error downloading video',
      message: userFriendlyError,
      originalError: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
    });
  }
};
