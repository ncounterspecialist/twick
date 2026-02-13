/**
 * Creates a debounced version of a function.
 * The function will only be called after it has not been invoked
 * for the specified delay.
 *
 * Useful for expensive operations that should not run on every
 * keystroke / mouse move (e.g. resize handlers, search, etc.).
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn(...args);
    }, delay);
  };
}

/**
 * Creates a throttled version of a function.
 * The function will be called at most once in every `interval`
 * milliseconds, ignoring additional calls in between.
 *
 * Useful for high–frequency events like scroll / mousemove where
 * you still want regular updates but not on every event.
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  interval: number
): (...args: Parameters<T>) => void {
  let lastCallTime = 0;
  let trailingTimeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    const remaining = interval - (now - lastCallTime);

    if (remaining <= 0) {
      if (trailingTimeoutId !== null) {
        clearTimeout(trailingTimeoutId);
        trailingTimeoutId = null;
      }
      lastCallTime = now;
      fn(...args);
    } else {
      // Save the latest args and schedule a trailing call
      lastArgs = args;
      if (trailingTimeoutId === null) {
        trailingTimeoutId = setTimeout(() => {
          trailingTimeoutId = null;
          lastCallTime = Date.now();
          if (lastArgs) {
            fn(...lastArgs);
            lastArgs = null;
          }
        }, remaining);
      }
    }
  };
}

