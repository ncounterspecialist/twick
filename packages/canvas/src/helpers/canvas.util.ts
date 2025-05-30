import {
  Canvas as FabricCanvas,
} from "fabric";
import { CanvasMetadata, CanvasProps } from "../types";
import { Dimensions, Position } from "@twick/media-utils";
import { assertBrowser, assertCanvasSupport } from "./browser";

/**
 * Creates and initializes a Fabric.js canvas with specified configurations.
 *
 * @param videoSize - The dimensions of the video.
 * @param canvasSize - The dimensions of the canvas.
 * @param canvasContainer - The HTML container for the canvas.
 * @param backgroundColor - Background color of the canvas (default: black).
 * @param selectionBorderColor - Border color for selected objects (default: blue).
 * @param selectionLineWidth - Width of the selection border (default: 2).
 * @param uniScaleTransform - Ensures uniform scaling of objects (default: true).
 * @param enableRetinaScaling - Enables retina scaling for higher DPI (default: true).
 * @param touchZoomThreshold - Threshold for touch zoom interactions (default: 10).
 * @returns An object containing the initialized canvas and its metadata.
 */
export function createCanvas({
  videoSize,
  canvasSize,
  canvasRef,
  backgroundColor = "#000000",
  selectionBorderColor = "#2563eb",
  selectionLineWidth = 2,
  uniScaleTransform = true,
  enableRetinaScaling = true,
  touchZoomThreshold = 10,
}: CanvasProps): { canvas: FabricCanvas; canvasMetadata: CanvasMetadata } {
  assertBrowser();
  assertCanvasSupport();

  // Metadata for scaling and positioning on the canvas
  const canvasMetadata = {
    width: canvasSize.width,
    height: canvasSize.height,
    aspectRatio: canvasSize.width / canvasSize.height,
    scaleX: canvasSize.width / videoSize.width,
    scaleY: canvasSize.height / videoSize.height,
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
}

/**
 * Reorders elements on the canvas based on their zIndex property.
 *
 * @param canvas - The Fabric.js canvas instance.
 */
export function reorderElementsByZIndex(canvas: FabricCanvas) {
  if (!canvas) return;
  let backgroundColor = canvas.backgroundColor;

  const objects = canvas.getObjects();
  // Sort objects by zIndex and re-add to the canvas in order
  objects.sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

  canvas.clear();
  canvas.backgroundColor = backgroundColor;

  objects.forEach((obj) => canvas.add(obj));
  canvas.renderAll();
}

/**
 * Clears all elements from the canvas and re-renders it.
 *
 * @param canvas - The Fabric.js canvas instance.
 */
export function clearCanvas(canvas: FabricCanvas) {
  if (!canvas) return;
  canvas.clear();
  canvas.renderAll();
}

/**
 * Converts a position from the video coordinate space to the canvas coordinate space.
 *
 * @param x - X-coordinate in video space.
 * @param y - Y-coordinate in video space.
 * @param canvasMetadata - Metadata containing canvas scaling and dimensions.
 * @returns The corresponding position in canvas space.
 */
export function convertToCanvasPosition(
  x: number,
  y: number,
  canvasMetadata: CanvasMetadata
): Position {
  return {
    x: x * canvasMetadata.scaleX + canvasMetadata.width / 2,
    y: y * canvasMetadata.scaleY + canvasMetadata.height / 2,
  };
}

/**
 * Converts a position from the canvas coordinate space to the video coordinate space.
 *
 * @param x - X-coordinate in canvas space.
 * @param y - Y-coordinate in canvas space.
 * @param canvasMetadata - Metadata containing canvas scaling and dimensions.
 * @param videoSize - Dimensions of the video.
 * @returns The corresponding position in video space.
 */
export function convertToVideoPosition(
  x: number,
  y: number,
  canvasMetadata: CanvasMetadata,
  videoSize: Dimensions
): Position {
  return {
    x: x / canvasMetadata.scaleX - videoSize.width / 2,
    y: y / canvasMetadata.scaleY - videoSize.height / 2,
  };
}

/**
 * Retrieves the current frame effect for a given seek time.
 *
 * @param item - The item containing frame effects.
 * @param seekTime - The current time to match against frame effects.
 * @returns The current frame effect active at the given seek time, if any.
 */
export function getCurrentFrameEffect(item: any, seekTime: number) {
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
}
