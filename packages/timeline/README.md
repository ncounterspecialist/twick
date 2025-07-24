# @twick/timeline

## Timeline Editor CRUD Operations

The TimelineEditor provides a clean interface for managing tracks and elements using the visitor pattern.

### Track Operations

```typescript
import { TimelineEditor, TimelineOperationContext } from '@twick/timeline';

// Create editor with context
const context: TimelineOperationContext = {
  contextId: 'my-editor',
  setTotalDuration: (duration) => console.log('Duration:', duration),
  setPresent: (data) => console.log('Present:', data),
  handleUndo: () => console.log('Undo'),
  handleRedo: () => console.log('Redo'),
  handleResetHistory: () => console.log('Reset History'),
  setLatestProjectVersion: (version) => console.log('Version:', version),
  setTimelineAction: (action, payload) => console.log('Action:', action, payload),
};

const editor = new TimelineEditor(context);

// Create a new track
const track = editor.addTrack('My Video Track');

// Get track by ID
const trackById = editor.getTrackById(track.getId());

// Get track by name
const trackByName = editor.getTrackByName('My Video Track');

// Remove track
editor.removeTrackById(track.getId());
```

### Element Operations (Using Visitor Pattern)

The TimelineEditor uses the visitor pattern to handle different element types consistently:

```typescript
import { 
  TimelineEditor, 
  TextElement, 
  VideoElement, 
  ImageElement,
  AudioElement,
  TrackElement
} from '@twick/timeline';

// Add elements to track
const textElement = new TextElement('Hello World')
  .setStart(0)
  .setEnd(5)
  .setName('Welcome Text');

const videoElement = new VideoElement('video.mp4', { width: 720, height: 480 })
  .setStart(0)
  .setEnd(30)
  .setName('Main Video');

// Add elements using visitor pattern
await editor.addElementToTrack(track.getId(), textElement);
await editor.addElementToTrack(track.getId(), videoElement);

// Update elements
const updatedTextElement = new TextElement('Updated Text')
  .setId(textElement.getId()) // Keep same ID
  .setStart(0)
  .setEnd(8)
  .setName('Updated Welcome Text');

editor.updateElementInTrack(track.getId(), updatedTextElement);

// Remove elements
editor.removeElementFromTrack(track.getId(), textElement);
```

### Complete CRUD Example

```typescript
// Create editor and track
const editor = new TimelineEditor(context);
const track = editor.addTrack('Demo Track');

// Create elements
const textElement = new TextElement('Sample Text')
  .setStart(0)
  .setEnd(5)
  .setName('Sample Text Element');

const imageElement = new ImageElement('image.jpg', { width: 300, height: 200 })
  .setStart(5)
  .setEnd(10)
  .setName('Sample Image');

// Add elements
await editor.addElementToTrack(track.getId(), textElement);
await editor.addElementToTrack(track.getId(), imageElement);

// Update element
const updatedText = new TextElement('Updated Sample Text')
  .setId(textElement.getId())
  .setStart(0)
  .setEnd(8)
  .setName('Updated Text Element');

editor.updateElementInTrack(track.getId(), updatedText);

// Remove element
editor.removeElementFromTrack(track.getId(), imageElement);

// Get timeline data
const timelineData = editor.getTimelineData();
console.log('Timeline:', timelineData);
```

### Utility Functions

```typescript
import { 
  getCurrentElements, 
  getTotalDuration, 
  generateShortUuid,
  isElementId,
  isTrackId 
} from '@twick/timeline';

// Get elements currently playing at a specific time
const currentElements = getCurrentElements(currentTime, tracks);

// Get total duration of all tracks
const totalDuration = getTotalDuration(trackData);

// Generate unique IDs
const elementId = generateShortUuid(); // "e-xxxxxxxxxxxx"
const trackId = generateShortUuid();   // "t-xxxxxxxxxxxx"

// Check ID types
isElementId('e-123456789abc'); // true
isTrackId('t-123456789abc');   // true
```

### Visitor Pattern Benefits

- **Type Safety**: Each element type is handled specifically
- **Extensibility**: Easy to add new element types
- **Consistency**: Same pattern for all CRUD operations
- **Maintainability**: Clean separation of concerns

### React Hook Usage

```typescript
import { useTimelineEditor } from '@twick/timeline';

function MyComponent() {
  const editor = useTimelineEditor();
  
  // Use editor methods
  const track = editor.addTrack('My Track');
  
  // Add elements
  const textElement = new TextElement('Hello World')
    .setStart(0)
    .setEnd(5);
    
  await editor.addElementToTrack(track.getId(), textElement);
  
  return <div>Timeline Editor Ready</div>;
}
```


