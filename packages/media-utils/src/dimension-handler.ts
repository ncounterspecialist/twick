import { Dimensions } from "./types";

/**
 * Calculates the scaled dimensions of an element to fit inside a container
 * based on the specified max dimensions.
 *
 * @param width - The original width of the element.
 * @param height - The original height of the element.
 * @param maxWidth - The maximum width of the container.
 * @param maxHeight - The maximum height of the container.
 * @returns An object containing the calculated width and height for the element.
 */
export const getScaledDimensions = (
    width: number,  
    height: number,
    maxWidth: number,
    maxHeight: number
  ): Dimensions => {
    // If the original dimensions are smaller than or equal to the max values, return the original dimensions
    if (width <= maxWidth && height <= maxHeight) {
      // Ensure the width and height are even numbers
      return {
        width: width % 2 === 0 ? width : width - 1,
        height: height % 2 === 0 ? height : height - 1,
      };
    }
  
    // Calculate scaling factor based on the maximum width and height
    const widthRatio = maxWidth / width;
    const heightRatio = maxHeight / height;
  
    // Use the smaller of the two ratios to maintain the aspect ratio
    const scale = Math.min(widthRatio, heightRatio);
  
    // Calculate the scaled dimensions
    let scaledWidth = Math.round(width * scale);
    let scaledHeight = Math.round(height * scale);
  
    // Ensure the width and height are even numbers
    if (scaledWidth % 2 !== 0) {
      scaledWidth -= 1; // Make width even if it's odd
    }
    if (scaledHeight % 2 !== 0) {
      scaledHeight -= 1; // Make height even if it's odd
    }
  
    // Ensure the scaled width and height fit within the max dimensions
    return {
      width: Math.min(scaledWidth, maxWidth),
      height: Math.min(scaledHeight, maxHeight),
    };
  };

/**
 * Calculates the resized dimensions of an element to fit inside a container
 * based on the specified object-fit strategy ("contain", "cover", "fill", or default).
 *
 * @param objectFit - The object-fit behavior ('contain', 'cover', 'fill', or default/fallback).
 * @param elementSize - The original size of the element (width and height).
 * @param containerSize - The size of the container (width and height).
 * @returns An object containing the calculated width and height for the element.
 */
export const getObjectFitSize = (
  objectFit: string,
  elementSize: Dimensions,
  containerSize: Dimensions
): Dimensions => {
  const elementAspectRatio = elementSize.width / elementSize.height;
  const containerAspectRatio = containerSize.width / containerSize.height;

  switch (objectFit) {
    case "contain":
      // Fit entire element inside container without cropping, maintaining aspect ratio
      if (elementAspectRatio > containerAspectRatio) {
        return {
          width: containerSize.width,
          height: containerSize.width / elementAspectRatio,
        };
      } else {
        return {
          width: containerSize.height * elementAspectRatio,
          height: containerSize.height,
        };
      }

    case "cover":
      // Fill container while maintaining aspect ratio, possibly cropping the element
      if (elementAspectRatio > containerAspectRatio) {
        return {
          width: containerSize.height * elementAspectRatio,
          height: containerSize.height,
        };
      } else {
        return {
          width: containerSize.width,
          height: containerSize.width / elementAspectRatio,
        };
      }

    case "fill":
      // Stretch element to completely fill the container, ignoring aspect ratio
      return {
        width: containerSize.width,
        height: containerSize.height,
      };

    default:
      // Default behavior: return original size of the element
      return {
        width: elementSize.width,
        height: elementSize.height,
      };
  }
};

  