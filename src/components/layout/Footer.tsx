"use client";

import {
  COMPANY,
  FOOTER_QUICK_LINKS,
  SERVICES_LIST,
  SOCIAL_LINKS,
} from "@/utils/constants";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FiMail, FiPhone } from "react-icons/fi";

const iconMap = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  twitter: FaXTwitter,
  linkedin: FaLinkedinIn,
} as const;

export function Footer() {
  return (
    <footer className="relative z-0 mt-auto border-t border-white/[0.06] bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-ss-blue-700 to-ss-blue-500 text-lg font-bold text-white">
                S
              </span>
              <span className="font-display text-xl font-semibold text-white">{COMPANY.shortName}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Premium cleaning services UK — insured professional cleaners for homes, offices, and
              short-let properties.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {SOCIAL_LINKS.map((s) => {
                const Icon = iconMap[s.icon];
                return (
                  <a
                    key={s.label}
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

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ss-blue-400">
              Quick links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ss-blue-400">
              Services
            </h3>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {SERVICES_LIST.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/booking?service=${encodeURIComponent(s.title)}`}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ss-blue-400">
              Contact
            </h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Phone</p>
                <a
                  href={COMPANY.phoneHref}
                  className="mt-1 inline-flex items-center gap-2 font-medium text-slate-200 hover:text-white"
                >
                  <FiPhone className="h-4 w-4 text-ss-blue-400" />
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Email</p>
                <a
                  href={COMPANY.emailHref}
                  className="mt-1 inline-flex items-center gap-2 break-all font-medium text-slate-200 hover:text-white"
                >
                  <FiMail className="h-4 w-4 shrink-0 text-ss-blue-400" />
                  {COMPANY.email}
                </a>
              </li>
              <li className="text-slate-400">{COMPANY.hours}</li>
              <li className="text-slate-400">{COMPANY.addressLine}</li>
            </ul>
            <Link
              href="/booking"
              className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-ss-blue-700 to-ss-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-105"
            >
              Book Now
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
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
