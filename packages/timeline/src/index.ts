import useTimeline from "./hooks/use-timeline";
import { Timeline, TimelineData, TimelineElement } from "./types";
import SeekTrack from "./components/seek-track";
import Track from "./components/track";
import TrackHeader from "./components/track-header";
import TimelineView from "./components/timeline-view";
import { TIMELINE_ELEMENT_TYPE } from "./helpers/constants";
import { setElementColors } from "./helpers/timeline.utils";
import { useTimelineContext, TimelineProvider } from "./context/timeline-context";

// Import CSS
import './styles/timeline.css';

export { useTimeline, SeekTrack, Track, TrackHeader, TimelineView, useTimelineContext, TimelineProvider };
export { setElementColors };
export { TIMELINE_ELEMENT_TYPE };
export type { Timeline, TimelineData, TimelineElement };
export * from './types';
export * from "./helpers/constants";

export default TimelineView;