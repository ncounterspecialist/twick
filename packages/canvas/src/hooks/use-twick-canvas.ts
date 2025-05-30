import { useRef, useState } from "react";
import { Canvas as FabricCanvas, FabricObject } from "fabric";
import { Dimensions } from "@twick/media-utils";
import { CanvasMetadata, CanvasProps, CanvasElement } from "../types";
import {
  clearCanvas,
  convertToVideoPosition,
  createCanvas,
  getCurrentFrameEffect,
  reorderElementsByZIndex,
} from "../helpers/canvas.util";
import { CANVAS_OPERATIONS, ELEMENT_TYPES } from "../helpers/constants";
import {
  addImageElement,
  addVideoElement,
  addRectElement,
  addTextElement,
  addCaptionElement,
  addBackgroundColor,
} from "../components/elements";
import { assertBrowser } from "../helpers/browser";

/**
 * Custom hook to manage a Fabric.js canvas and associated operations.
 *
 * @param onCanvasReady - Callback executed when the canvas is ready.
 * @param onCanvasOperation - Callback executed on canvas operations such as item selection or updates.
 * @returns Canvas-related functions and state.
 */
export const useTwickCanvas = ({
  onCanvasReady,
  onCanvasOperation,
}: {
  onCanvasReady?: (canvas: FabricCanvas) => void;
  onCanvasOperation?: (operation: string, data: any) => void;
}) => {
  const [twickCanvas, setTwickCanvas] = useState<FabricCanvas | null>(null); // Canvas instance
  const elementMap = useRef<Record<string, any>>({}); // Maps element IDs to their data
  const elementFrameMap = useRef<Record<string, any>>({}); // Maps element IDs to their frame effects

  const videoSizeRef = useRef<Dimensions>({ width: 1, height: 1 }); // Stores the video dimensions
  const canvasMetadataRef = useRef<CanvasMetadata>({
    width: 0,
    height: 0,
    aspectRatio: 0,
    scaleX: 1,
    scaleY: 1,
  }); // Metadata for the canvas

  /**
   * Updates canvas metadata when the video size changes.
   *
   * @param videoSize - New video dimensions.
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
   * Initializes the Fabric.js canvas with the provided configuration.
   *
   * @param props - Canvas configuration properties.
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
  }: CanvasProps) => {
    if (!canvasRef) return;

    assertBrowser()
    // Dispose of the old canvas if it exists
    if (twickCanvas) {
      console.log("Destroying twickCanvas");
      twickCanvas.off("mouse:up", handleMouseUp);
      twickCanvas.destroy();
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
    setTwickCanvas(canvas);

    // Notify when canvas is ready
    if (onCanvasReady) {
      onCanvasReady(canvas);
    }
  };

  /**
   * Handles mouse up events on the canvas.
   *
   * @param event - Event object.
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
        case "rotate":
          const { x, y } = convertToVideoPosition(
            object.left,
            object.top,
            canvasMetadataRef.current,
            videoSizeRef.current
          );
          if (elementMap.current[elementId].type === "caption") {
            elementMap.current[elementId] = {
              ...elementMap.current[elementId],
              props: {
                ...elementMap.current[elementId].props,
                pos: {
                  x,
                  y,
                },
              },
            };
            onCanvasOperation?.(
              CANVAS_OPERATIONS.ITEM_UPDATED,
              elementMap.current[elementId]
            );
          } else {
            if (object?.type === "group") {
              const currentFrameEffect = elementFrameMap.current[elementId];
              let updatedFrameSize;
              if (currentFrameEffect) {
                updatedFrameSize = [
                  currentFrameEffect.props.frameSize[0] * object.scaleX,
                  currentFrameEffect.props.frameSize[1] * object.scaleY,
                ];
              } else {
                updatedFrameSize = [
                  elementMap.current[elementId].frame.size[0] * object.scaleX,
                  elementMap.current[elementId].frame.size[1] * object.scaleY,
                ];
              }

              if (currentFrameEffect) {
                elementMap.current[elementId] = {
                  ...elementMap.current[elementId],
                  frameEffects: (
                    elementMap.current[elementId].frameEffects || []
                  ).map((frameEffect: any) =>
                    frameEffect.id === currentFrameEffect?.id
                      ? {
                          ...frameEffect,
                          props: {
                            ...frameEffect.props,
                            framePosition: {
                              x,
                              y,
                            },
                            frameSize: updatedFrameSize,
                          },
                        }
                      : frameEffect
                  ),
                };
                elementFrameMap.current[elementId] = {
                  ...elementFrameMap.current[elementId],
                  framePosition: {
                    x,
                    y,
                  },
                  frameSize: updatedFrameSize,
                };
              } else {
                elementMap.current[elementId] = {
                  ...elementMap.current[elementId],
                  frame: {
                    ...elementMap.current[elementId].frame,
                    rotation: object.angle,
                    size: updatedFrameSize,
                    x,
                    y,
                  },
                };
              }
            } else {
              if (object?.type === "text") {
                elementMap.current[elementId] = {
                  ...elementMap.current[elementId],
                  props: {
                    ...elementMap.current[elementId].props,
                    rotation: object.angle,
                    x,
                    y,
                  },
                };
              } else {
                elementMap.current[elementId] = {
                  ...elementMap.current[elementId],
                  props: {
                    ...elementMap.current[elementId].props,
                    rotation: object.angle,
                    width:
                      elementMap.current[elementId].props.width * object.scaleX,
                    height:
                      elementMap.current[elementId].props.height *
                      object.scaleY,
                    x,
                    y,
                  },
                };
              }
            }
            onCanvasOperation?.(
              CANVAS_OPERATIONS.ITEM_UPDATED,
              elementMap.current[elementId]
            );
          }
          break;
      }
    }
  };

  /**
   * Sets elements to the canvas.
   *
   * @param options - Object containing elements, seek time, and additional options.
   */
  const setCanvasElements = async ({
    elements,
    seekTime = 0,
    captionProps,
    cleanAndAdd = false,
  }: {
    elements: CanvasElement[];
    seekTime?: number;
    captionProps?: any;
    cleanAndAdd?: boolean;
  }) => {
    if (!twickCanvas) {
      console.warn("Canvas not initialized");
      return;
    }

    try {
      if (cleanAndAdd) {
        // Clear canvas before adding new elements
        clearCanvas(twickCanvas);
      }

      await Promise.all(
        elements.map(async (element, index) => {
          try {
            if (!element) {
              console.warn("Element not found");
              return;
            }
            await addElementToCanvas({
              element,
              index,
              reorder: false,
              seekTime,
              captionProps,
            });
          } catch (error) {
            console.error(`Error adding element ${element.id}:`, error);
          }
        })
      );
      reorderElementsByZIndex(twickCanvas);
    } catch (error) {
      console.error("Error in setCanvasElements:", error);
    }
  };

  /**
   * Add element to the canvas.
   *
   * @param options - Object containing elements, seek time, and additional options.
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
    if (!twickCanvas) {
      console.warn("Canvas not initialized");
      return;
    }
    // Add element based on type
    switch (element.type) {
      case ELEMENT_TYPES.VIDEO:
        const currentFrameEffect = getCurrentFrameEffect(element, seekTime || 0);
        elementFrameMap.current[element.id] = currentFrameEffect;
        const snapTime =
          ((seekTime || 0) - (element?.s || 0)) *
            (element?.props?.playbackRate || 1) +
          (element?.props?.time || 0);
        await addVideoElement({
          element,
          index,
          canvas: twickCanvas,
          canvasMetadata: canvasMetadataRef.current,
          currentFrameEffect,
          snapTime,
        });
        if (element.timelineType === "scene") {
          await addBackgroundColor({
            element,
            index,
            canvas: twickCanvas,
            canvasMetadata: canvasMetadataRef.current,
          });
        }
        break;
      case ELEMENT_TYPES.IMAGE:
        await addImageElement({
          element,
          index,
          canvas: twickCanvas,
          canvasMetadata: canvasMetadataRef.current,
        });
        if (element.timelineType === "scene") {
          await addBackgroundColor({
            element,
            index,
            canvas: twickCanvas,
            canvasMetadata: canvasMetadataRef.current,
          });
        }
        break;
      case ELEMENT_TYPES.RECT:
        await addRectElement({
          element,
          index,
          canvas: twickCanvas,
          canvasMetadata: canvasMetadataRef.current,
        });
        break;
      case ELEMENT_TYPES.TEXT:
        await addTextElement({
          element,
          index,
          canvas: twickCanvas,
          canvasMetadata: canvasMetadataRef.current,
        });
        break;
      case ELEMENT_TYPES.CAPTION:
        await addCaptionElement({
          element,
          index,
          canvas: twickCanvas,
          captionProps,
          canvasMetadata: canvasMetadataRef.current,
        });
        break;
      default:
        break;
    }
    elementMap.current[element.id] = element;
    if (reorder) {
      reorderElementsByZIndex(twickCanvas);
    }
  };

  return {
    twickCanvas,
    buildCanvas,
    onVideoSizeChange,
    addElementToCanvas,
    setCanvasElements,
  };
};
