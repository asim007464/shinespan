"use client";

import { COMPANY, NAV_LINKS, SOCIAL_LINKS } from "@/utils/constants";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiMail, FiPhone } from "react-icons/fi";
import { useState } from "react";

const iconMap = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
} as const;

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <footer className="mt-auto border-t border-white/10 bg-ss-blue-950/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-ss-blue-700 to-ss-blue-500 text-lg font-bold text-white">
                S
              </span>
              <span className="font-display text-xl font-semibold text-white">{COMPANY.shortName}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Premium residential and commercial cleaning across the UK — insured teams, eco-smart
              products, and sparkling results.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((s) => {
                const Icon = iconMap[s.icon];
                return (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition hover:border-ss-blue-400/50 hover:bg-white/15"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg text-white">Explore</h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/signup" className="text-sm text-slate-400 transition hover:text-white">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <FiPhone className="mt-0.5 h-4 w-4 shrink-0 text-ss-blue-400" />
                <a href={COMPANY.phoneHref} className="hover:text-white">
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <FiMail className="mt-0.5 h-4 w-4 shrink-0 text-ss-blue-400" />
                <a href={`mailto:${COMPANY.email}`} className="break-all hover:text-white">
                  {COMPANY.email}
                </a>
              </li>
              <li>{COMPANY.hours}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg text-white">Newsletter</h3>
            <p className="mt-3 text-sm text-slate-400">Seasonal offers & cleaning tips — no spam.</p>
            <form onSubmit={handleNewsletter} className="mt-4 flex flex-col gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-xl border border-white/15 bg-ss-blue-900/80 px-4 py-3 text-sm text-white outline-none ring-ss-blue-500/30 placeholder:text-slate-500 focus:ring-2"
              />
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-ss-blue-700 to-ss-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-ss-blue-600/25 transition hover:brightness-105"
              >
                {sent ? "Thank you!" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved. {COMPANY.region}.
          </p>
          <p className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="hover:text-slate-300">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-slate-300">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
