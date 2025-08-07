export const dispatchWindowEvent = (eventName: string, detail: any) => {
  if (typeof window !== "undefined") {
    const event = new CustomEvent(eventName, detail as any);
    return window.dispatchEvent(event);
  }
};