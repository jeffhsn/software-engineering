"use client";

import { useCallback, useState } from "react";

export const STORAGE_NAMESPACE = "se-bsc:v1:";

function storageKey(key: string): string {
  return `${STORAGE_NAMESPACE}${key}`;
}

/**
 * Per-browser persisted state via localStorage.
 *
 * The namespace prefix isolates this app's keys; different browsers/profiles
 * already have separate localStorage, so two students on different machines
 * (or in different browser profiles) never share state.
 *
 * SSR-safe: returns `initial` on the server and during the first client
 * render, then hydrates from localStorage on mount.
 */
export function usePersistedState<T>(
  key: string,
  initial: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const fullKey = storageKey(key);
  const [value, setValue] = useState<T>(() => readPersisted(key, initial));

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          window.localStorage.setItem(fullKey, JSON.stringify(resolved));
        } catch {}
        return resolved;
      });
    },
    [fullKey],
  );

  return [value, update];
}

export function readPersisted<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(storageKey(key));
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writePersisted<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey(key), JSON.stringify(value));
  } catch {}
}
