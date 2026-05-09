"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { IMAGES } from "@/utils/constants";
import Image from "next/image";
import { useState } from "react";

export function BeforeAfterSlider() {
  const [pct, setPct] = useState(52);

  return (
    <section className="border-y border-white/10 bg-ss-blue-950/40 py-20 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ss-blue-400">
            Proof in every pixel
          </p>
          <h2 className="mt-3 font-display text-3xl text-white md:text-5xl">Before / After</h2>
          <p className="mt-3 text-slate-400">
            Drag the slider — see how we revive tired surfaces and reclaim brightness.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/40">
            <div className="relative aspect-[16/10]">
              <Image
                src={IMAGES.before}
                alt="Before cleaning"
                fill
                className="object-cover"
                sizes="(max-width:896px) 100vw, 896px"
                priority={false}
              />
              <div
                className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white"
                style={{ width: `${pct}%` }}
              >
                <Image
                  src={IMAGES.after}
                  alt="After cleaning"
                  fill
                  className="object-cover"
                  sizes="(max-width:896px) 100vw, 896px"
                />
              </div>
              <input
                type="range"
                min={10}
                max={90}
                value={pct}
                onChange={(e) => setPct(Number(e.target.value))}
                className="absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0"
                aria-label="Compare before and after"
              />
              <div
                className="pointer-events-none absolute top-0 bottom-0 z-[5] w-1 bg-white shadow-[0_0_30px_rgba(0,0,0,0.35)]"
                style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
              />
              <div
                className="pointer-events-none absolute top-1/2 z-[6] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-ss-blue-600 text-xs font-bold text-white shadow-xl"
                style={{ left: `${pct}%` }}
              >
                ⇆
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-slate-500">
            Illustrative comparison — results vary by scope and condition.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
