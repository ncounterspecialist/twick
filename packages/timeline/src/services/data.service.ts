import Watermark from "../core/addOns/watermark";
import { TrackElement } from "../core/elements/base.element";
import { Track } from "../core/track/track";
import { ProjectMetadata } from "../types";

type TimelineStore = {
  tracks: Track[];
  version: number;
  backgroundColor?: string;
  metadata?: ProjectMetadata;
  elementMap: Record<string, TrackElement>;
  trackMap: Record<string, any>;
  captionProps: Record<string, any>;
}

export type TimelineTrackData = {
    tracks: Track[];
    version: number;
    backgroundColor?: string;
    watermark?: Watermark;
    metadata?: ProjectMetadata;
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
    const timelineStore = this.storeMap.get(contextId);
    return timelineStore ? {
        tracks: timelineStore.tracks,
        version: timelineStore.version,
        backgroundColor: timelineStore.backgroundColor,
        metadata: timelineStore.metadata,
    } : null;
  }

  public setTimelineData(contextId: string, timelineData: TimelineTrackData): TimelineTrackData {
    this.ensureContext(contextId);
    const store = this.storeMap.get(contextId)!;
    store.tracks = timelineData.tracks;
    store.version = timelineData.version;
    if (timelineData.backgroundColor !== undefined) {
      store.backgroundColor = timelineData.backgroundColor;
    }
    if (timelineData.metadata !== undefined) {
      store.metadata = timelineData.metadata;
    }
    return timelineData;
  }

  public getElementMap(contextId: string): Record<string, TrackElement> {
    this.ensureContext(contextId);
    return this.storeMap.get(contextId)!.elementMap;
  }

  public setElementMap(contextId: string, elementMap: Record<string, TrackElement>): void {
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