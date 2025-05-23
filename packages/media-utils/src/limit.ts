// Maximum number of concurrent promises allowed to run
const concurrencyLimit = 5;

// Number of currently active (running) promises
let activeCount = 0;

// Queue to hold pending tasks waiting to be run when concurrency slots free up
const queue: Array<() => void> = [];

/**
 * Runs the next task from the queue if concurrency limit is not reached.
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
 * If concurrency limit is reached, the function is queued and executed later.
 * 
 * @param fn - Async function returning a Promise
 * @returns Promise that resolves/rejects with fn's result
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
