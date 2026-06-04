"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { useState } from "react";

export function NewsletterStrip() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
    setEmail("");
    setTimeout(() => setDone(false), 3500);
  }

  return (
    <section className="page-section pb-20 pt-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="rounded-[2rem] border border-ss-blue-200/60 bg-gradient-to-br from-ss-blue-50 via-white to-slate-50 p-8 shadow-lg sm:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ss-blue-600">
                  Stay polished
                </p>
                <h3 className="mt-2 font-display text-2xl text-slate-900 sm:text-3xl">Join the Shine &amp; Span list</h3>
                <p className="mt-2 max-w-xl text-sm text-slate-600">
                  Seasonal deep-clean reminders and limited slots, unsubscribe anytime.
                </p>
              </div>
              <form onSubmit={onSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="ss-input flex-1 !mt-0"
                />
                <button
                  type="submit"
                  className="rounded-2xl bg-white px-8 py-4 text-sm font-semibold text-ss-blue-900 shadow-lg transition hover:bg-ss-blue-50"
                >
                  {done ? "You're in" : "Join"}
                </button>
              </form>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
