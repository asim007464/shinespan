"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { FiCheckCircle, FiClock, FiHome, FiSend } from "react-icons/fi";

const steps = [
  { icon: FiHome, title: "Tell us your space", desc: "Property type, rooms, focus areas." },
  { icon: FiClock, title: "Pick your slot", desc: "We align with access & parking notes." },
  { icon: FiCheckCircle, title: "Arrival & clean", desc: "Uniformed crew, checklist-led work." },
  { icon: FiSend, title: "Walkthrough ready", desc: "Optional photo recap & satisfaction sign-off." },
];

export function ProcessSteps() {
  return (
    <section className="page-section py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-12 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ss-blue-600">Our process</p>
          <h2 className="mt-3 font-display text-3xl text-slate-900 md:text-5xl">
            Clear steps. Calm experience.
          </h2>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.06}>
              <div className="ss-card relative h-full rounded-3xl p-8">
                <span className="text-xs font-bold text-ss-blue-600">0{i + 1}</span>
                <s.icon className="mt-4 h-10 w-10 text-ss-blue-600" />
                <h3 className="mt-4 font-display text-xl text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
