import {
  linear,
  easeInSine,
  easeOutSine,
  easeInOutSine,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint,
  easeInExpo,
  easeOutExpo,
  easeInOutExpo,
  easeInCirc,
  easeOutCirc,
  easeInOutCirc,
  easeInBack,
  easeOutBack,
  easeInOutBack,
  easeInElastic,
  easeOutElastic,
  easeInOutElastic,
  easeInBounce,
  easeOutBounce,
  easeInOutBounce,
} from "@revideo/core";

/**
 * Timing utilities for the visualizer package.
 * Provides functions for handling timing and animation calculations.
 */

/**
 * Gets the timing function based on the provided name
 * @param {string} name - Name of the timing function
 * @returns {Function} The timing function
 */
export function getTimingFunction(name: string) {
  switch (name) {
    case "easeInSine":
      return easeInSine;
    case "easeOutSine":
      return easeOutSine;
    case "easeInOutSine":
      return easeInOutSine;
    case "easeInQuad":
      return easeInQuad;
    case "easeOutQuad":
      return easeOutQuad;
    case "easeInOutQuad":
      return easeInOutQuad;
    case "easeInCubic":
      return easeInCubic;
    case "easeOutCubic":
      return easeOutCubic;
    case "easeInOutCubic":
      return easeInOutCubic;
    case "easeInQuart":
      return easeInQuart;
    case "easeOutQuart":
      return easeOutQuart;
    case "easeInOutQuart":
      return easeInOutQuart;
    case "easeInQuint":
      return easeInQuint;
    case "easeOutQuint":
      return easeOutQuint;
    case "easeInOutQuint":
      return easeInOutQuint;
    case "easeInExpo":
      return easeInExpo;
    case "easeOutExpo":
      return easeOutExpo;
    case "easeInOutExpo":
      return easeInOutExpo;
    case "easeInCirc":
      return easeInCirc;
    case "easeOutCirc":
      return easeOutCirc;
    case "easeInOutCirc":
      return easeInOutCirc;
    case "easeInBack":
      return easeInBack;
    case "easeOutBack":
      return easeOutBack;
    case "easeInOutBack":
      return easeInOutBack;
    case "easeInElastic":
      return easeInElastic;
    case "easeOutElastic":
      return easeOutElastic;
    case "easeInOutElastic":
      return easeInOutElastic;
    case "easeInBounce":
      return easeInBounce;
    case "easeOutBounce":
      return easeOutBounce;
    case "easeInOutBounce":
      return easeInOutBounce;
    default:
      return linear;
  }
}

/**
 * Calculates the duration between two timestamps
 * @param {number} startTime - Start timestamp
 * @param {number} endTime - End timestamp
 * @returns {number} Duration in milliseconds
 */
export function calculateDuration(startTime: number, endTime: number) {
  // ... existing code ...
}

/**
 * Formats a timestamp into a readable time string
 * @param {number} timestamp - Timestamp to format
 * @returns {string} Formatted time string
 */
export function formatTime(timestamp: number) {
  // ... existing code ...
}
