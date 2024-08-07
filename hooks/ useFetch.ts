import { ErrorResponse } from "@/typings/fetch";
import { debounce } from "@/utils/common";
import { useCallback, useEffect, useState } from "react";

type FetchFunction<T, Args extends any[]> = (...args: Args) => Promise<T>;

interface Options {
  debounceTime?: number;
  immediate?: boolean;
}

interface Result<T, Args extends any[]> {
  loading: boolean;
  data: T | null;
  error: ErrorResponse | null;
  execute: (...args: Args) => Promise<void>;
}

const useFetch = <T, Args extends any[]>(
  func: FetchFunction<T, Args>,
  options: Options = {}
): Result<T, Args> => {
  const { debounceTime = 300, immediate = true } = options;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ErrorResponse | null>(null);

  const debouncedExecute = useCallback(
    debounce(async (...args: Args) => {
      setLoading(true);
      setError(null);

      try {
        const result = await func(...args);
        setData(result);
      } catch (err) {
        const error = err as ErrorResponse;
        setError(error);
      } finally {
        setLoading(false);
      }
    }, debounceTime),
    [func, debounceTime]
  );

  const execute = useCallback(
    (...args: Args) => {
      return debouncedExecute(...args);
    },
    [debouncedExecute]
  );

  useEffect(() => {
    if (immediate) {
      // @ts-ignore
      execute();
    }

    return () => {
      debouncedExecute.cancel(); // Clear any pending timeouts when the component unmounts
    };
  }, [debouncedExecute, immediate]);

  return { loading, data, error, execute };
};

export default useFetch;
