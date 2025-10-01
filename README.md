# Twick

A comprehensive video editing toolkit built with modern web technologies.

## Style Guide

This project follows a comprehensive style guide for naming conventions and code style across all packages. Please refer to [STYLE_GUIDE.md](./STYLE_GUIDE.md) for detailed standards.

## Overview

Twick is a monorepo containing multiple packages for video editing functionality:

[![CI](https://github.com/ncounterspecialist/twick/actions/workflows/ci.yml/badge.svg)](https://github.com/ncounterspecialist/twick/actions/workflows/ci.yml)
[![Deploy Documentation](https://github.com/ncounterspecialist/twick/actions/workflows/deploy-docs.yml/badge.svg?branch=main)](https://github.com/ncounterspecialist/twick/actions/workflows/deploy-docs.yml)

This repository contains a collection of packages for video and image manipulation, built with modern web technologies.

## Packages

- **@twick/media-utils**: Core utilities for media handling and manipulation
- **@twick/canvas**: React-based canvas library for video and image editing
- **@twick/visualizer**: Video visualization and animation toolkit
- **@twick/live-player**: React component for video playback and control
- **@twick/timeline**: Timeline management and editing capabilities
- **@twick/video-editor**: React based video editor
- **@twick/examples**: Example implementations and usage demonstrations

For detailed API documentation and module information, refer to [docs/modules.md](./docs/modules.md).

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

## Examples

### Running the Demo

```bash
pnpm preview
```

Open http://localhost:4173 in your browser to see the video editor in action.

For detailed examples and tutorials, see the [Twick Demo guide](https://ncounterspecialist.github.io/twick/docs/in-action).

## Demo Preview

Watch how to create a video project step-by-step with Twick Studio:

[Twick Studio](https://youtu.be/2M6vtOHZnEI)

See how simple it is to integrate Twick into your existing application:

[Twick SDK Integration](https://youtu.be/EizgeoxwJsk)

## Integration

### Video Editor Integration

1. Install Dependencies 

```bash
npm install --save @twick/canvas @twick/live-player @twick/timeline @twick/video-editor @twick/studio
```

2. Add Twick Studio component with LivePlayer and Timeline Context as shown

```tsx
import { LivePlayerProvider } from "@twick/live-player";
import { TwickStudio } from "@twick/studio";
import { TimelineProvider, INITIAL_TIMELINE_DATA } from "@twick/timeline";
import "@twick/studio/dist/studio.css";

export default function App() {
  return (
    <LivePlayerProvider>
      <TimelineProvider
        initialData={INITIAL_TIMELINE_DATA}
        contextId={"studio-demo"}
      >
        <TwickStudio studioConfig={{
          videoProps: {
            width: 720,
            height: 1280,
          },
        }}/>
      </TimelineProvider>
    </LivePlayerProvider>
  );
}
```

## Documentation

- **Twick Documentation**: [Twick API Documentation](https://ncounterspecialist.github.io/twick) – Comprehensive documentation and API reference for all Twick packages.
- **Style Guide**: [Style Guide](./STYLE_GUIDE.md) – Guidelines for coding standards and best practices.
- **Demo Guide**: [Twick Demo Guide](https://ncounterspecialist.github.io/twick/docs/in-action) – Step-by-step tutorials and interactive examples.

## Community

Join our Discord community to:
- Chat with other developers
- Discuss issues and feature requests
- Get help and share your experiences
- Stay updated with the latest developments

[Join our Discord Server](https://discord.gg/ZBhMNaAN)

## License

This project is licensed under the **Sustainable Use License (SUL) Version 1.0**.

- Free for use in commercial and non-commercial apps
- Can be modified and self-hosted
- Cannot be sold, rebranded, or distributed as a standalone SDK or developer tool

For resale, or SaaS redistribution please [contact us](mailto:contact@kifferai.com).

For full license terms, see [LICENSE.md](LICENSE.md). 