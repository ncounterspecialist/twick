---
sidebar_position: 3
---

# Timeline Operations

Below you'll find a section for each available timeline operation in Twick's video editing SDK. Each section describes what the operation does, the expected data payload when dispatching it, and a reference to the relevant API/type documentation (where available).

---


## Timeline Operation Reference

Below is a list of all available `TIMELINE_OPERATION` types, with a description of what each operation does and the expected payload structure when dispatching it.


---

### `SET_TIMELINE`
- **Description:** Sets or replaces the current timeline with a new timeline object.
- **Payload:**  
  ```ts
  {
    timeline: Timeline
  }
  ```
  Where `Timeline` is the full timeline object to set.

---

### `ADD_NEW_TIMELINE`
- **Description:** Adds a new, empty timeline to the project.
- **Payload:**  
  ```ts
  {
    timeline: Timeline
  }
  ```
  The new timeline object to add.

---

### `UPDATE_CAPTION_TIMELINE`
- **Description:** Updates the caption timeline, typically after editing captions or their timing.
- **Payload:**  
  ```ts
  {
    timelineId: string,
    captions: Caption[]
  }
  ```
  Where `captions` is the updated list of caption objects.

---

### `ADD_ELEMENT`
- **Description:** Adds a new element (video, image, text, etc.) to a timeline.
- **Payload:**  
  ```ts
  {
    timelineId: string,
    element: TimelineElement
  }
  ```
  The element to add and the timeline to add it to.

---

### `UPDATE_ELEMENT`
- **Description:** Updates an existing element's properties (position, timing, etc.) in a timeline.
- **Payload:**  
  ```ts
  {
    timelineId: string,
    elementId: string,
    updates: Partial<TimelineElement>
  }
  ```
  The element to update and the properties to change.

---

### `DELETE_ITEM`
- **Description:** Deletes an element or timeline from the project.
- **Payload:**  
  ```ts
  {
    timelineId?: string,
    elementId?: string
  }
  ```
  Provide `elementId` to delete an element, or `timelineId` to delete a timeline.

---

### `UPDATE_CAPTION_PROPS`
- **Description:** Updates properties of captions, such as style, font, or color.
- **Payload:**  
  ```ts
  {
    timelineId: string,
    props: CaptionProps
  }
  ```
  The new caption properties to apply.

---

### `ADD_SOLO_ELEMENT`
- **Description:** Adds a new element to the timeline, ensuring it is the only element at that time (solo).
- **Payload:**  
  ```ts
  {
    timelineId: string,
    element: TimelineElement
  }
  ```
  The solo element to add.

---

### `SPLIT_ELEMENT`
- **Description:** Splits an element (e.g., video or audio) at a specific time into two separate elements.
- **Payload:**  
  ```ts
  {
    timelineId: string,
    elementId: string,
    splitTime: number
  }
  ```
  The element to split and the time (in seconds) to split at.

---

### `LOAD_PROJECT`
- **Description:** Loads a full project, replacing the current state.
- **Payload:**  
  ```ts
  {
    project: Project
  }
  ```
  The project object to load.

---

### `SET_PROJECT_SCRIPT`
- **Description:** Sets or updates the script associated with the project (e.g., for captions or narration).
- **Payload:**  
  ```ts
  {
    script: string
  }
  ```
  The new script text.

---

### `UPDATE_CANVAS_ELEMENTS`
- **Description:** Updates the set of elements currently rendered on the canvas (e.g., after a bulk change).
- **Payload:**  
  ```ts
  {
    timelineId: string,
    elements: TimelineElement[]
  }
  ```
  The updated list of elements.

---

### `SET_ELEMENT_ANIMATION`
- **Description:** Sets or updates the animation for a specific element.
- **Payload:**  
  ```ts
  {
    timelineId: string,
    elementId: string,
    animation: Animation | null
  }
  ```
  The animation object to apply, or `null` to remove animation.

---

### `SET_TEXT_EFFECT`
- **Description:** Sets or updates a text effect (e.g., typewriter, elastic) for a text element.
- **Payload:**  
  ```ts
  {
    timelineId: string,
    elementId: string,
    effect: TextEffect | null
  }
  ```
  The text effect to apply, or `null` to remove the effect.

---
