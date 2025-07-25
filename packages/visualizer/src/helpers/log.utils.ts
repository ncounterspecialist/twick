import { format } from "date-fns";

const getCurrentTime = (dateFormat = "mm:ss:SSS") => {
  const now = new Date();
  return format(now, dateFormat);
};

/**
 * Logging utilities for the visualizer package.
 * Provides consistent logging functionality across the application.
 */

/**
 * Logs a message to the console with a visualizer prefix
 * @param {string} message - The message to log
 * @param {any} [data] - Optional data to log
 */
export function logger(message: string, data?: any) {
  console.log(`[Visualizer] ${message}`, data ? data : "");
}

/**
 * Logs an error to the console with a visualizer prefix
 * @param {string} message - The error message to log
 * @param {Error} [error] - Optional error object
 */
export function errorLogger(message: string, error?: Error) {
  console.error(`[Visualizer Error] ${message}`, error ? error : "");
}
