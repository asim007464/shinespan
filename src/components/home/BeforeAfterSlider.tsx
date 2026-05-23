"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { IMAGES } from "@/utils/constants";
import Image from "next/image";
import { useState } from "react";

export function BeforeAfterSlider() {
  const [pct, setPct] = useState(48);

  const clipInnerWidth = pct > 0 ? `${(100 / pct) * 100}%` : "100%";

  return (
    <section className="page-section py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ss-blue-400">
            Proof in every pixel
          </p>
          <h2 className="mt-3 font-display text-3xl text-white md:text-5xl">Before / After</h2>
          <p className="mt-3 text-slate-400">
            Drag the slider — same room, transformed from cluttered and dusty to neat and spotless.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/40">
            <div className="relative aspect-[16/10] select-none">
              {/* After — clean (full frame, right when dragging) */}
              <Image
                src={IMAGES.beforeAfterAfter}
                alt="Living room after professional cleaning — tidy and spotless"
                fill
                className="object-cover object-center"
                sizes="(max-width:896px) 100vw, 896px"
              />

              {/* Before — dirty / messy (left clip) */}
              <div
                className="absolute inset-y-0 left-0 z-[2] overflow-hidden border-r-2 border-white shadow-[2px_0_12px_rgba(0,0,0,0.35)]"
                style={{ width: `${pct}%` }}
              >
                <div className="relative h-full" style={{ width: clipInnerWidth }}>
                  <Image
                    src={IMAGES.beforeAfterBefore}
                    alt="Living room before cleaning — clutter and visible dirt"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width:896px) 100vw, 896px"
                  />
                </div>
              </div>

              <span className="pointer-events-none absolute left-4 top-4 z-[3] rounded-md bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                Before
              </span>
              <span className="pointer-events-none absolute right-4 top-4 z-[3] rounded-md bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                After
              </span>

              <input
                type="range"
                min={8}
                max={92}
                value={pct}
                onChange={(e) => setPct(Number(e.target.value))}
                className="absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0"
                aria-label="Compare before and after cleaning"
              />
              <div
                className="pointer-events-none absolute top-0 bottom-0 z-[5] w-0.5 bg-white shadow-[0_0_24px_rgba(255,255,255,0.35)]"
                style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
              />
              <div
                className="pointer-events-none absolute top-1/2 z-[6] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-ss-blue-600 text-lg font-bold text-white shadow-xl"
                style={{ left: `${pct}%` }}
                aria-hidden
              >
                ⇆
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-slate-500">
            Same space shown before treatment (left) and after our clean (right).
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
