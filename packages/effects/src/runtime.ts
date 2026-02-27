import type { EffectKey } from "./catalog";
import { getEffectFragment } from "./catalog";
import {
  applyEffects as baseApplyEffects,
  createEffectContext as baseCreateEffectContext,
  type EffectContext as BaseEffectContext,
} from "@twick/gl-runtime";

/** SDK representation: effect by key so callers don't need fragment source. */
export interface ActiveEffect {
  key: EffectKey;
  progress: number;
  intensity: number;
}

/** Re-export base context type (runtime uses string-keyed program cache). */
export type EffectContext = BaseEffectContext;

export const createEffectContext = baseCreateEffectContext;

export function applyEffects(opts: {
  ctx: EffectContext;
  sourceTexture: WebGLTexture;
  width: number;
  height: number;
  effects: ActiveEffect[];
}): WebGLTexture {
  const mapped = opts.effects
    .map((e) => {
      const fragment = getEffectFragment(e.key);
      if (!fragment) return null;
      return {
        fragment,
        progress: e.progress,
        intensity: e.intensity,
      };
    })
    .filter((x): x is { fragment: string; progress: number; intensity: number } => x != null);

  return baseApplyEffects({
    ctx: opts.ctx,
    sourceTexture: opts.sourceTexture,
    width: opts.width,
    height: opts.height,
    effects: mapped,
  });
}
