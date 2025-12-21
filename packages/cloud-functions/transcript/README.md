## @twick/cloud-transcript

Cloud-function package for generating JSON captions from audio using **Google GenAI (Vertex AI)** with Gemini models.

### Install

```bash
npm install -D @twick/cloud-transcript
```

### CLI

```bash
npx twick-transcript help
```

Commands:

- `init [dir]`: Scaffold AWS container template (Dockerfile + handler) into `[dir]` (default `./twick-transcript-aws`). Also writes a minimal `package.json` that depends on this package.
- `build <image> [dir]`: Build a Docker image from `[dir]` (default `./twick-transcript-aws`).
- `ecr-login <region> <accountId>`: Log in Docker to your AWS ECR registry.
- `push <image> <region> <accountId>`: Tag and push the image to ECR. The repository must already exist.

### Typical flow

```bash
# 1) Scaffold
npx twick-transcript init

# 2) Build an image
npx twick-transcript build twick-transcript:latest

# 3) Login to ECR
npx twick-transcript ecr-login us-east-1 123456789012

# 4) Push (assumes an ECR repo named `twick-transcript` exists)
npx twick-transcript push twick-transcript:latest us-east-1 123456789012
```

### AWS Lambda (container) usage

This package ships with an AWS Lambda container template (Dockerfile + handler).

#### 1) Build image

In the `packages/cloud-functions/transcript` directory:

```bash
docker buildx build --platform linux/amd64 -t twick-transcript:latest -f platform/aws/Dockerfile .
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
   REPOSITORY_NAME="twick-transcript"
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
   docker tag twick-transcript:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPOSITORY_NAME:latest
   ```

6. **Push the image:**
   ```bash
   docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPOSITORY_NAME:latest
   ```

**Complete example script:**
```bash
#!/bin/bash
AWS_REGION="ap-south-1"
REPOSITORY_NAME="twick-transcript"
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Build the image
docker buildx build --platform linux/amd64 -t twick-transcript:latest -f platform/aws/Dockerfile .

# Login to ECR
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Create repository if it doesn't exist
aws ecr create-repository --repository-name $REPOSITORY_NAME --image-scanning-configuration scanOnPush=true --region $AWS_REGION 2>/dev/null || true

# Tag and push
docker tag twick-transcript:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPOSITORY_NAME:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPOSITORY_NAME:latest
```

After pushing, you can use the ECR image URI (`$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPOSITORY_NAME:latest`) when creating or updating your Lambda function.

#### 3) Provide Google Cloud credentials to Docker

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

#### 4) Lambda handler

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
- `languageFont` (optional): Target font/script for captions (default: `"english"`)

**Note:** The function downloads the audio from the URL, so it must be publicly accessible. Google Cloud Storage URIs (`gs://`) are not directly supported; use a signed URL or public URL instead.

#### Response

On success, the function returns JSON with caption segments:

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

**Response fields:**
- `captions` (array): Parsed caption segments with:
  - `t` (string): Caption text (max 4 words per segment)
  - `s` (number): Start timestamp in milliseconds
  - `e` (number): End timestamp in milliseconds
- `rawText` (string): Raw text response from the model (useful for debugging if parsing fails)

**Note:** Captions are automatically segmented into phrases with a maximum of 4 words each, with precise millisecond timestamps and non-overlapping segments.

On error, a JSON error payload is returned:

```json
{
  "error": "Internal server error",
  "message": "Detailed error message ..."
}
```

### Programmatic usage

The core transcriber can be used directly:

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

### Model configuration

You can configure the Gemini model via environment variable:

- `GOOGLE_VERTEX_MODEL` (optional): Model name (default: `"gemini-2.5-flash"`)

Example:

```bash
export GOOGLE_VERTEX_MODEL="gemini-2.0-flash-lite-001"
```


