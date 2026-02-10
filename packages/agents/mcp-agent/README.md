# MCP Twick Server

An MCP (Model Context Protocol) server for Claude Desktop that generates video captions using Google Vertex AI (Gemini) and integrates with Twick Studio.

## 📦 Installation

### Quick Install (Recommended)

```bash
git clone https://github.com/ncounterspecialist/twick.git
cd twick/packages/agents/mcp-agent
npm run install-claude
```

This will automatically install dependencies, build the project, and configure Claude Desktop.

See [SHIPPING.md](./SHIPPING.md) for distribution options and release information.

## Features

- 🎬 **Video Transcription**: Transcribe videos from public URLs using Google Vertex AI
- 🌍 **Multi-language Support**: Support for multiple languages and fonts
- 📝 **Caption Generation**: Generate timed caption files in Twick Studio format
- 🔗 **Twick Studio Integration**: Direct upload and link generation for Twick Studio
- 📦 **Claude Desktop Extension**: Easy one-click installation

## Prerequisites

- Node.js 18+ and npm
- Google Cloud Platform account with:
  - Vertex AI API enabled
  - Service account key file (`gcp-sa-key.json`)
- Claude Desktop installed

## Quick Installation (One-Click)

```bash
npm run install-claude
```

This will:
1. Install all dependencies
2. Build the TypeScript project
3. Automatically merge the MCP server config into your Claude Desktop configuration

## Manual Installation

1. **Clone and install dependencies:**
   ```bash
   git clone https://github.com/ncounterspecialist/twick.git
   cd twick/packages/agents/mcp-agent
   npm install
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Configure Claude Desktop:**
   - Open Claude Desktop settings
   - Go to "MCP Servers" section
   - Click "Import config from file"
   - Select `claude_desktop_config.json` from this project
   - Edit the environment variables with your values (see Configuration below)

4. **Restart Claude Desktop**

## Configuration

Edit the `twick-mcp-agent` section in your Claude Desktop config file:

**Windows:**
```
%APPDATA%\Claude\claude_desktop_config.json
```

**macOS:**
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Linux:**
```
~/.config/Claude/claude_desktop_config.json
```

### Required Environment Variables

- `GOOGLE_CLOUD_PROJECT`: Your GCP project ID
- `GOOGLE_CLOUD_LOCATION`: GCP location (default: "global")
- `GOOGLE_APPLICATION_CREDENTIALS`: Absolute path to your `gcp-sa-key.json` file

### Optional Environment Variables

- `GOOGLE_VERTEX_MODEL`: Vertex AI model name (default: "gemini-2.5-flash-lite")
- `UPLOAD_API_URL`: Your upload API endpoint for uploading project files
- `TWICK_STUDIO_URL`: Twick Studio URL with `$project` placeholder (e.g., `https://studio.example.com?project-file=$project`)

### Example Configuration

```json
{
  "mcpServers": {
    "twick-mcp-agent": {
      "command": "node",
      "args": ["C:\\path\\to\\mcp-agent\\dist\\stdio-server.js"],
      "env": {
        "GOOGLE_CLOUD_PROJECT": "my-gcp-project",
        "GOOGLE_CLOUD_LOCATION": "global",
        "GOOGLE_APPLICATION_CREDENTIALS": "C:\\path\\to\\mcp-agent\\gcp-sa-key.json",
        "GOOGLE_VERTEX_MODEL": "gemini-2.5-flash-lite",
        "UPLOAD_API_URL": "https://api.example.com/upload",
        "TWICK_STUDIO_URL": "https://studio.example.com?project-file=$project"
      }
    }
  }
}
```

## Usage

Once installed, the `generate-captions` tool will be available in Claude Desktop. You can use it like:

```
Generate captionss for this video: https://example.com/video.mp4
```

Or with specific language settings:

```
Generate captionss for https://example.com/video.mp4 in Spanish with Spanish font
```

### Tool Parameters

- `videoUrl` (required): Publicly accessible video URL
- `language` (optional): Target language for transcription (default: "english")
- `language_font` (optional): Font/script for captions (default: "english")

## Project Structure

```
mcp-agent/
├── dist/                 # Compiled JavaScript (generated)
├── src/                  # TypeScript source files
├── stdio-server.ts       # Main MCP server entry point
├── transcriber.ts        # Video transcription logic
├── utils.ts              # Utility functions
├── claude_desktop_config.json  # Claude Desktop config template
├── install.js            # Installation script
├── package.json
└── README.md
```

## Development

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run in development mode
npm run dev
```

## Troubleshooting

### Server not appearing in Claude Desktop

1. Check that the config file path is correct
2. Verify all environment variables are set
3. Check Claude Desktop logs for errors
4. Ensure `dist/stdio-server.js` exists (run `npm run build`)

### Transcription errors

1. Verify your GCP credentials are valid
2. Check that Vertex AI API is enabled in your GCP project
3. Ensure the video URL is publicly accessible
4. Check that you have sufficient GCP quota

### Upload/Studio link issues

- If `UPLOAD_API_URL` is not set, the tool will return the project as a downloadable JSON file
- If `TWICK_STUDIO_URL` is not set, only the upload result will be returned
- The `$project` placeholder in `TWICK_STUDIO_URL` will be automatically replaced with the encoded project URL

## License

ISC

