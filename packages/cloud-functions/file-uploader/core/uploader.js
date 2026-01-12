import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

/**
 * Generates a pre-signed S3 URL for direct file uploads from the client.
 * 
 * Reads bucket and prefix from environment variables:
 * - FILE_UPLOADER_S3_BUCKET (required)
 * - FILE_UPLOADER_S3_PREFIX (optional)
 * 
 * @param {Object} options - Upload options
 * @param {string} options.key - S3 object key (file path)
 * @param {string} options.contentType - MIME type of the file (e.g., 'image/jpeg', 'video/mp4')
 * @param {number} [options.expiresIn] - URL expiration time in seconds (default: 3600 = 1 hour)
 * @param {string} [options.region] - AWS region (default: 'ap-south-1')
 * @returns {Promise<Object>} Object with { uploadUrl, bucket, key, contentType, expiresIn }
 */
export async function generatePresignedUploadUrl({
  key,
  contentType,
  expiresIn = 3600,
}) {
  if (!key || !contentType) {
    throw new Error('key and contentType are required');
  }

  // Get bucket from environment variable
  const bucket = process.env.FILE_UPLOADER_S3_BUCKET;
  if (!bucket) {
    throw new Error('FILE_UPLOADER_S3_BUCKET environment variable is required');
  }

  const region = process.env.FILE_UPLOADER_S3_REGION || process.env.AWS_REGION || 'us-east-1';

  const s3 = new S3Client({ region });

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,

    // 🔴 CRITICAL: disable checksum
    ChecksumAlgorithm: undefined,
  });
  
  const uploadUrl = await getSignedUrl(s3, command, {
    expiresIn,
  });

  

  return {
    uploadUrl,
    bucket,
    key,
    contentType,
    expiresIn,
  };
}

/**
 * Sanitizes a filename to be safe for S3 object keys.
 * 
 * @param {string} filename - Original filename
 * @returns {string} Sanitized filename
 */
export function sanitizeFilename(filename) {
  if (!filename) {
    return `file-${Date.now()}`;
  }

  // Replace invalid characters with dashes
  let sanitized = String(filename)
    .trim()
    .replace(/[^a-zA-Z0-9._-]/g, '-');

  // Collapse multiple consecutive dashes into a single dash
  // Using /-+/g is more efficient than /-{2,}/g as it avoids backtracking
  sanitized = sanitized.replace(/-+/g, '-');

  // Remove leading and trailing dashes (using separate patterns is more efficient)
  sanitized = sanitized.replace(/^-+/, '').replace(/-+$/, '');

  return sanitized.substring(0, 255); // S3 key length limit
}

/**
 * Builds an S3 object key with optional prefix.
 * 
 * @param {string} filename - Filename
 * @param {string} [prefix] - Optional prefix (e.g., 'uploads/videos/')
 * @param {string} [uniqueId] - Optional unique identifier to prevent collisions
 * @returns {string} S3 object key
 */
export function buildObjectKey(filename, prefix = '', uniqueId = null) {
  const sanitized = sanitizeFilename(filename);
  const normalizedPrefix = prefix && !prefix.endsWith('/') ? `${prefix}/` : prefix || '';
  const id = uniqueId || Date.now();
  
  // Extract extension if present
  const extMatch = sanitized.match(/\.([^.]+)$/);
  const extension = extMatch ? extMatch[1] : '';
  const baseName = extMatch ? sanitized.slice(0, -extMatch[0].length) : sanitized;
  
  // Add unique ID before extension to prevent collisions
  const finalName = extension 
    ? `${baseName}-${id}.${extension}`
    : `${baseName}-${id}`;
  
  return `${normalizedPrefix}${finalName}`;
}

/**
 * Determines content type from filename extension.
 * 
 * @param {string} filename - Filename with extension
 * @returns {string} MIME type or 'application/octet-stream' as fallback
 */
export function getContentTypeFromFilename(filename) {
  if (!filename) {
    return 'application/octet-stream';
  }

  const ext = filename.toLowerCase().split('.').pop();
  
  const mimeTypes = {
    // Images
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    svg: 'image/svg+xml',
    ico: 'image/x-icon',
    
    // Videos
    mp4: 'video/mp4',
    webm: 'video/webm',
    mov: 'video/quicktime',
    avi: 'video/x-msvideo',
    mkv: 'video/x-matroska',
    m4v: 'video/x-m4v',
    
    // Audio
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    ogg: 'audio/ogg',
    m4a: 'audio/mp4',
    aac: 'audio/aac',
    
    // Documents
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    
    // Text
    txt: 'text/plain',
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    json: 'application/json',
    xml: 'application/xml',
    
    // Archives
    zip: 'application/zip',
    tar: 'application/x-tar',
    gz: 'application/gzip',
  };

  return mimeTypes[ext] || 'application/octet-stream';
}
