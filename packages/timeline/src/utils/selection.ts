/**
 * Selection utilities for timeline multi-select.
 * Pure functions, suitable for unit testing.
 *
 * @module selection
 */

import { Track } from "../core/track/track";
import { TrackElement } from "../core/elements/base.element";
import { isTrackId } from "./timeline.utils";

/** Resolve a single ID to Track | TrackElement | null */
export function resolveId(
  id: string,
  tracks: Track[]
): Track | TrackElement | null {
  if (isTrackId(id)) {
    return tracks.find((t) => t.getId() === id) ?? null;
  }
  for (const track of tracks) {
    const el = track.getElementById(id);
    if (el) return el as TrackElement;
  }
  return null;
}

/** Resolve multiple IDs to (Track | TrackElement)[] */
export function resolveIds(
  ids: Set<string>,
  tracks: Track[]
): (Track | TrackElement)[] {
  const result: (Track | TrackElement)[] = [];
  for (const id of ids) {
    const item = resolveId(id, tracks);
    if (item) result.push(item);
  }
  return result;
}

/**
 * Get all element IDs in a track between two elements (inclusive).
 * Used for Shift+click range selection.
 */
export function getElementIdsInRange(
  track: Track,
  fromElementId: string,
  toElementId: string
): string[] {
  const elements = track.getElements();
  const fromIdx = elements.findIndex((e) => e.getId() === fromElementId);
  const toIdx = elements.findIndex((e) => e.getId() === toElementId);
  if (fromIdx === -1 || toIdx === -1) return [];
  const [start, end] = fromIdx <= toIdx ? [fromIdx, toIdx] : [toIdx, fromIdx];
  return elements.slice(start, end + 1).map((e) => e.getId());
}
