import { ServiceResult } from "../../types";
import { generateShortUuid, isTimelineId } from "../../utils/timeline.utils";
import { TimelineTrack } from "../track/timeline-track";
import { timelineContextStore, TimelineTrackData } from "../../services/data.service";
import { BaseTimelineElement } from "../elements/base.element";
import { TimelineElement, Timeline } from "../../types";
import { PLAYER_STATE, TIMELINE_ACTION } from "../../utils/constants";
import { isTimelineElementId } from "../../utils/element.utils";

/**
 * Type for timeline operation context
 */
export interface TimelineOperationContext {
  contextId: string;
  handleUndo: () => void;
  handleRedo: () => void;
  handleResetHistory: () => void;
  setLatestProjectVersion: (version: number) => void;
  setTimelineOperationResult: (result: ServiceResult<any> | null) => void;
  setSelectedItem?: (item: TimelineElement | Timeline | null) => void;
  setTimelineAction?: (action: string, payload?: any) => void;
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

  constructor(context: TimelineOperationContext) {
    this.context = context;
    // Ensure context is initialized in timelineContextStore
    timelineContextStore.initializeContext(this.context.contextId);
  }

  /**
   * Cleanup method to be called when the editor is no longer needed
   */
  cleanup(): void {
    // Clear any internal state or subscriptions
    // This method can be extended as needed
  }

  getContext(): TimelineOperationContext {
    return this.context;
  }

  pauseVideo(): void {  
    if(this.context?.setTimelineAction) {
      this.context.setTimelineAction(TIMELINE_ACTION.SET_PLAYER_STATE, PLAYER_STATE.PAUSED);
    }
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
    const track = new TimelineTrack(name, id);
    const updatedTimelines = [...(prevTimelineData?.tracks || []), track];
    this.setTimelineData(updatedTimelines);
    return track;
  }

  getTrackById(id: string): TimelineTrack | null {
    const prevTimelineData = this.getTimelineData();
    const track = prevTimelineData?.tracks.find((t: TimelineTrack) => t.getId() === id);
    return track as TimelineTrack | null;
  }

  getTrackByName(name: string): TimelineTrack | null {
    const prevTimelineData = this.getTimelineData();
    const track = prevTimelineData?.tracks.find((t: TimelineTrack) => t.getName() === name);
    return track as TimelineTrack | null;
  }

  removeTrackById(id: string): void {
    const tracks = this.getTimelineData()?.tracks || [];
    const updatedTracks = tracks.filter((t: TimelineTrack) => t.getId() !== id);
    this.setTimelineData(updatedTracks);
  }

  /**
   * Add an element to a track and update context/state
   */
  addElementToTrack(trackId: string, element: BaseTimelineElement): void {
    const tracks = this.getTimelineData()?.tracks || [];
    const track = tracks.find((t: TimelineTrack) => t.getId() === trackId);
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
    const track = tracks.find((t: TimelineTrack) => t.getId() === trackId);
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
    const track = tracks.find((t: TimelineTrack) => t.getId() === trackId);
    if (track) {
      track.updateElement(element);
      this.setTimelineData(tracks);
    }
  }

  /**
   * Handle timeline actions from context (undo/redo/project data)
   */
  handleTimelineAction(action: string, payload: any): void {
    switch (action) {
      case TIMELINE_ACTION.UNDO:
      case TIMELINE_ACTION.REDO:
        if (payload?.timeline) {
          this.setTimeline(payload.timeline, payload.version);
        }
        break;
      case TIMELINE_ACTION.SET_PROJECT_DATA:
        if (payload?.timeline) {
          this.setTimeline(payload.timeline, payload.version);
        }
        break;
      case TIMELINE_ACTION.RESET_HISTORY:
        // Handle history reset if needed
        break;
      default:
        // Handle other actions if needed
        break;
    }
  }

  /**
   * Trigger undo operation
   */
  undo(): void {
    this.context.handleUndo();
  }

  /**
   * Trigger redo operation
   */
  redo(): void {
    this.context.handleRedo();
  }

  /**
   * Reset history
   */
  resetHistory(): void {
    this.context.handleResetHistory();
  }

  // Legacy operations - these maintain compatibility but use the track-based system
  loadProject(timeline: Timeline[], version: number = 0): void {
    // Convert Timeline[] to TimelineTrack[] and set
    const tracks = timeline.map((t: Timeline) => TimelineTrack.fromJSON(t));
    this.setTimelineData(tracks, version);
    if (this.context.setTimelineAction) {
      this.context.setTimelineAction(
        TIMELINE_ACTION.SET_PROJECT_DATA,
        this.getTimelineData()
      );
    }
  }

  setTimeline(timeline: Timeline[], version: number): void {
    this.pauseVideo();
    // Convert Timeline[] to TimelineTrack[] and set
    const tracks = timeline.map((t: Timeline) => TimelineTrack.fromJSON(t));
    this.setTimelineData(tracks, version);
  }

  addNewTimeline(payload: any): any {
    this.pauseVideo();
    const track = this.addTrack(payload?.name || "New Timeline");
    if (this.context.setSelectedItem) {
      this.context.setSelectedItem(track.toJSON());
    }
    return { timeline: track.toJSON(), version: this.getTimelineData()?.version };
  }

  deleteItem(timelineId: string, elementId: string): void {
    this.pauseVideo();

    if (isTimelineElementId(elementId)) {
      this.removeElementFromTrack(timelineId, elementId);
      if (this.context.setSelectedItem) {
        this.context.setSelectedItem(null);
      }
    } else if (isTimelineId(elementId)) {
      this.removeTrackById(elementId);
      if (this.context.setSelectedItem) {
        this.context.setSelectedItem(null);
      }
    }
  }

  async addElement(payload: any): Promise<any> {
    this.pauseVideo();
    const { element, timelineId } = payload;

    if (timelineId) {
      // Create the appropriate element instance based on type
      const elementInstance = this.createElementInstance(element);
      if (elementInstance) {
        this.addElementToTrack(timelineId, elementInstance);
        
        if (this.context.setSelectedItem) {
          setTimeout(() => {
            this.context.setSelectedItem!(elementInstance as unknown as TimelineElement);
          }, 1000);
        }
        return { element: elementInstance, timelineId, version: this.getTimelineData()?.version };
      }
    }
  }

  updateElement(payload: any): void {
    this.pauseVideo();
    const { elementId, timelineId, updates } = payload;
    
    const track = this.getTrackById(timelineId);
    if (track) {
      const element = track.getElementById(elementId);
      if (element) {
        // Apply updates to the element
        Object.assign(element, updates);
        track.updateElement(element);
        this.setTimelineData(this.getTimelineData()?.tracks || []);
      }
    }
  }

  splitElement(timelineId: string, elementId: string, splitTime: number): void {
    this.pauseVideo();
    // Implementation would depend on the specific element type and split logic
    // For now, this is a placeholder that maintains the interface
    if (this.context.setSelectedItem) {
      this.context.setSelectedItem(null);
    }
  }

  setElementAnimation(payload: any): void {
    this.pauseVideo();
    // Implementation would set animation on the element
    // This is a placeholder that maintains the interface
  }

  setTextEffect(payload: any): void {
    this.pauseVideo();
    // Implementation would set text effect on the element
    // This is a placeholder that maintains the interface
  }

  async addSoloElement(payload: any): Promise<any> {
    // Create a new track for the solo element
    const track = this.addTrack("Solo Element");
    const elementInstance = this.createElementInstance(payload.element);
    if (elementInstance) {
      this.addElementToTrack(track.getId(), elementInstance);
      if (this.context.setSelectedItem) {
        this.context.setSelectedItem(elementInstance as unknown as TimelineElement);
      }
      return { element: elementInstance, timelineId: track.getId(), version: this.getTimelineData()?.version };
    }
  }

  private createElementInstance(elementData: any): BaseTimelineElement | null {
    // This would create the appropriate element instance based on type
    // Implementation depends on your element creation logic
    // For now, return null as placeholder
    return null;
  }
} 