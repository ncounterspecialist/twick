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
  console.log("objects", objects);
  // Sort objects by zIndex and re-add to the canvas in order
  objects.sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

  canvas.clear();
  canvas.backgroundColor = backgroundColor;

  objects.forEach((obj) => canvas.add(obj));
  canvas.renderAll();
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
