"use client";

import { IMAGES } from "@/utils/constants";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FiArrowRight, FiCheck, FiShield, FiStar } from "react-icons/fi";
import { Container } from "@/components/ui/Container";

const TRUST_POINTS = ["DBS-checked teams", "Fully insured", "Eco-smart products"] as const;

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      /* autoplay blocked, poster still shows */
    });
  }, []);

  return (
    <section className="page-section page-section--hero relative isolate min-h-[min(92vh,820px)] overflow-hidden">
      <div className="hero-video-bg absolute inset-0 z-0 size-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={IMAGES.hero}
          className="absolute inset-0 size-full object-cover object-center"
          aria-hidden
        >
          <source src={IMAGES.heroVideo} type="video/mp4" />
          <source src={IMAGES.heroVideoFallback} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/5" aria-hidden />
      </div>

      {/* Soft vignette behind centered copy */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_85%_75%_at_50%_45%,rgba(7,13,24,0.55)_0%,rgba(0,0,0,0.2)_50%,transparent_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#070d18]/35 via-transparent to-transparent"
        aria-hidden
      />

      <Container className="relative z-10 flex min-h-[min(92vh,820px)] items-center justify-center py-20 text-center sm:py-24 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-3xl drop-shadow-[0_2px_24px_rgba(7,13,24,0.85)]"
        >
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/35 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
            <FiShield className="h-3.5 w-3.5 text-white/90" aria-hidden />
            Cleaning services in London
          </p>

          <h1 className="mx-auto mt-7 max-w-4xl font-display text-[2rem] leading-[1.12] tracking-tight text-white sm:text-[2.65rem] lg:text-[3.125rem] lg:leading-[1.08]">
            Professional cleaners for spotless homes &amp; offices
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-[1.7] text-slate-200 sm:text-base">
            Premium home and office cleaning across London, reliable crews, clear pricing, and
            finishes you can see from the doorway.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-ss-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-ss-blue-900/40 transition-colors hover:bg-ss-blue-500"
            >
              Book Now
              <FiArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/15"
            >
              View services
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-ss-blue-950/50 px-3 py-2 text-sm text-slate-200 backdrop-blur-sm">
              <FiStar className="h-4 w-4 text-amber-400/90" aria-hidden />
              <span>
                <span className="font-semibold text-white">4.9</span>
                <span className="text-slate-400"> · London clients</span>
              </span>
            </div>
            {TRUST_POINTS.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-ss-blue-950/50 px-3 py-2 text-xs font-medium text-slate-300 backdrop-blur-sm"
              >
                <FiCheck className="h-3.5 w-3.5 text-emerald-400/90" aria-hidden />
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
