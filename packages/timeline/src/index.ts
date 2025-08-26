/**
 * @twick/timeline - Timeline Package
 * 
 * A comprehensive timeline management system for the Twick video platform.
 * Provides track-based video editing capabilities with support for multiple
 * element types, undo/redo functionality, and real-time timeline manipulation.
 * 
 * @example
 * ```jsx
 * import { 
 *   TimelineProvider, 
 *   TimelineEditor, 
 *   Track, 
 *   VideoElement,
 *   TextElement 
 * } from '@twick/timeline';
 * 
 * function App() {
 *   return (
 *     <TimelineProvider contextId="my-timeline">
 *       <TimelineEditor />
 *     </TimelineProvider>
 *   );
 * }
 * ```
 */

import { TIMELINE_ELEMENT_TYPE } from "./utils/constants";
import { TimelineEditor } from "./core/editor/timeline.editor";
import {
  TimelineProvider,
  TimelineProviderProps,
} from "./context/timeline-context";
import { Track } from "./core/track/track";
import { ElementDeserializer } from "./core/visitor/element-deserializer";
import { ElementSerializer } from "./core/visitor/element-serializer";
import { ElementValidator } from "./core/visitor/element-validator";
import { ElementAdder } from "./core/visitor/element-adder";
import { ElementRemover } from "./core/visitor/element-remover";
import { ElementUpdater } from "./core/visitor/element-updater";
import { ElementSplitter } from "./core/visitor/element-splitter";
import { ElementCloner } from "./core/visitor/element-cloner";
import { CaptionElement } from "./core/elements/caption.element";
import { RectElement } from "./core/elements/rect.element";
import { TextElement } from "./core/elements/text.element";
import { ImageElement } from "./core/elements/image.element";
import { AudioElement } from "./core/elements/audio.element";
import { CircleElement } from "./core/elements/circle.element";
import { IconElement } from "./core/elements/icon.element";
import { VideoElement } from "./core/elements/video.element";
import {
  generateShortUuid,
  getTotalDuration,
  getCurrentElements,
  isTrackId,
  isElementId,
} from "./utils/timeline.utils";
import { TrackElement } from "./core/elements/base.element";
import { ElementAnimation } from "./core/addOns/animation";
import { ElementFrameEffect } from "./core/addOns/frame-effect";
import { ElementTextEffect } from "./core/addOns/text-effect";

// Core element types
export {
  TrackElement,
  Track,
  CaptionElement,
  RectElement,
  TextElement,
  ImageElement,
  IconElement,
  AudioElement,
  CircleElement,
  VideoElement,
  ElementAnimation,
  ElementFrameEffect,
  ElementTextEffect
};

// Timeline management
export {
  TimelineProvider,
  TimelineEditor,
};

// Types and interfaces
export type { TimelineProviderProps };
export { TIMELINE_ELEMENT_TYPE };

// Utilities and helpers
export * from "./types";
export * from "./utils/constants";
export * from "./utils/timeline.utils";
export * from "./context/timeline-context";

// Core components
export * from "./core/track/track";
export * from "./core/elements/base.element";
export * from "./core/visitor/element-visitor";
export * from "./core/visitor/element-serializer";
export * from "./core/visitor/element-deserializer";
export * from "./core/visitor/element-validator";
export * from "./core/visitor/element-adder";
export * from "./core/visitor/element-remover";
export * from "./core/visitor/element-updater";
export * from "./core/visitor/element-splitter";
export * from "./core/visitor/element-cloner";

// Expose classes globally on window object for browser access
if (typeof window !== "undefined") {
  // Also expose the main exports
  (window as any).Twick = {
    Track: Track,
    TrackElement,
    ElementDeserializer,
    ElementSerializer,
    ElementValidator,
    ElementAdder,
    ElementRemover,
    ElementUpdater,
    ElementSplitter,
    ElementCloner,
    TimelineEditor,
    TimelineProvider,
    TIMELINE_ELEMENT_TYPE,
    // Element types
    CaptionElement,
    RectElement,
    TextElement,
    ImageElement,
    AudioElement,
    CircleElement,
    IconElement,
    VideoElement,
    ElementAnimation,
    ElementFrameEffect,
    ElementTextEffect,
    // Utility functions
    generateShortUuid,
    getTotalDuration,
    getCurrentElements,
    isTrackId,
    isElementId,
  };
}
