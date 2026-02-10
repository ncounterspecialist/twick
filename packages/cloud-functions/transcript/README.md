# @twick/cloud-transcript

**Transcribe audio/video to JSON captions using Google GenAI (Vertex AI) with Gemini models.**

Extract text from audio content with precise millisecond timestamps. Perfect for generating caption data from audio files or video URLs.

## What Problem Does This Solve?

- **AI-powered transcription** — Use Google's Gemini models for accurate audio-to-text conversion
- **Precise timestamps** — Get millisecond-level timing for each caption segment
- **Serverless processing** — Deploy as AWS Lambda for automatic scaling
- **Multiple languages** — Support various languages and fonts

## Input → Output

**Input:** Audio URL + optional configuration
```json
{
  "audioUrl": "https://example.com/audio.mp3",
  "language": "english",
  "languageFont": "english"
}
```

**Output:** JSON captions with timestamps
```json
{
  "captions": [
    {
      "t": "Example phrase 1",
      "s": 0,
      "e": 1500
    },
    {
      "t": "Another short example",
      "s": 1500,
      "e": 2800
    }
  ],
  "rawText": "Full raw response text from the model..."
}
```

**Where it runs:** AWS Lambda container image (Linux/AMD64)

## Installation

```bash
npm install -D @twick/cloud-transcript
```

## Quick Start

### 1. Scaffold AWS Lambda Template

```bash
npx twick-transcript init
```

### 2. Build Docker Image

```bash
npx twick-transcript build twick-transcript:latest
```

### 3. Configure Google Cloud

**Required:**
- Google Cloud project with Vertex AI API enabled
- Service account with Vertex AI permissions

**Environment variables:**
- `GOOGLE_CLOUD_PROJECT` (required) — Your GCP project ID
- `GOOGLE_CLOUD_LOCATION` (optional) — Vertex AI location (default: `"global"`)
- `GOOGLE_VERTEX_MODEL` (optional) — Model name (default: `"gemini-2.5-flash"`)

**Credentials (choose one):**
- **File path** (recommended):
  - Mount service account JSON and set `GOOGLE_APPLICATION_CREDENTIALS` to the file path
- **Environment JSON** (alternative):
  - Set `GOOGLE_KEY` to the service account JSON string

### 4. Deploy to AWS Lambda

```bash
# Login to ECR
npx twick-transcript ecr-login us-east-1 YOUR_ACCOUNT_ID

# Push to ECR
npx twick-transcript push twick-transcript:latest us-east-1 YOUR_ACCOUNT_ID
```

## Deployment (High Level)

1. **Scaffold** the Lambda container template
2. **Configure** Google Cloud credentials (file mount or environment variable)
3. **Set environment variables** (GCP project, location, model)
4. **Build and push** Docker image to ECR
5. **Create Lambda function** using the ECR image

The Lambda handler expects:
- **Event format:** `{ audioUrl, language?, languageFont? }`
- **Response:** JSON with `captions` array and `rawText` string

**Note:** The audio URL must be publicly accessible via HTTP(S). Google Cloud Storage URIs (`gs://`) are not directly supported—use signed URLs instead.

## Programmatic Usage

Use the core transcriber directly:

```js
import { transcribeAudioUrl } from '@twick/cloud-transcript/core/transcriber.js';

const result = await transcribeAudioUrl({
  audioUrl: 'https://example.com/audio.mp3',
  language: 'english',
  languageFont: 'english',
});

console.log(result.captions); // Array of {t, s, e} objects
console.log(result.rawText);  // Raw model response
```

## Technical Details

- **Model:** Google Gemini (default: `gemini-2.5-flash`, configurable via `GOOGLE_VERTEX_MODEL`)
- **Format:** Captions segmented into max 4 words per segment
- **Timestamps:** Millisecond precision, non-overlapping segments
- **API:** Google Vertex AI (GenAI)

For detailed setup instructions, see the complete deployment guide in the repository.
