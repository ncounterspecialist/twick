import { Track } from "@twick/timeline";

/**
 * Collects snap target times for the timeline.
 * Includes: playhead, clip edges (excluding the dragging element), 0, and duration.
 */
export function getSnapTargets(
  tracks: Track[],
  currentTime: number,
  duration: number,
  excludeElementId?: string
): number[] {
  const targets = new Set<number>();

  targets.add(0);
  targets.add(duration);
  targets.add(currentTime);

  for (const track of tracks) {
    for (const el of track.getElements()) {
      if (excludeElementId && el.getId() === excludeElementId) continue;
      targets.add(el.getStart());
      targets.add(el.getEnd());
    }
  }

  return [...targets];
}
