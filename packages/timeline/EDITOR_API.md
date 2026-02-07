# Timeline Editor API – Code reference

This document describes how to use the **TimelineEditor** from `@twick/timeline` to create and edit video projects in code: add tracks, add every element type, add or update the watermark, and delete or update tracks and elements. Use it for documentation or for LLM-assisted video generation.

---

## 1. Getting the editor

The editor is provided by the timeline context. Wrap your app (or the editor UI) with `TimelineProvider` and read the editor from context:

```ts
import { useTimelineContext, TimelineProvider } from "@twick/timeline";

// Inside a component under TimelineProvider:
function MyEditor() {
  const { editor } = useTimelineContext();
  // editor is TimelineEditor
}
```

You need a `TimelineProvider` with a unique `contextId` and the required context (e.g. from `@twick/video-editor` or your own provider that implements the editor contract). The examples below assume you already have `editor: TimelineEditor`.

---

## 2. Track types and adding tracks

Tracks have a **type** that determines how they are used in the visualizer/player. Use the typed constants from `@twick/timeline`:

| Track type | Constant | Use case |
|------------|----------|----------|
| `"video"`   | `TRACK_TYPES.VIDEO`   | Video clips |
| `"audio"`   | `TRACK_TYPES.AUDIO`   | Audio clips |
| `"caption"` | `TRACK_TYPES.CAPTION` | Subtitles / captions |
| `"scene"`   | `TRACK_TYPES.SCENE`   | Scene containers (e.g. image/video as full scene) |
| `"element"` | `TRACK_TYPES.ELEMENT` | Text, shapes, icons, images (overlay elements) |

Add a track:

```ts
import { TRACK_TYPES } from "@twick/timeline";

// addTrack(name: string, type?: string): Track
// type defaults to TRACK_TYPES.ELEMENT
const videoTrack = editor.addTrack("Main video", TRACK_TYPES.VIDEO);
const captionsTrack = editor.addTrack("Subtitles", TRACK_TYPES.CAPTION);
const overlayTrack = editor.addTrack("Overlays", TRACK_TYPES.ELEMENT);
```

Get tracks:

```ts
const data = editor.getTimelineData();
const tracks = data?.tracks ?? [];

const trackById = editor.getTrackById("t-xxx");
const trackByName = editor.getTrackByName("Main video");
const captionsTrack = editor.getSubtitlesTrack(); // first track with type TRACK_TYPES.CAPTION
```

---

## 3. Adding elements (by type)

Elements are **track elements** (e.g. `VideoElement`, `TextElement`). You create the element, then add it to a track with `editor.addElementToTrack(track, element)`. Start/end times can be set explicitly or left for the adder to compute (it appends after the last element on the track).

### 3.1 Video

```ts
import { VideoElement } from "@twick/timeline";

// VideoElement(src: string, parentSize: Size)
// parentSize = video/canvas resolution, e.g. { width: 1920, height: 1080 }
const parentSize = { width: 1920, height: 1080 };
const el = new VideoElement("https://example.com/clip.mp4", parentSize);

// Optional: set start/end (otherwise adder appends after last element)
el.setStart(0);
el.setEnd(10);
el.setName("Intro");

const track = editor.getTrackById("t-video-id"); // or addTrack(...)
if (track) await editor.addElementToTrack(track, el);
```

### 3.2 Image

```ts
import { ImageElement } from "@twick/timeline";

// ImageElement(src: string, parentSize: Size)
const parentSize = { width: 1920, height: 1080 };
const el = new ImageElement("https://example.com/photo.jpg", parentSize);

el.setStart(0);
el.setEnd(5);
el.setName("Slide 1");

const track = editor.getTrackById("t-element-id"); // or "scene" track
if (track) await editor.addElementToTrack(track, el);
```

### 3.3 Audio

```ts
import { AudioElement } from "@twick/timeline";

// AudioElement(src: string)
const el = new AudioElement("https://example.com/music.mp3");

// Optional: setStart/setEnd; else adder appends after last element
el.setStart(0);
el.setEnd(30);

const track = editor.addTrack("Music", TRACK_TYPES.AUDIO);
await editor.addElementToTrack(track, el);
```

### 3.4 Text

```ts
import { TextElement } from "@twick/timeline";

// TextElement(text: string, props?: Partial<TextProps>)
const el = new TextElement("Hello World", {
  fill: "#FFFFFF",
  fontSize: 48,
  fontFamily: "Arial",
  x: 0,
  y: 0,
  rotation: 0,
  opacity: 1,
});

el.setStart(2);
el.setEnd(6);
el.setName("Title");

const track = editor.getTrackById("t-element-id");
if (track) await editor.addElementToTrack(track, el);
```

### 3.5 Caption

```ts
import { CaptionElement } from "@twick/timeline";

// CaptionElement(t: string, start: number, end: number)
const el = new CaptionElement("This is a subtitle phrase", 2, 5);

const track = editor.getSubtitlesTrack() ?? editor.addTrack("Captions", TRACK_TYPES.CAPTION);
await editor.addElementToTrack(track, el);
```

### 3.6 Rectangle

```ts
import { RectElement } from "@twick/timeline";

// RectElement(fill: string, size: Size)
const el = new RectElement("#3366FF", { width: 400, height: 200 });

el.setStart(0);
el.setEnd(4);
el.setPosition({ x: 0, y: 0 });

const track = editor.getTrackById("t-element-id");
if (track) await editor.addElementToTrack(track, el);
```

### 3.7 Circle

```ts
import { CircleElement } from "@twick/timeline";

// CircleElement(fill: string, radius: number)
const el = new CircleElement("#FF0000", 80);

el.setStart(0);
el.setEnd(3);
el.setPosition({ x: 100, y: 100 });

const track = editor.getTrackById("t-element-id");
if (track) await editor.addElementToTrack(track, el);
```

### 3.8 Icon

```ts
import { IconElement } from "@twick/timeline";

// IconElement(src: string, size: Size, fill?: string)
const el = new IconElement("https://example.com/icon.svg", { width: 64, height: 64 }, "#866bbf");

el.setStart(1);
el.setEnd(5);
el.setPosition({ x: 50, y: 50 });

const track = editor.getTrackById("t-element-id");
if (track) await editor.addElementToTrack(track, el);
```

---

## 4. Watermark (add, update, remove)

The watermark is **not** on a track; it lives on the project and is rendered on top (e.g. in canvas and visualizer). It can be **text** or **image**.

### 4.1 Add or replace watermark

```ts
import { Watermark } from "@twick/timeline";

// Text watermark
const textWatermark = new Watermark("text");
textWatermark.setPosition({ x: 0, y: 0 });
textWatermark.setRotation(0);
textWatermark.setOpacity(0.8);
textWatermark.setProps({
  text: "© My Brand",
  fontSize: 24,
  fontFamily: "Arial",
  fill: "#FFFFFF",
});
editor.setWatermark(textWatermark);

// Image watermark
const imageWatermark = new Watermark("image");
imageWatermark.setPosition({ x: 100, y: 100 });
imageWatermark.setRotation(15);
imageWatermark.setOpacity(0.7);
imageWatermark.setProps({
  src: "https://example.com/logo.png",
  width: 120,
  height: 40,
});
editor.setWatermark(imageWatermark);
```

### 4.2 Update existing watermark

```ts
const w = editor.getWatermark();
if (w) {
  w.setPosition({ x: 50, y: 50 });
  w.setOpacity(0.9);
  w.setProps({ ...w.getProps(), text: "New text" });
  editor.setWatermark(w);
}
```

### 4.3 Change watermark type (e.g. text → image)

Create a new `Watermark` with the desired type and set it:

```ts
const newWatermark = new Watermark("image");
newWatermark.setPosition({ x: 0, y: 0 });
newWatermark.setRotation(0);
newWatermark.setOpacity(1);
newWatermark.setProps({ src: "https://example.com/logo.png", width: 100, height: 40 });
editor.setWatermark(newWatermark);
```

### 4.4 Remove watermark

```ts
editor.removeWatermark();
```

### 4.5 Read current watermark

```ts
const w = editor.getWatermark();
if (w) {
  w.getType();       // "text" | "image"
  w.getPosition();   // { x, y }
  w.getRotation();   // number
  w.getOpacity();    // number
  w.getProps();      // TextProps | ImageProps
}
```

---

## 5. Updating elements

Get the element (e.g. from a track or from selection), change its properties, then call `updateElement`:

```ts
const track = editor.getTrackById("t-xxx");
const element = track?.getElementById("e-xxx");
if (element) {
  // Mutate via setters (element is a class instance)
  element.setStart(1);
  element.setEnd(6);
  element.setPosition({ x: 100, y: 200 });
  element.setOpacity(0.8);
  // Type-specific: e.g. TextElement
  if (element.getType() === "text") element.setText("Updated text");
  editor.updateElement(element);
}
```

`updateElement(element: TrackElement)` returns the same element; it updates the track’s internal copy and triggers a refresh.

---

## 6. Deleting elements and tracks

### 6.1 Remove one element

```ts
editor.removeElement(element);
```

`element` must be the same instance (or have the same id and trackId) as one currently on a track.

### 6.2 Remove a track

```ts
editor.removeTrackById("t-xxx");
// or
editor.removeTrack(track);
```

Removing a track removes all its elements.

---

## 7. Loading a project and other helpers

```ts
// Load full project (replaces current timeline)
editor.loadProject({
  tracks: trackJSONArray,  // TrackJSON[]
  version: 1,
});

// Serialize current state to JSON (e.g. for save)
const data = editor.getTimelineData();
// data.tracks, data.version, data.watermark

// Refresh timeline/player after external changes
editor.refresh();

// Undo / Redo
editor.undo();
editor.redo();
```

---

## 8. Quick reference: element constructors and track types

| Element        | Constructor | Typical track type |
|----------------|------------|--------------------|
| Video          | `new VideoElement(src, parentSize)` | `TRACK_TYPES.VIDEO` or `TRACK_TYPES.SCENE` |
| Image          | `new ImageElement(src, parentSize)` | `TRACK_TYPES.ELEMENT` or `TRACK_TYPES.SCENE` |
| Audio          | `new AudioElement(src)` | `TRACK_TYPES.AUDIO` |
| Text           | `new TextElement(text, props?)` | `TRACK_TYPES.ELEMENT` |
| Caption        | `new CaptionElement(t, start, end)` | `TRACK_TYPES.CAPTION` |
| Rect           | `new RectElement(fill, size)` | `TRACK_TYPES.ELEMENT` |
| Circle         | `new CircleElement(fill, radius)` | `TRACK_TYPES.ELEMENT` |
| Icon           | `new IconElement(src, size, fill?)` | `TRACK_TYPES.ELEMENT` |

Common setters on elements (from `TrackElement`): `setStart(s)`, `setEnd(e)`, `setName(name)`, `setPosition({ x, y })`, `setRotation(angle)`, `setOpacity(0..1)`, `setProps({...})`.  
`addElementToTrack` will set `trackId` on the element; you do not need to set it yourself.

---

## 9. Minimal “create video” flow

```ts
import { TRACK_TYPES } from "@twick/timeline";

const { editor } = useTimelineContext();
const parentSize = { width: 1920, height: 1080 };

// 1. Track
const videoTrack = editor.addTrack("Video", TRACK_TYPES.VIDEO);
const textTrack = editor.addTrack("Text", TRACK_TYPES.ELEMENT);

// 2. Video
const videoEl = new VideoElement("https://example.com/intro.mp4", parentSize);
videoEl.setStart(0);
videoEl.setEnd(10);
await editor.addElementToTrack(videoTrack, videoEl);

// 3. Text overlay
const textEl = new TextElement("Welcome", { fill: "#FFF", fontSize: 72 });
textEl.setStart(2);
textEl.setEnd(8);
await editor.addElementToTrack(textTrack, textEl);

// 4. Watermark
const w = new Watermark("text");
w.setPosition({ x: 0, y: 0 });
w.setProps({ text: "© 2025", fontSize: 20, fill: "#FFF" });
editor.setWatermark(w);
```

This gives you a single video clip, a text overlay, and a text watermark. The same pattern extends to all other element types and to update/delete as above.
