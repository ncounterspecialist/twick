---
sidebar_position: 2
---

# Installation 

Integrate Twick Video Editor Into Your Project

## 1️⃣ Install the Required Packages
Install the core Twick packages using npm:

```
npm install --save @twick/canvas @twick/live-player @twick/timeline  @twick/video-editor
```

## 2️⃣ Embed the Context-Based Video Editor
Wrap the VideoEditor component with LivePlayerProvider and TimelineProvider to enable playback and timeline editing via context:

```
<LivePlayerProvider>
  <TimelineProvider
    initialData={{
      timeline: [], // Initial timeline data
      version: 0,
    }}
  >
    <VideoEditor
      leftPanel={null}   // Optional: pass a custom left panel
      rightPanel={null}  // Optional: pass a custom right panel
      editorConfig={{
        videoProps: {
          width: 720,     // Desired video width
          height: 1280,   // Desired video height
        },
      }}
    />
  </TimelineProvider>
</LivePlayerProvider>
```
## 3️⃣ Use the Timeline Context Hook
Twick provides a custom hook called useTimelineContext() that gives you access to the timeline's internal state and operations. You can use this hook to:

Access the currently selected timeline item (selectedItem)

Perform operations like add, update, or delete element using setTimelineOperation

```
import { useTimelineContext, TIMELINE_OPERATION } from '@twick/timeline';

const { setTimelineOperation } = useTimelineContext();

// Add Text Element
setTimelineOperation(TIMELINE_OPERATION.ADD_ELEMENT, {
      timelineId,
      element: {
        type: TIMELINE_ELEMENT_TYPE.TEXT,
        props: {
          text: "Sample",
        },
      },
    });
```

✅ Use this hook in any component inside the TimelineProvider to build custom controls, panels, or editing logic based on timeline state.

