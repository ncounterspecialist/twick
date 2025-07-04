# TimelineService Singleton

The `TimelineService` is a singleton class that provides a centralized way to manage all timeline operations. It serves as a single point of communication for adding timelines, elements, animations, and other timeline operations.

## Usage

### 1. Initialize the Service

```typescript
import { TimelineService } from '@twick/timeline';

// Initialize with configuration
TimelineService.initialize({
  videoSize: { width: 1920, height: 1080 },
  onTimelineUpdate: (data) => {
    // Handle timeline updates
    console.log('Timeline updated:', data);
  },
  onSelectionChange: (item) => {
    // Handle selection changes
    console.log('Selection changed:', item);
  },
  onOperationComplete: (operation, data) => {
    // Handle operation completion
    console.log('Operation completed:', operation, data);
  },
});
```

### 2. Timeline Operations

#### Add Timeline
```typescript
const { timeline, version } = TimelineService.addTimeline({
  type: 'video',
  name: 'Main Video',
  allowOverlap: false,
  props: { /* timeline properties */ }
});
```

#### Edit Timeline
```typescript
const { timelineId, updates, version } = TimelineService.editTimeline(
  'timeline-id',
  { name: 'Updated Name' }
);
```

#### Delete Timeline
```typescript
const { timelineId, version } = TimelineService.deleteTimeline('timeline-id');
```

### 3. Element Operations

#### Add Element
```typescript
const { timelineId, element, version } = await TimelineService.addElement({
  timelineId: 'timeline-id',
  type: 'image',
  props: {
    src: 'image.jpg',
    width: 100,
    height: 100,
    x: 0,
    y: 0,
    objectFit: 'contain'
  },
  timing: { s: 0, e: 5 },
  name: 'My Image'
});
```

#### Edit Element
```typescript
const { timelineId, elementId, updates, version } = TimelineService.editElement({
  timelineId: 'timeline-id',
  elementId: 'element-id',
  updates: { name: 'Updated Element' },
  noSelection: false
});
```

#### Delete Element
```typescript
const { timelineId, elementId, version } = TimelineService.deleteElement(
  'timeline-id',
  'element-id'
);
```

### 4. Animation Operations

#### Set Element Animation
```typescript
const { timelineId, elementId, animation, version } = TimelineService.setElementAnimation({
  timelineId: 'timeline-id',
  elementId: 'element-id',
  animation: {
    name: 'fade',
    animate: 'enter',
    direction: 'top',
    interval: 1
  }
});
```

### 5. Utility Methods

#### Get Timeline Data
```typescript
const timelineData = TimelineService.getTimelineData();
```

#### Get Specific Timeline
```typescript
const timeline = TimelineService.getTimeline('timeline-id');
```

#### Get Element
```typescript
const element = TimelineService.getElement('element-id');
```

#### Get Timeline Properties
```typescript
const props = TimelineService.getTimelineProps('timeline-id');
```

#### Get Total Duration
```typescript
const duration = TimelineService.getTotalDuration();
```

#### Selection Management
```typescript
// Set selected item
TimelineService.setSelectedItem(element);

// Get selected item
const selected = TimelineService.getSelectedItem();
```

## Integration with React

The `useTimeline` hook is already updated to use the TimelineService singleton. You can continue using it as before:

```typescript
import { useTimeline } from '@twick/timeline';

const { addTimeline, addElement, editElement } = useTimeline({
  selectedItem,
  captionProps,
  videoSize,
  applyPropsToAllSubtitle: false,
});
```

## Benefits

1. **Single Point of Communication**: All timeline operations go through one service
2. **Decoupled from React**: Can be used outside React components
3. **Centralized State Management**: All timeline state is managed in one place
4. **Type Safety**: Full TypeScript support with proper interfaces
5. **Event-Driven**: Callbacks for UI updates and operation completion
6. **Reusable**: Can be used across different parts of your application

## Architecture

The TimelineService follows the singleton pattern and provides:

- **State Management**: Internal timeline data and element maps
- **Operation Methods**: CRUD operations for timelines and elements
- **Event System**: Callbacks for UI synchronization
- **Utility Methods**: Helper functions for data access
- **Type Safety**: Full TypeScript interfaces for all operations 