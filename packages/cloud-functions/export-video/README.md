# @twick/cloud-export-video

**Export Twick video projects to MP4 format using serverless rendering.**

Converts Twick project JSON into MP4 video files using Chromium and ffmpeg in AWS Lambda containers. No server management required—deploy as a serverless function that scales automatically.

## What Problem Does This Solve?

- **Serverless video rendering** — Export videos without managing servers or infrastructure
- **Programmatic video generation** — Convert Twick project JSON to MP4 via API calls
- **Scalable processing** — AWS Lambda handles concurrent exports automatically
- **Cost-effective** — Pay only for rendering time, no idle server costs

## Input → Output

**Input:** Twick project JSON + optional media files
```json
{
  "project": { /* Twick project JSON */ },
  "mediaFiles": [ /* Optional media file URLs */ ]
}
```

**Output:** MP4 video file (base64 encoded or file path)

**Where it runs:** AWS Lambda container image (Linux/AMD64)

## Installation

```bash
npm install -D @twick/cloud-export-video
```

## Quick Start

### 1. Scaffold AWS Lambda Template

```bash
npx twick-export-video init
```

This creates a `twick-export-video-aws` directory with:
- Dockerfile for Lambda container
- Lambda handler code
- Minimal package.json

### 2. Build Docker Image

```bash
npx twick-export-video build twick-export-video:latest
```

### 3. Deploy to AWS Lambda

```bash
# Login to ECR
npx twick-export-video ecr-login us-east-1 YOUR_ACCOUNT_ID

# Push to ECR
npx twick-export-video push twick-export-video:latest us-east-1 YOUR_ACCOUNT_ID
```

Then create a Lambda function using the ECR image URI.

## Deployment (High Level)

1. **Scaffold** the Lambda container template
2. **Build** the Docker image (includes Chromium + ffmpeg)
3. **Push** to AWS ECR (Elastic Container Registry)
4. **Create Lambda function** using the ECR image
5. **Configure** memory (recommended: 3GB+) and timeout (5+ minutes)

The Lambda handler expects:
- **Event format:** `{ arguments: { input: { project, mediaFiles? } } }`
- **Response:** `video/mp4` base64 body, or error text

## Programmatic Usage

Use the core renderer directly (without Lambda):

```js
import renderTwickVideo from '@twick/cloud-export-video/core/renderer.js';

const resultPath = await renderTwickVideo(project, { outFile: 'my.mp4' });
```

## Technical Details

- **Base image:** `revideo/aws-lambda-base-image` (includes Chromium and ffmpeg)
- **Platform:** Linux/AMD64
- **Handler:** `platform/aws/handler.handler`
- **Response format:** Base64-encoded MP4 or error text

For detailed deployment steps, see the complete example script in the repository.
