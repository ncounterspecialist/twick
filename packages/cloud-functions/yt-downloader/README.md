# @twick/cloud-yt-downloader

**Download videos from YouTube and other platforms using yt-dlp in AWS Lambda containers.**

Download videos from YouTube, Vimeo, and 1000+ other supported platforms using yt-dlp with automatic video/audio merging via ffmpeg. No server management required—deploy as a serverless Lambda function that scales automatically.

## Legal Disclaimer

**IMPORTANT**: You are solely responsible for ensuring that you have the legal right to download any video content. This tool is provided as-is for legitimate use cases such as downloading your own content, content you have explicit permission to download, or content that is in the public domain.

- **Copyright Compliance**: Make sure you only download videos that you own, have permission to download, or are free from copyright restrictions
- **Terms of Service**: Respect the terms of service of the platforms you are downloading from
- **No Liability**: Twick is not legally responsible for any copyright violations, terms of service violations, or other legal issues arising from the use of this tool
- **Use at Your Own Risk**: By using this software, you acknowledge that you are responsible for compliance with all applicable laws and platform terms of service

Always ensure you have the appropriate rights or permissions before downloading any video content.

## What Problem Does This Solve?

- **Serverless video downloading** — Download videos without managing servers or infrastructure
- **Programmatic video acquisition** — Download videos from YouTube and other platforms via API calls
- **Scalable processing** — AWS Lambda handles concurrent downloads automatically
- **Automatic merging** — ffmpeg automatically merges separate video and audio streams
- **No size limits** — Container-based Lambda avoids layer size restrictions

## Input → Output

**Input:** Video URL + optional configuration
```json
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "format": "bestvideo+bestaudio/best",
  "mergeVideoAudio": true
}
```

**Output:** S3 URL + metadata
```json
{
  "url": "https://bucket.s3.amazonaws.com/video-title-1234567890.mp4",
  "bucket": "bucket-name",
  "key": "video-title-1234567890.mp4",
  "size": 52428800,
  "contentType": "video/mp4",
  "metadata": {
    "title": "Video Title",
    "uploader": "Channel Name",
    "duration": 180,
    "width": 1920,
    "height": 1080,
    "fps": 30,
    "format": "bestvideo+bestaudio"
  }
}
```

**Where it runs:** AWS Lambda container image (Linux/AMD64)

## Installation

```bash
npm install -D @twick/cloud-yt-downloader
```

## Quick Start

### 1. Scaffold AWS Lambda Template

```bash
npx twick-yt-downloader init
```

This creates a `twick-yt-downloader-aws` directory with:
- Dockerfile for Lambda container (includes yt-dlp + ffmpeg)
- Lambda handler code
- Minimal package.json

### 2. Build Docker Image

```bash
npx twick-yt-downloader build twick-yt-downloader:latest
```

The Dockerfile automatically:
- Installs ffmpeg via yum
- Downloads and installs yt-dlp from GitHub releases
- Sets up the Lambda handler environment

### 3. Configure S3 Storage

**Required environment variables:**
- `YT_DOWNLOADER_S3_BUCKET` (required) — Destination S3 bucket for downloaded videos

**Optional environment variables:**
- `YT_DOWNLOADER_S3_PREFIX` (optional) — Key prefix to prepend before the generated object key (e.g., `"downloads/videos/"`)
- `YT_DOWNLOADER_S3_REGION` (optional) — Region for the S3 client (defaults to `AWS_REGION` or `us-east-1`)
- `YT_DOWNLOADER_PUBLIC_BASE_URL` (optional) — Custom base URL for returned video links (e.g., CloudFront distribution)
- `YT_DOWNLOADER_S3_ENDPOINT` (optional) — Custom endpoint for S3-compatible storage
- `YT_DOWNLOADER_S3_FORCE_PATH_STYLE` (optional) — Set to `"true"` to force path-style URLs

**IAM Permissions:**
The Lambda function needs permission to upload to S3:
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

### 4. Deploy to AWS Lambda

```bash
# Login to ECR
npx twick-yt-downloader ecr-login us-east-1 YOUR_ACCOUNT_ID

# Push to ECR
npx twick-yt-downloader push twick-yt-downloader:latest us-east-1 YOUR_ACCOUNT_ID
```

Then create a Lambda function using the ECR image URI and configure the environment variables above.

## Deployment (High Level)

1. **Scaffold** the Lambda container template
2. **Build** the Docker image (includes yt-dlp + ffmpeg)
3. **Configure** S3 bucket and environment variables
4. **Push** to AWS ECR (Elastic Container Registry)
5. **Create Lambda function** using the ECR image
6. **Configure** memory (recommended: 2GB+) and timeout (15+ minutes for longer videos)

The Lambda handler expects:
- **Event format:** `{ url, format?, mergeVideoAudio?, ytdlpOptions? }`
- **Response:** S3 URL, bucket, key, size, and video metadata

**Important Notes:**
- Downloaded videos are automatically uploaded to S3
- Temporary files in `/tmp` are cleaned up after upload
- Lambda has a 512MB `/tmp` limit (10GB available in newer runtimes)
- Set appropriate timeout based on video length and size

## Programmatic Usage

Use the core downloader directly:

```js
import { downloadVideo } from '@twick/cloud-yt-downloader';

const result = await downloadVideo({
  url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  format: 'bestvideo+bestaudio/best',
  mergeVideoAudio: true,
});

console.log(result.filePath); // Path to downloaded video
console.log(result.title);    // Video title
console.log(result.duration); // Duration in seconds
```

## Technical Details

- **Tool:** yt-dlp (latest version from GitHub releases)
- **Video Processing:** ffmpeg (for merging video/audio streams)
- **Base Image:** AWS Lambda Node.js 20 runtime
- **Platform:** Linux/AMD64 (required for Lambda)
- **Format Options:** Supports all yt-dlp format selection syntax
- **Automatic Merging:** Video and audio streams are automatically merged to MP4 when `mergeVideoAudio: true`

## Supported Platforms

yt-dlp supports 1000+ platforms including:
- YouTube
- Vimeo
- Dailymotion
- Twitter/X
- TikTok
- Facebook
- Instagram
- And many more...

See [yt-dlp extractors list](https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md) for full list.

## Advanced Configuration

### Custom Format Selection

```js
await downloadVideo({
  url: 'https://youtube.com/watch?v=...',
  format: 'best[height<=720]', // Best quality up to 720p
  // or
  format: 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]',
});
```

### Additional yt-dlp Options

```js
await downloadVideo({
  url: 'https://youtube.com/watch?v=...',
  ytdlpOptions: {
    'write-sub': true,        // Download subtitles
    'write-auto-sub': true,   // Download auto-generated subtitles
    'sub-lang': 'en',         // Subtitle language
    'extract-flat': false,    // Extract playlist info only
    'cookies-file': '/path/to/cookies.txt',  // Use cookies for authentication
    'extractor-args': 'youtube:player_client=android',  // Use different client
  },
});
```

### YouTube Bot Detection & Cookies

Some YouTube videos may require authentication or cookies to download. If you encounter bot detection errors:

1. **Export cookies from your browser:**
   - Use browser extensions like "Get cookies.txt LOCALLY" for Chrome/Edge
   - Or use yt-dlp's `--cookies-from-browser` option (requires browser in Lambda environment)

2. **Upload cookies to S3:**
   ```bash
   # Export cookies to a file, then upload to S3
   aws s3 cp cookies.txt s3://your-bucket/cookies/cookies.txt
   ```

3. **Use cookies in Lambda:**
   ```js
   // Download cookies from S3 first, then pass to yt-dlp
   const cookiesPath = '/tmp/cookies.txt';
   // ... download from S3 to cookiesPath ...
   
   await downloadVideo({
     url: 'https://youtube.com/watch?v=...',
     ytdlpOptions: {
       'cookies-file': cookiesPath,
     },
   });
   ```

4. **Default behavior:**
   - The function automatically uses Android client for YouTube (less likely to trigger bot detection)
   - Sets a mobile user-agent by default
   - You can override these with `ytdlpOptions`

### Disable Audio/Video Merging

```js
await downloadVideo({
  url: 'https://youtube.com/watch?v=...',
  mergeVideoAudio: false, // Download best format as-is
});
```

## Lambda Configuration Recommendations

- **Memory:** 2048 MB (2GB) minimum, 4096 MB (4GB) recommended for HD videos
- **Timeout:** 900 seconds (15 minutes) for standard videos, up to 900 seconds max
- **Ephemeral Storage:** 2048 MB (2GB) default, increase if downloading large videos
- **VPC:** Not required (unless accessing private resources)
- **Environment Variables:** None required by default

## Dockerfile Details

The Dockerfile uses the Lambda Node.js 20 base image and:

1. Installs ffmpeg via `yum install -y ffmpeg`
2. Downloads yt-dlp from GitHub releases: `https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp`
3. Makes yt-dlp executable: `chmod +x /usr/local/bin/yt-dlp`
4. Installs npm dependencies
5. Sets handler to `platform/aws/handler.handler`

This approach avoids:
- Lambda layer size limits
- Complex dependency management
- Runtime environment issues

For detailed setup instructions, see the complete deployment guide in the repository.
