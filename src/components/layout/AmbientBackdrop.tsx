"use client";

import { useEffect, useRef } from "react";

/** Fixed layer: soft white-blue base + two large orbs drifting very slowly. */
export function AmbientBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const root = rootRef.current;
        if (!root) return;
        root.querySelectorAll<HTMLElement>("[data-orb-parallax]").forEach((orb, i) => {
          const rate = 0.02 + i * 0.012;
          orb.style.setProperty("--scroll-y", `${y * rate}px`);
        });
      });
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className="ambient-backdrop" aria-hidden>
      <div className="ambient-orb-wrap ambient-orb-wrap-a" data-orb-parallax>
        <div className="ambient-orb ambient-orb-a" />
      </div>
      <div className="ambient-orb-wrap ambient-orb-wrap-b" data-orb-parallax>
        <div className="ambient-orb ambient-orb-b" />
      </div>
    </div>
  );
}
