## @twick/cloud-subtitle-video

Cloud-function package for generating subtitle video projects from video URLs using **Google Cloud Speech-to-Text API**. Transcribes video audio, creates subtitle tracks with precise word-level timings, and optionally exports project JSONs to Google Cloud Storage.

### Install

```bash
npm install -D @twick/cloud-subtitle-video
```

### CLI

```bash
npx twick-subtitle-video help
```

Commands:

- `init [dir]`: Scaffold AWS container template (Dockerfile + handler) into `[dir]` (default `./twick-subtitle-video-aws`). Also writes a minimal `package.json` that depends on this package.
- `build <image> [dir]`: Build a Docker image from `[dir]` (default `./twick-subtitle-video-aws`).
- `ecr-login <region> <accountId>`: Log in Docker to your AWS ECR registry.
- `push <image> <region> <accountId>`: Tag and push the image to ECR. The repository must already exist.

### Typical flow

```bash
# 1) Scaffold
npx twick-subtitle-video init

# 2) Build an image
npx twick-subtitle-video build twick-subtitle-video:latest

# 3) Login to ECR
npx twick-subtitle-video ecr-login us-east-1 123456789012

# 4) Push (assumes an ECR repo named `twick-subtitle-video` exists)
npx twick-subtitle-video push twick-subtitle-video:latest us-east-1 123456789012
```

### AWS Lambda (container) usage

This package ships with an AWS Lambda container template (Dockerfile + handler).

#### 1) Build image

In the `packages/cloud-functions/subtitle-video` directory:

```bash
docker buildx build --platform linux/amd64 -t twick-subtitle-video:latest -f platform/aws/Dockerfile .
```

#### 2) Push image to AWS ECR

To deploy the container image to AWS Elastic Container Registry (ECR) for use with Lambda:

**Prerequisites:**
- AWS CLI configured with appropriate credentials
- Docker installed and running

**Steps:**

1. **Get your AWS Account ID:**
   ```bash
   AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
   ```

2. **Set your AWS region and repository name:**
   ```bash
   AWS_REGION="your-aws-region"  # e.g., ap-south-1, us-east-1
   REPOSITORY_NAME="twick-subtitle-video"
   ```

3. **Login to ECR:**
   ```bash
   aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
   ```

4. **Create ECR repository (if it doesn't exist):**
   ```bash
   aws ecr create-repository \
     --repository-name $REPOSITORY_NAME \
     --image-scanning-configuration scanOnPush=true \
     --region $AWS_REGION
   ```

5. **Tag the image:**
   ```bash
   docker tag twick-subtitle-video:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPOSITORY_NAME:latest
   ```

6. **Push the image:**
   ```bash
   docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPOSITORY_NAME:latest
   ```

**Complete example script:**
```bash
#!/bin/bash
AWS_REGION="ap-south-1"
REPOSITORY_NAME="twick-subtitle-video"
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Build the image
docker buildx build --platform linux/amd64 -t twick-subtitle-video:latest -f platform/aws/Dockerfile .

# Login to ECR
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Create repository if it doesn't exist
aws ecr create-repository --repository-name $REPOSITORY_NAME --image-scanning-configuration scanOnPush=true --region $AWS_REGION 2>/dev/null || true

# Tag and push
docker tag twick-subtitle-video:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPOSITORY_NAME:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPOSITORY_NAME:latest
```

After pushing, you can use the ECR image URI (`$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPOSITORY_NAME:latest`) when creating or updating your Lambda function.

#### 3) Configure Environment Variables and Secrets

The Docker container requires the following environment variables and secrets to run properly with Google Cloud Speech-to-Text and Cloud Storage services.

##### Docker Environment Variables Summary

**Required:**
- `GOOGLE_CLOUD_PROJECT` - Your Google Cloud project ID (must have Speech-to-Text API enabled)

**Optional:**
- `GOOGLE_CLOUD_STORAGE_BUCKET` - GCS bucket for audio files and exports (default: `"twick-video"`)
- `AWS_REGION` - AWS region for Secrets Manager (default: `"ap-south-1"`)

**Credentials (choose one method):**

**Method 1: AWS Secrets Manager (Recommended for Lambda)**
- `GCP_SERVICE_ACCOUNT_SECRET_NAME` - Name of the AWS Secrets Manager secret containing GCP service account JSON

**Method 2: File-based credentials (Alternative)**
- `GOOGLE_APPLICATION_CREDENTIALS` - Path to mounted service account JSON file (e.g., `/var/secrets/gcp-key.json`)

##### Complete Docker Deployment Setup

**Required Environment Variables:**

- `GOOGLE_CLOUD_PROJECT` (required): Your Google Cloud project ID where Speech-to-Text API is enabled
- `GOOGLE_CLOUD_STORAGE_BUCKET` (optional): GCS bucket name for storing audio files and project exports (defaults to `"twick-video"`)

**AWS Lambda with Secrets Manager (recommended):**

- `GCP_SERVICE_ACCOUNT_SECRET_NAME` (required): Name of the AWS Secrets Manager secret containing the Google Cloud service account JSON key
- `AWS_REGION` (optional): AWS region for Secrets Manager API calls (defaults to `"ap-south-1"`)

The handler automatically fetches the service account JSON from AWS Secrets Manager and uses it to authenticate with Google Cloud APIs (Speech-to-Text and Cloud Storage).

**Alternative: File-based Credentials**

If not using AWS Secrets Manager, you can mount a JSON service account key file in the container:

- `GOOGLE_APPLICATION_CREDENTIALS`: Path to the mounted service account JSON file in the container

**Example Docker run with file-based credentials:**

```bash
docker run \
  -e GOOGLE_APPLICATION_CREDENTIALS=/var/secrets/gcp-key.json \
  -e GOOGLE_CLOUD_PROJECT=my-gcp-project-id \
  -e GOOGLE_CLOUD_STORAGE_BUCKET=my-gcs-bucket \
  -v /host/path/gcp-key.json:/var/secrets/gcp-key.json:ro \
  twick-subtitle-video:latest
```

**Example AWS Lambda Environment Variables:**

```json
{
  "GOOGLE_CLOUD_PROJECT": "my-gcp-project-id",
  "GOOGLE_CLOUD_STORAGE_BUCKET": "my-gcs-bucket",
  "GCP_SERVICE_ACCOUNT_SECRET_NAME": "gcp-service-account-key",
  "AWS_REGION": "ap-south-1"
}
```

**Required Google Cloud Service Account Permissions:**

The service account must have the following IAM roles/permissions:
- `roles/speech.client` or `speech.batchRecognize` - For Speech-to-Text API access
- `roles/storage.objectCreator` - For uploading audio files and project JSONs to GCS
- `roles/storage.objectViewer` - For reading files from GCS (when using GCS URIs)

**Setting up the AWS Secrets Manager Secret:**

1. Create a service account in Google Cloud Console with the required permissions
2. Download the JSON key file
3. Create a secret in AWS Secrets Manager:

```bash
aws secretsmanager create-secret \
  --name gcp-service-account-key \
  --description "Google Cloud service account key for Speech-to-Text" \
  --secret-string file://gcp-key.json \
  --region ap-south-1
```

4. Ensure your Lambda execution role has `secretsmanager:GetSecretValue` permission for this secret

**Complete Docker Run Example (with file-based credentials):**

```bash
docker run \
  -e GOOGLE_CLOUD_PROJECT="my-gcp-project-id" \
  -e GOOGLE_CLOUD_STORAGE_BUCKET="my-gcs-bucket" \
  -e GOOGLE_APPLICATION_CREDENTIALS="/var/secrets/gcp-key.json" \
  -v /path/to/local/gcp-key.json:/var/secrets/gcp-key.json:ro \
  -p 9000:8080 \
  twick-subtitle-video:latest
```

**Complete Docker Run Example (with AWS Secrets Manager):**

```bash
docker run \
  -e GOOGLE_CLOUD_PROJECT="my-gcp-project-id" \
  -e GOOGLE_CLOUD_STORAGE_BUCKET="my-gcs-bucket" \
  -e GCP_SERVICE_ACCOUNT_SECRET_NAME="gcp-service-account-key" \
  -e AWS_REGION="ap-south-1" \
  -e AWS_ACCESS_KEY_ID="your-access-key" \
  -e AWS_SECRET_ACCESS_KEY="your-secret-key" \
  -p 9000:8080 \
  twick-subtitle-video:latest
```

**Pre-flight Checklist:**

Before running the Docker container, ensure:

1. ✅ Google Cloud Project has Speech-to-Text API enabled
2. ✅ Service account exists with required IAM roles:
   - `roles/speech.client` or `speech.batchRecognize`
   - `roles/storage.objectCreator`
   - `roles/storage.objectViewer`
3. ✅ GCS bucket exists (if using custom bucket name)
4. ✅ If using AWS Secrets Manager:
   - Secret exists in AWS Secrets Manager
   - Lambda/container has AWS credentials configured
   - IAM permissions include `secretsmanager:GetSecretValue`
5. ✅ If using file-based credentials:
   - Service account JSON file is accessible
   - File is mounted correctly in the container

#### 4) Lambda handler

The Lambda entrypoint is:

```text
platform/aws/handler.handler
```

Expected payload (e.g. from AppSync / API Gateway):

```json
{
  "videoUrl": "https://example.com/video.mp4",
  "videoSize": { "width": 1920, "height": 1080 },
  "language": "english",
  "languageFont": "english",
  "shouldExport": false
}
```

**Parameters:**
- `videoUrl` (required): Publicly reachable HTTP(S) URL to the video file
- `videoSize` (optional): Video dimensions object with `width` and `height` (defaults to `{ "width": 720, "height": 1280 }`)
- `language` (optional): Target transcription language (default: `"english"`)
- `languageFont` (optional): Target font/script for subtitles (default: `"english"`)
- `shouldExport` (optional): If `true`, exports the project JSON to S3 and returns the S3 URL (default: `false`)

**Note:** 
- The function downloads the video from the URL, so it must be publicly accessible via HTTP(S)
- For long audio files (>6 seconds), the audio is automatically uploaded to Google Cloud Storage for batch transcription
- The function uses Google Cloud Speech-to-Text API v2 with word-level timing for precise subtitle placement

#### Response

On success, the function returns a subtitle video project JSON:

**When `shouldExport` is `false` (default):**

```json
{
  "properties": {
    "width": 1920,
    "height": 1080
  },
  "tracks": [
    {
      "id": "video",
      "type": "video",
      "elements": [
        {
          "id": "video",
          "type": "video",
          "s": 0,
          "e": 120.5,
          "props": {
            "src": "https://example.com/video.mp4",
            "width": 1920,
            "height": 1080
          }
        }
      ]
    },
    {
      "id": "subtitle",
      "type": "caption",
      "elements": [
        {
          "id": "subtitle-0",
          "s": 0,
          "e": 1.5,
          "t": "Example phrase 1"
        },
        {
          "id": "subtitle-1",
          "s": 1.5,
          "e": 2.8,
          "t": "Another short example"
        }
      ]
    }
  ],
  "version": 1
}
```

**When `shouldExport` is `true`:**

```json
{
  "statusCode": 200,
  "headers": {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  },
  "body": "{\"url\":\"https://storage.googleapis.com/bucket/projects/project-1234567890.json\"}"
}
```

**Response fields:**
- `properties`: Project properties with video dimensions
- `tracks`: Array of tracks including:
  - `video` track: Contains the video element with source URL and dimensions
  - `subtitle` track: Contains caption elements with:
    - `id`: Unique identifier for each subtitle
    - `s`: Start timestamp in seconds (converted from milliseconds)
    - `e`: End timestamp in seconds (converted from milliseconds)
    - `t`: Caption text (max 4 words per segment)
- `version`: Project version number

**Note:** 
- Subtitles are automatically segmented into phrases with a maximum of 4 words each
- Precise word-level timestamps are provided by Google Speech-to-Text API
- Segments are non-overlapping and maintain chronological order
- Long audio files (>6 seconds) use asynchronous batch recognition for better accuracy

On error, a JSON error payload is returned:

```json
{
  "error": "Internal server error",
  "message": "Detailed error message ..."
}
```

### Programmatic usage

The core functions can be used directly:

**Create a subtitle video project:**

```js
import { createSubtitleProject } from '@twick/cloud-subtitle-video';

const project = await createSubtitleProject({
  videoUrl: 'https://example.com/video.mp4',
  videoSize: { width: 1920, height: 1080 },
  language: 'english',
  languageFont: 'english',
});

console.log(project.tracks); // Array of video and subtitle tracks
```

**Transcribe audio only (short audio < 6 seconds):**

```js
import { transcribeShort } from '@twick/cloud-subtitle-video/core/transcriber.js';
import { extractAudioBufferFromVideo } from '@twick/cloud-subtitle-video/core/audio.utils.js';

const { audioBuffer } = await extractAudioBufferFromVideo('https://example.com/video.mp4');
const subtitles = await transcribeShort({
  audioBuffer,
  language: 'english',
  format: 'FLAC',
});

console.log(subtitles); // Array of {t, s, e, w} objects with word timings
```

**Transcribe long audio (> 6 seconds):**

```js
import { transcribeLong } from '@twick/cloud-subtitle-video/core/transcriber.js';
import { extractAudioBufferFromVideo } from '@twick/cloud-subtitle-video/core/audio.utils.js';

const { audioBuffer } = await extractAudioBufferFromVideo('https://example.com/video.mp4');
const subtitles = await transcribeLong({
  audioBuffer,
  language: 'english',
  format: 'FLAC',
});

console.log(subtitles); // Array of {t, s, e, w} objects with word timings
```

### Exporting projects

The package includes `exportProject` (from `core/workflow.js`), which uploads a project JSON to Google Cloud Storage and returns a signed URL valid for 1 hour. The project is uploaded to the `projects/` folder in your configured GCS bucket.

**Environment variables:**
- `GOOGLE_CLOUD_STORAGE_BUCKET` (optional): GCS bucket name for exported project JSON (defaults to `"twick-video"`)
- `GOOGLE_CLOUD_PROJECT` (required): Google Cloud project ID

**Example usage:**

```js
import { createSubtitleProject, exportProject } from '@twick/cloud-subtitle-video';

const projectData = await createSubtitleProject({
  videoUrl: 'https://example.com/video.mp4',
  videoSize: { width: 1920, height: 1080 },
  language: 'english',
  languageFont: 'english',
});

const signedUrl = await exportProject(projectData);
console.log(signedUrl); // "https://storage.googleapis.com/bucket/projects/project-<timestamp>.json?X-Goog-Signature=..."
```

`exportProject` throws if the upload to GCS fails; otherwise it returns a signed URL string that can be used to access the project JSON for 1 hour.

### Google Speech-to-Text Configuration

The package uses Google Cloud Speech-to-Text API v2 with the following configuration:

- **Model**: `"long"` - Optimized for longer audio files with better accuracy
- **Language**: Supports English (`"en-US"`) by default
- **Audio Format**: FLAC format at 16kHz sample rate, mono channel
- **Features**: Word-level timing offsets enabled for precise subtitle placement

The API automatically chooses between synchronous recognition (for short audio) and asynchronous batch recognition (for long audio) based on audio duration.

### Testing

`npm test` executes every `test/*.test.js` file in this package, covering both the transcription helpers and the new export helper suite.


