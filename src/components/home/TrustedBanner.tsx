"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { IMAGES } from "@/utils/constants";
import Image from "next/image";
import { FiCheckCircle } from "react-icons/fi";

const badges = ["Checkatrade-style vetting", "Eco-conscious supplies", "Same-week availability"];

export function TrustedBanner() {
  return (
    <section className="page-section relative py-14 sm:py-16">
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 sm:flex-row sm:px-6 lg:px-8">
        <ScrollReveal className="relative h-48 w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/80 shadow-lg sm:h-56">
          <Image
            src={IMAGES.trusted}
            alt="Cleaning excellence"
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ss-blue-900/30 to-transparent" />
        </ScrollReveal>

        <div className="flex-1 space-y-6">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ss-blue-600">
              Trusted cleaning services
            </p>
            <h2 className="mt-2 font-display text-3xl text-slate-900 md:text-4xl">
              Built for London homes, offices & apartments
            </h2>
            <p className="mt-3 max-w-xl text-slate-400">
              From boutique Airbnb turnovers to corporate HQ schedules, consistent standards,
              punctual arrivals, and discreet professionals who respect your space.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <ul className="grid gap-3 sm:grid-cols-3">
              {badges.map((b) => (
                <li
                  key={b}
                  className="ss-card flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600"
                >
                  <FiCheckCircle className="h-5 w-5 shrink-0 text-emerald-600" />
                  {b}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
