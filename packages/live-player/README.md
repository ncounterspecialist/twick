# @twick/live-player

A React component for video playback and control 

## Features

- 🎥 Video playback with custom controls
- ⏱️ Time tracking and duration management
- 📊 Project data support for complex video configurations
- 🎯 Customizable video dimensions
- 🔄 Play/pause state management
- ⚡ High-performance video rendering

## Requirements

- React 18 or higher
- Browser environment with HTML5 Video support

## Installation

```bash
npm install @twick/live-player
```

## Usage

```tsx
import React, { useState } from "react";
import projectData from "./sample";
import { LivePlayer } from "@twick/live-player";

function VideoPlayerComp() {
  const [playing, setPlaying] = useState(false);

  return (
    <div>
      <button onClick={() => setPlaying((prev) => !prev)}>Toggle playback</button>
      <LivePlayer
        projectData={projectData} // Your video project configuration
        videoSize={{
          width: 720,
          height: 1280,
        }}
        playing={playing}
      />
    </div>
  );
}

export default VideoPlayerComp;

```



## Sample Project data
```
{
    "input": {
      "properties": {
        "width": 720,
        "height": 1280
      },
      "timeline": [
        {
          "id": "t-element",
          "type": "element",
          "elements": [
            {
              "id": "e-244f8d5a3baa",
              "type": "rect",
              "s": 0,
              "e": 5,
              "props": {
                "width": 720,
                "height": 1280,
                "fill": "#FFF000"
              }
            }
          ],
          "name": "element"
        },
        {
          "id": "t-element",
          "type": "element",
          "elements": [
            {
              "id": "e-244f8d5a3bba",
              "type": "text",
              "s": 0,
              "e": 1,
              "props": {
                "text": "Hello Guys!",
                "fontSize": 100,
                "fontColor": "#FFF000"
              }
            },
            {
              "id": "e-244f8d5a3bbb",
              "type": "text",
              "s": 1,
              "e": 4,
              "props": {
                "text": "Welcome to the world of Twick!",
                "fontSize": 100,
                "fontColor": "#FFF000",
                "maxWidth": 500,
                "textAlign": "center",
                "textWrap": true
              }
            }
          ],
          "name": "element"
        }
      ]
    },
    "version": 1
  }
```

### Required Props

- `projectData`: Object containing video project configuration
- `videoSize`: Object specifying video dimensions
  ```typescript
  {
    width: number;
    height: number;
  }
  ```

### Optional Props

- `playing`: Boolean to control play/pause state
- `onDurationChange`: Callback function when video duration changes
- `onTimeUpdate`: Callback function for time updates during playback

## Exports

### Components

- `LivePlayer`: Main video player component

### Types

- `LivePlayerProps`: Props interface for LivePlayer component
- `VideoSize`: Interface for video dimensions
- `ProjectData`: Interface for video project configuration

## Browser Support

This library requires a browser environment with support for:
- HTML5 Video
- Modern JavaScript features (ES2020+)

## License

Apache-2.0 