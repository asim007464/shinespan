"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { IMAGES } from "@/utils/constants";
import Image from "next/image";
import { FiCalendar, FiClock, FiShield } from "react-icons/fi";

const points = [
  {
    icon: FiCalendar,
    title: "Stressless booking",
    text: "Book online in minutes — clear options, no hassle, and confirmation you can rely on.",
  },
  {
    icon: FiClock,
    title: "Arrive on time",
    text: "Punctual, professional crews who respect your schedule and keep you updated.",
  },
  {
    icon: FiShield,
    title: "Professional cleaning",
    text: "Insured, trained cleaners with consistent standards on every visit.",
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
        </ScrollReveal>

        <div>
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ss-blue-400">
              Why Shine &amp; Span
            </p>
            <h2 className="mt-3 font-display text-3xl text-white md:text-5xl">
              Cleaning you can count on
            </h2>
            <p className="mt-4 text-slate-400">
              Easy booking, reliable arrivals, and professional results — every time we visit your
              home or workplace in London.
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
