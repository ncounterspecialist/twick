---
sidebar_position: 1
---

# Introduction

Twick includes a powerful React-based video editing SDK that makes it easy to add video editing capabilities to any frontend app.

The goal is to offer **high-level editing functions** that can be triggered with simple function calls — ideal for building powerful media experiences without reinventing the wheel.

### Core Features

#### Timeline Management
- **Multi-track timeline support** with drag-and-drop reordering
- **CRUD operations** for tracks and elements using visitor pattern
- **Element types**: Text, Video, Image, Audio, Rectangle, Circle, Icon, Caption
- **Undo/redo support** with history management
- **Time-based element positioning** and duration control

#### Video Editing
- **Live video preview** with custom controls
- **Timeline-based editing interface** with zoom and seek controls
- **Customizable video dimensions** and aspect ratios
- **High-performance video rendering** with optimized playback

#### Canvas Editing
- **React-based canvas library** built with Fabric.js
- **Live edit of media and text elements** with drag-and-drop
- **Move, resize, and rotate elements** directly on canvas
- **Coordinate conversion** between video and canvas space
- **Element reordering** by z-index

#### Media Utilities
- **Audio, video, and image metadata** extraction
- **Image and video dimension handling** with object-fit calculations
- **Audio duration detection** and thumbnail generation
- **File download and blob management** utilities
- **Media type detection** from URLs

#### Live Player
- **Video playback component** with custom controls
- **Project data support** for complex video configurations
- **Time tracking and duration management**
- **Play/pause state management** with React hooks

#### Visualizer
- **Interactive visualizations** built on 2D graphics
- **Animation and effect rendering** for timeline elements
- **Real-time preview** of video compositions

## Available Packages

- **@twick/timeline**: Core timeline management with CRUD operations and visitor pattern
- **@twick/video-editor**: Complete video editing interface with timeline and controls
- **@twick/canvas**: React-based canvas library for live element editing
- **@twick/live-player**: Video playback component with project data support
- **@twick/media-utils**: Utilities for handling media files and metadata
- **@twick/visualizer**: Video visualization and animation toolkit
- **@twick/examples**: Example implementations and usage demonstrations

## Getting Started

To get started with any package, check out its specific documentation in the sidebar. Each package's documentation includes:

- Installation instructions
- Basic usage examples
- API reference
- Advanced usage patterns

## Contributing

We welcome contributions! Please check out our [GitHub repository](https://github.com/ncounterspecialist/twick) for more information on how to contribute. 