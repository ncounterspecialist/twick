## @twick/cloud-subtitle-video

Cloud-function package for generating subtitle-ready subtitles using **Google GenAI (Vertex AI)** and exporting subtitle project JSONs to S3.

### Install

```bash
npm install -D @twick/cloud-subtitle-video
```

### AWS Lambda (container) usage

This package ships with an AWS Lambda container template (Dockerfile + handler).

#### 1) Build image

In the `packages/cloud-functions/transcript` directory:

```bash
docker build -t twick-cloud-transcript .
```

#### 2) Provide Google Cloud credentials to Docker

**Required environment variables:**
- `GOOGLE_CLOUD_PROJECT` (required): Your Google Cloud project ID
- `GOOGLE_CLOUD_LOCATION` (optional): Vertex AI location (defaults to `"global"`)

You can pass credentials to the container in one of two ways:

- **File path (recommended)**:
  - Mount a JSON service account key file in the container and point `GOOGLE_APPLICATION_CREDENTIALS` to it.
  - Example:

```bash
docker run \
  -e GOOGLE_APPLICATION_CREDENTIALS=/var/secrets/gcp-key.json \
  -e GOOGLE_CLOUD_PROJECT=my-gcp-project-id \
  -e GOOGLE_CLOUD_LOCATION=us-central1 \
  -v /host/path/gcp-key.json:/var/secrets/gcp-key.json:ro \
  twick-cloud-transcript
```

- **Environment JSON**:
  - Inject the JSON key directly as an environment variable:

```bash
docker run \
  -e GOOGLE_KEY="$(cat gcp-key.json)" \
  -e GOOGLE_CLOUD_PROJECT=my-gcp-project-id \
  -e GOOGLE_CLOUD_LOCATION=us-central1 \
  twick-cloud-transcript
```

The handler will automatically use:
- `GOOGLE_KEY` (JSON string), or
- `GOOGLE_APPLICATION_CREDENTIALS` (path to JSON key file via Application Default Credentials).

#### 3) Lambda handler

The Lambda entrypoint is:

```text
platform/aws/handler.handler
```

Expected payload (e.g. from AppSync / API Gateway):

```json
{
  "audioUrl": "https://example.com/audio.mp3",
  "language": "english",
  "languageFont": "english"
}
```

**Parameters:**
- `audioUrl` (required): Publicly reachable HTTP(S) URL to the audio file
- `language` (optional): Target transcription language (default: `"english"`)
- `languageFont` (optional): Target font/script for subtitles (default: `"english"`)

**Note:** The function downloads the audio from the URL, so it must be publicly accessible. Google Cloud Storage URIs (`gs://`) are not directly supported; use a signed URL or public URL instead.

#### Response

On success, the function returns JSON with caption segments:

```json
{
  "subtitles": [
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

**Response fields:**
- `subtitles` (array): Parsed caption segments with:
  - `t` (string): Caption text (max 4 words per segment)
  - `s` (number): Start timestamp in milliseconds
  - `e` (number): End timestamp in milliseconds
- `rawText` (string): Raw text response from the model (useful for debugging if parsing fails)

**Note:** subtitles are automatically segmented into phrases with a maximum of 4 words each, with precise millisecond timestamps and non-overlapping segments.

On error, a JSON error payload is returned:

```json
{
  "error": "Internal server error",
  "message": "Detailed error message ..."
}
```

### Programmatic usage (transcriber)

The core transcriber can be used directly:

```js
import { transcribeAudioUrl } from '@twick/cloud-subtitle-video/core/transcriber.js';

const result = await transcribeAudioUrl({
  audioUrl: 'https://example.com/audio.mp3',
  language: 'english',
  languageFont: 'english',
});

console.log(result.subtitles); // Array of {t, s, e} objects
console.log(result.rawText);  // Raw model response
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
import { exportProject } from '@twick/cloud-subtitle-video/core/export-project.js';

const projectData = await createSubtitleProject({ /* ... */ });
const response = await exportProject(projectData);
console.log(response.body); // {"url":"https://bucket.s3.amazonaws.com/twick-project-<timestamp>.json"}
```

`exportProject` throws if mandatory fields are missing or if the upload fails; otherwise it resolves with a 200-style response containing the `url` in the JSON body.

### Model configuration

You can configure the Gemini model via environment variable:

- `GOOGLE_VERTEX_MODEL` (optional): Model name (default: `"gemini-2.5-flash"`)

Example:

```bash
export GOOGLE_VERTEX_MODEL="gemini-2.0-flash-lite-001"
```

### Testing

`npm test` executes every `test/*.test.js` file in this package, covering both the transcription helpers and the new export helper suite.


