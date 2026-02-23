import {
  extractVideoAudio,
  generateShortUuid,
  getTotalDuration,
} from "../../utils/timeline.utils";
import { TRACK_TYPES } from "../../utils/constants";
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
import { ElementDeserializer } from "../visitor/element-deserializer";
import { TrackElement } from "../elements/base.element";
import { ElementJSON, ElementTransitionJSON, ProjectJSON, TrackJSON } from "../../types";
import { ValidationError } from "../visitor/element-validator";
import Watermark from "../addOns/watermark";

/** Event names emitted by TimelineEditor after mutations */
export type TimelineEditorEvent =
  | "element:added"
  | "element:removed"
  | "element:updated"
  | "elements:removed"
  | "track:added"
  | "track:removed"
  | "track:reordered"
  | "project:loaded";

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
  private eventListeners = new Map<
    TimelineEditorEvent,
    Set<(payload: unknown) => void>
  >();

  constructor(context: TimelineOperationContext) {
    this.context = context;
    // Ensure context is initialized in timelineContextStore
    timelineContextStore.initializeContext(this.context.contextId);
  }

  /**
   * Subscribe to timeline mutation events.
   */
  on(event: TimelineEditorEvent, handler: (payload: unknown) => void): void {
    let set = this.eventListeners.get(event);
    if (!set) {
      set = new Set();
      this.eventListeners.set(event, set);
    }
    set.add(handler);
  }

  /**
   * Unsubscribe from timeline mutation events.
   */
  off(event: TimelineEditorEvent, handler: (payload: unknown) => void): void {
    this.eventListeners.get(event)?.delete(handler);
  }

  private emit(event: TimelineEditorEvent, payload: unknown): void {
    this.eventListeners.get(event)?.forEach((h) => h(payload));
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

  protected setTimelineData({
    tracks,
    version,
    watermark,
    backgroundColor,
    updatePlayerData,
  }: {
    tracks: Track[];
    version?: number;
    updatePlayerData?: boolean;
    watermark?: Watermark;
    backgroundColor?: string;
  }) {
    const prevTimelineData = this.getTimelineData();
    const updatedVersion = version ?? (prevTimelineData?.version || 0) + 1;
    const resolvedBackgroundColor =
      backgroundColor !== undefined ? backgroundColor : prevTimelineData?.backgroundColor;
    const updatedTimelineData = {
      tracks,
      version: updatedVersion,
      watermark,
      backgroundColor: resolvedBackgroundColor,
    };
    timelineContextStore.setTimelineData(
      this.context.contextId,
      updatedTimelineData
    );
    this.updateHistory(updatedTimelineData);
    this.context.updateChangeLog();
    if (updatePlayerData) {
      // Send serialized tracks (TrackJSON[]) so live-player/visualizer get proper JSON with z-ordered elements
      const serializedTracks: TrackJSON[] = tracks.map((t) => t.serialize());
      this.context?.setTimelineAction?.(TIMELINE_ACTION.UPDATE_PLAYER_DATA, {
        tracks: serializedTracks,
        version: updatedVersion,
        watermark: watermark != null ? (watermark as any).toJSON?.() : undefined,
        backgroundColor: resolvedBackgroundColor,
      });
    }
    return updatedTimelineData as TimelineTrackData;
  }

  addTrack(name: string, type: string = TRACK_TYPES.ELEMENT): Track {
    const prevTimelineData = this.getTimelineData();
    const id = `t-${generateShortUuid()}`;
    const track = new Track(name, type, id);
    const updatedTimelines = [...(prevTimelineData?.tracks || []), track];
    this.setTimelineData({ tracks: updatedTimelines, updatePlayerData: true });
    this.emit("track:added", { track: track.serialize(), index: updatedTimelines.length - 1 });
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

  getCaptionsTrack(): Track | null {
    const prevTimelineData = this.getTimelineData();
    const track = prevTimelineData?.tracks.find((t) => t.getType() === TRACK_TYPES.CAPTION);
    return track as Track | null;
  }

  removeTrackById(id: string): void {
    const tracks = this.getTimelineData()?.tracks || [];
    const updatedTracks = tracks.filter((t) => t.getId() !== id);
    this.setTimelineData({ tracks: updatedTracks, updatePlayerData: true });
    this.emit("track:removed", { trackId: id });
  }

  removeTrack(track: Track): void {
    const tracks = this.getTimelineData()?.tracks || [];
    const updatedTracks = tracks.filter((t) => t.getId() !== track.getId());
    this.setTimelineData({ tracks: updatedTracks, updatePlayerData: true });
    this.emit("track:removed", { trackId: track.getId() });
  }

  /**
   * Refresh the timeline data
   */
  refresh(): void {
    const currentData = this.getTimelineData();
    if (currentData) {
      this.setTimelineData({ tracks: currentData.tracks, updatePlayerData: true });
    }
  }

  /**
   * Add an element to a specific track using the visitor pattern.
   * @param track The track to add the element to.
   * @param element The element to add.
   * @returns A promise that resolves to `true` if the element was added successfully, otherwise `false`.
   */
  async addElementToTrack(
    track: Track,
    element: TrackElement
  ): Promise<boolean> {
    if (!track) {
      throw new Error("TRACK_NOT_FOUND"); 
    }
    try {
      // Use the visitor pattern to handle different element types
      const elementAdder = new ElementAdder(track);
      const result = await element.accept(elementAdder);

      if (result) {
        // Update the timeline data to reflect the change
        const currentData = this.getTimelineData();
        if (currentData) {
          this.setTimelineData({tracks: currentData.tracks, updatePlayerData: true});
        }
        this.emit("element:added", { element, trackId: track.getId() });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if(error instanceof ValidationError && error.errors?.length > 0) {
        throw error;
      } else {
        throw new Error("ELEMENT_NOT_ADDED");
      }
    }
  }

  /**
   * Remove an element from a specific track using the visitor pattern.
   * @param element The element to remove.
   * @returns `true` if the element was removed successfully, otherwise `false`.
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
          this.setTimelineData({tracks: currentData.tracks, updatePlayerData: true});
        }
        this.emit("element:removed", { elementId: element.getId(), trackId: element.getTrackId() });
      }

      return result;
    } catch (error) {
      return false;
    }
  }

  /**
   * Update an element in a specific track using the visitor pattern.
   * @param element The updated element.
   * @returns The updated `TrackElement`.
   */
  updateElement(element: TrackElement): TrackElement {
    const track = this.getTrackById(element.getTrackId());
    if (!track) {
      return element;
    }

    try {
      // Use the visitor pattern to handle different element types
      const elementUpdater = new ElementUpdater(track);
      const result = element.accept(elementUpdater);

      if (result) {
        // Update the timeline data to reflect the change (e.g. zIndex) so player/visualizer get new order
        const currentData = this.getTimelineData();
        if (currentData) {
          this.setTimelineData({ tracks: currentData.tracks, updatePlayerData: true });
        }
        this.emit("element:updated", { element });
      }

      return element;
    } catch (error) {
      return element;
    }
  }

  /**
   * Split an element at a specific time point using the visitor pattern
   * @param element The element to split
   * @param splitTime The time point to split at
   * @returns SplitResult with first element, second element, and success status
   */
  async splitElement(
    element: TrackElement,
    splitTime: number
  ): Promise<SplitResult> {
    const track = this.getTrackById(element.getTrackId());
    if (!track) {
      return { firstElement: element, secondElement: null, success: false };
    }

    try {
      // Use the visitor pattern to handle different element types
      const elementSplitter = new ElementSplitter(splitTime);
      const result = element.accept(elementSplitter);

      if (result.success) {
        const elementRemover = new ElementRemover(track);
        // Remove the original element from the track
        element.accept(elementRemover);

        // Add the first split element to the track
        const elementAdder = new ElementAdder(track);
        result.firstElement.accept(elementAdder);
        result.secondElement.accept(elementAdder);

        // Update the timeline data to reflect the change
        const currentData = this.getTimelineData();
        if (currentData) {
          this.setTimelineData({tracks: currentData.tracks, updatePlayerData: true});
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
    this.setTimelineData({tracks, updatePlayerData: true});
    this.emit("track:reordered", { tracks: tracks.map((t) => t.serialize()) });
  }

  /**
   * Move an element to a new track inserted at the given index (OpenVideo-style separator drop).
   * Removes the element from its current track, creates a new track at targetTrackIndex,
   * sets element start/end, and adds the element to the new track.
   */
  async moveElementToNewTrackAt(
    element: TrackElement,
    targetTrackIndex: number,
    startSec: number
  ): Promise<boolean> {
    const removed = this.removeElement(element);
    if (!removed) return false;

    const currentData = this.getTimelineData();
    const currentTracks = currentData?.tracks ?? [];
    const elType = element.getType().toLowerCase();
    let trackType: string = TRACK_TYPES.ELEMENT;
    if (elType === "video" || elType === "image") trackType = TRACK_TYPES.VIDEO;
    else if (elType === "audio") trackType = TRACK_TYPES.AUDIO;
    else if (elType === "caption" || elType === "text") trackType = TRACK_TYPES.ELEMENT;

    const newTrack = new Track(
      `${trackType.charAt(0).toUpperCase() + trackType.slice(1)} Track`,
      trackType
    );

    const duration = element.getDuration();
    element.setStart(startSec);
    element.setEnd(startSec + duration);

    const elementAdder = new ElementAdder(newTrack);
    await element.accept(elementAdder);

    const insertIndex = Math.max(0, Math.min(targetTrackIndex, currentTracks.length));
    const newTracks = [
      ...currentTracks.slice(0, insertIndex),
      newTrack,
      ...currentTracks.slice(insertIndex),
    ];

    this.setTimelineData({ tracks: newTracks, updatePlayerData: true });
    this.emit("element:added", { element, trackId: newTrack.getId() });
    this.emit("element:updated", { element });
    return true;
  }

  updateHistory(timelineTrackData: TimelineTrackData): void {
    const tracks = timelineTrackData.tracks.map((t) => t.serialize());
    this.totalDuration = getTotalDuration(tracks);
    this.context.setTotalDuration(this.totalDuration);
    const version = timelineTrackData.version;
    this.context.setPresent({
      tracks,
      version,
      ...(timelineTrackData.backgroundColor !== undefined && {
        backgroundColor: timelineTrackData.backgroundColor,
      }),
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
        ...(result.backgroundColor !== undefined && {
          backgroundColor: result.backgroundColor,
        }),
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
          ...(result.backgroundColor !== undefined && {
            backgroundColor: result.backgroundColor,
          }),
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
        ...(result.backgroundColor !== undefined && {
          backgroundColor: result.backgroundColor,
        }),
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
          ...(result.backgroundColor !== undefined && {
            backgroundColor: result.backgroundColor,
          }),
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
    backgroundColor,
  }: {
    tracks: TrackJSON[];
    version: number;
    backgroundColor?: string;
  }): void {
    this.pauseVideo();
    this.context.handleResetHistory();
    // Convert Timeline[] to Track[] and set
    const timelineTracks = tracks.map((t) => Track.fromJSON(t));
    this.setTimelineData({
      tracks: timelineTracks,
      version,
      backgroundColor,
      updatePlayerData: true,
    });
    if (this.context?.setTimelineAction) {
      this.context.setTimelineAction(TIMELINE_ACTION.UPDATE_PLAYER_DATA, {
        tracks: tracks,
        version: version,
        backgroundColor,
        forceUpdate: true,
      });
    }
    this.emit("project:loaded", { tracks, version });
  }

  getWatermark(): Watermark | null {
    const currentData = this.getTimelineData();
    return currentData?.watermark || null;
  }

  setWatermark(watermark: Watermark): void {
    const currentData = this.getTimelineData();
    if (currentData) {
      this.setTimelineData({
        tracks: currentData.tracks,
        updatePlayerData: true,
        watermark: watermark,
      });
    }
  }

  removeWatermark(): void {
    const currentData = this.getTimelineData();
    if (currentData) {
      this.setTimelineData({
        tracks: currentData.tracks,
        updatePlayerData: true,
      });
    }
  }

  async getVideoAudio(): Promise<string> {
    const tracks = this.getTimelineData()?.tracks || [];
    const audioBlobUrl = await extractVideoAudio(tracks, this.totalDuration);
    return audioBlobUrl;
  }

  /**
   * Add transition metadata from one element to the next (e.g. crossfade).
   * Sets optional transition on the "from" element; visualizer can interpret it when implemented.
   */
  addTransition(
    fromElementId: string,
    toElementId: string,
    kind: string,
    duration: number
  ): boolean {
    const fromElement = this.findElementById(fromElementId);
    if (!fromElement) return false;
    const transition: ElementTransitionJSON = {
      toElementId,
      duration,
      kind,
    };
    fromElement.setTransition(transition);
    this.updateElement(fromElement);
    return true;
  }

  /**
   * Remove transition metadata from an element.
   */
  removeTransition(elementId: string): boolean {
    const element = this.findElementById(elementId);
    if (!element) return false;
    element.setTransition(undefined);
    this.updateElement(element);
    return true;
  }

  private findElementById(elementId: string): TrackElement | null {
    const tracks = this.getTimelineData()?.tracks ?? [];
    for (const track of tracks) {
      const el = track.getElementById(elementId);
      if (el) return el as TrackElement;
    }
    return null;
  }

  /**
   * Get the current project as ProjectJSON (same shape consumed by visualizer).
   */
  getProject(): ProjectJSON {
    const data = this.getTimelineData();
    if (!data) {
      return { tracks: [], version: 0 };
    }
    return {
      tracks: data.tracks.map((t) => t.serialize()),
      version: data.version,
      watermark:
        data.watermark != null
          ? (data.watermark as any).toJSON?.()
          : undefined,
      ...(data.backgroundColor !== undefined && {
        backgroundColor: data.backgroundColor,
      }),
    };
  }

  getBackgroundColor(): string | undefined {
    return this.getTimelineData()?.backgroundColor;
  }

  setBackgroundColor(backgroundColor: string): void {
    const currentData = this.getTimelineData();
    if (currentData) {
      this.setTimelineData({
        tracks: currentData.tracks,
        backgroundColor,
        updatePlayerData: true,
      });
    }
  }

  /**
   * Ripple delete: remove content in [fromTime, toTime] and shift later content left.
   * Single undo step.
   */
  async rippleDelete(fromTime: number, toTime: number): Promise<void> {
    if (fromTime >= toTime) return;
    const durationToRemove = toTime - fromTime;
    const currentTracks = this.getTimelineData()?.tracks ?? [];
    const newTracks: Track[] = [];

    for (const track of currentTracks) {
      const newTrack = Track.fromJSON(track.serialize());
      const friend = newTrack.createFriend();
      const elementsCopy = newTrack.getElements();

      for (const element of elementsCopy) {
        const start = element.getStart();
        const end = element.getEnd();

        if (end <= fromTime) {
          continue;
        }
        if (start >= toTime) {
          element.setStart(start - durationToRemove);
          element.setEnd(end - durationToRemove);
          continue;
        }
        if (start >= fromTime && end <= toTime) {
          friend.removeElement(element);
          continue;
        }
        if (start < fromTime && end > toTime) {
          const splitter = new ElementSplitter(fromTime);
          const result = element.accept(splitter);
          friend.removeElement(element);
          if (result.success && result.firstElement && result.secondElement) {
            result.secondElement.setEnd(fromTime + (end - toTime));
            friend.addElement(result.firstElement, true);
            friend.addElement(result.secondElement, true);
          }
          continue;
        }
        if (start < fromTime && end <= toTime) {
          element.setEnd(fromTime);
          continue;
        }
        if (start >= fromTime && end > toTime) {
          element.setStart(fromTime);
          element.setEnd(fromTime + (end - toTime));
        }
      }
      newTracks.push(newTrack);
    }

    this.setTimelineData({ tracks: newTracks, updatePlayerData: true });
  }

  /**
   * Trim an element to new start and end times. Validates bounds and updates via updateElement.
   */
  trimElement(
    element: TrackElement,
    newStart: number,
    newEnd: number
  ): boolean {
    if (newStart >= newEnd) return false;
    const start = element.getStart();
    const end = element.getEnd();
    if (newStart < start || newEnd > end) return false;
    element.setStart(newStart);
    element.setEnd(newEnd);
    this.updateElement(element);
    return true;
  }

  /**
   * Apply multiple element updates in one batch; single setTimelineData and undo step.
   */
  updateElements(
    updates: Array<{ elementId: string; updates: Partial<ElementJSON> }>
  ): void {
    const currentData = this.getTimelineData();
    if (!currentData) return;
    const tracks = currentData.tracks;
    let changed = false;

    for (const { elementId, updates: patch } of updates) {
      for (const track of tracks) {
        const element = track.getElementById(elementId) as
          | TrackElement
          | undefined;
        if (!element) continue;
        if (patch.s !== undefined) element.setStart(patch.s);
        if (patch.e !== undefined) element.setEnd(patch.e);
        if (patch.props != null) element.setProps(patch.props);
        if (patch.t != null) (element as any).setText?.(patch.t);
        if (patch.position != null) element.setPosition(patch.position);
        if (patch.rotation != null) element.setRotation(patch.rotation);
        if (patch.opacity != null) element.setOpacity(patch.opacity);
        Object.keys(patch).forEach((key) => {
          if (
            !["id", "type", "s", "e", "t", "position", "rotation", "opacity", "props"].includes(key) &&
            (patch as Record<string, unknown>)[key] !== undefined
          ) {
            (element as any)[key] = (patch as Record<string, unknown>)[key];
          }
        });
        const updater = new ElementUpdater(track);
        element.accept(updater);
        changed = true;
        break;
      }
    }
    if (changed) {
      this.setTimelineData({ tracks, updatePlayerData: true });
    }
  }

  /**
   * Remove multiple elements by id in one batch; single setTimelineData and undo step.
   */
  removeElements(elementIds: string[]): void {
    const currentData = this.getTimelineData();
    if (!currentData) return;
    const tracks = currentData.tracks;
    const idsSet = new Set(elementIds);
    let changed = false;

    for (const track of tracks) {
      const elements = track.getElements();
      for (const el of elements) {
        if (idsSet.has(el.getId())) {
          const remover = new ElementRemover(track);
          el.accept(remover);
          changed = true;
        }
      }
    }
    if (changed) {
      this.setTimelineData({ tracks, updatePlayerData: true });
      this.emit("elements:removed", { elementIds });
    }
  }

  /**
   * Replace all elements with the given src (e.g. placeholder or same URL) with a new element definition.
   * Preserves id, s, e, and track for each replaced element. Single setTimelineData at end.
   */
  replaceElementsBySource(
    src: string,
    newElementJson: ElementJSON
  ): number {
    const currentData = this.getTimelineData();
    if (!currentData) return 0;
    const tracks = currentData.tracks;
    let replacedCount = 0;

    for (const track of tracks) {
      const elements = track.getElements();
      for (const element of elements) {
        const elementSrc =
          (element.getProps()?.src as string) ?? (element as any).getSrc?.();
        if (elementSrc !== src) continue;

        const newElement = ElementDeserializer.fromJSON(newElementJson);
        if (!newElement) continue;

        newElement.setId(element.getId());
        newElement.setStart(element.getStart());
        newElement.setEnd(element.getEnd());
        newElement.setTrackId(track.getId());

        const friend = track.createFriend();
        friend.removeElement(element);
        friend.addElement(newElement, true);
        replacedCount++;
      }
    }
    if (replacedCount > 0) {
      this.setTimelineData({ tracks, updatePlayerData: true });
    }
    return replacedCount;
  }

  /**
   * Center an element in the scene by setting its position to the center of scene dimensions.
   */
  centerElementInScene(
    elementId: string,
    sceneWidth: number,
    sceneHeight: number
  ): boolean {
    const element = this.findElementById(elementId);
    if (!element) return false;
    const props = element.getProps() ?? {};
    const w = props.width ?? (element as any).getFrame?.()?.size?.[0] ?? 0;
    const h = props.height ?? (element as any).getFrame?.()?.size?.[1] ?? 0;
    const x = sceneWidth / 2 - w / 2;
    const y = sceneHeight / 2 - h / 2;
    element.setPosition({ x, y });
    this.updateElement(element);
    return true;
  }

  /**
   * Scale an element to fit within scene dimensions while preserving aspect ratio.
   * Updates width/height in props or frame when present.
   */
  scaleElementToFit(
    elementId: string,
    sceneWidth: number,
    sceneHeight: number
  ): boolean {
    const element = this.findElementById(elementId);
    if (!element) return false;
    const props = element.getProps() ?? {};
    const frame = (element as any).getFrame?.();
    const w = props.width ?? frame?.size?.[0] ?? sceneWidth;
    const h = props.height ?? frame?.size?.[1] ?? sceneHeight;
    if (w <= 0 || h <= 0) return false;
    const scale = Math.min(sceneWidth / w, sceneHeight / h);
    const newW = w * scale;
    const newH = h * scale;
    if (frame && Array.isArray(frame.size)) {
      (element as any).setFrame?.({ ...frame, size: [newW, newH] });
    } else {
      element.setProps({ ...props, width: newW, height: newH });
    }
    const x = sceneWidth / 2 - newW / 2;
    const y = sceneHeight / 2 - newH / 2;
    element.setPosition({ x, y });
    this.updateElement(element);
    return true;
  }

  /**
   * Duplicate multiple elements by id; adds clones to the same track. Single setTimelineData at end.
   */
  async duplicateElements(elementIds: string[]): Promise<TrackElement[]> {
    const currentData = this.getTimelineData();
    if (!currentData) return [];
    const tracks = currentData.tracks;
    const added: TrackElement[] = [];
    const elementCloner = new ElementCloner();

    for (const elementId of elementIds) {
      for (const track of tracks) {
        const element = track.getElementById(elementId) as
          | TrackElement
          | undefined;
        if (!element) continue;
        const clone = element.accept(elementCloner);
        if (clone) {
          clone.setId(`e-${generateShortUuid()}`);
          const adder = new ElementAdder(track);
          const result = await clone.accept(adder);
          if (result) added.push(clone);
        }
        break;
      }
    }
    if (added.length > 0) {
      this.setTimelineData({ tracks, updatePlayerData: true });
    }
    return added;
  }
}
