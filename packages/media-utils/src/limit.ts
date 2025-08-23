// Maximum number of concurrent promises allowed to run
const concurrencyLimit = 5;

// Number of currently active (running) promises
let activeCount = 0;

// Queue to hold pending tasks waiting to be run when concurrency slots free up
const queue: Array<() => void> = [];

/**
 * Runs the next task from the queue if concurrency limit is not reached.
 * Internal helper function that manages the execution of queued tasks.
 * Dequeues and executes the next task when a concurrency slot becomes available.
 */
function runNext() {
  // If no tasks are queued or we're already at the concurrency limit, do nothing
  if (queue.length === 0 || activeCount >= concurrencyLimit) return;

  // Dequeue next task
  const next = queue.shift();

  if (next) {
    activeCount++; // Mark one more active task
    next();        // Run it
  }
}

/**
 * Wraps an async function to enforce concurrency limits.
 * If the concurrency limit is reached, the function is queued and executed later
 * when a slot becomes available. This prevents overwhelming the system with too
 * many concurrent operations, which is useful for resource-intensive tasks like
 * media processing or API calls.
 * 
 * @param fn - Async function returning a Promise that should be executed with concurrency control
 * @returns Promise resolving with the result of the wrapped function
 * 
 * @example
 * ```js
 * // Limit concurrent image processing operations
 * const processImage = async (imageUrl) => {
 *   // Expensive image processing operation
 *   return await someImageProcessing(imageUrl);
 * };
 * 
 * // Process multiple images with concurrency limit
 * const results = await Promise.all([
 *   limit(() => processImage("image1.jpg")),
 *   limit(() => processImage("image2.jpg")),
 *   limit(() => processImage("image3.jpg")),
 *   limit(() => processImage("image4.jpg")),
 *   limit(() => processImage("image5.jpg")),
 *   limit(() => processImage("image6.jpg")), // This will be queued until a slot opens
 * ]);
 * ```
 */
export function limit<T>(fn: () => Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    // Task to run the function and handle completion
    const task = () => {
      fn()
        .then(resolve)
        .catch(reject)
        .finally(() => {
          activeCount--; // Mark task as done
          runNext();     // Trigger next queued task, if any
        });
    };

    if (activeCount < concurrencyLimit) {
      activeCount++; // Increment active count for immediate run
      task();
    } else {
      // Queue the task if concurrency limit reached
      queue.push(task);
    }
  });
}
