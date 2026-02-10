# @twick/cloud-file-uploader

**Generate pre-signed S3 URLs for direct file uploads from clients to S3.**

Generate secure, time-limited pre-signed URLs that allow clients to upload files directly to S3 without going through your server. Perfect for video assets, images, and other media files used in video creation workflows.

## What Problem Does This Solve?

- **Direct client-to-S3 uploads** — Files upload directly to S3, reducing server load and Lambda costs
- **Secure uploads** — Pre-signed URLs provide time-limited, secure access to S3
- **No file size limits** — Clients upload directly to S3, bypassing Lambda payload limits
- **Cost efficient** — No data transfer through Lambda, reducing compute and transfer costs
- **Scalable** — Works with any number of concurrent uploads without server bottlenecks

## Input → Output

**Input:** File metadata
```json
{
  "filename": "my-video.mp4",
  "contentType": "video/mp4",
  "expiresIn": 3600,
  "metadata": {
    "userId": "user123",
    "projectId": "project456"
  }
}
```

**Output:** Pre-signed upload URL
```json
{
  "uploadUrl": "https://bucket.s3.amazonaws.com/uploads/my-video-1234567890.mp4?X-Amz-Algorithm=...",
  "key": "uploads/my-video-1234567890.mp4",
  "bucket": "my-bucket",
  "contentType": "video/mp4",
  "expiresAt": "2024-01-01T12:00:00.000Z",
  "expiresIn": 3600,
  "instructions": {
    "method": "PUT",
    "headers": {
      "Content-Type": "video/mp4"
    },
    "note": "Upload the file using PUT request to the uploadUrl with Content-Type header"
  }
}
```

**Where it runs:** AWS Lambda container image (Linux/AMD64)

## Installation

```bash
npm install -D @twick/cloud-file-uploader
```

## Quick Start

### 1. Scaffold AWS Lambda Template

```bash
npx twick-file-uploader init
```

This creates a `twick-file-uploader-aws` directory with:
- Dockerfile for Lambda container
- Lambda handler code
- Minimal package.json

### 2. Build Docker Image

```bash
npx twick-file-uploader build twick-file-uploader:latest
```

### 3. Configure S3 Storage

**Required environment variables:**
- `FILE_UPLOADER_S3_BUCKET` (required) — Destination S3 bucket for uploaded files

**Optional environment variables:**
- `FILE_UPLOADER_S3_PREFIX` (optional) — Key prefix to prepend before the generated object key (e.g., `"uploads/videos/"`)
- `FILE_UPLOADER_S3_REGION` (optional) — Region for the S3 client (defaults to `AWS_REGION` or `us-east-1`)
- `FILE_UPLOADER_S3_ENDPOINT` (optional) — Custom endpoint for S3-compatible storage
- `FILE_UPLOADER_S3_FORCE_PATH_STYLE` (optional) — Set to `"true"` to force path-style URLs
- `FILE_UPLOADER_DEFAULT_EXPIRES_IN` (optional) — Default expiration time in seconds (default: `3600` = 1 hour)
- `FILE_UPLOADER_MAX_FILE_SIZE` (optional) — Maximum file size in bytes (for validation)

**IAM Permissions:**
The Lambda function needs permission to generate pre-signed URLs (which requires PutObject permission):
```json
{
  "Effect": "Allow",
  "Action": [
    "s3:PutObject",
    "s3:PutObjectAcl"
  ],
  "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
}
```

**⚠️ IMPORTANT: Configure S3 Bucket CORS**

If uploading from web browsers, you **must** configure CORS on your S3 bucket. Without CORS configuration, you'll get errors like:
```
Access to XMLHttpRequest at 'https://bucket.s3.region.amazonaws.com/...' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**How to configure CORS:**

1. Go to **AWS S3 Console** → Select your bucket → **Permissions** tab → **Cross-origin resource sharing (CORS)**
2. Click **Edit** and add the following configuration:

**For Development (localhost):**
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT", "POST", "GET", "HEAD"],
    "AllowedOrigins": [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://127.0.0.1:3000"
    ],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

**For Production:**
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT", "POST", "GET", "HEAD"],
    "AllowedOrigins": [
      "https://yourdomain.com",
      "https://www.yourdomain.com"
    ],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

**For Both Development and Production:**
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT", "POST", "GET", "HEAD"],
    "AllowedOrigins": [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://yourdomain.com",
      "https://www.yourdomain.com"
    ],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

**Key Points:**
- `AllowedMethods` must include `PUT` (required for pre-signed URL uploads)
- `AllowedHeaders: ["*"]` allows all headers (including `Content-Type` which is required)
- `AllowedOrigins` must include your exact origin (protocol + domain + port)
- `ExposeHeaders: ["ETag"]` allows clients to read the ETag header from the response
- Changes may take a few seconds to propagate

### 4. Deploy to AWS Lambda

```bash
# Login to ECR
npx twick-file-uploader ecr-login us-east-1 YOUR_ACCOUNT_ID

# Push to ECR
npx twick-file-uploader push twick-file-uploader:latest us-east-1 YOUR_ACCOUNT_ID
```

Then create a Lambda function using the ECR image URI and configure the environment variables above.

## Deployment (High Level)

1. **Scaffold** the Lambda container template
2. **Build** the Docker image
3. **Configure** S3 bucket and environment variables
4. **Push** to AWS ECR (Elastic Container Registry)
5. **Create Lambda function** using the ECR image
6. **Configure** API Gateway or AppSync to expose the function

The Lambda handler expects:
- **Event format:** `{ filename, contentType?, key?, expiresIn?, maxFileSize?, metadata? }`
- **Response:** Pre-signed upload URL, key, bucket, expiration info, and upload instructions

## Programmatic Usage

Use the core uploader directly:

```js
import { generatePresignedUploadUrl, buildObjectKey } from '@twick/cloud-file-uploader';

const result = await generatePresignedUploadUrl({
  bucket: 'my-bucket',
  key: 'uploads/my-file.mp4',
  contentType: 'video/mp4',
  expiresIn: 3600, // 1 hour
  metadata: {
    userId: 'user123',
  },
});

console.log(result.uploadUrl); // Pre-signed URL for PUT request
console.log(result.expiresAt); // Expiration timestamp
```

## Client-Side Upload Example

Once you have the pre-signed URL, upload the file from your client:

### JavaScript/TypeScript

```typescript
// 1. Get pre-signed URL from your Lambda function
const response = await fetch('https://your-api.execute-api.us-east-1.amazonaws.com/upload', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    filename: 'my-video.mp4',
    contentType: 'video/mp4',
    expiresIn: 3600,
  }),
});

const { uploadUrl, contentType, instructions } = await response.json();

// 2. Upload file directly to S3 using the pre-signed URL
const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];

const uploadResponse = await fetch(uploadUrl, {
  method: 'PUT',
  headers: {
    'Content-Type': contentType,
  },
  body: file,
});

if (uploadResponse.ok) {
  console.log('File uploaded successfully!');
} else {
  console.error('Upload failed:', await uploadResponse.text());
}
```

### React Example

```tsx
import { useState } from 'react';

function FileUploader() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    try {
      // 1. Get pre-signed URL
      const presignResponse = await fetch('/api/upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      });

      const { uploadUrl, contentType } = await presignResponse.json();

      // 2. Upload to S3
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          setProgress((e.loaded / e.total) * 100);
        }
      });

      await new Promise((resolve, reject) => {
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(new Error(`Upload failed: ${xhr.statusText}`));
          }
        });

        xhr.addEventListener('error', reject);
        xhr.open('PUT', uploadUrl);
        xhr.setRequestHeader('Content-Type', contentType);
        xhr.send(file);
      });

      console.log('Upload complete!');
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file);
        }}
        disabled={uploading}
      />
      {uploading && <progress value={progress} max={100} />}
    </div>
  );
}
```

## API Reference

### Lambda Handler

**Endpoint:** Your Lambda function URL or API Gateway endpoint

**Method:** `POST`

**Request Body:**
```json
{
  "filename": "my-video.mp4",        // Required: Filename for the upload
  "contentType": "video/mp4",         // Optional: MIME type (auto-detected if not provided)
  "key": "custom/path/file.mp4",     // Optional: Custom S3 object key
  "expiresIn": 3600,                  // Optional: URL expiration in seconds (default: 3600)
  "maxFileSize": 104857600,           // Optional: Maximum file size in bytes
  "metadata": {                       // Optional: Custom metadata
    "userId": "user123",
    "projectId": "project456"
  }
}
```

**Response:**
```json
{
  "uploadUrl": "https://bucket.s3.amazonaws.com/...",
  "key": "uploads/my-video-1234567890.mp4",
  "bucket": "my-bucket",
  "contentType": "video/mp4",
  "expiresAt": "2024-01-01T12:00:00.000Z",
  "expiresIn": 3600,
  "maxFileSize": 104857600,
  "metadata": {
    "uploaded-at": "2024-01-01T11:00:00.000Z",
    "userId": "user123"
  },
  "instructions": {
    "method": "PUT",
    "headers": {
      "Content-Type": "video/mp4"
    },
    "note": "Upload the file using PUT request to the uploadUrl with Content-Type header"
  }
}
```

### Core Functions

#### `generatePresignedUploadUrl(options)`

Generates a pre-signed S3 URL for file uploads.

**Parameters:**
- `bucket` (string, required) — S3 bucket name
- `key` (string, required) — S3 object key (file path)
- `contentType` (string, required) — MIME type of the file
- `expiresIn` (number, optional) — URL expiration time in seconds (default: 3600, max: 604800 = 7 days)
- `maxFileSize` (number, optional) — Maximum file size in bytes
- `metadata` (object, optional) — Custom metadata to attach to the S3 object
- `region` (string, optional) — AWS region (default: 'us-east-1')
- `endpoint` (string, optional) — Custom S3 endpoint
- `forcePathStyle` (boolean, optional) — Force path-style URLs

**Returns:** Promise resolving to upload URL and metadata

#### `buildObjectKey(filename, prefix?, uniqueId?)`

Builds an S3 object key with optional prefix and unique ID.

**Parameters:**
- `filename` (string, required) — Filename
- `prefix` (string, optional) — Optional prefix (e.g., 'uploads/videos/')
- `uniqueId` (string|number, optional) — Optional unique identifier (default: timestamp)

**Returns:** S3 object key string

#### `sanitizeFilename(filename)`

Sanitizes a filename to be safe for S3 object keys.

**Parameters:**
- `filename` (string, required) — Original filename

**Returns:** Sanitized filename

#### `getContentTypeFromFilename(filename)`

Determines content type from filename extension.

**Parameters:**
- `filename` (string, required) — Filename with extension

**Returns:** MIME type string

## Supported File Types

The function automatically detects content types for common file formats:

- **Images:** JPEG, PNG, GIF, WebP, SVG
- **Videos:** MP4, WebM, MOV, AVI, MKV, M4V
- **Audio:** MP3, WAV, OGG, M4A, AAC
- **Documents:** PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX
- **Text:** TXT, HTML, CSS, JS, JSON, XML
- **Archives:** ZIP, TAR, GZ

If the content type cannot be determined, it defaults to `application/octet-stream`.

## Lambda Configuration Recommendations

- **Memory:** 256 MB (sufficient for URL generation)
- **Timeout:** 30 seconds (URL generation is fast)
- **Ephemeral Storage:** 512 MB (default is sufficient)
- **VPC:** Not required (unless accessing private resources)
- **Environment Variables:** Configure as described above

## Security Considerations

1. **Pre-signed URLs are time-limited** — Set appropriate expiration times based on your use case
2. **Validate file types** — Use `contentType` validation to restrict allowed file types
3. **Set file size limits** — Use `maxFileSize` to prevent abuse
4. **Use HTTPS** — Always use HTTPS for API endpoints
5. **CORS configuration** — Configure S3 bucket CORS if uploading from web browsers
6. **IAM permissions** — Follow principle of least privilege for Lambda IAM role

## S3 Bucket CORS Configuration

**⚠️ CRITICAL: CORS must be configured on your S3 bucket for browser uploads to work.**

If you're getting CORS errors when uploading from a web browser, follow these steps:

### Step-by-Step CORS Configuration

1. **Open AWS S3 Console**
   - Navigate to your S3 bucket (the one specified in `FILE_UPLOADER_S3_BUCKET`)

2. **Go to Permissions Tab**
   - Click on your bucket → **Permissions** tab → Scroll to **Cross-origin resource sharing (CORS)**

3. **Edit CORS Configuration**
   - Click **Edit** button
   - Paste the appropriate configuration (see examples below)
   - Click **Save changes**

4. **Verify Configuration**
   - Wait a few seconds for changes to propagate
   - Try uploading again from your application

### CORS Configuration Examples

**Development (Localhost):**
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT", "POST", "GET", "HEAD"],
    "AllowedOrigins": [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://127.0.0.1:3000"
    ],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

**Production:**
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT", "POST", "GET", "HEAD"],
    "AllowedOrigins": [
      "https://yourdomain.com",
      "https://www.yourdomain.com"
    ],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

**Both Development and Production:**
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT", "POST", "GET", "HEAD"],
    "AllowedOrigins": [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://yourdomain.com",
      "https://www.yourdomain.com"
    ],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

### Common CORS Errors and Solutions

**Error: "No 'Access-Control-Allow-Origin' header is present"**
- **Solution:** Add your origin to `AllowedOrigins` in the CORS configuration
- Make sure the origin matches exactly (including protocol, port, and trailing slash if present)

**Error: "Method PUT is not allowed"**
- **Solution:** Ensure `PUT` is included in `AllowedMethods` array

**Error: "Request header field Content-Type is not allowed"**
- **Solution:** Use `"AllowedHeaders": ["*"]` or explicitly include `"Content-Type"` in the array

**Error persists after configuration**
- Wait 10-30 seconds for changes to propagate
- Clear browser cache
- Check that you're editing the correct bucket
- Verify the origin URL matches exactly (case-sensitive, including protocol)

### Testing CORS Configuration

You can test if CORS is working by checking the browser's Network tab:
1. Open Developer Tools → Network tab
2. Attempt an upload
3. Check the preflight (OPTIONS) request - it should return `200 OK`
4. Check the actual PUT request - it should succeed without CORS errors

## Error Handling

The function returns appropriate HTTP status codes:

- `200` — Success
- `400` — Bad request (missing required fields)
- `500` — Server error (configuration issues, AWS errors)

Error response format:
```json
{
  "error": "Error message",
  "message": "Detailed error description",
  "hint": "Helpful hint for resolution"
}
```

## Technical Details

- **Base Image:** AWS Lambda Node.js 20 runtime
- **Platform:** Linux/AMD64 (required for Lambda)
- **AWS SDK:** @aws-sdk/client-s3 v3.620.0+
- **Pre-signed URL:** Uses AWS SDK's `getSignedUrl` with `PutObjectCommand`
- **Max Expiration:** 7 days (604800 seconds) — AWS S3 limitation

## Use Cases

- **Video asset uploads** — Upload video files for video editing workflows
- **Image uploads** — Upload images, thumbnails, or graphics
- **Audio files** — Upload background music or sound effects
- **Document uploads** — Upload scripts, captions, or other assets
- **User-generated content** — Allow users to upload their own media files

## Advanced Usage

### Custom S3 Object Keys

```js
// Use a custom key instead of auto-generated one
const result = await generatePresignedUploadUrl({
  bucket: 'my-bucket',
  key: 'projects/project-123/video.mp4',
  contentType: 'video/mp4',
});
```

### Metadata Tagging

```js
// Attach custom metadata to uploaded files
const result = await generatePresignedUploadUrl({
  bucket: 'my-bucket',
  key: 'uploads/video.mp4',
  contentType: 'video/mp4',
  metadata: {
    userId: 'user123',
    projectId: 'project456',
    uploadSource: 'web-app',
  },
});
```

### File Size Validation

```js
// Set maximum file size (for metadata/validation)
const result = await generatePresignedUploadUrl({
  bucket: 'my-bucket',
  key: 'uploads/video.mp4',
  contentType: 'video/mp4',
  maxFileSize: 100 * 1024 * 1024, // 100 MB
});
```

## Troubleshooting

### Pre-signed URL expires too quickly
- Increase `expiresIn` value (max 7 days)
- Set `FILE_UPLOADER_DEFAULT_EXPIRES_IN` environment variable

### Upload fails with 403 Forbidden
- **Check S3 bucket CORS configuration** — Most common issue! See CORS configuration section above
- Verify IAM permissions for PutObject
- Ensure pre-signed URL hasn't expired
- Check that the bucket name in environment variable matches the actual bucket

### CORS errors when uploading from browser
- **Configure CORS on S3 bucket** — See detailed CORS configuration section above
- Ensure your origin (e.g., `http://localhost:3000`) is in `AllowedOrigins`
- Verify `PUT` method is in `AllowedMethods`
- Check that `AllowedHeaders` includes `*` or `Content-Type`
- Wait 10-30 seconds after saving CORS configuration for changes to propagate

### Content type mismatch
- Always set `Content-Type` header when uploading
- Use the `contentType` value from the response

### File size limits
- S3 supports files up to 5TB
- Lambda has no file size limits (files upload directly to S3)
- Set `maxFileSize` for validation purposes only

For detailed setup instructions, see the complete deployment guide in the repository.
