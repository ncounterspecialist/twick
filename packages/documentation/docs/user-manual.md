# Twick User Manual

Welcome to the comprehensive usage guide for the Twick Video Editor SDK. This document will walk you through integrating Twick into your project, using the editor, managing tracks and elements, adding add-ons like text effects and frame effects, and performing CRUD operations.

---

## 📋 Index

1. [Getting Started](#getting-started)
2. [Basic Editor Setup](#basic-editor-setup)
3. [Timeline Context & LivePlayer Context](#timeline-context--liveplayer-context)
    - [TimelineEditor Instance](#314-timelineeditor-instance)
    - [Automatic History Management](#315-automatic-history-management)
    - [Persistence Options](#316-persistence-options)
    - [Manual History Control](#317-manual-history-control)
    - [Timeline Actions](#317-timeline-actions)
    - [Change Detection](#318-change-detection)
    - [LivePlayerProvider Setup](#liveplayerprovider-setup)
    - [LivePlayerContext Features](#liveplayercontext-features)
        - [Player State Management](#321-player-state-management)
        - [Time Management](#322-time-management)
        - [Volume Control](#323-volume-control)
        - [Complete Context Interface](#complete-context-interface)
4. [Timeline Editor API Reference](#4-timeline-editor)
    - [Track Management](#41-track-management)
    - [Timeline Data Access](#42-timeline-data-access)
    - [Element Management](#43-element-management)
    - [Player Control Methods](#46-player-control-methods)
    - [Internal Methods](#47-internal-methods)
5. [Timeline Structure: Tracks & Elements](#5-timeline-structure-tracks--elements)
6. [Add-ons: Animations, Text Effects, Frame Effects](#6-add-ons-animations-text-effects-frame-effects)
    - [Adding Text Effects](#adding-text-effects)
    - [Adding Frame Effects](#adding-frame-effects)
7. [Example: Full Workflow](#7-example-full-workflow)
8. [Best Practices & Tips](#8-best-practices--tips)
9. [Troubleshooting & FAQ](#9-troubleshooting--faq)

---

## 1. Getting Started

### Installation of Twick Packages

Twick is organized as a monorepo using pnpm workspaces. To install Twick packages in your project:

#### Option 1: Using pnpm (Recommended)
```bash
# Install individual packages
pnpm add @twick/video-editor @twick/timeline @twick/live-player @twick/canvas

#### Option 2: Using npm
```bash
npm install @twick/video-editor @twick/timeline @twick/live-player @twick/canvas
```

#### Option 3: Using yarn
```bash
yarn add @twick/video-editor @twick/timeline @twick/live-player @twick/canvas
```

## 2. Basic Editor Setup

### Basic Example

```typescript
import VideoEditor, { INITIAL_TIMELINE_DATA } from "@twick/video-editor";
import "@twick/video-editor/dist/video-editor.css";
import { LivePlayerProvider } from "@twick/live-player";
import { TimelineProvider, useTimelineContext } from "@twick/timeline";

const MyVideoEditor = () => {
  const { editor } = useTimelineContext();
  return (
    <LivePlayerProvider>
      <TimelineProvider
        contextId={'my-editor'}
        initialData={INITIAL_TIMELINE_DATA}
      >
        <VideoEditor
          leftPanel={}
          rightPanel={}
          editorConfig={{
            canvasMode: true,
            videoProps: {
              width: 720,
              height: 1280,
            },
          }}
        />
      </TimelineProvider>
    </LivePlayerProvider>
  );
};
```

### Key concepts

### **2.1 LivePlayerProvider** 
This is a React context provider that manages the state of the video player, such as play/pause, current time, and volume. It should wrap your editor to enable playback features.

### **2.2 TimelineProvider**
This provider manages the timeline state, including tracks, elements, and undo/redo functionality. It should wrap the `VideoEditor` to provide timeline editing capabilities.

### **2.3 initialData** 
This prop sets the initial timeline structure for your editor. In the example, `INITIAL_TIMELINE_DATA` is used to define the default tracks and elements that appear when the editor loads.

##### INITIAL_TIMELINE_DATA
```typescript

// This is the default timeline data structure used by Twick's video editor. 
// It describes a timeline with a single track containing one text element.
//
// - `tracks`: An array of track objects. Each track can hold multiple elements.
//   - `type`: The type of track. Here, "element" means it's a standard track for timeline elements.
//   - `id`: Unique identifier for the track.
//   - `name`: Human-readable name for the track.
//   - `elements`: Array of elements (such as text, images, videos) on this track.
//     - Each element has:
//       - `id`: Unique identifier for the element.
//       - `trackId`: The ID of the track this element belongs to.
//       - `name`: Name of the element.
//       - `type`: The type of element. Here, "text" means it's a text overlay.
//       - `s`: Start time (in seconds) for when this element appears.
//       - `e`: End time (in seconds) for when this element disappears.
//       - `props`: Properties specific to the element type. For text, this includes:
//         - `text`: The string to display.
//         - `fill`: The color of the text (in hex).
// - `version`: The version of the timeline data format.

{
  tracks: [
    {
      type: "element",
      id: "t-sample",
      name: "sample",
      elements: [
        {
          id: "e-sample",
          trackId: "t-sample",
          name: "sample",
          type: "text",
          s: 0,
          e: 5,
          props: {
            text: "Twick Video Editor",
            fill: "#FFFFFF",
          },
        },
      ],
    },
  ],
  version: 1,
}
```

### **2.4 VideoEditor** 
The main editor component that provides the user interface for editing videos, tracks, and elements.

### **2.5 leftPanel** and **rightPanel**
These are optional props that allow you to inject custom React components into the left and right side panels of the editor UI, enabling further customization.

### **2.6 editorConfig**
This prop allows you to configure the editor's behavior and appearance, such as enabling canvas mode or setting the video's width and height.

### **2.6 editor**
The `editor` prop is a reference to the underlying editor instance. By accessing this prop, you can programmatically control the editor, invoke methods, or listen to events. This is useful for advanced integrations, automation, or when you need to trigger editor actions from outside the component tree.


## 3. Providers

### 3.1 TimeLine Context

#### Accessing and Using Timeline Context

The `TimelineProvider` and `useTimelineContext` hook expose a comprehensive set of features for managing timeline state, undo/redo operations, and timeline editing. Here's a complete breakdown of all available features:

#### TimelineProvider Configuration

```typescript
<TimelineProvider
  contextId={'my-editor'}           // Unique identifier for this timeline instance
  initialData={{                    // Optional initial timeline data
    tracks: TrackJSON[],
    version: number
  }}
  undoRedoPersistenceKey={'my-key'} 
  maxHistorySize={20}               
>
  {children}
</TimelineProvider>
```
- **contextId**: A unique string identifier for this timeline context instance. 

- **initialData**: The initial timeline data to load into the editor. This should be an object containing the tracks and version, typically matching your application's timeline data structure.

- **undoRedoPersistenceKey**: An optional string key used to persist the undo/redo history in local storage or another persistence layer. This allows users to retain their editing history across page reloads or sessions.

- **maxHistorySize**: The maximum number of undo/redo steps to keep in memory. This helps control memory usage and limits how far back users can undo or redo actions.


#### TimelineContext Features

When you use `useTimelineContext()`, you get access to the following features:

#### 3.1.1 **Core State Properties**
```typescript
const {
  contextId,        
  selectedItem,    
  totalDuration,    
  changeLog,      
  present,          
  timelineAction, 
} = useTimelineContext();
```

- `contextId`: The unique identifier for this timeline context instance. It denotes the unique identifier of timeline context.

- `selectedItem`: The currently selected item in the timeline, which could be a track, an element, or `null` if nothing is selected.

- `totalDuration`: The total duration (in seconds) of the timeline, automatically calculated based on the tracks and elements.

- `changeLog`: A counter that increments every time the timeline is modified. You can use this to detect when changes occur and trigger effects or updates.

- `present`: The current state of the timeline data (tracks, elements, etc.) as a plain object. This is useful for reading or exporting the current timeline structure.

- `timelineAction`: The most recent action performed on the timeline (such as 'add', 'remove', 'update'), which can be used to trigger custom logic or UI updates.

#### 3.1.2 **Undo/Redo State**
```typescript
const {
  canUndo,          
  canRedo,         
} = useTimelineContext();
```
- `canUndo`: A boolean value indicating whether there are actions in the history that can be undone.
- `canRedo`: A boolean value indicating whether there are actions in the history that can be redone.

#### 3.1.3 **State Management Functions**
```typescript
const {
  setSelectedItem,  
  setTimelineAction, 
} = useTimelineContext();
```
- `setSelectedItem`: A function to update the currently selected item in the timeline. You can use this to select tracks, elements, or clear the selection by passing null.

- `setTimelineAction`: A function to manually set the most recent timeline action (such as 'add', 'remove', or 'update'). This can be useful for triggering custom logic or UI updates in response to specific actions.


#### 3.1.4 **TimelineEditor Instance**
```typescript
const { editor } = useTimelineContext();
```

The `editor` instance provides all timeline manipulation methods, features of editor are explained in editor section

The TimelineProvider includes built-in undo/redo functionality with persistence:

#### 3.1.5 **Automatic History Management**
- Every timeline change is automatically recorded
- Configurable history size (default: 20 operations)
- Automatic cleanup of old history entries

#### 3.1.6 **Persistence Options**
```typescript
// Enable persistence with a unique key
<TimelineProvider
  undoRedoPersistenceKey="my-project-123"
  maxHistorySize={50}
>
  {children}
</TimelineProvider>
```

#### 3.1.7 **Manual History Control**
```typescript
const { editor } = useTimelineContext();

// Manual undo/redo
editor.undo();        // Undo last operation
editor.redo();        // Redo last operation
editor.resetHistory(); // Clear all history
```

#### 3.1.7 **Timeline Actions**

The `setTimelineAction` function allows you to trigger specific timeline operations:

```typescript
const { setTimelineAction } = useTimelineContext();

// Available action types (from TIMELINE_ACTION enum):
setTimelineAction('SET_PLAYER_STATE', 'PAUSED');
setTimelineAction('UPDATE_PLAYER_DATA', { tracks: [], version: 1 });
setTimelineAction('NONE', null);
```

#### 3.1.8 **Change Detection**

The `changeLog` property increments every time the timeline is modified, making it useful for detecting changes:

```typescript
const { changeLog } = useTimelineContext();

useEffect(() => {
  // This will run whenever the timeline changes
  console.log('Timeline changed:', changeLog);
}, [changeLog]);
```

### 3.2 LivePlayer Context

The `LivePlayerProvider` and `useLivePlayerContext` hook provide a centralized state management system for video player controls and playback state. This context manages all player-related state including playback status, timing, volume, and seeking functionality.

#### **LivePlayerProvider Setup**

```typescript
import { LivePlayerProvider } from "@twick/live-player";

const MyApp = () => {
  return (
    <LivePlayerProvider>
      <VideoEditor />
    </LivePlayerProvider>
  );
};
```

#### **LivePlayerContext Features**

When you use `useLivePlayerContext()`, you get access to the following features:

#### 3.2.1 **Player State Management**

```typescript
const {
  playerState,       
  setPlayerState,     
} = useLivePlayerContext();
```
- `playerState`: A string representing the current state of the player (e.g., "Playing", "Paused", "Refresh")

- `setPlayerState`: A function to update the player's state 


**Available Player States:**
```typescript
import { PLAYER_STATE } from "@twick/live-player";

// Available states:
PLAYER_STATE.PLAYING   // "Playing" - Video is currently playing
PLAYER_STATE.PAUSED    // "Paused" - Video is paused
PLAYER_STATE.REFRESH   // "Refresh" - Player is refreshing/updating
```

#### 3.2.2 **Time Management**

```typescript
const {
  currentTime,        // number: Current playback time in seconds
  seekTime,          // number: Target seek time in seconds
  setCurrentTime,    // (time: number) => void: Update current time
  setSeekTime,       // (time: number) => void: Set seek target time
} = useLivePlayerContext();
```

- `currentTime`: The current playback position of the video, in seconds.
- `seekTime`: The time (in seconds) you want to jump to in the video.
- `setCurrentTime`: Function to update the current playback time.
- `setSeekTime`: Function to set a new seek target time.

##### 3.2.3 **Volume Control**

```typescript
const {
  playerVolume,      // number: Current volume (0.0 to 1.0)
  setPlayerVolume,   // (volume: number) => void: Update volume
} = useLivePlayerContext();
```

- `playerVolume`: A number between 0.0 and 1.0 representing the current volume level of the player.
- `setPlayerVolume`: A function that allows you to update the player's volume by passing a new value (between 0.0 and 1.0).

#### **Complete Context Interface**

```typescript
type LivePlayerContextType = {
  // State
  playerState: string;           // Current player state
  currentTime: number;           // Current playback time
  seekTime: number;              // Target seek time
  playerVolume: number;          // Current volume (0.0-1.0)
  
  // Actions
  setSeekTime: (time: number) => void;           // Set seek time
  setPlayerState: (state: string) => void;       // Update player state
  setCurrentTime: (time: number) => void;        // Update current time
  setPlayerVolume: (volume: number) => void;     // Update volume
};
```



## 4. Timeline Editor

### Detailed TimelineEditor API Reference

The TimelineEditor provides a comprehensive API for managing timeline operations. All methods use the visitor pattern for element operations and automatically handle undo/redo history.

#### 4.1 **Track Management**

##### `addTrack(name: string): Track`
Creates a new track with a unique ID and adds it to the timeline.
```typescript
const newTrack = editor.addTrack("My Track");
console.log(newTrack.getId()); // "t-abc123..."
console.log(newTrack.getName()); // "My Track"
```

##### `getTrackById(id: string): Track | null`
Finds a track by its unique identifier.
```typescript
const track = editor.getTrackById("t-abc123");
if (track) {
  console.log("Found track:", track.getName());
}
```

##### `getTrackByName(name: string): Track | null`
Finds a track by its display name.
```typescript
const track = editor.getTrackByName("My Track");
if (track) {
  console.log("Found track ID:", track.getId());
}
```

##### `removeTrack(track: Track): void`
Removes a track and all its elements from the timeline.
```typescript
const track = editor.getTrackByName("My Track");
if (track) {
  editor.removeTrack(track);
}
```

##### `removeTrackById(id: string): void`
Removes a track by its ID.
```typescript
editor.removeTrackById("t-abc123");
```

##### `reorderTracks(tracks: Track[]): void`
Reorders tracks in the timeline. The array order determines the new track order.
```typescript
const currentTracks = editor.getTimelineData()?.tracks || [];
const reorderedTracks = [currentTracks[2], currentTracks[0], currentTracks[1]];
editor.reorderTracks(reorderedTracks);
```

#### 4.2 **Timeline Data Access**

##### `getTimelineData(): TimelineTrackData | null`
Returns the current timeline state including all tracks and version.
```typescript
const timelineData = editor.getTimelineData();
if (timelineData) {
  console.log("Version:", timelineData.version);
  console.log("Track count:", timelineData.tracks.length);
  console.log("Total duration:", timelineData.tracks.reduce((max, track) => 
    Math.max(max, track.getDuration()), 0));
}
```

##### `getLatestVersion(): number`
Returns the current version number of the timeline.
```typescript
const version = editor.getLatestVersion();
console.log("Current timeline version:", version);
```

##### `refresh(): void`
Refreshes the timeline data by re-saving the current state. Useful for triggering updates.
```typescript
// After making external changes to tracks
editor.refresh();
```

#### 4.3 **Element Management**

##### `addElementToTrack(track: Track, element: TrackElement): Promise<boolean>`
Adds an element to a specific track using the visitor pattern.
```typescript
const track = editor.getTrackByName("My Track");
if (track) {
  const textElement = new TextElement("Hello World");
  const success = await editor.addElementToTrack(track, textElement);
  if (success) {
    console.log("Element added successfully");
  }
}
```

##### `removeElement(element: TrackElement): boolean`
Removes an element from its track using the visitor pattern.
```typescript
const element = track.getElements()[0]; // Get first element
const success = editor.removeElement(element);
if (success) {
  console.log("Element removed successfully");
}
```

##### `updateElement(element: TrackElement): boolean`
Updates an existing element in its track using the visitor pattern.
```typescript
const textElement = track.getElements()[0] as TextElement;
textElement.setText("Updated text");
const success = editor.updateElement(textElement);
if (success) {
  console.log("Element updated successfully");
}
```

##### `splitElement(element: TrackElement, splitTime: number): Promise<SplitResult>`
Splits an element at a specific time point, creating two separate elements.
```typescript
const element = track.getElements()[0];
const splitResult = await editor.splitElement(element, 2.5); // Split at 2.5 seconds
if (splitResult.success) {
  console.log("Element split into two parts");
  console.log("First element:", splitResult.firstElement);
  console.log("Second element:", splitResult.secondElement);
}
```

##### `cloneElement(element: TrackElement): TrackElement | null`
Creates a copy of an element with a new ID but same properties.
```typescript
const originalElement = track.getElements()[0];
const clonedElement = editor.cloneElement(originalElement);
if (clonedElement) {
  // Add the cloned element to the same or different track
  await editor.addElementToTrack(track, clonedElement);
}
```

#### 4.4 **Project Management**

##### `loadProject({ tracks: TrackJSON[], version: number }): void`
Loads a complete project, replacing the current timeline state.
```typescript
const projectData = {
  tracks: [
    {
      id: "t-1",
      name: "Track 1",
      type: "element",
      elements: [
        {
          id: "e-1",
          type: "text",
          s: 0,
          e: 5,
          props: { text: "Hello", fontSize: 24 }
        }
      ]
    }
  ],
  version: 1
};

editor.loadProject(projectData);
```

##### `getContext(): TimelineOperationContext`
Returns the internal context object used by the editor.
```typescript
const context = editor.getContext();
console.log("Context ID:", context.contextId);
```

#### 4.5 **History Management**

##### `undo(): void`
Reverts the last operation, restoring the previous timeline state.
```typescript
if (editor.getTimelineData()?.tracks.length > 0) {
  editor.undo(); // Reverts the last change
}
```

##### `redo(): void`
Reapplies the last undone operation.
```typescript
editor.redo(); // Reapplies the last undone change
```

##### `resetHistory(): void`
Clears all undo/redo history and resets the timeline to empty state.
```typescript
editor.resetHistory(); // Clears all history and timeline
```

#### 4.6 **Player Control**

##### `pauseVideo(): void`
Pauses video playback by triggering a player state change.
```typescript
editor.pauseVideo(); // Pauses the video player
```

#### 4.7 **Internal Methods**

##### `setTimelineData(tracks: Track[], version?: number): TimelineTrackData`
Protected method that updates the timeline state and triggers history updates.
```typescript
// This is called internally by other methods
// It updates the timeline, increments version, and saves to history
```

##### `updateHistory(timelineTrackData: TimelineTrackData): void`
Protected method that saves the current state to undo/redo history.
```typescript
// This is called internally when timeline data changes
// It serializes tracks and updates the present state
```

## 5. Timeline Structure: Tracks & Elements

The Twick timeline is organized into a hierarchical structure of **tracks** and **elements**. Understanding this structure is fundamental to working with the video editor.

### **Timeline Hierarchy**

```
Timeline
├── Track 1 (Element Track)
│   ├── Text Element (0s - 5s)
│   ├── Image Element (2s - 8s)
│   └── Video Element (5s - 15s)
├── Track 2 (Audio Track)
│   ├── Audio Element (0s - 10s)
│   └── Audio Element (12s - 20s)
└── Track 3 (Caption Track)
    └── Caption Element (0s - 15s)
```

### **Tracks**

Tracks are containers that hold timeline elements. Each track has a specific purpose and can contain multiple elements that play over time.

#### **Track Properties**

```typescript
interface Track {
  id: string;           // Unique identifier (e.g., "t-abc123")
  name: string;         // Display name (e.g., "Main Video")
  type: string;         // Track type (e.g., "element", "audio")
  elements: TrackElement[]; // Array of timeline elements
}
```

#### **Track Management**

```typescript
const { editor } = useTimelineContext();

// Create a new track
const newTrack = editor.addTrack("My Track");

// Get track information
const trackId = newTrack.getId();
const trackName = newTrack.getName();
const trackElements = newTrack.getElements();

// Find tracks
const trackById = editor.getTrackById("t-abc123");
const trackByName = editor.getTrackByName("My Track");

// Remove tracks
editor.removeTrack(newTrack);
editor.removeTrackById("t-abc123");
```

#### **Track Validation**

Tracks automatically validate elements when they're added:

```typescript
// Validate a single element
const isValid = track.validateElement(element);

// Validate all elements in a track
const validation = track.validateAllElements();
console.log("Track valid:", validation.isValid);
validation.results.forEach(result => {
  if (!result.isValid) {
    console.error("Element errors:", result.errors);
  }
});
```

### **Elements**

Elements are the building blocks of your video timeline. Each element represents a media item, text, shape, or effect that appears at a specific time.

#### **Element Base Properties**

All elements inherit from `TrackElement` and have these common properties:

```typescript
interface TrackElement {
  id: string;           // Unique identifier (e.g., "e-xyz789")
  type: string;         // Element type (e.g., "text", "video")
  s: number;           // Start time in seconds
  e: number;           // End time in seconds
  trackId: string;     // Parent track ID
  name: string;        // Element name
  props: Record<string, any>; // Element-specific properties
  animation?: ElementAnimation; // Optional animation
}
```

#### **Supported Element Types**

Twick supports 8 different element types, each with unique properties and capabilities:

##### **1. Text Elements (`TEXT`)**

Text elements display customizable text overlays on your video.

```typescript
import { TextElement } from "@twick/timeline";

const textElement = new TextElement("Hello World");
textElement
  .setStart(0)           // Start at 0 seconds
  .setEnd(5)             // End at 5 seconds
  .setPosition({ x: 100, y: 200 })
  .setFontSize(48)
  .setFontFamily("Arial")
  .setFill("#FF0000")    // Red text
  .setTextAlign("center")
  .setRotation(45);      // 45-degree rotation
```

**Text Properties:**
- `text`: The text content to display
- `fill`: Text color (hex, rgb, or named color)
- `fontSize`: Font size in pixels
- `fontFamily`: Font family name
- `fontWeight`: Font weight (100-900)
- `fontStyle`: "normal" or "italic"
- `textAlign`: Text alignment ("left", "center", "right")
- `rotation`: Rotation angle in degrees
- `maxWidth`: Maximum text width for wrapping
- `textWrap`: Enable/disable text wrapping

##### **2. Video Elements (`VIDEO`)**

Video elements play video files with advanced controls.

```typescript
import { VideoElement } from "@twick/timeline";

const videoElement = new VideoElement("video.mp4", { width: 1920, height: 1080 });
videoElement
  .setStart(0)
  .setEnd(10)
  .setPosition({ x: 0, y: 0 })
  .setPlay(true)                    // Auto-play
  .setPlaybackRate(1.5)            // 1.5x speed
  .setStartAt(2)                   // Start video at 2 seconds
  .setVolume(0.8)                  // 80% volume
  .setMediaFilter("grayscale")     // Apply filter
  .setObjectFit("cover");          // How video fits container
```

**Video Properties:**
- `src`: Video file URL or path
- `play`: Whether to auto-play
- `playbackRate`: Playback speed multiplier
- `time`: Start time within the video
- `volume`: Audio volume (0.0 to 1.0)
- `mediaFilter`: Visual filter to apply
- `objectFit`: How video fits container ("cover", "contain", "fill")

##### **3. Image Elements (`IMAGE`)**

Image elements display static images with positioning and effects.

```typescript
import { ImageElement } from "@twick/timeline";

const imageElement = new ImageElement("image.jpg", { width: 1920, height: 1080 });
imageElement
  .setStart(2)
  .setEnd(8)
  .setPosition({ x: 100, y: 100 })
  .setObjectFit("contain")
  .setMediaFilter("sepia");
```

**Image Properties:**
- `src`: Image file URL or path
- `objectFit`: How image fits container
- `mediaFilter`: Visual filter to apply
- `rotation`: Rotation angle in degrees

##### **4. Audio Elements (`AUDIO`)**

Audio elements play audio files independently of video.

```typescript
import { AudioElement } from "@twick/timeline";

const audioElement = new AudioElement("audio.mp3");
audioElement
  .setStart(0)
  .setEnd(15)
  .setPlay(true)
  .setVolume(0.7)
  .setPlaybackRate(1.0);
```

**Audio Properties:**
- `src`: Audio file URL or path
- `play`: Whether to auto-play
- `volume`: Audio volume (0.0 to 1.0)
- `playbackRate`: Playback speed multiplier

##### **5. Caption Elements (`CAPTION`)**

Caption elements display subtitles with advanced styling options.

```typescript
import { CaptionElement } from "@twick/timeline";

const captionElement = new CaptionElement("This is a caption");
captionElement
  .setStart(0)
  .setEnd(5)
  .setPosition({ x: 0, y: 800 })
  .setCaptionStyle("word_by_word")
  .setFontSize(40)
  .setFill("#FFFFFF");
```

**Caption Properties:**
- `text`: Caption text content
- `captionStyle`: Display style ("highlight_bg", "word_by_word", "word_by_word_with_bg")
- `fill`: Text color
- `fontSize`: Font size
- `bgColor`: Background color (for highlight styles)

##### **6. Rectangle Elements (`RECT`)**

Rectangle elements create colored rectangles or backgrounds.

```typescript
import { RectElement } from "@twick/timeline";

const rectElement = new RectElement("#FF0000", { width: 200, height: 100 });
rectElement
  .setStart(0)
  .setEnd(5)
  .setPosition({ x: 50, y: 50 })
  .setRotation(30);
```

**Rectangle Properties:**
- `fill`: Fill color
- `width`: Rectangle width
- `height`: Rectangle height
- `rotation`: Rotation angle in degrees

##### **7. Circle Elements (`CIRCLE`)**

Circle elements create circular shapes.

```typescript
import { CircleElement } from "@twick/timeline";

const circleElement = new CircleElement("#00FF00", 50);
circleElement
  .setStart(0)
  .setEnd(5)
  .setPosition({ x: 100, y: 100 });
```

**Circle Properties:**
- `fill`: Fill color
- `radius`: Circle radius in pixels

##### **8. Icon Elements (`ICON`)**

Icon elements display SVG icons.
Icons from https://icones.js.org/collection/all can be used by providing their URLs directly as the `icon` property. For example, you can use an icon URL like `"https://icones.js.org/collection/all?icon=material-symbols:10k"` when creating an `IconElement`.

```typescript
import { IconElement } from "@twick/timeline";

const iconElement = new IconElement("https://icones.js.org/collection/all?icon=material-symbols:10k", "#FF0000");
iconElement
  .setStart(0)
  .setEnd(5)
  .setPosition({ x: 200, y: 200 })
  .setSize(64);
```

**Icon Properties:**
- `icon`: Icon name or SVG path
- `fill`: Icon color
- `size`: Icon size in pixels

### **Element Management**

#### **Adding Elements to Tracks**

```typescript
const { editor } = useTimelineContext();
const track = editor.getTrackByName("My Track");

if (track) {
  // Create and add a text element
  const textElement = new TextElement("Hello World");
  textElement.setStart(0).setEnd(5);
  
  const success = await editor.addElementToTrack(track, textElement);
  if (success) {
    console.log("Element added successfully");
  }
}
```

#### **Element Operations**

```typescript
// Update element properties
textElement.setText("Updated text");
textElement.setFill("#00FF00");
editor.updateElement(textElement);

// Remove elements
editor.removeElement(textElement);

// Clone elements
const clonedElement = editor.cloneElement(textElement);
if (clonedElement) {
  clonedElement.setStart(5).setEnd(10);
  await editor.addElementToTrack(track, clonedElement);
}

// Split elements
const splitResult = await editor.splitElement(textElement, 2.5);
if (splitResult.success) {
  console.log("Element split into two parts");
}
```

#### **Element Validation**

Elements are automatically validated when added to tracks:

```typescript
// Check if element is valid
const isValid = track.validateElement(element);

// Get validation errors
try {
  track.validateElement(element);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error("Validation errors:", error.errors);
    console.error("Validation warnings:", error.warnings);
  }
}
```

### **Best Practices**

1. **Organize by Type**: Use separate tracks for different element types
2. **Meaningful Names**: Give tracks and elements descriptive names
3. **Validate Early**: Check element validity before adding to timeline
4. **Handle Overlaps**: Be aware of element timing overlaps
5. **Use Proper Types**: Import and use the correct element classes
6. **Error Handling**: Always check operation success status

## 6. Add-ons: Animations, Text Effects, Frame Effects



### Adding Text Effects

Text effects add dynamic animations to text elements, making them appear in engaging ways. Twick supports 4 different text effects that can be applied to any text element.

#### **Available Text Effects**

##### **1. Typewriter Effect (`typewriter`)**

Animates text appearing one character at a time, mimicking a classic typewriter.

```typescript
import { ElementTextEffect } from "@twick/timeline";

const textEffect = new ElementTextEffect("typewriter");
textEffect
  .setDuration(3)        // 3 seconds total duration
  .setDelay(1)           // Wait 1 second before starting
  .setBufferTime(0.1);   // 0.1 seconds buffer at the end

// Apply to text element
textElement.setTextEffect(textEffect);
```

**Behavior:**
- Clears text initially and preserves element size
- Reveals one character at a time at consistent intervals
- Aligns text to left for consistent typing effect
- Supports delay, duration, and buffer time configuration

##### **2. Erase Effect (`erase`)**

Animates text disappearing letter by letter, simulating an erasing or backspace effect.

```typescript
const eraseEffect = new ElementTextEffect("erase");
eraseEffect
  .setDuration(2)        // 2 seconds to erase
  .setDelay(0.5)         // Wait 0.5 seconds before starting
  .setBufferTime(0.1);   // 0.1 seconds buffer

textElement.setTextEffect(eraseEffect);
```

**Behavior:**
- Preserves original element size
- Removes one character at a time from the end
- Works backwards through the text
- Maintains consistent timing intervals

##### **3. Elastic Effect (`elastic`)**

Applies a scaling animation with elastic easing for a "pop" or "bounce" effect.

```typescript
const elasticEffect = new ElementTextEffect("elastic");
elasticEffect
  .setDuration(1.5)      // 1.5 seconds animation
  .setDelay(0);          // Start immediately

textElement.setTextEffect(elasticEffect);
```

**Behavior:**
- Starts at zero scale (invisible)
- Scales up to full size with elastic bounce
- Uses easeOutElastic easing function
- Creates a dynamic "pop" appearance

##### **4. Stream Word Effect (`stream-word`)**

Animates text appearing word by word, creating a smooth streaming effect.

```typescript
const streamEffect = new ElementTextEffect("stream-word");
streamEffect
  .setDuration(4)        // 4 seconds total
  .setDelay(1)           // Wait 1 second
  .setBufferTime(0.2);   // 0.2 seconds buffer

textElement.setTextEffect(streamEffect);
```

**Behavior:**
- Splits text into words
- Reveals one word at a time
- Maintains consistent word intervals
- Preserves element size during animation

#### **Text Effect Properties**

All text effects support these common properties:

```typescript
interface ElementTextEffect {
  name: string;          // Effect type ("typewriter", "erase", "elastic", "stream-word")
  duration?: number;     // Total animation duration in seconds
  delay?: number;        // Delay before animation starts
  bufferTime?: number;   // Time reserved at end of animation (default: 0.1)
}
```

#### **Applying Text Effects**

```typescript
const { editor } = useTimelineContext();
const track = editor.getTrackByName("Text Track");

if (track) {
  // Create text element
  const textElement = new TextElement("Hello World");
  textElement
    .setStart(0)
    .setEnd(5)
    .setFontSize(48)
    .setFill("#FF0000");

  // Create and apply text effect
  const typewriterEffect = new ElementTextEffect("typewriter");
  typewriterEffect.setDuration(3).setDelay(1);
  textElement.setTextEffect(typewriterEffect);

  // Add to track
  await editor.addElementToTrack(track, textElement);
}
```

#### **Managing Text Effects**

```typescript
// Get current text effect
const currentEffect = textElement.getTextEffect();
if (currentEffect) {
  console.log("Effect:", currentEffect.getName());
  console.log("Duration:", currentEffect.getDuration());
}

// Update text effect
const newEffect = new ElementTextEffect("elastic");
newEffect.setDuration(2);
textElement.setTextEffect(newEffect);
editor.updateElement(textElement);

// Remove text effect
textElement.setTextEffect(undefined);
editor.updateElement(textElement);
```

#### **Text Effect Best Practices**

1. **Timing**: Ensure effect duration fits within element timeline
2. **Buffer Time**: Use buffer time to prevent abrupt endings
3. **Text Length**: Consider text length when setting duration
4. **Performance**: Longer texts may need longer durations
5. **Testing**: Preview effects to ensure smooth animation

### Adding Animations

Animations add dynamic motion and visual effects to elements, making them more engaging and professional. Twick supports 7 different animation types that can be applied to any element.

#### **Available Animations**

##### **1. Fade Animation (`fade`)**

Applies smooth opacity transitions for fade-in and fade-out effects.

```typescript
import { ElementAnimation } from "@twick/timeline";

const fadeAnimation = new ElementAnimation("fade");
fadeAnimation
  .setAnimate("both")        // "enter", "exit", or "both"
  .setInterval(0.5);         // Duration of fade transition

// Apply to element
element.setAnimation(fadeAnimation);
```

**Animation Modes:**
- **`enter`**: Starts transparent and fades in to fully opaque
- **`exit`**: Waits, then fades out to transparent
- **`both`**: Fades in, waits, then fades out

**Behavior:**
- Smooth opacity transitions
- Configurable transition duration
- Works with any element type
- Preserves element positioning

##### **2. Rise Animation (`rise`)**

Combines vertical motion with opacity for rising/falling effects.

```typescript
const riseAnimation = new ElementAnimation("rise");
riseAnimation
  .setAnimate("enter")       // "enter", "exit", or "both"
  .setDirection("up")        // "up" or "down"
  .setInterval(0.25)         // Movement duration
  .setIntensity(200);        // Offset distance in pixels

element.setAnimation(riseAnimation);
```

**Animation Modes:**
- **`enter`**: Starts offset and transparent, moves into position while fading in
- **`exit`**: Waits, then moves out of position while fading out
- **`both`**: Enters, waits, and exits in continuous sequence

**Directions:**
- **`up`**: Element rises from below to final position
- **`down`**: Element falls from above to final position

**Behavior:**
- Combines vertical movement with opacity
- Smooth easing transitions
- Configurable intensity (offset distance)
- Professional entrance/exit effects

##### **3. Breathe Animation (`breathe`)**

Applies smooth scaling to simulate a "breathing" motion.

```typescript
const breatheAnimation = new ElementAnimation("breathe");
breatheAnimation
  .setMode("in")             // "in" or "out"
  .setIntensity(0.5);        // Scale factor (0.5 = 50% size)

element.setAnimation(breatheAnimation);
```

**Animation Modes:**
- **`in`**: Gradually scales down (shrinks) to target intensity
- **`out`**: Starts scaled down, then grows back to original size

**Behavior:**
- Smooth scale transitions
- Configurable intensity (scale factor)
- Uses easeInSine/easeOutSine easing
- Creates organic, breathing motion

##### **4. Blur Animation (`blur`)**

Applies blur effects during enter/exit animations.

```typescript
const blurAnimation = new ElementAnimation("blur");
blurAnimation
  .setAnimate("both")        // "enter", "exit", or "both"
  .setInterval(0.3)          // Blur transition duration
  .setIntensity(25);         // Maximum blur strength

element.setAnimation(blurAnimation);
```

**Animation Modes:**
- **`enter`**: Starts blurred and gradually becomes clear
- **`exit`**: Starts clear and gradually becomes blurred
- **`both`**: Blurs in, clears, then blurs out

**Behavior:**
- Smooth blur transitions
- Configurable blur intensity
- Works with any element type
- Creates depth and focus effects

##### **5. Photo Rise Animation (`photo-rise`)**

Applies directional movement specifically for photo elements.

```typescript
const photoRiseAnimation = new ElementAnimation("photo-rise");
photoRiseAnimation
  .setDirection("up")        // "up", "down", "left", "right"
  .setIntensity(200);        // Offset distance in pixels

element.setAnimation(photoRiseAnimation);
```

**Available Directions:**
- **`up`**: Starts below and moves upward
- **`down`**: Starts above and moves downward
- **`left`**: Starts to the right and moves leftward
- **`right`**: Starts to the left and moves rightward

**Behavior:**
- Smooth directional movement
- Configurable intensity (offset distance)
- Optimized for photo elements
- Requires container reference

##### **6. Photo Zoom Animation (`photo-zoom`)**

Applies zoom-in or zoom-out effects to photo elements.

```typescript
const photoZoomAnimation = new ElementAnimation("photo-zoom");
photoZoomAnimation
  .setMode("in")             // "in" or "out"
  .setIntensity(1.5);        // Zoom scale multiplier

element.setAnimation(photoZoomAnimation);
```

**Animation Modes:**
- **`in`**: Starts zoomed in and smoothly scales back to original size
- **`out`**: Starts at normal size and smoothly scales up to target zoom level

**Behavior:**
- Smooth zoom transitions
- Configurable intensity (zoom multiplier)
- Optimized for photo elements
- Requires container reference

##### **7. Succession Animation (`succession`)**

Combines scaling and opacity for appearing/disappearing zoom effects.

```typescript
const successionAnimation = new ElementAnimation("succession");
successionAnimation
  .setAnimate("both")        // "enter", "exit", or "both"
  .setInterval(0.4);         // Animation duration

element.setAnimation(successionAnimation);
```

**Animation Modes:**
- **`enter`**: Starts scaled down and transparent, then scales up while fading in
- **`exit`**: Waits, then scales down while fading out
- **`both`**: Scales up and fades in, waits, then scales down and fades out

**Behavior:**
- Combines scaling with opacity
- Smooth transitions with delays
- Professional zoom effects
- Works with any element type

#### **Animation Properties**

All animations support these common properties:

```typescript
interface ElementAnimation {
  name: string;              // Animation type
  interval?: number;         // Duration of transitions (in seconds)
  intensity?: number;        // Effect strength (varies by animation)
  animate?: "enter" | "exit" | "both";  // Animation phase
  mode?: "in" | "out";       // Animation mode (for breathe/photo-zoom)
  direction?: "up" | "down" | "left" | "right" | "center"; // Movement direction
}
```

#### **Applying Animations**

```typescript
const { editor } = useTimelineContext();
const track = editor.getTrackByName("My Track");

if (track) {
  // Create element
  const textElement = new TextElement("Animated Text");
  textElement.setStart(0).setEnd(5);

  // Create and apply animation
  const fadeAnimation = new ElementAnimation("fade");
  fadeAnimation
    .setAnimate("both")
    .setInterval(0.5);
  
  textElement.setAnimation(fadeAnimation);

  // Add to track
  await editor.addElementToTrack(track, textElement);
}
```

#### **Managing Animations**

```typescript
// Get current animation
const currentAnimation = element.getAnimation();
if (currentAnimation) {
  console.log("Animation:", currentAnimation.getName());
  console.log("Mode:", currentAnimation.getAnimate());
  console.log("Intensity:", currentAnimation.getIntensity());
}

// Update animation
const newAnimation = new ElementAnimation("rise");
newAnimation.setDirection("up").setIntensity(150);
element.setAnimation(newAnimation);
editor.updateElement(element);

// Remove animation
element.setAnimation(undefined);
editor.updateElement(element);
```

#### **Animation Combinations**

You can combine animations with text effects and frame effects:

```typescript
// Text element with both animation and text effect
const textElement = new TextElement("Hello World");

// Add fade animation
const fadeAnimation = new ElementAnimation("fade");
fadeAnimation.setAnimate("enter").setInterval(0.3);
textElement.setAnimation(fadeAnimation);

// Add typewriter text effect
const typewriterEffect = new ElementTextEffect("typewriter");
typewriterEffect.setDuration(2);
textElement.setTextEffect(typewriterEffect);

// Add to track
await editor.addElementToTrack(track, textElement);
```

#### **Animation Best Practices**

1. **Timing**: Ensure animation duration fits within element timeline
2. **Performance**: Limit number of simultaneous animations
3. **Intensity**: Use appropriate intensity values for smooth effects
4. **Direction**: Choose directions that complement your content
5. **Combinations**: Test animation combinations for visual harmony
6. **Testing**: Preview animations to ensure smooth playback

#### **Advanced Animation Usage**

```typescript
// Complex animation sequence
const videoElement = new VideoElement("video.mp4", { width: 1920, height: 1080 });

// Start with fade in
const fadeIn = new ElementAnimation("fade");
fadeIn.setAnimate("enter").setInterval(0.5);
videoElement.setAnimation(fadeIn);

// After fade, add breathe effect
const breathe = new ElementAnimation("breathe");
breathe.setMode("in").setIntensity(0.8);
// Note: You can only have one animation per element
// Consider timing and sequencing carefully

// Add to track
await editor.addElementToTrack(track, videoElement);
```

#### **Animation Performance Tips**

1. **Optimize Duration**: Use shorter intervals for smoother playback
2. **Limit Effects**: Don't overload elements with too many effects
3. **Test Performance**: Preview complex animations on target devices
4. **Use Appropriate Types**: Choose animations suited to your content
5. **Consider Timing**: Coordinate animations across multiple elements

#### Frame Effects

Frame effects transform the visual appearance of **video and image elements only** by applying geometric transformations and styling effects. Unlike animations, frame effects can be applied in series with multiple effects on the same element, as long as their time ranges don't overlap.

#### **Available Frame Effects**

##### **1. Rectangle Frame Effect (`rect`)**

Applies rectangular frame transformations with customizable size, position, and corner radius.

```typescript
import { ElementFrameEffect } from "@twick/timeline";

const rectEffect = new ElementFrameEffect(0, 5); // Start at 0s, end at 5s
rectEffect.setProps({
  frameSize: [400, 300],           // Width: 400px, Height: 300px
  framePosition: { x: 100, y: 50 }, // Position the frame
  elementPosition: { x: 0, y: 0 },  // Position element within frame
  radius: 20,                       // Corner radius in pixels
  transitionDuration: 1.5,          // Animation duration
  transitionEasing: "easeInOut",    // Easing function
  objectFit: "cover"                // How element fits in frame
});

// Apply to video or image element
videoElement.addFrameEffect(rectEffect);
```

**Properties:**
- `frameSize`: [width, height] in pixels
- `framePosition`: {x, y} position of the frame
- `elementPosition`: {x, y} position of element within frame
- `radius`: Corner radius for rounded corners
- `transitionDuration`: Animation duration in seconds
- `transitionEasing`: Easing function ("linear", "easeIn", "easeOut", "easeInOut")
- `objectFit`: How element fits ("cover", "contain", "fill", "none")

##### **2. Circle Frame Effect (`circle`)**

Transforms elements into circular frames with smooth animations.

```typescript
const circleEffect = new ElementFrameEffect(2, 7); // Start at 2s, end at 7s
circleEffect.setProps({
  frameSize: [300, 300],            // Perfect circle (equal width/height)
  framePosition: { x: 200, y: 150 }, // Center position
  elementPosition: { x: 0, y: 0 },   // Element position within circle
  transitionDuration: 2,             // 2 seconds animation
  transitionEasing: "easeOut",       // Smooth easing
  objectFit: "cover"                 // Cover the circular area
});

videoElement.addFrameEffect(circleEffect);
```

**Behavior:**
- Automatically calculates radius as half the frame width
- Creates perfect circular shape
- Smoothly transitions from rectangular to circular
- Maintains aspect ratio and positioning

#### **Frame Effect Properties**

```typescript
interface FrameEffectProps {
  frameSize: [number, number];      // [width, height] in pixels
  framePosition?: { x: number, y: number }; // Frame position
  elementPosition?: { x: number, y: number }; // Element position within frame
  radius?: number;                  // Corner radius (for rect effect)
  transitionDuration: number;       // Animation duration in seconds
  transitionEasing?: string;        // Easing function
  objectFit?: string;               // Object fit mode
}
```

#### **Applying Frame Effects to Video and Image Elements**

Frame effects can only be applied to video and image elements:

```typescript
const { editor } = useTimelineContext();
const track = editor.getTrackByName("Video Track");

if (track) {
  // Create video element
  const videoElement = new VideoElement("video.mp4", { width: 1920, height: 1080 });
  videoElement.setStart(0).setEnd(10);

  // Create frame effect
  const frameEffect = new ElementFrameEffect(1, 6);
  frameEffect.setProps({
    frameSize: [500, 400],
    framePosition: { x: 100, y: 100 },
    radius: 25,
    transitionDuration: 2,
    transitionEasing: "easeInOut",
    objectFit: "cover"
  });

  // Add frame effect to video element
  videoElement.addFrameEffect(frameEffect);

  // Add to track
  await editor.addElementToTrack(track, videoElement);
}
```

#### **Multiple Frame Effects with Non-Overlapping Time Ranges**

You can apply multiple frame effects to the same video or image element, but their time ranges must not overlap:

```typescript
const videoElement = new VideoElement("video.mp4", { width: 1920, height: 1080 });
videoElement.setStart(0).setEnd(15);

// First frame effect: Rectangle from 0-3 seconds
const rectEffect = new ElementFrameEffect(0, 3);
rectEffect.setProps({
  frameSize: [400, 300],
  framePosition: { x: 100, y: 100 },
  radius: 0,
  transitionDuration: 1,
  objectFit: "cover"
});

// Second frame effect: Circle from 3-6 seconds (no overlap with first)
const circleEffect = new ElementFrameEffect(3, 6);
circleEffect.setProps({
  frameSize: [300, 300],
  framePosition: { x: 200, y: 150 },
  transitionDuration: 1,
  objectFit: "cover"
});

// Third frame effect: Rectangle from 6-9 seconds (no overlap with second)
const finalRectEffect = new ElementFrameEffect(6, 9);
finalRectEffect.setProps({
  frameSize: [500, 400],
  framePosition: { x: 50, y: 50 },
  radius: 20,
  transitionDuration: 1,
  objectFit: "cover"
});

// Add all frame effects to the video element
videoElement.addFrameEffect(rectEffect);
videoElement.addFrameEffect(circleEffect);
videoElement.addFrameEffect(finalRectEffect);
```

#### **Managing Multiple Frame Effects**

```typescript
// Get all frame effects
const frameEffects = videoElement.getFrameEffects();
console.log("Frame effects:", frameEffects.length);

// Check for overlapping time ranges
const hasOverlap = frameEffects.some((effect1, index1) => {
  return frameEffects.some((effect2, index2) => {
    if (index1 === index2) return false;
    return !(effect1.getEnd() <= effect2.getStart() || effect2.getEnd() <= effect1.getStart());
  });
});

if (hasOverlap) {
  console.warn("Frame effects have overlapping time ranges!");
}

// Update frame effects
videoElement.setFrameEffects([rectEffect, circleEffect, finalRectEffect]);

// Remove all frame effects
videoElement.setFrameEffects(undefined);
```

#### **Frame Effect Validation**

When adding frame effects, ensure:

1. **Element Type**: Only video and image elements support frame effects
2. **Time Ranges**: Effects must not overlap in time
3. **Duration**: Effect duration must fit within element timeline
4. **Properties**: All required properties are set correctly

```typescript
// Validation helper function
const validateFrameEffect = (element: TrackElement, frameEffect: ElementFrameEffect) => {
  // Check if element supports frame effects
  if (!(element instanceof VideoElement || element instanceof ImageElement)) {
    throw new Error("Frame effects can only be applied to video and image elements");
  }

  // Check if effect time range fits within element timeline
  if (frameEffect.getStart() < element.getStart() || frameEffect.getEnd() > element.getEnd()) {
    throw new Error("Frame effect time range must be within element timeline");
  }

  // Check for overlapping with existing frame effects
  const existingEffects = element.getFrameEffects() || [];
  const hasOverlap = existingEffects.some(existing => {
    return !(frameEffect.getEnd() <= existing.getStart() || existing.getEnd() <= frameEffect.getStart());
  });

  if (hasOverlap) {
    throw new Error("Frame effect time range overlaps with existing effects");
  }

  return true;
};
```

#### **Object Fit Modes**

Frame effects support different object fit modes:

- **`cover`**: Element covers entire frame, may crop
- **`contain`**: Element fits within frame, may have letterboxing
- **`fill`**: Element stretches to fill frame exactly
- **`none`**: Element maintains original size

#### **Easing Functions**

Available transition easing options:

- **`linear`**: Constant speed
- **`easeIn`**: Slow start, fast end
- **`easeOut`**: Fast start, slow end
- **`easeInOut`**: Slow start and end, fast middle

#### **Frame Effect Best Practices**

1. **Element Compatibility**: Only use with video and image elements
2. **Time Management**: Ensure non-overlapping time ranges
3. **Sizing**: Consider aspect ratios when setting frame sizes
4. **Positioning**: Use relative positioning for responsive designs
5. **Performance**: Limit number of simultaneous frame effects
6. **Object Fit**: Choose appropriate fit mode for your content
7. **Easing**: Use easing functions for natural animations
8. **Validation**: Always validate frame effects before applying

#### **Advanced Frame Effect Usage**

```typescript
// Complex frame effect sequence for video
const videoElement = new VideoElement("video.mp4", { width: 1920, height: 1080 });
videoElement.setStart(0).setEnd(20);

// Create a sequence of frame effects
const frameEffects = [
  // Start with rectangle
  new ElementFrameEffect(0, 4, {
    frameSize: [400, 300],
    radius: 0,
    transitionDuration: 1,
    objectFit: "cover"
  }),
  
  // Transition to circle
  new ElementFrameEffect(4, 8, {
    frameSize: [300, 300],
    transitionDuration: 1,
    objectFit: "cover"
  }),
  
  // Return to rectangle with rounded corners
  new ElementFrameEffect(8, 12, {
    frameSize: [500, 400],
    radius: 25,
    transitionDuration: 1,
    objectFit: "cover"
  }),
  
  // Final circle
  new ElementFrameEffect(12, 16, {
    frameSize: [350, 350],
    transitionDuration: 1,
    objectFit: "cover"
  })
];

// Apply all frame effects
frameEffects.forEach(effect => videoElement.addFrameEffect(effect));
```

## 7. Example: Full Workflow

This comprehensive example demonstrates a complete video editing workflow using all the features documented in this manual. We'll create a professional video with multiple tracks, various elements, text effects, animations, and frame effects.

### **Step 1: Installation and Setup**

First, install the required Twick packages:

```bash
# Install core packages
pnpm add @twick/video-editor @twick/timeline @twick/live-player @twick/canvas

# Or install all packages
pnpm add @twick/video-editor @twick/timeline @twick/live-player @twick/canvas @twick/media-utils @twick/visualizer
```

### **Step 2: Basic Application Setup**

```typescript
// App.tsx
import React from 'react';
import VideoEditor, { INITIAL_TIMELINE_DATA } from "@twick/video-editor";
import "@twick/video-editor/dist/video-editor.css";
import { LivePlayerProvider } from "@twick/live-player";
import { TimelineProvider } from "@twick/timeline";
import CustomVideoEditor from './components/CustomVideoEditor';

function App() {
  return (
    <LivePlayerProvider>
      <TimelineProvider
        contextId={'my-video-project'}
        initialData={INITIAL_TIMELINE_DATA}
        undoRedoPersistenceKey={'my-project-123'}
        maxHistorySize={50}
      >
        <CustomVideoEditor />
      </TimelineProvider>
    </LivePlayerProvider>
  );
}

export default App;
```

### **Step 3: Custom Video Editor Component**

```typescript
// components/CustomVideoEditor.tsx
import React, { useState, useEffect } from 'react';
import VideoEditor from "@twick/video-editor";
import { useTimelineContext } from "@twick/timeline";
import { useLivePlayerContext } from "@twick/live-player";
import {
  TextElement,
  VideoElement,
  ImageElement,
  AudioElement,
  RectElement,
  CircleElement,
  IconElement,
  CaptionElement,
  ElementTextEffect,
  ElementAnimation,
  ElementFrameEffect,
  Track,
  TIMELINE_ELEMENT_TYPE
} from "@twick/timeline";
import { AVAILABLE_TEXT_FONTS } from "@twick/video-editor";

const CustomVideoEditor: React.FC = () => {
  const { editor, selectedItem, totalDuration, changeLog, canUndo, canRedo } = useTimelineContext();
  const { playerState, setPlayerState, currentTime, setSeekTime, playerVolume, setPlayerVolume } = useLivePlayerContext();
  const [isLoading, setIsLoading] = useState(false);

  // Create a comprehensive video project
  const createVideoProject = async () => {
    setIsLoading(true);
    
    try {
      // Step 1: Create tracks
      const mainTrack = editor.addTrack("Main Video");
      const textTrack = editor.addTrack("Text Overlays");
      const audioTrack = editor.addTrack("Background Audio");
      const effectsTrack = editor.addTrack("Visual Effects");

      // Step 2: Add video element with frame effects
      const videoElement = new VideoElement("https://example.com/video.mp4", { width: 1920, height: 1080 });
      videoElement
        .setStart(0)
        .setEnd(15)
        .setPosition({ x: 0, y: 0 })
        .setPlay(true)
        .setVolume(0.8)
        .setPlaybackRate(1.0)
        .setObjectFit("cover");

      // Add multiple frame effects with non-overlapping time ranges
      const rectEffect = new ElementFrameEffect(0, 3);
      rectEffect.setProps({
        frameSize: [800, 600],
        framePosition: { x: 100, y: 100 },
        radius: 0,
        transitionDuration: 1,
        objectFit: "cover"
      });

      const circleEffect = new ElementFrameEffect(3, 6);
      circleEffect.setProps({
        frameSize: [600, 600],
        framePosition: { x: 200, y: 150 },
        transitionDuration: 1,
        objectFit: "cover"
      });

      const finalRectEffect = new ElementFrameEffect(6, 9);
      finalRectEffect.setProps({
        frameSize: [900, 700],
        framePosition: { x: 50, y: 50 },
        radius: 25,
        transitionDuration: 1,
        objectFit: "cover"
      });

      videoElement.addFrameEffect(rectEffect);
      videoElement.addFrameEffect(circleEffect);
      videoElement.addFrameEffect(finalRectEffect);

      // Add fade animation to video
      const fadeAnimation = new ElementAnimation("fade");
      fadeAnimation.setAnimate("enter").setInterval(0.5);
      videoElement.setAnimation(fadeAnimation);

      await editor.addElementToTrack(mainTrack, videoElement);

      // Step 3: Add text elements with effects
      const titleElement = new TextElement("Welcome to Twick!");
      titleElement
        .setStart(1)
        .setEnd(5)
        .setPosition({ x: 100, y: 100 })
        .setFontSize(72)
        .setFontFamily(AVAILABLE_TEXT_FONTS.LUCKIEST_GUY)
        .setFill("#FF6B35")
        .setTextAlign("center")
        .setRotation(0);

      // Add typewriter text effect
      const typewriterEffect = new ElementTextEffect("typewriter");
      typewriterEffect.setDuration(2).setDelay(0.5).setBufferTime(0.1);
      titleElement.setTextEffect(typewriterEffect);

      // Add rise animation
      const riseAnimation = new ElementAnimation("rise");
      riseAnimation.setAnimate("enter").setDirection("up").setIntensity(150);
      titleElement.setAnimation(riseAnimation);

      await editor.addElementToTrack(textTrack, titleElement);

      // Add subtitle with elastic effect
      const subtitleElement = new TextElement("Professional Video Editing Made Easy");
      subtitleElement
        .setStart(3)
        .setEnd(8)
        .setPosition({ x: 100, y: 250 })
        .setFontSize(48)
        .setFontFamily(AVAILABLE_TEXT_FONTS.ROBOTO)
        .setFill("#FFFFFF")
        .setTextAlign("center")
        .setFontWeight(300);

      // Add elastic animation
      const elasticAnimation = new ElementAnimation("elastic");
      elasticAnimation.setDuration(1.5).setDelay(0);
      subtitleElement.setAnimation(elasticAnimation);

      await editor.addElementToTrack(textTrack, subtitleElement);

      // Step 4: Add image element with effects
      const imageElement = new ImageElement("https://example.com/logo.png", { width: 1920, height: 1080 });
      imageElement
        .setStart(5)
        .setEnd(12)
        .setPosition({ x: 800, y: 400 })
        .setObjectFit("contain");

      // Add photo zoom animation
      const photoZoomAnimation = new ElementAnimation("photo-zoom");
      photoZoomAnimation.setMode("in").setIntensity(1.3);
      imageElement.setAnimation(photoZoomAnimation);

      await editor.addElementToTrack(effectsTrack, imageElement);

      // Step 5: Add audio element
      const audioElement = new AudioElement("https://example.com/background-music.mp3");
      audioElement
        .setStart(0)
        .setEnd(15)
        .setPlay(true)
        .setVolume(0.3)
        .setPlaybackRate(1.0);

      await editor.addElementToTrack(audioTrack, audioElement);

      // Step 6: Add caption element
      const captionElement = new CaptionElement("This is a professional video created with Twick");
      captionElement
        .setStart(8)
        .setEnd(12)
        .setPosition({ x: 0, y: 800 })
        .setCaptionStyle("word_by_word")
        .setFontSize(40)
        .setFill("#FFFFFF");

      await editor.addElementToTrack(textTrack, captionElement);

      // Step 7: Add decorative elements
      const rectElement = new RectElement("#FF6B35", { width: 200, height: 100 });
      rectElement
        .setStart(10)
        .setEnd(15)
        .setPosition({ x: 50, y: 50 })
        .setRotation(45);

      // Add breathe animation
      const breatheAnimation = new ElementAnimation("breathe");
      breatheAnimation.setMode("in").setIntensity(0.7);
      rectElement.setAnimation(breatheAnimation);

      await editor.addElementToTrack(effectsTrack, rectElement);

      const circleElement = new CircleElement("#4ECDC4", 75);
      circleElement
        .setStart(12)
        .setEnd(15)
        .setPosition({ x: 1500, y: 800 });

      // Add succession animation
      const successionAnimation = new ElementAnimation("succession");
      successionAnimation.setAnimate("enter").setInterval(0.4);
      circleElement.setAnimation(successionAnimation);

      await editor.addElementToTrack(effectsTrack, circleElement);

      // Step 8: Add icon element
      const iconElement = new IconElement("heart", "#FF6B35");
      iconElement
        .setStart(13)
        .setEnd(15)
        .setPosition({ x: 1700, y: 100 })
        .setSize(64);

      // Add blur animation
      const blurAnimation = new ElementAnimation("blur");
      blurAnimation.setAnimate("both").setInterval(0.3).setIntensity(15);
      iconElement.setAnimation(blurAnimation);

      await editor.addElementToTrack(effectsTrack, iconElement);

      console.log("Video project created successfully!");
      console.log("Total duration:", totalDuration);
      console.log("Track count:", editor.getTimelineData()?.tracks.length);

    } catch (error) {
      console.error("Error creating video project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load existing project
  const loadProject = async (projectData: any) => {
    try {
      editor.loadProject(projectData);
      console.log("Project loaded successfully");
    } catch (error) {
      console.error("Error loading project:", error);
    }
  };

  // Save current project
  const saveProject = () => {
    const currentState = editor.getTimelineData();
    if (currentState) {
      const projectJSON = {
        tracks: currentState.tracks.map(track => track.serialize()),
        version: currentState.version
      };
      
      // Save to localStorage or send to server
      localStorage.setItem('twick-project', JSON.stringify(projectJSON));
      console.log("Project saved successfully");
    }
  };

  // Export project
  const exportProject = () => {
    const currentState = editor.getTimelineData();
    if (currentState) {
      const projectJSON = {
        tracks: currentState.tracks.map(track => track.serialize()),
        version: currentState.version,
        metadata: {
          totalDuration,
          trackCount: currentState.tracks.length,
          elementCount: currentState.tracks.reduce((total, track) => 
            total + track.getElements().length, 0),
          createdAt: new Date().toISOString()
        }
      };
      
      // Create downloadable file
      const blob = new Blob([JSON.stringify(projectJSON, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'twick-project.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="video-editor-container">
      {/* Control Panel */}
      <div className="control-panel">
        <h2>Twick Video Editor</h2>
        
        <div className="controls">
          <button 
            onClick={createVideoProject} 
            disabled={isLoading}
            className="btn btn-primary"
          >
            {isLoading ? "Creating..." : "Create Sample Project"}
          </button>
          
          <button onClick={saveProject} className="btn btn-secondary">
            Save Project
          </button>
          
          <button onClick={exportProject} className="btn btn-secondary">
            Export Project
          </button>
          
          <button onClick={() => editor.undo()} disabled={!canUndo} className="btn btn-outline">
            Undo
          </button>
          
          <button onClick={() => editor.redo()} disabled={!canRedo} className="btn btn-outline">
            Redo
          </button>
        </div>

        <div className="project-info">
          <p>Duration: {totalDuration.toFixed(2)}s</p>
          <p>Changes: {changeLog}</p>
          <p>Player State: {playerState}</p>
          <p>Current Time: {currentTime.toFixed(2)}s</p>
        </div>

        <div className="volume-control">
          <label>Volume:</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={playerVolume}
            onChange={(e) => setPlayerVolume(parseFloat(e.target.value))}
          />
          <span>{(playerVolume * 100).toFixed(0)}%</span>
        </div>
      </div>

      {/* Video Editor */}
      <VideoEditor
        leftPanel={<div className="left-panel">Custom Controls</div>}
        rightPanel={<div className="right-panel">Properties Panel</div>}
        editorConfig={{
          canvasMode: true,
          videoProps: {
            width: 1920,
            height: 1080,
          },
        }}
      />
    </div>
  );
};

export default CustomVideoEditor;
```

### **Step 4: Custom Controls Component**

```typescript
// components/CustomControls.tsx
import React from 'react';
import { useTimelineContext } from "@twick/timeline";
import { useLivePlayerContext } from "@twick/live-player";
import { PLAYER_STATE } from "@twick/live-player";

const CustomControls: React.FC = () => {
  const { editor, selectedItem } = useTimelineContext();
  const { playerState, setPlayerState, currentTime, setSeekTime } = useLivePlayerContext();

  const handlePlayPause = () => {
    if (playerState === PLAYER_STATE.PLAYING) {
      setPlayerState(PLAYER_STATE.PAUSED);
    } else {
      setPlayerState(PLAYER_STATE.PLAYING);
    }
  };

  const handleSeek = (time: number) => {
    setSeekTime(time);
  };

  const addTextElement = () => {
    if (selectedItem instanceof Track) {
      const textElement = new TextElement("New Text");
      textElement.setStart(currentTime).setEnd(currentTime + 3);
      editor.addElementToTrack(selectedItem, textElement);
    }
  };

  const addRectElement = () => {
    if (selectedItem instanceof Track) {
      const rectElement = new RectElement("#FF0000", { width: 100, height: 100 });
      rectElement.setStart(currentTime).setEnd(currentTime + 3);
      editor.addElementToTrack(selectedItem, rectElement);
    }
  };

  return (
    <div className="custom-controls">
      <h3>Custom Controls</h3>
      
      <div className="playback-controls">
        <button onClick={handlePlayPause}>
          {playerState === PLAYER_STATE.PLAYING ? "⏸️ Pause" : "▶️ Play"}
        </button>
        
        <input
          type="range"
          min="0"
          max={totalDuration || 100}
          value={currentTime}
          onChange={(e) => handleSeek(parseFloat(e.target.value))}
          className="seek-slider"
        />
        
        <span>{currentTime.toFixed(2)}s</span>
      </div>

      <div className="element-controls">
        <button onClick={addTextElement} disabled={!(selectedItem instanceof Track)}>
          Add Text
        </button>
        
        <button onClick={addRectElement} disabled={!(selectedItem instanceof Track)}>
          Add Rectangle
        </button>
      </div>

      <div className="track-info">
        <h4>Selected Item:</h4>
        {selectedItem ? (
          <div>
            <p>Type: {selectedItem.constructor.name}</p>
            <p>ID: {selectedItem.getId()}</p>
            {selectedItem instanceof Track && (
              <p>Elements: {selectedItem.getElements().length}</p>
            )}
          </div>
        ) : (
          <p>No item selected</p>
        )}
      </div>
    </div>
  );
};

export default CustomControls;
```

### **Step 5: CSS Styling**

```css
/* styles/video-editor.css */
.video-editor-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #1a1a1a;
  color: white;
}

.control-panel {
  padding: 20px;
  background: #2a2a2a;
  border-bottom: 1px solid #444;
}

.controls {
  display: flex;
  gap: 10px;
  margin: 15px 0;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-outline {
  background: transparent;
  color: #007bff;
  border: 1px solid #007bff;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.project-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  margin: 15px 0;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.volume-control input[type="range"] {
  width: 100px;
}

.custom-controls {
  padding: 20px;
  background: #2a2a2a;
  height: 100%;
  overflow-y: auto;
}

.playback-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 15px 0;
}

.seek-slider {
  flex: 1;
  height: 5px;
  border-radius: 3px;
  background: #444;
  outline: none;
}

.element-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 15px 0;
}

.track-info {
  margin-top: 20px;
  padding: 15px;
  background: #333;
  border-radius: 5px;
}

.left-panel, .right-panel {
  padding: 20px;
  background: #2a2a2a;
  height: 100%;
  overflow-y: auto;
}
```

### **Step 6: Running the Application**

```bash
# Start the development server
npm run dev

# Or with pnpm
pnpm dev
```

### **What This Example Demonstrates:**

1. **Complete Setup**: Installation, provider configuration, and basic structure
2. **Timeline Management**: Creating tracks, adding elements, and managing timeline state
3. **Element Types**: All 8 element types (text, video, image, audio, caption, rect, circle, icon)
4. **Text Effects**: Typewriter effect with proper configuration
5. **Animations**: 7 different animation types (fade, rise, elastic, blur, photo-rise, photo-zoom, succession)
6. **Frame Effects**: Multiple frame effects with non-overlapping time ranges
7. **State Management**: Timeline context, live player context, and state synchronization
8. **Project Management**: Save, load, and export functionality
9. **Custom Controls**: Building custom UI components
10. **Best Practices**: Error handling, validation, and performance considerations

### **Key Features Showcased:**

- **22 Available Fonts**: Using different font families from the constants
- **Multiple Effects**: Combining animations, text effects, and frame effects
- **Time Management**: Proper timing and non-overlapping effects
- **Element Validation**: Type checking and error handling
- **Performance**: Efficient element management and state updates
- **User Experience**: Intuitive controls and real-time feedback

This comprehensive example provides a complete foundation for building professional video editing applications with Twick, demonstrating all the features and best practices covered in this user manual.

## 8. Best Practices & Tips

This section provides recommended patterns, optimization strategies, and customization tips for building robust video editing applications with Twick.

### **8.1 State Management Patterns**

#### **Provider Hierarchy Best Practices**

```typescript
// ✅ Recommended: Proper provider hierarchy
function App() {
  return (
    <LivePlayerProvider>
      <TimelineProvider
        contextId={'unique-project-id'}
        initialData={INITIAL_TIMELINE_DATA}
        undoRedoPersistenceKey={'project-persistence-key'}
        maxHistorySize={50}
      >
        <VideoEditor />
      </TimelineProvider>
    </LivePlayerProvider>
  );
}

// ❌ Avoid: Missing providers or wrong order
function App() {
  return (
    <TimelineProvider>
      <VideoEditor /> {/* Missing LivePlayerProvider */}
    </TimelineProvider>
  );
}
```

#### **Context Usage Patterns**

```typescript
// ✅ Recommended: Destructure only needed values
const { editor, selectedItem, totalDuration } = useTimelineContext();
const { playerState, currentTime, setPlayerState } = useLivePlayerContext();

// ✅ Recommended: Use specific state setters
const handleElementUpdate = (element: TrackElement) => {
  try {
    const success = editor.updateElement(element);
    if (!success) {
      console.warn('Failed to update element');
    }
  } catch (error) {
    console.error('Error updating element:', error);
  }
};

// ❌ Avoid: Accessing all context values unnecessarily
const timelineContext = useTimelineContext(); // Don't access everything
```

#### **Performance Optimization**

```typescript
// ✅ Recommended: Memoize expensive operations
const memoizedElements = useMemo(() => {
  return track.getElements().filter(element => 
    element.getStart() <= currentTime && element.getEnd() >= currentTime
  );
}, [track, currentTime]);

// ✅ Recommended: Batch operations
const batchAddElements = async (elements: TrackElement[]) => {
  const results = await Promise.all(
    elements.map(element => editor.addElementToTrack(track, element))
  );
  return results.every(result => result);
};

// ❌ Avoid: Individual operations in loops
elements.forEach(element => {
  editor.addElementToTrack(track, element); // Don't do this
});
```

### **8.2 Element Management Best Practices**

#### **Element Creation Patterns**

```typescript
// ✅ Recommended: Fluent API with proper validation
const createTextElement = (text: string, start: number, end: number) => {
  const element = new TextElement(text);
  
  // Validate time ranges
  if (start >= end) {
    throw new Error('Start time must be before end time');
  }
  
  return element
    .setStart(start)
    .setEnd(end)
    .setPosition({ x: 100, y: 100 })
    .setFontSize(48)
    .setFontFamily(AVAILABLE_TEXT_FONTS.ROBOTO);
};

// ✅ Recommended: Element factory functions
const createVideoElement = (url: string, duration: number) => {
  return new VideoElement(url, { width: 1920, height: 1080 })
    .setStart(0)
    .setEnd(duration)
    .setPlay(true)
    .setVolume(0.8);
};
```

#### **Effect Application Patterns**

```typescript
// ✅ Recommended: Validate effect compatibility
const applyTextEffect = (element: TextElement, effectName: string) => {
  if (!(element instanceof TextElement)) {
    throw new Error('Text effects can only be applied to text elements');
  }
  
  const effect = new ElementTextEffect(effectName);
  effect.setDuration(2).setDelay(0.5);
  element.setTextEffect(effect);
};

// ✅ Recommended: Frame effect validation
const applyFrameEffects = (element: VideoElement | ImageElement, effects: ElementFrameEffect[]) => {
  // Validate element type
  if (!(element instanceof VideoElement || element instanceof ImageElement)) {
    throw new Error('Frame effects can only be applied to video and image elements');
  }
  
  // Validate non-overlapping time ranges
  for (let i = 0; i < effects.length; i++) {
    for (let j = i + 1; j < effects.length; j++) {
      const effect1 = effects[i];
      const effect2 = effects[j];
      
      if (effect1.getStart() < effect2.getEnd() && effect1.getEnd() > effect2.getStart()) {
        throw new Error('Frame effects cannot have overlapping time ranges');
      }
    }
  }
  
  effects.forEach(effect => element.addFrameEffect(effect));
};
```

### **8.3 Project Management Best Practices**

#### **Save and Load Patterns**

```typescript
// ✅ Recommended: Comprehensive project saving
const saveProject = () => {
  const timelineData = editor.getTimelineData();
  if (!timelineData) return null;
  
  const projectData = {
    tracks: timelineData.tracks.map(track => track.serialize()),
    version: timelineData.version,
    metadata: {
      totalDuration: timelineData.tracks.reduce((max, track) => 
        Math.max(max, track.getElements().reduce((trackMax, element) => 
          Math.max(trackMax, element.getEnd()), 0)), 0),
      trackCount: timelineData.tracks.length,
      elementCount: timelineData.tracks.reduce((total, track) => 
        total + track.getElements().length, 0),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    }
  };
  
  // Save to localStorage with error handling
  try {
    localStorage.setItem('twick-project', JSON.stringify(projectData));
    return projectData;
  } catch (error) {
    console.error('Failed to save project:', error);
    return null;
  }
};

// ✅ Recommended: Safe project loading
const loadProject = (projectData: any) => {
  try {
    // Validate project structure
    if (!projectData.tracks || !Array.isArray(projectData.tracks)) {
      throw new Error('Invalid project structure');
    }
    
    // Validate version
    if (typeof projectData.version !== 'number') {
      throw new Error('Invalid project version');
    }
    
    editor.loadProject(projectData);
    console.log('Project loaded successfully');
    return true;
  } catch (error) {
    console.error('Failed to load project:', error);
    return false;
  }
};
```

#### **Auto-save Implementation**

```typescript
// ✅ Recommended: Auto-save with debouncing
const useAutoSave = (editor: TimelineEditor, interval: number = 30000) => {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      const projectData = saveProject();
      if (projectData) {
        setLastSaved(new Date());
      }
    }, interval);
    
    return () => clearInterval(intervalId);
  }, [editor, interval]);
  
  return { lastSaved };
};
```

### **8.4 Customization Tips**

#### **Custom UI Components**

```typescript
// ✅ Recommended: Custom control panel
const CustomControlPanel: React.FC = () => {
  const { editor, selectedItem } = useTimelineContext();
  const { playerState, setPlayerState } = useLivePlayerContext();
  
  const handleAddElement = (elementType: string) => {
    if (!(selectedItem instanceof Track)) return;
    
    const element = createElementByType(elementType);
    editor.addElementToTrack(selectedItem, element);
  };
  
  return (
    <div className="custom-control-panel">
      <div className="element-buttons">
        <button onClick={() => handleAddElement('text')}>Add Text</button>
        <button onClick={() => handleAddElement('image')}>Add Image</button>
        <button onClick={() => handleAddElement('video')}>Add Video</button>
      </div>
      
      <div className="playback-controls">
        <button onClick={() => setPlayerState(PLAYER_STATE.PLAYING)}>
          Play
        </button>
        <button onClick={() => setPlayerState(PLAYER_STATE.PAUSED)}>
          Pause
        </button>
      </div>
    </div>
  );
};
```

#### **Custom Styling**

```css
/* ✅ Recommended: Custom video editor styling */
.twick-video-editor {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --background-color: #1a1a1a;
  --text-color: #ffffff;
  --border-color: #444444;
  
  background: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
}

/* Custom timeline styling */
.twick-timeline {
  background: var(--background-color);
  border-top: 1px solid var(--border-color);
}

/* Custom track styling */
.twick-track {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  margin: 2px 0;
  border-radius: 4px;
}

/* Custom element styling */
.twick-element {
  border: 2px solid var(--primary-color);
  border-radius: 4px;
  transition: all 0.2s ease;
}

.twick-element:hover {
  border-color: #0056b3;
  transform: scale(1.02);
}

.twick-element.selected {
  border-color: #28a745;
  box-shadow: 0 0 10px rgba(40, 167, 69, 0.3);
}
```

### **8.5 Performance Optimization Tips**

#### **Memory Management**

```typescript
// ✅ Recommended: Cleanup unused elements
const cleanupUnusedElements = (track: Track) => {
  const elements = track.getElements();
  const currentTime = getCurrentTime();
  
  // Remove elements that are far in the past
  const unusedElements = elements.filter(element => 
    element.getEnd() < currentTime - 60 // Remove elements 60 seconds in the past
  );
  
  unusedElements.forEach(element => {
    editor.removeElement(element);
  });
};

// ✅ Recommended: Limit history size
const configureHistory = (maxSize: number = 50) => {
  // Set reasonable history size to prevent memory issues
  if (maxSize > 100) {
    console.warn('Large history size may impact performance');
  }
};
```

#### **Rendering Optimization**

```typescript
// ✅ Recommended: Virtual scrolling for large timelines
const useVirtualTimeline = (elements: TrackElement[], viewportHeight: number) => {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 50 });
  
  const visibleElements = useMemo(() => {
    return elements.slice(visibleRange.start, visibleRange.end);
  }, [elements, visibleRange]);
  
  return { visibleElements, setVisibleRange };
};

// ✅ Recommended: Debounced updates
const useDebouncedUpdate = (callback: Function, delay: number = 300) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  return useCallback((...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
};
```

### **8.6 Error Handling Best Practices**

```typescript
// ✅ Recommended: Comprehensive error handling
const safeElementOperation = async (operation: () => Promise<boolean>) => {
  try {
    const result = await operation();
    if (!result) {
      throw new Error('Operation failed');
    }
    return result;
  } catch (error) {
    console.error('Element operation failed:', error);
    // Show user-friendly error message
    showErrorMessage('Failed to perform operation. Please try again.');
    return false;
  }
};

// ✅ Recommended: Validation utilities
const validateElement = (element: TrackElement) => {
  const errors: string[] = [];
  
  if (element.getStart() < 0) {
    errors.push('Start time cannot be negative');
  }
  
  if (element.getEnd() <= element.getStart()) {
    errors.push('End time must be after start time');
  }
  
  if (element instanceof VideoElement && !element.getSrc()) {
    errors.push('Video element must have a source URL');
  }
  
  return errors;
};
```

## 9. Troubleshooting & FAQ

This section addresses common issues, provides solutions, and answers frequently asked questions about using Twick.

### **9.1 Common Issues and Solutions**

#### **Provider Context Issues**

**Problem**: `useTimelineContext` or `useLivePlayerContext` returns undefined
```typescript
// ❌ Error: Cannot read properties of undefined
const { editor } = useTimelineContext(); // editor is undefined
```

**Solution**: Ensure proper provider hierarchy
```typescript
// ✅ Fix: Wrap components with required providers
function App() {
  return (
    <LivePlayerProvider>
      <TimelineProvider contextId="my-project">
        <YourComponent />
      </TimelineProvider>
    </LivePlayerProvider>
  );
}
```

**Problem**: Multiple timeline contexts conflict
```typescript
// ❌ Error: Context ID already exists
<TimelineProvider contextId="same-id">
  <Component1 />
</TimelineProvider>
<TimelineProvider contextId="same-id"> {/* Same ID */}
  <Component2 />
</TimelineProvider>
```

**Solution**: Use unique context IDs
```typescript
// ✅ Fix: Use unique context IDs
<TimelineProvider contextId="project-1">
  <Component1 />
</TimelineProvider>
<TimelineProvider contextId="project-2"> {/* Different ID */}
  <Component2 />
</TimelineProvider>
```

#### **Element Management Issues**

**Problem**: Element not added to track
```typescript
// ❌ Error: Element not appearing in timeline
const result = await editor.addElementToTrack(track, element);
console.log(result); // false
```

**Solution**: Check element validation and track state
```typescript
// ✅ Fix: Validate before adding
const addElementSafely = async (track: Track, element: TrackElement) => {
  // Check if track exists
  if (!track) {
    console.error('Track is null or undefined');
    return false;
  }
  
  // Validate element
  const errors = validateElement(element);
  if (errors.length > 0) {
    console.error('Element validation failed:', errors);
    return false;
  }
  
  // Check for overlapping elements
  const overlapping = track.getElements().some(existing => 
    existing.getStart() < element.getEnd() && existing.getEnd() > element.getStart()
  );
  
  if (overlapping) {
    console.warn('Element overlaps with existing elements');
  }
  
  return await editor.addElementToTrack(track, element);
};
```

**Problem**: Frame effects not applying to elements
```typescript
// ❌ Error: Frame effect not visible
const textElement = new TextElement("Hello");
const frameEffect = new ElementFrameEffect(0, 3);
textElement.addFrameEffect(frameEffect); // Won't work on text
```

**Solution**: Check element compatibility
```typescript
// ✅ Fix: Only apply frame effects to video/image elements
const applyFrameEffect = (element: TrackElement, effect: ElementFrameEffect) => {
  if (element instanceof VideoElement || element instanceof ImageElement) {
    element.addFrameEffect(effect);
  } else {
    console.error('Frame effects can only be applied to video and image elements');
  }
};
```

#### **Animation and Effect Issues**

**Problem**: Text effects not working
```typescript
// ❌ Error: Text effect not animating
const textElement = new TextElement("Hello");
const effect = new ElementTextEffect("typewriter");
textElement.setTextEffect(effect); // Missing duration
```

**Solution**: Configure effect properties properly
```typescript
// ✅ Fix: Set required effect properties
const applyTextEffect = (element: TextElement, effectName: string) => {
  const effect = new ElementTextEffect(effectName);
  effect.setDuration(2); // Required
  effect.setDelay(0.5); // Optional
  effect.setBufferTime(0.1); // Optional
  element.setTextEffect(effect);
};
```

**Problem**: Overlapping frame effects
```typescript
// ❌ Error: Frame effects with overlapping time ranges
const effect1 = new ElementFrameEffect(0, 5);
const effect2 = new ElementFrameEffect(3, 8); // Overlaps with effect1
```

**Solution**: Ensure non-overlapping time ranges
```typescript
// ✅ Fix: Validate time ranges before adding
const addFrameEffects = (element: VideoElement, effects: ElementFrameEffect[]) => {
  // Sort effects by start time
  effects.sort((a, b) => a.getStart() - b.getStart());
  
  // Check for overlaps
  for (let i = 0; i < effects.length - 1; i++) {
    if (effects[i].getEnd() > effects[i + 1].getStart()) {
      throw new Error('Frame effects cannot have overlapping time ranges');
    }
  }
  
  effects.forEach(effect => element.addFrameEffect(effect));
};
```

#### **Performance Issues**

**Problem**: Slow rendering with many elements
```typescript
// ❌ Performance issue: Too many elements rendered
const elements = track.getElements(); // 1000+ elements
elements.forEach(element => renderElement(element)); // Slow
```

**Solution**: Implement virtual scrolling
```typescript
// ✅ Fix: Only render visible elements
const useVirtualTimeline = (elements: TrackElement[], viewportHeight: number) => {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 50 });
  
  const visibleElements = useMemo(() => {
    return elements.slice(visibleRange.start, visibleRange.end);
  }, [elements, visibleRange]);
  
  return visibleElements;
};
```

**Problem**: Memory leaks from large history
```typescript
// ❌ Memory issue: Unlimited history size
<TimelineProvider maxHistorySize={1000}> {/* Too large */}
```

**Solution**: Set reasonable history limits
```typescript
// ✅ Fix: Use reasonable history size
<TimelineProvider maxHistorySize={50}> {/* Reasonable size */}
```

### **9.2 Frequently Asked Questions**

#### **Q: How do I change the video dimensions?**

**A**: Configure the `videoProps` in the editor configuration:

```typescript
<VideoEditor
  editorConfig={{
    videoProps: {
      width: 1920,  // Custom width
      height: 1080, // Custom height
    },
  }}
/>
```

#### **Q: Can I use custom fonts?**

**A**: Yes, you can add custom fonts to the `AVAILABLE_TEXT_FONTS` constant:

```typescript
// Add to constants.ts
export const AVAILABLE_TEXT_FONTS = {
  // ... existing fonts
  CUSTOM_FONT: "Custom Font",
};

// Load the font in your CSS
@import url('https://fonts.googleapis.com/css2?family=Custom+Font:wght@400;700&display=swap');
```

#### **Q: How do I save and load projects?**

**A**: Use the timeline editor's built-in methods:

```typescript
// Save project
const saveProject = () => {
  const timelineData = editor.getTimelineData();
  if (timelineData) {
    const projectJSON = {
      tracks: timelineData.tracks.map(track => track.serialize()),
      version: timelineData.version
    };
    localStorage.setItem('my-project', JSON.stringify(projectJSON));
  }
};

// Load project
const loadProject = (projectData: any) => {
  editor.loadProject(projectData);
};
```

#### **Q: Can I apply multiple animations to the same element?**

**A**: No, only one animation can be applied per element. However, you can apply different types of effects:

```typescript
// One animation
element.setAnimation(new ElementAnimation("fade"));

// One text effect (for text elements)
textElement.setTextEffect(new ElementTextEffect("typewriter"));

// Multiple frame effects (for video/image elements)
videoElement.addFrameEffect(effect1);
videoElement.addFrameEffect(effect2);
```

#### **Q: How do I handle large video files?**

**A**: Use proper loading states and error handling:

```typescript
const loadVideoElement = async (videoUrl: string) => {
  const element = new VideoElement(videoUrl);
  
  // Show loading state
  setIsLoading(true);
  
  try {
    // Wait for video to load
    await new Promise((resolve, reject) => {
      const video = new HTMLVideoElement();
      video.onloadeddata = resolve;
      video.onerror = reject;
      video.src = videoUrl;
    });
    
    await editor.addElementToTrack(track, element);
  } catch (error) {
    console.error('Failed to load video:', error);
  } finally {
    setIsLoading(false);
  }
};
```

#### **Q: How do I customize the editor UI?**

**A**: Use the panel props and custom CSS:

```typescript
<VideoEditor
  leftPanel={<CustomLeftPanel />}
  rightPanel={<CustomRightPanel />}
  editorConfig={{
    canvasMode: true,
    // ... other config
  }}
/>

// Custom CSS
.twick-video-editor {
  --primary-color: #your-color;
  --background-color: #your-bg;
}
```

#### **Q: How do I implement undo/redo?**

**A**: The undo/redo functionality is built-in. Use the context values:

```typescript
const { canUndo, canRedo } = useTimelineContext();

return (
  <div>
    <button onClick={() => editor.undo()} disabled={!canUndo}>
      Undo
    </button>
    <button onClick={() => editor.redo()} disabled={!canRedo}>
      Redo
    </button>
  </div>
);
```

#### **Q: How do I get the current playback time?**

**A**: Use the LivePlayer context:

```typescript
const { currentTime, setCurrentTime } = useLivePlayerContext();

// Display current time
<div>Current Time: {currentTime.toFixed(2)}s</div>

// Seek to specific time
<button onClick={() => setCurrentTime(10.5)}>
  Jump to 10.5s
</button>
```

#### **Q: How do I handle errors gracefully?**

**A**: Implement comprehensive error handling:

```typescript
const safeOperation = async (operation: () => Promise<any>) => {
  try {
    return await operation();
  } catch (error) {
    console.error('Operation failed:', error);
    
    // Show user-friendly message
    showErrorMessage('An error occurred. Please try again.');
    
    // Log for debugging
    if (process.env.NODE_ENV === 'development') {
      console.error('Detailed error:', error);
    }
    
    return null;
  }
};
```

### **9.3 Debugging Tips**

#### **Enable Debug Logging**

```typescript
// Enable detailed logging in development
if (process.env.NODE_ENV === 'development') {
  console.log('Timeline Data:', editor.getTimelineData());
  console.log('Selected Item:', selectedItem);
  console.log('Player State:', playerState);
}
```

#### **Check Element State**

```typescript
const debugElement = (element: TrackElement) => {
  console.log('Element ID:', element.getId());
  console.log('Element Type:', element.constructor.name);
  console.log('Start Time:', element.getStart());
  console.log('End Time:', element.getEnd());
  console.log('Position:', element.getPosition());
  
  if (element instanceof TextElement) {
    console.log('Text Content:', element.getText());
    console.log('Font Family:', element.getFontFamily());
  }
};
```

#### **Validate Timeline State**

```typescript
const validateTimeline = () => {
  const timelineData = editor.getTimelineData();
  if (!timelineData) {
    console.error('No timeline data available');
    return;
  }
  
  timelineData.tracks.forEach((track, index) => {
    console.log(`Track ${index}:`, track.getName());
    console.log('Elements:', track.getElements().length);
    
    track.getElements().forEach(element => {
      if (element.getStart() >= element.getEnd()) {
        console.warn('Invalid element timing:', element.getId());
      }
    });
  });
};
```

### **9.4 Getting Help**

#### **Where to Find Help**

1. **Documentation**: This user manual covers all major features
2. **Code Examples**: Check the `@twick/examples` package for working examples
3. **TypeScript Types**: Use IDE autocomplete for type information
4. **Console Logs**: Enable debug logging for detailed information
5. **GitHub Issues**: Check existing issues or create new ones

#### **Reporting Issues**

When reporting issues, include:

1. **Environment**: OS, browser, Node.js version
2. **Package Versions**: All Twick package versions
3. **Reproduction Steps**: Clear steps to reproduce the issue
4. **Expected vs Actual**: What you expected vs what happened
5. **Console Logs**: Any error messages or warnings
6. **Code Example**: Minimal code that reproduces the issue

#### **Performance Issues**

For performance issues, include:

1. **Element Count**: Number of tracks and elements
2. **File Sizes**: Size of video/image files
3. **Browser Performance**: CPU and memory usage
4. **Timeline Duration**: Total timeline length
5. **Effect Count**: Number of animations and effects

---

_Next: [Getting Started](#getting-started)_
