"use client";

import { IMAGES } from "@/utils/constants";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiShield, FiStar } from "react-icons/fi";
import { Container } from "@/components/ui/Container";

const TRUST_POINTS = ["DBS-checked teams", "Fully insured", "Eco-smart products"] as const;

export function HeroSection() {
  return (
    <section className="page-section page-section--hero relative isolate min-h-[min(92vh,820px)] overflow-hidden">
      <div className="absolute inset-0 z-0 size-full" aria-hidden>
        <Image
          src={IMAGES.heroBackground}
          alt=""
          fill
          priority
          className="object-cover object-[72%_center]"
          sizes="100vw"
        />
        <div className="hero-image-overlay absolute inset-0" />
      </div>

      <Container className="relative z-10 flex min-h-[min(92vh,820px)] items-center justify-start py-20 text-left sm:py-24 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-xl lg:max-w-2xl"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-ss-blue-200/80 bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ss-blue-700 backdrop-blur-sm">
            <FiShield className="h-3.5 w-3.5 text-ss-blue-600" aria-hidden />
            Cleaning services in London
          </p>

          <h1 className="mt-7 font-display text-[2rem] leading-[1.12] tracking-tight text-slate-900 sm:text-[2.65rem] lg:text-[3.125rem] lg:leading-[1.08]">
            Professional cleaners for spotless homes &amp; offices
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-[1.7] text-slate-600 sm:text-base">
            Premium home and office cleaning across London, reliable cleaners, clear pricing, and
            finishes you can see from the doorway.
          </p>

          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-ss-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-ss-blue-600/25 transition-colors hover:bg-ss-blue-500"
            >
              Book Now
              <FiArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-medium text-slate-800 shadow-sm transition-colors hover:border-ss-blue-300 hover:bg-ss-blue-50"
            >
              View services
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-start gap-3">
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/90 bg-white/90 px-3 py-2 text-sm text-slate-600 shadow-sm backdrop-blur-sm">
              <FiStar className="h-4 w-4 text-amber-500" aria-hidden />
              <span>
                <span className="font-semibold text-slate-900">4.9</span>
                <span className="text-slate-500"> · London clients</span>
              </span>
            </div>
            {TRUST_POINTS.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/90 bg-white/90 px-3 py-2 text-xs font-medium text-slate-600 shadow-sm backdrop-blur-sm"
              >
                <FiCheck className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
