import { useRef, useState } from "react";
import { Canvas as FabricCanvas, FabricObject, Textbox } from "fabric";
import { Dimensions } from "@twick/media-utils";
import {
  CanvasMetadata,
  CanvasProps,
  CanvasElement,
  CaptionProps,
} from "../types";
import {
  clearCanvas,
  createCanvas,
  getCanvasContext,
  getCurrentFrameEffect,
  reorderElementsByZIndex,
} from "../helpers/canvas.util";
import { CANVAS_OPERATIONS } from "../helpers/constants";
import elementController from "../controllers/element.controller";

/**
 * Custom hook to manage a Fabric.js canvas and associated operations.
 * Provides functionality for canvas initialization, element management,
 * and event handling for interactive canvas operations.
 *
 * @param onCanvasReady - Callback executed when the canvas is ready
 * @param onCanvasOperation - Callback executed on canvas operations such as item selection or updates
 * @returns Object containing canvas-related functions and state
 *
 * @example
 * ```js
 * const { twickCanvas, buildCanvas, addElementToCanvas } = useTwickCanvas({
 *   onCanvasReady: (canvas) => console.log('Canvas ready:', canvas),
 *   onCanvasOperation: (operation, data) => console.log('Operation:', operation, data)
 * });
 * ```
 */
export const useTwickCanvas = ({
  onCanvasReady,
  onCanvasOperation,
  /**
   * When true, holding Shift while dragging an object will lock movement to
   * the dominant axis (horizontal or vertical). This mirrors behavior in
   * professional editors and improves precise alignment.
   *
   * Default: false (opt‑in to avoid surprising existing consumers).
   */
  enableShiftAxisLock = false,
}: {
  onCanvasReady?: (canvas: FabricCanvas) => void;
  onCanvasOperation?: (operation: string, data: any) => void;
  enableShiftAxisLock?: boolean;
}) => {
  const [twickCanvas, setTwickCanvas] = useState<FabricCanvas | null>(null); // Canvas instance
  const elementMap = useRef<Record<string, any>>({}); // Maps element IDs to their data
  const watermarkPropsRef = useRef<any | null>(null);
  const elementFrameMap = useRef<Record<string, any>>({}); // Maps element IDs to their frame effects
  const twickCanvasRef = useRef<FabricCanvas | null>(null);
  const videoSizeRef = useRef<Dimensions>({ width: 1, height: 1 }); // Stores the video dimensions
  const canvasResolutionRef = useRef<Dimensions>({ width: 1, height: 1 }); // Stores the canvas dimensions
  const captionPropsRef = useRef<CaptionProps | null>(null);
  const axisLockStateRef = useRef<
    | null
    | {
        /** "x" when movement is locked horizontally, "y" when locked vertically */
        axis: "x" | "y";
      }
  >(null);
  const canvasMetadataRef = useRef<CanvasMetadata>({
    width: 0,
    height: 0,
    aspectRatio: 0,
    scaleX: 1,
    scaleY: 1,
  }); // Metadata for the canvas

  /**
   * Updates canvas metadata when the video size changes.
   * Recalculates scale factors based on the new video dimensions
   * to maintain proper coordinate mapping between canvas and video.
   *
   * @param videoSize - New video dimensions
   *
   * @example
   * ```js
   * onVideoSizeChange({ width: 1920, height: 1080 });
   * ```
   */
  const onVideoSizeChange = (videoSize: Dimensions) => {
    if (videoSize) {
      videoSizeRef.current = videoSize;
      canvasMetadataRef.current.scaleX =
        canvasMetadataRef.current.width / videoSize.width;
      canvasMetadataRef.current.scaleY =
        canvasMetadataRef.current.height / videoSize.height;
    }
  };

  /**
   * Handles object moving events on the canvas.
   * When Shift is held (and axis lock is enabled), restricts movement to the
   * dominant axis based on the initial drag direction.
   */
  const handleObjectMoving = (event: any) => {
    if (!enableShiftAxisLock) return;
    const target: FabricObject | undefined = event?.target;
    const transform = event?.transform;
    const pointerEvent = event?.e as MouseEvent | PointerEvent | undefined;

    if (!target || !transform || !pointerEvent) {
      axisLockStateRef.current = null;
      return;
    }

    // If Shift is not pressed, do not constrain movement.
    if (!pointerEvent.shiftKey) {
      axisLockStateRef.current = null;
      return;
    }

    const original = transform.original;
    if (!original || typeof target.left !== "number" || typeof target.top !== "number") {
      axisLockStateRef.current = null;
      return;
    }

    // Decide the dominant axis once for the drag operation.
    if (!axisLockStateRef.current) {
      const dx = Math.abs(target.left - original.left);
      const dy = Math.abs(target.top - original.top);
      axisLockStateRef.current = {
        axis: dx >= dy ? "x" : "y",
      };
    }

    if (axisLockStateRef.current.axis === "x") {
      // Lock vertical movement.
      target.top = original.top;
    } else {
      // Lock horizontal movement.
      target.left = original.left;
    }

    // Ensure the canvas reflects the updated coordinates.
    target.canvas?.requestRenderAll();
  };

  /**
   * Initializes the Fabric.js canvas with the provided configuration.
   * Creates a new canvas instance with the specified properties and sets up
   * event listeners for interactive operations.
   *
   * @param props - Canvas configuration properties including size, colors, and behavior settings
   *
   * @example
   * ```js
   * buildCanvas({
   *   videoSize: { width: 1920, height: 1080 },
   *   canvasSize: { width: 800, height: 600 },
   *   canvasRef: canvasElement,
   *   backgroundColor: "#000000",
   *   selectionBorderColor: "#2563eb"
   * });
   * ```
   */
  const buildCanvas = ({
    videoSize,
    canvasSize,
    canvasRef,
    backgroundColor = "#000000",
    selectionBorderColor = "#2563eb",
    selectionLineWidth = 2,
    uniScaleTransform = true,
    enableRetinaScaling = true,
    touchZoomThreshold = 10,
    forceBuild = false,
  }: CanvasProps & { forceBuild?: boolean }) => {
    if (!canvasRef) return;

    if (
      !forceBuild &&
      canvasResolutionRef.current.width === canvasSize.width &&
      canvasResolutionRef.current.height === canvasSize.height
    ) {
      return;
    }

    if (twickCanvasRef.current) {
      twickCanvasRef.current.off("mouse:up", handleMouseUp);
      twickCanvasRef.current.off("text:editing:exited", onTextEdit);
      twickCanvasRef.current.off("object:moving", handleObjectMoving);
      twickCanvasRef.current.dispose();
    }

    // Create a new canvas and update metadata
    const { canvas, canvasMetadata } = createCanvas({
      videoSize,
      canvasSize,
      canvasRef,
      backgroundColor,
      selectionBorderColor,
      selectionLineWidth,
      uniScaleTransform,
      enableRetinaScaling,
      touchZoomThreshold,
    });
    canvasMetadataRef.current = canvasMetadata;
    videoSizeRef.current = videoSize;
    // Attach event listeners
    canvas?.on("mouse:up", handleMouseUp);
    canvas?.on("text:editing:exited", onTextEdit);
    canvas?.on("object:moving", handleObjectMoving);
    canvasResolutionRef.current = canvasSize;
    setTwickCanvas(canvas);
    twickCanvasRef.current = canvas;
    // Notify when canvas is ready
    if (onCanvasReady) {
      onCanvasReady(canvas);
    }
  };

  const onTextEdit = (event: any) => {
    if (event.target) {
      const object: FabricObject = event.target;
      const elementId = object.get("id");
      elementMap.current[elementId] = {
        ...elementMap.current[elementId],
        props: {
          ...elementMap.current[elementId].props,
          text:
            (object as Textbox).text ??
            elementMap.current[elementId].props.text,
        },
      };
      onCanvasOperation?.(
        CANVAS_OPERATIONS.ITEM_UPDATED,
        elementMap.current[elementId]
      );
    }
  };

  /**
   * Handles mouse up events on the canvas.
   * Processes user interactions like dragging, scaling, and rotating elements,
   * updating element properties and triggering appropriate callbacks.
   *
   * @param event - Mouse event object containing interaction details
   */
  const handleMouseUp = (event: any) => {
    if (event.target) {
      const object: FabricObject = event.target;
      const elementId = object.get("id");
      if (event.transform?.action === "drag") {
        const original = event.transform.original;
        if (object.left === original.left && object.top === original.top) {
          onCanvasOperation?.(
            CANVAS_OPERATIONS.ITEM_SELECTED,
            elementMap.current[elementId]
          );
          return;
        }
      }
      switch (event.transform?.action) {
        case "drag":
        case "scale":
        case "scaleX":
        case "scaleY":
        case "rotate": {
          const currentElement = elementMap.current[elementId];
          const handler = elementController.get(
            elementId === "e-watermark" ? "watermark" : currentElement?.type
          );
          const result = handler?.updateFromFabricObject?.(object, currentElement ?? { id: elementId, type: "text", props: {} } as CanvasElement, {
            canvasMetadata: canvasMetadataRef.current,
            videoSize: videoSizeRef.current,
            elementFrameMapRef: elementFrameMap,
            captionPropsRef,
            watermarkPropsRef,
          });
          if (result) {
            elementMap.current[elementId] = result.element;
            onCanvasOperation?.(
              result.operation ?? CANVAS_OPERATIONS.ITEM_UPDATED,
              result.payload ?? result.element
            );
          }
          break;
        }
      }
    }
  };

  /**
   * Sets elements to the canvas.
   * Adds multiple elements to the canvas with optional cleanup and ordering.
   * Supports batch operations for efficient element management.
   *
   * @param options - Object containing elements, seek time, and additional options
   *
   * @example
   * ```js
   * await setCanvasElements({
   *   elements: [element1, element2, element3],
   *   seekTime: 5.0,
   *   cleanAndAdd: true
   * });
   * ```
   */
  const setCanvasElements = async ({
    elements,
    watermark,
    seekTime = 0,
    captionProps,
    cleanAndAdd = false,
  }: {
    elements: CanvasElement[];
    watermark?: CanvasElement;
    seekTime?: number;
    captionProps?: any;
    cleanAndAdd?: boolean;
  }) => {
    if (!twickCanvas || !getCanvasContext(twickCanvas)) return;

    try {
      if (cleanAndAdd && getCanvasContext(twickCanvas)) {
        // Store background color before clearing
        const backgroundColor = twickCanvas.backgroundColor;

        // Clear canvas before adding new elements
        clearCanvas(twickCanvas);

        // Restore background color
        if (backgroundColor) {
          twickCanvas.backgroundColor = backgroundColor;
          twickCanvas.renderAll();
        }
      }

      captionPropsRef.current = captionProps;
      await Promise.all(
        elements.map(async (element, index) => {
          try {
            if (!element) return;
            await addElementToCanvas({
              element,
              index,
              reorder: false,
              seekTime,
              captionProps,
            });
          } catch {
            // Skip element on add error
          }
        })
      );
      if (watermark) {
        addWatermarkToCanvas({
          element: watermark,
        });
      }
      reorderElementsByZIndex(twickCanvas);
    } catch {
      // Skip on error
    }
  };

  /**
   * Add element to the canvas.
   * Adds a single element to the canvas based on its type and properties.
   * Handles different element types (video, image, text, etc.) with appropriate rendering.
   *
   * @param options - Object containing element data, index, and rendering options
   *
   * @example
   * ```js
   * await addElementToCanvas({
   *   element: videoElement,
   *   index: 0,
   *   reorder: true,
   *   seekTime: 2.5
   * });
   * ```
   */
  const addElementToCanvas = async ({
    element,
    index,
    reorder = true,
    seekTime,
    captionProps,
  }: {
    element: CanvasElement;
    index: number;
    reorder: boolean;
    seekTime?: number;
    captionProps?: any;
  }) => {
    if (!twickCanvas) return;
    const handler = elementController.get(element.type);
    if (handler) {
      await handler.add({
        element,
        index,
        canvas: twickCanvas,
        canvasMetadata: canvasMetadataRef.current,
        seekTime,
        captionProps: captionProps ?? null,
        elementFrameMapRef: elementFrameMap,
        getCurrentFrameEffect,
      });
    }
    elementMap.current[element.id] = element;
    if (reorder) {
      reorderElementsByZIndex(twickCanvas);
    }
  };

  const addWatermarkToCanvas = ({
    element,
  }: {
    element: CanvasElement;
  }) => {
    if (!twickCanvas) return;
    const handler = elementController.get("watermark");
    if (handler) {
      handler.add({
        element,
        index: Object.keys(elementMap.current).length,
        canvas: twickCanvas,
        canvasMetadata: canvasMetadataRef.current,
        watermarkPropsRef,
      });
      elementMap.current[element.id] = element;
    }
  };

  return {
    twickCanvas,
    buildCanvas,
    onVideoSizeChange,
    addWatermarkToCanvas,
    addElementToCanvas,
    setCanvasElements,
  };
};
