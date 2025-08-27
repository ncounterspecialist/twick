# @twick/visualizer

A visualization library built on top of [@twick/2d](https://github.com/re-video/2d) for creating interactive visualizations and animations.

## Overview

This package provides advanced visualization capabilities for creating interactive animations, effects, and visual elements in video editing applications. Built on top of a 2D graphics engine, it offers powerful tools for creating professional visual content.

## Installation

```bash
npm install @twick/visualizer
# or
pnpm add @twick/visualizer
```

## Quick Start

```typescript
import { 
  createVisualization,
  addAnimation,
  renderScene 
} from '@twick/visualizer';

// Create a new visualization
const viz = createVisualization({
  width: 1920,
  height: 1080,
  duration: 10
});

// Add animations and effects
addAnimation(viz, {
  type: 'fade',
  startTime: 0,
  duration: 2
});

// Render the scene
const output = await renderScene(viz);
```

## Key Features

- **Interactive Visualizations**: Create dynamic visual content
- **Animation Engine**: Powerful animation system with keyframes
- **Effect Library**: Built-in effects and transitions
- **Performance Optimized**: Efficient rendering for real-time applications
- **Extensible**: Plugin system for custom effects
- **2D Graphics**: Full 2D graphics capabilities

## Development

### Installation

```bash
pnpm install
```

### Build

```bash
pnpm build
```

### Development Server

```bash
pnpm dev
```

## API Reference

### Core Functions

- `createVisualization`: Create a new visualization instance
- `addAnimation`: Add animations to the scene
- `renderScene`: Render the visualization to output
- `addEffect`: Apply visual effects
- `exportAnimation`: Export animations in various formats

### Types

- `VisualizationConfig`: Configuration for visualizations
- `AnimationOptions`: Animation configuration options
- `EffectConfig`: Effect configuration interface
- `RenderOptions`: Rendering options

For complete API documentation, refer to [docs/modules.md](../../docs/modules.md).

## Browser Support

This package requires a browser environment with support for:
- WebGL or Canvas 2D
- Modern JavaScript features (ES2020+)
- RequestAnimationFrame API

## Documentation

- **API Reference**: [docs/modules.md](../../docs/modules.md) - Complete API documentation
- **Style Guide**: [STYLE_GUIDE.md](../../STYLE_GUIDE.md) - Coding standards and conventions
- **Main README**: [README.md](../../README.md) - Project overview and getting started

## License

This package is licensed under the **Sustainable Use License (SUL) Version 1.0**.

- Free for use in commercial and non-commercial apps
- Can be modified and self-hosted
- Cannot be sold, rebranded, or distributed as a standalone SDK

For commercial licensing inquiries, contact: contact@kifferai.com

For full license terms, see [LICENSE.md](../../LICENSE.md).