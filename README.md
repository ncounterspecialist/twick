# Twick

[![CI](https://github.com/ncounterspecialist/twick/actions/workflows/ci.yml/badge.svg)](https://github.com/ncounterspecialist/twick/actions/workflows/ci.yml)
[![Deploy Documentation](https://github.com/ncounterspecialist/twick/actions/workflows/deploy-docs.yml/badge.svg?branch=main)](https://github.com/ncounterspecialist/twick/actions/workflows/deploy-docs.yml)

This repository contains a collection of packages for video and image manipulation, built with modern web technologies.

## Packages

- **@twick/media-utils**: Core utilities for media handling and manipulation
- **@twick/canvas**: React-based canvas library for video and image editing
- **@twick/visualizer**: Video visualization and animation toolkit
- **@twick/live-player**: React component for video playback and control
- **twick/video-editor**: React based video editor
- **@twick/examples**: Example implementations and usage demonstrations

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/ncounterspecialist/twick.git
cd twick
```

2. Install dependencies:
```bash
pnpm install
```

3. Build all packages:
```bash
pnpm build
```

## Development

Each package can be developed independently:

```bash
# Build a specific package
pnpm build:media-utils
```

## How to run example

```
pnpm preview
```

Open http://localhost:4173/ in browser

## Demo Preview

Here's a glimpse of building a video using the SDK:

https://youtu.be/xuocqJqc9m8?si=h0wobDZlr9aj9XxW


## Integrate Video Editor in your project 

1. Install Dependencies 

```
npm install --save @twick/canvas @twick/live-player @twick/timeline  @twick/video-editor
```

2. Add VideoEditor component with LivePlayer and Timeline Context as shown
```
    <LivePlayerProvider>
      <TimelineProvider
        initialData={{
          timeline: [],
          version: 0,
        }}
      >
        <VideoEditor
          leftPanel={null}
          rightPanel={null}
          editorConfig={{
            videoProps: {
              width: 720,  // Desired width
              height: 1280, // Desired height
            },
          }}
        />
      </TimelineProvider>
    </LivePlayerProvider>
```

## Discord Community

Join our Discord community to:
- Chat with other developers
- Discuss issues and feature requests
- Get help and share your experiences
- Stay updated with the latest developments

[Join our Discord Server](https://discord.gg/u7useVAY)

## 🛡 License

This project is licensed under the **Apache 2.0 License with additional terms**.

- ✅ Free for use in commercial and non-commercial apps
- ✅ Can be modified and self-hosted
- ❌ Cannot be sold, rebranded, or distributed as a standalone SDK or developer tool

👉 For resale, or SaaS redistribution please [contact us](mailto:contact@kifferai.com).

