"use client";

import { COMPANY, IMAGES } from "@/utils/constants";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiShield } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06]">
      {/* Quiet ambient backdrop — no full-screen photo */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(59,130,246,0.18),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_10%_90%,rgba(30,58,138,0.35),transparent)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ss-blue-950/40 via-transparent to-transparent" />

      <Container className="relative py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl lg:max-w-none"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300 backdrop-blur-md">
              <FiShield className="h-4 w-4 text-ss-blue-400" />
              Trusted UK cleaning
            </div>

            <h1 className="mt-8 font-display text-[2.35rem] leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              Spotless spaces.
              <span className="mt-1 block bg-gradient-to-r from-white via-white to-ss-blue-300/90 bg-clip-text text-transparent">
                Effortless living.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-slate-400 sm:text-lg">
              {COMPANY.tagline}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/booking" className="!rounded-2xl !px-7 !py-3.5 !text-[15px]">
                Get a quote
                <FiArrowRight className="h-5 w-5" />
              </Button>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-7 py-3.5 text-[15px] font-semibold text-slate-100 backdrop-blur-sm transition hover:border-white/25 hover:bg-white/[0.08]"
              >
                View services
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/[0.07] pt-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <span className="text-amber-400/90">★★★★★</span>
                <span className="text-slate-400">4.9 average rating</span>
              </div>
              <span className="hidden h-4 w-px bg-white/10 sm:block" />
              <span className="text-slate-500">Fully insured · DBS-checked crews</span>
            </div>
          </motion.div>

          {/* Contained image — editorial frame, not a wallpaper */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
          >
            <div
              className="pointer-events-none absolute -right-8 top-1/2 hidden h-[120%] w-[70%] -translate-y-1/2 rounded-full bg-ss-blue-500/10 blur-3xl lg:block"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-ss-blue-950/40 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.04]">
              <div className="relative aspect-[4/5] w-full sm:aspect-[16/11] lg:aspect-[4/5]">
                <Image
                  src={IMAGES.hero}
                  alt="Professional cleaning"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width:1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ss-blue-950/90 via-ss-blue-950/15 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-ss-blue-950/50 to-transparent lg:from-ss-blue-950/30" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-ss-blue-950/75 px-4 py-3 backdrop-blur-md">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ss-blue-300/90">
                  Residential &amp; commercial
                </p>
                <p className="mt-0.5 text-sm font-medium text-white/95">
                  Consistent finishes, discreet teams
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
