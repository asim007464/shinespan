"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Container } from "@/components/ui/Container";
import { COMPANY, SOCIAL_LINKS } from "@/utils/constants";
import { isValidEmail } from "@/utils/validation";
import { useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const iconMap = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
} as const;

const inputClass =
  "mt-2 w-full rounded-2xl border border-white/15 bg-ss-blue-950/90 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-ss-blue-500/50";

export function ContactClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !isValidEmail(email) || !message.trim()) {
      setStatus("error");
      return;
    }
    setStatus("sent");
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <section className="pb-24 pt-16 sm:pt-20">
      <Container>
        <ScrollReveal className="mb-12 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ss-blue-400">Contact</p>
          <h1 className="mt-3 font-display text-4xl text-white md:text-6xl">Let&apos;s talk cleans</h1>
          <p className="mt-4 text-slate-400">
            Coordinators reply same day during business hours — urgent turnovers flagged in your
            message.
          </p>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-5">
          <ScrollReveal className="lg:col-span-2 space-y-8">
            <div className="rounded-3xl border border-white/10 bg-ss-blue-900/50 p-8 shadow-xl shadow-black/20 backdrop-blur-sm">
              <h2 className="font-display text-xl text-white">Direct lines</h2>
              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex gap-3">
                  <FiPhone className="mt-0.5 h-5 w-5 shrink-0 text-ss-blue-400" />
                  <div>
                    <p className="font-semibold text-white">Phone</p>
                    <a href={COMPANY.phoneHref} className="text-slate-400 hover:text-white">
                      {COMPANY.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <FiMail className="mt-0.5 h-5 w-5 shrink-0 text-ss-blue-400" />
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="break-all text-slate-400 hover:text-white"
                    >
                      {COMPANY.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <FiClock className="mt-0.5 h-5 w-5 shrink-0 text-ss-blue-400" />
                  <div>
                    <p className="font-semibold text-white">Hours</p>
                    <p className="text-slate-400">{COMPANY.hours}</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <FiMapPin className="mt-0.5 h-5 w-5 shrink-0 text-ss-blue-400" />
                  <div>
                    <p className="font-semibold text-white">Coverage</p>
                    <p className="text-slate-400">{COMPANY.addressLine}</p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 flex gap-3">
                {SOCIAL_LINKS.map((s) => {
                  const Icon = iconMap[s.icon];
                  return (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition hover:bg-white/15"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.06} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/10 bg-ss-blue-900/50 p-8 shadow-xl shadow-black/20 backdrop-blur-sm"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Name
                  </span>
                  <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Email
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Message
                  </span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className={inputClass}
                  />
                </label>
              </div>
              {status === "error" ? (
                <p className="mt-4 text-sm text-red-400">
                  Please complete all fields with a valid email.
                </p>
              ) : null}
              {status === "sent" ? (
                <p className="mt-4 text-sm text-emerald-400">Thanks — we&apos;ll be in touch shortly.</p>
              ) : null}
              <button
                type="submit"
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-ss-blue-700 to-ss-blue-500 py-4 text-sm font-semibold text-white shadow-lg"
              >
                Send message
              </button>
              <p className="mt-4 text-center text-xs text-slate-500">
                Prefer WhatsApp or a call? Use the number above — we&apos;re happy to help.
              </p>
            </form>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-14 overflow-hidden rounded-[2rem] border border-white/10 shadow-xl shadow-black/30">
          <iframe
            title="UK map — Shine & Span service coverage"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9410757.787586507!2d-4.571686823583723!3d54.23613194551957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d0a98a6b32f39f%3A0xfff11cd9e27c6bc8!2sUnited%20Kingdom!5e0!3m2!1sen!2suk!4v1715000000000!5m2!1sen!2suk"
            className="h-[320px] w-full border-0 sm:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </ScrollReveal>

        <p className="mt-6 text-center text-xs text-slate-500">
          Map shows national coverage — exact routing confirmed at booking.
        </p>
      </Container>
    </section>
  );
}
