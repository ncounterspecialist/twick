# Twick in Action

## Creating Videos with Browser Console

This document demonstrates how to create videos programmatically using the Twick SDK through the browser console. This approach is perfect for developers who want to automate video creation or experiment with the API.

## Prerequisites

- Clone the repository:

  ```bash
  git clone https://github.com/ncounterspecialist/twick
  ```

## Instructions
1. **Start the Example Application**: First, run the example application to have a working video editor interface:
   ```bash
   cd packages/examples
   pnpm install
   pnpm dev
   ```

2. **Open the Editor**: Navigate to the video editor page in your browser (typically `http://localhost:5173/demo`)

3. **Open Browser Console**: Press `F12` or right-click and select "Inspect" to open the browser's developer tools, then go to the Console tab.

## How It Works

The Twick SDK exposes a global registry called `twickTimelineEditors` that contains all active editor instances. Each editor is identified by a `contextId` (in this example, it's `"editor-demo"`).

### Step-by-Step Process

1. **Get the Editor Instance**: 
   ```javascript
   const editor = twickTimelineEditors.get("my-video-project");
   ```

2. **Create Tracks**: Add different types of tracks for your content:
   ```javascript
   const videoTrack = editor.addTrack("video");    // For video elements
   const textTrack = editor.addTrack("text");      // For text overlays
   const audioTrack = editor.addTrack("audio");    // For background music
   ```

3. **Create Elements**: Instantiate different types of elements:
   - `Twick.VideoElement()` - for video clips
   - `Twick.TextElement()` - for text overlays
   - `Twick.AudioElement()` - for background audio

4. **Configure Elements**: Set timing, positioning, and styling properties:
   ```javascript
   element.setStart(0)           // Start time in seconds
   element.setEnd(5)             // End time in seconds
   element.setStartAt(10)        // Start position in source video
   element.setPlaybackRate(1.5)  // Playback speed
   element.setPosition({x: 0, y: 0})  // Position on canvas
   ```

5. **Add Elements to Tracks**: Place elements on their respective tracks:
   ```javascript
   editor.addElementToTrack(track, element);
   ```

## Key Concepts

### Element Types
- **VideoElement**: Video clips with timing, playback rate, and positioning controls
- **TextElement**: Text overlays with font styling, colors, and positioning
- **AudioElement**: Background music or sound effects
- **ImageElement**: Static images or graphics
- **CaptionElement**: Subtitles or captions

### Timing Properties
- `setStart(time)`: When the element appears in the timeline (seconds)
- `setEnd(time)`: When the element disappears from the timeline (seconds)
- `setStartAt(time)`: Where to start playing from the source media (seconds)
- `setPlaybackRate(rate)`: Speed multiplier (1.0 = normal, 2.0 = 2x speed)

### Positioning & Styling
- `setPosition({x, y})`: Position on the canvas
- `setFrame({size: [width, height], x, y})`: Advanced positioning with scaling
- `setFill(color)`: Text color (hex, rgb, or named colors)
- `setStrokeColor(color)`: Text outline/stroke color
- `setLineWidth(width)`: Text outline/stroke thickness in pixels
- `setFontSize(size)`: Text size in pixels
- `setFontFamily(family)`: Font family (e.g., "Arial", "Impact")

## Simple Example for Beginners

Start with this simple example to create a basic video with text overlay:

```javascript
// Get the editor instance
const editor = twickTimelineEditors.get("my-video-project");

// Create a video track
const videoTrack = editor.addTrack("video");

// Create a video element (replace with your video URL)
const video = new Twick.VideoElement(
  "https://example.com/your-video.mp4",
  { width: 720, height: 1280 }
);
video.setStart(0).setEnd(10); // Show for 10 seconds
editor.addElementToTrack(videoTrack, video);

// Create a text track
const textTrack = editor.addTrack("text");

// Create a text overlay
const text = new Twick.TextElement("Hello World!")
  .setStart(2)           // Appear at 2 seconds
  .setEnd(8)             // Disappear at 8 seconds
  .setFill("#FFFFFF")    // White color
  .setStrokeColor("#000000") // Black outline
  .setLineWidth(1)       // Outline thickness
  .setFontSize(48)       // Large text
  .setPosition({x: 0, y: 0}); // Center position
editor.addElementToTrack(textTrack, text);
```

## Complete Example

Below is a complete example that creates a video with multiple clips, text overlays, and background music. Copy and paste this entire code block into your browser console:

```javascript
const editor = twickTimelineEditors.get("my-video-project");

const vidSrc1 = "https://static-assets.kifferai.com/developmen/a251d9971a55/brand-assets/video_1746786031627-96448ec8-6430-4d4b-bb89-ebdbfeade7fa.mp4";
const vidSrc2 = "https://static-assets.kifferai.com/developmen/a251d9971a55/brand-assets/video_1746786032120-6e4ab84c-d0dd-401e-b5e8-13d49fd8fe67.mp4";
const vidSrc3 = "https://static-assets.kifferai.com/developmen/a251d9971a55/brand-assets/video_1746790653457-7e9e9a1d-9410-4bb3-bec1-7474fa88286c.mp4";
const vidSrc4 = "https://static-assets.kifferai.com/developmen/a251d9971a55/brand-assets/video_1746790653457-7e9e9a1d-9410-4bb3-bec1-7474fa88286c.mp4";
const audioSrc1 = "https://static-assets.kifferai.com/developmen/a251d9971a55/brand-music/Unstoppable-Reprise-909549aa-6807-482b-ab92-bce7e6834fe7.mp3";

const t1 = editor.addTrack("video");

const video1 = new Twick.VideoElement(
  vidSrc1,
  { width: 720, height: 1280 }
);

video1.setStart(0)
.setEnd(3.689)
.setStartAt(10.238)
.setPlaybackRate(1.5);
editor.addElementToTrack(t1, video1);

const video2 = new Twick.VideoElement(
  vidSrc2,
  { width: 720, height: 1280 }
)
.setStart(3.689)
.setEnd(5.895)
.setStartAt(1.308);
editor.addElementToTrack(t1, video2);

const video3 = new Twick.VideoElement(
  vidSrc3,
  { width: 720, height: 1280 }
)
.setStart(5.895)
.setEnd(7.995)
.setPlaybackRate(1.3);
editor.addElementToTrack(t1, video3);

video3.setFrame({
  size: [2310.219982189786, 1296.290101117602],
  x: 202.5056893214803,
  y: -5.976130516396097,
});
editor.updateElement(video3);

const video4 = new Twick.VideoElement(
  vidSrc3,
  { width: 720, height: 1280 }
)
.setStart(7.995)
.setEnd(8.626)
.setStartAt(7.257);
editor.addElementToTrack(t1, video4);

video4.setFrame({
  size: [2327.7624240371783, 1306.1333601541946],
  x: -183.29290078721348,
  y: -1.4611625555497767,
});
editor.updateElement(video4);

const video5 = new Twick.VideoElement(
  vidSrc4,
  { width: 720, height: 1280 }
)
.setStart(8.626)
.setEnd(10.826)
.setPlaybackRate(1.3);
editor.addElementToTrack(t1, video5);

video5.setFrame({
  size: [2306.939049473814, 1294.4491333158624],
  x: 74.60906934418472,
  y: 9.298954740084696,
});
editor.updateElement(video5);

const video6 = new Twick.VideoElement(
  vidSrc4,
  { width: 720, height: 1280 }
)
.setStart(10.826)
.setEnd(12.152)
.setStartAt(7.674);
editor.addElementToTrack(t1, video6);

video6.setFrame({
  size: [2453.2561179659288, 1376.5492661919934],
  x: 483.28393374533766,
  y: 23.082552042915836,
});
editor.updateElement(video6);

const video7 = new Twick.VideoElement(
  vidSrc4,
  { width: 720, height: 1280 }
)
.setStart(12.152)
.setEnd(13.25)
.setStartAt(14.922)
.setPlaybackRate(1.2);
editor.addElementToTrack(t1, video7);

video7.setFrame({
  size: [2384.787279090284, 1338.1306399339926],
  x: -38.872787947072425,
  y: 2.277650172812173,
});
editor.updateElement(video7);

const video8 = new Twick.VideoElement(
  vidSrc4,
  { width: 720, height: 1280 }
)
.setStart(13.25)
.setEnd(14.467)
.setStartAt(22.726);
editor.addElementToTrack(t1, video8);

video8.setFrame({
  size: [2232.8991871431735, 1252.904543897003],
  x: 32.3325939081908,
  y: 17.91511065476152,
});
editor.updateElement(video8);

const video9 = new Twick.VideoElement(
  vidSrc4,
  { width: 720, height: 1280 }
)
.setStart(14.467)
.setEnd(16.006)
.setStartAt(24.959);
editor.addElementToTrack(t1, video9);

video9.setFrame({
  size: [2377.573334179124, 1334.0828152893973],
  x: 204.65855210046755,
  y: -13.932081984784418,
});
editor.updateElement(video9);

const t2 = editor.addTrack("text");

const text1 = new Twick.TextElement("GOD WILL BREAK YOU")
.setStart(0.346)
.setEnd(3.513)
.setFill("#ffd700")
.setStrokeColor("#000000")
.setLineWidth(0.5)
.setFontSize(54)
.setFontFamily("Impact")
.setFontWeight(700)
.setFontStyle("italic")
.setPosition({ x: 6.783908864364548, y: 97.1750927093608 });
editor.addElementToTrack(t2, text1);

const text2 = new Twick.TextElement("BREAK YOU AGAIN")
.setStart(4.001)
.setEnd(5.882)
.setFill("#FFFFFF")
.setStrokeColor("#000000")
.setLineWidth(0.5)
.setFontSize(54)
.setFontFamily("Impact")
.setFontWeight(700)
.setFontStyle("normal")
.setPosition({ x: 0, y: 74.576233939742 });
editor.addElementToTrack(t2, text2);

const t3 = editor.addTrack("text2");
const text3 = new Twick.TextElement("AND THEN")
.setStart(4.957)
.setEnd(5.89)
.setFill("#ffd700")
.setStrokeColor("#000000")
.setLineWidth(0.5)
.setFontSize(54)
.setFontFamily("Impact")
.setFontWeight(700)
.setFontStyle("italic")
.setPosition({ x: 2.261302954788164, y: 146.89258200252198 });
editor.addElementToTrack(t3, text3);

const text4 = new Twick.TextElement("BREAK YOU ONCE AGAIN")
.setStart(6.006)
.setEnd(7.927)
.setFill("#ffd700")
.setStrokeColor("#000000")
.setLineWidth(0.5)
.setFontSize(54)
.setFontFamily("Impact")
.setFontWeight(700)
.setFontStyle("italic")
.setPosition({ x: 6.783908864364548, y: 119.7739514789796 });
await editor.addElementToTrack(t2, text4);

const text5 = new Twick.TextElement("BUT")
.setStart(8.639)
.setEnd(10.773)
.setFill("#ffd700")
.setStrokeColor("#000000")
.setLineWidth(0.5)
.setFontSize(58)
.setFontFamily("Impact")
.setFontWeight(700)
.setFontStyle("italic");
await editor.addElementToTrack(t2, text5);

const text6 = new Twick.TextElement("IN THE END")
.setStart(10.895)
.setEnd(12.12)
.setFill("#FFFFFF")
.setStrokeColor("#000000")
.setLineWidth(0.5)
.setFontSize(54)
.setFontFamily("Impact")
.setFontWeight(700)
.setFontStyle("italic")
.setRotation(0)
.setPosition({ x: 2.2613029547882206, y: 101.69486446328449 });
editor.addElementToTrack(t2, text6);

const text7 = new Twick.TextElement("HE WILL MAKE YOU")
.setStart(14.62)
.setEnd(15.991)
.setStrokeColor("#000000")
.setLineWidth(0.5)
.setFill("#FFFFFF")
.setFontSize(54)
.setFontFamily("Impact")
.setFontWeight(700)
.setFontStyle("normal")
.setPosition({ x: 38.44215023139918, y: 74.57623393974211 });
editor.addElementToTrack(t2, text7);

const text8 = new Twick.TextElement("HAPPY")
.setStart(14.85)
.setEnd(15.974)
.setFill("#ffd700")
.setStrokeColor("#000000")
.setLineWidth(0.5)
.setFontSize(58)
.setFontFamily("Impact")
.setFontWeight(700)
.setFontStyle("italic")
.setRotation(0)
.setPosition({ x: 33.919544321822684, y: 142.37281024859828 });
editor.addElementToTrack(t3, text8);

const t4 = editor.addTrack("audio");
const audioElement = new Twick.AudioElement(
  audioSrc1
);
audioElement.setStart(0);
audioElement.setEnd(16.055);
editor.addElementToTrack(t4, audioElement);
```

## Troubleshooting

### Common Issues

1. **"twickTimelineEditors is not defined"**
   - Make sure you're on the video editor page
   - Refresh the page and try again
   - Check that the editor has fully loaded

2. **"editor-demo not found"**
   - Verify you're using the correct context ID
   - The default ID is usually "editor-demo" but may vary

3. **Elements not appearing**
   - Check that you've added elements to tracks using `addElementToTrack()`
   - Verify timing values are correct (start < end)
   - Ensure media URLs are accessible

4. **Video not playing**
   - Check that video URLs are valid and accessible
   - Ensure video format is supported (MP4, WebM, etc.)
   - Verify CORS settings if using external URLs

### Tips for Success

1. **Start Simple**: Begin with basic examples before creating complex timelines
2. **Test URLs**: Ensure all media URLs are accessible before adding to timeline
3. **Use Console Logs**: Add `console.log()` statements to debug your code
4. **Check Timing**: Make sure start times are before end times
5. **Save Your Work**: The editor maintains state, but consider saving your timeline data

### Useful Console Commands

```javascript
// Check available editors
console.log(twickTimelineEditors);

// Get current timeline data
const editor = twickTimelineEditors.get("editor-demo");
console.log(editor.getTimelineData());

// Clear all tracks (start fresh)
const editor = twickTimelineEditors.get("editor-demo");
editor.getTimelineData()?.tracks.forEach(track => {
  track.elements.forEach(element => {
    editor.removeElement(element);
  });
});
```

## Next Steps

Once you're comfortable with console-based video creation, you can:

1. **Integrate with Your App**: Use the Twick SDK in your own React applications
2. **Automate Workflows**: Create scripts to generate videos programmatically
3. **Build Custom UI**: Create your own video editing interface
4. **Explore Advanced Features**: Add animations, effects, and transitions

For more information, check out the other documentation pages and examples in this project.
