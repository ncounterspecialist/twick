/**
 * Hit-test: given clientY relative to timeline content area, return whether
 * the pointer is over a track or a separator (gap between tracks). OpenVideo-style.
 */
export type DropTarget =
  | { type: "track"; trackIndex: number }
  | { type: "separator"; separatorIndex: number }
  | null;

const SEPARATOR_HEIGHT = 6;

export function getTrackOrSeparatorAt(
  clientY: number,
  containerTop: number,
  trackHeight: number
): DropTarget {
  const y = clientY - containerTop;
  if (y < 0) return null;

  // Layout: [sep0][track0][sep1][track1]...
  const rowHeight = trackHeight + SEPARATOR_HEIGHT;

  if (y < SEPARATOR_HEIGHT) {
    return { type: "separator", separatorIndex: 0 };
  }

  const relativeY = y - SEPARATOR_HEIGHT;
  const index = Math.floor(relativeY / rowHeight);
  const remainder = relativeY % rowHeight;

  if (remainder < trackHeight) {
    return { type: "track", trackIndex: index };
  }
  return { type: "separator", separatorIndex: index + 1 };
}
