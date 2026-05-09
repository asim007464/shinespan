"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { IMAGES } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { FiCalendar } from "react-icons/fi";

export function BookingCta() {
  return (
    <section className="py-12 sm:py-16">
      <ScrollReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-[280px] overflow-hidden rounded-[2rem] border border-ss-blue-500/15 shadow-2xl sm:min-h-[320px]">
          <Image
            src={IMAGES.ctaBanner}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ss-blue-900/95 via-ss-blue-800/85 to-transparent" />
          <div className="relative flex flex-col gap-6 px-8 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-14 lg:py-16">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ss-blue-200">
                Ready when you are
              </p>
              <h2 className="mt-3 font-display text-3xl text-white md:text-4xl">
                Book your bespoke clean in minutes
              </h2>
              <p className="mt-3 text-white/85">
                Tell us about your space — we confirm timing and specialist requirements quickly.
              </p>
            </div>
            <Link
              href="/booking"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-ss-blue-900 shadow-xl transition hover:bg-ss-blue-50"
            >
              <FiCalendar className="h-5 w-5" />
              Start booking
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
