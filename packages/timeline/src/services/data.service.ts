import { BaseTimelineElement } from "../core/elements/base.element";
import { TimelineTrack } from "../core/track/timeline-track";

type TimelineStore = {
  tracks: TimelineTrack[];
  version: number;
  elementMap: Record<string, BaseTimelineElement>;
  trackMap: Record<string, any>;
  captionProps: Record<string, any>;
}

export type TimelineTrackData = {
    tracks: TimelineTrack[];
    version: number;
}

export class TimelineContextStore {
  private static instance: TimelineContextStore;
  private storeMap: Map<string, TimelineStore>;

  private constructor() {
    this.storeMap = new Map();
  }

  public static getInstance(): TimelineContextStore {
    if (!TimelineContextStore.instance) {
      TimelineContextStore.instance = new TimelineContextStore();
    }
    return TimelineContextStore.instance;
  }

  public initializeContext(contextId: string): void {
    if (!this.storeMap.has(contextId)) {
      this.storeMap.set(contextId, {
        tracks: [],
        version: 0,
        elementMap: {},
        trackMap: {},
        captionProps: {},
      });
    }
  }

  public getTimelineData(contextId: string): TimelineTrackData | null {
    const _store = this.storeMap.get(contextId);
    return _store ? {
        tracks: _store.tracks,
        version: _store.version,
    } : null;
  }

  public setTimelineData(contextId: string, timelineData: TimelineTrackData): TimelineTrackData {
    this.ensureContext(contextId);
    this.storeMap.get(contextId)!.tracks = timelineData.tracks;
    this.storeMap.get(contextId)!.version = timelineData.version;
    return timelineData;
  }

  public getElementMap(contextId: string): Record<string, BaseTimelineElement> {
    this.ensureContext(contextId);
    return this.storeMap.get(contextId)!.elementMap;
  }

  public setElementMap(contextId: string, elementMap: Record<string, BaseTimelineElement>): void {
    this.ensureContext(contextId);
    this.storeMap.get(contextId)!.elementMap = elementMap;
  }

  public getTrackMap(contextId: string): Record<string, any> {
    this.ensureContext(contextId);
    return this.storeMap.get(contextId)!.trackMap;
  }

  public setTrackMap(contextId: string, trackMap: Record<string, any>): void {
    this.ensureContext(contextId);
    this.storeMap.get(contextId)!.trackMap = trackMap;
  }

  public getCaptionProps(contextId: string): Record<string, any> {
    this.ensureContext(contextId);
    return this.storeMap.get(contextId)!.captionProps;
  }

  public setCaptionProps(contextId: string, captionProps: Record<string, any>): void {
    this.ensureContext(contextId);
    this.storeMap.get(contextId)!.captionProps = captionProps;
  }

  public clearContext(contextId: string): void {
    this.storeMap.delete(contextId);
  }

  private ensureContext(contextId: string): void {
    if (!this.storeMap.has(contextId)) {
      this.initializeContext(contextId);
    }
  }
}

export const timelineContextStore = TimelineContextStore.getInstance();