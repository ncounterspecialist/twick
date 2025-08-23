import { Dimensions } from "./types";

/**
 * Calculates the scaled dimensions of an element to fit inside a container
 * based on the specified max dimensions while maintaining aspect ratio.
 * Ensures the resulting dimensions are even numbers and fit within the specified bounds.
 * If the original dimensions are already smaller than the max values, returns the original dimensions.
 *
 * @param width - The original width of the element in pixels
 * @param height - The original height of the element in pixels
 * @param maxWidth - The maximum allowed width of the container in pixels
 * @param maxHeight - The maximum allowed height of the container in pixels
 * @returns Object containing the calculated width and height
 * 
 * @example
 * ```js
 * // Scale down a large image to fit in a smaller container
 * const scaled = getScaledDimensions(1920, 1080, 800, 600);
 * // scaled = { width: 800, height: 450 }
 * 
 * // Small image that doesn't need scaling
 * const scaled = getScaledDimensions(400, 300, 800, 600);
 * // scaled = { width: 400, height: 300 }
 * 
 * // Ensure even dimensions for video encoding
 * const scaled = getScaledDimensions(1001, 1001, 1000, 1000);
 * // scaled = { width: 1000, height: 1000 }
 * ```
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
 * Implements CSS object-fit behavior for programmatic dimension calculations.
 * Useful for responsive design and media scaling applications.
 *
 * @param objectFit - The object-fit behavior
 * @param elementSize - The original size of the element
 * @param containerSize - The size of the container
 * @returns Object containing the calculated width and height
 * 
 * @example
 * ```js
 * // Contain: fit entire element inside container
 * const contained = getObjectFitSize("contain", {width: 1000, height: 500}, {width: 400, height: 300});
 * // contained = { width: 400, height: 200 }
 * 
 * // Cover: fill container while maintaining aspect ratio
 * const covered = getObjectFitSize("cover", {width: 1000, height: 500}, {width: 400, height: 300});
 * // covered = { width: 600, height: 300 }
 * 
 * // Fill: stretch to completely fill container
 * const filled = getObjectFitSize("fill", {width: 1000, height: 500}, {width: 400, height: 300});
 * // filled = { width: 400, height: 300 }
 * ```
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

  