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
    <section className="page-section relative overflow-hidden">
      <Container className="relative py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 xl:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-ss-blue-500/20 bg-ss-blue-500/[0.08] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ss-blue-300/90">
              <FiShield className="h-3.5 w-3.5" aria-hidden />
              Cleaning services in London
            </p>

            <h1 className="mt-7 max-w-[16ch] font-display text-[2rem] leading-[1.12] tracking-tight text-white sm:max-w-none sm:text-[2.65rem] lg:text-[3.125rem] lg:leading-[1.08]">
              Professional cleaners for spotless homes &amp; offices
            </h1>

            <p className="mt-6 max-w-xl text-[15px] leading-[1.7] text-slate-400 sm:text-base">
              Premium home and office cleaning across London — reliable crews, clear pricing, and
              finishes you can see from the doorway.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-ss-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ss-blue-500"
              >
                Book Now
                <FiArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-transparent px-7 py-3.5 text-sm font-medium text-slate-200 transition-colors hover:border-white/25 hover:bg-white/[0.04]"
              >
                View services
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-sm text-slate-300">
                <FiStar className="h-4 w-4 text-amber-400/90" aria-hidden />
                <span>
                  <span className="font-semibold text-white">4.9</span>
                  <span className="text-slate-500"> · London clients</span>
                </span>
              </div>
              {TRUST_POINTS.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-400"
                >
                  <FiCheck className="h-3.5 w-3.5 text-emerald-400/90" aria-hidden />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 flex justify-center lg:order-2 lg:justify-end"
          >
            <div className="relative w-full max-w-[480px] lg:max-w-[520px]">
              <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[1.625rem] border border-white/[0.08] bg-[#0a1220] shadow-[0_24px_48px_-20px_rgba(0,0,0,0.55)] sm:aspect-[4/3]">
                <Image
                  src={IMAGES.hero}
                  alt="Professionally cleaned modern home interior in London"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 85vw, 520px"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
