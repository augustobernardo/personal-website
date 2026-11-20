"use client";

import { useEffect } from "react";

// Loads the GSAP choreography after load + idle, so it never touches the LCP or the hydration
// bundle, and never downloads when the reader prefers reduced motion.
export function MotionBoot() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let stop: (() => void) | undefined;
    let cancelled = false;
    let idle: number | undefined;
    const hasIdle = "requestIdleCallback" in window;

    const run = () => {
      import("./director")
        .then(({ startMotion }) => {
          if (!cancelled) stop = startMotion();
        })
        .catch(() => {}); // chunk failed: the page simply stays static
    };
    const schedule = () => {
      idle = hasIdle ? requestIdleCallback(run, { timeout: 2000 }) : window.setTimeout(run, 200);
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      if (idle !== undefined) {
        if (hasIdle) cancelIdleCallback(idle);
        else clearTimeout(idle);
      }
      stop?.();
    };
  }, []);

  return null;
}
