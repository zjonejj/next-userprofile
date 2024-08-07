// 立即执行防抖函数，在 wait 毫秒内只执行一次，且立即执行不延迟
export const debounce = <T extends (...args: any[]) => Promise<void>>(
  func: T,
  wait: number
): T & { cancel: () => void } => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let canExecuteImmediately = true;
  let pendingPromise: Promise<void> | null = null;

  const debouncedFunc = function (
    this: any,
    ...args: Parameters<T>
  ): Promise<void> {
    const context = this;

    if (canExecuteImmediately) {
      pendingPromise = func.apply(context, args);
      canExecuteImmediately = false;
      clearTimeout(timeoutId!);

      timeoutId = setTimeout(() => {
        canExecuteImmediately = true; // Reset canExecuteImmediately for next immediate execution
      }, wait);

      return pendingPromise;
    } else {
      return pendingPromise || Promise.resolve(); // Return the pending promise or a resolved promise
    }
  };

  // cancel method to the debounce timer
  debouncedFunc.cancel = function () {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    canExecuteImmediately = true;
    pendingPromise = null;
  };

  return debouncedFunc as T & { cancel: () => void };
};
