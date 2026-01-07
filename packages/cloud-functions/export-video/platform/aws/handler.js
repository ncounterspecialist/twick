import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { renderTwickVideo } from '@twick/cloud-export-video';

const s3Client = new S3Client({
  region: process.env.EXPORT_VIDEO_S3_REGION || process.env.AWS_REGION || 'us-east-1',
  endpoint: process.env.EXPORT_VIDEO_S3_ENDPOINT || undefined,
  forcePathStyle: process.env.EXPORT_VIDEO_S3_FORCE_PATH_STYLE === 'true',
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

const sanitizeIdentifier = (value) => {
  if (!value) {
    return 'twick-video';
  }

  let sanitized = String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/-{2,}/g, '-');
  
  // Remove leading and trailing dashes using string methods (avoids ReDoS)
  // Find first non-dash character
  let start = 0;
  while (start < sanitized.length && sanitized[start] === '-') {
    start++;
  }
  // Find last non-dash character
  let end = sanitized.length;
  while (end > start && sanitized[end - 1] === '-') {
    end--;
  }
  
  return sanitized.slice(start, end);
};

const buildObjectKey = (projectData, uniqueSuffix) => {
  const projectIdentifier =
    projectData?.properties?.id ??
    projectData?.id ??
    projectData?.project?.properties?.id;

  const baseName = sanitizeIdentifier(projectIdentifier);
  const suffix = uniqueSuffix ?? Date.now();

  return `${baseName}-${suffix}.mp4`;
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
 * Handler for processing video project data with files
 *
 * Expected JSON payload:
 * {
 *   "project": { ... }, // Video project JSON object
 *   "mediaFiles": [     // Optional array of base64-encoded files
 *     {
 *       "filename": "video.mp4",
 *       "contentType": "video/mp4", 
 *       "data": "base64-encoded-content"
 *     }
 *   ]
 * }
 * 
 * Environment variables:
 * - EXPORT_VIDEO_S3_BUCKET (required): Destination S3 bucket for rendered videos
 * - EXPORT_VIDEO_S3_PREFIX (optional): Key prefix to prepend before the generated object key
 * - EXPORT_VIDEO_S3_REGION (optional): Region for the S3 client (defaults to AWS_REGION or us-east-1)
 * - EXPORT_VIDEO_PUBLIC_BASE_URL (optional): Custom base URL for returned video links
 * - EXPORT_VIDEO_S3_ENDPOINT (optional): Custom endpoint for S3-compatible storage
 * - EXPORT_VIDEO_S3_FORCE_PATH_STYLE (optional): Set to "true" to force path-style URLs
 * 
 * Returns: JSON payload containing the uploaded video URL and metadata
 */

const handler = async (event) => {
  console.log('Video processor function invoked');
  console.log('Event:', JSON.stringify(event));
  const projectData = event.arguments || {};
  
  if(!renderTwickVideo) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Failed to load renderTwickVideo',
        message: 'Failed to load renderTwickVideo',
      }),
    };
  }
  
  try {
    // Validate required fields
    if (!projectData) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: 'Missing required field: project',
          expectedFormat: {
            project: 'Video project JSON object',
            mediaFiles: 'Optional array of base64-encoded files'
          }
        }),
      };
    }

    const mediaFiles = projectData.mediaFiles || [];
    
    // Log each media file
    mediaFiles.forEach((file, index) => {
      console.log(`Media file ${index + 1}:`, {
        filename: file.filename,
        contentType: file.contentType,
        size: file.data ? Buffer.from(file.data, 'base64').length : 0
      });
    });

    // Render the video using Twick renderer
    console.log('Starting video rendering...' );
    
    const fs = await import('fs');
    let renderedVideoPath;
    let videoBuffer;
    
    try {
      // Render the video
      renderedVideoPath = await renderTwickVideo(projectData, {
        outFile: `video-${projectData.input?.properties?.requestId || `video-${Date.now()}`}.mp4`,
      });

      // Read the rendered video file
      videoBuffer = fs.readFileSync(renderedVideoPath);

      console.log('Video rendered successfully:', renderedVideoPath);
      console.log('Video size:', videoBuffer.length, 'bytes');
    } catch (renderError) {
      console.error('Video rendering failed:', renderError);
      
      // Fallback to text file if rendering fails
      const errorText = `Video Processing Error
======================
Request ID: ${projectData.input?.properties?.requestId || `video-${Date.now()}`}
Timestamp: ${new Date().toISOString()}
Status: Rendering Failed

Error: ${renderError instanceof Error ? renderError.message : 'Unknown error'}

Media Files Received: ${mediaFiles.length}
${mediaFiles.map((file, index) => `  ${index + 1}. ${file.filename} (${file.data ? Buffer.from(file.data, 'base64').length : 0} bytes)`).join('\n')}
`;

      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'text/plain',
          'Content-Disposition': 'attachment; filename="error.txt"',
          'Access-Control-Allow-Origin': '*',
        },
        body: errorText,
      };
    }

    const bucket = ensureEnvVar('EXPORT_VIDEO_S3_BUCKET');
    const prefix = normalizePrefix(process.env.EXPORT_VIDEO_S3_PREFIX || '');
    const region = process.env.EXPORT_VIDEO_S3_REGION || process.env.AWS_REGION || 'us-east-1';
    const baseUrl = process.env.EXPORT_VIDEO_PUBLIC_BASE_URL;
    const uniqueSuffix = Date.now();
    const objectKey = `${prefix}${buildObjectKey(projectData, uniqueSuffix)}`;

    console.log('Uploading rendered video to S3...', {
      bucket,
      key: objectKey,
      region,
      size: videoBuffer.length,
      baseUrl: baseUrl ? '[redacted]' : undefined,
    });

    try {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: objectKey,
          Body: videoBuffer,
          ContentType: 'video/mp4',
          ContentLength: videoBuffer.length,
          Metadata: {
            'project-id': String(
              projectData?.input?.properties?.requestId ??
                projectData?.input?.properties?.requestId ??
                `video-${Date.now()}`
            ),
          },
        })
      );
      console.log('Video uploaded to S3 successfully');
    } catch (uploadError) {
      console.error('Video upload failed:', uploadError);

      try {
        if (renderedVideoPath) {
          fs.unlinkSync(renderedVideoPath);
        }
      } catch (cleanupError) {
        console.warn('Failed to clean up temporary file after upload failure:', cleanupError);
      }

      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
        },
        body: JSON.stringify({
          error: 'Failed to upload rendered video',
          message: uploadError instanceof Error ? uploadError.message : 'Unknown error',
        }),
      };
    }

    try {
      if (renderedVideoPath) {
        fs.unlinkSync(renderedVideoPath);
        console.log('Temporary video file cleaned up');
      }
    } catch (cleanupError) {
      console.warn('Failed to clean up temporary file:', cleanupError);
    }

    const videoUrl = buildPublicUrl({ bucket, key: objectKey, region, baseUrl });
    console.log('Video available at URL:', videoUrl);

    // Return the video file metadata with URL
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({
        url: videoUrl,
        bucket,
        key: objectKey,
        size: videoBuffer.length,
        contentType: 'video/mp4',
      }),
    };
  } catch (error) {
    console.error('Error processing video project:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};

export { handler };