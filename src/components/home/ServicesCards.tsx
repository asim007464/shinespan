"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ServiceCard } from "@/components/services/ServiceCard";
import { SERVICES_LIST } from "@/utils/constants";
import Link from "next/link";

export function ServicesCards() {
  return (
    <section className="page-section py-20 sm:py-28" aria-labelledby="home-services-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-12 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ss-blue-600">
            Our services
          </p>
          <h2 id="home-services-heading" className="mt-3 font-display text-3xl text-slate-900 md:text-5xl">
            Professional cleaners for every space
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            From home cleaning services and office cleaning to deep cleaning services, book the
            right crew in one click.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:items-stretch lg:grid-cols-3 lg:gap-10">
          {SERVICES_LIST.filter((s) => s.slug !== "window-cleaning")
            .slice(0, 6)
            .map((s, i) => (
            <ScrollReveal key={s.slug} delay={(i % 3) * 0.05} className="flex h-full w-full">
              <ServiceCard service={s} headingLevel="h3" priorityImage={i < 3} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-ss-blue-800 shadow-sm transition hover:border-ss-blue-300 hover:bg-ss-blue-50"
          >
            View all services
          </Link>
        </div>
      </div>
    </section>
  );
}
