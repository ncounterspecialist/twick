import {
  Canvas2dFilterBackend,
  FabricImage,
  filters,
  setFilterBackend,
  type TMatColorMatrix,
} from "fabric";
import { COLOR_FILTERS } from "@twick/media-utils";

const {
  Blur,
  Brightness,
  ColorMatrix,
  Contrast,
  Grayscale,
  HueRotation,
  Invert,
  Saturation,
  Sepia,
} = filters;

/**
 * Fabric’s WebGL filter pipeline often draws empty textures for mixed sources; 2D is slower but reliable.
 */
let canvas2dFilterBackendInstalled = false;

function ensureCanvas2dImageFilterBackend(): void {
  if (canvas2dFilterBackendInstalled) return;
  canvas2dFilterBackendInstalled = true;
  setFilterBackend(new Canvas2dFilterBackend());
}

function getSourceBitmapSize(img: FabricImage): { w: number; h: number } | null {
  const el = img.getElement() as HTMLImageElement | HTMLCanvasElement | undefined;
  if (!el) return null;
  const w =
    "naturalWidth" in el && el.naturalWidth > 0 ? el.naturalWidth : el.width;
  const h =
    "naturalHeight" in el && el.naturalHeight > 0
      ? el.naturalHeight
      : el.height;
  if (!w || !h) return null;
  return { w, h };
}

function applyFiltersSafe(img: FabricImage): void {
  ensureCanvas2dImageFilterBackend();
  img.applyFilters();
}

type MediaFabricFilter = NonNullable<FabricImage["filters"]>[number];

/** Twick visualizer uses multiplicative brightness/contrast/saturation; map to Fabric -1..1 ranges. */
const bright = (m: number) =>
  Math.min(1, Math.max(-1, (m - 1) * 0.48));
const contr = (m: number) =>
  Math.min(1, Math.max(-1, (m - 1) * 0.55));
const sat = (m: number) =>
  Math.min(1, Math.max(-1, (m - 1) * 0.72));

const IDENTITY: TMatColorMatrix = [
  1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
];

const SEPIA_MATRIX: TMatColorMatrix = [
  0.393, 0.769, 0.189, 0, 0, 0.349, 0.686, 0.168, 0, 0, 0.272, 0.534,
  0.131, 0, 0, 0, 0, 0, 1, 0,
];

function sepiaMix(strength: number) {
  const t = Math.min(1, Math.max(0, strength));
  const m = IDENTITY.map((v, i) => v + (SEPIA_MATRIX[i] - v) * t) as TMatColorMatrix;
  return new ColorMatrix({ matrix: m, colorsOnly: true });
}

/** Blur amount in Twick 2D vs Fabric (0–1, fraction of image size). */
const twickBlurToFabric = (v: number) => Math.min(0.22, Math.max(0, v * 0.045));

function buildFilters(
  filterType: string
): { filters: MediaFabricFilter[]; opacityFactor: number } {
  switch (filterType) {
    case COLOR_FILTERS.SATURATED:
      return {
        filters: [
          new Saturation({ saturation: sat(1.4) }),
          new Contrast({ contrast: contr(1.1) }),
        ],
        opacityFactor: 1,
      };
    case COLOR_FILTERS.BRIGHT:
      return {
        filters: [
          new Brightness({ brightness: bright(1.3) }),
          new Contrast({ contrast: contr(1.05) }),
        ],
        opacityFactor: 1,
      };
    case COLOR_FILTERS.VIBRANT:
      return {
        filters: [
          new Saturation({ saturation: sat(1.6) }),
          new Brightness({ brightness: bright(1.15) }),
          new Contrast({ contrast: contr(1.1) }),
        ],
        opacityFactor: 1,
      };
    case COLOR_FILTERS.RETRO:
      return {
        filters: [
          sepiaMix(0.8),
          new Contrast({ contrast: contr(1.3) }),
          new Brightness({ brightness: bright(0.85) }),
          new Saturation({ saturation: sat(0.8) }),
        ],
        opacityFactor: 1,
      };
    case COLOR_FILTERS.BLACK_WHITE:
      return {
        filters: [
          new Grayscale(),
          new Contrast({ contrast: contr(1.25) }),
          new Brightness({ brightness: bright(1.05) }),
        ],
        opacityFactor: 1,
      };
    case COLOR_FILTERS.SEPIA:
      return {
        filters: [
          new Sepia(),
          new Contrast({ contrast: contr(1.08) }),
        ],
        opacityFactor: 1,
      };
    case COLOR_FILTERS.COOL:
      return {
        filters: [
          new HueRotation({ rotation: 15 / 180 }),
          new Brightness({ brightness: bright(1.1) }),
          new Saturation({ saturation: sat(1.3) }),
          new Contrast({ contrast: contr(1.05) }),
        ],
        opacityFactor: 1,
      };
    case COLOR_FILTERS.WARM:
      return {
        filters: [
          new HueRotation({ rotation: -15 / 180 }),
          new Brightness({ brightness: bright(1.15) }),
          new Saturation({ saturation: sat(1.3) }),
          new Contrast({ contrast: contr(1.05) }),
        ],
        opacityFactor: 1,
      };
    case COLOR_FILTERS.CINEMATIC:
      return {
        filters: [
          new Contrast({ contrast: contr(1.4) }),
          new Brightness({ brightness: bright(0.95) }),
          new Saturation({ saturation: sat(0.85) }),
          sepiaMix(0.2),
        ],
        opacityFactor: 1,
      };
    case COLOR_FILTERS.SOFT_GLOW:
      return {
        filters: [
          new Brightness({ brightness: bright(1.2) }),
          new Contrast({ contrast: contr(0.95) }),
          new Blur({ blur: twickBlurToFabric(1.2) }),
          new Saturation({ saturation: sat(1.1) }),
        ],
        opacityFactor: 1,
      };
    case COLOR_FILTERS.MOODY:
      return {
        filters: [
          new Brightness({ brightness: bright(1.05) }),
          new Contrast({ contrast: contr(1.4) }),
          new Saturation({ saturation: sat(0.65) }),
          sepiaMix(0.2),
        ],
        opacityFactor: 1,
      };
    case COLOR_FILTERS.DREAMY:
      return {
        filters: [
          new Brightness({ brightness: bright(1.3) }),
          new Blur({ blur: twickBlurToFabric(2) }),
          new Saturation({ saturation: sat(1.4) }),
          new Contrast({ contrast: contr(0.95) }),
        ],
        opacityFactor: 1,
      };
    case COLOR_FILTERS.INVERTED:
      return {
        filters: [
          new Invert({ invert: true, alpha: false }),
          new HueRotation({ rotation: 1 }),
        ],
        opacityFactor: 1,
      };
    case COLOR_FILTERS.VINTAGE:
      return {
        filters: [
          sepiaMix(0.4),
          new Saturation({ saturation: sat(1.4) }),
          new Contrast({ contrast: contr(1.2) }),
          new Brightness({ brightness: bright(1.1) }),
        ],
        opacityFactor: 1,
      };
    case COLOR_FILTERS.DRAMATIC:
      return {
        filters: [
          new Contrast({ contrast: contr(1.5) }),
          new Brightness({ brightness: bright(0.9) }),
          new Saturation({ saturation: sat(1.2) }),
        ],
        opacityFactor: 1,
      };
    case COLOR_FILTERS.FADED:
      return {
        filters: [
          new Brightness({ brightness: bright(1.2) }),
          new Saturation({ saturation: sat(0.8) }),
          new Contrast({ contrast: contr(0.9) }),
        ],
        opacityFactor: 0.9,
      };
    default:
      return { filters: [], opacityFactor: 1 };
  }
}

/**
 * Applies the same media color presets as `@twick/visualizer` `applyColorFilter` to a Fabric image
 * (thumbnail still for video). Sets `filters`, combined opacity, and runs `applyFilters()`.
 */
export function applyFabricMediaColorFilters(
  img: FabricImage,
  mediaFilter: string | undefined,
  elementOpacity: number
): void {
  const key = mediaFilter?.trim() || "none";
  if (!key || key === "none") {
    img.filters = [];
    img.set("opacity", elementOpacity);
    applyFiltersSafe(img);
    return;
  }
  const { filters: filterList, opacityFactor } = buildFilters(key);
  if (filterList.length === 0) {
    img.filters = [];
    img.set("opacity", elementOpacity);
    applyFiltersSafe(img);
    return;
  }
  if (!getSourceBitmapSize(img)) {
    img.filters = [];
    img.set("opacity", elementOpacity);
    return;
  }
  img.filters = filterList;
  img.set("opacity", elementOpacity * opacityFactor);
  try {
    applyFiltersSafe(img);
  } catch {
    img.filters = [];
    img.set("opacity", elementOpacity);
    try {
      applyFiltersSafe(img);
    } catch {
      // leave unfiltered; image should still render from _originalElement
    }
  }
}
