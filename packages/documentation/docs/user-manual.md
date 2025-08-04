# Twick Video Editor SDK - Complete User Manual

> **Professional Video Editing Made Simple**  
> A comprehensive guide to integrating and using the Twick Video Editor SDK in your applications.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Core Concepts](#core-concepts)
3. [Installation & Setup](#installation--setup)
4. [Basic Integration](#basic-integration)
5. [Timeline Management](#timeline-management)
6. [Element Types](#element-types)
7. [Effects & Animations](#effects--animations)
8. [Advanced Features](#advanced-features)
9. [API Reference](#api-reference)
10. [Examples & Workflows](#examples--workflows)
11. [Best Practices](#best-practices)
12. [Troubleshooting](#troubleshooting)

---

## Quick Start

Get up and running with Twick in under 5 minutes! This section will walk you through creating your first video editor application step by step.

### **What is Twick?**

Twick is a powerful React-based video editing SDK that lets you create professional video editing applications. Think of it like having the core features of Adobe Premiere Pro or Final Cut Pro, but built specifically for web applications. You can add text overlays, video clips, images, audio tracks, and apply various effects and animations - all programmatically or through a user interface.

### **Why Choose Twick?**

- **React Native**: Built specifically for React applications
- **Professional Features**: Timeline editing, undo/redo, multiple tracks
- **Rich Effects**: Text animations, frame effects, motion graphics
- **Flexible**: Customizable UI and programmatic control
- **Performance**: Optimized for smooth video editing experience

### **Your First Video Editor**

Here's the complete code to create a fully functional video editor:

```typescript
import React from 'react';
import VideoEditor, { INITIAL_TIMELINE_DATA } from "@twick/video-editor";
import "@twick/video-editor/dist/video-editor.css";
import { LivePlayerProvider } from "@twick/live-player";
import { TimelineProvider } from "@twick/timeline";

function App() {
  return (
    <LivePlayerProvider>
      <TimelineProvider
        contextId="my-video-project"
        initialData={INITIAL_TIMELINE_DATA}
      >
        <VideoEditor
          editorConfig={{
            canvasMode: true,
            videoProps: { width: 1920, height: 1080 }
          }}
        />
      </TimelineProvider>
    </LivePlayerProvider>
  );
}

export default App;
```

### **What This Code Does:**

Let's break down what each part of this code accomplishes:

1. **LivePlayerProvider**: This is like a manager for your video player. It handles play/pause, current time, volume, and other playback controls. Think of it as the "remote control" for your video.

2. **TimelineProvider**: This manages your editing timeline - the tracks, elements, and all the editing history. It's like the "project manager" that keeps track of everything you're editing and allows you to undo/redo changes.

3. **VideoEditor**: This is the main interface where users will actually edit videos. It provides the visual timeline, canvas, and all the editing tools.

4. **editorConfig**: This tells the editor how to behave - in this case, we're setting up a 1920x1080 (Full HD) canvas for editing.

### **What You Get:**

When you run this code, you'll have a complete video editor with:
- **Timeline Interface**: A visual timeline where you can arrange video clips, text, and other elements
- **Canvas Preview**: A preview area showing how your video will look
- **Undo/Redo**: Built-in history management so users can undo mistakes
- **Playback Controls**: Play, pause, and seek through your video
- **Drag & Drop**: Users can drag elements around the timeline
- **Real-time Preview**: See changes as they happen

### **Next Steps:**

Once you have this basic setup working, you can:
- Add custom control panels
- Create programmatic video editing workflows
- Integrate with your existing application
- Add custom styling and branding

The beauty of Twick is that this simple setup gives you a professional-grade video editor that you can customize and extend however you need!

---

## Core Concepts

Before diving into the code, let's understand the fundamental concepts that make Twick work. Think of video editing like building a layered cake - each layer (track) can contain different ingredients (elements), and you can arrange them in time to create the final masterpiece.

### **Timeline Structure**

The timeline is the heart of any video editor. In Twick, it's organized like a professional video editing software:

```
Timeline
├── Track 1 (Main Video)
│   ├── Video Element (0-10s)
│   └── Image Element (5-15s)
├── Track 2 (Text Overlays)
│   ├── Title Text (1-5s)
│   └── Subtitle Text (3-8s)
└── Track 3 (Audio)
    └── Background Music (0-20s)
```

**Understanding the Structure:**
- **Timeline**: The entire editing workspace where your video comes together
- **Tracks**: Like layers in Photoshop, each track can hold different types of content
- **Elements**: The actual content (video, text, images, etc.) that appears on your tracks
- **Time**: Everything is positioned in time (seconds) to create the final sequence

**Why This Matters:**
This structure allows you to have multiple elements playing at the same time. For example, you can have background music playing while text appears over a video, creating a professional multi-layered video.

### **Key Components**

Twick is built around four main components that work together to create the video editing experience:

| Component | Purpose | Required | What It Does |
|-----------|---------|----------|--------------|
| `LivePlayerProvider` | Manages video playback state | ✅ | Controls play/pause, time, volume - like a remote control |
| `TimelineProvider` | Manages timeline and undo/redo | ✅ | Keeps track of all your edits and allows undoing mistakes |
| `VideoEditor` | Main editor interface | ✅ | The visual interface where users actually edit videos |
| `TimelineEditor` | Programmatic timeline control | Optional | Lets you control the timeline with code instead of UI |

**How They Work Together:**
1. **LivePlayerProvider** handles the "playing" part - making videos play, pause, and seek
2. **TimelineProvider** handles the "editing" part - managing what's on the timeline and keeping history
3. **VideoEditor** provides the visual interface where users can see and interact with everything
4. **TimelineEditor** gives you programmatic control for automation and custom workflows

### **Element Types**

Elements are the building blocks of your video. Each element type serves a specific purpose and has its own set of properties:

| Type | Description | Properties | Common Uses |
|------|-------------|------------|-------------|
| `TextElement` | Text overlays | Font, size, color, position | Titles, captions, credits |
| `VideoElement` | Video clips | Source, duration, volume | Main video content, clips |
| `ImageElement` | Static images | Source, dimensions, position | Photos, graphics, logos |
| `AudioElement` | Audio tracks | Source, volume, playback rate | Background music, sound effects |
| `CaptionElement` | Subtitles | Text, timing, style | Subtitles, accessibility |
| `RectElement` | Rectangles | Color, size, position | Backgrounds, overlays, graphics |
| `CircleElement` | Circles | Color, radius, position | Highlights, decorative elements |
| `IconElement` | Icons | Icon type, size, color | UI elements, symbols, buttons |

**Element Lifecycle:**
Every element has a lifecycle in your video:
1. **Start Time**: When the element begins to appear
2. **Duration**: How long the element stays visible
3. **End Time**: When the element disappears
4. **Properties**: How the element looks and behaves during its time

**Why This Matters:**
Understanding element types helps you choose the right tool for the job. Want to add a title? Use TextElement. Need background music? Use AudioElement. Want to highlight something? Use RectElement or CircleElement.

---

## Installation & Setup

Setting up Twick in your project is straightforward. This section will guide you through the installation process and help you get everything configured properly.

### **Prerequisites**

Before installing Twick, make sure you have:
- **Node.js** (version 16 or higher)
- **React** (version 16.8 or higher for hooks support)
- **TypeScript** (recommended for better development experience)
- A **package manager** (npm, yarn, or pnpm)

### **Step 1: Install Packages**

Twick is organized as a modular system, so you can install only the packages you need. Here are the installation commands for different package managers:

```bash
# Using pnpm (recommended)
pnpm add @twick/video-editor @twick/timeline @twick/live-player @twick/canvas

# Using npm
npm install @twick/video-editor @twick/timeline @twick/live-player @twick/canvas

# Using yarn
yarn add @twick/video-editor @twick/timeline @twick/live-player @twick/canvas
```

**What Each Package Does:**
- **@twick/video-editor**: The main editor component and UI
- **@twick/timeline**: Timeline management and element handling
- **@twick/live-player**: Video playback and player controls
- **@twick/canvas**: Canvas rendering and visual effects

**Optional Packages:**
If you need additional features, you can also install:
- **@twick/media-utils**: Utilities for handling media files
- **@twick/visualizer**: Advanced visualization components

### **Step 2: Import Styles**

Twick comes with pre-built styles that provide a professional look and feel. You need to import these styles to get the proper appearance:

```typescript
// Import the default styles
import "@twick/video-editor/dist/video-editor.css";
```

**Why This Matters:**
The CSS file provides:
- Professional timeline styling
- Proper element positioning
- Responsive design
- Consistent visual appearance
- Hover effects and interactions

**Custom Styling:**
You can override these styles with your own CSS if you want to customize the appearance to match your application's design.

### **Step 3: Verify Installation**

After installation, you can verify everything is working by checking your package.json file. You should see the Twick packages listed in your dependencies:

```json
{
  "dependencies": {
    "@twick/video-editor": "^0.0.1",
    "@twick/timeline": "^0.0.1",
    "@twick/live-player": "^0.0.1",
    "@twick/canvas": "^0.0.1"
  }
}
```

### **Common Installation Issues**

**If you encounter any issues:**

1. **Version Conflicts**: Make sure all Twick packages are the same version
2. **Peer Dependencies**: Ensure React and React-DOM are properly installed
3. **TypeScript Errors**: Install TypeScript types if you're using TypeScript
4. **Build Errors**: Clear your node_modules and reinstall if needed

**Troubleshooting Commands:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Or with pnpm
pnpm store prune
pnpm install
```

### **Step 3: Basic Setup**

```typescript
import React from 'react';
import VideoEditor, { INITIAL_TIMELINE_DATA } from "@twick/video-editor";
import "@twick/video-editor/dist/video-editor.css";
import { LivePlayerProvider } from "@twick/live-player";
import { TimelineProvider } from "@twick/timeline";

function VideoEditorApp() {
  return (
    <LivePlayerProvider>
      <TimelineProvider
        contextId="my-project"
        initialData={INITIAL_TIMELINE_DATA}
        undoRedoPersistenceKey="my-project-history"
        maxHistorySize={50}
      >
        <VideoEditor
          editorConfig={{
            canvasMode: true,
            videoProps: {
              width: 1920,
              height: 1080,
            },
          }}
        />
      </TimelineProvider>
    </LivePlayerProvider>
  );
}
```

---

## Basic Integration

Now that you have Twick installed, let's learn how to integrate it into your application. This section covers the essential components and how to configure them properly.

### **Understanding the Integration Pattern**

Twick uses a provider pattern similar to React Context. This means you wrap your video editor components with providers that manage different aspects of the video editing experience. Think of it like setting up the foundation for a house - you need to establish the basic structure before you can build on top of it.

### **Provider Configuration**

The providers are the backbone of Twick. They manage state, handle user interactions, and coordinate between different parts of the system.

#### **LivePlayerProvider**

This provider manages everything related to video playback - like a smart remote control for your video.

```typescript
<LivePlayerProvider>
  {/* Your video editor components */}
</LivePlayerProvider>
```

**What LivePlayerProvider Does:**
- **Playback Control**: Manages play, pause, and seek operations
- **Time Management**: Tracks current playback time and duration
- **Volume Control**: Handles audio volume and mute states
- **State Synchronization**: Keeps all components in sync with playback state

**Why You Need It:**
Without LivePlayerProvider, you won't be able to play videos or control playback. It's essential for any video editing application.

#### **TimelineProvider**

This provider manages the timeline itself - the tracks, elements, and all the editing history.

```typescript
<TimelineProvider
  contextId="unique-project-id"           // Required: Unique identifier
  initialData={timelineData}              // Optional: Initial timeline
  undoRedoPersistenceKey="project-key"    // Optional: Persist history
  maxHistorySize={50}                     // Optional: History limit
>
  {/* Video editor components */}
</TimelineProvider>
```

**What TimelineProvider Does:**
- **Timeline Management**: Handles tracks, elements, and their relationships
- **Undo/Redo**: Manages editing history so users can undo mistakes
- **State Persistence**: Can save and restore editing sessions
- **Change Tracking**: Monitors when things change and updates the UI

**Configuration Options Explained:**

| Property | Type | Required | Default | Description | Why It Matters |
|----------|------|----------|---------|-------------|----------------|
| `contextId` | `string` | ✅ | - | Unique identifier for this timeline | Prevents conflicts if you have multiple editors |
| `initialData` | `TimelineData` | ❌ | `INITIAL_TIMELINE_DATA` | Initial timeline structure | Gives users a starting point |
| `undoRedoPersistenceKey` | `string` | ❌ | - | Key for persisting undo/redo history | Saves user's work across sessions |
| `maxHistorySize` | `number` | ❌ | `20` | Maximum undo/redo steps | Controls memory usage and performance |

**Real-World Example:**
```typescript
// For a social media app with multiple video editors
<TimelineProvider contextId="user-123-story-editor">
  {/* User's story editor */}
</TimelineProvider>

<TimelineProvider contextId="user-123-post-editor">
  {/* User's post editor */}
</TimelineProvider>
```

### **VideoEditor Configuration**

The VideoEditor component is the main interface where users will interact with your video editor.

```typescript
<VideoEditor
  leftPanel={<CustomLeftPanel />}        // Optional: Custom left panel
  rightPanel={<CustomRightPanel />}      // Optional: Custom right panel
  editorConfig={{
    canvasMode: true,                     // Enable canvas mode
    videoProps: {
      width: 1920,                       // Video width
      height: 1080,                      // Video height
    },
  }}
/>
```

**What VideoEditor Provides:**
- **Timeline Interface**: Visual timeline where users arrange elements
- **Canvas Preview**: Real-time preview of the video being edited
- **Element Controls**: Tools for adding, editing, and removing elements
- **Playback Controls**: Play, pause, and seek functionality

**Editor Config Options Explained:**

| Property | Type | Default | Description | Use Case |
|----------|------|---------|-------------|----------|
| `canvasMode` | `boolean` | `false` | Enable canvas rendering mode | For high-quality previews |
| `videoProps.width` | `number` | `720` | Output video width | Set your desired video resolution |
| `videoProps.height` | `number` | `1280` | Output video height | Set your desired video resolution |

**Custom Panels:**
The `leftPanel` and `rightPanel` props let you add custom controls and information panels:

```typescript
// Custom left panel with tools
const CustomLeftPanel = () => (
  <div className="tools-panel">
    <button>Add Text</button>
    <button>Add Image</button>
    <button>Add Video</button>
  </div>
);

// Custom right panel with properties
const CustomRightPanel = () => (
  <div className="properties-panel">
    <h3>Element Properties</h3>
    {/* Property controls */}
  </div>
);
```

### **Complete Integration Example**

Here's how everything comes together in a real application:

```typescript
import React from 'react';
import VideoEditor, { INITIAL_TIMELINE_DATA } from "@twick/video-editor";
import "@twick/video-editor/dist/video-editor.css";
import { LivePlayerProvider } from "@twick/live-player";
import { TimelineProvider } from "@twick/timeline";

function MyVideoApp() {
  return (
    <div className="video-app">
      <header>
        <h1>My Video Editor</h1>
      </header>
      
      <main>
        <LivePlayerProvider>
          <TimelineProvider
            contextId="my-video-project"
            initialData={INITIAL_TIMELINE_DATA}
            undoRedoPersistenceKey="my-project-history"
            maxHistorySize={50}
          >
            <VideoEditor
              leftPanel={<CustomToolsPanel />}
              rightPanel={<CustomPropertiesPanel />}
              editorConfig={{
                canvasMode: true,
                videoProps: {
                  width: 1920,
                  height: 1080,
                },
              }}
            />
          </TimelineProvider>
        </LivePlayerProvider>
      </main>
    </div>
  );
}
```

**What This Gives You:**
- A complete video editing application
- Custom tool panels for your specific needs
- Persistent editing history
- Professional video preview
- All the features of a commercial video editor

### **Best Practices for Integration**

1. **Unique Context IDs**: Always use unique context IDs if you have multiple editors
2. **Appropriate History Size**: Set maxHistorySize based on your app's needs (20-50 is usually good)
3. **Custom Panels**: Use custom panels to add your app's specific functionality
4. **Error Handling**: Wrap your editor in error boundaries for production apps
5. **Performance**: Consider lazy loading the editor for better initial page load

---

## 🎬 Timeline Management

### **Accessing Timeline Context**

```typescript
import { useTimelineContext } from "@twick/timeline";

function MyComponent() {
  const {
    editor,              // TimelineEditor instance
    selectedItem,        // Currently selected track/element
    totalDuration,       // Total timeline duration
    changeLog,           // Change counter
    present,             // Current timeline state
    canUndo,            // Can undo operation
    canRedo,            // Can redo operation
    setSelectedItem,     // Set selected item
    setTimelineAction    // Trigger timeline action
  } = useTimelineContext();

  // Your component logic
}
```

### **TimelineEditor API**

The `TimelineEditor` provides programmatic control over the timeline:

```typescript
const { editor } = useTimelineContext();

// Track Management
const track = editor.addTrack("My Track");
const trackById = editor.getTrackById("track-id");
editor.removeTrack(track);
editor.reorderTracks([track1, track2, track3]);

// Element Management
await editor.addElementToTrack(track, element);
editor.removeElement(element);
editor.updateElement(element);
const splitResult = await editor.splitElement(element, 5.0);
const clonedElement = editor.cloneElement(element);

// Project Management
editor.loadProject(projectData);
const timelineData = editor.getTimelineData();

// History Management
editor.undo();
editor.redo();
editor.resetHistory();

// Player Control
editor.pauseVideo();
```

### **Creating and Managing Tracks**

```typescript
// Create a new track
const videoTrack = editor.addTrack("Main Video");
const textTrack = editor.addTrack("Text Overlays");
const audioTrack = editor.addTrack("Background Audio");

// Get track by ID
const track = editor.getTrackById("track-id");

// Remove track
editor.removeTrack(track);

// Reorder tracks
editor.reorderTracks([track1, track2, track3]);
```

### **Track Properties**

```typescript
// Track information
const trackName = track.getName();
const trackId = track.getId();
const trackElements = track.getElements();
const trackElementCount = track.getElementCount();
const trackDuration = track.getDuration();

// Track operations
track.addElement(element);
track.removeElement(element);
track.getElementById("element-id");
track.getElementsInTimeRange(0, 10);
```

---

## Element Types

### **TextElement**

Create text overlays with rich formatting:

```typescript
import { TextElement } from "@twick/timeline";
import { AVAILABLE_TEXT_FONTS } from "@twick/video-editor";

const textElement = new TextElement("Hello World!");
textElement
  .setStart(0)                    // Start time (seconds)
  .setEnd(5)                      // End time (seconds)
  .setPosition({ x: 100, y: 100 }) // Position on canvas
  .setFontSize(48)                // Font size
  .setFontFamily(AVAILABLE_TEXT_FONTS.ROBOTO) // Font family
  .setFill("#FFFFFF")             // Text color
  .setTextAlign("center")         // Text alignment
  .setFontWeight(700)             // Font weight
  .setRotation(0)                 // Rotation (degrees)
  .setOpacity(1.0);               // Opacity (0-1)
```

**Available Fonts:**
- Google Fonts: Roboto, Poppins, Playfair Display, etc.
- Display Fonts: Bangers, Birthstone, Corinthia, etc.
- CDN Fonts: Peralta, Impact, Lumanosimo, etc.

### **VideoElement**

Add video clips to your timeline:

```typescript
import { VideoElement } from "@twick/timeline";

const videoElement = new VideoElement("https://example.com/video.mp4", {
  width: 1920,
  height: 1080
});
videoElement
  .setStart(0)                    // Start time
  .setEnd(15)                     // End time
  .setPosition({ x: 0, y: 0 })    // Position
  .setPlay(true)                  // Auto-play
  .setVolume(0.8)                 // Volume (0-1)
  .setPlaybackRate(1.0)           // Playback speed
  .setObjectFit("cover")          // Object fit mode
  .setOpacity(1.0);               // Opacity
```

### **ImageElement**

Add static images to your timeline:

```typescript
import { ImageElement } from "@twick/timeline";

const imageElement = new ImageElement("https://example.com/image.jpg", {
  width: 1920,
  height: 1080
});
imageElement
  .setStart(0)
  .setEnd(10)
  .setPosition({ x: 0, y: 0 })
  .setObjectFit("contain")
  .setOpacity(1.0);
```

### **AudioElement**

Add audio tracks:

```typescript
import { AudioElement } from "@twick/timeline";

const audioElement = new AudioElement("https://example.com/audio.mp3");
audioElement
  .setStart(0)
  .setEnd(30)
  .setPlay(true)
  .setVolume(0.5)
  .setPlaybackRate(1.0);
```

### **CaptionElement**

Add subtitles with word-by-word timing:

```typescript
import { CaptionElement } from "@twick/timeline";

const captionElement = new CaptionElement("This is a subtitle");
captionElement
  .setStart(0)
  .setEnd(5)
  .setPosition({ x: 0, y: 800 })
  .setCaptionStyle("word_by_word")
  .setFontSize(40)
  .setFill("#FFFFFF");
```

### **Shape Elements**

Add visual elements:

```typescript
import { RectElement, CircleElement, IconElement } from "@twick/timeline";

// Rectangle
const rectElement = new RectElement("#FF0000", { width: 200, height: 100 });
rectElement
  .setStart(0)
  .setEnd(5)
  .setPosition({ x: 100, y: 100 })
  .setRotation(45);

// Circle
const circleElement = new CircleElement("#00FF00", 75);
circleElement
  .setStart(5)
  .setEnd(10)
  .setPosition({ x: 300, y: 300 });

// Icon
const iconElement = new IconElement("heart", "#FF6B35");
iconElement
  .setStart(10)
  .setEnd(15)
  .setPosition({ x: 500, y: 100 })
  .setSize(64);
```

---

## Effects & Animations

### **Text Effects**

Add dynamic text animations:

```typescript
import { ElementTextEffect } from "@twick/timeline";

// Typewriter Effect
const typewriterEffect = new ElementTextEffect("typewriter");
typewriterEffect
  .setDuration(2)        // Effect duration (seconds)
  .setDelay(0.5)         // Delay before effect starts
  .setBufferTime(0.1);   // Time between characters

textElement.setTextEffect(typewriterEffect);

// Erase Effect
const eraseEffect = new ElementTextEffect("erase");
eraseEffect.setDuration(1.5);

// Elastic Effect
const elasticEffect = new ElementTextEffect("elastic");
elasticEffect.setDuration(2.0);

// Stream Word Effect
const streamEffect = new ElementTextEffect("stream-word");
streamEffect.setDuration(3.0);
```

**Available Text Effects:**
- `typewriter`: Characters appear one by one
- `erase`: Text disappears character by character
- `elastic`: Text bounces with elastic animation
- `stream-word`: Words flow in sequence

### **Frame Effects**

Add visual frames around video and image elements:

```typescript
import { ElementFrameEffect } from "@twick/timeline";

// Rectangle Frame
const rectFrame = new ElementFrameEffect(0, 5); // Start: 0s, End: 5s
rectFrame.setProps({
  frameSize: [800, 600],           // Frame dimensions
  framePosition: { x: 100, y: 100 }, // Frame position
  radius: 0,                       // Corner radius
  transitionDuration: 1,           // Transition duration
  objectFit: "cover"               // Object fit mode
});

// Circle Frame
const circleFrame = new ElementFrameEffect(5, 10); // Start: 5s, End: 10s
circleFrame.setProps({
  frameSize: [600, 600],           // Circular frame
  framePosition: { x: 200, y: 150 },
  transitionDuration: 1,
  objectFit: "cover"
});

// Apply to video/image element
videoElement.addFrameEffect(rectFrame);
videoElement.addFrameEffect(circleFrame);
```

**Important:** Frame effects can only be applied to `VideoElement` and `ImageElement` types.

**Multiple Frame Effects:** You can apply multiple frame effects to the same element, but they must have non-overlapping time ranges.

### **Animations**

Add motion and visual effects to elements:

```typescript
import { ElementAnimation } from "@twick/timeline";

// Fade Animation
const fadeAnimation = new ElementAnimation("fade");
fadeAnimation
  .setAnimate("enter")     // Animation type: "enter", "exit", "both"
  .setInterval(0.5);       // Animation duration

// Rise Animation
const riseAnimation = new ElementAnimation("rise");
riseAnimation
  .setAnimate("enter")
  .setDirection("up")      // Direction: "up", "down"
  .setIntensity(150);      // Movement distance

// Breathe Animation
const breatheAnimation = new ElementAnimation("breathe");
breatheAnimation
  .setMode("in")           // Mode: "in", "out"
  .setIntensity(0.7);      // Scale intensity

// Apply to element
element.setAnimation(fadeAnimation);
```

**Available Animations:**

| Animation | Description | Properties |
|-----------|-------------|------------|
| `fade` | Fade in/out | `animate`, `interval` |
| `rise` | Move up/down | `animate`, `direction`, `intensity` |
| `breathe` | Scale in/out | `mode`, `intensity` |
| `blur` | Blur effect | `animate`, `interval`, `intensity` |
| `photo-rise` | Photo-specific rise | `mode`, `direction` |
| `photo-zoom` | Photo zoom | `mode`, `intensity` |
| `succession` | Sequential animation | `animate`, `interval` |

---

## 🔧 Advanced Features

### **LivePlayer Context**

Manage video playback state:

```typescript
import { useLivePlayerContext } from "@twick/live-player";
import { PLAYER_STATE } from "@twick/live-player";

function PlayerControls() {
  const {
    playerState,        // Current player state
    currentTime,        // Current playback time
    seekTime,          // Target seek time
    playerVolume,      // Current volume
    setPlayerState,    // Set player state
    setCurrentTime,    // Set current time
    setSeekTime,       // Set seek time
    setPlayerVolume    // Set volume
  } = useLivePlayerContext();

  const handlePlay = () => setPlayerState(PLAYER_STATE.PLAYING);
  const handlePause = () => setPlayerState(PLAYER_STATE.PAUSED);
  const handleSeek = (time: number) => setSeekTime(time);

  return (
    <div>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
      <input 
        type="range" 
        value={currentTime} 
        onChange={(e) => handleSeek(Number(e.target.value))}
      />
      <span>{currentTime.toFixed(2)}s</span>
    </div>
  );
}
```

**Player States:**
- `PLAYER_STATE.PLAYING`: Video is playing
- `PLAYER_STATE.PAUSED`: Video is paused
- `PLAYER_STATE.REFRESH`: Video is refreshing

### **Project Management**

Save and load projects:

```typescript
// Save project
const saveProject = () => {
  const timelineData = editor.getTimelineData();
  if (timelineData) {
    const projectJSON = {
      tracks: timelineData.tracks.map(track => track.serialize()),
      version: timelineData.version,
      metadata: {
        totalDuration: timelineData.tracks.reduce((max, track) => 
          Math.max(max, track.getElements().reduce((trackMax, element) => 
            Math.max(trackMax, element.getEnd()), 0)), 0),
        trackCount: timelineData.tracks.length,
        elementCount: timelineData.tracks.reduce((total, track) => 
          total + track.getElements().length, 0),
        createdAt: new Date().toISOString()
      }
    };
    
    // Save to localStorage
    localStorage.setItem('twick-project', JSON.stringify(projectJSON));
    
    // Or download as file
    const blob = new Blob([JSON.stringify(projectJSON, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'twick-project.json';
    a.click();
    URL.revokeObjectURL(url);
  }
};

// Load project
const loadProject = (projectData: any) => {
  try {
    editor.loadProject(projectData);
    console.log('Project loaded successfully');
  } catch (error) {
    console.error('Failed to load project:', error);
  }
};
```

### **Custom UI Components**

Create custom control panels:

```typescript
function CustomControlPanel() {
  const { editor, selectedItem } = useTimelineContext();
  const { playerState, setPlayerState } = useLivePlayerContext();

  const addTextElement = () => {
    if (selectedItem instanceof Track) {
      const textElement = new TextElement("New Text");
      textElement.setStart(0).setEnd(5);
      editor.addElementToTrack(selectedItem, textElement);
    }
  };

  return (
    <div className="custom-controls">
      <button onClick={addTextElement}>Add Text</button>
      <button onClick={() => setPlayerState(PLAYER_STATE.PLAYING)}>
        Play
      </button>
      <button onClick={() => setPlayerState(PLAYER_STATE.PAUSED)}>
        Pause
      </button>
    </div>
  );
}

// Use in VideoEditor
<VideoEditor
  leftPanel={<CustomControlPanel />}
  rightPanel={<div>Properties Panel</div>}
/>
```

---

## API Reference

### **TimelineEditor Methods**

#### **Track Management**
```typescript
// Create track
addTrack(name: string): Track

// Get track by ID
getTrackById(id: string): Track | null

// Remove track
removeTrack(track: Track): void

// Reorder tracks
reorderTracks(tracks: Track[]): void
```

#### **Element Management**
```typescript
// Add element to track
addElementToTrack(track: Track, element: TrackElement): Promise<boolean>

// Remove element
removeElement(element: TrackElement): boolean

// Update element
updateElement(element: TrackElement): boolean

// Split element at time
splitElement(element: TrackElement, splitTime: number): Promise<SplitResult>

// Clone element
cloneElement(element: TrackElement): TrackElement | null
```

#### **Project Management**
```typescript
// Load project data
loadProject(data: { tracks: TrackJSON[]; version: number }): void

// Get current timeline data
getTimelineData(): TimelineTrackData | null

// Get latest version
getLatestVersion(): number
```

#### **History Management**
```typescript
// Undo last action
undo(): void

// Redo last action
redo(): void

// Reset history
resetHistory(): void
```

### **Element Base Properties**

All elements inherit these base properties:

```typescript
// Timing
element.setStart(time: number)     // Start time in seconds
element.setEnd(time: number)       // End time in seconds

// Position
element.setPosition(pos: { x: number, y: number })  // Position on canvas
element.setRotation(angle: number)                  // Rotation in degrees
element.setOpacity(opacity: number)                 // Opacity (0-1)

// Identification
element.getId()                    // Get element ID
element.getName()                  // Get element name
element.setName(name: string)      // Set element name
```

### **Track Properties**

```typescript
// Basic info
track.getId()                      // Get track ID
track.getName()                    // Get track name
track.setName(name: string)        // Set track name

// Element management
track.getElements()                // Get all elements
track.getElementCount()            // Get element count
track.getDuration()                // Get track duration
track.getElementById(id: string)   // Get element by ID
track.getElementsInTimeRange(start: number, end: number) // Get elements in time range
```

---

## Examples & Workflows

### **Complete Video Editor Example**

```typescript
import React, { useState } from 'react';
import VideoEditor, { INITIAL_TIMELINE_DATA } from "@twick/video-editor";
import "@twick/video-editor/dist/video-editor.css";
import { LivePlayerProvider } from "@twick/live-player";
import { TimelineProvider, useTimelineContext } from "@twick/timeline";
import {
  TextElement,
  VideoElement,
  ImageElement,
  AudioElement,
  ElementTextEffect,
  ElementAnimation,
  ElementFrameEffect,
  AVAILABLE_TEXT_FONTS
} from "@twick/timeline";

function CustomVideoEditor() {
  const { editor, selectedItem, totalDuration, canUndo, canRedo } = useTimelineContext();
  const [isLoading, setIsLoading] = useState(false);

  const createSampleProject = async () => {
    setIsLoading(true);
    
    try {
      // Create tracks
      const mainTrack = editor.addTrack("Main Video");
      const textTrack = editor.addTrack("Text Overlays");
      const audioTrack = editor.addTrack("Background Audio");

      // Add video element
      const videoElement = new VideoElement("https://example.com/video.mp4", {
        width: 1920,
        height: 1080
      });
      videoElement
        .setStart(0)
        .setEnd(15)
        .setPosition({ x: 0, y: 0 })
        .setPlay(true)
        .setVolume(0.8);

      // Add frame effect to video
      const frameEffect = new ElementFrameEffect(0, 5);
      frameEffect.setProps({
        frameSize: [800, 600],
        framePosition: { x: 100, y: 100 },
        transitionDuration: 1,
        objectFit: "cover"
      });
      videoElement.addFrameEffect(frameEffect);

      // Add fade animation
      const fadeAnimation = new ElementAnimation("fade");
      fadeAnimation.setAnimate("enter").setInterval(0.5);
      videoElement.setAnimation(fadeAnimation);

      await editor.addElementToTrack(mainTrack, videoElement);

      // Add title text
      const titleElement = new TextElement("Welcome to Twick!");
      titleElement
        .setStart(1)
        .setEnd(5)
        .setPosition({ x: 100, y: 100 })
        .setFontSize(72)
        .setFontFamily(AVAILABLE_TEXT_FONTS.LUCKIEST_GUY)
        .setFill("#FF6B35")
        .setTextAlign("center");

      // Add typewriter effect
      const typewriterEffect = new ElementTextEffect("typewriter");
      typewriterEffect.setDuration(2).setDelay(0.5);
      titleElement.setTextEffect(typewriterEffect);

      // Add rise animation
      const riseAnimation = new ElementAnimation("rise");
      riseAnimation.setAnimate("enter").setDirection("up").setIntensity(150);
      titleElement.setAnimation(riseAnimation);

      await editor.addElementToTrack(textTrack, titleElement);

      // Add background audio
      const audioElement = new AudioElement("https://example.com/music.mp3");
      audioElement
        .setStart(0)
        .setEnd(15)
        .setPlay(true)
        .setVolume(0.3);

      await editor.addElementToTrack(audioTrack, audioElement);

      console.log("Sample project created successfully!");
      
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="video-editor-container">
      <div className="controls">
        <button onClick={createSampleProject} disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Sample Project"}
        </button>
        <button onClick={() => editor.undo()} disabled={!canUndo}>
          Undo
        </button>
        <button onClick={() => editor.redo()} disabled={!canRedo}>
          Redo
        </button>
      </div>
      
      <div className="info">
        <p>Duration: {totalDuration.toFixed(2)}s</p>
        <p>Selected: {selectedItem?.getName() || "None"}</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <LivePlayerProvider>
      <TimelineProvider
        contextId="my-video-project"
        initialData={INITIAL_TIMELINE_DATA}
        undoRedoPersistenceKey="my-project-history"
        maxHistorySize={50}
      >
        <VideoEditor
          leftPanel={<CustomVideoEditor />}
          rightPanel={<div>Properties Panel</div>}
          editorConfig={{
            canvasMode: true,
            videoProps: { width: 1920, height: 1080 }
          }}
        />
      </TimelineProvider>
    </LivePlayerProvider>
  );
}

export default App;
```

### **Common Workflows**

#### **Adding Text with Effects**
```typescript
const addTextWithEffects = async (text: string, start: number, end: number) => {
  const textElement = new TextElement(text);
  textElement
    .setStart(start)
    .setEnd(end)
    .setPosition({ x: 100, y: 100 })
    .setFontSize(48)
    .setFontFamily(AVAILABLE_TEXT_FONTS.ROBOTO)
    .setFill("#FFFFFF");

  // Add typewriter effect
  const effect = new ElementTextEffect("typewriter");
  effect.setDuration(2).setDelay(0.5);
  textElement.setTextEffect(effect);

  // Add fade animation
  const animation = new ElementAnimation("fade");
  animation.setAnimate("enter").setInterval(0.5);
  textElement.setAnimation(animation);

  const track = editor.getTrackById("text-track");
  if (track) {
    await editor.addElementToTrack(track, textElement);
  }
};
```

#### **Creating Video with Multiple Frame Effects**
```typescript
const createVideoWithFrameEffects = async (videoUrl: string) => {
  const videoElement = new VideoElement(videoUrl, { width: 1920, height: 1080 });
  videoElement.setStart(0).setEnd(20).setPlay(true);

  // Add multiple frame effects with non-overlapping times
  const effect1 = new ElementFrameEffect(0, 5);
  effect1.setProps({
    frameSize: [800, 600],
    framePosition: { x: 100, y: 100 },
    transitionDuration: 1
  });

  const effect2 = new ElementFrameEffect(5, 10);
  effect2.setProps({
    frameSize: [600, 600],
    framePosition: { x: 200, y: 150 },
    transitionDuration: 1
  });

  const effect3 = new ElementFrameEffect(10, 15);
  effect3.setProps({
    frameSize: [900, 700],
    framePosition: { x: 50, y: 50 },
    radius: 25,
    transitionDuration: 1
  });

  videoElement.addFrameEffect(effect1);
  videoElement.addFrameEffect(effect2);
  videoElement.addFrameEffect(effect3);

  const track = editor.addTrack("Main Video");
  await editor.addElementToTrack(track, videoElement);
};
```

---

## Best Practices

### **Performance Optimization**

```typescript
// ✅ Good: Memoize expensive operations
const visibleElements = useMemo(() => {
  return track.getElements().filter(element => 
    element.getStart() <= currentTime && element.getEnd() >= currentTime
  );
}, [track, currentTime]);

// ✅ Good: Batch operations
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

### **Error Handling**

```typescript
// ✅ Good: Comprehensive error handling
const safeElementOperation = async (operation: () => Promise<boolean>) => {
  try {
    const result = await operation();
    if (!result) {
      throw new Error('Operation failed');
    }
    return result;
  } catch (error) {
    console.error('Element operation failed:', error);
    showErrorMessage('Failed to perform operation. Please try again.');
    return false;
  }
};

// ✅ Good: Validate elements before adding
const validateElement = (element: TrackElement) => {
  const errors: string[] = [];
  
  if (element.getStart() < 0) {
    errors.push('Start time cannot be negative');
  }
  
  if (element.getEnd() <= element.getStart()) {
    errors.push('End time must be after start time');
  }
  
  return errors;
};
```

### **State Management**

```typescript
// ✅ Good: Use specific context values
const { editor, selectedItem, totalDuration } = useTimelineContext();
const { playerState, currentTime, setPlayerState } = useLivePlayerContext();

// ✅ Good: Proper provider hierarchy
function App() {
  return (
    <LivePlayerProvider>
      <TimelineProvider contextId="my-project">
        <VideoEditor />
      </TimelineProvider>
    </LivePlayerProvider>
  );
}
```

### **Project Management**

```typescript
// ✅ Good: Auto-save with debouncing
const useAutoSave = (editor: TimelineEditor, interval: number = 30000) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      const projectData = saveProject();
      if (projectData) {
        console.log('Project auto-saved');
      }
    }, interval);
    
    return () => clearInterval(intervalId);
  }, [editor, interval]);
};

// ✅ Good: Comprehensive project saving
const saveProject = () => {
  const timelineData = editor.getTimelineData();
  if (!timelineData) return null;
  
  const projectJSON = {
    tracks: timelineData.tracks.map(track => track.serialize()),
    version: timelineData.version,
    metadata: {
      totalDuration: timelineData.tracks.reduce((max, track) => 
        Math.max(max, track.getElements().reduce((trackMax, element) => 
          Math.max(trackMax, element.getEnd()), 0)), 0),
      trackCount: timelineData.tracks.length,
      elementCount: timelineData.tracks.reduce((total, track) => 
        total + track.getElements().length, 0),
      createdAt: new Date().toISOString()
    }
  };
  
  try {
    localStorage.setItem('twick-project', JSON.stringify(projectJSON));
    return projectJSON;
  } catch (error) {
    console.error('Failed to save project:', error);
    return null;
  }
};
```

---

## Troubleshooting

### **Common Issues**

#### **Provider Context Issues**

**Problem**: `useTimelineContext` returns undefined
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
  if (!track) {
    console.error('Track is null or undefined');
    return false;
  }
  
  const errors = validateElement(element);
  if (errors.length > 0) {
    console.error('Element validation failed:', errors);
    return false;
  }
  
  return await editor.addElementToTrack(track, element);
};
```

#### **Frame Effects Issues**

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

### **Performance Issues**

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

### **Debugging Tips**

```typescript
// Enable detailed logging in development
if (process.env.NODE_ENV === 'development') {
  console.log('Timeline Data:', editor.getTimelineData());
  console.log('Selected Item:', selectedItem);
  console.log('Player State:', playerState);
}

// Check element state
const debugElement = (element: TrackElement) => {
  console.log('Element ID:', element.getId());
  console.log('Element Type:', element.constructor.name);
  console.log('Start Time:', element.getStart());
  console.log('End Time:', element.getEnd());
  console.log('Position:', element.getPosition());
};

// Validate timeline state
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

### **Getting Help**

1. **Documentation**: This user manual covers all major features
2. **Code Examples**: Check the `@twick/examples` package for working examples
3. **TypeScript Types**: Use IDE autocomplete for type information
4. **Console Logs**: Enable debug logging for detailed information
5. **GitHub Issues**: Check existing issues or create new ones

When reporting issues, include:
- Environment: OS, browser, Node.js version
- Package versions: All Twick package versions
- Reproduction steps: Clear steps to reproduce the issue
- Expected vs actual: What you expected vs what happened
- Console logs: Any error messages or warnings
- Code example: Minimal code that reproduces the issue

---

## Quick Reference

### **Installation**
```bash
pnpm add @twick/video-editor @twick/timeline @twick/live-player @twick/canvas
```

### **Basic Setup**
```typescript
import VideoEditor, { INITIAL_TIMELINE_DATA } from "@twick/video-editor";
import "@twick/video-editor/dist/video-editor.css";
import { LivePlayerProvider } from "@twick/live-player";
import { TimelineProvider } from "@twick/timeline";

<LivePlayerProvider>
  <TimelineProvider contextId="my-project" initialData={INITIAL_TIMELINE_DATA}>
    <VideoEditor editorConfig={{ canvasMode: true, videoProps: { width: 1920, height: 1080 } }} />
  </TimelineProvider>
</LivePlayerProvider>
```

### **Element Types**
- `TextElement`: Text overlays with rich formatting
- `VideoElement`: Video clips with playback controls
- `ImageElement`: Static images
- `AudioElement`: Audio tracks
- `CaptionElement`: Subtitles with timing
- `RectElement`: Rectangles
- `CircleElement`: Circles
- `IconElement`: Icons

### **Effects**
- **Text Effects**: `typewriter`, `erase`, `elastic`, `stream-word`
- **Frame Effects**: Rectangle and circle frames (video/image only)
- **Animations**: `fade`, `rise`, `breathe`, `blur`, `photo-rise`, `photo-zoom`, `succession`

### **Key Methods**
- `editor.addTrack(name)`: Create new track
- `editor.addElementToTrack(track, element)`: Add element to track
- `editor.undo()` / `editor.redo()`: History management
- `editor.loadProject(data)`: Load project
- `editor.getTimelineData()`: Get current timeline

---

**Happy editing with Twick! 🎬**

---
