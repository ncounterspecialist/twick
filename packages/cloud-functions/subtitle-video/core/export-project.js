import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.EXPORT_PROJECT_S3_REGION || process.env.AWS_REGION || 'us-east-1',
  endpoint: process.env.EXPORT_PROJECT_S3_ENDPOINT || undefined,
  forcePathStyle: process.env.EXPORT_PROJECT_S3_FORCE_PATH_STYLE === 'true',
});

// Throw if a required environment variable is missing.
const ensureEnvVar = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

// Normalize a project identifier to a safe key fragment.
export const sanitizeIdentifier = (value) => {
  if (!value) {
    return 'twick-project';
  }
  let sanitized = String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/-{2,}/g, '-');

  let start = 0;
  while (start < sanitized.length && sanitized[start] === '-') {
    start++;
  }
  let end = sanitized.length;
  while (end > start && sanitized[end - 1] === '-') {
    end--;
  }

  const result = sanitized.slice(start, end);
  return result || 'twick-project';
};

// Generate a unique, human-readable filename for the exported JSON.
export const buildObjectKey = (projectData, uniqueSuffix) => {
  const projectIdentifier =
    projectData?.properties?.id ??
    projectData?.id ??
    projectData?.project?.properties?.id ??
    projectData?.project?.id;

  const suffix = uniqueSuffix ?? Date.now();
  return `${sanitizeIdentifier(projectIdentifier)}-${suffix}.json`;
};

// Encode each S3 key segment to keep special characters safe in URLs.
const encodeS3Key = (key) =>
  key
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');

// Build a public URL using either a custom base or the standard S3 hostname.
export const buildPublicUrl = ({ bucket, key, region, baseUrl }) => {
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

export const exportProject = async (projectData) => {
  try {
    if (!projectData) {
      throw new Error('Missing required field: project');
    }

    const payload = JSON.stringify(projectData);
    const payloadSize = Buffer.byteLength(payload, 'utf-8');

    // Use a consistent payload and accurate byte length for headers/metadata.
    const fileMetadata = {
      bucket: ensureEnvVar('EXPORT_PROJECT_S3_BUCKET'),
      key: buildObjectKey(projectData, Date.now()),
      region: ensureEnvVar('EXPORT_PROJECT_S3_REGION'),
      contentType: 'application/json',
      contentLength: payloadSize,
      size: payloadSize,
    };

    console.log('Uploading rendered project to S3...', fileMetadata);

    try {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: fileMetadata.bucket,
          Key: fileMetadata.key,
          Body: payload,
          ContentType: fileMetadata.contentType,
          ContentLength: fileMetadata.contentLength,
          Metadata: {
            'project-id': fileMetadata.key,
          },
        })
      );
      console.log('Project uploaded to S3 successfully');
    } catch (uploadError) {
      console.error('Project upload failed:', uploadError);
      throw new Error('Failed to upload project');
    }

    const filePath = buildPublicUrl(fileMetadata);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ url: filePath }),
    };
  } catch (error) {
    console.error('Error exporting project:', error);
    throw new Error('Failed to export project');
  }
};
