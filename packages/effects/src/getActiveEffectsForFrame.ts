import { getEffectFragment } from "./catalog";

export type ActiveEffectForFrame = {
  fragment: string;
  progress: number;
  intensity: number;
};

/**
 * Resolve active GL effects for a given frame from variables.input.tracks.
 * Uses the twick effect catalog (effectKey → fragment) or element.props.fragment for custom GLSL.
 * Used by browser-render, render-server (WasmEffectsExporter via project), and live-player (via callback).
 */
export function getActiveEffectsForFrame(
  variables: Record<string, unknown> | undefined,
  frame: number,
  fps: number,
): ActiveEffectForFrame[] {
  const input = variables?.input as {
    tracks?: Array<{ type?: string; elements?: unknown[] }>;
    effectEndFadeFraction?: number;
  } | undefined;
  const tracks = input?.tracks;
  if (!Array.isArray(tracks)) return [];

  const rawFade =
    typeof input?.effectEndFadeFraction === "number"
      ? input.effectEndFadeFraction
      : 0.1;

  const effectElements: Array<{
    s: number;
    e: number;
    props: {
      effectKey?: string;
      intensity?: number;
      effectEndFadeFraction?: number;
      fragment?: string;
    };
  }> = [];
  for (const track of tracks) {
    if (!track?.elements) continue;
    const isEffectTrack = track.type === "effect";
    for (const el of track.elements as Array<{
      type?: string;
      s?: number;
      e?: number;
      props?: Record<string, unknown>;
    }>) {
      if (isEffectTrack || el.type === "effect") {
        effectElements.push({
          s: typeof el.s === "number" ? el.s : 0,
          e: typeof el.e === "number" ? el.e : 0,
          props: (el.props as {
            effectKey?: string;
            intensity?: number;
            effectEndFadeFraction?: number;
            fragment?: string;
          }) || {},
        });
      }
    }
  }

  const timeInSec = frame / fps;
  const active: ActiveEffectForFrame[] = [];
  for (const el of effectElements) {
    const { s, e, props } = el;
    if (e <= s || timeInSec < s || timeInSec >= e) continue;
    const progress = Math.max(0, Math.min(1, (timeInSec - s) / (e - s)));
    let intensity = typeof props.intensity === "number" ? props.intensity : 1;
    intensity = Math.max(0, Math.min(1, intensity));

    const rawElFade =
      typeof props.effectEndFadeFraction === "number"
        ? props.effectEndFadeFraction
        : rawFade;
    const elFadeFraction = Math.max(0, Math.min(1, rawElFade));
    if (elFadeFraction > 0 && progress >= 1 - elFadeFraction) {
      const fade = (1 - progress) / elFadeFraction;
      intensity *= fade;
    }

    // Custom GLSL from outside, or resolve by effectKey from catalog
    const fragment =
      typeof props.fragment === "string" && props.fragment.trim().length > 0
        ? props.fragment
        : props.effectKey
          ? getEffectFragment(props.effectKey)
          : undefined;
    if (!fragment) continue;

    active.push({
      fragment,
      progress,
      intensity,
    });
  }
  return active;
}

/**
 * Active effects for a given time (seconds). Used by live-player.
 */
export function getActiveEffectsForTime(
  variables: Record<string, unknown> | undefined,
  timeInSec: number,
  fps: number,
): ActiveEffectForFrame[] {
  const frame = Math.floor(timeInSec * fps);
  return getActiveEffectsForFrame(variables, frame, fps);
}
