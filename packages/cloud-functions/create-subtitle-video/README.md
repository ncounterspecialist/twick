## @twick/cloud-subtitle-video

Cloud-function package for generating subtitle video projects from video URLs using **Google GenAI (Vertex AI)**. Transcribes video audio, creates subtitle tracks, and optionally exports project JSONs to S3.

### Install

```bash
npm install -D @twick/cloud-subtitle-video
```

### AWS Lambda (container) usage

This package ships with an AWS Lambda container template (Dockerfile + handler).

#### 1) Build image

In the `packages/cloud-functions/create-subtitle-video` directory:

```bash
docker build -t twick-cloud-subtitle-video -f platform/aws/Dockerfile .
```

#### 2) Provide Google Cloud credentials

**Required environment variables:**
- `GOOGLE_CLOUD_PROJECT` (required): Your Google Cloud project ID
- `GOOGLE_CLOUD_LOCATION` (optional): Vertex AI location (defaults to `"global"`)

**AWS Lambda with Secrets Manager (recommended):**
- `GCP_SERVICE_ACCOUNT_SECRET_NAME`: Name of the AWS Secrets Manager secret containing the Google Cloud service account JSON
- `AWS_REGION` (optional): AWS region for Secrets Manager (defaults to `"ap-south-1"`)

The handler will automatically fetch the service account JSON from AWS Secrets Manager, write it to `/tmp/gcp-sa-key.json`, and set `GOOGLE_APPLICATION_CREDENTIALS` to point to that file.

**Alternative: File path**
- Mount a JSON service account key file in the container and point `GOOGLE_APPLICATION_CREDENTIALS` to it:

```bash
docker run \
  -e GOOGLE_APPLICATION_CREDENTIALS=/var/secrets/gcp-key.json \
  -e GOOGLE_CLOUD_PROJECT=my-gcp-project-id \
  -e GOOGLE_CLOUD_LOCATION=us-central1 \
  -v /host/path/gcp-key.json:/var/secrets/gcp-key.json:ro \
  twick-cloud-subtitle-video
```

#### 3) Lambda handler

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

**Note:** The function downloads the video from the URL, so it must be publicly accessible. Google Cloud Storage URIs (`gs://`) are not directly supported; use a signed URL or public URL instead.

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
  "body": "{\"url\":\"https://bucket.s3.amazonaws.com/twick-project-1234567890.json\"}"
}
```

**Response fields:**
- `properties`: Project properties with video dimensions
- `tracks`: Array of tracks including:
  - `video` track: Contains the video element with source URL and dimensions
  - `subtitle` track: Contains caption elements with:
    - `id`: Unique identifier for each subtitle
    - `s`: Start timestamp in seconds
    - `e`: End timestamp in seconds
    - `t`: Caption text (max 4 words per segment)
- `version`: Project version number

**Note:** Subtitles are automatically segmented into phrases with a maximum of 4 words each, with precise timestamps and non-overlapping segments.

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
import { createProject } from '@twick/cloud-subtitle-video/core/create-project.js';

const project = await createProject({
  videoUrl: 'https://example.com/video.mp4',
  videoSize: { width: 1920, height: 1080 },
  language: 'english',
  languageFont: 'english',
});

console.log(project.tracks); // Array of video and subtitle tracks
```

**Transcribe audio only:**

```js
import { transcribeAudioUrl } from '@twick/cloud-subtitle-video/core/transcriber.js';

const result = await transcribeAudioUrl({
  audioUrl: 'https://example.com/video.mp4',
  language: 'english',
  languageFont: 'english',
});

console.log(result.subtitles); // Array of {t, s, e} objects
```

### Exporting projects

The package includes `exportProject` (from `core/export-project.js`), which uploads a project JSON to S3 and returns a public URL. It validates the required bucket/region configuration and adds useful CORS headers so the response can be used directly in browsers or lambdas.

**Environment variables:**
- `EXPORT_PROJECT_S3_BUCKET` (required): Destination bucket for exported project JSON
- `EXPORT_PROJECT_S3_REGION` (required): S3 region used to construct the client (falls back to `AWS_REGION` or `us-east-1`)
- `EXPORT_PROJECT_S3_ENDPOINT` (optional): Custom S3-compatible endpoint
- `EXPORT_PROJECT_S3_FORCE_PATH_STYLE` (optional): Set to `"true"` to enforce path-style addressing
- `EXPORT_PROJECT_PUBLIC_BASE_URL` (optional): Override the public URL that the helper returns

**Example usage:**

```js
import { createProject } from '@twick/cloud-subtitle-video/core/create-project.js';
import { exportProject } from '@twick/cloud-subtitle-video/core/export-project.js';

const projectData = await createProject({
  videoUrl: 'https://example.com/video.mp4',
  videoSize: { width: 1920, height: 1080 },
  language: 'english',
  languageFont: 'english',
});

const response = await exportProject(projectData);
const body = JSON.parse(response.body);
console.log(body.url); // "https://bucket.s3.amazonaws.com/twick-project-<timestamp>.json"
```

`exportProject` throws if mandatory fields are missing or if the upload fails; otherwise it resolves with a 200-style response containing the `url` in the JSON body.

### Model configuration

You can configure the Gemini model via environment variable:

- `GOOGLE_VERTEX_MODEL` (optional): Model name (default: `"gemini-2.5-flash-lite"`)

Example:

```bash
export GOOGLE_VERTEX_MODEL="gemini-2.0-flash-lite-001"
```

### Testing

`npm test` executes every `test/*.test.js` file in this package, covering both the transcription helpers and the new export helper suite.


