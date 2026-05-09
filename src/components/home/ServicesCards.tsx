"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SERVICES_LIST } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export function ServicesCards() {
  const featured = SERVICES_LIST.slice(0, 6);

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-12 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ss-blue-400">
            Services
          </p>
          <h2 className="mt-3 font-display text-3xl text-white md:text-5xl">
            Tailored cleans for every property
          </h2>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <ScrollReveal key={s.slug} delay={i * 0.05}>
              <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-ss-blue-900/45 shadow-lg shadow-black/25 transition hover:-translate-y-1 hover:shadow-2xl">
                <div className="relative aspect-[5/3] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ss-blue-900/80 via-transparent to-transparent opacity-90" />
                  <h3 className="absolute bottom-4 left-4 font-display text-xl text-white md:text-2xl">
                    {s.title}
                  </h3>
                </div>
                <div className="border-t border-white/10 bg-ss-blue-950/80 p-6">
                  <p className="text-base leading-relaxed text-slate-400">{s.description}</p>
                  <Link
                    href={`/booking?service=${encodeURIComponent(s.title)}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ss-blue-400 hover:text-ss-blue-300"
                  >
                    Book this service
                    <FiArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold text-white shadow-sm ring-1 ring-white/10 transition hover:border-white/35 hover:bg-white/15"
          >
            View all services
          </Link>
        </div>
      </div>
    </section>
  );
}
