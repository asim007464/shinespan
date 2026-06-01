"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { EmailContactLink } from "@/components/common/EmailContactLink";
import { PhoneContactLink } from "@/components/common/PhoneContactLink";
import { COMPANY, IMAGES } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { FiMail, FiPhone } from "react-icons/fi";

export function ContactCta() {
  return (
    <section className="page-section py-12 sm:py-16" aria-labelledby="contact-cta-heading">
      <ScrollReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-[280px] overflow-hidden rounded-[2rem] border border-ss-blue-500/15 shadow-2xl sm:min-h-[320px]">
          <Image
            src={IMAGES.ctaBanner}
            alt=""
            fill
            loading="lazy"
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ss-blue-900/95 via-ss-blue-800/85 to-transparent" />
          <div className="relative flex flex-col gap-6 px-8 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-14 lg:py-16">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ss-blue-200">
                Get in touch
              </p>
              <h2
                id="contact-cta-heading"
                className="mt-3 font-display text-3xl text-white md:text-4xl"
              >
                Contact us for a quote or advice
              </h2>
              <p className="mt-3 text-white/85">
                Questions about home cleaning, office cleaning, or a one-off deep clean? Our London team
                available 24/7 — or book online anytime.
              </p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-white/75">
                <PhoneContactLink className="inline-flex items-center gap-2 transition hover:text-white">
                  <FiPhone className="h-4 w-4 text-ss-blue-300" aria-hidden />
                  {COMPANY.phone}
                </PhoneContactLink>
                <EmailContactLink className="inline-flex items-center gap-2 transition hover:text-white">
                  <FiMail className="h-4 w-4 text-ss-blue-300" aria-hidden />
                  {COMPANY.email}
                </EmailContactLink>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-ss-blue-900 shadow-xl transition hover:bg-ss-blue-50"
            >
              <FiMail className="h-5 w-5" />
              Contact Us
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
