"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { IMAGES } from "@/utils/constants";
import Image from "next/image";
import { FiClock, FiHeart, FiStar } from "react-icons/fi";

const points = [
  {
    icon: FiStar,
    title: "Hotel-grade detail",
    text: "Checklists aligned to how premium hospitality teams work — nothing rushed.",
  },
  {
    icon: FiClock,
    title: "On-time, every time",
    text: "SMS updates and predictable arrival windows — ideal for offices and turnovers.",
  },
  {
    icon: FiHeart,
    title: "People-first service",
    text: "Respectful crews who know how to work quietly around your family or colleagues.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="page-section relative py-20 sm:py-28">
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:items-center lg:px-8">
        <ScrollReveal className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-black/40 lg:aspect-square">
          <Image
            src={IMAGES.whyChoose}
            alt="Immaculate interior"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-ss-blue-900/50 to-transparent" />
          <div className="absolute bottom-6 left-6 max-w-xs rounded-2xl border border-white/20 bg-ss-blue-950/70 p-5 text-white backdrop-blur-xl">
            <p className="text-xs uppercase tracking-widest text-blue-200/90">Client sentiment</p>
            <p className="mt-2 font-display text-2xl">“Like walking into a suite.”</p>
          </div>
        </ScrollReveal>

        <div>
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ss-blue-400">
              Why Shine &amp; Span
            </p>
            <h2 className="mt-3 font-display text-3xl text-white md:text-5xl">
              Precision without the noise
            </h2>
            <p className="mt-4 text-slate-400">
              We obsess over finish lines — edges, grout, glass — so your space feels renewed, not
              merely tidy.
            </p>
          </ScrollReveal>

          <div className="mt-10 space-y-6">
            {points.map((p, i) => (
              <ScrollReveal key={p.title} delay={0.06 * (i + 1)}>
                <div className="flex gap-4 rounded-3xl border border-white/10 bg-ss-blue-900/55 p-6 shadow-lg shadow-black/20 backdrop-blur-sm">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-ss-blue-700 to-ss-blue-500 text-white shadow-lg">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-white">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.text}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
