"use client";

import { useEffect, useState } from "react";

/**
 * Discrete zoom levels for embedded PDFs. The user toggles between
 * these from the bottom command bar; the active level multiplies the
 * page width computed from the container.
 *
 * Default is `m` so PDFs read at a comfortable size on most screens,
 * not the full-bleed width we used to hand to react-pdf.
 */
export type PdfZoom = "s" | "m" | "l";

export const PDF_ZOOM_FACTOR: Record<PdfZoom, number> = {
  s: 0.75,
  m: 1.0,
  l: 1.25,
};

export const PDF_ZOOM_ORDER: PdfZoom[] = ["s", "m", "l"];
export const PDF_ZOOM_LABEL: Record<PdfZoom, string> = {
  s: "S",
  m: "M",
  l: "L",
};

const STORAGE_KEY = "notebook:pdf-zoom";
const CHANGE_EVENT = "notebook:pdf-zoom-change";

function read(): PdfZoom {
  if (typeof window === "undefined") return "m";
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw === "s" || raw === "m" || raw === "l" ? raw : "m";
}

export function writePdfZoom(z: PdfZoom) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, z);
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

/**
 * Cycle helper: S → M → L → S. Used by the zoom button in the bottom
 * command bar so a single button can drive the full range.
 */
export function nextPdfZoom(current: PdfZoom): PdfZoom {
  const idx = PDF_ZOOM_ORDER.indexOf(current);
  return PDF_ZOOM_ORDER[(idx + 1) % PDF_ZOOM_ORDER.length];
}

/**
 * Subscribe to the current PDF zoom. Returns the SSR-safe default `m`
 * on first paint and reconciles in an effect, so server and client
 * markup match even if the persisted value differs.
 */
export function usePdfZoom(): PdfZoom {
  const [zoom, setZoom] = useState<PdfZoom>("m");
  useEffect(() => {
    setZoom(read());
    const onChange = () => setZoom(read());
    window.addEventListener(CHANGE_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(CHANGE_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);
  return zoom;
}
