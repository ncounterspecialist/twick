import { ServiceResult } from "../types";
import { generateShortUuid } from "../utils/timeline.utils";
import { TimelineTrack } from "./timeline.track";
import { timelineContextStore, TimelineTrackData } from "../services/data/data.service";
import { BaseTimelineElement } from "./base.element";

/**
 * Type for timeline operation context
 */
export interface TimelineOperationContext {
  contextId: string;
  setLatestProjectVersion: (version: number) => void;
  setTimelineOperationResult: (result: ServiceResult<any> | null) => void;
}

/**
 * TimelineEditor
 * 
 * This class provides an interface to execute all timeline operations
 * defined in timeline-operations.ts. It takes a TimelineOperationContext
 * and exposes methods to perform operations on that context.
 */
export class TimelineEditor {
  private context: TimelineOperationContext;

  constructor(context: TimelineOperationContext) {
    this.context = context;
    // Ensure context is initialized in timelineContextStore
    timelineContextStore.initializeContext(this.context.contextId);
  }

  getContext(): TimelineOperationContext {
    return this.context;
  }

  getTimelineData(): TimelineTrackData | null {
    const contextId = this.context.contextId;
    return timelineContextStore.getTimelineData(contextId);
  }   

  setTimelineData(timeline: TimelineTrack[], version?: number): TimelineTrackData {
    const prevTimelineData = this.getTimelineData();
    const updatedVersion = version ?? (prevTimelineData?.version || 0) + 1;
    const updatedTimelineData = {
      tracks: timeline,
      version: updatedVersion,
    };
    timelineContextStore.setTimelineData(this.context.contextId, updatedTimelineData);
    this.context.setLatestProjectVersion(updatedVersion);
    return updatedTimelineData as TimelineTrackData;
  } 

  addTrack(name: string): TimelineTrack {
    const prevTimelineData = this.getTimelineData();
    const id = `t-${generateShortUuid()}`;
    const track = new TimelineTrack(id, name);
    const updatedTimelines = [...(prevTimelineData?.tracks || []), track];
    this.setTimelineData(updatedTimelines);
    return track;
  }

  getTrackById(id: string): TimelineTrack | null {
    const prevTimelineData = this.getTimelineData();
    const track = prevTimelineData?.tracks.find((t) => t.getId() === id);
    return track as TimelineTrack | null;
  }

  getTrackByName(name: string): TimelineTrack | null {
    const prevTimelineData = this.getTimelineData();
    const track = prevTimelineData?.tracks.find((t) => t.getName() === name);
    return track as TimelineTrack | null;
  }

  removeTrackById(id: string): void {
    const tracks = this.getTimelineData()?.tracks || [];
    const updatedTracks = tracks.filter((t) => t.getId() !== id);
    this.setTimelineData(updatedTracks);
  }

  /**
   * Add an element to a track and update context/state
   */
  addElementToTrack(trackId: string, element: BaseTimelineElement): void {
    const tracks = this.getTimelineData()?.tracks || [];
    const track = tracks.find(t => t.getId() === trackId);
    if (track) {
      track.addElement(element);
      this.setTimelineData(tracks);
    }
  }

  /**
   * Remove an element from a track and update context/state
   */
  removeElementFromTrack(trackId: string, elementId: string): void {
    const tracks = this.getTimelineData()?.tracks || [];
    const track = tracks.find(t => t.getId() === trackId);
    if (track) {
      const element = track.getElementById(elementId);
      if (element) {
        track.removeElement(element);
        this.setTimelineData(tracks);
      }
    }
  }

  /**
   * Update an element in a track and update context/state
   */
  updateElementInTrack(trackId: string, element: BaseTimelineElement): void {
    const tracks = this.getTimelineData()?.tracks || [];
    const track = tracks.find(t => t.getId() === trackId);
    if (track) {
      track.updateElement(element);
      this.setTimelineData(tracks);
    }
  }
}
