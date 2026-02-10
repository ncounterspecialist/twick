# @twick/cloud-caption-video

**Generate complete caption video projects from video URLs using Google Cloud Speech-to-Text.**

Automatically transcribes video audio, creates timed caption tracks, and optionally exports project JSONs to Google Cloud Storage. Perfect for programmatic caption generation at scale.

## What Problem Does This Solve?

- **Automated caption generation** — Convert video URLs into complete Twick projects with timed captions
- **Word-level timing** — Precise caption placement using Google Speech-to-Text API
- **Serverless processing** — Deploy as AWS Lambda for automatic scaling
- **Multi-language support** — Generate captions in multiple languages and fonts

## Input → Output

**Input:** Video URL + optional configuration
```json
{
  "videoUrl": "https://example.com/video.mp4",
  "videoSize": { "width": 1920, "height": 1080 },
  "language": "english",
  "languageFont": "english",
  "shouldExport": false
}
```

**Output:** Complete Twick project JSON with video track + caption track
```json
{
  "properties": { "width": 1920, "height": 1080 },
  "tracks": [
    { "id": "video", "type": "video", "elements": [...] },
    { "id": "caption", "type": "caption", "elements": [...] }
  ],
  "version": 1
}
```

**Where it runs:** AWS Lambda container image (Linux/AMD64)

## Installation

```bash
npm install -D @twick/cloud-caption-video
```

## Quick Start

### 1. Scaffold AWS Lambda Template

```bash
npx twick-caption-video init
```

### 2. Build Docker Image

```bash
npx twick-caption-video build twick-caption-video:latest
```

### 3. Configure Google Cloud

**Required:**
- Google Cloud project with Speech-to-Text API enabled
- Service account with permissions:
  - `roles/speech.client` (or `speech.batchRecognize`)
  - `roles/storage.objectCreator`
  - `roles/storage.objectViewer`

**Environment variables:**
- `GOOGLE_CLOUD_PROJECT` (required) — Your GCP project ID
- `GOOGLE_CLOUD_STORAGE_BUCKET` (optional) — GCS bucket for exports (default: `"twick-video"`)

**Credentials (choose one):**
- **AWS Secrets Manager** (recommended for Lambda):
  - `GCP_SERVICE_ACCOUNT_SECRET_NAME` — Secret name containing GCP service account JSON
  - `AWS_REGION` (optional) — Region for Secrets Manager (default: `"ap-south-1"`)
- **File-based** (alternative):
  - `GOOGLE_APPLICATION_CREDENTIALS` — Path to service account JSON file

### 4. Deploy to AWS Lambda

```bash
# Login to ECR
npx twick-caption-video ecr-login us-east-1 YOUR_ACCOUNT_ID

# Push to ECR
npx twick-caption-video push twick-caption-video:latest us-east-1 YOUR_ACCOUNT_ID
```

## Deployment (High Level)

1. **Scaffold** the Lambda container template
2. **Configure** Google Cloud credentials (via Secrets Manager or file mount)
3. **Set environment variables** (GCP project, bucket, etc.)
4. **Build and push** Docker image to ECR
5. **Create Lambda function** using the ECR image

The Lambda handler expects:
- **Event format:** `{ videoUrl, videoSize?, language?, languageFont?, shouldExport? }`
- **Response:** Twick project JSON (or GCS URL if `shouldExport: true`)

## Programmatic Usage

Use the core functions directly:

```js
import { createCaptionProject } from '@twick/cloud-caption-video';

const project = await createCaptionProject({
  videoUrl: 'https://example.com/video.mp4',
  videoSize: { width: 1920, height: 1080 },
  language: 'english',
  languageFont: 'english',
});

console.log(project.tracks); // Array of video and caption tracks
```

## Technical Details

- **API:** Google Cloud Speech-to-Text API v2
- **Model:** `"long"` (optimized for longer audio)
- **Audio format:** FLAC, 16kHz, mono
- **Features:** Word-level timing offsets for precise caption placement
- **Auto-selection:** Synchronous (short audio) or batch (long audio >6s)

For detailed setup instructions, see the complete deployment guide in the repository.
