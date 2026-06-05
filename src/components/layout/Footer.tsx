"use client";

import {
  ContactEmailButton,
  ContactPhoneButton,
  ContactWhatsAppButton,
} from "@/components/common/ContactActionButtons";
import {
  COMPANY,
  FOOTER_QUICK_LINKS,
  FOOTER_SERVICE_LINKS,
  IMAGES,
  SOCIAL_LINKS,
} from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";

const iconMap = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  whatsapp: FaWhatsapp,
} as const;

export function Footer() {
  return (
    <footer className="relative z-0 mt-auto border-t border-slate-200/80 bg-white/75 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <Image
                src={IMAGES.logo}
                alt={`${COMPANY.shortName}, cleaning services London`}
                width={220}
                height={68}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              Premium cleaning services in London, insured professional cleaners for homes, offices, and
              apartments.
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
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-ss-blue-50 text-ss-blue-700 shadow-sm transition hover:border-ss-blue-300 hover:bg-ss-blue-100"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <nav className="lg:col-span-2" aria-labelledby="footer-quick-links">
            <p
              id="footer-quick-links"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-ss-blue-600"
            >
              Quick links
            </p>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-600 transition hover:text-ss-blue-700"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-3" aria-labelledby="footer-services">
            <p
              id="footer-services"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-ss-blue-600"
            >
              Services
            </p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {FOOTER_SERVICE_LINKS.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-sm text-slate-600 transition hover:text-ss-blue-700"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p
              id="footer-contact"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-ss-blue-600"
            >
              Contact
            </p>
            <div className="mt-4 flex flex-col gap-2.5" aria-labelledby="footer-contact">
              <ContactWhatsAppButton className="w-full justify-start" />
              <ContactPhoneButton className="w-full justify-start" />
              <ContactEmailButton className="w-full justify-start break-all" />
            </div>
            <ul className="mt-4 space-y-3 text-sm text-slate-600" aria-labelledby="footer-contact">
              <li>{COMPANY.hours}</li>
              <li>{COMPANY.addressLine}</li>
            </ul>
            <Link
              href="/booking"
              className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-ss-blue-700 to-ss-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-105"
            >
              Book Now
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved. {COMPANY.region}.
          </p>
          <p className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="hover:text-ss-blue-700">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-ss-blue-700">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
