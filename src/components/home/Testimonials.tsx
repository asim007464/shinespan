"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

const items = [
  {
    quote:
      "Our Victorian terrace has never looked this composed — they even revived the hallway tiles.",
    name: "Amelia R.",
    role: "Homeowner · Bristol",
  },
  {
    quote:
      "Quiet evening cleans for our Mayfair office. Reception commented within a week.",
    name: "James T.",
    role: "Operations Lead · London",
  },
  {
    quote:
      "Airbnb calendar syncs perfectly — linens crisp, photos match the listing again.",
    name: "Priya K.",
    role: "Host · Manchester",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-12 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ss-blue-400">
            Voices from clients
          </p>
          <h2 className="mt-3 font-display text-3xl text-white md:text-5xl">Rated with care</h2>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex h-full flex-col rounded-3xl border border-white/10 bg-ss-blue-900/50 p-8 shadow-xl shadow-black/20 backdrop-blur-sm"
            >
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, j) => (
                  <FiStar key={j} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-6 flex-1 font-display text-lg leading-relaxed text-slate-100">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8 border-t border-white/10 pt-6">
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-sm text-slate-400">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
