# @twick/render-server

A Node.js package for rendering videos using Twick. Export the `renderTwickVideo` function for programmatic use, or scaffold a complete server using the CLI.

## Overview

This package provides:
- **`renderTwickVideo` function**: A programmatic API for rendering Twick videos
- **CLI tool**: Scaffold a complete Express server to run locally on your machine

## Installation

```bash
npm install @twick/render-server
# or
pnpm add @twick/render-server
```

**Note:** All required dependencies (`@twick/visualizer`, `@twick/media-utils`, and other Twick packages) are automatically installed with `@twick/render-server`.

## Quick Start

### Option 1: Run via Docker

**Prebuilt image (no repo clone):**

```bash
docker run -e PORT=5000 -p 5000:5000 ghcr.io/ncounterspecialist/render-server:latest
```

**Build and run from this package (monorepo):**

```bash
cd packages/render-server
docker build -t twick-render-server:latest .
docker run -e PORT=5000 -p 5000:5000 twick-render-server:latest
```

**Docker Compose (configurable via `.env`):**

```bash
cd packages/render-server
cp .env.example .env   # optional: edit port, rate limits, etc.
docker compose up -d
```

The server listens on the port set by `PORT` (default in Docker: `5000`). Endpoints:

- **Render**: `POST http://localhost:<PORT>/api/render-video`
- **Download**: `GET http://localhost:<PORT>/download/:filename`
- **Health**: `GET http://localhost:<PORT>/health`

`ffmpeg` and `ffprobe` are preinstalled in the image.  
The published image targets `linux/amd64`. On Apple Silicon (M1/M2/M3), Docker runs it under emulation, or use `--platform=linux/amd64`.

### Option 2: Scaffold a Server (Recommended for customization)

Scaffold a complete server with all endpoints configured:

```bash
npx @twick/render-server init
```

This creates a `twick-render-server` directory with:
- Express server with POST `/api/render-video` endpoint
- Rate limiting and security middleware
- TypeScript configuration
- Package.json with all dependencies

Then navigate to the scaffolded directory and start the server:

```bash
cd twick-render-server
npm install
npm run dev  # Development mode
# or
npm run build && npm start  # Production mode
```

The server will start on port 3001 by default. You can change this by setting the `PORT` environment variable.

### Option 3: Use Programmatically

Import and use the `renderTwickVideo` function directly. The package supports both ESM and CommonJS:

**ESM (import):**
```typescript
import { renderTwickVideo } from "@twick/render-server";

const videoPath = await renderTwickVideo(
  {
    input: {
      properties: { width: 1920, height: 1080 },
      // ... your project variables
    }
  },
  {
    outFile: "my-video.mp4",
    quality: "high"
  }
);
```

**CommonJS (require):**
```javascript
const { renderTwickVideo } = require("@twick/render-server");

const videoPath = await renderTwickVideo(
  {
    input: {
      properties: { width: 1920, height: 1080 },
      // ... your project variables
    }
  },
  {
    outFile: "my-video.mp4",
    quality: "high"
  }
);
```

## API Endpoints

### POST /api/render-video

Renders a video using Twick.

**Request Body:**
```json
{
  "variables":  {
    "input": {
      "properties": {
        "width": 720,
        "height": 1280
      },
      "tracks": [
        {
          "id": "t-track-1",
          "type": "element",
          "elements": [
            {
              "id": "e-244f8d5a3baa",
              "trackId": "t-track-1",
              "type": "rect",
              "s": 0,
              "e": 5,
              "props": {
                "width": 720,
                "height": 1280,
                "fill": "#fff000"
              }
            }
          ],
          "name": "element"
        }
      ]
    }
  },
  "settings": {
    "outFile": "my-video.mp4",
  }
}
```

**Response:**
```json
{
  "success": true,
  "downloadUrl": "http://localhost:<PORT>/download/my-video.mp4"
}
```
(`<PORT>` is the server port, e.g. `5000` when run via Docker.)

### GET /download/:filename

Downloads a rendered video file. This endpoint is rate-limited to prevent abuse.

**Rate limits** (configurable via environment variables, see [Configuration](#configuration)):
- Default: 100 requests per 15 minutes per IP
- Response headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

### GET /health

Health check endpoint. Returns server status and current timestamp.

## Configuration

Environment variables (supported in Docker via `-e`, `docker-compose`, or `.env`):

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` (Docker), `3001` (scaffolded server) |
| `NODE_ENV` | Environment | `production` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window, in milliseconds | `900000` (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per IP per window | `100` |
| `RATE_LIMIT_CLEANUP_INTERVAL_MS` | Cleanup interval for rate-limit store, in ms | `60000` (1 min) |

Copy `.env.example` to `.env` in this package to customize when using Docker Compose.

## Package Development

For developing this package itself:

```bash
# Install dependencies
pnpm install

# Build the package
pnpm run build

# Clean build artifacts
pnpm run clean
```

## API Reference

### `renderTwickVideo(variables, settings)`

Renders a Twick video with the provided variables and settings.

**Parameters:**
- `variables` (object): Project variables containing input configuration
- `settings` (object, optional): Render settings to override defaults

**Returns:** `Promise<string>` - Path to the rendered video file

**Example (ESM):**
```typescript
import { renderTwickVideo } from "@twick/render-server";

const videoPath = await renderTwickVideo(
  {
    input: {
      properties: { width: 1920, height: 1080 },
      tracks: [/* ... */]
    }
  },
  {
    outFile: "my-video.mp4",
    quality: "high",
    outDir: "./output"
  }
);
```

**Example (CommonJS):**
```javascript
const { renderTwickVideo } = require("@twick/render-server");

const videoPath = await renderTwickVideo(
  {
    input: {
      properties: { width: 1920, height: 1080 },
      tracks: [/* ... */]
    }
  },
  {
    outFile: "my-video.mp4",
    quality: "high",
    outDir: "./output"
  }
);
```

> **Note:** This server will work on Linux and macOS only. Windows is not supported.

## Module Support

This package supports both ESM and CommonJS:
- **ESM**: Use `import { renderTwickVideo } from "@twick/render-server"`
- **CommonJS**: Use `const { renderTwickVideo } = require("@twick/render-server")`

The package automatically provides the correct format based on your module system.

## Browser Support

This package requires a Node.js environment with support for:
- Node.js 20 or higher
- Puppeteer for video rendering
- File system operations

## Documentation

For complete documentation, refer to the project documentation site.

## License

This package is licensed under the **Sustainable Use License (SUL) Version 1.0**.

- Free for use in commercial and non-commercial apps
- Can be modified and self-hosted
- Cannot be sold, rebranded, or distributed as a standalone SDK

For commercial licensing inquiries, contact: contact@kifferai.com

For full license terms, see the main LICENSE.md file in the project root. 