/**
 * @twick/canvas - Canvas Package
 * 
 * A comprehensive React-based canvas component for the Twick platform.
 * Provides advanced canvas manipulation capabilities with support for multiple
 * element types, frame effects, and real-time canvas operations.
 * 
 * @example
 * ```jsx
 * import { 
 *   useTwickCanvas, 
 *   addImageElement, 
 *   addTextElement,
 *   CANVAS_OPERATIONS 
 * } from '@twick/canvas';
 * 
 * function MyCanvas() {
 *   const { canvasRef, addElement } = useTwickCanvas({
 *     width: 1920,
 *     height: 1080
 *   });
 * 
 *   const handleAddImage = () => {
 *     addImageElement({
 *       src: "image.jpg",
 *       x: 100,
 *       y: 100
 *     });
 *   };
 * 
 *   return (
 *     <canvas ref={canvasRef} />
 *   );
 * }
 * ```
 */

// Types
export type {
  CanvasProps,
  CanvasMetadata,
  FrameEffect,
  CanvasElement,
  CanvasElementProps,
  CaptionProps,
} from "./types";

// Constants
export { CANVAS_OPERATIONS } from "./helpers/constants";

// Utility functions
export {
  createCanvas,
  reorderElementsByZIndex,
  getCurrentFrameEffect,
  convertToCanvasPosition,
  convertToVideoPosition,
} from "./helpers/canvas.util";

// Component functions
export {
  addImageElement,
  addVideoElement,
  addRectElement,
  addTextElement,
  addCaptionElement,
  addBackgroundColor,
} from "./components/elements";
export { disabledControl, rotateControl } from "./components/element-controls";

// Hooks
export { useTwickCanvas } from "./hooks/use-twick-canvas";
