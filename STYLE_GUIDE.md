# Twick Monorepo Style Guide

This style guide establishes consistent naming conventions and code style standards across all packages in the Twick monorepo.

## Naming Conventions

### 1. Function Declarations
**Use const arrow functions consistently for all function declarations:**

```typescript
// ✅ Correct
export const getVideoMeta = (videoSrc: string): Promise<VideoMeta> => {
  // implementation
};

export const createCanvas = (props: CanvasProps) => {
  // implementation
};

// ❌ Avoid
export function getVideoMeta(videoSrc: string): Promise<VideoMeta> {
  // implementation
}
```

### 2. Class Names
**Use PascalCase for class names:**

```typescript
// ✅ Correct
export class TimelineEditor { }
export class TrackElement { }
export class ElementValidator { }
export class BrowserMediaManager { }
export class BaseMediaManager { }

// ❌ Avoid
export class timelineEditor { }
export class track_element { }
export class browserMediaManager { }
```

### 3. Method Names
**Use camelCase for method names with consistent getter/setter patterns:**

```typescript
// ✅ Correct - Getter methods
getId(): string { }
getStart(): number { }
getEnd(): number { }
getDuration(): number { }
getTrackId(): string { }
getProps(): Record<string, any> { }

// ✅ Correct - Setter methods (fluent interface)
setId(id: string) { return this; }
setStart(startTime: number) { return this; }
setEnd(endTime: number) { return this; }
setTrackId(trackId: string) { return this; }
setProps(props: Record<string, any>) { return this; }
```

### 4. Property Names
**Use descriptive camelCase names, avoid abbreviations:**

```typescript
// ✅ Correct - Descriptive names
protected startTime!: number;
protected endTime!: number;
protected trackId!: string;
protected mediaDuration!: number;
protected parentSize: Size;
protected videoWidth: number;
protected videoHeight: number;

// ❌ Avoid - Abbreviated names
protected s!: number;
protected e!: number;
protected tid!: string;
protected md!: number;
protected ps: Size;
protected vw: number;
protected vh: number;
```

### 5. Variable Names
**Use descriptive camelCase names, avoid single letters or abbreviations:**

```typescript
// ✅ Correct - Descriptive names
const timelineData = editor.getTimelineData();
const timelineStore = this.storeMap.get(contextId);
const currentElements = getCurrentElements(currentTime, tracks);
const lastEndTime = elements.length ? elements[elements.length - 1].getEnd() : 0;
const videoMetadata = await getVideoMeta(videoSrc);
const canvasInstance = createCanvas(canvasProps);

// ❌ Avoid - Abbreviated names
const _td = editor.getTimelineData();
const _store = this.storeMap.get(contextId);
const _elements = getCurrentElements(currentTime, tracks);
const _lastEnd = elements.length ? elements[elements.length - 1].getEnd() : 0;
const vm = await getVideoMeta(videoSrc);
const c = createCanvas(canvasProps);
```

### 6. Constants
**Use UPPER_SNAKE_CASE for constants:**

```typescript
// ✅ Correct
export const TIMELINE_ELEMENT_TYPE = {
  VIDEO: "video",
  AUDIO: "audio",
  TEXT: "text",
};

export const PLAYER_STATE = {
  PLAYING: "Playing",
  PAUSED: "Paused",
};

export const CANVAS_OPERATIONS = {
  ADD: "add",
  REMOVE: "remove",
  UPDATE: "update",
};

// ❌ Avoid
export const timelineElementType = { };
export const playerState = { };
export const canvasOperations = { };
```

### 7. Interface Names
**Use PascalCase with descriptive names:**

```typescript
// ✅ Correct
export interface TimelineOperationContext { }
export interface ElementVisitor<T> { }
export type TimelineTrackData = { }
export interface VideoMeta { }
export interface CanvasProps { }

// ❌ Avoid
export interface timelineOperationContext { }
export interface elementVisitor<T> { }
export interface videoMeta { }
```

### 8. File Names
**Use kebab-case for file names:**

```typescript
// ✅ Correct
timeline.editor.ts
element-validator.ts
base.element.ts
timeline-context.tsx
video-editor.tsx
player-controls.tsx
media-manager.ts
get-video-metadata.ts

// ❌ Avoid
timelineEditor.ts
elementValidator.ts
baseElement.ts
timelineContext.tsx
videoEditor.tsx
playerControls.tsx
mediaManager.ts
getVideoMetadata.ts
```

### 9. Hook Names
**Use camelCase with 'use' prefix:**

```typescript
// ✅ Correct
export const useTimelineContext = () => { };
export const usePlayerControl = () => { };
export const useTwickCanvas = () => { };
export const useLivePlayerContext = () => { };

// ❌ Avoid
export const useTimelineContext = () => { };
export const use_player_control = () => { };
export const useTwickCanvas = () => { };
```

### 10. Component Names
**Use PascalCase for React components:**

```typescript
// ✅ Correct
export const VideoEditor = () => { };
export const PlayerControls = () => { };
export const TimelineManager = () => { };
export const LivePlayer = () => { };

// ❌ Avoid
export const videoEditor = () => { };
export const player_controls = () => { };
export const timelineManager = () => { };
```

## Code Style Standards

### 1. Import Organization
**Group imports in the following order:**

```typescript
// 1. External libraries
import { createContext, useContext, useState } from "react";
import { Canvas as FabricCanvas } from "fabric";
import { Rect, makeScene2D, View2D } from "@twick/2d";

// 2. Internal packages (with @twick prefix)
import { TrackElement } from "@twick/timeline";
import { Dimensions, Position } from "@twick/media-utils";

// 3. Relative imports (current package)
import { TimelineEditor } from "../core/editor/timeline.editor";
import { Track } from "../core/track/track";

// 4. Type imports
import type { ElementVisitor } from "../visitor/element-visitor";
import type { VideoMeta } from "./types";
```

### 2. Method Organization
**Organize methods in the following order:**

```typescript
export class ExampleClass {
  // 1. Constructor
  constructor() { }

  // 2. Abstract methods (if any)
  abstract accept<T>(visitor: ElementVisitor<T>): T;

  // 3. Public getter methods
  public getId(): string { }
  public getType(): string { }

  // 4. Public setter methods
  public setId(id: string) { return this; }
  public setType(type: string) { return this; }

  // 5. Public business logic methods
  public validate(): boolean { }
  public serialize(): object { }

  // 6. Protected methods
  protected internalMethod(): void { }

  // 7. Private methods
  private helperMethod(): void { }
}
```

### 3. Error Handling
**Use consistent error handling patterns:**

```typescript
// ✅ Correct - Specific error types
try {
  const isValid = this.validateElement(element);
  if (isValid) {
    this.elements.push(element);
    return true;
  }
} catch (error) {
  if (error instanceof ValidationError) {
    throw error;
  }
  throw new Error(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
}
```

### 4. Comments and Documentation
**Use JSDoc for public methods:**

```typescript
/**
 * Fetches metadata (width, height, duration) for a given video source.
 * If metadata has already been fetched and cached, it returns the cached data.
 *
 * @param videoSrc - The URL or path to the video file.
 * @returns A Promise that resolves to an object containing video metadata.
 */
export const getVideoMeta = (videoSrc: string): Promise<VideoMeta> => {
  // implementation
};
```

### 5. Type Safety
**Use strict typing, avoid `any` when possible:**

```typescript
// ✅ Correct - Specific types
protected props: VideoProps | AudioProps | TextProps;
export interface VideoMeta {
  width: number;
  height: number;
  duration: number;
}

// ❌ Avoid - Generic any
protected props: Record<string, any>;
export interface VideoMeta {
  [key: string]: any;
}
```

### 6. Export Organization
**Organize exports in the following order:**

```typescript
// 1. Types and interfaces
export type { VideoMeta, CanvasProps, TimelineTrackData };
export interface ElementVisitor<T> { }

// 2. Constants
export { TIMELINE_ELEMENT_TYPE, PLAYER_STATE, CANVAS_OPERATIONS };

// 3. Utility functions
export { getVideoMeta, createCanvas, getTotalDuration };

// 4. Classes
export { TimelineEditor, TrackElement, ElementValidator };

// 5. React components
export { VideoEditor, PlayerControls, TimelineManager };

// 6. Hooks
export { useTimelineContext, usePlayerControl, useTwickCanvas };

// 7. Default exports (if any)
export default VideoEditor;
```

## Package-Specific Guidelines

### Timeline Package
- Use visitor pattern consistently for element operations
- Maintain fluent interface for setter methods
- Use descriptive property names (startTime, endTime instead of s, e)

### Canvas Package
- Use descriptive function names for canvas operations
- Maintain consistent parameter naming
- Use proper TypeScript types for Fabric.js integration

### Media Utils Package
- Use descriptive function names for media operations
- Maintain consistent error handling for media loading
- Use proper caching mechanisms

### Video Editor Package
- Use PascalCase for React components
- Maintain consistent hook naming with 'use' prefix
- Use descriptive prop and state names

### Live Player Package
- Use consistent player state management
- Maintain proper event handling patterns
- Use descriptive method names for player operations

### Visualizer Package
- Use consistent scene management patterns
- Maintain proper animation handling
- Use descriptive track and element names

## Migration Checklist

When updating existing code to follow this style guide:

- [ ] Convert `function` declarations to `const` arrow functions
- [ ] Replace abbreviated property names with descriptive ones
- [ ] Replace abbreviated variable names with descriptive ones
- [ ] Ensure consistent getter/setter method naming
- [ ] Update import organization
- [ ] Add JSDoc comments to public methods
- [ ] Improve type safety by replacing `any` with specific types
- [ ] Ensure consistent error handling patterns
- [ ] Update file names to use kebab-case
- [ ] Ensure consistent constant naming (UPPER_SNAKE_CASE)
- [ ] Update component names to use PascalCase
- [ ] Update hook names to use camelCase with 'use' prefix