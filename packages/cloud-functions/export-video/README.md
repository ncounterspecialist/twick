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

### AWS Lambda (container) usage

This package ships with an AWS Lambda container template (Dockerfile + handler).

#### Build image

In the `packages/cloud-functions/export-video` directory:

```bash
docker buildx build --platform linux/amd64 -t twick-export-video:latest -f platform/aws/Dockerfile .
```

#### Push image to AWS ECR

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
   REPOSITORY_NAME="twick-export-video"
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
   docker tag twick-export-video:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPOSITORY_NAME:latest
   ```

6. **Push the image:**
   ```bash
   docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPOSITORY_NAME:latest
   ```

**Complete example script:**
```bash
#!/bin/bash
AWS_REGION="ap-south-1"
REPOSITORY_NAME="twick-export-video"
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Build the image
docker buildx build --platform linux/amd64 -t twick-export-video:latest -f platform/aws/Dockerfile .

# Login to ECR
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Create repository if it doesn't exist
aws ecr create-repository --repository-name $REPOSITORY_NAME --image-scanning-configuration scanOnPush=true --region $AWS_REGION 2>/dev/null || true

# Tag and push
docker tag twick-export-video:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPOSITORY_NAME:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPOSITORY_NAME:latest
```

After pushing, you can use the ECR image URI (`$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPOSITORY_NAME:latest`) when creating or updating your Lambda function.

**Notes:**
- The Dockerfile is based on `revideo/aws-lambda-base-image` and prepares Chromium and ffmpeg for headless rendering.
- The handler expects an `event.arguments.input` payload with `{ project, mediaFiles? }`.
- The response is a `video/mp4` base64 body, or a text file on error.

### Programmatic usage

The core renderer is exported at `core/renderer.js`:

```js
import renderTwickVideo from '@twick/cloud-export-video/core/renderer.js';

const resultPath = await renderTwickVideo(project, { outFile: 'my.mp4' });
```


