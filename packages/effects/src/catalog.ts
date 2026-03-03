/**
 * Effect catalog: labels, defaults, and fragment shaders.
 * Fragment source is kept in sync with @twick/gl-runtime catalog so live player and export match.
 *
 * NOTE: When adding new effects, prefer using only the shared uniforms that
 * the runtime always binds (`uTexture`, `uTime`, `uIntensity`, `uResolution`)
 * so they work consistently across live player and exports.
 */
export type EffectKey =
  | "sepia"
  | "vignette"
  | "pixelate"
  | "warp"
  | "glitch"
  | "rgbShift"
  | "halftone"
  | "hueShift"
  | "waveDistort"
  | "tvScanlines"
  | "hdr"
  | "retro70s"
  | "bubbleSparkles"
  | "heartSparkles"
  | "butterflySparkles"
  | "lightning"
  | "lightningVeins"
  | "sparks"
  | "laser"
  | "waterReflection"
  | "bouncingBalls"
  | "paperBreakReveal"
  | "cameraMove"
  | "blackFlash"
  | "brightPulse"
  | "randomAccents"
  | "graffiti";

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

// Simplified from openvideo "Glitch" style effect: time-based slice + RGB offset.
const GLITCH_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;

  float rand(float n) { return fract(sin(n) * 43758.5453123); }
  float rand2(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

  void main(void) {
    vec2 uv = v_texCoord;

    // Slice count and RGB offset scale with intensity
    float sliceCount = mix(6.0, 24.0, clamp(uIntensity, 0.0, 1.0));
    float baseShift = 0.01 * clamp(uIntensity, 0.0, 1.0);

    float sliceId = floor(uv.y * sliceCount);
    float sliceShift = (rand(sliceId + uTime * 10.0) - 0.5) * 0.25 * baseShift;
    uv.x += sliceShift;

    float rShift = baseShift;
    float gShift = -baseShift * 0.5;
    float bShift = baseShift * 0.75;

    vec3 col;
    col.r = texture2D(uTexture, uv + vec2(rShift, 0.0)).r;
    col.g = texture2D(uTexture, uv + vec2(gShift, 0.0)).g;
    col.b = texture2D(uTexture, uv + vec2(bShift, 0.0)).b;

    float noise = rand2(vec2(uTime * 50.0, uv.y * 100.0));
    float noiseIntensity = noise * 0.2 * clamp(uIntensity, 0.0, 1.0);

    col += noiseIntensity;
    gl_FragColor = vec4(col, 1.0);
  }
`;

// RGB shift / chromatic aberration style effect.
const RGB_SHIFT_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;

  void main(void) {
    vec2 uv = v_texCoord;
    vec4 base = texture2D(uTexture, uv);
    if (base.a < 0.01) {
      gl_FragColor = base;
      return;
    }

    float shiftAmount = mix(0.001, 0.02, clamp(uIntensity, 0.0, 1.0));
    float angle = 0.5 + sin(uTime * 0.7) * 0.5;
    vec2 dir = vec2(cos(angle), sin(angle));

    float wobble = sin(uTime * 10.0) * shiftAmount * 0.5;

    vec2 rUV = clamp(uv + dir * shiftAmount + vec2(wobble, 0.0), 0.0, 1.0);
    vec2 gUV = clamp(uv, 0.0, 1.0);
    vec2 bUV = clamp(uv - dir * shiftAmount - vec2(wobble, 0.0), 0.0, 1.0);

    float r = texture2D(uTexture, rUV).r;
    float g = texture2D(uTexture, gUV).g;
    float b = texture2D(uTexture, bUV).b;

    gl_FragColor = vec4(r, g, b, base.a);
  }
`;

// Halftone / dot pattern – intensity controls dot size and strength.
const HALFTONE_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;

  float luminance(vec3 c) {
    return dot(c, vec3(0.299, 0.587, 0.114));
  }

  void main(void) {
    vec2 uv = v_texCoord;

    float angle = uTime * 0.3;
    float ca = cos(angle);
    float sa = sin(angle);
    mat2 rot = mat2(ca, -sa, sa, ca);
    vec2 rotatedUV = rot * (uv - 0.5) + 0.5;

    float dotSize = mix(0.06, 0.015, clamp(uIntensity, 0.0, 1.0));
    vec2 grid = rotatedUV / dotSize;
    vec2 cell = floor(grid) + 0.5;
    vec2 cellCenter = cell * dotSize;

    vec4 texColor = texture2D(uTexture, uv);
    float lum = luminance(texColor.rgb);
    float radius = (1.0 - lum) * dotSize * 0.5;

    float dist = distance(rotatedUV, cellCenter);
    float mask = smoothstep(radius, radius * 0.8, dist);

    vec3 halftone = texColor.rgb * mask;
    float mixAmount = clamp(uIntensity, 0.0, 1.0);
    texColor.rgb = mix(texColor.rgb, halftone, mixAmount);

    gl_FragColor = texColor;
  }
`;

// Animated hue shift; intensity controls mix amount.
const HUE_SHIFT_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;

  vec3 hueShift(vec3 color, float angle) {
    float cosA = cos(angle);
    float sinA = sin(angle);
    mat3 rot = mat3(
      0.299 + 0.701 * cosA + 0.168 * sinA,
      0.587 - 0.587 * cosA + 0.330 * sinA,
      0.114 - 0.114 * cosA - 0.497 * sinA,

      0.299 - 0.299 * cosA - 0.328 * sinA,
      0.587 + 0.413 * cosA + 0.035 * sinA,
      0.114 - 0.114 * cosA + 0.292 * sinA,

      0.299 - 0.300 * cosA + 1.250 * sinA,
      0.587 - 0.588 * cosA - 1.050 * sinA,
      0.114 + 0.886 * cosA - 0.203 * sinA
    );
    return color * rot;
  }

  void main(void) {
    vec2 uv = v_texCoord;
    vec4 tex = texture2D(uTexture, uv);
    float amount = clamp(uIntensity, 0.0, 1.0);

    vec3 shifted = hueShift(tex.rgb, uTime * 2.5);
    tex.rgb = mix(tex.rgb, shifted, amount);

    gl_FragColor = tex;
  }
`;

// Horizontal wave distortion – intensity controls strength.
const WAVE_DISTORT_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;

  void main(void) {
    vec2 uv = v_texCoord;
    float strength = mix(0.0, 0.03, clamp(uIntensity, 0.0, 1.0));
    float time = uTime * 10.0;
    float wave = sin((uv.y * 18.0) - time);
    float offsetX = wave * strength;
    vec2 distortedUV = clamp(uv + vec2(offsetX, 0.0), 0.0, 1.0);
    vec4 color = texture2D(uTexture, distortedUV);
    gl_FragColor = color;
  }
`;

// TV scanlines and subtle noise.
const TV_SCANLINES_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;

  float rand(vec2 p) {
    return fract(sin(dot(p ,vec2(12.9898,78.233))) * 43758.5453);
  }

  void main(void) {
    vec2 uv = v_texCoord;
    vec4 tex = texture2D(uTexture, uv);
    vec3 base = tex.rgb;

    float lineThickness = mix(1.0, 3.0, clamp(uIntensity, 0.0, 1.0));
    float line = sin(uv.y * 800.0 * lineThickness) * 0.5 + 0.5;
    float lineIntensity = mix(0.2, 0.8, clamp(uIntensity, 0.0, 1.0));
    line = mix(1.0, line, lineIntensity);

    float noise = (rand(vec2(uTime, uv.y * 1000.0)) - 0.5) * 0.1 * clamp(uIntensity, 0.0, 1.0);
    vec3 color = base * line + noise;

    gl_FragColor = vec4(color, tex.a);
  }
`;

// Simple HDR-ish tone mapping based on exposure/contrast driven by intensity.
const HDR_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uIntensity;

  vec3 adjustContrast(vec3 color, float contrast) {
    return (color - 0.5) * contrast + 0.5;
  }

  void main(void) {
    vec2 uv = v_texCoord;
    vec4 tex = texture2D(uTexture, uv);
    vec3 color = tex.rgb;

    float exposure = mix(1.0, 1.8, clamp(uIntensity, 0.0, 1.0));
    float contrast = mix(1.0, 2.0, clamp(uIntensity, 0.0, 1.0));

    color *= exposure;
    color = adjustContrast(color, contrast);
    color = color / (color + vec3(1.0));

    gl_FragColor = vec4(color, tex.a);
  }
`;

// Retro 70s: sepia-ish fade + grain + vignette.
const RETRO_70S_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;

  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898,78.233)) + uTime) * 43758.5453);
  }

  void main(void) {
    vec2 uv = v_texCoord;
    vec4 tex = texture2D(uTexture, uv);
    vec3 color = tex.rgb;

    // Sepia-like fade
    vec3 sepia = vec3(
      dot(color, vec3(0.393, 0.769, 0.189)),
      dot(color, vec3(0.349, 0.686, 0.168)),
      dot(color, vec3(0.272, 0.534, 0.131))
    );
    float fade = clamp(uIntensity, 0.0, 1.0);
    vec3 faded = mix(color, sepia, mix(0.4, 0.9, fade));

    // Film grain
    float grainAmount = mix(0.0, 0.12, fade);
    float grain = (noise(uv * 500.0) - 0.5) * grainAmount;
    faded += grain;

    // Slight flicker
    float flicker = 0.97 + 0.03 * sin(uTime * 60.0);
    faded *= flicker;

    // Vignette
    float dist = distance(uv, vec2(0.5));
    float vignette = smoothstep(0.8, 1.0, dist);
    float vignetteStrength = mix(0.0, 1.0, fade);
    faded *= (1.0 - vignette * vignetteStrength);

    gl_FragColor = vec4(faded, tex.a);
  }
`;

// Bubble-style sparkles around the frame.
const BUBBLE_SPARKLES_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;

  float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
  }

  float softCircle(vec2 uv, vec2 c, float r) {
    float d = distance(uv, c);
    return 1.0 - smoothstep(r * 0.6, r, d);
  }

  void main(void) {
    vec2 uv = v_texCoord;
    vec4 fg = texture2D(uTexture, uv);

    float bubbles = 0.0;
    float count = mix(20.0, 120.0, clamp(uIntensity, 0.0, 1.0));

    for (float i = 0.0; i < 200.0; i++) {
      if (i >= count) break;
      float t = uTime * 0.7 + i * 0.13;
      vec2 pos = vec2(rand(vec2(i, 1.23)), rand(vec2(i, 4.56)));
      float radius = mix(0.01, 0.03, rand(vec2(i, 9.87)));
      pos.y = fract(pos.y + t * 0.1);
      bubbles += softCircle(uv, pos, radius);
    }

    vec3 bubbleColor = vec3(1.0, 0.9, 0.5);
    fg.rgb += bubbleColor * bubbles * clamp(uIntensity, 0.0, 1.0);
    gl_FragColor = fg;
  }
`;

// Heart-shaped sparkles.
const HEART_SPARKLES_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;

  float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
  }

  float heartShape(vec2 p) {
    p = (p - 0.5) * 2.0;
    p.y = -p.y;
    p.y += 0.25;
    float x = p.x;
    float y = p.y;
    float v = pow(x*x + y*y - 1.0, 3.0) - x*x*y*y*y;
    return smoothstep(0.0, 0.02, -v);
  }

  void main(void) {
    vec2 uv = v_texCoord;
    vec4 base = texture2D(uTexture, uv);
    float hearts = 0.0;
    float count = mix(10.0, 80.0, clamp(uIntensity, 0.0, 1.0));

    for (float i = 0.0; i < 120.0; i++) {
      if (i >= count) break;
      vec2 pos = vec2(rand(vec2(i, 1.234)), rand(vec2(i, 5.678)));
      float size = mix(0.02, 0.05, rand(vec2(i, 9.1011)));
      float vibX = (rand(vec2(i, uTime)) - 0.5) * 0.02;
      float vibY = (rand(vec2(i + 1.0, uTime)) - 0.5) * 0.02;
      vec2 hUV = (uv - (pos + vec2(vibX, vibY))) / size + 0.5;
      float h = heartShape(hUV);
      float pulse = sin(uTime * 4.0 + i) * 0.2 + 1.0;
      hearts += h * pulse;
    }

    vec3 heartColor = vec3(1.0, 0.3, 0.6);
    base.rgb += heartColor * hearts * clamp(uIntensity, 0.0, 1.0);
    gl_FragColor = base;
  }
`;

// Butterfly-shaped sparkles.
const BUTTERFLY_SPARKLES_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;

  float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
  }

  float wing(vec2 p) {
    float d = pow(p.x, 2.0) + pow(p.y * 1.2, 2.0);
    return smoothstep(0.3, 0.0, d);
  }

  float butterflyShape(vec2 uv) {
    vec2 p = (uv - 0.5) * 2.0;
    float body = smoothstep(0.12, 0.05, abs(p.x)) * smoothstep(0.4, 0.0, abs(p.y));
    float wL = wing(vec2(p.x * 1.2 + 0.6, p.y));
    float wR = wing(vec2(p.x * 1.2 - 0.6, p.y));
    return clamp(wL + wR + body, 0.0, 1.0);
  }

  void main(void) {
    vec2 uv = v_texCoord;
    vec4 base = texture2D(uTexture, uv);
    float butterflies = 0.0;
    float count = mix(8.0, 40.0, clamp(uIntensity, 0.0, 1.0));

    for (float i = 0.0; i < 80.0; i++) {
      if (i >= count) break;
      vec2 pos = vec2(rand(vec2(i, 1.234)), rand(vec2(i, 5.678)));
      float size = mix(0.03, 0.08, rand(vec2(i, 9.1011)));
      float vibX = (rand(vec2(i, uTime)) - 0.5) * 0.02;
      float vibY = (rand(vec2(i + 1.0, uTime)) - 0.5) * 0.02;
      vec2 bUV = (uv - (pos + vec2(vibX, vibY))) / size + 0.5;
      float b = butterflyShape(bUV);
      float pulse = sin(uTime * 3.0 + i) * 0.25 + 1.0;
      butterflies += b * pulse;
    }

    vec3 butterflyColor = vec3(0.5, 0.6, 1.0);
    base.rgb += butterflyColor * butterflies * clamp(uIntensity, 0.0, 1.0);
    gl_FragColor = base;
  }
`;

// Radial lightning bolt + explosion.
const LIGHTNING_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;

  void main(void) {
    vec2 uv = v_texCoord;
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(uv, center);

    float speed = 0.7;
    float progress = mod(uTime * speed, 1.0);
    float width = mix(0.01, 0.07, progress);
    float lightning = smoothstep(progress + width, progress, dist);
    float noise = sin((uv.x + uv.y) * 40.0 + uTime * 12.0) * 0.5 + 0.5;
    lightning *= noise;

    float explosion = smoothstep(0.85, 1.0, progress);
    float burst = explosion * smoothstep(0.25, 0.0, dist);

    vec3 lightningColor = vec3(1.0, 0.9, 0.6) * lightning * 2.0;
    vec3 explosionColor = vec3(1.0, 0.4, 0.2) * burst * 3.0;

    vec4 base = texture2D(uTexture, uv);
    vec3 mixed = base.rgb + (lightningColor + explosionColor) * clamp(uIntensity, 0.0, 1.0);
    gl_FragColor = vec4(mixed, base.a);
  }
`;

// Lightning veins / energy center.
const LIGHTNING_VEINS_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) +
           (c - a) * u.y * (1.0 - u.x) +
           (d - b) * u.x * u.y;
  }

  void main(void) {
    vec2 uv = v_texCoord;
    vec2 center = vec2(0.5);
    vec2 dir = uv - center;
    float dist = length(dir);
    float t = uTime * 1.5;

    float veinNoise = noise(dir * 6.0 + t) * 0.6 +
                      noise(dir * 12.0 - t * 1.3) * 0.3;
    float warpedDist = dist + veinNoise * 0.08;
    float thickness = 0.04 + veinNoise * 0.02;
    float lightning = smoothstep(thickness, 0.0, warpedDist);

    float branches = smoothstep(0.02, 0.0, abs(noise(dir * 20.0 + t) - 0.5));
    lightning += branches * 0.35;

    float pulse = sin(uTime * 10.0) * 0.3 + 0.7;
    lightning *= pulse;

    vec3 veinColor = vec3(0.6, 0.85, 1.0) * lightning * 2.5 * clamp(uIntensity, 0.0, 1.0);
    vec4 base = texture2D(uTexture, uv);
    gl_FragColor = vec4(base.rgb + veinColor, base.a);
  }
`;

// Sparks particles.
const SPARKS_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  vec3 randomColor(float h) {
    return vec3(
      0.5 + 0.5 * sin(h * 6.2831),
      0.5 + 0.5 * sin(h * 6.2831 + 2.1),
      0.5 + 0.5 * sin(h * 6.2831 + 4.2)
    );
  }

  void main(void) {
    vec2 uv = v_texCoord;
    vec4 base = texture2D(uTexture, uv);
    vec3 sparkColor = vec3(0.0);
    float sparkAlpha = 0.0;

    float density = mix(10.0, 40.0, clamp(uIntensity, 0.0, 1.0));
    vec2 grid = floor(uv * density);
    float h = hash(grid);
    vec2 offset = vec2(fract(h * 13.3), fract(h * 7.7 + uTime * 2.0));
    vec2 cellUV = fract(uv * density) - offset;
    float d = length(cellUV);

    float size = mix(0.1, 0.25, clamp(uIntensity, 0.0, 1.0));
    float spark = smoothstep(size, 0.0, d);
    vec3 color = randomColor(h) * spark;
    sparkColor += color;
    sparkAlpha += spark;

    vec3 finalColor = base.rgb + sparkColor;
    gl_FragColor = vec4(finalColor, max(base.a, sparkAlpha));
  }
`;

// Horizontal laser beam across the frame.
const LASER_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;

  float noise(float x) {
    return sin(x * 40.0) * 0.005;
  }

  void main(void) {
    vec2 uv = v_texCoord;
    vec4 baseColor = texture2D(uTexture, uv);

    float beamY = 0.5 + noise(uv.x + uTime * 5.0);
    float thickness = mix(0.01, 0.04, clamp(uIntensity, 0.0, 1.0));
    float dist = abs(uv.y - beamY);

    float core = smoothstep(thickness, 0.0, dist);
    float glow = smoothstep(thickness * 4.0, thickness, dist);
    float pulse = 0.6 + 0.4 * sin(uTime * 10.0);
    float laserMask = (core + glow * 1.5) * pulse * clamp(uIntensity, 0.0, 1.0);

    vec3 laserColor = vec3(1.0, 0.1, 0.3) * laserMask;
    vec3 color = baseColor.rgb + laserColor;
    gl_FragColor = vec4(color, baseColor.a);
  }
`;

// Water reflection in lower half of frame.
const WATER_REFLECTION_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;

  void main(void) {
    vec2 uv = v_texCoord;

    if (uv.y < 0.5) {
      gl_FragColor = texture2D(uTexture, uv);
      return;
    }

    vec2 reflectUV = uv;
    reflectUV.y = 1.0 - uv.y;
    float wave =
      sin(reflectUV.y * 30.0 + uTime * 2.5) *
      mix(0.0, 0.03, clamp(uIntensity, 0.0, 1.0));
    reflectUV.x += wave;
    reflectUV = clamp(reflectUV, 0.0, 1.0);
    vec4 reflectColor = texture2D(uTexture, reflectUV);
    float fade = smoothstep(0.5, 1.0, uv.y);
    reflectColor.rgb *= (1.0 - fade) * 0.9;
    reflectColor.a *= (1.0 - fade);
    gl_FragColor = reflectColor;
  }
`;

// Bouncing balls overlay.
const BOUNCING_BALLS_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;

  const int BALL_COUNT = 10;

  vec2 bounce(vec2 p) {
    return abs(fract(p) * 2.0 - 1.0);
  }

  void main(void) {
    vec2 uv = v_texCoord;
    vec4 color = texture2D(uTexture, uv);

    float radius = mix(0.03, 0.07, clamp(uIntensity, 0.0, 1.0));
    float border = radius * 0.25;
    float ballsAlpha = 0.0;

    for (int i = 0; i < BALL_COUNT; i++) {
      float id = float(i) + 1.0;
      vec2 speed = vec2(0.3 + id * 0.12, 0.25 + id * 0.15);
      vec2 pos = bounce(vec2(uTime * speed.x + id * 0.17, uTime * speed.y + id * 0.29));
      float d = distance(uv, pos);
      float edge = smoothstep(radius, radius - border, d) -
                   smoothstep(radius - border, radius - border - 0.01, d);
      ballsAlpha += edge;
    }

    ballsAlpha = clamp(ballsAlpha, 0.0, 1.0) * clamp(uIntensity, 0.0, 1.0);
    color.rgb = mix(color.rgb, vec3(1.0), ballsAlpha);
    gl_FragColor = color;
  }
`;

// Paper break / tear reveal style effect.
const PAPER_BREAK_REVEAL_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;

  float noise(float x) {
    return sin(x * 28.0) * 0.035;
  }

  void main(void) {
    vec2 uv = v_texCoord;
    vec4 base = texture2D(uTexture, uv);

    float t = clamp(uTime, 0.0, 1.0);
    float cutCenter = 0.5;
    float wiggle = noise(uv.y + uTime * 3.0) * 0.2 * t;
    float tearLine = cutCenter + wiggle * clamp(uIntensity, 0.0, 1.0);

    float split = 0.3 * t * clamp(uIntensity, 0.0, 1.0);
    vec2 leftUV = uv;
    vec2 rightUV = uv;
    leftUV.x -= split * step(uv.x, tearLine);
    rightUV.x += split * step(tearLine, uv.x);
    leftUV = clamp(leftUV, 0.0, 1.0);
    rightUV = clamp(rightUV, 0.0, 1.0);

    vec4 left = texture2D(uTexture, leftUV);
    vec4 right = texture2D(uTexture, rightUV);
    float cutMask = smoothstep(tearLine - 0.02, tearLine + 0.02, uv.x);
    vec4 broken = mix(left, right, cutMask);

    float edge = smoothstep(0.0, 0.02, abs(uv.x - tearLine)) *
                 (1.0 - smoothstep(0.02, 0.05, abs(uv.x - tearLine)));
    vec3 edgeColor = vec3(1.0) * edge * t;
    broken.rgb += edgeColor;

    gl_FragColor = mix(base, broken, t);
  }
`;

// Camera shake / move.
const CAMERA_MOVE_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;

  float rand(float x) {
    return fract(sin(x * 12.9898) * 43758.5453);
  }

  vec2 shakeOffset(float time, float intensity) {
    float x = (rand(time * 0.7) - 0.5) * intensity;
    float y = (rand(time * 1.3 + 10.0) - 0.5) * intensity;
    return vec2(x, y);
  }

  void main(void) {
    vec2 uv = v_texCoord;
    float intensity = mix(0.0, 0.04, clamp(uIntensity, 0.0, 1.0));
    vec2 offset = shakeOffset(uTime * 2.0, intensity);
    vec2 uvMoved = clamp(uv + offset, 0.0, 1.0);
    vec4 color = texture2D(uTexture, uvMoved);
    gl_FragColor = color;
  }
`;

// Black flash pulses.
const BLACK_FLASH_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;

  void main(void) {
    vec2 uv = v_texCoord;
    vec4 base = texture2D(uTexture, uv);
    float duration = 0.3;
    float m = mod(uTime, duration);
    float flash = smoothstep(0.0, duration * 0.5, m) *
                  (1.0 - smoothstep(duration * 0.5, duration, m));
    flash *= clamp(uIntensity, 0.0, 1.0);
    vec3 color = mix(base.rgb, vec3(0.0), flash);
    gl_FragColor = vec4(color, base.a);
  }
`;

// Bright pulse + slight blur.
const BRIGHT_PULSE_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;

  vec4 blur3(sampler2D tex, vec2 uv, vec2 texel) {
    vec4 c = vec4(0.0);
    c += texture2D(tex, uv + texel * vec2(-1.0, -1.0)) * 0.0625;
    c += texture2D(tex, uv + texel * vec2( 0.0, -1.0)) * 0.125;
    c += texture2D(tex, uv + texel * vec2( 1.0, -1.0)) * 0.0625;
    c += texture2D(tex, uv + texel * vec2(-1.0,  0.0)) * 0.125;
    c += texture2D(tex, uv) * 0.25;
    c += texture2D(tex, uv + texel * vec2( 1.0,  0.0)) * 0.125;
    c += texture2D(tex, uv + texel * vec2(-1.0,  1.0)) * 0.0625;
    c += texture2D(tex, uv + texel * vec2( 0.0,  1.0)) * 0.125;
    c += texture2D(tex, uv + texel * vec2( 1.0,  1.0)) * 0.0625;
    return c;
  }

  void main(void) {
    vec2 uv = v_texCoord;
    vec2 texel = vec2(1.0 / 1024.0);
    float pulse = 0.5 + 0.5 * sin(uTime * 3.0);
    float scale = 1.0 + pulse * 0.3 * clamp(uIntensity, 0.0, 1.0);
    vec2 center = vec2(0.5, 0.5);
    vec2 uvScaled = (uv - center) / scale + center;
    uvScaled = clamp(uvScaled, 0.0, 1.0);
    vec4 base = texture2D(uTexture, uvScaled);
    vec4 blurred = blur3(uTexture, uvScaled, texel * 1.5);
    vec4 colorValue = mix(base, blurred, 0.7 * clamp(uIntensity, 0.0, 1.0));
    gl_FragColor = colorValue;
  }
`;

// Random accent blobs with two colors.
const RANDOM_ACCENTS_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  vec3 accentColor(float h) {
    vec3 colorA = vec3(1.0, 0.2, 0.6);
    vec3 colorB = vec3(0.2, 0.8, 1.0);
    return mix(colorA, colorB, fract(h * 7.0));
  }

  void main(void) {
    vec2 uv = v_texCoord;
    vec4 base = texture2D(uTexture, uv);
    float density = mix(10.0, 25.0, clamp(uIntensity, 0.0, 1.0));
    vec2 gridUV = floor(uv * density);
    float h = hash(gridUV);

    vec2 offset = vec2(fract(h * 13.3), fract(h * 7.7));
    vec2 accentUV = fract(uv * density) - offset;
    float dist = length(accentUV);
    float size = mix(0.2, 0.08, clamp(uIntensity, 0.0, 1.0));
    float accent = smoothstep(size, 0.0, dist);
    accent *= 0.6 + 0.4 * sin(uTime * 10.0 + h * 6.2831);
    vec3 color = accentColor(h) * accent * clamp(uIntensity, 0.0, 1.0);
    float alpha = accent;
    gl_FragColor = vec4(color + base.rgb, max(base.a, alpha));
  }
`;

// Graffiti spray + drips over the frame.
const GRAFFITI_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;

  float rand(vec2 st) {
    return fract(sin(dot(st, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = rand(i);
    float b = rand(i + vec2(1.0, 0.0));
    float c = rand(i + vec2(0.0, 1.0));
    float d = rand(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) +
           (c - a) * u.y * (1.0 - u.x) +
           (d - b) * u.x * u.y;
  }

  float spray(vec2 st, float radius) {
    float dist = length(st - vec2(0.28, 0.5));
    float base = smoothstep(radius, radius - 0.06, dist);
    float speckle =
      noise(st * 45.0 + uTime * 3.0) *
      noise(st * 90.0);
    return clamp(base + speckle * 0.7, 0.0, 1.0);
  }

  float drips(vec2 st, float mask) {
    float column = noise(vec2(st.x * 25.0, 0.0));
    float drip =
      smoothstep(0.3, 0.7, column) *
      smoothstep(0.1, 1.0, 1.0 - st.y);
    float flow =
      noise(vec2(st.x * 35.0, st.y * 6.0 + uTime * 2.5));
    return drip * flow * mask;
  }

  void main(void) {
    vec2 uv = v_texCoord;
    vec4 base = texture2D(uTexture, uv);
    vec3 graffitiColor = vec3(1.0, 0.0, 0.5);
    float reveal = clamp(uIntensity, 0.0, 1.0);
    float sprayMask = spray(uv, 0.35 * reveal);
    float dripMask = drips(uv, sprayMask) * reveal;
    float graffitiMask = clamp(sprayMask + dripMask * 1.3, 0.0, 1.0);
    vec3 graffiti = graffitiColor * graffitiMask;
    vec3 Color = base.rgb + graffiti;
    gl_FragColor = vec4(Color, base.a);
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
  glitch: {
    key: "glitch",
    label: "Glitch",
    description: "RGB slice and noise glitch.",
    fragment: GLITCH_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 0.6 } },
  },
  rgbShift: {
    key: "rgbShift",
    label: "RGB Shift",
    description: "Chromatic aberration style RGB split.",
    fragment: RGB_SHIFT_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 0.7 } },
  },
  halftone: {
    key: "halftone",
    label: "Halftone",
    description: "Animated halftone dot shading.",
    fragment: HALFTONE_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 0.8 } },
  },
  hueShift: {
    key: "hueShift",
    label: "Hue Shift",
    description: "Animated hue rotation of colors.",
    fragment: HUE_SHIFT_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 1.0 } },
  },
  waveDistort: {
    key: "waveDistort",
    label: "Wave Distort",
    description: "Horizontal wave distortion.",
    fragment: WAVE_DISTORT_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 0.8 } },
  },
  tvScanlines: {
    key: "tvScanlines",
    label: "TV Scanlines",
    description: "Old TV scanlines with subtle noise.",
    fragment: TV_SCANLINES_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 0.7 } },
  },
  hdr: {
    key: "hdr",
    label: "HDR Boost",
    description: "Exposure and contrast HDR-style boost.",
    fragment: HDR_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 0.7 } },
  },
  retro70s: {
    key: "retro70s",
    label: "Retro 70s",
    description: "Grainy, faded, vignetted retro film look.",
    fragment: RETRO_70S_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 0.8 } },
  },
  bubbleSparkles: {
    key: "bubbleSparkles",
    label: "Bubble Sparkles",
    description: "Floating bubble-like sparkles.",
    fragment: BUBBLE_SPARKLES_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 0.8 } },
  },
  heartSparkles: {
    key: "heartSparkles",
    label: "Heart Sparkles",
    description: "Animated heart-shaped sparkles.",
    fragment: HEART_SPARKLES_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 0.9 } },
  },
  butterflySparkles: {
    key: "butterflySparkles",
    label: "Butterfly Sparkles",
    description: "Animated butterfly-shaped sparkles.",
    fragment: BUTTERFLY_SPARKLES_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 0.9 } },
  },
  lightning: {
    key: "lightning",
    label: "Lightning",
    description: "Radial lightning strike with flash.",
    fragment: LIGHTNING_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 1.0 } },
  },
  lightningVeins: {
    key: "lightningVeins",
    label: "Lightning Veins",
    description: "Energy veins radiating from center.",
    fragment: LIGHTNING_VEINS_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 1.0 } },
  },
  sparks: {
    key: "sparks",
    label: "Sparks",
    description: "Random colored sparks overlay.",
    fragment: SPARKS_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 0.9 } },
  },
  laser: {
    key: "laser",
    label: "Laser",
    description: "Horizontal laser beam across the frame.",
    fragment: LASER_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 0.8 } },
  },
  waterReflection: {
    key: "waterReflection",
    label: "Water Reflection",
    description: "Water reflection in the lower half of the frame.",
    fragment: WATER_REFLECTION_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 0.7 } },
  },
  bouncingBalls: {
    key: "bouncingBalls",
    label: "Bouncing Balls",
    description: "Bouncing light balls over the frame.",
    fragment: BOUNCING_BALLS_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 0.8 } },
  },
  paperBreakReveal: {
    key: "paperBreakReveal",
    label: "Paper Break Reveal",
    description: "Tearing paper style reveal.",
    fragment: PAPER_BREAK_REVEAL_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 1.0 } },
  },
  cameraMove: {
    key: "cameraMove",
    label: "Camera Move",
    description: "Camera shake / movement effect.",
    fragment: CAMERA_MOVE_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 0.7 } },
  },
  blackFlash: {
    key: "blackFlash",
    label: "Black Flash",
    description: "Periodic flash to black.",
    fragment: BLACK_FLASH_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 0.7 } },
  },
  brightPulse: {
    key: "brightPulse",
    label: "Bright Pulse",
    description: "Bright pulse with subtle blur.",
    fragment: BRIGHT_PULSE_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 0.8 } },
  },
  randomAccents: {
    key: "randomAccents",
    label: "Random Accents",
    description: "Random colored accent blobs.",
    fragment: RANDOM_ACCENTS_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 0.8 } },
  },
  graffiti: {
    key: "graffiti",
    label: "Graffiti",
    description: "Graffiti spray paint and drips.",
    fragment: GRAFFITI_FRAGMENT,
    defaultUniforms: { uIntensity: { type: "float", value: 1.0 } },
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
