import { format } from "date-fns";

/**
 * Gets the current time formatted according to the specified format.
 * Uses date-fns to format the current timestamp.
 *
 * @param dateFormat - The date format string to use
 * @returns Formatted time string
 * 
 * @example
 * ```js
 * const time = getCurrentTime("mm:ss:SSS");
 * // time = "05:30:123"
 * ```
 */
const getCurrentTime = (dateFormat = "mm:ss:SSS") => {
  const now = new Date();
  return format(now, dateFormat);
};

/**
 * Logs a message to the console with a visualizer prefix.
 * Provides consistent logging functionality across the application
 * with standardized formatting and prefixing.
 *
 * @param message - The message to log
 * @param data - Optional data to log
 * 
 * @example
 * ```js
 * logger("Scene loaded successfully", { sceneId: "scene1" });
 * // Output: [Visualizer] Scene loaded successfully { sceneId: "scene1" }
 * ```
 */
export function logger(message: string, data?: any) {
  console.log(`[Visualizer] ${message}`, data ? data : "");
}

/**
 * Logs an error to the console with a visualizer prefix.
 * Provides consistent error logging functionality across the application
 * with standardized formatting and prefixing.
 *
 * @param message - The error message to log
 * @param error - Optional error object
 * 
 * @example
 * ```js
 * errorLogger("Failed to load scene", new Error("Network error"));
 * // Output: [Visualizer Error] Failed to load scene Error: Network error
 * ```
 */
export function errorLogger(message: string, error?: Error) {
  console.error(`[Visualizer Error] ${message}`, error ? error : "");
}
