/**
 * Dispatches a custom event to the window object.
 * Creates and dispatches a CustomEvent with the specified name and detail
 * if running in a browser environment.
 *
 * @param eventName - The name of the custom event to dispatch
 * @param detail - The event detail object to include with the event
 * @returns True if the event was dispatched successfully, false otherwise
 * 
 * @example
 * ```js
 * dispatchWindowEvent("playerUpdate", { status: "ready", playerId: "123" });
 * // Dispatches a custom event with player update information
 * ```
 */
export const dispatchWindowEvent = (eventName: string, detail: any) => {
  if (typeof window !== "undefined") {
    const event = new CustomEvent(eventName, detail as any);
    return window.dispatchEvent(event);
  }
};