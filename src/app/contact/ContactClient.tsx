"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  ContactEmailButton,
  ContactPhoneButton,
  ContactWhatsAppButton,
} from "@/components/common/ContactActionButtons";
import { EmailContactLink } from "@/components/common/EmailContactLink";
import { Container } from "@/components/ui/Container";
import { COMPANY, SOCIAL_LINKS } from "@/utils/constants";
import { getContactFormMailto } from "@/utils/mailto";
import { isValidEmail } from "@/utils/validation";
import { useState } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiClock, FiMapPin } from "react-icons/fi";

const iconMap = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  whatsapp: FaWhatsapp,
} as const;

const inputClass = "ss-input";
const panelClass = "ss-card rounded-3xl p-8";

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
    window.open(getContactFormMailto(name, email, message), "_blank", "noopener,noreferrer");
    setStatus("sent");
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <section className="page-section pb-24 pt-16 sm:pt-20">
      <Container>
        <ScrollReveal className="mb-12 max-w-3xl">
          <h1 className="font-display text-4xl text-slate-900 md:text-6xl">Contact us</h1>
          <div className="mt-5 flex flex-wrap gap-3">
            <ContactWhatsAppButton />
            <ContactPhoneButton />
            <ContactEmailButton />
          </div>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-5">
          <ScrollReveal className="lg:col-span-2 space-y-8">
            <div className={panelClass}>
              <h2 className="font-display text-xl text-slate-900">Direct lines</h2>
              <div className="mt-6 flex flex-col gap-2.5">
                <ContactWhatsAppButton className="w-full justify-start" />
                <ContactPhoneButton className="w-full justify-start" />
                <ContactEmailButton className="w-full justify-start break-all" />
              </div>
              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex gap-3">
                  <FiClock className="mt-0.5 h-5 w-5 shrink-0 text-ss-blue-600" />
                  <div>
                    <p className="font-semibold text-slate-900">Availability</p>
                    <p className="text-slate-400">{COMPANY.hours}</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <FiMapPin className="mt-0.5 h-5 w-5 shrink-0 text-ss-blue-600" />
                  <div>
                    <p className="font-semibold text-slate-900">Coverage</p>
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
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-ss-blue-600 shadow-sm transition hover:bg-slate-100"
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
              className={panelClass}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Name
                  </span>
                  <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
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
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
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
                <p className="mt-4 text-sm text-emerald-400">Thanks, we&apos;ll be in touch shortly.</p>
              ) : null}
              <button
                type="submit"
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-ss-blue-700 to-ss-blue-500 py-4 text-sm font-semibold text-white shadow-lg"
              >
                Send message
              </button>
              <p className="mt-4 text-center text-xs text-slate-500">
                Opens Gmail to{" "}
                <EmailContactLink className="font-medium text-ss-blue-600 hover:text-ss-blue-700">
                  {COMPANY.email}
                </EmailContactLink>
                {" "}
                with your message filled in, then press Send in Gmail.
              </p>
            </form>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-14 overflow-hidden rounded-[2rem] border border-slate-200/80 shadow-lg">
          <iframe
            title={`London map, ${COMPANY.shortName} service coverage`}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158857.839!2d-0.1276!3d51.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52962966d4962492!2sLondon!5e0!3m2!1sen!2suk!4v1715000000000!5m2!1sen!2suk"
            className="h-[320px] w-full border-0 sm:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </ScrollReveal>

        <p className="mt-6 text-center text-xs text-slate-500">
          Map shows national coverage, exact routing confirmed at booking.
        </p>
      </Container>
    </section>
  );
}
