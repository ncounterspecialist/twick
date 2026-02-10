# Twick in Action

## Creating Videos with Browser Console

This document demonstrates how to create videos programmatically using the Twick SDK through the browser console. This approach is perfect for developers who want to automate video creation or experiment with the API.

## Key Concepts

### Element Types
- **VideoElement**: Video clips with timing, playback rate, and positioning controls
- **TextElement**: Text overlays with font styling, colors, and positioning
- **AudioElement**: Background music or sound effects
- **ImageElement**: Static images or graphics
- **CaptionElement**: Captions or captions

### Timing Properties
- `setStart(time)`: When the element appears in the timeline (seconds)
- `setEnd(time)`: When the element disappears from the timeline (seconds)
- `setStartAt(time)`: Where to start playing from the source media (seconds)
- `setPlaybackRate(rate)`: Speed multiplier (1.0 = normal, 2.0 = 2x speed)

### Positioning & Styling
- `setPosition({x, y})`: Position on the canvas
- `setFrame({size: [width, height], x, y})`: Advanced positioning with scaling
- `setFill(color)`: Text color (hex, or named colors)
- `setStrokeColor(color)`: Text outline/stroke color
- `setLineWidth(width)`: Text outline/stroke thickness in pixels
- `setFontSize(size)`: Text size in pixels
- `setFontFamily(family)`: Font family (e.g., "Impact")

## Getting Started

You have two options to try Twick in action:

### **Option 1: Clone and Run the Example Project**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ncounterspecialist/twick
   ```

2. **Start the Example Application:**  
   This will launch a ready-to-use video editor interface.
   ```bash
   cd packages/examples
   pnpm install
   pnpm build
   pnpm preview
   ```

3. **Open the Editor:**  
   In your browser, go to [http://localhost:4173/demo](http://localhost:5173/demo).

4. **Open the Browser Console:**  
   Press `F12` or right-click and select "Inspect" to open developer tools, then go to the Console tab.

---

### **Option 2: Integrate Twick into Your Own App**

If you want to use Twick in your own project, follow these steps:

1. **Install Twick packages:**  
   (You may need to adjust package names based on your needs.)
   ```bash
   pnpm add @twick/video-editor @twick/timeline @twick/live-player
   ```

2. **Set Up the Editor in Your App:**  
   Import and render the Twick editor component in your React app. For example:
    ```typescript
    import React from 'react';
    import VideoEditor from "@twick/video-editor";
    import { LivePlayerProvider } from "@twick/live-player";
    import { TimelineProvider } from "@twick/timeline";
    import "@twick/video-editor/dist/video-editor.css";

    function App() {
      return (
        <LivePlayerProvider>
          <TimelineProvider
            contextId="my-video-project"
          >
            <VideoEditor
              editorConfig={{
                canvasMode: true,
                videoProps: { width: 720, height: 1280 }
              }}
            />
          </TimelineProvider>
        </LivePlayerProvider>
    );
    }

    export default App;
    ```

3. **Open Your App in the Browser:**  
   Navigate to the page where you rendered the editor.

4. **Open the Browser Console:**  
   Press `F12` or right-click and select "Inspect" to open developer tools, then go to the Console tab.

5. **Allow Pasting in the Browser Console:**  
   Some browsers block pasting code into the console for security reasons.  
   - In Chrome, press `Ctrl+Shift+V` (Windows/Linux) or `Cmd+Shift+V` (Mac) after focusing the console input, or type `allow pasting` and press Enter.
   - In Firefox, click the "Paste" button that appears in the console, or use `Ctrl+V`/`Cmd+V` if enabled.
   - If you see a warning or prompt, follow the browser's instructions to enable pasting.

Now you can follow the same programmatic steps in the console as described below!

## Simple Example for Beginners

Start with this simple example to create a basic video with text overlay:

```javascript
// Get the editor instance
const editor = twickTimelineEditors.get("my-video-project");

// Create a video track
const videoTrack = editor.addTrack("video");

// Create a video element (replace with your video URL)
const video = new Twick.VideoElement(
  "https://videos.pexels.com/video-files/4622990/4622990-uhd_1440_2560_30fps.mp4",
  { width: 720, height: 1280 }
);
video.setStart(0).setEnd(8); // Show for 8 seconds
await editor.addElementToTrack(videoTrack, video); // wait for the element to be added to the track

// Create a text track
const textTrack = editor.addTrack("text");

// Create a text overlay
const text1 = new Twick.TextElement("Hello!")
  .setStart(0.25)           // Appear at 0.25 seconds
  .setEnd(2.5)             // Disappear at 2.5 seconds
  .setFill("#000000")    // Black color
  .setStrokeColor("#FFD700") // Golden outline
  .setLineWidth(0.25)    // Outline thickness
  .setFontFamily("handyrush") // Font Family HandyRush
  .setFontSize(64)       // Large text
  .setPosition({x: 0, y: 580}); // Set position

// wait for the element to be added to the track
await editor.addElementToTrack(textTrack, text1); 

// Adding animation
const blur = new Twick.ElementAnimation("blur");
blur.setInterval(0.5)
blur.setAnimate("enter");

text1.setAnimation(blur);
editor.updateElement(text1);

const text2 = new Twick.TextElement("Have a nice day!")
  .setStart(3)           // Appear at 3 seconds
  .setEnd(8)             // Disappear at 10 seconds
  .setFill("#000000")    // Black color
  .setStrokeColor("#FFD700") // Golden outline
  .setLineWidth(0.5)    // Outline thickness
  .setFontFamily("handyrush") // Font Family Impact
  .setFontSize(64)       // Large text
  .setPosition({x: 0, y: 580}); // Set position

// wait for the element to be added to the track
await editor.addElementToTrack(textTrack, text2); 

const typewriter = new Twick.ElementTextEffect("typewriter"); 
typewriter.setDuration(2);

text2.setTextEffect(typewriter);
editor.updateElement(text2);
```
## Troubleshooting

### Common Issues

1. **"twickTimelineEditors is not defined"**
   - Make sure you're on the video editor page
   - Refresh the page and try again
   - Check that the editor has fully loaded

2. **"editor not found"**
   - Verify you're using the correct context ID

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
const editor = twickTimelineEditors.get("my-video-project");
console.log(editor.getTimelineData());

// Clear all tracks (start fresh)
const editor = twickTimelineEditors.get("my-video-project");
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
