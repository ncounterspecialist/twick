import { TimelineEditor } from "../core/editor/timeline.editor";

// Global registry to store editor instances by contextId
export const editorRegistry = new Map<string, TimelineEditor>();

// Expose the registry to the global window object for console access
declare global {
  interface Window {
    twickTimelineEditors: Map<string, TimelineEditor>;
  }
}

// Initialize the global registry on window
if (typeof window !== 'undefined') {
  window.twickTimelineEditors = editorRegistry;
}