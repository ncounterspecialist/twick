import { Canvas as FabricCanvas } from "fabric";
import { CanvasMetadata, CanvasProps } from "../types";
import { Dimensions, Position } from "@twick/media-utils";
import { assertBrowser, assertCanvasSupport } from "./browser";

/**
 * Creates and initializes a Fabric.js canvas with specified configurations.
 * Sets up a canvas with proper scaling, background, and interaction settings
 * based on the provided video and canvas dimensions.
 *
 * @param videoSize - The dimensions of the video
 * @param canvasSize - The dimensions of the canvas
 * @param canvasContainer - The HTML container for the canvas
 * @param backgroundColor - Background color of the canvas
 * @param selectionBorderColor - Border color for selected objects
 * @param selectionLineWidth - Width of the selection border
 * @param uniScaleTransform - Ensures uniform scaling of objects
 * @param enableRetinaScaling - Enables retina scaling for higher DPI
 * @param touchZoomThreshold - Threshold for touch zoom interactions
 * @returns Object containing the initialized canvas and its metadata
 *
 * @example
 * ```js
 * const { canvas, canvasMetadata } = createCanvas({
 *   videoSize: { width: 1920, height: 1080 },
 *   canvasSize: { width: 800, height: 600 },
 *   canvasRef: canvasElement,
 *   backgroundColor: "#000000",
 *   selectionBorderColor: "#2563eb"
 * });
 * ```
 */
export const createCanvas = ({
  videoSize,
  canvasSize,
  canvasRef,
  backgroundColor = "#000000",
  selectionBorderColor = "#2563eb",
  selectionLineWidth = 2,
  uniScaleTransform = true,
  enableRetinaScaling = true,
  touchZoomThreshold = 10,
}: CanvasProps): { canvas: FabricCanvas; canvasMetadata: CanvasMetadata } => {
  assertBrowser();
  assertCanvasSupport();

  // Metadata for scaling and positioning on the canvas
  const canvasMetadata = {
    width: canvasSize.width,
    height: canvasSize.height,
    aspectRatio: canvasSize.width / canvasSize.height,
    scaleX: Number((canvasSize.width / videoSize.width).toFixed(2)) ,
    scaleY: Number((canvasSize.height / videoSize.height).toFixed(2)),
  };

  // Create and configure the Fabric.js canvas
  const canvas = new FabricCanvas(canvasRef, {
    backgroundColor,
    width: canvasSize.width,
    height: canvasSize.height,
    preserveObjectStacking: true,
    enableRetinaScaling,
    selectionBorderColor,
    selectionLineWidth,
    uniScaleTransform,
    touchZoomThreshold,
    renderOnAddRemove: false,
    stateful: false,
    selection: true,
    skipTargetFind: false,
    controlsAboveOverlay: true,
  });

  // Set dimensions and render canvas
  if (canvasRef) {
    canvas.setDimensions({
      width: canvasMetadata.width,
      height: canvasMetadata.height,
    });
    canvas.renderAll();
  }

  return {
    canvas,
    canvasMetadata,
  };
};

/**
 * Measure the width of text using Canvas 2D measureText with the given font.
 * For multi-line text (with \n), returns the width of the longest line.
 * Used to size Textbox to content when no explicit width is provided.
 *
 * @param text - The text to measure
 * @param options - Font options matching the text element (fontSize, fontFamily, etc.)
 * @returns The width in pixels of the longest line
 */
export function measureTextWidth(
  text: string,
  options: {
    fontSize: number;
    fontFamily: string;
    fontStyle?: string;
    fontWeight?: string | number;
  }
): number {
  if (typeof document === "undefined" || !text) return 0;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return 0;

  const {
    fontSize,
    fontFamily,
    fontStyle = "normal",
    fontWeight = "normal",
  } = options;
  ctx.font = `${fontStyle} ${String(fontWeight)} ${fontSize}px ${fontFamily}`;

  const lines = text.split("\n");
  let maxWidth = 0;
  for (const line of lines) {
    const { width } = ctx.measureText(line);
    if (width > maxWidth) maxWidth = width;
  }
  return Math.ceil(maxWidth);
}

/**
 * Reorders elements on the canvas based on their zIndex property.
 * Sorts all canvas objects by their zIndex and re-adds them to maintain
 * proper layering order for visual elements.
 *
 * @param canvas - The Fabric.js canvas instance
 *
 * @example
 * ```js
 * reorderElementsByZIndex(canvas);
 * // Elements are now properly layered based on zIndex
 * ```
 */
export const reorderElementsByZIndex = (canvas: FabricCanvas) => {
  if (!canvas) return;
  const backgroundColor = canvas.backgroundColor;

  const objects = canvas.getObjects();
  // Sort objects by zIndex and re-add to the canvas in order
  objects.sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

  canvas.clear();
  canvas.backgroundColor = backgroundColor;

  objects.forEach((obj) => canvas.add(obj));
  canvas.renderAll();
};

/**
 * Finds a Fabric object on the canvas by its element id (stored as custom "id" on the object).
 */
export const getCanvasObjectById = (
  canvas: FabricCanvas | null | undefined,
  elementId: string
): import("fabric").FabricObject | undefined => {
  if (!canvas) return undefined;
  const objects = canvas.getObjects();
  return objects.find((obj) => (obj as any).get?.("id") === elementId);
};

export type ZOrderDirection = "front" | "back" | "forward" | "backward";

/**
 * Changes the z-order of the object with the given element id and reorders the canvas.
 * Returns the new zIndex for the moved object, or null if not found.
 */
export const changeZOrder = (
  canvas: FabricCanvas | null | undefined,
  elementId: string,
  direction: ZOrderDirection
): number | null => {
  if (!canvas) return null;
  const objects = canvas.getObjects();
  const sorted = [...objects].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));
  const idx = sorted.findIndex((obj) => (obj as any).get?.("id") === elementId);
  if (idx < 0) return null;

  const minZ = sorted[0]?.zIndex ?? 0;
  const maxZ = sorted[sorted.length - 1]?.zIndex ?? 0;
  const obj = sorted[idx] as any;

  if (direction === "front") {
    obj.set("zIndex", maxZ + 1);
    reorderElementsByZIndex(canvas);
    return maxZ + 1;
  }
  if (direction === "back") {
    obj.set("zIndex", minZ - 1);
    reorderElementsByZIndex(canvas);
    return minZ - 1;
  }
  if (direction === "forward" && idx < sorted.length - 1) {
    const next = sorted[idx + 1] as any;
    const myZ = obj.zIndex ?? idx;
    const nextZ = next.zIndex ?? idx + 1;
    obj.set("zIndex", nextZ);
    next.set("zIndex", myZ);
    reorderElementsByZIndex(canvas);
    return nextZ;
  }
  if (direction === "backward" && idx > 0) {
    const prev = sorted[idx - 1] as any;
    const myZ = obj.zIndex ?? idx;
    const prevZ = prev.zIndex ?? idx - 1;
    obj.set("zIndex", prevZ);
    prev.set("zIndex", myZ);
    reorderElementsByZIndex(canvas);
    return prevZ;
  }
  return obj.zIndex ?? idx;
};

/**
 * Retrieves the context of a Fabric.js canvas.
 * 
 * @param canvas - The Fabric.js canvas instance
 * @returns The context of the canvas
 */
export const getCanvasContext = (canvas: FabricCanvas | null | undefined) => {
  if (!canvas || !canvas.elements?.lower?.ctx) return;
  return canvas.elements?.lower?.ctx;
};

/**
 * Clears all elements from the canvas and re-renders it.
 * Removes all objects from the canvas while preserving the background
 * and triggers a re-render to update the display.
 *
 * @param canvas - The Fabric.js canvas instance
 *
 * @example
 * ```js
 * clearCanvas(canvas);
 * // Canvas is now empty and ready for new elements
 * ```
 */
export const clearCanvas = (canvas: FabricCanvas | null | undefined) => {
  try {
  if (!canvas || !getCanvasContext(canvas)) return;
    canvas.clear();
    canvas.renderAll();
  } catch (error) {
    console.warn("Error clearing canvas:", error);
  }
};

/**
 * Converts a position from the video coordinate space to the canvas coordinate space.
 * Applies scaling and centering transformations to map video coordinates
 * to the corresponding canvas pixel positions.
 *
 * @param x - X-coordinate in video space
 * @param y - Y-coordinate in video space
 * @param canvasMetadata - Metadata containing canvas scaling and dimensions
 * @returns Object containing the corresponding position in canvas space
 *
 * @example
 * ```js
 * const canvasPos = convertToCanvasPosition(100, 200, canvasMetadata);
 * // canvasPos = { x: 450, y: 500 }
 * ```
 */
export const convertToCanvasPosition = (
  x: number,
  y: number,
  canvasMetadata: CanvasMetadata
): Position => {
  return {
    x: x * canvasMetadata.scaleX + canvasMetadata.width / 2,
    y: y * canvasMetadata.scaleY + canvasMetadata.height / 2,
  };
};

/**
 * Converts a position from the canvas coordinate space to the video coordinate space.
 * Applies inverse scaling and centering transformations to map canvas coordinates
 * back to the corresponding video coordinate positions.
 *
 * @param x - X-coordinate in canvas space
 * @param y - Y-coordinate in canvas space
 * @param canvasMetadata - Metadata containing canvas scaling and dimensions
 * @param videoSize - Dimensions of the video
 * @returns Object containing the corresponding position in video space
 *
 * @example
 * ```js
 * const videoPos = convertToVideoPosition(450, 500, canvasMetadata, videoSize);
 * // videoPos = { x: 100, y: 200 }
 * ```
 */
export const convertToVideoPosition = (
  x: number,
  y: number,
  canvasMetadata: CanvasMetadata,
  videoSize: Dimensions
): Position => {
  return {
    x: Number((x / canvasMetadata.scaleX - videoSize.width / 2).toFixed(2)),
    y: Number((y / canvasMetadata.scaleY - videoSize.height / 2).toFixed(2)),
  };
};

/**
 * Converts dimensions from canvas (Fabric) space to video space.
 * Uses the object's actual displayed size (width*scaleX, height*scaleY) so the
 * result matches what's on canvas even after move or when element.props is stale.
 */
export const convertToVideoDimensions = (
  widthCanvas: number,
  heightCanvas: number,
  canvasMetadata: CanvasMetadata
): Dimensions => {
  return {
    width: Number((widthCanvas / canvasMetadata.scaleX).toFixed(2)),
    height: Number((heightCanvas / canvasMetadata.scaleY).toFixed(2)),
  };
};

/**
 * Retrieves the current frame effect for a given seek time.
 * Searches through the item's frame effects to find the one that is active
 * at the specified seek time based on start and end time ranges.
 *
 * @param item - The item containing frame effects
 * @param seekTime - The current time to match against frame effects
 * @returns The current frame effect active at the given seek time, or undefined if none found
 *
 * @example
 * ```js
 * const currentEffect = getCurrentFrameEffect(videoElement, 5.5);
 * // Returns the frame effect active at 5.5 seconds, if any
 * ```
 */
export const getCurrentFrameEffect = (item: any, seekTime: number) => {
  let currentFrameEffect;
  for (let i = 0; i < item?.frameEffects?.length; i++) {
    if (
      item.frameEffects[i].s <= seekTime &&
      item.frameEffects[i].e >= seekTime
    ) {
      currentFrameEffect = item.frameEffects[i];
      break;
    }
  }
  return currentFrameEffect;
};

/**
 * Converts a hex color string to rgba with the given alpha.
 * Handles both 3-digit and 6-digit hex color formats.
 *
 * @param hex - The hex color string (e.g. "#ff0000" or "#f00")
 * @param alpha - Opacity value between 0 and 1
 * @returns CSS rgba string (e.g. "rgba(255, 0, 0, 0.8)")
 */
export const hexToRgba = (hex: string, alpha: number): string => {
  const color = hex.replace(/^#/, "");
  const fullHex =
    color.length === 3
      ? color
          .split("")
          .map((c) => c + c)
          .join("")
      : color;
  if (fullHex.length !== 6) {
    return hex;
  }
  const r = parseInt(fullHex.slice(0, 2), 16);
  const g = parseInt(fullHex.slice(2, 4), 16);
  const b = parseInt(fullHex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
