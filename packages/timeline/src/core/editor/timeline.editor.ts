import {
  extractVideoAudio,
  generateShortUuid,
  getTotalDuration,
} from "../../utils/timeline.utils";
import { Track } from "../track/track";
import {
  timelineContextStore,
  TimelineTrackData,
} from "../../services/data.service";
import { PLAYER_STATE, TIMELINE_ACTION } from "../../utils/constants";
import { ElementAdder } from "../visitor/element-adder";
import { ElementRemover } from "../visitor/element-remover";
import { ElementUpdater } from "../visitor/element-updater";
import { ElementSplitter, SplitResult } from "../visitor/element-splitter";
import { ElementCloner } from "../visitor/element-cloner";
import { TrackElement } from "../elements/base.element";
import { ProjectJSON, TrackJSON } from "../../types";

/**
 * Type for timeline operation context
 */
export interface TimelineOperationContext {
  contextId: string;
  setTotalDuration: (duration: number) => void;
  setPresent: (data: ProjectJSON) => void;
  handleUndo: () => ProjectJSON | null;
  handleRedo: () => ProjectJSON | null;
  handleResetHistory: () => void;
  updateChangeLog: () => void;
  setTimelineAction?: (action: string, payload?: unknown) => void;
}

/**
 * TimelineEditor
 *
 * This class provides an interface to execute all timeline operations
 * using a direct, class-based approach with track-based management.
 * It also handles undo/redo operations internally.
 */
export class TimelineEditor {
  private context: TimelineOperationContext;
  private totalDuration: number = 0;

  constructor(context: TimelineOperationContext) {
    this.context = context;
    // Ensure context is initialized in timelineContextStore
    timelineContextStore.initializeContext(this.context.contextId);
  }

  getContext(): TimelineOperationContext {
    return this.context;
  }

  pauseVideo(): void {
    if (this.context?.setTimelineAction) {
      this.context.setTimelineAction(
        TIMELINE_ACTION.SET_PLAYER_STATE,
        PLAYER_STATE.PAUSED
      );
    }
  }

  getTimelineData(): TimelineTrackData | null {
    const contextId = this.context.contextId;
    return timelineContextStore.getTimelineData(contextId);
  }

  getLatestVersion(): number {
    const contextId = this.context.contextId;
    const timelineData = timelineContextStore.getTimelineData(contextId);
    return timelineData?.version || 0;
  }

  protected setTimelineData(
    tracks: Track[],
    version?: number
  ): TimelineTrackData {
    const prevTimelineData = this.getTimelineData();
    const updatedVersion = version ?? (prevTimelineData?.version || 0) + 1;
    const updatedTimelineData = {
      tracks,
      version: updatedVersion,
    };
    timelineContextStore.setTimelineData(
      this.context.contextId,
      updatedTimelineData
    );
    this.updateHistory(updatedTimelineData);
    this.context.updateChangeLog();
    return updatedTimelineData as TimelineTrackData;
  }

  addTrack(name: string): Track {
    const prevTimelineData = this.getTimelineData();
    const id = `t-${generateShortUuid()}`;
    const track = new Track(name, id);
    const updatedTimelines = [...(prevTimelineData?.tracks || []), track];
    this.setTimelineData(updatedTimelines);
    return track;
  }

  getTrackById(id: string): Track | null {
    const prevTimelineData = this.getTimelineData();
    const track = prevTimelineData?.tracks.find((t) => t.getId() === id);
    return track as Track | null;
  }

  getTrackByName(name: string): Track | null {
    const prevTimelineData = this.getTimelineData();
    const track = prevTimelineData?.tracks.find((t) => t.getName() === name);
    return track as Track | null;
  }

  removeTrackById(id: string): void {
    const tracks = this.getTimelineData()?.tracks || [];
    const updatedTracks = tracks.filter((t) => t.getId() !== id);
    this.setTimelineData(updatedTracks);
  }

  removeTrack(track: Track): void {
    const tracks = this.getTimelineData()?.tracks || [];
    const updatedTracks = tracks.filter((t) => t.getId() !== track.getId());
    this.setTimelineData(updatedTracks);
  }

  /**
   * Refresh the timeline data
   */
  refresh(): void {
    const currentData = this.getTimelineData();
    if (currentData) {
      this.setTimelineData(currentData.tracks);
    }
  }

  /**
   * Add an element to a specific track using the visitor pattern
   * @param track The track to add the element to
   * @param element The element to add
   * @returns Promise<boolean> true if element was added successfully
   */
  async addElementToTrack(
    track: Track,
    element: TrackElement
  ): Promise<boolean> {
    if (!track) {
      return false;
    }
    try {
      // Use the visitor pattern to handle different element types
      const elementAdder = new ElementAdder(track);
      const result = await element.accept(elementAdder);
      
      if (result) {
        // Update the timeline data to reflect the change
        const currentData = this.getTimelineData();
        if (currentData) {
          this.setTimelineData(currentData.tracks);
        }
      }
      return result;
    } catch (error) {
      return false;
    }
  }

  /**
   * Remove an element from a specific track using the visitor pattern
   * @param element The element to remove
   * @returns boolean true if element was removed successfully
   */
  removeElement(element: TrackElement): boolean {
    const track = this.getTrackById(element.getTrackId());
    if (!track) {
      return false;
    }

    try {
      // Use the visitor pattern to handle different element types
      const elementRemover = new ElementRemover(track);
      const result = element.accept(elementRemover);
      
      if (result) {
        // Update the timeline data to reflect the change
        const currentData = this.getTimelineData();
        if (currentData) {
          this.setTimelineData(currentData.tracks);
        }
      }

      return result;
    } catch (error) {
      return false;
    }
  }

  /**
   * Update an element in a specific track using the visitor pattern
   * @param element The updated element
   * @returns boolean true if element was updated successfully
   */
  updateElement(element: TrackElement): boolean {
    const track = this.getTrackById(element.getTrackId());
    if (!track) {
      return false;
    }

    try {
      // Use the visitor pattern to handle different element types
      const elementUpdater = new ElementUpdater(track);
      const result = element.accept(elementUpdater);
      
      if (result) {
        // Update the timeline data to reflect the change
        const currentData = this.getTimelineData();
        if (currentData) {
          this.setTimelineData(currentData.tracks);
        }
      }

      return result;
    } catch (error) {
      return false;
    }
  }

  /**
   * Split an element at a specific time point using the visitor pattern
   * @param element The element to split
   * @param splitTime The time point to split at
   * @returns SplitResult with first element, second element, and success status
   */
  async splitElement(element: TrackElement, splitTime: number): Promise<SplitResult> {
    const track = this.getTrackById(element.getTrackId());
    if (!track) {
      return { firstElement: element, secondElement: null, success: false };
    }

    try {
      // Use the visitor pattern to handle different element types
      const elementSplitter = new ElementSplitter(splitTime);
      const result = element.accept(elementSplitter);
      
      if (result.success) {
        const elementRemover  = new ElementRemover(track);
        // Remove the original element from the track
        element.accept(elementRemover);

        // Add the first split element to the track
        const elementAdder = new ElementAdder(track);
        result.firstElement.accept(elementAdder);
        result.secondElement.accept(elementAdder);
        
        // Update the timeline data to reflect the change
        const currentData = this.getTimelineData();
        if (currentData) {
          this.setTimelineData(currentData.tracks);
        }
      }
      return result;
    } catch (error) {
      return { firstElement: element, secondElement: null, success: false };
    }
  }

  /**
   * Clone an element using the visitor pattern
   * @param element The element to clone
   * @returns TrackElement | null - the cloned element or null if cloning failed
   */
  cloneElement(element: TrackElement): TrackElement | null {
    try {
      const elementCloner = new ElementCloner();
      return element.accept(elementCloner);
    } catch (error) {
      return null;
    }
  }

  reorderTracks(tracks: Track[]): void {
    this.setTimelineData(tracks);
  }

  updateHistory(timelineTrackData: TimelineTrackData): void {
    const tracks = timelineTrackData.tracks.map((t) => t.serialize());
    this.totalDuration = getTotalDuration(tracks);  
    this.context.setTotalDuration(this.totalDuration);
    const version = timelineTrackData.version;
    this.context.setPresent({
      tracks,
      version,
    });
  }

  /**
   * Trigger undo operation and update timeline data
   */
  undo(): void {
    const result = this.context.handleUndo();
    if (result && result.tracks) {
      // Update the timeline data in the editor's store
      const tracks = result.tracks.map((t: TrackJSON) => Track.fromJSON(t));
      timelineContextStore.setTimelineData(this.context.contextId, {
        tracks,
        version: result.version,
      });

      // Update total duration
      this.totalDuration = getTotalDuration(result.tracks);
      this.context.setTotalDuration(this.totalDuration);
      this.context.updateChangeLog();

      // Trigger timeline action to notify components
      if (this.context?.setTimelineAction) {
        this.context.setTimelineAction(TIMELINE_ACTION.UPDATE_PLAYER_DATA, {
          tracks: result.tracks,
          version: result.version,
        });
      }
    }
  }

  /**
   * Trigger redo operation and update timeline data
   */
  redo(): void {
    const result = this.context.handleRedo();
    if (result && result.tracks) {
      // Update the timeline data in the editor's store
      const tracks = result.tracks.map((t: TrackJSON) => Track.fromJSON(t));
      timelineContextStore.setTimelineData(this.context.contextId, {
        tracks,
        version: result.version,
      });

      // Update total duration
      this.totalDuration = getTotalDuration(result.tracks);
      this.context.setTotalDuration(this.totalDuration);
      this.context.updateChangeLog();

      // Trigger timeline action to notify components
      if (this.context?.setTimelineAction) {
        this.context.setTimelineAction(TIMELINE_ACTION.UPDATE_PLAYER_DATA, {
          tracks: result.tracks,
          version: result.version,
        });
      }
    }
  }

  /**
   * Reset history and clear timeline data
   */
  resetHistory(): void {
    this.context.handleResetHistory();

    // Clear the timeline data in the editor's store
    timelineContextStore.setTimelineData(this.context.contextId, {
      tracks: [],
      version: 0,
    });

    // Reset total duration and version
    this.context.setTotalDuration(0);
    this.context.updateChangeLog();

    // Trigger timeline action to notify components
    if (this.context?.setTimelineAction) {
      this.context.setTimelineAction(TIMELINE_ACTION.UPDATE_PLAYER_DATA, {
        tracks: [],
        version: 0,
      });
    }
  }

  loadProject({
    tracks,
    version,
  }: {
    tracks: TrackJSON[];
    version: number;
  }): void {
    this.pauseVideo();
    this.context.handleResetHistory();
    // Convert Timeline[] to Track[] and set
    const timelineTracks = tracks.map((t) => Track.fromJSON(t));
    this.setTimelineData(timelineTracks, version);
    if (this.context?.setTimelineAction) {
      this.context.setTimelineAction(TIMELINE_ACTION.UPDATE_PLAYER_DATA, {
        tracks: tracks,
        version: version,
        forceUpdate: true,
      });
    }
  }

  async getVideoAudio(): Promise<string> {
    const tracks = this.getTimelineData()?.tracks || [];
    const audioBlobUrl = await extractVideoAudio(tracks, this.totalDuration);
    return audioBlobUrl;
  }
}
