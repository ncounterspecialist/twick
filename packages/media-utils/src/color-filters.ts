/**
 * Preset IDs for image/video `props.mediaFilter` (Twick timeline / canvas / visualizer).
 * Used by `@twick/visualizer` `applyColorFilter`, `@twick/canvas` Fabric filters, and Studio UI.
 */
export const COLOR_FILTERS = {
  SATURATED: "saturated",
  BRIGHT: "bright",
  VIBRANT: "vibrant",
  RETRO: "retro",
  BLACK_WHITE: "blackWhite",
  SEPIA: "sepia",
  COOL: "cool",
  WARM: "warm",
  CINEMATIC: "cinematic",
  SOFT_GLOW: "softGlow",
  MOODY: "moody",
  DREAMY: "dreamy",
  INVERTED: "inverted",
  VINTAGE: "vintage",
  DRAMATIC: "dramatic",
  FADED: "faded",
} as const;

export type ColorFilterPreset =
  (typeof COLOR_FILTERS)[keyof typeof COLOR_FILTERS];
