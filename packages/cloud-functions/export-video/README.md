## @twick/cloud-export-video

Reusable cloud-function package for exporting Twick videos. Includes a core renderer and platform templates for AWS Lambda container images.

### Install

```bash
npm install -D @twick/cloud-export-video
```

### CLI

```bash
npx twick-export-video help
```

Commands:

- `init [dir]`: Scaffold AWS container template (Dockerfile + handler) into `[dir]` (default `./twick-export-video-aws`). Also writes a minimal `package.json` that depends on this package.
- `build <image> [dir]`: Build a Docker image from `[dir]` (default `./twick-export-video-aws`).
- `ecr-login <region> <accountId>`: Log in Docker to your AWS ECR registry.
- `push <image> <region> <accountId>`: Tag and push the image to ECR. The repository must already exist.

### Typical flow

```bash
# 1) Scaffold
npx twick-export-video init

# 2) Build an image
npx twick-export-video build twick-export-video:latest

# 3) Login to ECR
npx twick-export-video ecr-login us-east-1 123456789012

# 4) Push (assumes an ECR repo named `twick-export-video` exists)
npx twick-export-video push twick-export-video:latest us-east-1 123456789012
```

### AWS Lambda (container) notes

- The Dockerfile is based on `revideo/aws-lambda-base-image` and prepares Chromium and ffmpeg for headless rendering.
- The handler expects an `event.arguments.input` payload with `{ project, mediaFiles? }`.
- The response is a `video/mp4` base64 body, or a text file on error.

### Programmatic usage

The core renderer is exported at `core/renderer.js`:

```js
import renderTwickVideo from '@twick/cloud-export-video/core/renderer.js';

const resultPath = await renderTwickVideo(project, { outFile: 'my.mp4' });
```


