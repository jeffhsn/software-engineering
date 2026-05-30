"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny shared flag for "is the chrome (header, column chips, bottom nav)
 * currently hidden because the reader is scrolling". The notebook's scroll
 * handler drives it; the header (a separate component at the layout level),
 * the chips and the bottom nav all subscribe — so they can hide together
 * X-app style without prop-drilling across the tree.
 *
 * Only ever set true on mobile; desktop keeps everything visible.
 */
let hidden = false;
const listeners = new Set<() => void>();

export function setChromeHidden(value: boolean) {
  if (value === hidden) return;
  hidden = value;
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useChromeHidden() {
  return useSyncExternalStore(
    subscribe,
    () => hidden,
    () => false,
  );
}
