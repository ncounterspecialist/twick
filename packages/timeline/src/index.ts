import useTimeline from "./hooks/use-timeline";
import { Timeline, TimelineData, TimelineElement } from "./types";
import SeekTrack from "./components/controls/seek-track";
import Track from "./components/tracks/track";
import TrackHeader from "./components/tracks/track-header";
import TimelineZoom from "./components/controls/timeline-zoom";
import TimelineView from "./components/timeline/timeline-view";
import { TIMELINE_ELEMENT_TYPE } from "./utils/constants";
import { TimelineProvider, TimelineProviderProps } from "./context/timeline-context";
import timelineService from "./services/timeline/timeline.service";

export { useTimeline, SeekTrack, Track, TrackHeader, TimelineView, TimelineProvider, TimelineZoom, timelineService };
export type { Timeline, TimelineData, TimelineElement as TimelineElement, TimelineProviderProps };
export { TIMELINE_ELEMENT_TYPE };

export * from "./utils/constants";
export * from "./utils/timeline.utils";
export * from "./utils/validation";
export * from './context/timeline-context';
export * from './components/timeline/timeline-view';
export * from './hooks/use-timeline';
export * from './hooks/timeline-operations';
export * from './types';
export * from './utils/timeline-service-error';
export * from './utils/element.utils';

// Import CSS
import './styles/timeline.css';