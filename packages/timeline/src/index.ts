import { Timeline, TimelineData, TimelineElement } from "./types";
import { TIMELINE_ELEMENT_TYPE } from "./utils/constants";
import { TimelineEditor } from "./core/editor/timeline.editor";
import { TimelineProvider, TimelineProviderProps } from "./context/timeline-context";
import useTimelineEditor, { cleanupEditor, cleanupAllEditors, getActiveEditors } from "./hooks/use-timeline-editor";

export { TimelineProvider, TimelineEditor, useTimelineEditor, cleanupEditor, cleanupAllEditors, getActiveEditors };
export type { Timeline, TimelineData, TimelineElement as TimelineElement, TimelineProviderProps };
export { TIMELINE_ELEMENT_TYPE };

export * from "./utils/constants";
export * from "./utils/timeline.utils";
export * from "./utils/validation";
export * from './context/timeline-context';
export * from './hooks/use-timeline-editor';
export * from './types';
export * from './utils/timeline-service-error';
export * from './utils/element.utils';

// Export core components
export * from './core/track/timeline-track';
export * from './core/elements/base.element';
export * from './core/visitor/element-visitor';
export * from './core/visitor/element-serializer';
export * from './core/visitor/element-deserializer';
