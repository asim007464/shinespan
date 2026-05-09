"use client";

import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const raw = localStorage.getItem(key);
        if (raw) setValue(JSON.parse(raw) as T);
      } catch {
        /* ignore */
      }
      setHydrated(true);
    });
  }, [key]);

  const save = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          /* quota */
        }
        return resolved;
      });
    },
    [key]
  );

  return { value, setValue: save, hydrated };
}
