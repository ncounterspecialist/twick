import { Reference } from "@revideo/core";
import { ObjectFit, SizeVector } from "./types";
import { OBJECT_FIT } from "./constants";

/**
 * Element utilities for the visualizer package.
 * Provides functions for handling element positioning, sizing, and transformations.
 */

/**
 * Fits an element within specified bounds while maintaining aspect ratio
 * @param {Object} params - Parameters for fitting the element
 * @param {Object} params.containerSize - The container size
 * @param {Object} params.elementSize - The element size
 * @param {Object} params.elementRef - The element reference
 * @param {string} [params.objectFit] - The fit mode (contain, cover, fill)
 * @returns {Object} Updated element dimensions
 */
export function* fitElement({ 
    containerSize, 
    elementSize, 
    elementRef, 
    objectFit 
  }: { 
    containerSize: SizeVector; 
    elementSize: SizeVector; 
    elementRef: Reference<any>; 
    objectFit?: ObjectFit;
  }) {
      const containerAspectRatio = containerSize.x / containerSize.y;
      const elementAspectRatio = elementSize.x / elementSize.y;
      switch (objectFit) {
        case OBJECT_FIT.CONTAIN:
          if (elementAspectRatio > containerAspectRatio) {
            yield elementRef().size({
              x: containerSize.x,
              y: containerSize.x / elementAspectRatio,
            });
            yield elementRef().scale(
              containerSize.x / elementSize.x,
              (containerSize.x * elementAspectRatio) / elementSize.y
            );
          } else {
            yield elementRef().size({
              x: containerSize.y * elementAspectRatio,
              y: containerSize.y,
            });
            yield elementRef().scale(
              (containerSize.y * elementAspectRatio) / elementSize.x,
              containerSize.y / elementSize.y
            );
          }
          break;
        case OBJECT_FIT.COVER:
          if (elementAspectRatio > containerAspectRatio) {
            yield elementRef().size({
              x: containerSize.y * elementAspectRatio,
              y: containerSize.y,
            });
            yield elementRef().scale(
              (containerSize.y * elementAspectRatio) / elementSize.x,
              containerSize.y / elementSize.y
            );
          } else {
            yield elementRef().size({
              x: containerSize.x,
              y: containerSize.x / elementAspectRatio,
            });
            yield elementRef().scale(
              containerSize.x / elementSize.x,
              (containerSize.x * elementAspectRatio) / elementSize.y
            );
          }
          break;
        case OBJECT_FIT.FILL:
          yield elementRef().size(containerSize);
          yield elementRef().scale(
            containerSize.x / elementSize.x,
            containerSize.x / elementSize.y
          );
          break;
        default:
          break;
      }
    }

/**
 * Calculates the center position of an element
 * @param {Object} element - The element to calculate center for
 * @returns {Object} Center position coordinates
 */
export function getElementCenter(element) {
  // ... existing code ...
}

/**
 * Applies a transformation to an element
 * @param {Object} params - Parameters for the transformation
 * @param {Object} params.element - The element to transform
 * @param {Object} params.transform - The transformation to apply
 * @returns {void}
 */
export function applyTransform({ element, transform }) {
  // ... existing code ...
}