"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { IMAGES } from "@/utils/constants";
import Image from "next/image";

export function BeforeAfterSlider() {
  return (
    <section className="page-section py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ss-blue-600">
            Proof in every pixel
          </p>
          <h2 className="mt-3 font-display text-3xl text-slate-900 md:text-5xl">Before / After</h2>
          <p className="mt-3 text-slate-600">
            Same room, side by side, from cluttered and dusty to neat and spotless after our clean.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200/90 bg-white shadow-lg shadow-slate-300/40">
            <div className="grid grid-cols-1 gap-1 bg-white sm:grid-cols-2">
              <div className="relative aspect-[4/3]">
                <Image
                  src={IMAGES.beforeAfterBefore}
                  alt="Living room before cleaning, clutter and visible dirt"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width:640px) 100vw, 50vw"
                />
                <span className="pointer-events-none absolute left-4 top-4 rounded-md bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                  Before
                </span>
              </div>
              <div className="relative aspect-[4/3]">
                <Image
                  src={IMAGES.beforeAfterAfter}
                  alt="Living room after professional cleaning, tidy and spotless"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width:640px) 100vw, 50vw"
                />
                <span className="pointer-events-none absolute right-4 top-4 rounded-md bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                  After
                </span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-slate-600">
            Same space shown before treatment (left) and after our clean (right).
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
