import { useCallback, useEffect, useState } from "react";

import { logCustomError } from "@/utils/log";

export function useLocalStorage(key: string) {
  const [storedValue, setStoredValue] = useState<any>(undefined);
  const deserialize = JSON.parse;
  const serialize = JSON.stringify;

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      item && setStoredValue(deserialize(item));
    } catch (error) {
      logCustomError(error);
    }
  }, []);

  const setValue = useCallback(
    (value: any) => {
      try {
        localStorage.setItem(key, serialize(value));
        setStoredValue(value);
      } catch (error) {
        logCustomError(error);
      }
    },
    [key, serialize]
  );

  return [storedValue, setValue];
}
