"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Lenis smooth scroll. It drives the native scroll position, so Motion's
 * useScroll / whileInView keep working unchanged. Off for reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.12, anchors: { offset: -72 } });
    return () => lenis.destroy();
  }, []);
  return null;
}
