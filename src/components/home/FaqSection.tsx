"use client";

import { FAQ_ITEMS } from "@/utils/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="page-section pb-24 pt-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ss-blue-600">FAQ</p>
          <h2 className="mt-3 font-display text-3xl text-slate-900 md:text-5xl">Answers upfront</h2>
        </ScrollReveal>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="ss-card overflow-hidden rounded-2xl"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-slate-900"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold">{item.q}</span>
                  <FiChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-500 transition ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-slate-400">{item.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
