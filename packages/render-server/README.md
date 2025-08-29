# @twick/render-server

A simple Node.js server for rendering videos using Twick.

## Overview

This package provides a server-side rendering solution for Twick video projects. It allows you to render video projects on the server and download the resulting video files.

## Installation

```bash
npm install @twick/render-server
# or
pnpm add @twick/render-server
```

## Quick Start

### Starting the server

```bash
# Development mode
pnpm run dev

# Production mode
pnpm run build
pnpm start
```

The server will start on port 3001 by default. You can change this by setting the `PORT` environment variable.

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
  "downloadUrl": "http://localhost:3001/download/output/my-video.mp4"
}
```

### GET /download/:outFile

Downloads a rendered video file.

### GET /health

Health check endpoint.

## Configuration

The server uses the following environment variables:

- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm start

# Test
node test.js
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