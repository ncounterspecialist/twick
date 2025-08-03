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
This prop allows you to configure the editor’s behavior and appearance, such as enabling canvas mode or setting the video’s width and height.

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

- Understanding tracks, elements, and their relationships
- Supported element types (text, image, video, etc.)

## 6. Add-ons: Animations, Text Effects, Frame Effects

### Adding Text Effects

- Overview of text effect add-ons
- How to apply, update, and remove text effects

### Adding Frame Effects

- Overview of frame effect add-ons
- How to apply, update, and remove frame effects

## 7. Example: Full Workflow

- Step-by-step code example: create a track, add a text element, apply a text effect, and perform CRUD operations

## 8. Best Practices & Tips

- Recommended patterns for state management
- Customizing the editor UI

## 9. Troubleshooting & FAQ

- Common issues and solutions
- Where to get help

---

_Next: [Getting Started](#getting-started)_
