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

## Quick Start

### Option 1: Scaffold a Server (Recommended)

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

### Option 2: Use Programmatically

Import and use the `renderTwickVideo` function directly:

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
  "downloadUrl": "http://localhost:3001/download/my-video.mp4"
}
```

### GET /download/:filename

Downloads a rendered video file. This endpoint is rate-limited to prevent abuse.

**Rate Limits:**
- 100 requests per 15 minutes per IP address
- Rate limit headers are included in responses:
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Remaining requests in current window
  - `X-RateLimit-Reset`: When the rate limit window resets

### GET /health

Health check endpoint. Returns server status and current timestamp.

## Configuration

The server uses the following environment variables:

- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)

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

**Example:**
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

> **Note:** This server will work on Linux and macOS only. Windows is not supported.

## Browser Support

This package requires a Node.js environment with support for:
- Node.js 18 or higher
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