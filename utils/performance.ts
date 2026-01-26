
/**
 * ToolVerse Priority Scheduler v1.0
 * Prevents "Page Unresponsive" by shredding long tasks into <10ms intervals.
 */
export const shredTask = async <T, R>(
  items: T[],
  task: (item: T) => R,
  onComplete: (results: R[]) => void
) => {
  const results: R[] = [];
  let index = 0;

  const processBatch = () => {
    const start = performance.now();
    
    while (index < items.length && performance.now() - start < 8) {
      results.push(task(items[index]));
      index++;
    }

    if (index < items.length) {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(processBatch);
      } else {
        setTimeout(processBatch, 1);
      }
    } else {
      onComplete(results);
    }
  };

  processBatch();
};

export const debounce = (fn: Function, ms = 10) => {
  let timeoutId: any;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
