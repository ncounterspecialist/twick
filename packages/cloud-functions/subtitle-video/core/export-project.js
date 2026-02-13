/**
 * Sanitizes a project identifier for use in object keys and URLs.
 * Replaces special characters with hyphens, lowercases, and trims.
 *
 * @param {string|null|undefined} value - Raw identifier
 * @returns {string} Sanitized identifier, or 'twick-project' if value is missing
 */
export function sanitizeIdentifier(value) {
  if (value === undefined || value === null) {
    return 'twick-project';
  }
  const str = String(value).trim();
  if (!str) return 'twick-project';
  const normalized = str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return normalized || 'twick-project';
}

/**
 * Builds an S3 object key for a project JSON file.
 *
 * @param {Object} projectData - Project object (may have project.properties.id, properties.id, or id)
 * @param {number|string} [uniqueSuffix] - Optional suffix (e.g. year or timestamp)
 * @returns {string} Object key like "project-id-2025.json"
 */
export function buildObjectKey(projectData, uniqueSuffix) {
  const identifier =
    projectData?.project?.properties?.id ??
    projectData?.properties?.id ??
    projectData?.id;
  const baseName = sanitizeIdentifier(identifier);
  const suffix = uniqueSuffix ?? Date.now();
  return `${baseName}-${suffix}.json`;
}

/**
 * Encodes S3 key segments for URL usage.
 * @param {string} key - Object key (may contain path segments)
 * @returns {string} Encoded key
 */
function encodeS3Key(key) {
  return key
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}

/**
 * Builds a public URL for an S3 object.
 *
 * @param {Object} params - URL parameters
 * @param {string} params.bucket - S3 bucket name
 * @param {string} params.key - Object key
 * @param {string} [params.region] - AWS region (e.g. us-east-1, us-west-2)
 * @param {string} [params.baseUrl] - Custom base URL (trims trailing slash)
 * @returns {string} Public URL to the object
 */
export function buildPublicUrl({ bucket, key, region, baseUrl }) {
  if (baseUrl) {
    const trimmedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    return `${trimmedBase}/${encodeS3Key(key)}`;
  }

  const encodedKey = encodeS3Key(key);

  if (!region || region === 'us-east-1') {
    return `https://${bucket}.s3.amazonaws.com/${encodedKey}`;
  }

  return `https://${bucket}.s3.${region}.amazonaws.com/${encodedKey}`;
}
