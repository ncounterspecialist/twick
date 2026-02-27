/**
 * Effect catalog: labels, defaults, and fragment shaders.
 * Fragment source is kept in sync with @twick/gl-runtime catalog so live player and export match.
 */
export type EffectKey =
  | "sepia"
  | "vignette"
  | "pixelate"
  | "warp";

export interface EffectUniformConfig {
  type: "float" | "vec2" | "vec3" | "vec4" | "int";
  value: unknown;
}

export interface EffectConfig {
  key: EffectKey;
  label: string;
  description: string;
  fragment: string;
  defaultUniforms: Record<string, EffectUniformConfig>;
}

export const BASIC_VERTEX_SHADER = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    v_texCoord = a_texCoord;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const SEPIA_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uIntensity;
  void main() {
    vec4 color = texture2D(uTexture, v_texCoord);
    vec3 c = color.rgb;
    vec3 sepia = vec3(
      dot(c, vec3(0.393, 0.769, 0.189)),
      dot(c, vec3(0.349, 0.686, 0.168)),
      dot(c, vec3(0.272, 0.534, 0.131))
    );
    vec3 mixed = mix(c, sepia, clamp(uIntensity, 0.0, 1.0));
    gl_FragColor = vec4(mixed, color.a);
  }
`;

const VIGNETTE_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uIntensity;
  void main() {
    vec2 uv = v_texCoord - 0.5;
    float dist = length(uv);
    float vignette = smoothstep(0.8, 0.3, dist);
    vec4 color = texture2D(uTexture, v_texCoord);
    color.rgb *= mix(1.0, vignette, clamp(uIntensity, 0.0, 1.0));
    gl_FragColor = color;
  }
`;

const PIXELATE_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform float uIntensity;
  void main() {
    float pixelSize = mix(1.0, 20.0, clamp(uIntensity, 0.0, 1.0));
    vec2 uv = v_texCoord;
    vec2 coord = floor(uv * uResolution / pixelSize) * pixelSize / uResolution;
    vec4 color = texture2D(uTexture, coord);
    gl_FragColor = color;
  }
`;

const WARP_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;
  void main() {
    vec2 uv = v_texCoord;
    float strength = 0.03 * uIntensity;
    uv.x += sin(uv.y * 20.0 + uTime * 10.0) * strength;
    uv.y += cos(uv.x * 20.0 + uTime * 8.0) * strength;
    vec4 color = texture2D(uTexture, uv);
    gl_FragColor = color;
  }
`;

export const EFFECTS: Record<EffectKey, EffectConfig> = {
  sepia: {
    key: "sepia",
    label: "Sepia",
    description: "Warm vintage sepia tone.",
    fragment: SEPIA_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 1.0 } },
  },
  vignette: {
    key: "vignette",
    label: "Vignette",
    description: "Darken edges to focus center.",
    fragment: VIGNETTE_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 0.8 } },
  },
  pixelate: {
    key: "pixelate",
    label: "Pixelate",
    description: "Blocky pixelation effect.",
    fragment: PIXELATE_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 0.7 } },
  },
  warp: {
    key: "warp",
    label: "Warp",
    description: "Sinusoidal warp of the frame.",
    fragment: WARP_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 0.8 } },
  },
};

export function getEffectFragment(key: string): string | undefined {
  if (key in EFFECTS) return EFFECTS[key as EffectKey].fragment;
  return undefined;
}

export const EFFECT_OPTIONS: Array<{
  key: EffectKey;
  label: string;
  description: string;
}> = Object.values(EFFECTS).map((cfg) => ({
  key: cfg.key,
  label: cfg.label,
  description: cfg.description,
}));
